import React, { useCallback, useState } from 'react';
import { IoCopyOutline } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";

const CopyToClipboard = ({postRef}) => {
     const [copy, setCopy] = useState(false)

    const copyToClipboard = useCallback(() => {
        if (postRef.current) {
            navigator.clipboard.writeText(postRef.current.innerText)
            .then(() => {
                setCopy(true)
            })
        }
    
        setTimeout(() => {
            setCopy(false)
        }, 2000);
    
      }, [])

    return (
        <button onClick={copyToClipboard} className=" p-2 bg-neutral-800 rounded-lg">
            {!copy ? <IoCopyOutline /> : <IoCopy />}
        </button>
    );
}

export default CopyToClipboard;
