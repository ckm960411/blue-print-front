import React from 'react';
import Image from 'next/image';
import { TbDatabaseEdit } from 'react-icons/tb';
import dashboardImage from '../../../public/img/study-dashboard.jpeg';
import javascriptImg from '../../../public/img/tmp/javascript.png';
import typescriptImg from '../../../public/img/tmp/typescript.png';
import reactImg from '../../../public/img/tmp/react.png';
import nextjsImg from '../../../public/img/tmp/nextjs.png';
import CategoryCard from '@/components/study/CategoryCard';
import { CategoryCardData } from '@/utils/types/study';

export default function StudyPage() {
  const categories: CategoryCardData[] = [
    {
      id: 1,
      title: 'JavaScript 마스터',
      thumbnail: javascriptImg.src,
      totalPostCount: 22,
    },
    {
      id: 2,
      title: 'TypeScript 마스터',
      thumbnail: typescriptImg.src,
      totalPostCount: 15,
    },
    {
      id: 3,
      title: 'React 마스터',
      thumbnail: reactImg.src,
      totalPostCount: 17,
    },
    {
      id: 4,
      title: 'Next JS 마스터',
      thumbnail: nextjsImg.src,
      totalPostCount: 6,
    },
  ];

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
      <section className="max-w-screen-xl mx-auto px-16px pt-24px relative">
        <hr className="my-24px" />
        <div className="min-h-[360px]">
          <p className="text-26px font-bold">Language & Framework</p>
          <div className="grid grid-cols-3 mt-24px gap-16px">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
        <hr className="my-24px" />
        <div className="min-h-[360px]">
          <p className="text-26px font-bold">Language & Framework</p>
          <div className="grid grid-cols-3 mt-24px gap-16px">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
