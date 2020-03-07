import app from './config/server';
import middlewares from './config/middlewares';
import routes from './config/routes';
import sockets from './config/sockets';
import watchers from './config/watchers';
import jobs from './config/jobs';

const App = new app({
    middlewares,
    routes,
    sockets,
    watchers,
    jobs,
});

App.start();