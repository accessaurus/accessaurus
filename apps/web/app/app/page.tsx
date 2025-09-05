export default function AppHome() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">App</h1>
      <p className="mt-2 text-muted-foreground">This area is protected.</p>
      <div className="mt-6 rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          You are signed in and can access your application content here.
        </p>
      </div>
    </div>
  );
}
