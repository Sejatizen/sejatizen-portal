"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DrawerDialogDemo } from "@/components/drawer-resp";
import { RenderCard } from "@/components/render-card";
import { PrintButton, MemberCard } from "@/components/print-card";
import {
  PersonOutlined,
  RoomOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";

// ELEMENT

// font
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const openSans = localFont({
  src: "../../../assets/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  display: "swap",
});

// PAGE
export default function Profile() {
  // SYSTEM

  // member data
  const memberName = "Sejatizen";
  const memberRegion = "Jawa Barat";
  const memberPhone = "+621234567890";

  // print-card
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <section className="lap:flex tab:block mob:block w-full lap:h-full tab:h-auto mob:h-auto relative box-border inset-x-0 lap:-top-[52%] tab:-top-36 mob:-top-48">
      <Card className="relative bg-[#0F355A] p-[2%] shadow-[0_6px_20px_0_rgb(0,0,0,0.30)] border-none rounded-[20px] lap:mx-[2%] lap:my-auto lap:h-[96%] lap:w-[25%] tab:mx-auto tab:my-0 tab:h-[60vh] tab:w-[80%] mob:mx-auto mob:my-0 mob:h-[85vh] mob:w-[90%]">
        <CardHeader className="p-0 space-y-0 flex">
          <a
            className="my-4 lap:mx-auto tab:ml-4 mob:mx-auto h-4"
            href="https://mcsejati.site"
          >
            <Image
              src={"/mcsejati-word-logo.png"}
              alt="mcsejati-logo"
              width={150}
              height={150}
            />
          </a>
        </CardHeader>

        <CardContent className="p-0 space-x-0 mx-auto lap:w-[100%] lap:my-14 lap:translate-x-0 lap:translate-y-0 tab:w-[40%] tab:my-28 tab:translate-x-[16vw] tab:-translate-y-[24vh] mob:w-[90%] mob:my-12 mob:translate-x-0 mob:translate-y-0">
          <Accordion
            className={cn(
              openSans.className,
              "text-white text-[14px] font-normal"
            )}
            type="single"
            collapsible
          >
            <AccordionItem
              className="lap:pb-0 tab:pb-4 mob:pb-4 lap:border-none"
              value="item-1"
            >
              <PersonOutlined fontSize="medium" className="translate-y-7" />
              <AccordionTrigger className="h-4 ml-8 px-3 mb-2 rounded-full text-white text-[12px] hover:no-underline hover:bg-[rgb(183,227,248,0.3)] active:bg-[rgb(183,227,248,0.3)] focus:bg-[rgb(183,227,248,0.3)]">
                Nama
              </AccordionTrigger>
              <AccordionContent className="px-3 ml-8 font-semibold select-text">
                {memberName}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              className="lap:pb-0 tab:pb-4 mob:pb-4 lap:border-none"
              value="item-2"
            >
              <RoomOutlined fontSize="medium" className="translate-y-7" />
              <AccordionTrigger className="h-4 ml-8 px-3 mb-2 rounded-full text-white text-[12px] hover:no-underline hover:bg-[rgb(183,227,248,0.3)] active:bg-[rgb(183,227,248,0.3)] focus:bg-[rgb(183,227,248,0.3)]">
                Asal Daerah
              </AccordionTrigger>
              <AccordionContent className="px-3 ml-8 font-semibold select-text">
                {memberRegion}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              className="lap:pb-0 tab:pb-4 mob:pb-4 lap:border-none"
              value="item-3"
            >
              <PhoneOutlined fontSize="medium" className="translate-y-7" />
              <AccordionTrigger className="h-4 ml-8 px-3 mb-2 rounded-full text-white text-[12px] hover:no-underline hover:bg-[rgb(183,227,248,0.3)] active:bg-[rgb(183,227,248,0.3)] focus:bg-[rgb(183,227,248,0.3)]">
                No. Telepon
              </AccordionTrigger>
              <AccordionContent className="px-3 ml-8 font-semibold select-text">
                {memberPhone}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>

        <DrawerDialogDemo />
      </Card>

      <div className="flex flex-col justify-center w-full lap:h-full tab:h-auto mob:h-auto lap:px-16 tab:px-8 mob:px-0">
        <RenderCard />

        <MemberCard componentRef={componentRef} />
        <PrintButton componentRef={componentRef} />
      </div>
    </section>
  );
}
