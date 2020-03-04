import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { UserProps } from '@/types/user'
import { CommentProps } from '@/types/comment'
import '@/styles/CommentBar.sass'

interface BarProps {
    MAX_LEN: number
    userInfo: UserProps
    visible: boolean
    submit: (obj: Partial<CommentProps>) => void
    placeholder: string
    onBlur?: () => void
    autoFocus?: boolean
    id: string
    clearInput: () => void
}

const CommentBar = (props: BarProps) => {
    const {
        MAX_LEN,
        userInfo,
        submit,
        visible,
        placeholder,
        onBlur,
        id,
        clearInput,
    } = props
    const [text, setText] = useState('')

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
        submit({
            content: text.substr(0, MAX_LEN),
        })
        clearInput()
    }
    const handleBlur = () => {
        if (!text && onBlur) {
            onBlur()
        }
    }

    useEffect(() => {
        // rootC 是根评论框，默认不 focus
        if (id && id !== 'rootC' && visible) {
            let ele = window.document.getElementById(id)
            ele?.focus()
        }
        // 隐藏的时候置空
        return () => {
            setText('')
        }
    }, [id, visible])

    return visible ? (
        <div className="commentBar">
            <div
                className="avatar"
                style={{
                    backgroundImage: `url(${userInfo.avatar})`,
                }}
            ></div>
            <div className="inputWrapper">
                <div
                    id={id}
                    onKeyDown={handleKeyDown}
                    contentEditable
                    spellCheck="false"
                    className="inputBar"
                    data-placeholder={placeholder}
                    onInput={handleInput}
                    onBlur={handleBlur}
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
    ) : (
        <></>
    )
}
export default CommentBar
