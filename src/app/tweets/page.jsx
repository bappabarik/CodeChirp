import dbService from '@/appwrite/db';
import { Container, Sidebar2List } from '@/components';
import { addXPosts, prependXPosts } from '@/store/postSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Tweets = () => {
    const [ hasMore, setHasMore ] = useState(true) 
    const [ loading, setLoading ] = useState(true) 
    const userData = useSelector(state => state.auth.userData)
    const xPosts = useSelector(state => state.posts.xPosts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userData && xPosts.length === 0) {        
            dbService.getPosts(userData.targets[0].providerId, "X", 10)
            .then(data => {
                setLoading(false)
                dispatch(addXPosts(data.documents))
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        dbService.subscribeToPosts(userData.targets[0].providerId, "X", (newPost) => {
            if (newPost) {
                dispatch(prependXPosts([newPost]))
            }
            // console.log(newPost);
        })
        return () => {
            dbService.unsubscribeToPost()
        };
    }, [dispatch]);

    const fetchData = () => {
            const cursor  = xPosts[xPosts.length - 1].$id
            dbService.getPosts(userData.targets[0].providerId, "X", 10, cursor)
            .then(data => {
                if (data.documents.length === 0) {
                    setHasMore(false);
                  } else {
                    dispatch(addXPosts(data.documents))
                  }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Container>
            <Sidebar2List items={xPosts} fetchData={fetchData} loading={loading} hasMore={hasMore}/>
        </Container>
    );
}

export default Tweets;