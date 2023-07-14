import { getRequestID as defaultGetRequestID } from './requestId.browser';

let requestIdGetter = defaultGetRequestID;

export const setupRequestId = (
  typeof window === 'undefined' ? import('./requestId.server') : import('./requestId.browser')
).then((module) => {
  requestIdGetter = module.getRequestID;
  return module.withRequestID;
});

export function getRequestID() {
  return requestIdGetter();
}
