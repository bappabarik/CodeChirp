import formatDateTime from '@/util/formatDateTime';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import Loader from './ui/loader';

const Sidebar2List = ({items, fetchData, loading, hasMore}) => {
   

    return (
      <div className=' overflow-auto h-full w-full md:mt-0 mt-10 md:pr-10'>
        { 
          !loading ?  (
            items.length !== 0  ? (
            <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<Loader />}
            height={items.length >= 10 && 800}
            endMessage={
              <p className=' text-center m-3 text-slate-300'>
                You have seen it all
              </p>
            }
          >
  
          {items.map((post) => (
            <Link
              to={`/dashboard/post/${post.$id}`}
              key={post.$id}
              className="flex flex-col items-start gap-2 whitespace-wrap border-b py-4 md:pr-8 pr-4 pl-4 text-sm leading-tight last:border-b-0 hover:bg-gray-700 hover:text-sidebar-accent-foreground"
            >
              <div className="flex w-full items-center gap-2 ">
                <span>Event: {post.event}</span>{" "}
                <span className="ml-auto text-xs">{formatDateTime(post.$updatedAt)}</span>
              </div>
              <span className="font-medium line-clamp-1 w-full break-words">{post.content}</span>
              <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                Created for {post.app}
              </span>
            </Link>
          )) 
        }
        </InfiniteScroll>) : (
          <div className=' w-full h-full flex items-center'>
            <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(51, 51, 51) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(51, 51, 51) 1px, transparent 1px)
              `,
              backgroundSize: "8px 8px",
              opacity: 0.2,
            }}
            />
            <h1 className=' m-auto font-extrabold text-4xl'>Oops! you have no posts</h1>
        </div>
        ) 
       ) : (<div className="flex flex-col m-1 gap-2">
        {[...new Array(10)].map((_, index) => (
            <div
            key={`skeleton-${index}`}
            className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
        ))}
        </div>)
        }
      </div>
    );
}

export default Sidebar2List;
