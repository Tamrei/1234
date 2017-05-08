'use strict';

Array.prototype.getIndexBy = function (keyName, keyValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][keyName] == keyValue) return i;
    }

    return -1;
};

Array.prototype.deleteBy = function (keyName, keysValues) {
    for (var i = 0; i < keysValues.length; i++) {
        var index = this.getIndexBy(keyName, keysValues[i]);
        if (index != -1) {
            this.splice(index, 1);
        }
    }
};