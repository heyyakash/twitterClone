import { useState } from "react";
import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,
    XIcon,
} from "@heroicons/react/outline";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { collection, addDoc, serverTimestamp, updateDoc,doc } from "firebase/firestore";
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";


function Input() {
    const {data:session} = useSession();
    const {name ,image,tag, uid,email} = session.user;
    const [showEmoji, setShowEmoji] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [sharedImg, setSharedImg] = useState(null);
    


    // ====================== FUNCTIONS =======================

    const handleImg = (e) => {
        let image = e.target.files[0];
        if (image === '' || image === undefined) {
            alert("This is not an image. This is undefined");
        }
        setSharedImg(image)
    }

    const addEmoji = (e) => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setText(text + emoji);
    }

    const sendPost = async () => {
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                userImage:image,
                uid:uid,
                email:email,
                tag:tag,
                name:name,  
                text: text,
                time: serverTimestamp()
            });

            const imageRef = ref(storage, `posts/${docRef.id}/images`);
            if (sharedImg) {
                const uploadTask = uploadBytesResumable(imageRef, sharedImg);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        alert(error)
                    },
                    async() => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        const imgURL = await getDownloadURL(uploadTask.snapshot.ref);
                        const update = await updateDoc(doc(db, "posts",docRef.id),{
                            img:imgURL
                        })

                     
                    }
                );
            }
        
            
            setLoading(false);
            setText("");
            setSharedImg(null);
        }
        catch (error) {
            alert(error);
        }
        setSharedImg(null);
        setText("");
        setLoading(false);
    }

    return (

        <div className={`flex w-full  gap-4 p-4 border-b ${loading? "opactiy-[.6]":""} border-gray-500 pb-4`}>
            <img src={image} className="h-12 cursor-pointer  rounded-full" alt="" />
            <div className="flex flex-col flex-grow">
                <textarea name="" id="" className="outline-none border-b border-gray-500 bg-transparent text-white text-xl" value={text} onChange={(e) => setText(e.target.value)} placeholder={`What's Happening ?`} rows="2"></textarea>
                {sharedImg && (


                    <div className="relative">

                        <img src={URL.createObjectURL(sharedImg)} className="w-[99%] mt-4 rounded-[20px] object-cover" alt="" />
                        <div className="absolute top-[1.2rem] left-1 rounded-full bg-black  hover:bg-gray-500 hover:bg-opacity-[0.9] p-2">
                            <XIcon className="text-white h-5 cursor-pointer" onClick={() => setSharedImg(null)}></XIcon>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 mt-4 relative">
                    <div className="bg-black hover:bg-gray-800  transition duration-200 p-2 rounded-full">
                        <input type="file" name="selectImg" id="selectImg" className="hidden" onChange={handleImg} />
                        <label htmlFor="selectImg"><PhotographIcon className="text-[#1DA1F2] h-6 cursor-pointer"></PhotographIcon></label>
                    </div>
                    <div className="bg-black hover:bg-gray-800  transition duration-200 p-2 rounded-full">

                        <ChartBarIcon className="text-[#1DA1F2] h-6 cursor-pointer"></ChartBarIcon>
                    </div>
                    <div className="bg-black hover:bg-gray-800  transition duration-200 p-2 rounded-full">

                        <EmojiHappyIcon onClick={() => setShowEmoji(!showEmoji)} className="text-[#1DA1F2] h-6 cursor-pointer"></EmojiHappyIcon>
                    </div>
                    <div className="bg-black hover:bg-gray-800  transition duration-200 p-2 rounded-full">
                        <CalendarIcon className="text-[#1DA1F2] h-6 cursor-pointer"></CalendarIcon>
                    </div>
                    {showEmoji && (
                        <Picker
                            onSelect={addEmoji}
                            style={{
                                position: "absolute",
                                marginTop: "35px",
                                marginLeft: -40,
                                maxWidth: "320px",
                                borderRadius: "20px",
                                zIndex:"100"
                            }}
                            theme="dark"
                        />
                    )}

                    <button onClick={sendPost} className="bg-[#1da1f2] text-white disabled:opacity-60 py-2 px-4 ml-auto rounded-[20px] cursor-pointer" disabled={text ? false : true || loading ? true : false}>Tweet</button>
                </div>

            </div>


        </div>
    )
}

export default Input
