import React, { useContext, useState } from 'react'
import { store } from '@/store'
import UserInfoForm from '@/components/UserInfoForm'
import UploadAvatarModal from '@/components/modals/UploadAvatarModal'

const Info = () => {
    const { userInfo } = useContext(store).state
    const [uploadAvatarModal, setUploadAvatarModal] = useState(false)

    return (
        <div className="info">
            <div className="header">
                <h3>个人资料</h3>
            </div>
            <div className="wrapper">
                {/* 头像 */}
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${userInfo.avatar})`,
                    }}
                >
                    <div
                        className="shadow"
                        onClick={() => setUploadAvatarModal(true)}
                    >
                        <span>上传头像</span>
                    </div>
                </div>
                {/* 主体 */}
                <div className="detail">
                    <UserInfoForm></UserInfoForm>
                </div>
            </div>
            {uploadAvatarModal && (
                <UploadAvatarModal
                    hideModal={() => setUploadAvatarModal(false)}
                ></UploadAvatarModal>
            )}
        </div>
    )
}

export default Info
