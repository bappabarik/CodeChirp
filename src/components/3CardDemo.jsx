import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import DemoCard from "./ui/DemoCard";
import { GoDotFill } from "react-icons/go";
 
export function ThreeDCardDemo({icon, platform, content}) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-black relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-lg px-4 py-4 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white flex"
        >
          <GoDotFill className="text-red-600" /><GoDotFill className="text-yellow-400" /><GoDotFill className="text-green-500" />
        </CardItem>
        {/* <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem> */}
        <CardItem translateZ="100" className="w-full mt-4">
        <DemoCard
              platform={platform}
              icon={icon}
              content={content}
        />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}