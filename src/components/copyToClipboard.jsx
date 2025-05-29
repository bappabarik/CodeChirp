import React, { useCallback, useState } from 'react';
import { IoCopyOutline } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import removeMd from 'remove-markdown';

const CopyToClipboard = ({copyText}) => {
     const [copy, setCopy] = useState(false)

    const copyToClipboard = useCallback(() => {
        
        if (copyText !== '') {
            // Remove any code blocks
            const withoutCode = copyText.replace(/```[\s\S]*?```/g, "").trim();

            // Remove markdown (e.g., **bold**, _italic_, etc.)
            const cleanText = removeMd(withoutCode);
            navigator.clipboard.writeText(cleanText)
            .then(() => {
                setCopy(true)
            })
        }
    
        setTimeout(() => {
            setCopy(false)
        }, 2000);
    
      }, [])

    return (
        <button onClick={copyToClipboard} className=" p-2 dark:bg-neutral-800 bg-slate-50 hover:bg-slate-200 rounded-lg  dark:border-none border border-black">
            {!copy ? <IoCopyOutline /> : <IoCopy />}
        </button>
    );
}

export default CopyToClipboard;
