import PrimeReactUIProvider from "@/components/common/PrimeReactUIProvider";
import { Sidebar } from "@/components/common/sidebar";
import TanstackQueryProvider from "@/components/common/TanstackQueryProvider";
import React from "react";
import type { Metadata } from "next";
import { pretendard } from "@/utils/fonts";
import Header from "@/components/common/Header";
import { ChakraUIProvider } from "@/components/common/ChakraUIProvider";
import BottomNavigation from "@/components/common/BottomNavigation";
import ScrollToTop from "@/components/common/ScrollToTop";
import RecoilProvider from "@/components/common/RecoilProvider";
import ImageDetailProvider from "@/components/common/ImageDetailProvider";

import "./globals.css";
import "../css/react-date-range.css"; // main style file
import "../css/react-date-range-default.css"; // theme css file
import "@toast-ui/editor/dist/toastui-editor.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

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
          <TanstackQueryProvider>
            <PrimeReactUIProvider>
              <ChakraUIProvider>
                <div className="relative flex grow">
                  <Sidebar />
                  <div className="flex grow flex-col">
                    <Header />
                    <main className="grow">
                      <ImageDetailProvider>{children}</ImageDetailProvider>
                    </main>
                  </div>
                  <ScrollToTop />
                </div>
                <BottomNavigation />
              </ChakraUIProvider>
            </PrimeReactUIProvider>
          </TanstackQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
