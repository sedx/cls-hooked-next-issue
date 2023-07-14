import useSWR, {SWRConfiguration } from 'swr';
import { getRequestID } from "../lib";

const fetcher = (url: string) => fetch(url).then(r => r.json())

const config: SWRConfiguration = { revalidateOnFocus: false };

export default function Home({ requestId }: { requestId: string }) {
  const { data: raw } = useSWR<{ requestId: string }>('/rawServer/requestId', fetcher, config);
  const { data: next } = useSWR<{ requestId: string }>('/api/requestId', fetcher, config);

  return (
    <div>
      <div>Request ID from server side: {requestId}</div>
      <div>Request ID from raw API: {raw?.requestId}</div>
      <div>Request ID from Next API: {next?.requestId}</div>
    </div>
  )
}


export const getServerSideProps = () => {
  // Here is no access to current cls namespace
  const requestId = getRequestID();
  console.log(`${requestId}: Home#getServerSideProps called `)
  return {
    props: {
      requestId
    }
  }
}
