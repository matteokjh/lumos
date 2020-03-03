import React, { useContext, useState } from 'react'
import { store } from '@/store'
import UserInfoForm from '@/components/UserInfoForm'
import UploadAvatarModal from '@/components/modals/UploadAvatarModal'
import { uploadAvatar } from '@/api/user'
import { message } from 'antd'

const Info = () => {
    const { userInfo } = useContext(store).state
    const [uploadAvatarModal, setUploadAvatarModal] = useState(false)
    const { dispatch } = useContext(store)

    // methods
    const submit = async (imageUrl: string) => {
        if (!imageUrl) {
            message.warning('请上传图片！')
            return
        }
        try {
            let res = await uploadAvatar({
                base64: imageUrl,
            })
            if (res.code === 200) {
                dispatch({
                    type: 'SET_AVATAR',
                    payload: imageUrl,
                })
                setUploadAvatarModal(false)
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }

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
                        backgroundColor: '#eee'
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
            <UploadAvatarModal
                visible={uploadAvatarModal}
                title={'上传头像'}
                submit={submit}
                imageUrl={userInfo.avatar}
                onCancel={() => setUploadAvatarModal(false)}
            ></UploadAvatarModal>
        </div>
    )
}

export default Info
