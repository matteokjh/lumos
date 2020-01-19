import React, { useContext } from 'react'
import { store } from '../../../store'
import UserInfoForm from '../../../components/UserInfoForm'

const Info = () => {
    const { userInfo } = useContext(store).state

    return (
        <div className="info">
            <h3>个人资料</h3>
            <hr />
            <div className="wrapper">
                {/* 头像 */}
                <div className="avatar" style={{
                    backgroundImage: `url(${userInfo.avatar || require('../../../img/defaultAvatar.png')})`
                }}></div>
                {/* 主体 */}
                <div className="detail">
                    <UserInfoForm></UserInfoForm>
                </div>
            </div>
        </div>
    )
}

export default Info
