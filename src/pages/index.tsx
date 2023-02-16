import { GetServerSideProps } from 'next';

interface Props {
  mockData: string;
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { req, res } = context;
  console.log(req, res);
  return { props: { mockData: 'mock data' } };
};
  

export default function Home({ mockData }:Props) {
  return (
    <main>
      <h1>Firebase Next SSR Auth</h1>
      <p>Server side data: { mockData }</p>
    </main>
  )
}
