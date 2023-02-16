import type { AppProps } from 'next/app';

import { AuthProvider } from '@/auth/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
