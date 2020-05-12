import React from 'react';
import { UserProps } from '@/types/user';
import Rank from '@/components/base/Rank'

const ListItem = (props: { data: UserProps }) => {
    const { data } = props;

    return <div className="ListItem">
        <div className="avatar" style={{
            backgroundImage: `url(${data.avatar})`
        }}></div>
        <div className="text">
            <h4>{data.name} <Rank rank={1}></Rank></h4>
            <p>{data.work}</p>
        </div>
    </div>;
};

export default ListItem;
