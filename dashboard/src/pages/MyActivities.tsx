import Breadcrumb from '../components/Breadcrumb.tsx';
const MyActivities = () => {
  return (
    <>
      <Breadcrumb pageName="Users" />
      <div className="flex flex-col text-center gap-10 text-title-md font-bold text-black dark:text-white">
        <div>My Activities</div>
        <div>Under Construnction</div>
      </div>
    </>
  );
};

export default MyActivities;
