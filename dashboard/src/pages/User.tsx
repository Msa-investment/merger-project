import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import getError from '../hooks/getError';
import AuthContext from '../context/authContext';
import { fetchUser } from '../hooks/axiosApis';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/CardTable';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';
import DeleteToolTip from './../components/DeleteToolTip';
import EditTooltip from './../components/EditTooltip';

const User = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUser(info),
  });

  useEffect(() => {
    if (data) {
      console.log(data?.resources);
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
  const handelEdit = (id: string) => {
    navigate(`/users/${id}`);
  };
  const handelDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `These user would be deleted!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        axios
          .delete(`${apiUrl}/admins/users/${id}`, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['user']);
              Swal.fire({
                title: 'User deleted',
                icon: 'success',
                text: 'User deleted successfully!',
              });
              navigate('/users');
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
      <Breadcrumb pageName="User" />
      <div className="flex justify-between my-2 bg-white rounded p-2 px-2">
        <h2 className="text-title-md font-bold text-black dark:text-white">
          First Name: {data?.user?.firstName}
        </h2>
        {haveAccess() && (
          <div className="flex gap-2 text-center">
            <EditTooltip data={id} handleEdit={handelEdit} />
            <DeleteToolTip data={id} handleDelete={handelDelete} />
          </div>
        )}
      </div>

      <div>
        <p>{data?.user?.bio}</p>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Resources:</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Card data={data?.resources} />
        </div>
      </div>
      {isLoading || loading ? <Loader /> : ''}
    </>
  );
};

export default User;
