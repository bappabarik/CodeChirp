import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { FaLinkedinIn } from "react-icons/fa6";
import CopyToClipboard from "./copyToClipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GoDownload } from "react-icons/go";

const LinkedInCard = ({ post, loading }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [content, setContent] = useState(post?.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const postRef = useRef(null);
  const codeSnippet = useRef(null);

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (content) {
      content !== post.content ? setEdited(true) : setEdited(false);
    }
  }, [isEditing, content]);

  
  // Function to download code as a file
  const downloadAsFile = (text, language) => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `code-snippet.${language || 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };


  return (
    <div className=" w-full h-full md:flex items-center justify-center md:mt-[24rem] mt-20">
      <div className="bg-white dark:bg-neutral-900 border shadow-sm px-5 py-4 rounded-lg max-w-full md:w-[40rem]">
        {/* User Info */}
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <img
              className="h-12 w-12 rounded-full"
              src={userData?.prefs.avatar}
              alt="User Avatar"
            />
            <div>
              <div className="text-sm">
                <span className="font-semibold">{userData?.name}</span>
                <span className="text-gray-500"> • 1st</span>
              </div>
              <div className="text-gray-500 text-xs">
                Software Engineer at Tesla, Inc
              </div>
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
            <div
              onClick={() => setIsEditing(true)}
              className="cursor-pointer h-full break-words"
              ref={postRef}
            >
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : "";
                    const codeText = String(children).replace(/\n$/, "");

                    return !inline && match ? (
                      <div className="relative rounded-md overflow-hidden">
                        <div className="absolute right-0 top-0 m-2 flex space-x-2 z-10">
                        <CopyToClipboard postRef={codeSnippet} />
                          <button
                            onClick={() => downloadAsFile(codeText, language)}
                            className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
                          >
                            <GoDownload  className="text-lg" />
                          </button>
                        </div>
                        <div className="overflow-x-auto w-full mt-8 rounded-lg" ref={codeSnippet}>
                          {" "}
                          {/* Added margin-top to prevent overlap with buttons */}
                          <SyntaxHighlighter
                            style={tomorrow}
                            language={language}
                            wrapLongLines={true}
                            className="rounded-md"
                            {...props}
                          >
                            {codeText}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ) : (
                      <code className="bg-zinc-700 text-white px-1 py-1 my-1 rounded text-wrap" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {isReadMore ? content : `${content.slice(0, 200)}`}
              </ReactMarkdown>
              {!isReadMore && content.length > 200 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsReadMore(true);
                  }}
                  className="text-blue-600 cursor-pointer break-words"
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
          <img
            src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
            alt="Like"
          />
          <img
            src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
            alt="Clap"
          />
          <img
            src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97"
            alt="Celebrate"
          />
          <span>47 • 26 comments</span>
        </div>
      </div>
    </div>
  );
};

export default LinkedInCard;
