import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb3';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
import { fetchActivity } from '../hooks/axiosApis';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import DeleteToolTip from '../components/DeleteToolTip';
import EditTooltip from '../components/EditTooltip';
import ProjectDetails from '../components/ProjectDetails';
import ActivityDetails from '../components/ActivityDetails';

const Activity = () => {
  const { user } = useContext(AuthContext);
  const { id, activityId } = useParams();
  const [loading, setLoading] = useState(false);
  const info = { token: user?.token || user.accessToken, id, activityId };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['activity', id],
    queryFn: () => fetchActivity(info),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error || isError) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error, isError]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
    },
  };
  const haveAccess = () => {
    if (
      user.user.role === 'ADMIN' ||
      user.user._id.toSttring() === data.userId.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handelEdit = () => {
    navigate(`/projects/${id}/${activityId}/edit-activity`);
  };
  const handelDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These activity would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/projects/${id}/activity/${activityId}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['projects', id]);
              Swal.fire({
                title: 'Activity deleted',
                icon: 'success',
                text: 'Activity deleted successfully!',
              });
              navigate(`/projects/${id}`);
            }
          })
          .catch((error) => {
            const message = getError(error);
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: message,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <>
      <div className="flex justify-between my-2 bg-white rounded p-2 px-2 mb-4">
        <Breadcrumb
          parent="Project"
          link={`projects/${id}`}
          pageName="Activity"
        />
        {haveAccess() && (
          <div className="flex gap-2 text-center">
            <EditTooltip handelEdit={handelEdit} />
            <DeleteToolTip handleDelete={handelDelete} />
          </div>
        )}
      </div>
      <ActivityDetails data={data?.activity} />

      <Link
        to={`/projects/${id}/${activityId}/edit-activity`}
        className="capitalize flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80"
      >
        Edit activity
      </Link>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default Activity;
