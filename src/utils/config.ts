import { LangArr } from '@/types/exercise'

export const COLOR = {
    EASY_MODE: "#4caf50",
    MEDIUM_MODE: "#ff9800",
    HARD_MODE: "#f44336",
    DEFAULT: "#333",
    CPP: "rgb(0, 87, 152)",
    C: "rgb(0, 66, 126)",
    JAVA: "rgb(213, 81, 60)",
    JAVASCRIPT: "rgb(238, 216, 24)",
};

// 语言集合
export const LANGS = (lang?: typeof LangArr[number]) => {
    switch (lang) {
        case "javascript":
            return {
                val: 4,
                label: "JavaScript"
            };
        case "cpp":
            return {
                val: 2,
                label: "C++"
            };
        case "c":
            return {
                val: 1,
                label: "C"
            };
        case "java":
            return {
                val: 3,
                label: "Java"
            };
        default:
            return {
                val: 0,
                label: "unknown"
            };
    }
};

// Judge 结果
// key: judge code , value: 0 - ENG; 1 - CN; 2 - color; 3 - bg color
export const JUDGEMAP: any = {
    0:['OJ_WAIT', '等待中', '#ff9800', '#fff4ed'],
    1:['OJ_RUN', '正在运行', '#2196f3', '#e8f8ff'],
    2:['OJ_AC', '通过', '#4caf50', '#e8ffe8'],
    3:['OJ_PE', '格式错误', '#f44336', '#feefef'], // 以下颜色都一样
    4:['OJ_TLE', '超出时间限制', '#f44336', '#feefef'],
    5:['OJ_MLE', '超出内存限制', '#f44336', '#feefef'],
    6:['OJ_WA', '解答错误', '#f44336', '#feefef'],
    7:['OJ_OLE', '超过输出限制', '#f44336', '#feefef'],
    8:['OJ_CE', '编译错误', '#f44336', '#feefef'],
    9:['OJ_RE_SEGV', '运行时错误', '#f44336', '#feefef'],
    10:['OJ_RE_FPU', '运行时错误', '#f44336', '#feefef'],
    11:['OJ_RE_ABRT', '程序中止', '#f44336', '#feefef'],
    12:['OJ_OJ_RE_UNKNOWWAIT', '未知错误', '#f44336', '#feefef'],
    13:['OJ_RF', '函数调用受限', '#f44336', '#feefef'],
    14:['OJ_SE', '系统错误', '#f44336', '#feefef'],
    15:['OJ_RE_JAVA', '运行时错误', '#f44336', '#feefef']
}
