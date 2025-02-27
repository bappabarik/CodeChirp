import DemoCard from "@/components/ui/DemoCard";
import React from "react";
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import logo from '../../assets/logo.svg'
import { BsTwitterX } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex justify-center items-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(51, 51, 51) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(51, 51, 51) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          opacity: 0.2,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-center">
            <img src={logo} alt="" srcset="" className="block mx-auto" />
            CodeChirp
          </h1>
          <p className="text-xl mb-12 text-gray-300">
            Turn your code commits into insightful posts with AI. CodeChirp
            transforms your development journey into engaging content, helping
            you share progress, insights, and updates effortlessly. Just push
            your code on GitHub, and let AI generate the perfect post for you!
          </p>

          <Button 
            onClick = {() => navigate("/dashboard")}
          size="lg" className="mb-16 border-slate-500 hover:border-[1px] transition-all duration-200">
            Get Started
          </Button>

          {/* Demo cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <DemoCard
              platform="Twitter"
              icon={<BsTwitterX />}
              content="Just pushed a new feature to my project! 🚀 #CodeChirp automatically generated this tweet. Check out the latest updates at github.com/myproject"
            />
            <DemoCard
              platform="LinkedIn"
              icon={<BsLinkedin />}
              content="Excited to announce the latest updates to my project! 💻 Thanks to #CodeChirp for automatically sharing my progress. See the details at linkedin.com/in/myprofile"
            />
          </div>
        </div>
      </div>

      {/* GitHub icon */}
      <div className="absolute bottom-8 right-8 text-gray-600">
        <Github className="w-12 h-12" />
      </div>
    </div>
  );
};

export default HomePage;
