import dbService from '@/appwrite/db';
import { Container, LinkedInCard, TweetCard } from '@/components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
    const {slug} = useParams()
    const [post, setPost] = useState({})
    useEffect(() => {
        if (slug) {
            dbService.getPost(slug)
            .then(data => {
                console.log(data);
                setPost(data)
            })
        }
    }, []);
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
            {
                post.app === 'X' ? <TweetCard post={post} /> : <LinkedInCard post={post} />
            }
        </Container>
    );
}

export default Post;
