import Image from "next/image";
import profileImage from "../../public/img/profile_image.jpeg";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <section
        className="flex-center flex-col py-80px text-white"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,90,135,1) 0%, rgba(0,20,137,1) 100%)",
        }}
      >
        <div className="h-300px w-300px overflow-hidden rounded-full border-2 border-white">
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
        <button className="mt-24px rounded-10px border border-white px-24px py-16px text-18px font-medium duration-200 hover:border-yellow-300 hover:text-yellow-300">
          <Link href="/about">Who Am I</Link>
        </button>
      </section>
    </section>
  );
}
