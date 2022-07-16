function SideMenu({Icon,text}) {
    return (
        <div className="flex text-white w-auto  items-center gap-2 rounded-[30px] cursor-pointer justify-start bg-black  hover:bg-gray-800 xl:px-4 px-2 py-2 cursor:pointer transition duration-200">
            <Icon className = "h-5"></Icon>
            <span className="xl:text-lg hidden xl:inline">{text}</span>
        </div>
    )
}

export default SideMenu
