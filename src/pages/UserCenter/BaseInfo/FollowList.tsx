import React, { useContext } from 'react';
import { UserProps } from '@/types/user';
import '@/pages/styles/FollowList.sass';
import { Empty } from 'antd';
import ListItem from './ListItem'
import { store } from '@/store'

interface FollowProps {
    dataList: UserProps[];
    opType: 'follow' | 'follower'
}
const FollowList = (props: FollowProps) => {
    const { dataList, opType } = props;
    const { userInfo } = useContext(store).state

    return (
        <div className="FollowList">
            {dataList?.map(e => (
                <ListItem userData={e} key={e._id} opType={opType} userInfo={userInfo}></ListItem>
            ))}
            {!dataList?.length && (
                <Empty
                    style={{
                        backgroundColor: '#fff',
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="这里空空如也~"
                ></Empty>
            )}
        </div>
    );
};

export default FollowList;
