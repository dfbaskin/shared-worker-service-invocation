import { registerServiceInstance } from '@example/definitions';
import { createServiceB } from '@example/service-b';

registerServiceInstance('b-service', createServiceB());
