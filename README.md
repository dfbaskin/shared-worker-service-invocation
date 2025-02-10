# shared-worker-service-invocation

Example of using Comlink to invoke services between the browser and multiple shared workers.

[https://dfbaskin.github.io/shared-worker-service-invocation/](https://dfbaskin.github.io/shared-worker-service-invocation/)

To run:

```
npm install
npx nx serve webapp
```

To view shared workers (in Chrome):

```
chrome://inspect/#workers
```

To run [Jaeger](https://www.jaegertracing.io/) and view telemetry data:

```
./jaeger-all-in-one --collector.otlp.http.cors.allowed-headers=* --collector.otlp.http.cors.allowed-origins=http://localhost:4200
```

then navigate to [http://localhost:16686](http://localhost:16686) to use the Jaeger UI.

## 🌏  Open in the Cloud 
Click any of the buttons below to start a new development environment to demo or contribute to the codebase without having to install anything on your machine:

[![Open in VS Code](https://img.shields.io/badge/Open%20in-VS%20Code-blue?logo=visualstudiocode)](https://vscode.dev/github/dfbaskin/shared-worker-service-invocation)
[![Open in Glitch](https://img.shields.io/badge/Open%20in-Glitch-blue?logo=glitch)](https://glitch.com/edit/#!/import/github/dfbaskin/shared-worker-service-invocation)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/dfbaskin/shared-worker-service-invocation)
[![Edit in Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/dfbaskin/shared-worker-service-invocation)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/dfbaskin/shared-worker-service-invocation)
[![Open in Repl.it](https://replit.com/badge/github/withastro/astro)](https://replit.com/github/dfbaskin/shared-worker-service-invocation)
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/dfbaskin/shared-worker-service-invocation)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/dfbaskin/shared-worker-service-invocation)
