import { createNamespace } from 'cls-hooked';
import { v4 as uuid } from 'uuid';

const REQUEST_ID_KEY = 'REQUEST_ID_KEY'

type RequestCLS = {
  [REQUEST_ID_KEY]: string;
}

const requestCLS = createNamespace<RequestCLS>('request');

export function withRequestID(next: () =>Promise<void>) {
  return requestCLS.runAndReturn(() => {
    requestCLS.set(REQUEST_ID_KEY, uuid());
    return next();
  })
}

export function getRequestID() {
  return requestCLS.get(REQUEST_ID_KEY) ?? 'FAKE_SERVER_REQUEST_ID';
}
