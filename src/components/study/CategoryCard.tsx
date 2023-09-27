import React from 'react';
import Image from 'next/image';
import javascriptImg from '../../../public/img/tmp/javascript.png';
import { CategoryCardData } from '@/utils/types/study';
import Link from 'next/link';
import SpaceY from '../SpaceY';

interface CategoryCardProps {
  category: CategoryCardData;
}
export default function CategoryCard({ category }: CategoryCardProps) {
  const { id, title, thumbnail, totalPostCount } = category;

  return (
    <Link href={`/study/${id}`}>
      <div className="rounded-10px shadow-md overflow-hidden flex items-center duration-200 hover:shadow-lg">
        <Image
          src={thumbnail}
          alt="목이미지"
          width={200}
          height={200}
          className="w-80px h-80px object-contain"
        />
        <div className="grow h-full p-16px">
          <p className="font-semibold">{title}</p>
          <SpaceY height={8} />
          <p className="font-medium text-gray-600 text-14px">
            게시물 수: {totalPostCount}개
          </p>
        </div>
      </div>
    </Link>
  );
}
