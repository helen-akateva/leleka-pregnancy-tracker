import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leleka",
  description: "Main page of Leleka website for pregnant moms ",
};

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
