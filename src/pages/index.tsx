import { GetServerSideProps } from 'next';

import { useAuth } from '@/auth/useAuth';
import { logout, signInWithGoogleRedirect } from '@/util/firebase';

interface Props {
  serverTime: number;
}
export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
  return { props: { serverTime: Date.now() } };
};

export default function Home({ serverTime }:Props) {
  const auth = useAuth();

  return (
    <main>
      <h1>Firebase Next SSR Auth</h1>
      <p>Server time: { serverTime }</p>
      { auth === undefined/*loading*/ ? <p>Loading...</p> : 
        auth.user === null/*not logged in*/ ? <button onClick={signInWithGoogleRedirect}>Login</button> :
        <div>
          <pre>Auth state: {JSON.stringify(auth, null, 2)}</pre>
          <button onClick={logout}>Logout</button>
        </div>
      }
    </main>
  )
}
