import formatDateTime from '@/util/formatDateTime';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar2List = ({items}) => {
   

    return (
      <>
            {items?.map((post) => (
                <Link
                  to={`/dashboard/post/${post.$id}`}
                  key={post.$id}
                  className="flex flex-col items-start gap-2 whitespace-wrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-gray-700 hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2 ">
                    <span>Event: {post.event}</span>{" "}
                    <span className="ml-auto text-xs">{formatDateTime(post.$updatedAt)}</span>
                  </div>
                  <span className="font-medium ">{post.content}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    Created for {post.app}
                  </span>
                </Link>
              ))}
      </>
    );
}

export default Sidebar2List;
