import { useRouter } from 'next/router';

export default function DynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main>
      <h1>Dynamic Page</h1>
      <p>id: {id}</p>
    </main>
  );
}