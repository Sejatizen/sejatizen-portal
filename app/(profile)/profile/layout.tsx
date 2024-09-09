import type { Metadata } from "next";
import localFont from 'next/font/local'
import "../../globals.css";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";


// ELEMENT

// font
const freeman = localFont({
  src: '../../../assets/font/Freeman/Freeman-Regular.ttf',
  display: 'swap'
})

const openSans = localFont({
  src: '../../../assets/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
  display: 'swap'
})


// SYSTEM

// copyright year
const date = new Date();
const year = date.getFullYear();

// member name data
const memberName = "Sejatizen"

export const metadata: Metadata = {
  title: memberName + "'s Profile",
  description: "Web portal member mcsejati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="lap:h-screen tab:h-[200vh] mob:h-[300vh] bg-[#123] font-sans antialiased no-scrollbar scrollbar-hide">

      <div className="flex lap:h-[52vh] -z-[1] bg-[url('/banner.jpg')] bg-top lap:bg-cover lap:pt-[3%] rounded-b-[20%] tab:bg-auto tab:pt-[4%] tab:h-[55vh] mob:bg-auto mob:h-[65vh] mob:pt-[5%]">
        <h2 className={cn(freeman.className, "text-[32px] text-white h-auto lap:ml-[30%] tab:ml-12 mob:ml-8")}>
        Hai, {memberName}
        </h2>
      </div>

      <div className={cn(openSans.className, "absolute cursor-default mx-10 mb-5 inset-x-0 lap:bottom-0 tab:-bottom-[90vh] mob:-bottom-[190vh] text-white font-normal text-[10px] text-center")}>
          Copyright &copy; <span id="copyright">{year} </span> mcsejatiteam All Rights Reserved |  <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-default"><span>  Secured by DiKSiM and developed by DroITs for AdmiNo team</span></TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
      </div>


      {children}


    </main>
  );
}

