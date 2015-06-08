# NodeJS Typescript Openshift

This is a configuration I made for a project deployed on openshift

It supports : 
* Changing the node version through .openshift/markers/NODEJS_VERSION
* Express using typescript (app/server)
* gulp debug and deploy configurations
* Compiling and serving static files (app/client)
* different typings for client and server
* openshift environment variables typings (process.env)

The debuging configuration in ./settings and gulp debug is made to use Visual Studio Code 
in an optimal way. I haven't found a way to make sourcemaps work when the .ts file is in different directories

##TODO
* Gulp Watch configurations
* Minimize and such for the client side
* Make Yeoman generator?

##Thanks
[nodejs-custom-version-openshift](https://github.com/ramr/nodejs-custom-version-openshift)