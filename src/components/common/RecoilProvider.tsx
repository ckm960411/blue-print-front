'use client';

import React from "react";
import { RecoilRoot } from "recoil";

interface RecoilProviderProps {
  children: React.ReactNode;
}
export default function RecoilProvider({ children }: RecoilProviderProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
