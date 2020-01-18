import React, { useEffect, useContext } from 'react'
import { Menu } from 'antd'
import { useLocation, useHistory } from 'react-router-dom'
import { store } from '../../store'

const Setting = () => {
    const location = useLocation()
    const history = useHistory()
    const { userInfo } = useContext(store).state
    const username = location.pathname.split('/')[2]
    console.log(username)

    useEffect(() => {
        // 不是本人，跳回首页
            console.log(username)
        // if(username !== userInfo.username) {
        //     console.log(username)
        //     history.push('/')
        // }
    }, [username, userInfo, history])
    return (
        <div className="userInfo">123</div>
    )
}

export default Setting