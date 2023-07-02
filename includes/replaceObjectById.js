export function replaceObjectById(array, newObject) {
    const index = array.findIndex(obj => obj.id === newObject.id);
    if (index !== -1) array.splice(index, 1, newObject);
    return array;
}