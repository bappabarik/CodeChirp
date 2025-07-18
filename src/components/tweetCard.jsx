import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import CopyToClipboard from "./copyToClipboard";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GoDownload } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import dbService from "@/appwrite/db";
import { editPost } from "@/store/postSlice";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import html2canvas from "html2canvas";

const TweetCard = ({ post, loading }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [content, setContent] = useState(post?.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const snippetRef = useRef();
  
  const handleDownload = async () => {
    if (!snippetRef.current) return;

    try {
      const canvas = await html2canvas(snippetRef.current, {
        scale: 4,
        useCORS: true
      });
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'snippet.png';
      link.click();
    } catch (err) {
      console.error('Failed to capture element:', err);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (post?.content.trim() === content.trim()) {
      return;
    }
    const res = dbService.updatePost(post?.$id, { content: content });
    toast.promise(res, {
      loading: "Loading...",
      success: () => {
        dispatch(editPost({ ...post, content: content }));
        return "Changes have been saved successfully";
      },
      error: "Failed to save changes",
    });
  };

  // Function to download code as a file
  // const downloadAsFile = (text, language) => {
  //   const element = document.createElement("a");
  //   const file = new Blob([text], { type: "text/plain" });
  //   element.href = URL.createObjectURL(file);
  //   element.download = `code-snippet.${language || "txt"}`;
  //   document.body.appendChild(element);
  //   element.click();
  //   document.body.removeChild(element);
  // };

  return (
    <div className="flex items-center justify-center w-full  md:mt-[34rem] mt-72">
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
            <CopyToClipboard copyText={content} />
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 dark:bg-neutral-800 bg-slate-50 hover:bg-slate-200 rounded-lg  dark:border-none border border-black"
            >
              <MdEdit />
            </button>
          </div>
        </div>

        {/* Editable Content */}
        <div className="mt-3 w-full">
          {isEditing ? (
            <textarea
              autoFocus
              className="w-full h-[25rem] p-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none text-sm sm:text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
            />
          ) : (
            <div className="cursor-pointer break-words overflow-wrap w-full text-sm sm:text-base">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : "";
                    const codeText = String(children).replace(/\n$/, "");

                    return !inline && match ? (
                      <div className="relative rounded-md overflow-hidden">
                        <div className="absolute right-0 top-0 m-2 flex space-x-2 z-10">
                          <CopyToClipboard copyText={codeText} />
                          <button
                            onClick={handleDownload}
                            className="dark:bg-neutral-800 bg-slate-50 hover:bg-slate-200 rounded-lg px-2 py-1 dark:border-none border border-black"
                          >
                            <GoDownload className="text-lg" />
                          </button>
                        </div>{" "}
                        <SyntaxHighlighter
                          ref={snippetRef}
                          language={language}
                          style={tomorrow}
                          wrapLongLines={true}
                          PreTag="div"
                          customStyle={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            overflow: "visible",
                            padding: "1rem",
                            fontSize: "0.875rem",
                            background: "black",
                            borderRadius: "5px",
                          }}
                          codeTagProps={{
                            style: {
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            },
                          }}
                          {...props}
                        >
                          {codeText}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code
                        className="bg-zinc-700 text-white px-1 py-1 my-3 rounded text-wrap"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-center" richColors closeButton />
    </div>
  );
};

export default TweetCard;
