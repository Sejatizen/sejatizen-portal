"use client";

import { useState, useEffect } from "react";
import { RefObject } from "react";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

const inconsolata = localFont({
  src: "../assets/font/Inconsolata/Inconsolata-VariableFont_wdth,wght.ttf",
  display: "swap",
});

const openSans = localFont({
  src: "../assets/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  display: "swap",
});

// SYSTEM

// card image source
const frontImageUrl = "/Sejatizen Card-front.png";
const backImageUrl = "/Sejatizen Card-back.png";

// member data
const memberId = "a00aa000";
const memberName = "Josh";
const memberJoin = "23/03/2018";

// card front
const CardFront = ({ imageUrl }: { imageUrl: string }) => (
  <div className="relative bg-[url('/Sejatizen Card-front.png')] card-front">
    <Image src={imageUrl} alt="card-front" width={1012} height={638} />
  </div>
);

// card back
const CardBack = ({
  imageUrl,
  memberId,
  name,
  joinDate,
}: {
  imageUrl: string;
  memberId: string;
  name: string;
  joinDate: string;
}) => (
  <div className="relative bg-[url('/Sejatizen Card-back.png')] w-[1012px] h-[637px] justify-center card-back">
    <Image src={imageUrl} alt="card-back" width={1012} height={638} />
    <div className="absolute w-[1012px] mx-auto h-[318.5px] box-content top-[130px] grid grid-cols-2 gap-x-[230px]">
      <div className="block ml-[250px]">
        <p
          className={cn(
            inconsolata.className,
            "w-[293px] text-white text-[62px] text-center font-normal"
          )}
        >
          {memberId}
        </p>
        <p
          className={cn(
            openSans.className,
            "mt-[30px] w-[293px] text-black text-[38px] text-center font-semibold"
          )}
        >
          {name}
        </p>
        <p
          className={cn(
            openSans.className,
            "mt-[45px] w-[293px] text-black text-[38px] text-center font-semibold"
          )}
        >
          {joinDate}
        </p>
      </div>

      <QRCode
        className="relative top-[35px] mx-auto"
        size={250}
        level="Q"
        fgColor="white"
        bgColor="transparent"
        value={memberId}
      />
    </div>
  </div>
);

// print button
const PrintButton = ({
  componentRef,
  ...props
}: {
  componentRef: RefObject<HTMLDivElement>;
}) => {
  const [isMutating, setIsMutating] = useState(false);
  const [text, setText] = useState("Unduh Kartu Member");
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (isMutating) {
      let dots = "";
      const intervalId = setInterval(() => {
        dots += ".";
        setText(`Downloading${dots}`);

        if (dots.length === 3) {
          dots = "";
        }
      }, 120);

      setAnimation(true);

      return () => clearInterval(intervalId);
    } else {
      setText("Unduh Kartu Member");
      setAnimation(false);
    }
  }, [isMutating]);

  const handlePrint = async () => {
    setIsMutating(true);

    const input = componentRef.current;
    if (input) {
      try {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: [54, 86],
        });

        const elements = input.children;
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLElement;
          const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
          });
          const imgData = canvas.toDataURL("image/png");

          if (i > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, "PNG", 0, 0, 86, 54, undefined, "FAST");
        }

        pdf.save("Sejatizen Card.pdf");
        console.log("PDF successfully saved!");
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    } else {
      console.error("Component reference is null");
    }

    setIsMutating(false);
  };

  return (
    <Button
      className={cn(
        roboto.className,
        "mx-auto lap:rounded-full tab:rounded-[20px] mob:rounded-[20px] lap:h-11 tab:h-12 mob:h-14 text-s text-[#000123] lap:w-[40%] tab:w-[50%] mob:w-[70%] bg-[#3C739D] hover:text-white hover:bg-[rgb(60,115,157,0.5)] active:text-white active:bg-[rgba(60,115,157,0.7)] mutating:text-[#000123] mutating:bg-[#3C739D] mutating:cursor-progress"
      )}
      onClick={handlePrint}
      disabled={isMutating}
      {...props}
    >
      {text}
    </Button>
  );
};

const MemberCard = ({
  componentRef,
}: {
  componentRef: RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={componentRef}
      className="absolute -z-50 -top-[200vh] -left-[200vw]"
    >
      <CardFront imageUrl={frontImageUrl} />
      <CardBack
        imageUrl={backImageUrl}
        memberId={memberId}
        name={memberName}
        joinDate={memberJoin}
      />
    </div>
  );
};

export { CardFront, CardBack, PrintButton, MemberCard };
