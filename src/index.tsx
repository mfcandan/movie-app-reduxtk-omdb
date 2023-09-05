import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MovieDetail from './components/MovieDetail';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </MantineProvider>
  </React.StrictMode>
);

