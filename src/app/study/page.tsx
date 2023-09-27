import React from "react";
import Image from "next/image";
import { TbDatabaseEdit } from "react-icons/tb";
import dashboardImage from "../../../public/img/study-dashboard.jpeg";
import Categories from "@/components/study/Categories";

export default function StudyPage() {
  return (
    <section>
      <section className="relative overflow-hidden rounded-10px bg-main">
        <Image
          src={dashboardImage.src}
          alt="study dashboard"
          width={1200}
          height={400}
          className="h-460px w-full object-cover opacity-70"
          priority
        />
        <div className="absolute bottom-48px left-1/2 mx-auto w-full max-w-screen-xl translate-x-[-50%] px-16px text-white">
          <h1 className="mt-8px flex items-center gap-8px text-24px font-medium">
            <span>{`KMin's Dev Note`}</span>
            <TbDatabaseEdit className="text-24px" />
          </h1>
          <p className="mt-24px text-48px">경민의 개발공부</p>
        </div>
      </section>
      <section className="relative mx-auto max-w-screen-xl pt-24px">
        <Categories />
      </section>
    </section>
  );
}
