"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SearchInput,
  SearchResult,
  CopyButton,
} from "@/components/search-system";
import MemberIDComponent, {
  InputMemberID,
  LoginButton,
  Modal,
} from "@/components/login-system";
import { cn } from "@/lib/utils";
import { Montserrat as FontSans } from "next/font/google";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import axios from "axios";

// Fonts
const montserrat = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const openSans = localFont({
  src: "../../assets/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  display: "swap",
});

// Page Component
export default function Home() {
  const [memberId, setMemberId] = useState<string | null>(null);
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isButtonActive, setButtonActive] = useState<boolean>(false);

  // Handle Search
  const handleSearch = async (phone: string) => {
    try {
      const res = await fetch("/api/search/route");
      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage.error);
      }
      const data = await res.json();
      setMemberId(data.memberId);
    } catch (error) {
      setMemberId(null);
      console.error("Search Error:", error);
      alert("Tidak tersedia Member ID dengan no. telepon : " + phone);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Generate Mailto Link
  useEffect(() => {
    const createMailtoLink = (
      email: string,
      subject: string,
      body: string
    ): string => {
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    };

    const sendEmail = (event: MouseEvent) => {
      const mailtoLink = createMailtoLink(
        "mcsejatiteam@hotmail.com",
        "Sejatizen Member ID Check Request",
        'Mohon temukan Member ID saya dengan data berikut :\nNama: ""\nAsal daerah: ""\nNo. HP/WA: ""'
      );
      window.location.href = mailtoLink;
      event.preventDefault();
    };

    const emailLink = document.getElementById("emailLink");
    if (emailLink) {
      emailLink.addEventListener("click", sendEmail);
    }

    return () => {
      if (emailLink) {
        emailLink.removeEventListener("click", sendEmail);
      }
    };
  }, []);

  return (
    <section
      className={cn(
        openSans.className,
        "mx-auto lap:gap-x-3 lap:w-[62%] lap:h-[58vh] lap:flex lap:flex-row relative box-border lap:-top-36 tab:flex tab:flex-col tab:gap-y-12 tab:-top-36 tab:w-[75%] tab:h-auto mob:-top-48 mob:flex mob:flex-col mob:gap-y-12 mob:w-[90%] mob:h-auto"
      )}
    >
      {/* Search */}
      <Card className="p-[3%] shrink shadow-[0_6px_20px_0_rgb(0,0,0,0.30)] rounded-[20px] text-white lap:w-[75%] lap:h-[100%] bg-[#0F355A] border-none tab:w-[100%] tab:h-[65vh] tab:pb-6 mob:w-[100%] mob:h-[70vh] mob:pb-8">
        <CardHeader className="p-0 space-y-0">
          <CardTitle
            className={cn(
              montserrat.className,
              "lap:ml-[2%] tab:ml-[5%] lap:mt-2 tab:mt-8 mob:mt-10 text-2xl text-white font-normal lap:text-left tab:text-left mob:text-center cursor-default"
            )}
          >
            Cek Member ID
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mt-6 lap:mx-[10%] tab:mx-[14%] mob:mx-[3%] lap:mb-10 tab:mb-12 mob:mb-16">
            <div className="grid w-full items-center gap-y-6">
              <SearchInput onSearch={handleSearch} />

              <div className="w-full lap:h-[14vh] tab:h-[14vh] mob:h-[15vh] p-[3%] rounded-[20px] bg-[#D9D9D9]">
                <p className="text-[13px] ml-[4.3%] mb-0 text-[#808080]">
                  Member ID :
                </p>
                <div className="flex gap-x-12 place-content-end mr-4 items-center">
                  {memberId ? (
                    <>
                      <SearchResult memberId={memberId} />
                      <CopyButton textToCopy={memberId} />
                    </>
                  ) : (
                    <>
                      <SearchResult memberId="" />
                      <CopyButton textToCopy="" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-[14px] text-center">
            Tidak menemukan Member ID?{" "}
            <span
              className="uk-text-decoration-none uk-button-text cursor-pointer text-[#00FFD1] hover:text-[#5494c5] hover:duration-500"
              id="emailLink"
            >
              Hubungi admin
            </span>
          </p>
        </CardContent>
      </Card>

      <MemberIDComponent />
    </section>
  );
}
