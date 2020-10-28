import bson from 'bson';

const sizeCalculator = (obj: any) => {
    var size = bson.calculateObjectSize(obj);
    var stats =
    {
        'bytes': size, 
        'KB': Math.round(size/(1024)), 
        'MB': Math.round(size/(1024*1024))
    };
}

export default sizeCalculator;