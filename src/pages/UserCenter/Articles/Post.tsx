import React, { useEffect, useState, useContext } from 'react';
import { getMyAllArticles } from '@/api/article';
import { message } from 'antd';
import { store } from '@/store';
import ArticleList from '@/pages/components/ArticleList';

const Post = (props: any) => {
    const { state, dispatch } = useContext(store);
    const { userInfo } = state;
    const [articlesType, setArticlesType] = useState(''); // post | draft
    const [articlesAuthor, setArticlesAuthor] = useState(''); // username
    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lastSeen, setLastSeen] = useState(0);

    let fetching = false;
    // methods
    const handleScroll = (e: any) => {
        const scrollTop = e.target.scrollingElement.scrollTop;
        const scrollHeight = e.target.scrollingElement.scrollHeight;
        const clientHeight = e.target.scrollingElement.clientHeight;
        // 滚动到底部，触发请求，-1 表示到底
        if (
            scrollHeight - clientHeight - scrollTop < 20 &&
            !fetching &&
            lastSeen !== -1
        )
            getListData();
    };
    const getListData = async () => {
        try {
            fetching = true;
            let res = await getMyAllArticles({
                username: articlesAuthor,
                type: articlesType,
                lastSeen,
            });
            if (res.code === 200) {
                console.log(res.data);
                setArticleList(articleList.concat(res.data.list));
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
    const refresh = async () => {
        try {
            const type = props.match.params.type;
            setLoading(true);
            let res = await getMyAllArticles({
                username: articlesAuthor,
                type,
            });
            if (res.code === 200) {
                console.log(res.data);
                setArticleList(res.data.list);
            } else {
                message.error(res.msg);
            }
        } catch (err) {
            message.error(err);
        } finally {
            setLoading(false);
        }
    };
    // 请求 data
    useEffect(() => {
        if (articlesType) {
            (async () => {
                try {
                    setLoading(true);
                    let res = await getMyAllArticles({
                        username: articlesAuthor,
                        type: articlesType,
                    });
                    if (res.code === 200) {
                        console.log(res.data);
                        setArticleList(res.data.list);
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
        }
    }, [articlesAuthor, articlesType, dispatch]);
    // 捕获 url param
    useEffect(() => {
        let { username, type } = props.match.params;
        setArticlesAuthor(username);
        setArticlesType(type);
    }, [props.match.params]);
    // 监听滚动
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line
    }, [lastSeen]);

    return (
        <div
            className={`Articles_Post ${
                articlesType === 'draft' ? 'draft' : ''
            }`}
        >
            <ArticleList
                loading={loading}
                articleList={articleList}
                refresh={refresh}
                canEdit={props.match.params.username === userInfo.username}
            ></ArticleList>
        </div>
    );
};

export default Post;
