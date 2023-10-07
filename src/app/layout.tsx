import { pretendard } from "@/utils/fonts";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { ChakraUIProvider } from "@/components/common/ChakraUIProvider";
import BottomNavigation from "@/components/common/BottomNavigation";
import ScrollToTop from "@/components/common/ScrollToTop";
import RecoilProvider from "@/components/common/RecoilProvider";

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
        <RecoilProvider>
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
        </RecoilProvider>
      </body>
    </html>
  );
}
