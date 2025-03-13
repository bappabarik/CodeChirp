import dbService from '@/appwrite/db';
import { Container, Sidebar2List } from '@/components';
import React, { useEffect, useState } from 'react';

const Tweets = () => {
    const [items, setItems ] = useState([]) 
    useEffect(() => {
        dbService.getPosts()
        .then(data => {
            console.log(data);
            const filteredLinkedIn = data.documents.filter(post => post.app !== "linkedin")
            setItems(filteredLinkedIn)
        })
    }, []);
    return (
        <Container>
            <Sidebar2List items={items}/>
        </Container>
    );
}

export default Tweets;