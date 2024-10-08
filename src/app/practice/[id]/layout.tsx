export default function PracticeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-[600px] w-full mx-auto">{children}</div>;
}
