import React from 'react'
import ArticleList from './components/ArticleList'
import RightSideBar from './components/RightSideBar'
import './styles/post.sass'

const Post = () => {
    return (
        <div className="postLayout">
            <ArticleList></ArticleList>
            <RightSideBar></RightSideBar>
        </div>
    )
}

export default Post