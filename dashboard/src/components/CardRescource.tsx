import { useState, useRef } from 'react';
import DocumentViewer from './DocViewer';

const Card = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const captureThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas image to data URL
        const dataURL = canvas.toDataURL();
        console.log(dataURL);
        setThumbnail(dataURL);
      }
    }
  };
  console.log(data);
  return (
    <div className="rounded-sm border border-stroke bg-white py-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="size-[200px]">
        {data?.category === 'image' ? (
          <img
            src={data?.file?.url}
            alt="fileImage"
            className="h-full object-contain"
          />
        ) : data?.category === 'document' ? (
          <DocumentViewer src={data?.file?.url} />
        ) : (
          <>
            <video
              ref={videoRef}
              controls
              width="400"
              onLoadedMetadata={captureThumbnail} // Capture thumbnail when video metadata is loaded
            >
              <source src={data?.file?.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {thumbnail && <img src={thumbnail} alt="Video Thumbnail" />}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <p className="text-sm font-medium">{data?.category}</p>
      </div>
    </div>
  );
};

export default Card;
