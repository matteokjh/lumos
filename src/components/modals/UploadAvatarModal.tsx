import React, { useState } from 'react'
import { Icon, Button, message, Upload, Modal } from 'antd'
import './styles/uploadAvatarModal.sass'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { uploadAvatar } from '../../api/user'

const UploadAvatarModal = (props: any) => {
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    // methods
    const submit = async () => {
        if(!imageUrl) {
            message.warning('请上传图片！')
            return
        }
        try {
            let res = await uploadAvatar({
                base64: imageUrl
            })
            if(res.code === 200) {

            } else {
                message.error(res.msg)
            }
        } catch(err) {
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
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('图片不能大于 2MB!')
        }
        return isJpgOrPng && isLt2M
    }
    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: string | ArrayBuffer | null) => {
                setImageUrl(imageUrl as string)
                setLoading(false)
            })
        }
    }

    // 上传按钮
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">点击上传</div>
        </div>
    )

    return (
        <div className="UploadAvatarModal">
            <Modal
                okText="确定"
                cancelText="取消"
                visible
                title="上传头像"
                onOk={submit}
                onCancel={props.hideModal}
                maskClosable={false}
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
                    {imageUrl ? <img src={imageUrl} /> : uploadButton}
                </Upload>
            </Modal>
        </div>
    )
}

export default UploadAvatarModal
