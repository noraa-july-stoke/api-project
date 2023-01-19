export const normalize = (array) => {
    const object = {};
    for (let ele of array) {
        object[ele.id] = ele;
    }
    return object;

}


export const deNormalize = (object) => {
    const array = [];

    for (let value of Object.values(object))
    array.push(value);
    return array;
}
