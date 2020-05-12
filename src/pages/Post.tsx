import React, { useEffect, useState } from 'react';
import ArticleList from './components/ArticleList';
import RightSideBar from './components/RightSideBar';
import './styles/post.sass';
import { getAllArticles } from '@/api/article';
import { message } from 'antd';

// 主页
const Post = () => {
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(false);
    // 0 --- 顶部显示；1 --- 超过显示
    const [scrollState, setScrollState] = useState(0)

    // methods
    const handleScroll = (e: any) => {
        const scrollTop = e.target.scrollingElement.scrollTop
        const clientHeight = e.target.scrollingElement.clientHeight
        let d = scrollTop - clientHeight
        if(d <= 0) setScrollState(0)
        else setScrollState(1)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let res = await getAllArticles();
                if (res.code === 200) {
                    setArticleList(res.data);
                } else {
                    message.error(res.msg);
                }
            } catch (err) {
                message.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="postLayout" onScroll={handleScroll}>
            <ArticleList
                loading={loading}
                articleList={articleList}
                canEdit={false}
            ></ArticleList>
            <RightSideBar scrollState={scrollState}></RightSideBar>
        </div>
    );
};

export default Post;
