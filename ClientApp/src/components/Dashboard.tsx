import { ProjectList } from './project/ProjectsList';
import React from 'react'

export const Dashboard = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="gap-4">
                    <div className="tile col-span-full shadow p-2 my-4">
                        <h1 className="m-4 tile-marker text-2xl ">Hello User!</h1>
                        <p className="m-4 text-xl">Welcome to project organizer. A web application built using React and .NET</p>
                    </div>
                    <div className="rounded shadow tile col-span-full pb-2">
                        <ProjectList />
                    </div>
                </div>
            </div>
        </>
    );
}