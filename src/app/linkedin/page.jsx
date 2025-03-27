import dbService from '@/appwrite/db';
import { Container, Sidebar2List } from '@/components';
import { addLinkedinPosts, prependLinkedinPosts } from '@/store/postSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LinkedIn = () => {
    const [ hasMore, setHasMore ] = useState(true) 
    const [ loading, setLoading ] = useState(true) 
    const userData = useSelector(state => state.auth.userData)
    const linkedinPosts = useSelector(state => state.posts.linkedinPosts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userData && linkedinPosts.length === 0) {        
            dbService.getPosts(userData.targets[0].providerId, "linkedin", 10)
            .then(data => {
                setLoading(false)
                dispatch(addLinkedinPosts(data.documents))
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
        dbService.subscribeToPosts(userData.targets[0].providerId, "linkedin", (newPost) => {
            if (newPost) {
                dispatch(prependLinkedinPosts([newPost]))
            }
            
        })
        return () => {
            dbService.unsubscribeToPost()
        };
    }, [dispatch]);


    const fetchData = () => {
            const cursor  = linkedinPosts[linkedinPosts.length - 1].$id
            dbService.getPosts(userData.targets[0].providerId, "linkedin", 10, cursor)
            .then(data => {
                if (data.documents.length === 0) {
                    setHasMore(false);
                } else {
                    dispatch(addLinkedinPosts(data.documents)) 
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <Container>
            <Sidebar2List items={linkedinPosts} fetchData={fetchData} loading={loading} hasMore={hasMore}/>
        </Container>
    );
}

export default LinkedIn;
