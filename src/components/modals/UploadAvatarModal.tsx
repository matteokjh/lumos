import React, { useState, useContext, useEffect } from 'react'
import { Icon, message, Upload, Modal } from 'antd'
import './styles/uploadAvatarModal.sass'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { uploadAvatar } from '../../api/user'
import { store } from '../../store'

const UploadAvatarModal = (props: any) => {
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const { dispatch } = useContext(store)
    const { userInfo } = useContext(store).state

    useEffect(() => {
        if (userInfo.avatar) {
            setImageUrl(userInfo.avatar)
        }
    }, [userInfo])

    // methods
    const submit = async () => {
        if (!imageUrl) {
            message.warning('请上传图片！')
            return
        }
        setLoading(true)
        try {
            let res = await uploadAvatar({
                base64: imageUrl,
            })
            if (res.code === 200) {
                dispatch({
                    type: 'SET_AVATAR',
                    payload: imageUrl,
                })
                setLoading(false)
                props.hideModal()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    const getBase64 = (
        img: Blob | File | undefined,
        callback: (file: string | ArrayBuffer | null) => void
    ) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        img && reader.readAsDataURL(img)
    }
    const beforeUpload = (file: File) => {
        // 限制类型和大小
        const isJpgOrPng =
            file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('文件格式错误，仅支持 JPG/PNG 格式的文件')
        }
        const isLtM = file.size / 1024 / 1024 < 1
        if (!isLtM) {
            message.error('图片不能大于 1MB!')
        }
        return isJpgOrPng && isLtM
    }
    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(
                info.file.originFileObj,
                (imageUrl: string | ArrayBuffer | null) => {
                    setImageUrl(imageUrl as string)
                    setLoading(false)
                }
            )
        }
    }

    return (
        <div className="UploadAvatarModal">
            <Modal
                cancelText="取消"
                okText="确定"
                visible
                title="上传头像"
                onOk={submit}
                onCancel={props.hideModal}
                maskClosable={false}
                okButtonProps={{
                    loading: loading,
                }}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <div className="wrapper">
                            <div className="img-wrapper">
                                <img
                                    className="avatar"
                                    src={imageUrl}
                                    alt="avatar"
                                />
                            </div>
                            <div className="upload-btn" style={{
                                opacity: loading ? .8 : 0
                            }}>
                                <div>
                                    <Icon type={loading ? 'loading' : 'plus'} />
                                    <p>点击上传</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="upload-btn-default">
                            <Icon type={loading ? 'loading' : 'plus'} />
                            <p>点击上传</p>
                        </div>
                    )}
                </Upload>
            </Modal>
        </div>
    )
}

export default UploadAvatarModal
