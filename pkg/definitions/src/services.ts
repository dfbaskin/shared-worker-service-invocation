export interface TestServiceResultA {
  value: string;
  timestamp: string;
}

export interface TestServiceResultB {
  value: string;
  timestamp: string;
}

export interface ServiceSettings {
  value: string;
  enabled: boolean;
  message?: string;
}

export interface TestServiceResultC {
  value: string;
  timestamp: string;
}

export interface TestServiceResultD {
  value: string;
  timestamp: string;
}

export interface TestServiceResult {
  a?: TestServiceResultA;
  b?: TestServiceResultB;
  c?: TestServiceResultC;
  d?: TestServiceResultD;
  order: string[];
}

export interface ServiceA {
  doSomething: () => TestServiceResultA;
  chainForward: () => Promise<TestServiceResult>;
  chainBackward: (result: TestServiceResult) => Promise<TestServiceResult>;
  transformSettings: () => Promise<ServiceSettings>;
}

export interface ServiceB {
  doSomething: () => TestServiceResultB;
  chainForward: (result: TestServiceResult) => Promise<TestServiceResult>;
  chainBackward: (result: TestServiceResult) => Promise<TestServiceResult>;
  getSettings: () => ServiceSettings;
}

export interface ServiceC {
  doSomething: () => TestServiceResultC;
  chainForward: (result: TestServiceResult) => Promise<TestServiceResult>;
  chainBackward: (result: TestServiceResult) => Promise<TestServiceResult>;
  transformSettings: () => Promise<ServiceSettings>;
}

export interface ServiceD {
  doSomething: () => TestServiceResultD;
  chainForward: (result: TestServiceResult) => Promise<TestServiceResult>;
  chainBackward: () => Promise<TestServiceResult>;
  transformSettings: () => Promise<ServiceSettings>;
}
