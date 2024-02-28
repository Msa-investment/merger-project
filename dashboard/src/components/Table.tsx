import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
const Table = ({ data, handleEdit, handleDelete }) => {
  // const fields=Object.keys(Object.values(dataJSON)[0]).filter((item:any)=>!(item.startsWith("delta_")));

  return (
    <div className="max-w-full overflow-x-auto table-wrapper">
      <table className="table">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Bond
            </th>
            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Paramter
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Criterion
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Value to give alert
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Alert type
            </th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, idx: number) => {
            return (
              <tr key={idx} className="content-center">
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {row._id}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className={`label label-${row.para}`}>{row.para}</span>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span>{row.firstName}</span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {row?.value}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span>
                    {row?.type == 0
                      ? 'Info'
                      : row?.type == 1
                      ? 'Warning'
                      : 'Alert'}
                  </span>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="actions flex grid-cols-2 gap-4">
                    <BsFillTrashFill
                      className="delete-btn cursor-pointer"
                      onClick={() => handleDelete(idx)}
                    />

                    <BsFillPencilFill
                      className="edit-btn cursor-pointer"
                      onClick={() => handleEdit(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
