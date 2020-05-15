import React from 'react';
import { Button, Tooltip, message } from 'antd';
import MyIcon from '@/components/base/MyIcon';
import { EditOutlined, ToolOutlined, SwapOutlined } from '@ant-design/icons';
import { formatNumber } from '@/utils/methods';
import { NavLink } from 'react-router-dom';
import { userFollow } from '@/api/user';
import { UserProps } from '@/types/user'

interface UserInfoProps {
    user: UserProps;
    refresh: () => void;
    isSelf: boolean;
    userInfo: UserProps;
    followLoading: boolean;
}

const UserInfo = (props: UserInfoProps) => {
    const { user, refresh, isSelf, userInfo, followLoading } = props;

    // methods
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
    return (
        <div className="left">
            <div className="statistics">
                <div>
                    <span>关注数：{formatNumber(user?.follows?.length)}</span>
                </div>
                <div>
                    <span>粉丝数：{formatNumber(user?.followers?.length)}</span>
                </div>
                <div>
                    <span>文章获赞：{formatNumber(user?.likesTotal)}</span>
                </div>
                <div>
                    <span>文章收藏数：{formatNumber(user?.starsTotal)}</span>
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
                        <Button onClick={handleFollow} type="primary">{`关注${
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
                    {(user.location && <p>{user.location}</p>) || <p>未设置</p>}
                </div>
                {/* 性别 */}
                <div className="sex">
                    <MyIcon type="iconico-sex"></MyIcon>
                    {(user.sex === 'male' && <p>男</p>) ||
                        (user.sex === 'female' && <p>女</p>) || <p>保密</p>}
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
    );
};

export default UserInfo;
