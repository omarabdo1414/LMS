import Image from "next/image";
import React from "react";
import notFound from "../../../../public/404.svg";
import Link from "next/link";
type TNotFoundPropos = {
  title: string;
  btnName: string;
  hrefLink: string;
};
export default function NotFound({
  title,
  btnName,
  hrefLink,
}: TNotFoundPropos) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  rounded-lg">
      <Image className="w-[30rem]" src={notFound} alt="404 not found" />
      <p className="mb-6 text-xl">{title}</p>
      <Link
        href={hrefLink}
        className="w-40 h-10 font-semibold text-white  flex justify-center items-center rounded-lg bg-primary hover:bg-primary/90 cursor-pointer"
      >
        {btnName}
      </Link>
    </div>
  );
}
