import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Hamburger } from "@/app/resources/svg/Hamburger";
import Image from "next/image";

export const MobileLinks = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Hamburger fill="hsl(var(--foreground))" w={20} h={20} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Some links to get around the website
          </SheetDescription>
          <SheetClose asChild>
            <Link href={"/listings"}>All Listings</Link>
          </SheetClose>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
