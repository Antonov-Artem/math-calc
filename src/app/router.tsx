import { createBrowserRouter } from 'react-router';
import { Layout } from '../pages/layout';
import { Home } from '../pages/home';
import { Engineer } from '../pages/engineer';
import { Graphic } from '../pages/graphic';
import { Calculus } from '../pages/calculus';

const routes = ['engineer', 'graphic', 'calculus'];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout routes={routes} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'engineer', element: <Engineer /> },
      { path: 'graphic', element: <Graphic /> },
      { path: 'calculus', element: <Calculus /> },
    ],
  },
]);
