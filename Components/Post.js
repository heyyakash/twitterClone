import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    SwitchHorizontalIcon,
    TrashIcon
} from '@heroicons/react/outline';

import{
    HeartIcon as HeartIconFilled,
    ChatIcon as ChatIconFilled
} from "@heroicons/react/solid";

import {
    collection,
    deleteDoc,doc,onSnapshot,setDoc
} from "firebase/firestore";

import { db } from "../firebase";
import Moment from "react-moment";
import { useRecoilState } from 'recoil';
import { modalState , postIdState } from '../atoms/modalAtom';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

function Post({ id ,uid,image, name, userImage,post,text }) {
    const {data:session} = useSession();
    const [isOpen,setIsOpen] = useRecoilState(modalState);
    const [postId,setPostId] = useRecoilState(postIdState);
    const [comments,setComments] = useState([]);    
    const [likes,setLikes] = useState([]);
    const [liked,setLiked] = useState(false);
    const router = useRouter();

    // =============== functions =================
    useEffect(() => {
        onSnapshot(collection(db,"posts",id,"likes"), (snapshot) => setLikes(snapshot.docs));
    }, [db,id]);

    useEffect(() => {
        if(likes.findIndex(like => like.id === session.user.uid) !== -1){
            setLiked(true);
        }
    }, [likes])
    const likepost = async () => {
        if(liked){
            await deleteDoc(doc(db,"posts",id,"likes",session.user.uid));
            setLiked(false);
        }
        else{
            await setDoc(doc(db,"posts",id,"likes",session.user.uid),{
                username:session.user.name
            })
            setLiked(true);
        }
    }
    return (
        <div>
        <div className="w-full p-4 border-b border-gray-500">
            <div className="flex gap-4">
                <img src={userImage} className="h-12 cursor-pointer  rounded-full" alt="" />
                <div className="flex flex-col flex-grow">
                    <p className="text-white ">{name}</p>
                    <p className="text-gray-500 text-sm"><Moment fromNow>{post?.time?.toDate()}</Moment></p>
                </div>
            </div>
            {text && (
                <div className="text-white my-2">
                    <p>{text}</p>
                </div>
            )}
            <div className="flex flex-col flex-grow">
                {image && (
                    <div className="relative">
                        <img src={image} className="w-[99%] mx-auto mt-4  object-cover" alt="" />
                    </div>
                )}
            </div>
            
        </div>
        <div className='w-full flex justify-between px-4 items-center  h-12 border-b border-gray-500'>
            <div 
                className=' flex icon gap-2group-hover:bg-red-600/10 text-pink-600'
                onClick = {
                    (e)=>{
                        e.stopPropagation();
                        likepost();
                    }
                }>
                {liked ? (
                    <HeartIconFilled className='h-5 text-pink-600' />

                ):(
                    <HeartIcon className='h-5 group-hover:text-pink-600' />
                )}
                <span className=' ml-2 text-pink-600'>{likes.length}</span>
            </div>
            <div onClick={
                (e)=> {
                    e.stopPropagation();
                    setIsOpen(true);
                    setPostId(id);
                }
            } 
            className='icon text-white group-hover:bg-red-600/10hover:text-red-600'>
                <ChatIcon className='h-5 ' />
            </div>
            {session.user.uid === uid?(
                <div 
                className='icon text-white group-hover:bg-red-600/10 hover:text-red-600'
                onClick={
                    (e) => {
                        e.stopPropagation();
                        deleteDoc(doc(db, "posts" , id));
                        router.push("/");
                    }
                }
            >
                <TrashIcon className='h-5 group-hover:text-red-600' />
            </div>
            ):(
                <div className="flex items-center space-x-1 group">
                  <div className="icon group-hover:bg-green-500/10">
                    <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
                  </div>
                </div>
              )}
            
            <div className='icon text-white group-hover:bg-red-600/10'>
                <ShareIcon className='h-5 group-hover:text-red-600' />
            </div>
            <div className='icon text-white group-hover:bg-red-600/10'>
                <ChartBarIcon className='h-5 group-hover:text-red-600' />
            </div>
        </div>
        </div>
    )
}

export default Post
