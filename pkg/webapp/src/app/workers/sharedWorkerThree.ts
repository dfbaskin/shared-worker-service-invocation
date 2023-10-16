import { registerServiceInstance } from '@example/definitions';
import { createServiceC } from '@example/service-c';
import { createServiceD } from '@example/service-d';

registerServiceInstance('c-service', createServiceC());
registerServiceInstance('d-service', createServiceD());
