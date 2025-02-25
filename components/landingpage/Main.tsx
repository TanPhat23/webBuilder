import Image from "next/image";
import { Button } from "@/components/ui/button";

const Main = () => {
  return (
    <section className="flex items-center justify-between py-28 px-40 bg-gray-100">
      <div className="flex items-center justify-between mx-auto ">
        <div className="max-w-md ">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to DeWeb <br /> Discover & Experience!
          </h1>
          <p className="mt-4 text-lg text-orange-600">
            All the tools you need to create and grow any website - conveniently in one place. 
            Start a blog, build your site, sell your products, and do even more.
          </p>

          <Button className="mt-6 bg-cyan-400 text-black hover:bg-blue-400 px-20 py-5 text-base font-bold ml-10">
            Get started
          </Button>

        </div>
        <div className="relative w-[500px] h-[300px] ml-auto translate-x-32">
          <Image src="/hero.jpg" alt="Hero section image" width={500} height={300}/>
        </div>
      </div>
    </section>
  );
};

export default Main;
