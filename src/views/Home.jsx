import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPostData(){
            let response = await fetch('http://localhost:5000/api/posts')
            let posts = await response.json()
            if (posts.error){
                setPosts([])
            } else {
                setPosts(posts);
            }
        };
        fetchPostData()
    }, []);

    return (
        <div>
            <h1 className="text-center mt-5"> Welcome to OurBlog</h1>
            {posts.map( post => <PostCard key={post.id} post={post} />)}
        </div>
    )
};
