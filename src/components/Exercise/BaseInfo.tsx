import React, { useContext } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from '@/components/ReactMd/react-markdown-code-block'
import ReactMarkdownLink from '@/components/ReactMd/react-markdown-link'
import { store } from '@/store'

const BaseInfo = () => {
    const { exerciseInfo } = useContext(store).state

    return (
        <ReactMarkdown
            source={exerciseInfo.introduction}
            escapeHtml={false}
            renderers={{
                code: CodeBlock,
                link: ReactMarkdownLink,
            }}
            className="md-wrapper"
        ></ReactMarkdown>
    )
}

export default BaseInfo
