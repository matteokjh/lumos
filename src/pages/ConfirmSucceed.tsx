import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const ConfirmSucceed = () => {
    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 1000);
    }, [history])

    return (
        <div>激活成功！</div>
    )
}

export default ConfirmSucceed