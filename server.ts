import { ServerResponse, createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { getRequestID, setupRequestId } from './lib'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()


const handler = async (res: ServerResponse) => {
  // Promise here just for response delay simulation
  // and as proof that cls-hooked works fine when async functions
  await new Promise((r) => {
    setTimeout(r, 2e3);
  }).then(() => {
    const requestId = getRequestID();
    console.log(`${requestId}: /rawServer/requestId`)
    res.write(JSON.stringify({ requestId }));
    res.end();
  });
}


app.prepare().then(() => {
  createServer(async (req, res) => {
    const withRequestID = await setupRequestId;
      const parsedUrl = parse(req.url ?? '', true)

    await withRequestID(async () => {
      if (parsedUrl.pathname.startsWith('/_next')) {
        await handle(req, res, parsedUrl);
        return;
      }

      console.log(`Start process request: ${getRequestID()} - ${parsedUrl.pathname}`);

      if (parsedUrl.pathname === '/rawServer/requestId') {
        // HERE IS cls-hooked namespace works fine
        // and we can access to context and get request ID
        await handler(res);
      } else {
        // it this handler we can't access to cls-hooked namespace
        // and request ID is not set
        await handle(req, res, parsedUrl);
      }

      console.log(`Finish process request: ${getRequestID()} - ${parsedUrl.pathname}`);
    });
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
