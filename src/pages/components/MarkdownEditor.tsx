import React, { useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from './react-markdown-code-block'
import ReactMarkdownLink from './react-markdown-link'
import ReactMarkdownIMG from './react-markdown-img'
import { debounce } from '@/utils/methods'
import ReactResizeDetector from 'react-resize-detector'
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor'
import '@/pages/styles/markdown.sass'
import '@/pages/styles/MarkdownEditor.sass'

const MarkdownEditor = (props: any) => {
    const inputRef = useRef(null as any)
    const previewRef = useRef(null as any)
    const mdWrapperRef = useRef(null as any)
    const [isCtrl, setIsCtrl] = useState(false)
    const { setMdContent, mdContent, saveMd } = props

    // methods

    // 文本变化
    const handleTextChange = (value: string) => {
        try {
            setMdContent(value)
        } catch (err) {
            console.log(err)
        }
    }
    // 阻止 ctrl s 默认事件
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // ctrl or command
        if (
            (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) &&
            e.keyCode === 83
        ) {
            e.preventDefault()
            setIsCtrl(true)
        }
    }
    // 改为保存
    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // ctrl or command
        if (e.keyCode === 17) {
            setTimeout(() => {
                setIsCtrl(false)
            }, 200)
        }
        if (isCtrl) {
            switch (e.keyCode) {
                case 83:
                    // s
                    saveMd()
                    break
            }
        }
    }
    // 滚动矫正（右 => 左）
    const handleScroll = (type: 'input' | 'preview') => {
        if (!inputRef.current) return
        let editor = inputRef.current.editor
        let leftHeight = editor.getScrollHeight()
        let rightHeight =
            previewRef.current.scrollHeight + previewRef.current.clientHeight
        let ratio = rightHeight / leftHeight
        if (type === 'input') {
            previewRef.current.scrollTop = editor.getScrollTop() * ratio
        } else {
            editor.setScrollTop(previewRef.current.scrollTop / ratio)
        }
    }
    // monaco editor 鼠标滚轮滚动矫正
    const editorDidMount: EditorDidMount = (editor, monaco) => {
        // @ts-ignore
        editor.onMouseWheel(debounce(handleScroll, 'input'))
    }

    return (
        <div className="MarkdownEditor" ref={mdWrapperRef}>
            {/* editor */}
            <div
                className="md-editor"
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onWheel={debounce(handleScroll, 'input')}
                onMouseUp={debounce(handleScroll, 'input')}
            >
                <ReactResizeDetector
                    handleWidth
                    handleHeight
                    refreshMode="throttle"
                    refreshRate={100}
                >
                    <MonacoEditor
                        ref={inputRef}
                        value={mdContent}
                        theme="vs-dark"
                        onChange={handleTextChange}
                        editorDidMount={editorDidMount}
                        language="markdown"
                        options={{
                            scrollBeyondLastLine: false,
                            wordWrap: 'bounded',
                            minimap: {
                                enabled: false,
                            },
                        }}
                    ></MonacoEditor>
                </ReactResizeDetector>
            </div>
            {/* preview */}
            <div
                className="preview"
                onWheel={debounce(handleScroll, 'preview')}
                onMouseUp={debounce(handleScroll, 'preview')}
                ref={previewRef}
            >
                <ReactMarkdown
                    source={mdContent}
                    escapeHtml={false}
                    renderers={{ code: CodeBlock, link: ReactMarkdownLink, image: ReactMarkdownIMG }}
                ></ReactMarkdown>
            </div>
        </div>
    )
}

export default MarkdownEditor
