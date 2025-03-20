import dbService from '@/appwrite/db';
import { Container, LinkedInCard, TweetCard } from '@/components';
import { addPost } from '@/store/postSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Post = () => {
    const {slug} = useParams()
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(true)
    const userData = useSelector(state => state.auth.userData)
    const posts = useSelector(state => state.posts.posts)
    const dispatch = useDispatch()

    useEffect(() => {

        if (slug) {
            const matchPost = posts?.find((post) => post.$id === slug)
            if (matchPost ) {  
               setPost(matchPost) 
               setLoading(false)
            } else {
                dbService.getPost(slug)
                .then(data => {
                    if (data.providerID === userData?.targets[0].providerId) {
                        setPost(data)
                        dispatch(addPost(data))
                        setLoading(false)
                    }
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false)
                })
            }
        }
    }, [slug]);
    return (
        <Container>
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                backgroundImage: `
                    linear-gradient(to right, rgb(51, 51, 51) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(51, 51, 51) 1px, transparent 1px)
                `,
                backgroundSize: "8px 8px",
                opacity: 0.2,
                }}
            />{ !loading ?
                ( 
                <div className="flex justify-center items-center overflow-auto z-20 h-full w-full ">
                    {post?.app === 'linkedin' && <LinkedInCard post={post} />}
                { post?.app === 'X' && <TweetCard post={post} />  } 
                </div>
            )  : (
            <div className="flex flex-col m-1 gap-2 w-full h-full items-center justify-center z-20">
                    <div className="flex flex-col gap-3 h-60 shadow-sm px-4 sm:px-6 py-4 max-w-full md:w-[40rem] rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse">
                        <div className=" flex justify-between">
                            <div className="flex gap-2">
                                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-neutral-700 animate-pulse"></div>
                                <div className=" w-32 h-12 rounded-md bg-gray-100 dark:bg-neutral-700 animate-pulse"></div>
                            </div> 
                            <div className=" w-10 h-full rounded-md bg-gray-100 dark:bg-neutral-700 animate-pulse"></div>
                        </div>
                        <div className=" flex flex-col gap-3 mt-3">
                        {[...new Array(5)].map((_, index) => (
                            <div
                            key={`skeleton-${index}`}
                            className="h-4 w-full rounded-lg  bg-gray-100 dark:bg-neutral-700 animate-pulse"></div>
                        ))}
                        </div>
                    </div>
            </div>)
            }  
        </Container>
    );
}

export default Post;
