import Image from "next/image";
import { Button } from "@/components/ui/button";

const Main = () => {
  return (
    <section className="flex flex-col flex-1 md:flex-row items-center justify-between py-24 px-4 md:py-28 md:px-40 bg-gray-100  ">
      <div className="flex flex-col md:flex-row items-center justify-between mx-auto">
        <div className="max-w-md text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome to DeWeb <br /> Discover & Experience!
          </h1>
          <p className="mt-4 text-base md:text-lg text-orange-600">
            All the tools you need to create and grow any website - conveniently in one place. 
            Start a blog, build your site, sell your products, and do even more.
          </p>
          <Button className="mt-6 bg-cyan-400 text-black hover:bg-blue-400 px-8 md:px-20 py-3 md:py-5 text-sm md:text-base font-bold">
            Get started
          </Button>
        </div>
        <div className="relative max-w-full md:w-[500px] h-[200px] md:h-[300px] mt-10 md:mt-0 md:ml-auto md:translate-x-32">
          <Image src="/hero.jpg" alt="Hero section image" width={500} height={300}/>
        </div>
      </div>
    </section>
  );
};

export default Main;