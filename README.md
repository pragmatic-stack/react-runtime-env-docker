# React Runtime Env Docker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

For this approach to work, nginx image is used in v1.19.-alpine.
We can profit utilizing the docker.entrypoint.d to start our script for the runtime env configuration on container start.

## Configuration of your app | changes

### Config helper for local and runtime configuration

To read the configuration for your app, `src/config/appConfig.ts` exports a util `appConfig` that either contains your local configuration or the runtime configuration for your app.

For this example we are using TypeScript. All of the configuration is located within that, env variable names are used from your localConfig object to maintain type safety during development.

You can access your configuration like this: `appConfig.REACT_APP_<VARIABLE>`

### Type definition for your runtime env
```typescript
// window.d.ts
import {RuntimeEnvConfig} from "../config/appConfig";

declare global {
    interface Window {
        __env__?: RuntimeEnvConfig
    }
}
```

## Steps needed to let this work in your project

### 1. Empty env.js file in your public dir
For runtime environments, we will overwrite this `public/env.js` file within the nginx serve folder of your app.

```javascript
// ./public/env.js
window.__env__ = {}
```

### 2. Script tag in your index.html file
Add a script tag to your `./public/index.html` head to load the env.js file that will contain our runtime configuration.

```html
<!-- runtime env config -->
<script src="%PUBLIC_URL%/env.js"></script>
```

### 3. Add the set-env.sh script file in your project
To write the contents of your container env variables into the js file that will be delivered to your app for configuration, we need the sh script to read your environment configuration.

In the example provided in `docker/docker-entrypoint.d/set-env.sh`, we only read prefixed REACT_APP variables and expose them to the public.

NOTE: You should not expose any other variables due to security concerns.

### 4. Dockerfile adjustments
The provided Dockerfile example is a simple multistage build of your react app served by nginx v.1.19.

For an environment based configuration to work, we just need to copy the set-env.sh file located in `docker/docker-entrypoint.d/` dir into the entrypoint of your nginx stage.

```dockerfile
# Add the script to write appConfig.js to the entrypoint
COPY docker/docker-entrypoint.d/set-env.sh /docker-entrypoint.d/
```
With this in place, on container startup all `REACT_APP` prefixed variables are read from your container environment and written in a `env.js` file that will be loaded by your index.html as a script when your app is served.

## Docker | Runtime Example

**Build:** `docker build -t react-runtime-env-docker .`

**Run:** `docker run -p 3000:80 -e REACT_APP_SOME_ENV=SOME_ENV react-runtime-env-docker`

**Visit:** `localhost:3000` to see your runtime configuration.

## Docker Compose | Runtime example
**Build:** `docker-compose build --no-cache`

**Spin up:** `docker-compose up -d`

**Down:** `docker-compose down`

Change some environment variables.
```dockerfile
 version: "3.7"

 services:
   react-app-runtime-env:
     build:
       context: ./
       dockerfile: Dockerfile
     environment:
       - REACT_APP_SOME=SOME_ENV
       - REACT_APP_API_URL=https://some-api-host.com
       - REACT_APP_APP_LOADER_URL=https://some-app-loader-url.com
     ports:
       - "3000:80"
```
**Up again**: `docker compose up -d` 🚀

![MarineGEO circle logo](/public/working_example.png "MarineGEO logo")