"use client"
import { Bell, LogOut, MessageCircle, Moon, Search, Sun, User } from "lucide-react";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Set dark mode by default on initial load
  useEffect(() => {
    document.documentElement.classList.add("dark"); // Apply dark class by default
    localStorage.setItem("theme", "dark"); // Save preference in localStorage
  }, []);

  // Toggle dark mode and save preference to local storage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <div className="h-16 py-3 md:py-0 bg-white dark:bg-gray-800 flex items-center justify-between px-6 md:px-2 shadow-md">
      {/* search box */}
      <div className="items-center hidden md:flex">
        <Input
          type="search"
          placeholder="Search"
          className="border dark:bg-gray-700 w-[40vw] rounded-full pr-10"
        />
        <Button className="relative -left-12 bg-transparent dark:text-white text-black shadow-none hover:bg-transparent">
          <Search />
        </Button>
      </div>

      {/* nav items */}
      <div className="flex items-center gap-3 ml-auto">
        {/* theme toggle button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {/* Message icon */}
        <MessageCircle />
        {/* Notification Bell */}
        <Bell />

        {/* Profile picture with dropdown routes to my profile and logout */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div>
              <Image
                src={
                  "https://wallpapers-clan.com/wp-content/uploads/2022/11/cute-frog-pfp-2.jpg"
                }
                alt="user pfp"
                width={40}
                height={40}
                className="rounded-full border-2 border-cyan-500 cursor-pointer"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuLabel className="text-lg">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* My Profile */}
            <DropdownMenuItem className="hover:scale-105 hover:translate-x-1 transition-all duration-300">
              <Link href={"/my-profile"} className="flex items-center gap-1 text-lg">
                <User /> My Profile
              </Link>
            </DropdownMenuItem>
            {/* Log Out */}
            <DropdownMenuItem className="hover:scale-105 hover:translate-x-1 transition-all duration-300">
              <Link href={"/"} className="flex items-center gap-1 text-lg">
                <LogOut />
                Log Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
