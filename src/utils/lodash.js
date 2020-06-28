export const groupBy = function (arr, criteria) {
    return arr.reduce(function (obj, item) {
        // Check if the criteria is a function to run on the item or a property of it
        let key = typeof criteria === 'function' ? criteria(item) : item[criteria];

        // If the key doesn't exist yet, create it
        if (!obj.hasOwnProperty(key)) {
            obj[key] = [];
        }

        // Push the value to the object
        obj[key].push(item);

        // Return the object to the next item in the loop
        return obj;
    }, {});
};