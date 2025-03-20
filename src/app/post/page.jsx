import dbService from '@/appwrite/db';
import { Container, LinkedInCard, TweetCard } from '@/components';
import { addPost } from '@/store/postSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Post = () => {
    const {slug} = useParams()
    const [post, setPost] = useState()
    const userData = useSelector(state => state.auth.userData)
    const posts = useSelector(state => state.posts.posts)
    const dispatch = useDispatch()

    useEffect(() => {

        if (slug) {
            const matchPost = posts?.find((post) => post.$id === slug)
            if (matchPost ) {  
               setPost(matchPost) 
            } else {
                dbService.getPost(slug)
                .then(data => {
                    if (data.providerID === userData?.targets[0].providerId) {
                        setPost(data)
                        dispatch(addPost(data))
                        console.log(data);
                    }
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
            />
            <div className="flex justify-center items-center overflow-auto z-20 h-full w-full ">
                {post?.app === 'linkedin' && <LinkedInCard post={post} />}
               { post?.app === 'X' && <TweetCard post={post} />  } 
            </div>  
        </Container>
    );
}

export default Post;
