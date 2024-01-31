import { AnyFactories, Assign, ModelDefinition, Registry } from 'miragejs/-types';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'

import { Project } from '../../api/dtos/project.dto';
import { ProjectList } from '../../components/project/ProjectsList';
import React from 'react'
import { Server } from 'miragejs/server';
import { makeServer } from '../mirageServer';

describe("Test the projectList Component", () => {

    let server: Server<Registry<{ project: ModelDefinition<Assign<{}, Partial<Project>>>; }, AnyFactories>>;

    beforeEach(() => {
        server = makeServer();
        render(<ProjectList />)
    });

    afterEach(() => server.shutdown());

    test("show the ProjectList, read the placeholder text of an empty project list", async () => {
        await waitForElementToBeRemoved(() => screen.getByText("Projects Loading...")).catch((err) => {
            console.log(err);
        });

        expect(screen.getByText("No Projects Found...")).toBeInTheDocument();
    });

    test("show the ProjectList and read the first project by it's name", async () => {
        server.create('project', {
            id: '8e09dc16-0efb-474b-b991-dc2e8e89c4c3', name: 'Project 1', description: 'This is project 1', startDate: '2023-12-20', endDate: '2023-12-25' 
        });
                
        await waitForElementToBeRemoved(() => screen.getByText("Projects Loading...")).catch((err) => {
            console.log(err);
        });

        expect(screen.getByText("Project 1")).toBeInTheDocument();
    });

});