import * as express from 'express';
import { Request, Response } from 'express';
import { Tasks } from './routes/tasks';
var urlRequests: object = {};
var reqCounter: number;

class App {
    public app: express.Application;
    public taskRoutes: Tasks = new Tasks();


    constructor() {
        this.app = express();
        this.config()
        this.taskRoutes.routes(this.app);
    }

    Logger = (req: Request, res: Response, next: Function) => {
        reqCounter++;
        if (!(req.originalUrl in urlRequests)) {
            urlRequests[req.originalUrl] = 1;
        } else {
            urlRequests[req.originalUrl] += 1;
        }
        console.log(
            `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            Request #${reqCounter}:
            HTTP VERB: ${req.method}
            URL: ${req.originalUrl}
            REQUEST BODY:`
        );
        console.log(req.body);
        next();
    };

    Visited = (req: Request, res: Response, next: Function) => {
        console.log(
            `\tThis URL has been requested ${urlRequests[req.originalUrl]} times
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            `
        );
        next();
    };

    // Set Up Middlewares
    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(this.Logger);
        this.app.use(this.Visited);
    }
};

export default new App().app;