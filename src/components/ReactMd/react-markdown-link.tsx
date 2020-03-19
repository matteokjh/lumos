import React from 'react'


const ReactMarkdownLink = (props: { href: string, children: any }) => {
    return (
        <a href={props.href.indexOf('http') > -1 ? props.href : `http://${props.href}`} target='_blank' rel="noopener noreferrer">{props.children}</a>
    )
}

export default ReactMarkdownLink