import React, { useRef, useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';

const CodeBlock = (props: { language: string, value: string }) => {
    const ref = useRef(null as any)

    useEffect(() => {
        hljs.highlightBlock(ref.current)
    }, [props.value])

    return (
        <pre>
            <code ref={ref} className={`language-${props.language || ""}`}>
                {props.value}
            </code>
        </pre>
    )
}

export default CodeBlock