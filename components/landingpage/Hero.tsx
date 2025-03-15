import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-24 px-4 md:py-28 md:px-20 lg:px-40 bg-[#42A5F5]">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start md:max-w-[50%]">
          <div className="bg-white px-6 py-1 rounded-full shadow-md flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold">WELCOME TO</span>
            <Image 
              src="/logo.jpg" 
              alt="DeWeb Logo" 
              width={160} 
              height={80}
              className="w-auto h-16 md:h-16"
            />
          </div>  
          <p className="mt-4 text-lg md:text-xl text-white font-semibold text-center md:text-left">
            Enjoy creating your new <br /> website UI/UX
          </p>
          <Button className="mt-6 bg-white text-black text-lg md:text-xl font-semibold px-8 py-4 rounded-full shadow-md hover:bg-gray-200">
            Get started
          </Button>
        </div>     
        <div className="relative w-full md:w-[50%] mt-10 md:mt-0">
          <Image 
            src="/hero.jpg" 
            alt="Hero section image" 
            width={500}
            height={400}
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;