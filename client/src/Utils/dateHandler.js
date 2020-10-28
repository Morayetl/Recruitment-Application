export const monthYear= (d) => {
    if(!d){
        return '';
    }
    const date = new Date(d);
    return date.getMonth() + 1 + '.' + date.getFullYear()
}