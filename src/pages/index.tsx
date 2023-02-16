import { GetServerSideProps } from 'next';

interface Props {
  serverTime: number;
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return { props: { serverTime: Date.now() } };
};

export default function Home({ serverTime }:Props) {
  return (
    <main>
      <h1>Firebase Next SSR Auth</h1>
      <p>Server time: { serverTime }</p>
    </main>
  )
}
