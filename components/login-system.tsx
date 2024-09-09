"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Montserrat as FontSans } from "next/font/google";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

// ELEMENT

// font
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
  src: "../assets/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf",
  display: "swap",
});

// Komponen InputMemberID
export const InputMemberID = ({
  inputValue,
  setInputValue,
  checkAndCleanInput,
  setButtonActive,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  checkAndCleanInput: () => void;
  setButtonActive: (isActive: boolean) => void;
}) => {
  const memberIDInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const memberIDInput = memberIDInputRef.current;

    if (!memberIDInput) return;

    const handleInvalid = (event: Event) => {
      (event.target as HTMLInputElement).setCustomValidity(
        "Format Member ID: a00aa000"
      );
    };

    const handleInput = (event: Event) => {
      (event.target as HTMLInputElement).setCustomValidity("");
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setButtonActive(true);
        setTimeout(() => {
          checkAndCleanInput();
          setButtonActive(false);
        }, 150);
      }
    };

    memberIDInput.addEventListener("invalid", handleInvalid);
    memberIDInput.addEventListener("input", handleInput);
    memberIDInput.addEventListener("keypress", handleKeyPress);

    return () => {
      memberIDInput.removeEventListener("invalid", handleInvalid);
      memberIDInput.removeEventListener("input", handleInput);
      memberIDInput.removeEventListener("keypress", handleKeyPress);
    };
  }, [checkAndCleanInput, setButtonActive]);

  return (
    <Input
      className="flex-1 px-[10%] w-[95%] mx-auto lap:h-11 tab:h-11 mob:h-12 bg-[#d9d9d9] text-black text-center rounded-[20px] focus-visible:outline-none"
      id="memberId"
      ref={memberIDInputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      pattern="[a-z]{1}[0-9]{2}[a-z]{2}[0-9]{3}"
      maxLength={8}
      required
    />
  );
};

// Komponen LoginButton
export const LoginButton = ({
  onClick,
  isActive,
}: {
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <Button
      className={cn(
        roboto.className,
        "shrink lap:shadow-[0_6px_20px_0_rgb(0,0,0,0.30)] tab:shadow-none mob:shadow-none rounded-[20px] lap:h-[18%] tab:h-[9vh] mob:h-[10vh] bg-[#3C739D] text-[#000123] hover:text-white hover:bg-[rgb(60,115,157,0.5)] active:text-white active:bg-[rgba(60,115,157,0.7)] lap:w-full tab:w-[60%] mob:w-[80%] lap:mx-0 tab:mx-auto mob:mx-auto lap:translate-y-0 tab:-translate-y-[15vh] mob:-translate-y-[15vh]",
        isActive ? "bg-[rgba(60,115,157,0.7)] text-white" : ""
      )}
      id="login"
      onClick={onClick}
    >
      Login
    </Button>
  );
};

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  onComplete?: () => void;
}

// Komponen Modal
export const Modal = ({ isModalOpen, closeModal, onComplete }: ModalProps) => {
  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent
        className={cn(
          openSans.className,
          "max-w-[425px] gap-y-0 space-y-0 rounded-md h-[35vh] mx-auto bg-[#112233] border-none"
        )}
      >
        <DialogHeader className="-mb-8">
          <DialogTitle
            className={cn(
              montserrat.className,
              "text-white text-center text-[20px] font-normal mb-0"
            )}
          >
            Enter OTP
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center text-[12px]">
            Your code was sent to you via WhatsApp
          </DialogDescription>
        </DialogHeader>

        <InputOTP maxLength={4} autoFocus onComplete={onComplete}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>

          <InputOTPSeparator />

          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </DialogContent>
    </Dialog>
  );
};

// Komponen Utama untuk Mengelola State dan Logika
const MemberIDComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isButtonActive, setButtonActive] = useState(false);
  const inputField = inputValue.trim();

  async function handleSubmit() {
    axios
      .post("/api/login", {
        id: inputField,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const checkAndCleanInput = useCallback(() => {
    const regex = /^[a-z]{1}[0-9]{2}[a-z]{2}[0-9]{3}$/;

    if (inputField === "") {
      alert("Input tidak boleh kosong.");
      return false;
    }

    if (!regex.test(inputField)) {
      alert("Format tidak sesuai. Contoh format yang benar: a00aa000");
      setInputValue(""); // Mengosongkan input jika format tidak valid
      return false;
    }

    openModal();

    return false;
  }, [inputValue]);

  const openModal = () => {
    console.log("Opening Modal"); // Logging
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center h-[100%] lap:gap-y-3 lap:w-[27%] tab:w-[100%] mob:w-[100%]">
        <Card className="lap:p-8 tab:p-0 mob:p-0 lap:px-[10%] tab:px-[auto] mob:px-[auto] shadow-[0_6px_20px_0_rgb(0,0,0,0.30)] justify-center rounded-[20px] bg-[#0F355A] border-none text-white lap:h-[80%] tab:h-[70vh] mob:h-[70vh]">
          <CardHeader className="p-0 space-y-0 lap:mt-0 tab:mt-14 mob:mt-14 lap:mb-[1px] tab:mb-6 mob:mb-4">
            <CardTitle
              className={cn(
                montserrat.className,
                "text-2xl text-white font-normal text-center cursor-default"
              )}
            >
              Login
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 lap:px-0 tab:px-[30%] mob:px-[20%]">
            <div>
              <label
                className="text-[13px] lap:mb-[8%] tab:mb-[12%] mob:mb-[12%] ml-[8%]"
                htmlFor="memberid"
              >
                Member ID :
              </label>
              <InputMemberID
                inputValue={inputValue}
                setInputValue={setInputValue}
                checkAndCleanInput={checkAndCleanInput}
                setButtonActive={setButtonActive}
              />
              <p className="lap:mt-[25%] tab:mt-[20%] mob:mt-[20%] lap:mx-0 tab:mx-[12%] mob:mx-[18%] text-[14px] text-center">
                Belum memiliki Member ID?{" "}
                <a
                  className="uk-text-decoration-none uk-button-text text-[#00FFD1] hover:text-[#5494c5] hover:duration-500"
                  href="https://s.id/reg-sejatizen"
                >
                  Daftar disini
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <LoginButton onClick={checkAndCleanInput} isActive={isButtonActive} />
      </div>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onComplete={handleSubmit}
      />
    </>
  );
};

export default MemberIDComponent;
