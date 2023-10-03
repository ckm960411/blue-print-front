import { pretendard } from "@/utils/fonts";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { ChakraUIProvider } from "@/components/ChakraUIProvider";
import BottomNavigation from "@/components/BottomNavigation";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: `KMin's Blog`,
  description: "프론트엔드 개발자 경민의 블로그입니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="flex flex-col font-normal">
        <ChakraUIProvider>
          <div className="relative flex grow">
            <SideBar />
            <div className="grow">
              <Header />
              <main className="p-16px">{children}</main>
            </div>
            <ScrollToTop />
          </div>
          <BottomNavigation />
        </ChakraUIProvider>
      </body>
    </html>
  );
}
