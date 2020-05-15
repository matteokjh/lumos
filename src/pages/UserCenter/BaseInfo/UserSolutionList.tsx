import React from 'react';
import { SolutionProps } from '@/types/solution';
import { formatLang, formatJudgeResult, formatTime } from '@/utils/methods';
import { Link } from 'react-router-dom';
import '@/pages/styles/UserSolutionList.sass';

interface UserSolutionListProps {
    dataList: SolutionProps[];
    isSelf: boolean;
}

const UserSolutionList = (props: UserSolutionListProps) => {
    const { dataList, isSelf } = props;

    return (
        <div className="UserSolutionList">
            {dataList?.map(e => (
                <div className="item" key={e.sid}>
                    <div>
                        <span>{`${isSelf ? '我' : 'TA'}在题目`}</span>
                        <a
                            rel="noopener noreferrer"
                            href={`/exercise/detail/${e.exerciseInfo.id}`}
                            target="_blank"
                        >{`${e.exerciseInfo.id}. ${e.exerciseInfo.title}`}</a>
                        <span>
                            {`中使用`}
                            <Link to={`/solution/${e.sid}`}>
                                {formatLang(e.lang)[0]}
                            </Link>
                            {`进行了提交`}
                        </span>
                        <span
                            className="judgeRes"
                            style={{
                                backgroundColor: formatJudgeResult(e.judge)[3],
                                color: formatJudgeResult(e.judge)[2],
                            }}
                        >
                            {formatJudgeResult(e.judge)[1]}
                        </span>
                    </div>
                    <span className="time">{formatTime(e.createTime)}</span>
                </div>
            ))}
        </div>
    );
};

export default UserSolutionList;
