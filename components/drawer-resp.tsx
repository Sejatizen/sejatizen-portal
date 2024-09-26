"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@react-hook/media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleX, Info, TriangleAlert } from "lucide-react";
import { Montserrat as FontSans } from "next/font/google";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";

// ELEMENT

// font
const Montserrat = FontSans({
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

// SYSTEM

// member data
const memberName = "Sejatizen";
const memberRegion = "Jawa Barat";
const memberPhone = "+621234567890";

// validate input phone
const inputPhone = (phoneInput: React.RefObject<HTMLInputElement>) => {
  if (phoneInput.current) {
    phoneInput.current.oninvalid = function (event: Event) {
      const target = event.target as HTMLInputElement;
      if (target) {
        target.setCustomValidity(
          'Berikan tanda "+" diawal nomor (contoh: +62)'
        );
      }
    };

    phoneInput.current.oninput = function (event: Event) {
      const target = event.target as HTMLInputElement;
      if (target) {
        target.setCustomValidity("");
      }
    };
  }
};

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false); // State untuk AlertDialog
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleSaveChanges = () => {
    setOpen(false); // Menutup Dialog/Drawer
    setAlertOpen(true); // Membuka AlertDialog
    // fungsi sistem menyimpan data perubahan ke db
  };

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className={cn(
                roboto.className,
                "lap:mx-auto tab:ml-11 mob:mx-auto rounded-full absolute inset-x-0 bottom-8 lap:h-11 lap:w-[80%] lap:translate-y-0 tab:h-11 tab:w-[30%] tab:-translate-y-[28vh] mob:h-12 mob:w-[80%] mob:translate-y-0 text-s text-[#000123] bg-[#3C739D] hover:text-white hover:bg-[rgb(60,115,157,0.5)] active:text-white active:bg-[rgba(60,115,157,0.7)]"
              )}
            >
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn(
              openSans.className,
              "sm:max-w-[425px] bg-[#112233] border-none select-none cursor-default"
            )}
          >
            <DialogHeader>
              <DialogTitle
                className={cn(
                  Montserrat.className,
                  "text-white text-[20px] font-normal"
                )}
              >
                Edit profile
              </DialogTitle>
              <DialogDescription className="text-zinc-400 text-[12px]">
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <ProfileForm handleSaveChanges={handleSaveChanges} />
          </DialogContent>
        </Dialog>

        {/* AlertDialog */}
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent
            className={cn(
              openSans.className,
              "p-0 h-auto bg-[#112233] border-none rounded-[20px] text-white"
            )}
          >
            <AlertDialogHeader>
              <AlertDialogTitle
                className={cn(
                  Montserrat.className,
                  "h-20 px-[5%] py-[5%] border-b border-slate-500/50 text-white font-normal align-middle"
                )}
              >
                Save Changes
              </AlertDialogTitle>
              <AlertDialogDescription className="px-[5%] py-4 text-sm">
                Perubahan data akan mengganti <b>Member ID dengan yang baru.</b>
                <br />
                <div className="text-sm text-gray-400 pt-2">
                  Pastikan data yang diubah sudah benar dan kamu sudah yakin
                  dengan perubahanmu.
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="px-[5%] py-6">
              <AlertDialogCancel>Go back</AlertDialogCancel>
              <AlertDialogAction className="bg-white text-black" type="submit">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            className={cn(
              roboto.className,
              "lap:mx-auto tab:ml-11 mob:mx-auto rounded-full absolute inset-x-0 bottom-8 lap:h-11 lap:w-[80%] lap:translate-y-0 tab:h-11 tab:w-[30%] tab:-translate-y-[28vh] mob:h-12 mob:w-[80%] mob:translate-y-0 text-s text-[#000123] bg-[#3C739D] hover:text-white hover:bg-[rgb(60,115,157,0.5)] active:text-white active:bg-[rgba(60,115,157,0.7)]"
            )}
          >
            Edit Profile
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className={cn(
            openSans.className,
            "bg-[#112233] border-none blur-none select-none cursor-default"
          )}
        >
          <DrawerHeader className="text-left">
            <DrawerTitle
              className={cn(
                Montserrat.className,
                "text-white text-[20px] font-normal"
              )}
            >
              Edit profile
            </DrawerTitle>
            <DrawerDescription className="text-zinc-400 text-[12px]">
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm className="px-4" handleSaveChanges={handleSaveChanges} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button
                className="text-[#d9d9d9] active:text-transparent"
                variant="outline"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* AlertDialog */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent
          className={cn(
            openSans.className,
            "p-0 h-auto w-[70%] bg-[#112233] border-none rounded-[20px] text-white"
          )}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className={cn(
                Montserrat.className,
                "h-10 px-[5%] pt-4 text-white font-semibold align-middle"
              )}
            >
              Save Changes
            </AlertDialogTitle>
            <AlertDialogDescription className="px-6 pb-4 text-sm">
              Perubahan data akan mengganti <b>Member ID dengan yang baru.</b>
              <br />
              <div className="text-sm text-gray-400 pt-4">
                Pastikan data yang diubah sudah benar dan kamu sudah yakin
                dengan perubahanmu.
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex px-[5%] mt-2 items-center border-t border-t-slate-500/50">
            <AlertDialogCancel className="h-14 border-none w-[50%] font-thin align-middle m-0">
              Go back
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-14 border-l border-l-slate-500/50 w-[50%] rounded-none text-white align-middle font-semibold"
              type="submit"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function ProfileForm({
  className,
  handleSaveChanges,
}: React.ComponentProps<"form"> & { handleSaveChanges: () => void }) {
  const phoneInputRef = React.useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState<string>(memberName);
  const [region, setRegion] = React.useState<string>(memberRegion);
  const [phone, setPhone] = React.useState<string>(memberPhone);
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [alertType, setAlertType] = React.useState<
    "error" | "warning" | "info" | null
  >(null);
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);
  const [isFadingOut, setIsFadingOut] = React.useState(false);

  const [initialValues, setInitialValues] = React.useState({
    name: memberName,
    region: memberRegion,
    phone: memberPhone,
  });

  React.useEffect(() => {
    inputPhone(phoneInputRef);
  }, []);

  // sistem deteksi perubahan
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      name === initialValues.name &&
      region === initialValues.region &&
      phone === initialValues.phone
    ) {
      showAlert("Tidak ada perubahan data.", "error");
    } else {
      handleSaveChanges();
    }
  };

  // sistem alert
  const showAlert = (message: string, type: "error" | "warning" | "info") => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setAlertMessage(message);
    setAlertType(type);
    setIsFadingOut(false);

    // Set timeout baru untuk menghilangkan alert
    const newTimeoutId = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 500);
    }, 3000);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="grid items-start gap-2">
      {alertMessage && (
        <Alert
          className={cn(
            "lap:absolute fixed flex z-10 lap:-bottom-[116px] lap:-left-[4%] tab:left-[0%] mob:left-[10%] lap:top-[118%] tab:-top-[116px] mob:-top-[194px] mx-auto lap:w-[110%] tab:w-[100%] mob:w-[80%] items-center text-white rounded-[10px] space-y-0 pb-3",
            alertType === "error" && "bg-red-500/50 border-none backdrop-blur",
            alertType === "warning" &&
              "bg-yellow-500/50 border-none backdrop-blur",
            alertType === "info" && "bg-blue-500/50 border-none backdrop-blur",
            "transition-opacity duration-500",
            !isFadingOut
              ? "lap:animate-fadeIn tab:animate-fadeInReverse mob:animate-fadeInReverse"
              : "lap:animate-fadeOut tab:animate-fadeOutReverse mob:animate-fadeOutReverse"
          )}
          variant="default"
        >
          {alertType === "error" && <CircleX className="w-4 h-4" />}
          {alertType === "warning" && <TriangleAlert className="w-4 h-4" />}
          {alertType === "info" && <Info className="w-4 h-4" />}
          <AlertDescription className="text-sm font-normal align-middle ml-4">
            {alertMessage}
          </AlertDescription>
        </Alert>
      )}

      <form className={className} onSubmit={handleSubmit}>
        <div className="grid gap-1">
          <label className="text-[14px] text-white" htmlFor="name">
            Nama :
          </label>
          <input
            className="h-8 px-4 mx-4 text-[#d9d9d9] outline-none bg-transparent border-b border-inherit focus:border-b-2"
            id="name"
            pattern="^(?! )[A-Za-z ]+$"
            maxLength={15}
            defaultValue={memberName}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid gap-1">
          <label className="text-[14px] text-white" htmlFor="region">
            Asal Daerah :
          </label>
          <Select onValueChange={(value) => setRegion(value)}>
            <SelectTrigger
              className="h-8 px-4 mx-4 text-[16px] text-[#d9d9d9] outline-none bg-transparent border-b border-inherit focus:border-b-2"
              id="region"
            >
              <SelectValue placeholder={memberRegion} />
            </SelectTrigger>
            <SelectContent
              side="bottom"
              position="popper"
              className={cn(openSans.className, "bg-[#d9d9d9] text-black h-40")}
            >
              <SelectItem value="Aceh">Aceh</SelectItem>
              <SelectItem value="Sumatera Utara">Sumatera Utara</SelectItem>
              <SelectItem value="Sumatera Barat">Sumatera Barat</SelectItem>
              <SelectItem value="Sumatera Selatan">Sumatera Selatan</SelectItem>
              <SelectItem value="Riau">Riau</SelectItem>
              <SelectItem value="Kepulauan Riau">Kepulauan Riau</SelectItem>
              <SelectItem value="Jambi">Jambi</SelectItem>
              <SelectItem value="Bengkulu">Bengkulu</SelectItem>
              <SelectItem value="Lampung">Lampung</SelectItem>
              <SelectItem value="Bangka Belitung">Bangka Belitung</SelectItem>
              <SelectItem value="Jakarta">Jakarta</SelectItem>
              <SelectItem value="Banten">Banten</SelectItem>
              <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
              <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
              <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
              <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
              <SelectItem value="Bali">Bali</SelectItem>
              <SelectItem value="Kalimantan Barat">Kalimantan Barat</SelectItem>
              <SelectItem value="Kalimantan Tengah">
                Kalimantan Tengah
              </SelectItem>
              <SelectItem value="Kalimantan Selatan">
                Kalimantan Selatan
              </SelectItem>
              <SelectItem value="Kalimantan Timur">Kalimantan Timur</SelectItem>
              <SelectItem value="Kalimantan Utara">Kalimantan Utara</SelectItem>
              <SelectItem value="Nusa Tenggara Barat">
                Nusa Tenggara Barat
              </SelectItem>
              <SelectItem value="Nusa Tenggara Timur">
                Nusa Tenggara Timur
              </SelectItem>
              <SelectItem value="Sulawesi Utara">Sulawesi Utara</SelectItem>
              <SelectItem value="Sulawesi Tengah">Sulawesi Tengah</SelectItem>
              <SelectItem value="Sulawesi Selatan">Sulawesi Selatan</SelectItem>
              <SelectItem value="Sulawesi Tenggara">
                Sulawesi Tenggara
              </SelectItem>
              <SelectItem value="Gorontalo">Gorontalo</SelectItem>
              <SelectItem value="Sulawesi Barat">Sulawesi Barat</SelectItem>
              <SelectItem value="Maluku">Maluku</SelectItem>
              <SelectItem value="Maluku Utara">Maluku Utara</SelectItem>
              <SelectItem value="Papua">Papua</SelectItem>
              <SelectItem value="Papua Barat">Papua Barat</SelectItem>
              <SelectItem value="Lainnya/Luar Indonesia">
                Lainnya/Luar Indonesia
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1">
          <label className="text-[14px] text-white" htmlFor="phone">
            No. Telepon :
          </label>
          <input
            ref={phoneInputRef}
            className="h-8 px-4 mx-4 text-[#d9d9d9] outline-none bg-transparent border-b border-inherit focus:border-b-2"
            id="phone"
            pattern="^\+[0-9]{10,15}$"
            maxLength={20}
            defaultValue={memberPhone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="text-[#112233] bg-[#d9d9d9] w-full mt-8 active:scale-[0.99]"
        >
          Save changes
        </Button>
      </form>
    </div>
  );
}
