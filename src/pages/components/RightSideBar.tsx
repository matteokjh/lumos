import React, { useContext, useEffect, useState } from 'react';
import '@/pages/styles/RightSideBar.sass';
import { Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { store } from '@/store';
import RankList from '@/components/RankList';
import { UserProps } from '@/types/user';
import { getAuthorList } from '@/api/user';

const RightSideBar = (props: any) => {
    const history = useHistory();
    const { userInfo } = useContext(store).state;
    const [authorRankList, setList] = useState([] as UserProps[]);
    const { scrollState } = props;

    // methods
    const jumpToWrite = () => {
        history.push('/write');
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await getAuthorList();
                if (res.code === 200) {
                    setList(res.data);
                } else {
                    message.error(res.msg);
                }
            } catch (err) {
                message.error(err);
            }
        })();
    }, []);

    const ScrollingRight = () => (
        <div className="topRight">
            {/* 广告 */}
            <a
                href="https://juejin.im/post/5ea6de456fb9a0435c6f45fe"
                target="_blank"
                title="https://juejin.im/post/5ea6de456fb9a0435c6f45fe"
                rel="noopener noreferrer"
            >
                <div
                    className="ad"
                    style={{
                        backgroundImage: `url(${require('@/img/bytedancehire.jpg')})`,
                    }}
                ></div>
            </a>
            {/* 作者榜 */}
            <RankList title="作者榜" list={authorRankList}></RankList>
        </div>
    );

    return (
        <div className="RightSideBar">
            {/* 写文章按钮 */}
            {userInfo.isLogin && (
                <Button
                    className="jumpWriteBtn"
                    type="primary"
                    onClick={jumpToWrite}
                >
                    写文章
                </Button>
            )}
            {/* 滚动显示侧边栏 */}
            <ScrollingRight></ScrollingRight>
            <div
                className="scrollingRight topRight"
                style={{
                    opacity: scrollState ? 1 : 0,
                    pointerEvents: scrollState ? 'all' : 'none',
                }}
            >
                {/* 广告 */}
                <a
                    href="https://juejin.im/post/5ea6de456fb9a0435c6f45fe"
                    target="_blank"
                    title="https://juejin.im/post/5ea6de456fb9a0435c6f45fe"
                    rel="noopener noreferrer"
                >
                    <div
                        className="ad"
                        style={{
                            backgroundImage: `url(${require('@/img/bytedancehire.jpg')})`,
                        }}
                    ></div>
                </a>
                {/* 作者榜 */}
                <RankList title="作者榜" list={authorRankList}></RankList>
            </div>
        </div>
    );
};

export default RightSideBar;
