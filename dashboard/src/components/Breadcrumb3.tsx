import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
  parent: string;
  link: string;
}
const Breadcrumb = ({ pageName, parent, link }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link to={`/${link}`}>{parent}/</Link>
          </li>
          <li className="text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
