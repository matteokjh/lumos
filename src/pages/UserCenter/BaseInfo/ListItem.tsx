import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProps } from '@/types/user';
import { Button, message } from 'antd';
import { userFollow } from '@/api/user';
import { SwapOutlined } from '@ant-design/icons';
import '@/pages/styles/ListItem.sass';

interface ListProps {
    userInfo: UserProps;
    userData: UserProps;
    opType: 'follow' | 'follower';
}

const ListItem = (props: ListProps) => {
    const { userInfo, userData, opType } = props;
    const [isFollow, setIsFollow] = useState(false); // 是否关注了该用户
    const [isFollowed, setIsFollowed] = useState(false); // 是否被该用户关注

    // methods
    const getBtnText = () => {
        if (isFollow && isFollowed)
            return (
                <span>
                    <SwapOutlined style={{
                        marginRight: 5
                    }}/>
                    互相关注
                </span>
            );
        else if (isFollow) return '已关注';
        else return '关注TA';
    };
    // 关注/取消关注
    const handleClick = async () => {
        try {
            let res = await userFollow(userData._id);
            if (res.code === 200) {
                setIsFollow(e => !e);
            } else {
                message.error(res.msg);
            }
        } catch (err) {
            message.error(err);
        }
    };

    useEffect(() => {
        // 我的关注
        if (opType === 'follow') {
            setIsFollow(true);
            setIsFollowed(
                userInfo?.followers?.some((e: any) => e === userData._id) ||
                    false
            );
        } else {
            // 我的粉丝
            console.log(userInfo);
            setIsFollow(
                userInfo?.follows?.some((e: any) => e === userData._id) || false
            );
            setIsFollowed(true);
        }
    }, [opType, userInfo, userData]);

    return (
        <div className="f-listItem">
            <Link
                className="avatar"
                style={{
                    backgroundImage: `url(${userData.avatar})`,
                }}
                to={`/user/${userData.username}/baseinfo`}
                target="_blank"
            ></Link>
            <div className="f-right">
                <p className="name">
                    <span>{userData.name}</span>
                    <span>{userData.username}</span>
                </p>
                <p className="intro">{userData.introduction}</p>
            </div>
            <Button
                type={isFollow ? 'primary' : 'default'}
                onClick={handleClick}
            >
                {getBtnText()}
            </Button>
        </div>
    );
};

export default ListItem;
