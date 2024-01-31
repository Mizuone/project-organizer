import { Route, Routes } from 'react-router-dom';

import { Dashboard } from './components/Dashboard';
import React from 'react'
import { SideNavigation } from './components/navigation/SideNavigation';

export const App = () => {
    return (
        <div className='flex flex-row max-h-full h-screen'>
            <div className='w-2/12 bg-blue-400 border-blue-400 border-2 shadow'>
                <SideNavigation />
            </div>
            <div className='flex-auto px-4'>
                <Routes>
                    <Route path="/" element={ <Dashboard /> } />
                </Routes>
            </div>
        </div>
    );
}