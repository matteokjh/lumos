import React from 'react'
import '@/pages/styles/ArticleList.sass'
import { ArticleProps } from '@/types/articles'
import { Empty } from 'antd'
import ArticleItem from './ArticleItem'

const ArticleList = (props: {
    articleList: ArticleProps[]
    loading: boolean
    refresh?: () => void
    canEdit: boolean
}) => {
    const { articleList, loading, refresh, canEdit } = props

    return (
        <div className="ArticleList">
            {articleList?.length ? (
                articleList.map(e => (
                    <ArticleItem
                        articleInfo={e}
                        key={e.aid}
                        loading={loading}
                        refresh={refresh}
                        canEdit={canEdit}
                    ></ArticleItem>
                ))
            ) : (
                <Empty style={{
                    backgroundColor: '#fff'
                }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="这里空空如也~"></Empty>
            )}
        </div>
    )
}

export default ArticleList
