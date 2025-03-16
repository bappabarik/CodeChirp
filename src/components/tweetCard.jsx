import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsTwitterX } from 'react-icons/bs';
// import ReactMarkdown from "react-markdown";

const TweetCard = ({ post }) => {
    const userData = useSelector(state => state.auth.userData);
    const [content, setContent] = useState(post?.content || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleBlur = () => {
        setIsEditing(false);
        console.log("Updated content:", content);
    };

    return (
        <div className="flex justify-center items-center m-auto">
            <div className=" flex flex-col p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-full break-words z-10 space-y-3">
                <div className="flex justify-between">
                    <span className='flex gap-2'>
                        <img
                            src={userData?.prefs.avatar}
                            className="h-12 w-12 flex-shrink-0 rounded-full"
                            width={50}
                            height={50}
                            alt="Avatar"
                        />
                        <span className='dark:text-white'>
                            {userData?.name} {" "}
                            <RiVerifiedBadgeFill className=' text-blue-400 inline text-center' />
                            <span className='block text-sm italic opacity-25 items-start'>
                                @{userData?.name.toLowerCase().replaceAll(' ', '')}
                            </span>
                        </span>
                    </span>
                    <span>
                        <BsTwitterX className="text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
                    </span>
                </div>
                {/* Editable Text Area */}
                <div
                    className=" w-80 flex items-center justify-center text-wrap text-sm border border-transparent rounded p-1 cursor-text"
                    onClick={() => setIsEditing(true)}
                >
                    {isEditing ? (
                        <textarea
                            autoFocus
                            className=" w-80 h-60 p-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <p className=" w-full text-wrap">{content}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TweetCard;
