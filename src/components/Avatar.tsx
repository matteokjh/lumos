import React from 'react'

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