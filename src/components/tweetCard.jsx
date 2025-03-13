import React from 'react';
import { useSelector } from 'react-redux';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsTwitterX } from 'react-icons/bs';

const TweetCard = ({post}) => {
   const userData = useSelector(state => state.auth.userData)

    return (
        <div className="flex justify-center items-center m-auto">
            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-1/3 z-10 space-y-3">
                <div className="flex justify-between">
                    <span className='flex gap-2'>
                        <img
                        src={userData?.prefs.avatar}
                        className="h-12 w-12 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar" />
                        <span className='dark:text-white'>{userData?.name} {" "} <RiVerifiedBadgeFill className=' text-blue-400 inline' />
                        <span className='block text-sm italic opacity-25 items-start'>
                        @{userData?.name.toLowerCase().replaceAll(' ', '')}
                        </span>
                        </span> 
                    </span>
                    <span>
                        <BsTwitterX className="text-neutral-700 dark:text-neutral-200 flex-shrink-0" />
                    </span>
                </div>
                <div className="">
                {
                    post?.content
                }
                </div>
            </div>
        </div>
    );
}

export default TweetCard;
