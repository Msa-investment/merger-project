import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import BrandOne from '../images/brand/brand-01.svg';
const Table = ({ data, header, handleEdit, handleDelete }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {header}
      </h4>
      <div className="w-full overflow-x-auto table-wrapper">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Country
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row: any, idx: number) => {
              return (
                <tr key={idx} className="content-center">
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark capitalize flex items-center gap-2">
                    <div className="flex-shrink-0">
                      <img src={row?.avatar?.url || BrandOne} alt="Brand" />
                    </div>
                    <span>
                      {row?.firstName} {}
                      {row?.lastName}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className={`label label-${row._id}`}>
                      {row?.email}
                    </span>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span>{row.status || 'Approved'}</span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {row?.role}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span>Nigeria</span>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className="actions flex grid-cols-2 gap-4">
                      <BsFillTrashFill
                        className="delete-btn cursor-pointer"
                        onClick={() => handleDelete(row._id)}
                      />

                      <BsFillPencilFill
                        className="edit-btn cursor-pointer"
                        onClick={() => handleEdit(row._id)}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
