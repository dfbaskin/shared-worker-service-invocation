# shared-worker-service-invocation

Example of using Comlink to invoke services between the browser and multiple shared workers.

[https://dfbaskin.github.io/shared-worker-service-invocation/](https://dfbaskin.github.io/shared-worker-service-invocation/)

To run:

```
npx nx serve webapp
```

To run Zipkin:

```
docker run -d -p 9411:9411 openzipkin/zipkin
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/dfbaskin/shared-worker-service-invocation)
