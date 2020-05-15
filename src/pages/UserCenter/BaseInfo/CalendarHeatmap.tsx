import React, { useState, useEffect } from 'react';
import ReactHeatMap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import { Skeleton, message, Select } from 'antd';
import { getCalendar } from '@/api/user';
import '@/pages/styles/CalendarHeatmap.sass';

interface CalendarProps {
    username: string;
    isSelf: boolean
}
interface originalHeatmapProps {
    _id: string;
    count: number;
}
interface heatmapProps {
    date: string;
    count: number;
}
interface periodProps {
    label: string;
    startAt: number;
    endAt: number;
}
let now = new Date();
let year = now.getFullYear();
let yearPast = new Date().setFullYear(year - 1);

// 区间
const periodArr = [
    {
        label: '过去一年',
        startAt: yearPast,
        endAt: now.getTime(),
    },
    {
        label: '2020 年',
        startAt: 1577808000000,
        endAt: 1609387199999,
    },
];

const CalendarHeatmap = (props: CalendarProps) => {
    const { username, isSelf } = props;
    // 日历热力图数据
    const [heatmapData, setHeatmapData] = useState(
        [] as originalHeatmapProps[]
    );
    const [selectedPeriod, setSelectedPeriod] = useState(
        periodArr[0] as periodProps
    );
    const [calendarLoading, setCalendarLoading] = useState(false);

    // methods
    // 填充提交日历
    const formatHeatmap = (data: originalHeatmapProps[]) => {
        const dateMap = {} as any;
        const res: heatmapProps[] = [];
        data.forEach(e => (dateMap[e._id] = e.count)); // 构造 dateMap，表示有提交的日期
        let k = selectedPeriod.startAt;
        while (k <= selectedPeriod.endAt) {
            const dateStr = formatDateStr(new Date(k).toLocaleDateString());
            res.push({ date: dateStr, count: dateMap[dateStr] || 0 });
            k += 86400000;
        }
        return res;
    };
    // / => -
    const formatDateStr = (str: string) => {
        return str
            .split('/')
            .map((e, idx) => {
                if (idx) return e.padStart(2, '0');
                else return e;
            })
            .join('-');
    };
    // sum heatMap
    const getHeatMapTotal = (arr: originalHeatmapProps[]) => {
        return arr.reduce((acc, cur) => acc + cur.count, 0);
    };
    const handleChange = (idx: number) => {
        setSelectedPeriod(periodArr[idx]);
    };

    // 获取 calender heatmap 数据
    useEffect(() => {
        (async () => {
            try {
                setCalendarLoading(true);
                let res = await getCalendar({
                    username,
                    startAt: selectedPeriod.startAt,
                    endAt: selectedPeriod.endAt,
                });
                if (res.code === 200) {
                    setHeatmapData(res.data);
                } else {
                    message.error(res.msg);
                }
            } catch (err) {
                message.error(err);
            } finally {
                setCalendarLoading(false);
            }
        })();
    }, [selectedPeriod, username]);

    return (
        <div className="CalendarHeatmap">
            <div className="mid-title">
                <p>
                    {selectedPeriod.label}内共提交{' '}
                    <span>{getHeatMapTotal(heatmapData)}</span> 次
                </p>
                {isSelf && (
                    <Select
                        size="small"
                        className="selector"
                        defaultValue={0}
                        onChange={handleChange}
                    >
                        {periodArr.map((e, idx) => (
                            <Select.Option
                                className="selector-option"
                                key={idx}
                                value={idx}
                            >
                                {e.label}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </div>
            {calendarLoading ? (
                <Skeleton></Skeleton>
            ) : (
                <>
                    <ReactHeatMap
                        startDate={new Date(selectedPeriod.startAt - 86400000)}
                        endDate={new Date(selectedPeriod.endAt)}
                        values={formatHeatmap(
                            heatmapData as originalHeatmapProps[]
                        )}
                        gutterSize={2}
                        classForValue={value => {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-github-${value.count}`;
                        }}
                        tooltipDataAttrs={(value: heatmapProps) => {
                            return {
                                'data-tip': `${value.date}, ${value.count} 次提交`,
                            };
                        }}
                    ></ReactHeatMap>
                    <ReactTooltip></ReactTooltip>
                </>
            )}
        </div>
    );
};
export default CalendarHeatmap;
