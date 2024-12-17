import { useRouter } from "next/router";

export default function TestPage() {
  const router = useRouter();
  return (
    <div>
      <h1>This is the blog post page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  );
}