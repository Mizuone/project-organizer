import { Model, createServer } from 'miragejs';

import { Project } from '../api/dtos/project.dto';
import { v4 as uuidv4 } from 'uuid';

export const makeServer = ({ environment = 'test' } = {}) => {
    let server = createServer({
        environment,
        models: {
            project: Model.extend<Partial<Project>>({}),
        },
        seeds(server) {
            server.create('project', {
                id: '8e09dc16-0efb-474b-b991-dc2e8e89c4c3', name: 'Project 1', description: 'This is project 1', startDate: '2023-12-20', endDate: '2023-12-25' 
            })
        },
        routes() {
            this.namespace = 'api'

            this.get('/projects', (schema) => {
                console.log(...schema.db.projects);
                return [ ...schema.db.projects ];
            });

            this.post('/projects/', (schema, request) => {
                const attributes = JSON.parse(request.requestBody)

                attributes.id = uuidv4();

                schema.create('project', {
                    ...attributes
                });

                return attributes;
            });

            this.put('/projects/:id', (schema, request) => {
                const attributes = JSON.parse(request.requestBody);

                schema.find('project', request.params.id)?.update(attributes);

                return attributes;
            });

            this.del('projects/:id', (schema, request) => {
                schema.find('project', request.params.id)?.destroy();
                
                return true;
            });
        }
    });

    return server;
}