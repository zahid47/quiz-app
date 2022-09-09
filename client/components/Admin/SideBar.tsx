import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  AiOutlineLineChart,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineQuiz } from "react-icons/md";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const Menus = [
    {
      title: "At a Glance",
      icon: <AiOutlineLineChart className="text-2xl" />,
      action: () => {
        router.push("/admin");
      },
    },
    {
      title: "Users",
      icon: <AiOutlineUser className="text-2xl" />,
      action: () => {
        router.push("/admin/users");
      },
    },
    {
      title: "Quizes ",
      icon: <MdOutlineQuiz className="text-2xl" />,
      action: () => {
        router.push("/admin/quizes");
      },
    },
    {
      title: "Collapse",
      icon: open ? (
        <TbLayoutSidebarLeftCollapse className="text-2xl" />
      ) : (
        <TbLayoutSidebarRightCollapse className="text-2xl" />
      ),
      action: () => {
        setOpen(!open);
      },
    },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              onClick={() => {
                Menu.action();
              }}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-black text-black-300 text-sm items-center gap-x-4 
              ${"mt-2"} ${index === 0 && "bg-light-black"} `}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <div className="text-2xl font-semibold ">{children}</div>
      </div>
    </div>
  );
}
