// import BlurText from "@/animations/BlurText";

import BlurText from "../animations/BlurText.jsx";
import { Button } from "../components/ui/button.jsx";
import { Layers, Pencil, Section, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="w-full">
      <section className="flex flex-col justify-center h-[50vh] sm:h-[70vh] lg:h-[80vh] items-center w-full">
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <div className="flex flex-col gap-2">
            {/* <h1 className="text-3xl font-bold tracking-tighter sm:text:-4xl lg:text-5xl">Manage your content with ease</h1> */}
            <BlurText
              text="Manage your content with ease!"
              delay={150}
              animateBy="words"
              direction="top"
              // onAnimationComplete={handleAnimationComplete}
              className="text-3xl font-bold tracking-tighter sm:text:-4xl lg:text-5xl"
            />
            <p className="text-gray-400 max-w-[700px] mx-auto">Streamline your content workflow, publish with confidence</p>

          </div>

          <div className="flex gap-3">
            <Link href={"/sign-in"} className="bg-gray-200 text-black px-4 py-1 hover:bg-gray-400 transition-all delay-100 duration-200  rounded">Try it out!</Link>
            <Button variant={"outline"}>Learn More</Button>
          </div>
        </div>


      </section>

      

      <section className="min-h-screen  sm:min-h-[50vh] bg-gray-600/10 flex w-full justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 ">
          <span className="flex flex-col items-center justify-center gap-2">
            <Pencil size={50} />
            <h3 className="text-xl font-bold text-gray-100">Intutive Editor</h3>
            <p className="text-gray-400 text-center w-[70%]">Create and edit content with user friendly interface</p>
          </span>
          <span className="flex flex-col items-center justify-center gap-2">
            <Layers size={50} />
            <h3 className="text-xl font-bold text-gray-100">Intutive Editor</h3>
            <p className="text-gray-400 text-center w-[70%]"> Create and edit content with user friendly interface</p>
          </span>
          <span className="flex flex-col items-center justify-center gap-2">
            <Zap size={50} />
            <h3 className="text-xl font-bold text-gray-100">Intutive Editor</h3>
            <p className="text-gray-400 text-center w-[70%]">Create and edit content with user friendly interface</p>
          </span>
        </div>


      </section>

      

      <section className="h-[50vh] sm:h[60vh] w-full flex items-start justify-center flex-col">
        <div className="max-w-[50%] mx-auto space-y-3">
          <h4 className="font-bold text-2xl">Ready to transform your Journey? </h4>
          <p className="text-sm text-gray-400">Join thousands of content creators like you who choose Konetentra </p>
          <div className="flex gap-2">
            <input placeholder="Enter your email" className="bg-zinc-800 focus:outline:none rounded px-2 text-sm text-gray-400 py-[7px]"></input>
            <Button variant={"outline"}>Submit</Button>

          </div>

        </div>


      </section>
    </main>
  );
}
