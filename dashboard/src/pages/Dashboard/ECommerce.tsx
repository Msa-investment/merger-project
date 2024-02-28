import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import ChartOne from '../../components/ChartOne.tsx';
import ChartThree from '../../components/ChartThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import ChatCard from '../../components/ChatCard.tsx';
import TableOne from '../../components/UserTable.tsx';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader';
import { fetchUsers } from '../../hooks/axiosApis';
import getError from '../../hooks/getError';
import AuthContext from '../../context/authContext';
import { useContext, useEffect } from 'react';

const ECommerce = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => fetchUsers(user),
  });
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (error) {
      const message = getError(error);
      console.log(message);
    }
  }, [data, error]);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne data={data} />
        <CardTwo data={data} />
        <CardThree data={data} />
        <CardFour data={data} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne data={data} />
        <ChartTwo data={data} />
        <ChartThree data={data} />
        <div className="col-span-12 xl:col-span-6">
          <ChatCard data={data}  />
        </div>
        {/* <MapOne /> */}
        <div className="col-span-12">
          <TableOne data={data?.data} />
        </div>
      </div>
      {isLoading ? <Loader /> : ''}
    </>
  );
};

export default ECommerce;
