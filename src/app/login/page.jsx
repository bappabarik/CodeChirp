import { LoginForm } from "@/components/login-form"
import logo from "../../assets/logo.svg"
import { ThreeDCardDemo } from "@/components/3CardDemo";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import codechirpWaterMark from "../../assets/CodeChirp.png"
import { ImGithub } from "react-icons/im";
import { VscRepoPush } from "react-icons/vsc";
import { RiRobot2Fill } from "react-icons/ri";
import AnimatedBeam from "@/components/ui/animatedBeam";

export default function LoginPage() {


  return (
    (<div className="grid min-h-svh lg:grid-cols-2 bg-black relative z-10">
      <div
        className="absolute inset-0 pointer-events-none z-[-3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(51, 51, 51) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(51, 51, 51) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          opacity: 0.2,
        }}
      />

      <div className="flex flex-col gap-4 p-6 md:p-10 z-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <h1 className="text-xl font-bold mb-6 text-center text-white">
              <img src={logo} alt="" srcset="" className="block mx-auto" width="40" />
                CodeChirp
              </h1>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center z-10">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* {right section} */}
      <div className="relative hidden lg:block bg-zinc-800 bg-opacity-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none z-[-3]  mt-6 mx-6 flex flex-col"
      >
        <div className="h-5 w-5 rounded-full border-[1px] border-green-500 border-opacity-35 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-green-400 shadow-sm shadow-green-500 animate-pulse"></div>
        </div>
        <div
        className="absolute inset-0 pointer-events-none z-[-3] bg-green-600 w-[0.5px] top-5 left-[0.6rem] opacity-20"
      />
      <div className="h-5 w-5 rounded-full border-[1px] border-green-500 border-opacity-35 flex items-center justify-center mt-16">
          <div className="h-2 w-2 rounded-full bg-green-400 shadow-md shadow-green-500 animate-pulse"></div>
        </div>
      <div className="h-5 w-5 rounded-full border-[1px] border-green-500 border-opacity-35 flex items-center justify-center mt-80">
          <div className="h-2 w-2 rounded-full bg-green-400 shadow-md shadow-green-500 animate-pulse"></div>
        </div>
        <AnimatedBeam />
      </div>
        {/* <h1 className="text-white">Generate posts with CodeChirp AI just push your code on GitHub and BOOM!!</h1> */}
        <div className="text-gray-200 mx-16 mt-6 w-full flex justify-start items-start flex-col gap-2">
          <p className="flex items-center justify-center gap-2 font-semibold"><ImGithub />GitHub Event :</p>
          <p className="flex items-center justify-center gap-2 text-sm"> <VscRepoPush className="text-green-500" /> Push</p>
        </div>
        <div className="text-gray-200 mx-16 mt-[2rem] w-full flex justify-start items-start">
          <p className="flex items-center justify-center gap-2 text-sm"><RiRobot2Fill className="text-violet-500" /> AI generated Tweet :</p>
        </div>
        <ThreeDCardDemo 
          platform="Twitter"
          icon={<BsTwitterX />}
          content="Just pushed a new feature to my project! 🚀 #CodeChirp automatically generated this tweet. Check out the latest updates at github.com/myproject" 
        />
        <div className="text-gray-200 mx-16 mt-[0.6rem] w-full flex justify-start items-start">
        <p className="flex items-center justify-center gap-2 text-sm"><RiRobot2Fill className="text-violet-500" />AI generated LinkedIn Post :</p>
        </div>
        <ThreeDCardDemo
          platform="LinkedIn"
          icon={<BsLinkedin />}
          content="Excited to announce the latest updates to my project! 💻 Thanks to #CodeChirp for automatically sharing my progress. See the details at linkedin.com/in/myprofile"
        />
        <img
          src={codechirpWaterMark}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale -z-[1] opacity-[0.02]"
        />
      </div>
    </div>)
  );
}
