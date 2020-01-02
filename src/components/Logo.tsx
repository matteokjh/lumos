import React from 'react'
import { useHistory } from 'react-router-dom'
const Logo = (props: any) => {
    let history = useHistory()
    return (
        <div style={{
            transform: 'translateX(-100%) scale(1.5)',
            cursor: 'pointer'
        }} onClick={() => history.push('/')}>𝕷𝖚𝖒𝖔𝖘</div>
    )
}

export default Logo