import { useState, useEffect } from 'react';
import Input from './Input';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import Post from './Post';


function Feed() {
    const {data:session} = useSession();
    const [posts,setPosts] = useState([]);
    useEffect(
        () => 
            onSnapshot(
                query(collection(db,"posts"),where("email","==",session.user.email) ,orderBy("time","desc")),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            )    
    , [db])


    return (

        <div className="flex-grow flex flex-col border-l border-r border-gray-700 max-w-[600px] sm:ml-[73px] xl:ml-[280px]">

            <div className="p-4 sticky backdrop-blur-md text-white font-bold text-xl  w-[100%]">Hello</div>
            <Input />
            
            <div className='pb-72'>
                {posts.map((post)=>(
                    <Post key = {post.id} post = {post.data()} id = {post.id} uid = {post.data().uid} name = {post.data().name} userImage = {post.data().userImage} time image = {post.data().img} text ={post.data().text} />
                ))}
            </div>
        </div>



    )
}

export default Feed
