// 防抖
export const debounce = (Fn: any, ...args: any) => {
    let timerId: any = null
    return () => {
        if(timerId) {
            clearTimeout(timerId)
            timerId = null
        }
        timerId = setTimeout(() => {
            Fn(...args)
        }, 300);
    }
}
// 处理日期
export const formatDate = (time: number) => {
    if(!time) return ''
    return new Date(time).toLocaleDateString()
}
// 处理数字
export const formatNumber = (num: number) => {
    if(num > 99999999) {
        return `100 M+`
    } else if(num > 999999) {
        return `${~~(num / 1000000)}M+`
    } else if(num > 999) {
        return `${~~(num / 1000)}K+`
    } else return num || 0
}