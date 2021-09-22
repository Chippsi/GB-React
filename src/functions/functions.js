export const getTime = () => {
    const date = new Date()
    const time = [date.getHours(), date.getMinutes()]
    return time.map(el => el >= 10 ? '' + el : '0' + el).join(':')
}