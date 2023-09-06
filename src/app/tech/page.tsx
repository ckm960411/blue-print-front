import React from 'react';
import Image from 'next/image';
import { AiOutlineLaptop } from 'react-icons/ai';
import techDashboardImage from '../../../public/img/tech-dashboard.jpg';

export default function TechPage() {
  return (
    <section>
      <section className="bg-main relative">
        <Image
          src={techDashboardImage.src}
          alt="study dashboard"
          width={1200}
          height={400}
          className="w-full h-460px object-cover opacity-70"
          priority
        />
        <div className="absolute bottom-48px left-1/2 translate-x-[-50%] text-white max-w-screen-xl mx-auto w-full px-16px">
          <h1 className="text-24px font-medium mt-8px flex items-center gap-8px">
            <span>{`KMin's Tech Story`}</span>
            <AiOutlineLaptop className="text-24px" />
          </h1>
          <p className="text-48px mt-24px">경민의 기술블로그</p>
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto px-16px pt-24px relative">
        <hr className="my-24px" />
      </section>
    </section>
  );
}
