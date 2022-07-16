import Image from "next/image";
import { signIn } from "next-auth/react";

function Login({ providers }) {
    return (
        <div className="h-full fixed w-full flex items-center cursor-pointer justify-center bg-black flex-col gap-8 ">
            <Image src="https://rb.gy/ogau5a" alt="" height={150} width={150} />

            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <div onClick = {()=>signIn(provider.id, {callbackUrl:"/"})} class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                        <span class="w-48 h-48 rounded rotate-[-40deg] bg-[#1da1f2] absolute bottom-0 left-[-10px] -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Sign In with {provider.name}</span>
                    </div>
                </div>
            ))}


        </div>

    )
}

export default Login
