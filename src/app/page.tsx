import Image from 'next/image';
import profileImage from '../../public/img/profile_image.jpeg';
import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <section
        className="text-white flex-center py-80px flex-col"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,90,135,1) 0%, rgba(0,20,137,1) 100%)',
        }}
      >
        <div className="w-300px h-300px rounded-full overflow-hidden border-2 border-white">
          <Image
            src={profileImage.src}
            alt="KMin Profile Image"
            width={300}
            height={300}
            priority
          />
        </div>
        <h1 className="mt-32px text-24px font-bold">{`Welcome KMin's Blog`}</h1>
        <p className="mt-16px text-18px font-medium">
          프론트엔드 개발자 KMin입니다
        </p>
        <button className="px-24px py-16px text-18px font-medium border border-white rounded-10px mt-24px hover:border-yellow-300 hover:text-yellow-300 duration-200">
          <Link href="/about">Who Am I</Link>
        </button>
      </section>
    </section>
  );
}
