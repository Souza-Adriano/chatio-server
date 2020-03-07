export interface ServerOptions {
    middlewares: any;
    routes: any;
    sockets: SocketOptions;
    watchers: any[];
    jobs: any[];
}

export interface SocketOptions {
    user: any[];
    customer: any[];
}