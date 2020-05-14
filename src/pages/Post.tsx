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
    const [lastSeen, setLastSeen] = useState(0);

    let fetching = false
    // methods
    const handleScroll = (e: any) => {
        const scrollTop = e.target.scrollingElement.scrollTop
        const clientHeight = e.target.scrollingElement.clientHeight
        const scrollHeight = e.target.scrollingElement.scrollHeight;
        let d = scrollTop - clientHeight
        if(d <= 0) setScrollState(0)
        else setScrollState(1)

        
        // 滚动到底部，触发请求，-1 表示到底
        if (
            scrollHeight - clientHeight - scrollTop < 20 &&
            !fetching &&
            lastSeen !== -1
        )
            getListData();
    }
    const getListData = async () => {
        try {
            fetching = true;
            let res = await getAllArticles({
                lastSeen
            });
            if (res.code === 200) {
                console.log(res.data.lastSeen);
                setArticleList(list => list.concat(res.data.list));
                setLastSeen(res.data.lastSeen);
            } else {
                message.error(res.msg);
            }
        } catch (err) {
            message.error(err);
        } finally {
            fetching = false;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
        // eslint-disable-next-line
    }, [lastSeen])

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                let res = await getAllArticles();
                if (res.code === 200) {
                    setArticleList(list => list.concat(res.data.list));
                    setLastSeen(res.data.lastSeen);
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
