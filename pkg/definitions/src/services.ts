export interface TestServiceResultA {
  value: string;
  timestamp: string;
}

export interface TestServiceResultB  {
  value: string;
  timestamp: string;
}

export interface TestServiceResultC  {
  value: string;
  timestamp: string;
}

export interface TestServiceResultD  {
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
}

export interface ServiceB {
  doSomething: () => TestServiceResultB;
}

export interface ServiceC {
  doSomething: () => TestServiceResultC;
}

export interface ServiceD {
  doSomething: () => TestServiceResultD;
}
