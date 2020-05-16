import React, { useState } from 'react';
import { Menu } from 'antd';
import '@/pages/styles/MiddleWrapper.sass';
import { SelectParam } from 'antd/lib/menu';
import UserSolutionList from './UserSolutionList';
import FollowList from './FollowList';
import { UserProps } from '@/types/user';
import { SolutionProps } from '@/types/solution';

interface MiddleWrapperProps {
    isSelf: boolean;
    user: UserProps;
    solutionList: SolutionProps[];
}

const MiddleWrapper = (props: MiddleWrapperProps) => {
    const { isSelf, user, solutionList } = props;
    // const [selectedKeys, setSelectedKeys] = useState('solution');
    const [selectedKeys, setSelectedKeys] = useState('follow');

    // methods
    const handleSelect = (obj: SelectParam) => {
        setSelectedKeys(obj.key);
    };

    return (
        <div className="MiddleWrapper">
            <Menu
                selectedKeys={[selectedKeys]}
                mode="horizontal"
                className="m-menu"
                onSelect={handleSelect}
            >
                <Menu.Item key="solution">提交记录</Menu.Item>
                <Menu.Item key="follow">{isSelf ? '我' : 'TA'}的关注</Menu.Item>
                <Menu.Item key="follower">
                    {isSelf ? '我' : 'TA'}的粉丝
                </Menu.Item>
            </Menu>
            {/* router view */}
            {(selectedKeys === 'solution' && (
                <UserSolutionList dataList={solutionList} isSelf={isSelf}></UserSolutionList>
            )) ||
                (selectedKeys === 'follow' && (
                    <FollowList dataList={user.follows || []} opType="follow"></FollowList>
                )) ||
                (selectedKeys === 'follower' && (
                    <FollowList dataList={user.followers || []} opType="follower"></FollowList>
                ))}
        </div>
    );
};

export default MiddleWrapper;
