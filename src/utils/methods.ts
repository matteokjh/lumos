import { CommentProps, ConvertedCommentProps } from '@/types/comment';
import { LangArr, ModeProps } from '@/types/exercise';
import { JudgeCode } from '@/types/solution';
import { COLOR, JUDGEMAP } from './config';

// 防抖
export const debounce = (Fn: any, ...args: any) => {
    let timerId: any = null;
    return () => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        timerId = setTimeout(() => {
            Fn(...args);
        }, 300);
    };
};
// 处理日期
export const formatDate = (time: number) => {
    if (!time) return '';
    return new Date(time).toLocaleDateString();
};
// 处理时间
export const formatTime = (time: number) => {
    let now = new Date().getTime();
    let ds = ~~((now - time) / 1000);
    const aMinute = 3600;
    const aHour = 3600;
    const aDay = 86400;
    if (ds < aMinute) {
        return '刚刚';
    } else if (ds < aHour) {
        return `${~~(ds / aMinute)} 分钟前`;
    } else if (ds < aDay) {
        return `${~~(ds / aHour)} 小时前`;
    } else if (ds < aDay * 7) {
        return `${~~(ds / aDay)} 天前`;
    } else return new Date(time).toLocaleDateString();
};
// 处理数字
export const formatNumber = (num?: number) => {
    if (num !== undefined) {
        if (num > 99999999) {
            return `100 M+`;
        } else if (num > 999999) {
            return `${~~(num / 1000000)}M+`;
        } else if (num > 999) {
            return `${~~(num / 1000)}K+`;
        } else return num;
    } else return 0;
};
// 转化评论列表
export const convertComment = (commentList: CommentProps[]) => {
    let list = [] as ConvertedCommentProps[];
    let map = new Map();
    let arr: ConvertedCommentProps[] = commentList;
    // 先把根评论的 id 加入映射
    for (let comment of arr) {
        // 没有父评论的，是根评论
        if (!comment.fatherComment) {
            comment.children = [];
            map.set(comment._id, comment);
        } else {
            // 子评论入栈
            list.push(comment);
        }
    }
    // // 遍历子评论，放在对应父评论的子集
    for (let childComment of list) {
        if (!childComment.fatherComment) continue;
        let fatherId = childComment.fatherComment;
        let father = map.get(fatherId);
        if (father && father.children) {
            father.children.push(childComment);
            map.set(fatherId, father);
        }
    }
    return [...map.values()];
};
// 难度
export const formatMode = (mode: ModeProps) => {
    switch (mode) {
        case 'Easy':
            return ['简单', COLOR.EASY_MODE];
        case 'Medium':
            return ['中等', COLOR.MEDIUM_MODE];
        case 'Hard':
            return ['困难', COLOR.HARD_MODE];
        default:
            return ['未知', COLOR.DEFAULT];
    }
};
// 内存 KB => MB
export const formatMemory = (m: number) => {
    return Math.round((m / 1024) * 10) / 10 + 'MB';
};
// 代码执行结果
export const formatJudgeResult = (judge: JudgeCode) => {
    if (judge !== undefined) {
        return JUDGEMAP[judge];
    } else return [];
};
// 语言
export const formatLang = (lang?: typeof LangArr[number]) => {
    switch (lang) {
        case 'c':
            return ['C', COLOR.C];
        case 'cpp':
            return ['C++', COLOR.CPP];
        case 'java':
            return ['Java', COLOR.JAVA];
        case 'javascript':
            return ['JavaScript', COLOR.JAVASCRIPT];
        default:
            return ['未知', COLOR.DEFAULT];
    }
};
