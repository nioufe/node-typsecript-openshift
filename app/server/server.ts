/// <reference path="typings/node/node.d.ts" />
import express = require('express');

enum NodeEnv { debug, production}

class HeroesApp {
        private ipaddress: string;
        private port: number;
        private dir: string;
        private app: express.Express;

        constructor() {
                this.setupVariables();
                this.setUpTerminator();

                // Create the express server and routes.
                this.initializeServer();
        }

        private terminator(sig?: string): void {
                if (sig) {
                        console.log('%s: Received %s - terminating sample app ...',
                                new Date(Date.now()), sig);
                        process.exit(1);
                }
                console.log('%s: Node server stopped.', new Date(Date.now()));
        }

        private setUpTerminator(): void {
                process.on('exit', function() { this.terminator(); });

                // Removed 'SIGPIPE' from the list - bugz 852598.
                ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
                        'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
                ].forEach(function(element, index, array) {
                        process.on(element, function() { this.terminator(element); });
                });
        }

        private setupVariables(): void {
                //  Set the environment variables we need.
                this.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
                this.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
                this.dir = process.env.OPENSHIFT_REPO_DIR || './';
                if(process.env.NODE_ENV === NodeEnv[NodeEnv.production]){
                        this.dir += 'dist/'
                } else {
                        this.dir += 'debug/';   
                }
                if (typeof this.ipaddress === "undefined") {
                        //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
                        //  allows us to run/test the app locally.
                        console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
                        this.ipaddress = "127.0.0.1";
                }
        }

        private initializeServer() : void {
                this.app = express();
                //  Add handlers for the app (from the routes).
                this.app.use(express.static(this.dir + 'client/'));
        }

        public start() : void {
                var self = this;
                this.app.listen(this.port, this.ipaddress, function() {
                        console.log('%s: Node server started on %s:%d ...',
                                new Date(Date.now()), self.ipaddress, self.port);
                });
        }
}

var herosApp = new HeroesApp();
herosApp.start();