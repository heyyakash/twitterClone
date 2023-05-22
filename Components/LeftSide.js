import Image from "next/image";
import { HomeIcon } from "@heroicons/react/solid";
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SideMenu from "./SideMenu";
import Home from "../pages";
import { useSession , signOut } from "next-auth/react";

export default function LeftSide() {
    const {data :session} = useSession();
    const {name ,email, image,tag} =session.user;

    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[280px] p-2 fixed h-full">
            <div className="flex items-center cursor-pointer justify-center bg-black w-14 h-14 hover:bg-opacity-[0.5] hover:bg-gray-800 rounded-full py-4 cursor:pointer transition duration-200">
                <img src="https://rb.gy/ogau5a" alt="" height={30} width={30} />
            </div>
            <div className="space-y-2 mt-4">
                <SideMenu Icon={HomeIcon} className="self-start" text="Home" />
                <SideMenu text="Explore" Icon={HashtagIcon} />
                <SideMenu text="Notifications" Icon={BellIcon} />
                <SideMenu text="Messages" Icon={InboxIcon} />
                <SideMenu text="Bookmarks" Icon={BookmarkIcon} />
                <SideMenu text="Lists" Icon={ClipboardListIcon} />
                <SideMenu text="Profile" Icon={UserIcon} />
                <SideMenu text="More" Icon={DotsCircleHorizontalIcon} />
                <button className="hidden xl:inline w-[100%] cursor-pointer font-bold text-lg rounded-[50px] xl:px-4 xl:py-2 text-white bg-[#1DA1F2]">Tweet</button>
            </div>

            <div onClick={signOut} className="flex items-center cursor-pointer rounded-[30px] mt-auto mb-4 bg-black hover:bg-gray-800 p-2 ">
                <img src={image} className="h-12 rounded-full" alt="" />
                <div className="hidden xl:flex xl:flex-grow flex-col ml-3 text-white">
                    <p className="text-md capitalize ">{name.toLowerCase()}</p>
                    <p className="text-sm text-gray-500">{email.split("@")[0]}</p> 
                </div>
                <div className="hidden xl:inline">
                    <DotsHorizontalIcon className="h-7 ml-8 mr-4 text-white"></DotsHorizontalIcon>
                </div>
            </div>
        </div>
    )
}
