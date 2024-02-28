import { Link } from 'react-router-dom';
import thumbnail from '../images/icon/R.png';

const Card = ({ data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      <Link to={`/resources/${data?._id}`}>
        {data?.category === 'image' ? (
          <img
            src={data?.file?.url}
            alt="fileImage"
            className="h-full object-contain"
          />
        ) : (
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="h-full object-contain"
          />
        )}
      </Link>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <Link
            to={`/resources/${data?._id}`}
            className="text-title-md font-bold text-black dark:text-white"
          >
            {data?.title}
          </Link>
        </div>
        <p className="text-sm font-medium">{data?.category}</p>
      </div>
    </div>
  );
};

export default Card;
