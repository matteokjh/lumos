import React from 'react';
import { UserProps } from '@/types/user';
import ListItem from './ListItem';
import '@/styles/RankList.sass';

interface RankListProps {
    title?: string;
    list?: ItemProps[];
}
interface ItemProps extends UserProps {}

const RankList = (props: RankListProps) => {
    const { title, list } = props;

    return (
        <div className="RankList">
            <div className="title">
                <span role="img" aria-label="crown">
                    👑
                </span>{' '}
                {title || '排行榜'}
            </div>
            {list?.map(e => (
                <ListItem key={e.username} data={e}></ListItem>
            ))}
        </div>
    );
};

export default RankList;
