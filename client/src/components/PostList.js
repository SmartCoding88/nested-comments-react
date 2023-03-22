import { useEffect, useState } from "react"
import { getPosts } from "../services/posts"

export function PostList(){

    const [posts, setPosts] = useState([])
    useEffect(()=>{

        getPosts().then(setPosts)

    }, []);

    return posts.map(post=>{
        return (
            <h1 key={post.id}>
                <a href={`/posts/${post.id}`}>{post.title}</a>
            </h1>
        )
    })
}