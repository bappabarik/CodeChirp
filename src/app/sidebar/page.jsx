"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoveLeft, Settings, SquareTerminal, UserRound } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg"
import arrow from "../../assets/arrow.svg"
import { useDispatch, useSelector } from "react-redux";
import authService from "@/appwrite/auth";
import { logout } from "@/store/authSlice";
import { BsTwitterX } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { RiDraftFill } from "react-icons/ri";


export function SidebarNavigationMenu() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    authService.logout()
    dispatch(logout())
    localStorage.removeItem("user");
  }
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <SquareTerminal className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "LinkedIn Posts",
      href: "/dashboard/linkedin-posts",
      icon: (
        <BsLinkedin className="text-neutral-700 dark:text-neutral-200 flex-shrink-0 ml-[0.14rem]" />
      ),
    },
    {
      label: "Tweets",
      href: "/dashboard/tweets",
      icon: (
        <BsTwitterX className="text-neutral-700 dark:text-neutral-200 flex-shrink-0 ml-[0.14rem]" />
      ),
    },
    {
      label: "Drafts",
      href: "/dashboard/drafts",
      icon: (
        <RiDraftFill className="text-neutral-700 dark:text-neutral-200 flex-shrink-0 h-5 w-5" />
      ),
    },
    // {
    //   label: "Profile",
    //   href: "/dashboard/profile",
    //   icon: (
    //     <UserRound className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "/login",
      icon: (
        <MoveLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: handleLogout
    },
  ];
  const [open, setOpen] = useState(false);
  const userData = useSelector(state => state.auth.userData)
  const installationStatus = useSelector(state => state.auth.installationStatus)

  // const onClick = () => {
  //   setOpen(!open)
  // }

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 flex-1 w-full border border-neutral-200 dark:border-neutral-700 md:overflow-hidden relative",
        "h-screen"
      )}>
        {/* <div className={`absolute left-64 ${!open && 'hidden'} z-10`}>
          <div className="flex gap-2">
            <img src={arrow} alt="" width="80" className=" rotate-[185deg] opacity-50" />
            <div className="bg-white text-black p-4 rounded-lg w-60 relative top-12">
            Install the GitHub App, this will track your github events to generate post accordingly!
            </div>
          </div>
        </div> */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <div className="flex"><Logo /> {!installationStatus &&
          <a
            href='https://github.com/apps/codechirp/installations/select_target'
            className=" ml-4 border-slate-500 hover:border-[1px] transition-all duration-200 bg-green-700 px-4 py-1 rounded-md">
            Install
        </a>}</div> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2 items-start">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: userData?.name,
                href: "/dashboard/profile",
                icon: (
                  <img
                    src={userData?.prefs.avatar}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
        <Outlet />
    </div>
  );
}
export const Logo = ({width = 50}) => {

  return (
    <div className="flex items-center justify-center gap-2">
    <LogoIcon width={width} />
    <Link
      to={"/"}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre">
        CodeChirp AI 
      </motion.span>
    </Link>
    </div>
  );
};
export const LogoIcon = ({width = 200}) => {
  return (
    (<Link
      to={"/"}
      >
      <div className="rounded-md flex-shrink-0 flex items-center justify-center">
        <img src={logo} alt="" className="" width={width} />
      </div>
    </Link>)
  );
};
