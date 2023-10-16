import { registerServiceInstance } from '@example/definitions';
import { createServiceA } from '@example/service-a';

registerServiceInstance('a-service', createServiceA());
