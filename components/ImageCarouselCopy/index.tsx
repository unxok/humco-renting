"use client";

import useEmblaCarousel from "embla-carousel-react";
import RightArrow from "@/app/resources/svg/RightArrow.svg";
import LeftArrow from "@/app/resources/svg/LeftArrow.svg";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ImageCarouselProps = {
  images?: string[] | null;
};

export const ImageCarouselCopy = ({ images }: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [currentSlide, setCurrentSlide] = useState({
    max: images ? images.length - 1 : 0,
    min: 0,
    current: 0,
  });

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
    <div
      className='border border-primary w-[99vw] max-w-[99vw] h-[99vh] max-h-[99vh] p-0 z-[100000] overflow-hidden'
      ref={emblaRef}
    >
      <div className='flex'>
        {images?.map((url, i) => (
          <div key={url + i} className='flex-0 min-w-0 relative'>
            <img
              className='block h-[99vh] w-full object-cover'
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
        className='absolute top-1/2 -translate-y-1/2 right-1'
        width={50}
        height={50}
      />
      <Image
        src={LeftArrow}
        alt='Previous Image'
        onClick={() => slidePrev()}
        className='absolute top-1/2 -translate-y-1/2 left-1'
        width={50}
        height={50}
      />
      <div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-row items-center justify-center gap-3'>
        {images?.map((url, i) => (
          <div
            key={"dot" + i}
            className={`border border-primary rounded-full w-5 h-5 ${
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
  );
};
