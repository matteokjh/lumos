import React, { useContext, useEffect, useState } from 'react';
import { store } from '@/store';
import { getUserInfo, userFollow } from '@/api/user';
import { message, Button, Tooltip } from 'antd';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import { UserProps } from '@/types/user';
import MyIcon from '@/components/base/MyIcon';
import { EditOutlined, ToolOutlined, SwapOutlined } from '@ant-design/icons';
import { formatNumber } from '@/utils/methods';
import Loading from '@/components/base/Loading'
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

    const [loading, setLoading] = useState(true);
    const [followLoading, setFollowLoading] = useState(false);

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
    const handleFollow = async () => {
        try {
            let res = await userFollow(user._id);
            if (res.code === 200) {
                await refresh();
            } else {
                message.error(res.msg);
            }
        } catch (err) {
            message.error(err);
        }
    };
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
                            {user?.rankId?.rank}
                        </span>
                    </p>
                </div>
            </div>
            {/* main */}
            <div className="main">
                {/* left */}
                <div className="info-detail">
                    <div className="statistics">
                        <div>
                            <span>
                                关注数：{formatNumber(user?.follows?.length)}
                            </span>
                        </div>
                        <div>
                            <span>
                                粉丝数：{formatNumber(user?.followers?.length)}
                            </span>
                        </div>
                        <div>
                            <span>
                                文章获赞：{formatNumber(user?.likesTotal)}
                            </span>
                        </div>
                        <div>
                            <span>
                                文章被收藏：{formatNumber(user?.starsTotal)}
                            </span>
                        </div>
                    </div>
                    {/* 如果是自己：编辑按钮 */}
                    {isSelf ? (
                        <div className="edit">
                            <Button type="primary">
                                <NavLink
                                    to={`/user/${userInfo.username}/setting/info`}
                                    style={{
                                        color: '#fff',
                                    }}
                                >
                                    <EditOutlined
                                        style={{
                                            marginRight: '5px',
                                        }}
                                    />
                                    <span>编辑个人资料</span>
                                </NavLink>
                            </Button>
                        </div>
                    ) : (
                        // 如果是别人：关注按钮
                        <div className="focus">
                            {user.youFollowHim ? (
                                <Button onClick={handleFollow} loading={followLoading}>
                                    {user.heFollowYou ? (
                                        <span>
                                            <SwapOutlined />
                                            互相关注
                                        </span>
                                    ) : (
                                        '已关注'
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleFollow}
                                    type="primary"
                                >{`关注${
                                    user.sex === 'female' ? '她' : '他'
                                }`}</Button>
                            )}
                        </div>
                    )}
                    {/* 个人简介 */}
                    <div className="intro">
                        <b>个人简介</b>
                        <p>{user.introduction || '暂无介绍'}</p>
                    </div>
                    <div className="info">
                        <b>个人资料</b>
                        {/* 公司 */}
                        <div className="company">
                            <div className="work">
                                <ToolOutlined />
                                <span>{user.work}</span>
                            </div>
                            {user.companys?.length ? (
                                user.companys.map((e, idx) => (
                                    <div key={`company_${idx}`}>
                                        {idx === 0 ? (
                                            <MyIcon type="iconcompany-fill" />
                                        ) : (
                                            <MyIcon type="iconcompany-fill" />
                                        )}
                                        <div className="row-wrapper">
                                            <Tooltip
                                                placement="right"
                                                title={`${e.name} | ${e.title}`}
                                            >
                                                <p>{e.name}</p>
                                                <span>|</span>
                                                <p>{e.title}</p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no">
                                    <MyIcon type="iconcompany-fill" />
                                    <p>暂无介绍</p>
                                </div>
                            )}
                        </div>
                        {/* 学校 */}
                        <div className="school">
                            {user.schools?.length ? (
                                user.schools.map((e, idx) => (
                                    <div key={`schools_${idx}`}>
                                        {idx === 0 ? (
                                            <MyIcon type="icongraduationcap" />
                                        ) : (
                                            <MyIcon type="icongraduationcap" />
                                        )}
                                        <div className="row-wrapper">
                                            <Tooltip
                                                placement="right"
                                                title={`${e.name} | ${e.time}`}
                                            >
                                                <p>{e.name}</p>
                                                <span>|</span>
                                                <p>{e.time}</p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no">
                                    <MyIcon type="icongraduationcap" />
                                    <p>暂无介绍</p>
                                </div>
                            )}
                        </div>
                        {/* 位置 */}
                        <div className="location">
                            <MyIcon type="iconlocation"></MyIcon>
                            {(user.location && <p>{user.location}</p>) || (
                                <p>未设置</p>
                            )}
                        </div>
                        {/* 性别 */}
                        <div className="sex">
                            <MyIcon type="iconico-sex"></MyIcon>
                            {(user.sex === 'male' && <p>男</p>) ||
                                (user.sex === 'female' && <p>女</p>) || (
                                    <p>保密</p>
                                )}
                        </div>
                        {/* 博客 */}
                        <div className="website">
                            <MyIcon type="iconwww"></MyIcon>
                            {(user.website && (
                                <a
                                    href={
                                        user.website.match(/(http|https):\/\//)
                                            ? user.website
                                            : `http://${user.website}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        marginLeft: '10px',
                                    }}
                                >
                                    {user.website}
                                </a>
                            )) || <p className="no">未设置</p>}
                        </div>
                    </div>
                </div>
                {/* middle */}
                <div className="self-record"></div>
                {/* right */}
                <div className="chart"></div>
            </div>
        </div>
    );
};

export default BaseInfo;
