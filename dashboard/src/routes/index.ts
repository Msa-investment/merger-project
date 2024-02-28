import { lazy } from 'react';
const Calendar = lazy(() => import('../pages/Calendar'));
const Resources = lazy(() => import('../pages/Resources'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Chart = lazy(() => import('../pages/Chart'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const User = lazy(() => import('../pages/User'));
const Users = lazy(() => import('../pages/Users'));
const Admins = lazy(() => import('../pages/Admins'));
const AddUser = lazy(() => import('../pages/AddUser'));
const AddResource = lazy(() => import('../pages/AddResource'));
const Resource = lazy(() => import('../pages/Resource'));
// const FormElements = lazy(() => import('../pages/Form/FormElements'));
// const Transactions = lazy(() => import('../pages/Transactions'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/resources',
    title: 'Resources',
    component: Resources,
  },
  {
    path: '/resources/:id',
    title: 'Resource',
    component: Resource,
  },
  {
    path: '/add-resource',
    title: 'Add-resource',
    component: AddResource,
  },
  {
    path: '/users',
    title: 'Users',
    component: Users,
  },
  {
    path: '/admins',
    title: 'Admins',
    component: Admins,
  },
  {
    path: '/users/:id',
    title: 'Users',
    component: User,
  },
  {
    path: '/add-user',
    title: 'Add-user',
    component: AddUser,
  },
  {
    path: '/notifications',
    title: 'Notifications',
    component: Notifications,
  },
];

const routes = [...coreRoutes];
export default routes;
