import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb1';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
import { fetchProject } from '../hooks/axiosApis';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import DeleteToolTip from '../components/DeleteToolTip';
import EditTooltip from '../components/EditTooltip';
import ProjectDetails from '../components/ProjectDetails';
import ActivityTable from '../components/ActivityTable';

const Project = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => fetchProject(info),
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
      user.user._id.toSttring() === data?.project?.userId.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleEdit = () => {
    navigate(`/projects/${id}/edit-project`);
  };
  const handelDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These project would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/projects/${id}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['projects', id]);
              Swal.fire({
                title: 'Project deleted',
                icon: 'success',
                text: 'Project deleted successfully!',
              });
              navigate('/projects');
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
        <Breadcrumb pageName="Project" />
        {haveAccess() && (
          <div className="flex gap-2 text-center">
            <EditTooltip handleEdit={handleEdit} />
            <DeleteToolTip handleDelete={handelDelete} />
          </div>
        )}
      </div>
      <ProjectDetails data={data?.project} />
      <div className="rounded-sm border border-stroke bg-white px-5 py-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:py-2">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Activities
          </h4>
          <Link
            to={`/projects/${id}/add-activity`}
            className="capitalize flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80"
          >
            Add activity
          </Link>
        </div>
        <ActivityTable data={data?.activities} />
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default Project;
