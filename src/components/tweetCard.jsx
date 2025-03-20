import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import CopyToClipboard from "./copyToClipboard";
import ReactMarkdown from "react-markdown";

const TweetCard = ({ post, loading }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [content, setContent] = useState(post?.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const postRef = useRef(null);

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center w-full px-4 sm:px-0">
        <div className="bg-white dark:bg-neutral-900 border shadow-sm px-4 sm:px-6 py-4 rounded-lg w-full max-w-xl">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={userData?.prefs.avatar}
                className="h-12 w-12 rounded-full flex-shrink-0"
                width={50}
                height={50}
                alt="Avatar"
              />
              <div className="text-sm sm:text-base dark:text-white">
                <span className="font-semibold flex items-center gap-1">
                  {userData?.name}
                  <RiVerifiedBadgeFill className="text-blue-400 text-lg" />
                </span>
                <span className="text-xs sm:text-sm italic opacity-50">
                  @{userData?.name.toLowerCase().replaceAll(" ", "")}
                </span>
              </div>
            </div>
            {/* Engagement Section */}
            <div className="flex flex-col items-center gap-2">
              <BsTwitterX className="text-neutral-700 dark:text-neutral-200" />
              <CopyToClipboard postRef={postRef} />
            </div>
          </div>
  
          {/* Editable Content */}
          <div className="mt-3 w-full">
            {isEditing ? (
              <textarea
                autoFocus
                className="w-full h-40 p-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none text-sm sm:text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleBlur}
              />
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="cursor-pointer break-words overflow-wrap w-full text-sm sm:text-base"
                ref={postRef}
              >
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default TweetCard;
