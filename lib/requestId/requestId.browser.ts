export function withRequestID(next: () =>  Promise<void>) {
  return next();
}

export function getRequestID() {
  return 'FAKE_BROWSER_REQUEST_ID';
}
