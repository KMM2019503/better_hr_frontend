export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

export const formatDateTime = (dateTime) => {
    const [date, time] = dateTime.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    // return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    return `${day}/${month}/${year}`;

}