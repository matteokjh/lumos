import React, { useState } from 'react';
import { message } from 'antd'
import { starExercise } from '@/api/exercise'
import { StarFilled, StarOutlined } from '@ant-design/icons'
import "@/styles/ExeToolbar.sass"

const ExeToolbar = (props: { isStar: boolean, id: string }) => {
    const { id } = props
    const [isStar, setIsStar] = useState(props.isStar)

    // methods
    const handleClick = async ()  => {
        try {
            const res = await starExercise({ id })
            if(res.code === 200) {
                setIsStar(e => !e)
            } else {
                message.error(res.msg)
            }
        } catch(err) {
            message.error(err)
        }
    }

    return (
        <div className="ExeToolbar">
            <span className="star">
                {isStar ? (
                    <span onClick={handleClick}>
                        <StarFilled style={{
                            color: '#ff9800'
                        }}></StarFilled>
                    </span>
                ) : (
                    <span onClick={handleClick}><StarOutlined></StarOutlined></span>
                )}
            </span>
        </div>
    );
};

export default ExeToolbar;
