"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import "uikit/dist/css/uikit.min.css";

// Font
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface CopyButtonProps {
  textToCopy: string;
}

// CopyButton Component
export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [tooltipText, setTooltipText] = useState("Copy");
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setTooltipText("Copied");
        setTooltipVisible(true);
        setTimeout(() => {
          setTooltipText("Copy");
          setTooltipVisible(false);
        }, 5000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleClick = () => {
    setTooltipVisible(!isTooltipVisible);
    handleCopy();
  };

  return (
    <TooltipProvider>
      <Tooltip open={isTooltipVisible} delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            className="w-[40px] p-2 h-[40px] rounded-full -translate-y-2 text-[#808080] font-light hover:text-white hover:bg-[rgb(194,194,194)]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <ContentCopyOutlinedIcon fontSize="small" className="font-light" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-white border-none bg-[#1e1e1e] data-[state=open]:animate-slideDownAndFade data-[side=bottom]:slide-in-from-top-2"
        >
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface SearchResultProps {
  memberId: string | null;
}

// SearchResult Component
export const SearchResult: React.FC<SearchResultProps> = ({ memberId }) =>
  memberId ? (
    <h4 className="text-black text-xl font-bold text-right inline-block align-top">
      {memberId}
    </h4>
  ) : null;

interface SearchInputProps {
  onSearch: (phone: string) => void;
}

// SearchInput Component
export const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const phoneInput = document.getElementById(
      "phone"
    ) as HTMLInputElement | null;
    const getButton = document.getElementById(
      "getPhone"
    ) as HTMLButtonElement | null;

    if (phoneInput) {
      phoneInput.oninvalid = function (event) {
        const target = event.target as HTMLInputElement;
        if (target) {
          target.setCustomValidity(
            'Berikan tanda "+" diawal nomor (contoh: +62)'
          );
        }
      };

      phoneInput.oninput = function (event) {
        const target = event.target as HTMLInputElement;
        if (target) {
          target.setCustomValidity("");
        }
      };

      phoneInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          if (getButton) {
            getButton.classList.add("bg-[rgba(60,115,157,0.7)]", "text-white");
            setTimeout(() => {
              getButton.click();
              getButton.classList.remove(
                "bg-[rgba(60,115,157,0.7)]",
                "text-white"
              );
            }, 150);
          }
        }
      });
    }
  }, []);

  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        const phoneInput = document.getElementById(
          "phone"
        ) as HTMLInputElement | null;
        if (phoneInput) {
          const phone = phoneInput.value;
          onSearch(phone);
        }
      }}
    >
      <Input
        className="flex-1 px-[7%] py-auto lap:w-[75%] tab:w-[75%] mob:w-[70%] lap:h-11 tab:h-11 mob:h-12 bg-[#d9d9d9] active:bg-[#d9d9d9] focus:bg-[#d9d9d9] text-black placeholder:text-[13px] placeholder:font-sans placeholder:text-[#808080] placeholder:align-middle rounded-full focus-visible:outline-none"
        id="phone"
        type="tel"
        placeholder="No. Telepon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        maxLength={20}
        pattern="\+[0-9]+"
        required
      />
      <Button
        className={cn(
          roboto.className,
          "rounded-full lap:h-11 tab:h-11 mob:h-12 text-s text-[#000123] lap:w-[25%] tab:w-[25%] mob:w-[30%] bg-[#3C739D] hover:text-white hover:bg-[rgb(60,115,157,0.5)] active:text-white active:bg-[rgba(60,115,157,0.7)]"
        )}
        id="getPhone"
        type="submit"
      >
        Cari
      </Button>
    </form>
  );
};

// Default export for easier imports elsewhere
export default {
  SearchInput,
  SearchResult,
  CopyButton,
};
