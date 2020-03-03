import React, { useState, useContext } from 'react'
import { Button } from 'antd'
import { store } from '@/store'
import '@/styles/CommentBox.sass'

const CommentBox = (props: { submit: (text: string) => void }) => {
    const [text, setText] = useState('')
    const { submit } = props
    const { userInfo } = useContext(store).state

    const MAX_LEN = 100

    // methods
    const handleInput = (e: any) => {
        setText(e.target.innerText)
    }
    const handleKeyDown = (e: any) => {
        if (e.keyCode !== 8 && text.length >= MAX_LEN) {
            e.preventDefault()
        }
    }
    const handleSubmit = () => {
        submit(text.substr(0, MAX_LEN))
    }

    return (
        <div className="CommentBox">
            <p className="title">文章评论</p>
            <div className="commentBar">
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${userInfo.avatar})`,
                    }}
                ></div>
                <div className="inputWrapper">
                    <div
                        onKeyDown={handleKeyDown}
                        contentEditable
                        spellCheck="false"
                        className="inputBar"
                        data-placeholder={`请在此输入评论内容 不超过 ${MAX_LEN} 字`}
                        onInput={handleInput}
                    ></div>
                    <div className="btn">
                        <Button
                            onClick={handleSubmit}
                            type="primary"
                            disabled={!text.length || text.length >= MAX_LEN}
                        >
                            评论
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentBox
