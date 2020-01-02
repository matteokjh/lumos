import React from 'react'
import { DEFAULTAVATAR } from '../utils/default'

const Avatar = (props: { imageUrl: string }) => {
    return (
        <span
            className="avatar"
            style={{
                backgroundImage: props.imageUrl && `url(${props.imageUrl})`
            }}
        ></span>
    )
}

export default Avatar