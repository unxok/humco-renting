"use client";

import Image from "next/image";
import HeartOutline from "@/app/resources/svg/HeartOutline.svg";
import HeartFilled from "@/app/resources/svg/HeartFilled.svg";
import Comment from "@/app/resources/svg/Comment.svg";
import Share from "@/app/resources/svg/Share.svg";

export const Footer = ({ likes }: { likes: number }) => (
  <div className='flex flex-row justify-around items-center text-black'>
    <div className='flex flex-col items-center justify-center'>
      <Image src={HeartOutline} alt='Likes' height={30} width={30}></Image>
      <span>{likes}</span>
    </div>
    <div className='flex flex-col items-center justify-center'>
      <Image src={Comment} alt='Comments' height={30} width={30}></Image>
      <span>{likes}</span>
    </div>
    <div className='flex flex-col items-center justify-center'>
      <Image
        onClick={() => navigator.share({ url: window.location.href })}
        src={Share}
        alt='Shares'
        height={30}
        width={30}
      ></Image>
      <span>{likes}</span>
    </div>
  </div>
);
