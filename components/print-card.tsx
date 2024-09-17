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
const memberName = "Sejatizen";
const memberJoin = "23/02/2018";

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
      const intervalId = setInterval(() => {
        setText(`Downloading...`);
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
        "flex items-center text-left mx-auto lap:rounded-full tab:rounded-[20px] mob:rounded-[20px] lap:h-11 tab:h-12 mob:h-14 text-s lap:w-[40%] tab:w-[50%] mob:w-[70%]",
        !isMutating
          ? "text-[#000123] bg-[#3C739D] hover:text-white hover:bg-[rgb(60,115,157,0.5)] active:text-white active:bg-[hsla(206,45%,43%,1)]"
          : "justify-center text-left cursor-not-allowed text-white bg-[#3C739D]/60"
      )}
      onClick={handlePrint}
      disabled={isMutating}
      {...props}
    >
      {animation && (
        <svg
          className="w-10 h-10 ml-3"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          style={{
            shapeRendering: "auto",
            display: "block",
            background: "none",
          }}
        >
          <g>
            <g transform="rotate(0 50 50)">
              <rect
                fill="#ffffff"
                height="12"
                width="6"
                ry="6"
                rx="3"
                y="24"
                x="47"
              >
                <animate
                  repeatCount="indefinite"
                  begin="-0.9166666666666666s"
                  dur="1s"
                  keyTimes="0;1"
                  values="1;0"
                  attributeName="opacity"
                />
              </rect>
            </g>
            <g transform="rotate(30 50 50)">
              <rect
                fill="#ffffff"
                height="12"
                width="6"
                ry="6"
                rx="3"
                y="24"
                x="47"
              >
                <animate
                  repeatCount="indefinite"
                  begin="-0.8333333333333334s"
                  dur="1s"
                  keyTimes="0;1"
                  values="1;0"
                  attributeName="opacity"
                />
              </rect>
            </g>
            <g transform="rotate(60 50 50)">
              <rect
                fill="#ffffff"
                height="12"
                width="6"
                ry="6"
                rx="3"
                y="24"
                x="47"
              >
                <animate
                  repeatCount="indefinite"
                  begin="-0.75s"
                  dur="1s"
                  keyTimes="0;1"
                  values="1;0"
                  attributeName="opacity"
                />
              </rect>
            </g>
            <g transform="rotate(90 50 50)">
              <rect
                fill="#ffffff"
                height="12"
                width="6"
                ry="6"
                rx="3"
                y="24"
                x="47"
              >
                <animate
                  repeatCount="indefinite"
                  begin="-0.6666666666666666s"
                  dur="1s"
                  keyTimes="0;1"
                  values="1;0"
                  attributeName="opacity"
                />
              </rect>
            </g>
            <g transform="rotate(120 50 50)">
              <rect
                fill="#ffffff"
                height="12"
                width="6"
                ry="6"
                rx="3"
                y="24"
                x="47"
              >
                <animate
                  repeatCount="indefinite"
                  begin="-0.5833333333333334s"
                  dur="1s"
                  keyTimes="0;1"
                  values="1;0"
                  attributeName="opacity"
                />
              </rect>
            </g>
            <g transform="rotate(150 50 50)">
              <rect
                fill="#ffffff"
                height="12"
                width="6"
                ry="6"
                rx="3"
                y="24"
                x="47"
              >
                <animate
                  repeatCount="indefinite"
                  begin="-0.5s"
                  dur="1s"
                  keyTimes="0;1"
                  values="1;0"
                  attributeName="opacity"
                />
              </rect>
            </g>
            <g transform="rotate(180 50 50)">
              <rect
                fill="#ffffff"
                height="12"
                width="6"
                ry="6"
                rx="3"
                y="24"
                x="47"
              >
                <animate
                  repeatCount="indefinite"
                  begin="-0.4166666666666667s"
                  dur="1s"
                  keyTimes="0;1"
                  values="1;0"
                  attributeName="opacity"
                />
              </rect>
            </g>
            <g transform="rotate(210 50 50)">
              <rect
                fill="#ffffff"
                height="12"
                width="6"
                ry="6"
                rx="3"
                y="24"
                x="47"
              >
                <animate
                  repeatCount="indefinite"
                  begin="-0.3333333333333333s"
                  dur="1s"
                  keyTimes="0;1"
                  values="1;0"
                  attributeName="opacity"
                />
              </rect>
            </g>
          </g>
        </svg>
      )}
      <span>{text}</span>
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
