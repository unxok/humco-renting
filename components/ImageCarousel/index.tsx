"use client";

import useEmblaCarousel from "embla-carousel-react";
import RightArrow from "@/app/resources/svg/RightArrow.svg";
import LeftArrow from "@/app/resources/svg/LeftArrow.svg";
import X from "@/app/resources/svg/X.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ImageCarouselProps = {
  listingId: number;
  images?: string[] | null;
  startIndex?: number | null;
};

export const ImageCarousel = ({ listingId, images }: ImageCarouselProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    watchDrag: false,
    startIndex: Number(searchParams.get("index")) || 0,
  });
  const [currentSlide, setCurrentSlide] = useState({
    max: images ? images.length - 1 : 0,
    min: 0,
    current: Number(searchParams.get("index")) || 0,
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("index", currentSlide.current.toString());
    window.history.pushState({}, "", url);
  }, [currentSlide]);

  useEffect(() => {
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.key === "Escape") {
          router.push(`/listings/${listingId}`);
        }
      },
      { once: true }
    );
  }, []);

  const slideNext = () => {
    emblaApi?.scrollNext();
    setCurrentSlide((prev) => {
      if (prev.current + 1 > prev.max) {
        return { ...prev, current: prev.min };
      }
      return { ...prev, current: prev.current + 1 };
    });
  };

  const slidePrev = () => {
    emblaApi?.scrollPrev();
    setCurrentSlide((prev) => {
      if (prev.current - 1 < prev.min) {
        return { ...prev, current: prev.max };
      }
      return { ...prev, current: prev.current - 1 };
    });
  };

  return (
    <div className='bg-black fixed inset-0'>
      <div
        className='border flex border-primary w-full h-full p-0 overflow-hidden'
        ref={emblaRef}
      >
        <div className='flex'>
          {images?.map((url, i) => (
            <div key={url + i} className='flex-0 min-w-0 relative'>
              <img
                loading='lazy'
                className='block max-h-full my-0 mx-auto'
                src={url}
                alt={`Picture Number ${i}`}
                // width={200}
                // height={"auto"}
              />
            </div>
          ))}
        </div>
        <Image
          src={RightArrow}
          alt='Next Image'
          onClick={() => slideNext()}
          className='absolute top-1/2 -translate-y-1/2 right-1 hover:cursor-pointer'
          width={50}
          height={50}
        />
        <Image
          src={LeftArrow}
          alt='Previous Image'
          onClick={() => slidePrev()}
          className='absolute top-1/2 -translate-y-1/2 left-1 hover:cursor-pointer'
          width={50}
          height={50}
        />
        <Link href={`/listings/${listingId}`}>
          <Image
            src={X}
            alt='Close Pictures'
            className='absolute top-2 right-2'
            width={50}
            height={50}
          />
        </Link>

        <div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-row items-center justify-center gap-3'>
          {images?.map((url, i) => (
            <div
              key={"dot" + i}
              className={`border border-black rounded-full w-5 h-5 ${
                currentSlide.current === i ? "bg-primary" : "bg-white"
              }`}
              onClick={() => {
                emblaApi?.scrollTo(i);
                setCurrentSlide((prev) => {
                  return { ...prev, current: i };
                });
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
