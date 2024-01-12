export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex min-h-screen min-w-screen flex-col p-6">
      <h1>My Page</h1>
    </main>
  );
}
