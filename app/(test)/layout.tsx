export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {" "}
        <main className={"main"}>
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
