import "@/styles/main.css";
import localFont from "next/font/local";
const dotFont = localFont({ src: "../styles/PixelMplus10-Regular.woff2" });
import Providers from "@/components/Providers";

export const metadata = {
  title: "Responsible Web3",
  description: "Web3Auth NextJS Quick Start",
};

// eslint-disable-next-line no-undef
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dotFont.className}>
        <Providers>
          <div className="wrapper">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
