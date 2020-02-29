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