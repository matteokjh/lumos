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

    return <div className="RightSideBar">
        <Button className="jumpWriteBtn" type="primary" onClick={jumpToWrite}>写文章</Button>
    </div>
}

export default RightSideBar