import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './Main/Main';
import FindHousePage from './pages/map/FindHousePage';
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
                element: <FindHousePage />,
            },
        ],
    },
]);

export default router;
