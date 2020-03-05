import { LangArr } from '@/types/exercise'

export const COLOR = {
    EASY_MODE: "#4caf50",
    MEDIUM_MODE: "#ff9800",
    HARD_MODE: "#f44336",
    DEFAULT: "#333"
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