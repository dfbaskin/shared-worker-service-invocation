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

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/dfbaskin/shared-worker-service-invocation)
