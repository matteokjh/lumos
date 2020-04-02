import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return (
        <div
            className="Loading"
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
            }}
        >
            <LoadingOutlined
                style={{
                    fontSize: 40,
                }}
            />
        </div>
    );
};

export default Loading;
