import dbService from '@/appwrite/db';
import { Container, Sidebar2List } from '@/components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Tweets = () => {
    const [items, setItems ] = useState([]) 
    const [ hasMore, setHasMore ] = useState(true) 
    const [ loading, setLoading ] = useState(true) 
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        if (userData) {        
            dbService.getPosts(userData.targets[0].providerId, "X")
            .then(data => {
                setLoading(false)
                setItems(data.documents)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
        }
    }, []);

    const fetchData = () => {
        console.log("called");
        
        if (userData && items) { 
            const cursor  = items[items.length - 1].$id
            dbService.getPosts(userData.targets[0].providerId, "X", cursor)
            .then(data => {
                console.log(data);
                if (data.documents.length === 0) {
                    setHasMore(false);
                  } else {
                    setItems((prevItems) => [...prevItems, ...data.documents]); 
                  }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
    return (
        <Container>
            <Sidebar2List items={items} fetchData={fetchData} loading={loading} hasMore={hasMore}/>
        </Container>
    );
}

export default Tweets;