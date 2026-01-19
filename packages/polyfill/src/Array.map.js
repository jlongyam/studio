if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
        // 1. Ensure the 'this' value is not null or undefined
        if (this == null) {
            throw new TypeError('Cannot read properties of null or undefined');
        }

        // 2. Coerce the 'this' value to an object
        var O = Object(this);

        // 3. Get the length of the array
        var len = O.length >>> 0;

        // 4. Ensure the callback is a function
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. Create a new array to store the results
        var A = new Array(len);

        // 6. Iterate over the array elements
        for (var k = 0; k < len; k++) {
            // Check if the property exists to handle sparse arrays
            if (k in O) {
                var kValue = O[k];
                // Call the callback function with element, index, and the original array
                var mappedValue = callback.call(thisArg, kValue, k, O);
                // Store the result in the new array
                A[k] = mappedValue;
            }
        }

        // 7. Return the new array
        return A;
    };
}
