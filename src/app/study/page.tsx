import React from 'react';
import Image from 'next/image';
import { TbDatabaseEdit } from 'react-icons/tb';
import dashboardImage from '../../../public/img/study-dashboard.jpeg';
import Categories from '@/components/study/Categories';

export default function StudyPage() {
  return (
    <section>
      <section className="bg-main relative">
        <Image
          src={dashboardImage.src}
          alt="study dashboard"
          width={1200}
          height={400}
          className="w-full h-460px object-cover opacity-70"
          priority
        />
        <div className="absolute bottom-48px left-1/2 translate-x-[-50%] text-white max-w-screen-xl mx-auto w-full px-16px">
          <h1 className="text-24px font-medium mt-8px flex items-center gap-8px">
            <span>{`KMin's Dev Note`}</span>
            <TbDatabaseEdit className="text-24px" />
          </h1>
          <p className="text-48px mt-24px">경민의 개발공부</p>
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto pt-24px relative">
        <Categories />
      </section>
    </section>
  );
}
