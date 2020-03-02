import React from 'react'
import '@/pages/styles/RightSideBar.sass'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const RightSideBar = () => {
    const history = useHistory()

    // methods
    const jumpToWrite = () => {
        history.push('/write')
    }

    return (
        <div className="RightSideBar">
            <Button
                className="jumpWriteBtn"
                type="primary"
                onClick={jumpToWrite}
            >
                写文章
            </Button>
            <a
                href="https://pinfrights.tk/21-amazing-travel-apps-yo/"
                target="_blank"
                title="https://pinfrights.tk/21-amazing-travel-apps-yo/"
                rel="noopener noreferrer"
            >
                <div
                    className="pic"
                    style={{
                        backgroundImage: `url(${require('@/img/street.jpg')})`,
                    }}
                ></div>
            </a>
        </div>
    )
}

export default RightSideBar
