"use client";

import useEmblaCarousel from "embla-carousel-react";
import { RightArrow } from "@/app/resources/svg/RightArrow";
import { LeftArrow } from "@/app/resources/svg/LeftArrow";
import { X } from "@/app/resources/svg/X";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type ImageCarouselProps = {
  listingId?: number;
  images?: string[] | null;
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

  const keyEventFunc = (e: KeyboardEvent) => {
    const url = searchParams.get("listingsMode")
      ? "/listings"
      : `listings/${listingId}`;
    if (e.key === "Escape") {
      router.push(url);
      return;
    }
    if (e.key === "ArrowRight" || e.key === "d") {
      slideNext();
      console.log("arrow right");
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      slidePrev();
      console.log("arrow right");
      return;
    }
  };

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

  useEffect(() => {
    document.addEventListener("keyup", keyEventFunc);

    return () => {
      document.removeEventListener("keyup", keyEventFunc);
    };
  }, [emblaApi, slideNext, slidePrev]);

  const backToListing = searchParams.get("listingsMode") ? true : false;

  return (
    <div className="bg-black fixed inset-0">
      <div
        className="border flex border-primary w-full h-full p-0 overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex">
          {images?.map((url, i) => (
            <div key={url + i} className="flex-0 min-w-0 relative">
              <img
                loading="eager"
                className="block max-h-full my-0 mx-auto"
                src={url}
                alt={`Picture Number ${i}`}
                // width={200}
                // height={"auto"}
              />
            </div>
          ))}
        </div>
        <div
          onClick={() => slideNext()}
          className="absolute top-1/2 -translate-y-1/2 right-1 hover:cursor-pointer rounded-full p-2"
        >
          <RightArrow fill="white" w={50} h={50} />
        </div>
        <div
          onClick={() => slidePrev()}
          className="absolute top-1/2 -translate-y-1/2 left-1 hover:cursor-pointer rounded-full p-2"
        >
          <LeftArrow fill="white" w={50} h={50} />
        </div>
        <Link
          className="absolute top-2 right-2 rounded-full p-2"
          href={backToListing ? `/listings` : `/listings/${listingId}`}
        >
          <X fill="white" w={30} h={30} />
        </Link>

        <div className="absolute bottom-5 left-1/2 gap-y-1 -translate-x-1/2 flex flex-row flex-wrap w-full justify-center gap-2 p-2">
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
