'use strict';

/**
 * Determines whether all elements of a sequence satisfy a condition.
 * @param {Function} predicate
 * @returns {boolean}
 */
Array.prototype.all = function (predicate) {
  return this.where(predicate).length === this.length;
};

/**
 * Determines whether any element of a sequence satisfies a condition.
 * @param {Function} predicate
 * @returns {boolean}
 */
Array.prototype.any = function (predicate) {
  return this.where(predicate).length > 0;
};

/**
 * Make an exact copy of the array, not a reference.
 * @returns {Array}
 */
Array.prototype.copy = function () {
  var list = [];

  this.forEach((item) => {
    list.push(item);
  });

  return list;
};

/**
 * Returns distinct elements from a sequence.
 * @returns {Array}
 */
Array.prototype.distinct = function () {
  let list = [];

  this.forEach((item) => {
    let found = false;

    list.forEach((it) => {
      if (found) {
        return;
      }

      if (JSON.stringify(it) === JSON.stringify(item)) {
        found = true;
      }
    });

    if (!found) {
      list.push(item);
    }
  });

  return list;
};

/**
 * Returns the first element of a sequence based on a predicate, or a default value if the sequence contains no elements.
 * @param {Function} predicate
 * @returns {Object}
 */
Array.prototype.first = function (predicate) {
  if (this.length === 0) {
    return null;
  }

  var output = predicate
    ? null
    : this[0];
  
  if (output) {
    return output;
  }

  let list = this.filter((item) => predicate(item));

  return list.length > 0
    ? list[0]
    : null;
};

/**
 * Sorts the elements of a sequence in ascending order according to a key.
 * @param {property} key
 * @returns {Array}
 */
Array.prototype.orderBy = function (key) {
  let list = [];

  this.forEach((item) => {
    list.push(item);
  });

  let item = list.length > 0 ? list[0] : null;
  
  if (!item) {
    return list;
  }

  let value = item[key],
      type = typeof(value);

  if (type === 'undefined') {
    return list;
  }

  list.sort((a, b) => {
    switch (type) {
      case 'boolean':
        return (a[key] === b[key]) ? 0 : a[key] ? -1 : 1;
      
      case 'number':
        return a[key] - b[key];
      
      case 'string':
        var au = a[key].toUpperCase(),
            bu = b[key].toUpperCase();
          
        if (au < bu) {
          return -1;
        }
        if (au > bu) {
          return 1;
        }
        
        return 0;
    }
  });

  return list;
};

/**
 * Sorts the elements of a sequence in descending order.
 * @param {property} key
 * @returns {Array}
 */
Array.prototype.orderByDescending = function (key) {
  return this
    .orderBy(key)
    .copy()
    .reverse();
};

/**
 * Projects each element of a sequence into a new form.
 * @param {any} map
 * @returns {Array}
 */
Array.prototype.select = function (map) {
  let list = [];

  this.forEach((item) => {
    var obj = {};

    for (let key in map) {
      if (!map.hasOwnProperty(key)) {
        continue;
      }

      obj[key] = map[key](item);
    }

    list.push(obj);
  });

  return list;
};

/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param {number} number
 * @returns {Array}
 */
Array.prototype.skip = function (number) {
  return this.slice(number);
};

/**
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param {number} number
 * @returns {Array}
 */
Array.prototype.take = function (number) {
  return this.slice(0, number);
};

/**
 * Filters a sequence of values based on a predicate.
 * @param {Function} predicate
 * @returns {Array}
 */
Array.prototype.where = function (predicate) {
  return this.filter((item) => predicate(item));
};