import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router';
import 'material-symbols/outlined.css';
import 'katex/dist/katex.min.css';
import './index.css';

createRoot(document.querySelector('#root')!).render(
  <RouterProvider router={router} />,
);
