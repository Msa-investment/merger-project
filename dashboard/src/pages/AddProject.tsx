import Breadcrumb from '../components/Breadcrumb';
import Loader from '../components/Loader';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import getError from '../hooks/getError';
import { fetchProject } from '../hooks/axiosApis';
import AuthContext from '../context/authContext';
const apiUrl = import.meta.env.VITE_API_URL;
import { useQueryClient, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

interface FormData {
  [key: string]: string | Blob;
}

const AddResource = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  const info = { token: user?.token || user.accessToken, id };
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => fetchProject(info),
  });
  useEffect(() => {
    if (data) {
      setProject(() => data.project);
      console.log(data);
      setName(data?.project?.name);
      setEndDate(data?.project?.endDate);
      setStartDate(() => data?.project?.startDate);
      setDescription(() => data?.project?.description);
      setType(() => data?.project?.type);
    }
    if (error || isError) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error, isError]);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [type, setType] = useState<string>('image');
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setType(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token || user.accessToken}`,
    },
  };
  const handleSubmit = async () => {
    const formIdGood = checkForm();
    if (!formIdGood) {
      return toast.error('Check form inputs and try again');
    }
    setLoading(true);
    const data: FormData = {
      name,
      type,
      startDate,
      endDate,
      description,
    };
    axios
      .post(`${apiUrl}/projects`, data, config)
      .then((res) => {
        if (res.data) {
          toast.success('Project added successfully');
        }
        queryClient.invalidateQueries(['projects']);
        navigate('/projects');
      })
      .catch((error) => {
        console.error(error);
        const message = getError(error);
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const checkForm = () => {
    if (!title.trim()) {
      toast.error('Project title is required!');
      return false;
    }
    if (!startDate) {
      toast.error('Project Start date is required!');
      return false;
    }
    if (!endDate) {
      toast.error('Project End date is required!');
      return false;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date should not be greater than end date!');
      return false;
    }
    if (!category) {
      toast.error('Project category is required!');
      return false;
    }
    if (!description) {
      toast.error('Project description is required!');
      return false;
    }
    return true;
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
    if (!checkForm()) {
      return toast.error('Check form inputs and try again');
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `These project would be updated!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        const data: FormData = {
          name,
          type,
          startDate,
          endDate,
          description,
        };
        setLoading(true);
        axios
          .patch(`${apiUrl}/projects/${id}`, data, config)
          .then((res) => {
            if (res.data) {
              console.log(res.data);
              queryClient.invalidateQueries(['projects', id]);
              Swal.fire({
                title: 'Project updated',
                icon: 'success',
                text: 'Project updated successfully!',
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
      <Breadcrumb pageName={!id ? 'Add project' : 'Edit project'} />

      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Project info
                </h3>
              </div>
              <div>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter project name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      value={description}
                      onChange={handleDescriptionChange}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {/* <!-- File upload --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Project details
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    category
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={type}
                      onChange={handleCategoryChange}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Category</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="document">Document</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {id ? (
          <button
            onClick={handleEdit}
            className="flex w-full justify-center rounded bg-primary p-3 mt-3 font-medium text-gray"
          >
            Edit Project
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex w-full justify-center rounded bg-primary p-3 mt-3 font-medium text-gray"
          >
            Add Project
          </button>
        )}
      </div>
      {loading || isLoading ? <Loader /> : ''}
    </>
  );
};

export default AddResource;
