import type { Metadata } from "next";
import localFont from 'next/font/local'
import "../globals.css";
import Image from "next/image";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";


// ELEMENT

// font
const openSans = localFont({
  src: '../../assets/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
  display: 'swap'
})


// SYSTEM

// copyright year
const date = new Date();
const year = date.getFullYear();


export const metadata: Metadata = {
  title: "Sejatizen Portal",
  description: "Web portal member mcsejati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="lap:h-screen tab:min-h-screen mob:min-h-screen bg-[#123] antialiased no-scrollbar scrollbar-hide">

      <div className="flex lap:h-[52vh] -z-[1] justify-center bg-[url('/banner.jpg')] bg-top lap:bg-cover lap:pt-[3%] rounded-b-[20%] tab:bg-auto tab:pt-[4%] tab:h-[55vh] mob:bg-auto mob:h-[65vh] mob:pt-[5%]">
        <a className="mx-auto h-4" href="https://mcsejati.site">
          <Image src={"/mcsejati-word-logo.png"} alt="mcsejati-logo" width={180} height={180} />
        </a>
      </div>

      <div className={cn(openSans.className, "absolute cursor-default mx-10 mb-5 inset-x-0 lap:bottom-0 tab:-bottom-full mob:-bottom-full text-white font-normal text-[10px] text-center")}>
          Copyright &copy; <span id="copyright">{year} </span> mcsejatiteam All Rights Reserved |  <TooltipProvider>
            <Tooltip>
              <TooltipTrigger title="About this page (Click for more)" className="cursor-default"><a className="cursor-default text-white no-underline hover:text-white hover:no-underline" href="">  Secured by DiKSiM and developed by DroITs for AdmiNo team</a></TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
      </div>


      {children}


    </main>
  );
}


