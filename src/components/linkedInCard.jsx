import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { FaLinkedinIn } from "react-icons/fa6";
import CopyToClipboard from "./copyToClipboard";



const LinkedInCard = ({ post, loading }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [content, setContent] = useState(post?.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const postRef = useRef(null)

  console.log(loading);
  

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (content) {
      content !== post.content ? setEdited(true) : setEdited(false);
    }
  }, [isEditing, content]);

 

  return (
    <div className=" w-full h-full md:flex items-center justify-center md:mt-0 mt-20">
        <div className="bg-white dark:bg-neutral-900 border shadow-sm px-5 py-4 rounded-lg max-w-full md:w-[40rem]">
          {/* User Info */}
          <div className="flex justify-between">
              <div className="flex items-center space-x-3">
              <img className="h-12 w-12 rounded-full" src={userData?.prefs.avatar} alt="User Avatar" />
              <div>
                  <div className="text-sm">
                  <span className="font-semibold">{userData?.name}</span>
                  <span className="text-gray-500"> • 1st</span>
                  </div>
                  <div className="text-gray-500 text-xs">Software Engineer at Tesla, Inc</div>
                  <div className="text-gray-500 text-xs flex items-center">
                  <span>3d {edited && " • Edited •"}</span>
                  <svg
                      className="ml-1 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      focusable="false"
                  >
                      <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
                  </svg>
                  </div>
              </div>
              </div>
              <div className="flex flex-col gap-2 items-center">
                  <FaLinkedinIn />
                  <CopyToClipboard postRef={postRef} />
              </div>
          </div>
          {/* Post Content */}
          <div className="mt-3 w-full h-full">
            {isEditing ? (
              <textarea
                autoFocus
                className="w-full h-60 p-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleBlur}
              />
            ) : (
              <div onClick={() => setIsEditing(true)} className="cursor-pointer h-full" ref={postRef}>
                <ReactMarkdown>{isReadMore ? content : `${content.slice(0, 200)}`}</ReactMarkdown>
                {!isReadMore && content.length > 200 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsReadMore(true);
                    }}
                    className="text-blue-600 cursor-pointer"
                  >
                    {" "}
                    ...more
                  </span>
                )}
              </div>
            )}
          </div>
  
          {/* Reactions */}
          <div className="text-gray-500 text-xs flex items-center mt-3 space-x-1 ">
            <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="Like" />
            <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="Clap" />
            <img src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" alt="Celebrate" />
            <span>47 • 26 comments</span>
          </div>
        </div>
      </div>
  );
};

export default LinkedInCard;
