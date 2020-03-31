import React from 'react';
import '@/pages/styles/ArticleList.sass';
import { ArticleProps } from '@/types/articles';
import { Empty, Skeleton } from 'antd';
import ArticleItem from './ArticleItem';

const ArticleList = (props: {
    articleList: ArticleProps[];
    refresh?: () => void;
    canEdit: boolean;
    loading: boolean;
}) => {
    const { articleList, refresh, canEdit, loading } = props;

    return (
        <div className="ArticleList">
            {loading ? (
                <Skeleton className="ske" active paragraph={{ rows: 20 }}></Skeleton>
            ) : articleList.length ? (
                articleList.map(e => (
                    <ArticleItem
                        articleInfo={e}
                        key={e.aid}
                        refresh={refresh}
                        canEdit={canEdit}
                    ></ArticleItem>
                ))
            ) : (
                <Empty
                    style={{
                        backgroundColor: '#fff',
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="这里空空如也~"
                ></Empty>
            )}
        </div>
    );
};

export default ArticleList;
