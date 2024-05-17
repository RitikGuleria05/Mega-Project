import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../componenets'


function AllPosts() {
    const [posts, setposts] = useState([])
    useEffect(() => { }, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setposts(posts.documents)
        }
    })
    return (
        <div className=' w-full py-8'>
            {/* <Container>
                {posts.map((post) => (
                    <PostCard key={post.$id} post={post} />
                ))}
            </Container> */}
            <div className=' flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className=' p-2 w-1/4'>
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllPosts
