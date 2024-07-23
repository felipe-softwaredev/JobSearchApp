export default function homeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-slate-800">
      <div>{children}</div>
    </main>
  );
}
