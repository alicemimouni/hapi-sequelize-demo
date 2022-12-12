'use strict';
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path');
const Connection = require('./dbconfig');
const Users = require('./models/users');

const init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: 1234,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'static')
            }
        }
    });

    await server.register([{
            plugin: require("hapi-geo-locate"),
            options: {
                enabledByDefault: true
            }
        },
        {
            plugin: Inert
        },
        {
            plugin: require('@hapi/vision')
        }
    ]);

    // VIEWS
    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: path.join(__dirname, 'views'),
        layout: 'default'
    })


    // ROUTES
    server.route([{
            method: 'GET',
            path: '/',
            handler: (request, h) => {

                return h.file('welcome.html');
            }
        },
        {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/getUsers',
            handler: async (request, h) => {
                const users = await Connection.getUsers();
                console.log(users);
                return users;
            }
        },
        {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/getUsers/{user_id}',
            handler: async (request, h) => {
                const user = await Connection.getUserId();
                console.log(user);
                return user;
            }
        },

        {
            method: 'POST',
            path: '/login',
            handler: (request, h) => {
                Users.createUser(request.payload.username, request.payload.password);
                return h.view('index', {
                    username: request.payload.username
                });
            }
        }
    ]);

    await server.start();
    console.log(`Server started on: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();