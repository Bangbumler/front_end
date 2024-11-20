import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './Main/Main';
import FindHousePage from './pages/map/FindHousePage';
import MapLayout from './pages/map/MapLayout';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Main />,
            },
            {
                path: '/map',
                element: <MapLayout />,
            },
        ],
    },
]);

export default router;
