"use client";

import Image from "next/image";
import { HeartOutline } from "@/app/resources/svg/HeartOutline";
import { HeartFilled } from "@/app/resources/svg/HeartFilled";
import { Comment } from "@/app/resources/svg/Comment";
import { Share } from "@/app/resources/svg/Share";

export const SocialBar = ({ likes }: { likes: number }) => (
  <div className="flex flex-row justify-around items-center w-full">
    <div className="flex flex-col items-center justify-center">
      <HeartOutline fill="hsl(var(--foreground))" h={30} w={30} />
      <span>{likes}</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <Comment fill="hsl(var(--foreground))" h={30} w={30} />
      <span>{likes}</span>
    </div>
    {/* TODO Fix share handler */}
    <div
      onClick={() => navigator.share({ url: window.location.href })}
      className="flex flex-col items-center justify-center"
    >
      <Share fill="hsl(var(--foreground))" h={30} w={30} />
      <span>{likes}</span>
    </div>
  </div>
);
