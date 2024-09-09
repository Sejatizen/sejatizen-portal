import QRCode from 'qrcode.react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

// ELEMENT

// font
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const inconsolata = localFont({
  src: '../assets/font/Inconsolata/Inconsolata-VariableFont_wdth,wght.ttf',
  display: 'swap',
});

const openSans = localFont({
  src: '../assets/font/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf',
  display: 'swap',
});

// SYSTEM

// card image source
const frontImageUrl = '/Sejatizen Card-front.png';
const backImageUrl = '/Sejatizen Card-back.png';

// member data
const memberId = "a00aa000";
const memberName = "Josh";
const memberJoin = "23/03/2018";

// card front
const CardFront = ({ imageUrl }: { imageUrl: string }) => (
  <div className="relative mx-auto bg-[url('/Sejatizen Card-front.png')] lap:w-[25vw] tab:w-[80vw] mob:w-[80vw] h-auto card-front">
    <Image src={imageUrl} alt="card-front" width={1012} height={638} className="lap:w-[25vw] tab:w-[80vw] mob:w-[80vw] h-auto"/>
  </div>
);

// card back
const CardBack = ({ imageUrl, memberId, name, joinDate }: { imageUrl: string, memberId: string, name: string, joinDate: string }) => (
  <div className="relative mx-auto bg-[url('/Sejatizen Card-back.png')] lap:w-[25vw] tab:w-[80vw] mob:w-[80vw] h-auto card-back">
    <Image src={imageUrl} alt="card-back" width={1012} height={638} className="lap:w-[25vw] tab:w-[80vw] mob:w-[80vw] h-auto"/>
    <div className="absolute w-[100%] my-auto mx-auto h-[5vh] box-content lap:top-[19%] tab:top-[23%] mob:top-[25%] grid grid-cols-2 gap-x-[6vw]">
        <div className='block lap:ml-[5vw] tab:ml-[9vw] mob:ml-[17vw]'>
            <p className={cn(inconsolata.className, "lap:w-[10vw] tab:w-[17vw] mob:w-[30vw] text-white lap:text-[1.6vw] tab:text-[2.8vw] mob:text-[5vw] text-center font-normal")}>{memberId}</p>
            <p className={cn(openSans.className, "lap:mt-[15%] tab:mt-[8%] mob:mt-[7%] lap:w-[10vw] tab:w-[17vw] mob:w-[30vw] text-black lap:text-[0.9vw] tab:text-[1.6vw] mob:text-[3vw] text-center font-semibold")}>{name}</p>
            <p className={cn(openSans.className, "lap:mt-[25%] tab:mt-[18%] mob:mt-[18%] lap:w-[10vw] tab:w-[17vw] mob:w-[30vw] text-black lap:text-[0.9vw] tab:text-[1.6vw] mob:text-[3vw] text-center font-semibold")}>{joinDate}</p>
        </div>

        <QRCode className="relative lap:top-[23%] tab:top-[16%] mob:top-[20%] mx-auto lap:w-[10vw] tab:w-[10vw] mob:w-[4vw] h-auto" size={65} level='Q' fgColor='white' bgColor='transparent' value={memberId} />
    </div>
</div>

);

const RenderCard = () => {

  return (
      <div className="w-[100%] lap:h-[40%]  tab:h-auto mob:h-auto lap:mt-20 tab:mt-18 mob:mt-28 justify-center flex lap:flex-row tab:flex-row mob:flex-col mb-12 lap:gap-x-0 tab:gap-x-8 mob:gap-x-0 lap:gap-y-0 tab:gap-y-0 mob:gap-y-8">
        <CardFront imageUrl={frontImageUrl} />
        <CardBack imageUrl={backImageUrl} memberId={memberId} name={memberName} joinDate={memberJoin} />
      </div>
  );
};

export { CardFront, CardBack, RenderCard };



