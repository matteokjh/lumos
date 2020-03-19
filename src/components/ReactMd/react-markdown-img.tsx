import React from 'react'

const ReactMarkdownLink = (props: { src: string; children: any }) => {
    return (
        <span className="image">
            <img src={props.src} alt="" />
        </span>
    )
}

export default ReactMarkdownLink
