import Home from './pages/HomePage';
import ClientePage from './pages/ClientePage'; // lista
import ClienteDetailPage from './pages/ClienteDetailPage'; // detalles

const routes = [
  { path: '/', element: <Home /> },
  { path: '/clientes', element: <ClientePage /> },
  { path: '/cliente/:id', element: <ClienteDetailPage /> },
];

export default routes;
