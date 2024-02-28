import DocViewer from 'react-doc-viewer';

// const DocumentViewer: React.FC<{ src: string }> = ({ src }) => {
//   return (
//     <div>
//       <iframe src={src} width="100%" height="600px"></iframe>
//     </div>
//   );
// };
export function DocumentViewer({ src }) {
  const docs = [{ uri: src }];

  return <DocViewer documents={docs} />;
}

export default DocumentViewer;
