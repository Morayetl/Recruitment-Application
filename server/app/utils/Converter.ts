export const ConvertBitToBoolean = function (data:any, propertyName:string){
    return data[propertyName] === 0 ? false : true;
}