export function treeCategoryCompare(a:string, b:string) {
    const a1 = a.replace('/', '\/');
    const b1 = a.replace('/', '\/');
    const regexA = new RegExp(`${a1}\/[1-9][0-9]*$`);
    const regexB = new RegExp(`${b1}\/[1-9][0-9]*$`);

    if(a1.match(regexA)){
        return 1;
    }

    if(b1.match(regexB)){
        return -1;
    }

    return 0;
}