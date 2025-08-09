import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { RxPadding } from "react-icons/rx";
import { AiOutlineRadiusUpleft } from "react-icons/ai";
import { IoColorPaletteOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaLinkedinIn } from "react-icons/fa6";
import CopyToClipboard from "./copyToClipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GoDownload } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import dbService from "@/appwrite/db";
import { editPost } from "@/store/postSlice";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import html2canvas from "html2canvas";

const themes = {
  Tomorrow: tomorrow,
  Dracula: dracula,
  Okaidia: okaidia,
};

const LinkedInCard = ({ post }) => {
  const userData = useSelector((state) => state.auth.userData);
  const [content, setContent] = useState(post?.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  // Controls
  const [snippetBg, setSnippetBg] = useState("#F8E71C");
  const [padding, setPadding] = useState(16);
  const [roundness, setRoundness] = useState(5);
  const [selectedTheme, setSelectedTheme] = useState("Tomorrow");

  const dispatch = useDispatch();
  const snippetRef = useRef();

  const handleDownload = async () => {
    if (!snippetRef.current) return;
    try {
      const canvas = await html2canvas(snippetRef.current, {
        scale: 4,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "snippet.png";
      link.click();
    } catch (err) {
      console.error("Failed to capture element:", err);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (post?.content.trim() === content.trim()) {
      return;
    }
    const res = dbService.updatePost(post?.$id, { content: content });
    toast.promise(res, {
      loading: "Saving changes...",
      success: () => {
        dispatch(editPost({ ...post, content: content }));
        return "Changes saved successfully";
      },
      error: "Failed to save changes",
    });
  };

  useEffect(() => {
    if (content !== "") {
      content !== post.content ? setEdited(true) : setEdited(false);
    }
  }, [isEditing, content]);

  return (
    <div
      className={`w-full h-full md:flex items-center justify-center ${
        isReadMore && "md:mt-[34rem]"
      } mt-20`}
    >
      <div className="bg-slate-50 dark:bg-neutral-900 border shadow px-5 py-4 rounded-lg max-w-full md:w-[40rem] md:mb-[20rem] mb-[34rem] ">
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
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <FaLinkedinIn />
            <CopyToClipboard copyText={content} />
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 dark:bg-neutral-800 bg-slate-50 hover:bg-slate-200 rounded-lg border border-black dark:border-none"
            >
              <MdEdit />
            </button>
          </div>
        </div>

        {/* Post Content */}
        <div className="mt-3 w-full h-full">
          {isEditing ? (
            <textarea
              autoFocus
              className="w-full h-[25rem] p-2 bg-transparent border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
            />
          ) : (
            <div className="h-full break-words">
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : "";
                    const codeText = String(children).replace(/\n$/, "");
                    return !inline && match ? (
                      <div className="relative rounded-md overflow-hidden">
                        <div className="absolute right-0 top-0 m-2 flex space-x-2 z-10">
                          <CopyToClipboard copyText={codeText} />
                          <button
                            onClick={handleDownload}
                            className="dark:bg-neutral-800 bg-slate-50 hover:bg-slate-200 rounded-lg px-2 py-1 border border-black dark:border-none"
                          >
                            <GoDownload className="text-lg" />
                          </button>
                        </div>{" "}
                        <div
                          ref={snippetRef}
                          style={{
                            padding: `${padding}px`,
                            backgroundColor: snippetBg,
                          }}
                        >
                          <SyntaxHighlighter
                            language={language}
                            style={themes[selectedTheme]}
                            wrapLongLines={true}
                            PreTag="div"
                            customStyle={{
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                              overflow: "visible",
                              borderRadius: `${roundness}px`,
                              fontSize: "0.875rem",
                              transition: "all 0.3s ease",
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
                      </div>
                    ) : (
                      <code className="bg-zinc-700 text-white px-1 py-1 my-1 rounded">
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
                  className="text-blue-600 cursor-pointer"
                >
                  {" "}
                  ...more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
{/* Bottom Toolbar */}
<div className="fixed bottom-0 left-0 right-0 md:left-1/2 md:translate-x-[-50%] md:w-[25rem] bg-white dark:bg-neutral-900 border-t shadow px-2 py-2 flex flex-wrap justify-center md:justify-between items-center gap-3 md:rounded-t-lg z-50 text-xs">
  {/* Background Picker */}
  <div className="flex items-center gap-1">
    <input
      type="color"
      value={snippetBg}
      onChange={(e) => setSnippetBg(e.target.value)}
      className="w-6 h-6 border-none outline-none p-0 m-0 cursor-pointer"
    />
  </div>

  {/* Padding Control */}
  <div className="flex items-center gap-1">
    <RxPadding className="text-base" />
    <input
      type="range"
      min="0"
      max="50"
      value={padding}
      onChange={(e) => setPadding(Number(e.target.value))}
      className="w-16 md:w-20 cursor-pointer"
    />
  </div>

  {/* Roundness Control */}
  <div className="flex items-center gap-1">
    <AiOutlineRadiusUpleft className="text-base" />
    <input
      type="range"
      min="0"
      max="30"
      value={roundness}
      onChange={(e) => setRoundness(Number(e.target.value))}
      className="w-16 md:w-20 cursor-pointer"
    />
  </div>

  {/* Theme Selector */}
  <div className="flex items-center gap-1">
    <IoColorPaletteOutline className="text-base" />
    <select
      value={selectedTheme}
      onChange={(e) => setSelectedTheme(e.target.value)}
      className="border border-gray-500 rounded px-1 py-[2px] text-xs text-white bg-black appearance-none cursor-pointer"
    >
      {Object.keys(themes).map((theme) => (
        <option key={theme} value={theme} className="bg-black text-white">
          {theme}
        </option>
      ))}
    </select>
  </div>
</div>


      <Toaster position="bottom-center" richColors closeButton />
    </div>
  );
};

export default LinkedInCard;
