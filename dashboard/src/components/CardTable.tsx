import Card from './Card';
const CardTable = ({ data }) => {
  return (
    <>
      {data?.data?.length > 0 &&
        data?.data?.map((item) => <Card key={item._id} data={item} />)}
    </>
  );
};

export default CardTable;
