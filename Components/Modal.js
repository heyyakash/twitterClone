import { useState, useEffect, Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { XIcon } from '@heroicons/react/outline';
import { modalState, postIdState } from "../atoms/modalAtom";
import Moment from 'react-moment';
import {
  onSnapshot,
  doc,
  getDoc
} from "@firebase/firestore";
import { db } from "../firebase";

function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const handleExit = () => {
    setPostId(null);
    setIsOpen(false);
  }

  useEffect(() => {
      if(postId){
      onSnapshot(doc(db,"posts",postId),(snapshot) => setPost(snapshot.data()))
      }}, [db])
  console.log(post);

  return (
    <>
      {postId && (
        <div className={`inset-0 fixed ${isOpen ? "block" : "hidden"} bg-white/30 flex justify-center`}>
          <div className='rounded-xl flex flex-col h-[300px] w-[500px] bg-black relative top-20'>
            <div className='py-2 pl-4 pr-2  w-full flex text-white'>
              <h1 className='text-xl font-semibold'>Add Comment</h1>
              <XIcon onClick={handleExit} className="cursor-pointer h-7 w-7 ml-auto"></XIcon>
            </div>
            <div className='py-2 px-4 w-full gap-2 flex text-white' >
             {post.userImage && (<img src={post.userImage} className="h-12 cursor-pointer  rounded-full" alt="" />) } 
              <div className="flex flex-col  flex-grow">
                {post.name && (<p className="text-white ">{post.name}</p>)}
                {post.name && (<p className="text-gray-500 text-sm"><Moment fromNow>{post?.time?.toDate()}</Moment></p>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal 
