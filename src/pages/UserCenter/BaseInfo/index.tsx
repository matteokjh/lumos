import React, { useContext, useEffect, useState } from 'react';
import { store } from '@/store';
import { getUserInfo } from '@/api/user';
import { message } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import { UserProps } from '@/types/user';
import Loading from '@/components/base/Loading';
import Header from './Header';
import UserInfo from './UserInfo';
import CalendarHeatmap from './CalendarHeatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '@/pages/styles/BaseInfo.sass';

const BaseInfo = () => {
    // 自己的个人信息
    const { userInfo } = useContext(store).state;
    // 个人信息（可能是别人的）
    const [user, setUser] = useState({} as UserProps);
    // 根据 url 请求个人信息
    const location = useLocation();
    // 跳转
    const history = useHistory();
    const [isSelf, setIsSelf] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    const [loading, setLoading] = useState(true);

    // methods

    // 关注的 refresh
    const refresh = async () => {
        let username = location.pathname.split('/')[2];
        try {
            setFollowLoading(true);
            let res = await getUserInfo(username);
            if (res.code === 200) {
                setUser(res.data.userInfo);
            } else {
                message.error(res.msg);
            }
        } catch (err) {
            message.error(err);
        } finally {
            setFollowLoading(false);
        }
    };

    // 获取个人信息数据
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                let username = location.pathname.split('/')[2];
                setIsSelf(username === userInfo.username); // 判断是否自己
                let res = await getUserInfo(username);
                if (res.code === 200) {
                    setUser(res.data.userInfo);
                } else {
                    message.error(res.msg);
                    history.push('/');
                }
            } catch (err) {
                message.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [location, history, userInfo.username]);

    return loading ? (
        <Loading />
    ) : (
        <div className="baseInfo">
            {/* top */}
            <Header user={user}></Header>
            {/* main */}
            <div className="main">
                {/* left */}
                <UserInfo
                    user={user}
                    userInfo={userInfo}
                    refresh={refresh}
                    isSelf={isSelf}
                    followLoading={followLoading}
                ></UserInfo>
                {/* middle */}
                <div className="middle">
                    {/* 提交日历图 */}
                    <CalendarHeatmap username={location.pathname.split('/')[2]}></CalendarHeatmap>
                </div>
                {/* right */}
                <div className="right"></div>
            </div>
        </div>
    );
};

export default BaseInfo;
