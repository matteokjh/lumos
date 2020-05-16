import React from 'react';
import { Tooltip } from 'antd'
import { UserProps } from '@/types/user'

const Header = (props: { user: UserProps }) => {
    const { user } = props

    return (
        <div className="header">
            <div
                className="avatar"
                style={{
                    backgroundImage: `url(${user.avatar ||
                        require('@/img/defaultAvatar.png')})`,
                }}
            ></div>
            <div className="info">
                <Tooltip title={user.name}>
                    <h3>{user.name}</h3>
                </Tooltip>
                <p>{user.username}</p>
                <p>
                    全站排名：
                    <span
                        style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: '#333',
                        }}
                    >
                        {user?.rankId?.rank || 9999}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Header