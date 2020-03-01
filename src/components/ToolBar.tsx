import React from 'react'
import '@/styles/ToolBar.sass'
import { LikeOutlined, DislikeOutlined, StarOutlined } from '@ant-design/icons'
import { formatNumber } from '@/utils/methods'

const ToolBar = () => {
    return (
        <div className="ToolBar">
            <div className="like">
                <LikeOutlined />
                <span>{formatNumber(999999)}</span>
            </div>
            <div className="dislike">
                <DislikeOutlined />
            </div>
            <div className="star">
                <StarOutlined />
                <span>{formatNumber(9999)}</span>
            </div>
        </div>
    )
}

export default ToolBar
