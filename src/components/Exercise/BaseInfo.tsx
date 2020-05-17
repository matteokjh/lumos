import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import CodeBlock from '@/components/ReactMd/react-markdown-code-block';
import ReactMarkdownLink from '@/components/ReactMd/react-markdown-link';
import ExeToolbar from './ExeToolbar'
import { store } from '@/store';
import '@/pages/styles/markdown.sass';

const BaseInfo = () => {
    const { exerciseInfo } = useContext(store).state;

    return (
        <div className="info_wrapper">
            <ExeToolbar isStar={exerciseInfo.isStar || false} id={exerciseInfo.id}></ExeToolbar>
            <ReactMarkdown
                source={exerciseInfo.introduction}
                escapeHtml={false}
                renderers={{
                    code: CodeBlock,
                    link: ReactMarkdownLink,
                }}
                className="md-wrapper"
            ></ReactMarkdown>
        </div>
    );
};

export default BaseInfo;
