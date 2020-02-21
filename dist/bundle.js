(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
var arrays = require("./arrays");
var LinkedList = /** @class */ (function () {
    /**
     * Creates an empty Linked List.
     * @class A linked list is a data structure consisting of a group of nodes
     * which together represent a sequence.
     * @constructor
     */
    function LinkedList() {
        /**
         * First node in the list
         * @type {Object}
         * @private
         */
        this.firstNode = null;
        /**
         * Last node in the list
         * @type {Object}
         * @private
         */
        this.lastNode = null;
        /**
         * Number of elements in the list
         * @type {number}
         * @private
         */
        this.nElements = 0;
    }
    /**
     * Adds an element to this list.
     * @param {Object} item element to be added.
     * @param {number=} index optional index to add the element. If no index is specified
     * the element is added to the end of this list.
     * @return {boolean} true if the element was added or false if the index is invalid
     * or if the element is undefined.
     */
    LinkedList.prototype.add = function (item, index) {
        if (util.isUndefined(index)) {
            index = this.nElements;
        }
        if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
        }
        var newNode = this.createNode(item);
        if (this.nElements === 0 || this.lastNode === null) {
            // First node in the list.
            this.firstNode = newNode;
            this.lastNode = newNode;
        }
        else if (index === this.nElements) {
            // Insert at the end.
            this.lastNode.next = newNode;
            this.lastNode = newNode;
        }
        else if (index === 0) {
            // Change first node.
            newNode.next = this.firstNode;
            this.firstNode = newNode;
        }
        else {
            var prev = this.nodeAtIndex(index - 1);
            if (prev === null) {
                return false;
            }
            newNode.next = prev.next;
            prev.next = newNode;
        }
        this.nElements++;
        return true;
    };
    /**
     * Returns the first element in this list.
     * @return {*} the first element of the list or undefined if the list is
     * empty.
     */
    LinkedList.prototype.first = function () {
        if (this.firstNode !== null) {
            return this.firstNode.element;
        }
        return undefined;
    };
    /**
     * Returns the last element in this list.
     * @return {*} the last element in the list or undefined if the list is
     * empty.
     */
    LinkedList.prototype.last = function () {
        if (this.lastNode !== null) {
            return this.lastNode.element;
        }
        return undefined;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index desired index.
     * @return {*} the element at the given index or undefined if the index is
     * out of bounds.
     */
    LinkedList.prototype.elementAtIndex = function (index) {
        var node = this.nodeAtIndex(index);
        if (node === null) {
            return undefined;
        }
        return node.element;
    };
    /**
     * Returns the index in this list of the first occurrence of the
     * specified element, or -1 if the List does not contain this element.
     * <p>If the elements inside this list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {number} the index in this list of the first occurrence
     * of the specified element, or -1 if this list does not contain the
     * element.
     */
    LinkedList.prototype.indexOf = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (util.isUndefined(item)) {
            return -1;
        }
        var currentNode = this.firstNode;
        var index = 0;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }
        return -1;
    };
    /**
     * Returns true if this list contains the specified element.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {boolean} true if this list contains the specified element, false
     * otherwise.
     */
    LinkedList.prototype.contains = function (item, equalsFunction) {
        return (this.indexOf(item, equalsFunction) >= 0);
    };
    /**
     * Removes the first occurrence of the specified element in this list.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to be removed from this list, if present.
     * @return {boolean} true if the list contained the specified element.
     */
    LinkedList.prototype.remove = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }
        var previous = null;
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                if (previous === null) {
                    this.firstNode = currentNode.next;
                    if (currentNode === this.lastNode) {
                        this.lastNode = null;
                    }
                }
                else if (currentNode === this.lastNode) {
                    this.lastNode = previous;
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                else {
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                this.nElements--;
                return true;
            }
            previous = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    };
    /**
     * Removes all of the elements from this list.
     */
    LinkedList.prototype.clear = function () {
        this.firstNode = null;
        this.lastNode = null;
        this.nElements = 0;
    };
    /**
     * Returns true if this list is equal to the given list.
     * Two lists are equal if they have the same elements in the same order.
     * @param {LinkedList} other the other list.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function used to check if two elements are equal. If the elements in the lists
     * are custom objects you should provide a function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} true if this list is equal to the given list.
     */
    LinkedList.prototype.equals = function (other, equalsFunction) {
        var eqF = equalsFunction || util.defaultEquals;
        if (!(other instanceof LinkedList)) {
            return false;
        }
        if (this.size() !== other.size()) {
            return false;
        }
        return this.equalsAux(this.firstNode, other.firstNode, eqF);
    };
    /**
     * @private
     */
    LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
        while (n1 !== null && n2 !== null) {
            if (!eqF(n1.element, n2.element)) {
                return false;
            }
            n1 = n1.next;
            n2 = n2.next;
        }
        return true;
    };
    /**
     * Removes the element at the specified position in this list.
     * @param {number} index given index.
     * @return {*} removed element or undefined if the index is out of bounds.
     */
    LinkedList.prototype.removeElementAtIndex = function (index) {
        if (index < 0 || index >= this.nElements || this.firstNode === null || this.lastNode === null) {
            return undefined;
        }
        var element;
        if (this.nElements === 1) {
            //First node in the list.
            element = this.firstNode.element;
            this.firstNode = null;
            this.lastNode = null;
        }
        else {
            var previous = this.nodeAtIndex(index - 1);
            if (previous === null) {
                element = this.firstNode.element;
                this.firstNode = this.firstNode.next;
            }
            else if (previous.next === this.lastNode) {
                element = this.lastNode.element;
                this.lastNode = previous;
            }
            if (previous !== null && previous.next !== null) {
                element = previous.next.element;
                previous.next = previous.next.next;
            }
        }
        this.nElements--;
        return element;
    };
    /**
     * Executes the provided function once for each element present in this list in order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    LinkedList.prototype.forEach = function (callback) {
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (callback(currentNode.element) === false) {
                break;
            }
            currentNode = currentNode.next;
        }
    };
    /**
     * Reverses the order of the elements in this linked list (makes the last
     * element first, and the first element last).
     */
    LinkedList.prototype.reverse = function () {
        var previous = null;
        var current = this.firstNode;
        var temp = null;
        while (current !== null) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
        }
        temp = this.firstNode;
        this.firstNode = this.lastNode;
        this.lastNode = temp;
    };
    /**
     * Returns an array containing all of the elements in this list in proper
     * sequence.
     * @return {Array.<*>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    LinkedList.prototype.toArray = function () {
        var array = [];
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            array.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return array;
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list.
     */
    LinkedList.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements.
     */
    LinkedList.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    LinkedList.prototype.toString = function () {
        return arrays.toString(this.toArray());
    };
    /**
     * @private
     */
    LinkedList.prototype.nodeAtIndex = function (index) {
        if (index < 0 || index >= this.nElements) {
            return null;
        }
        if (index === (this.nElements - 1)) {
            return this.lastNode;
        }
        var node = this.firstNode;
        for (var i = 0; i < index && node !== null; i++) {
            node = node.next;
        }
        return node;
    };
    /**
     * @private
     */
    LinkedList.prototype.createNode = function (item) {
        return {
            element: item,
            next: null
        };
    };
    return LinkedList;
}()); // End of linked list
exports.default = LinkedList;

},{"./arrays":3,"./util":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList_1 = require("./LinkedList");
var Queue = /** @class */ (function () {
    /**
     * Creates an empty queue.
     * @class A queue is a First-In-First-Out (FIFO) data structure, the first
     * element added to the queue will be the first one to be removed. This
     * implementation uses a linked list as a container.
     * @constructor
     */
    function Queue() {
        this.list = new LinkedList_1.default();
    }
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.enqueue = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.add = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Retrieves and removes the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.dequeue = function () {
        if (this.list.size() !== 0) {
            var el = this.list.first();
            this.list.removeElementAtIndex(0);
            return el;
        }
        return undefined;
    };
    /**
     * Retrieves, but does not remove, the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.peek = function () {
        if (this.list.size() !== 0) {
            return this.list.first();
        }
        return undefined;
    };
    /**
     * Returns the number of elements in this queue.
     * @return {number} the number of elements in this queue.
     */
    Queue.prototype.size = function () {
        return this.list.size();
    };
    /**
     * Returns true if this queue contains the specified element.
     * <p>If the elements inside this stack are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName (pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function to check if two elements are equal.
     * @return {boolean} true if this queue contains the specified element,
     * false otherwise.
     */
    Queue.prototype.contains = function (elem, equalsFunction) {
        return this.list.contains(elem, equalsFunction);
    };
    /**
     * Checks if this queue is empty.
     * @return {boolean} true if and only if this queue contains no items; false
     * otherwise.
     */
    Queue.prototype.isEmpty = function () {
        return this.list.size() <= 0;
    };
    /**
     * Removes all of the elements from this queue.
     */
    Queue.prototype.clear = function () {
        this.list.clear();
    };
    /**
     * Executes the provided function once for each element present in this queue in
     * FIFO order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Queue.prototype.forEach = function (callback) {
        this.list.forEach(callback);
    };
    return Queue;
}()); // End of queue
exports.default = Queue;

},{"./LinkedList":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
/**
 * Returns the position of the first occurrence of the specified item
 * within the specified array.4
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the first occurrence of the specified element
 * within the specified array, or -1 if not found.
 */
function indexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
/**
 * Returns the position of the last occurrence of the specified element
 * within the specified array.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the last occurrence of the specified element
 * within the specified array or -1 if not found.
 */
function lastIndexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.lastIndexOf = lastIndexOf;
/**
 * Returns true if the specified array contains the specified element.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the specified array contains the specified element.
 */
function contains(array, item, equalsFunction) {
    return indexOf(array, item, equalsFunction) >= 0;
}
exports.contains = contains;
/**
 * Removes the first ocurrence of the specified element from the specified array.
 * @param {*} array the array in which to search element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the array changed after this call.
 */
function remove(array, item, equalsFunction) {
    var index = indexOf(array, item, equalsFunction);
    if (index < 0) {
        return false;
    }
    array.splice(index, 1);
    return true;
}
exports.remove = remove;
/**
 * Returns the number of elements in the specified array equal
 * to the specified object.
 * @param {Array} array the array in which to determine the frequency of the element.
 * @param {Object} item the element whose frequency is to be determined.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the number of elements in the specified array
 * equal to the specified object.
 */
function frequency(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    var freq = 0;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            freq++;
        }
    }
    return freq;
}
exports.frequency = frequency;
/**
 * Returns true if the two specified arrays are equal to one another.
 * Two arrays are considered equal if both arrays contain the same number
 * of elements, and all corresponding pairs of elements in the two
 * arrays are equal and are in the same order.
 * @param {Array} array1 one array to be tested for equality.
 * @param {Array} array2 the other array to be tested for equality.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between elemements in the arrays.
 * @return {boolean} true if the two arrays are equal
 */
function equals(array1, array2, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    if (array1.length !== array2.length) {
        return false;
    }
    var length = array1.length;
    for (var i = 0; i < length; i++) {
        if (!equals(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
/**
 * Returns shallow a copy of the specified array.
 * @param {*} array the array to copy.
 * @return {Array} a copy of the specified array
 */
function copy(array) {
    return array.concat();
}
exports.copy = copy;
/**
 * Swaps the elements at the specified positions in the specified array.
 * @param {Array} array The array in which to swap elements.
 * @param {number} i the index of one element to be swapped.
 * @param {number} j the index of the other element to be swapped.
 * @return {boolean} true if the array is defined and the indexes are valid.
 */
function swap(array, i, j) {
    if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
        return false;
    }
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return true;
}
exports.swap = swap;
function toString(array) {
    return '[' + array.toString() + ']';
}
exports.toString = toString;
/**
 * Executes the provided function once for each element present in this array
 * starting from index 0 to length - 1.
 * @param {Array} array The array in which to iterate.
 * @param {function(Object):*} callback function to execute, it is
 * invoked with one argument: the element value, to break the iteration you can
 * optionally return false.
 */
function forEach(array, callback) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var ele = array_1[_i];
        if (callback(ele) === false) {
            return;
        }
    }
}
exports.forEach = forEach;

},{"./util":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _hasOwnProperty = Object.prototype.hasOwnProperty;
exports.has = function (obj, prop) {
    return _hasOwnProperty.call(obj, prop);
};
/**
 * Default function to compare element order.
 * @function
 */
function defaultCompare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}
exports.defaultCompare = defaultCompare;
/**
 * Default function to test equality.
 * @function
 */
function defaultEquals(a, b) {
    return a === b;
}
exports.defaultEquals = defaultEquals;
/**
 * Default function to convert an object to a string.
 * @function
 */
function defaultToString(item) {
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return '$s' + item;
    }
    else {
        return '$o' + item.toString();
    }
}
exports.defaultToString = defaultToString;
/**
 * Joins all the properies of the object using the provided join string
 */
function makeString(item, join) {
    if (join === void 0) { join = ','; }
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return item.toString();
    }
    else {
        var toret = '{';
        var first = true;
        for (var prop in item) {
            if (exports.has(item, prop)) {
                if (first) {
                    first = false;
                }
                else {
                    toret = toret + join;
                }
                toret = toret + prop + ':' + item[prop];
            }
        }
        return toret + '}';
    }
}
exports.makeString = makeString;
/**
 * Checks if the given argument is a function.
 * @function
 */
function isFunction(func) {
    return (typeof func) === 'function';
}
exports.isFunction = isFunction;
/**
 * Checks if the given argument is undefined.
 * @function
 */
function isUndefined(obj) {
    return (typeof obj) === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * Checks if the given argument is a string.
 * @function
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
exports.isString = isString;
/**
 * Reverses a compare function.
 * @function
 */
function reverseCompareFunction(compareFunction) {
    if (isUndefined(compareFunction) || !isFunction(compareFunction)) {
        return function (a, b) {
            if (a < b) {
                return 1;
            }
            else if (a === b) {
                return 0;
            }
            else {
                return -1;
            }
        };
    }
    else {
        return function (d, v) {
            return compareFunction(d, v) * -1;
        };
    }
}
exports.reverseCompareFunction = reverseCompareFunction;
/**
 * Returns an equal function given a compare function.
 * @function
 */
function compareToEquals(compareFunction) {
    return function (a, b) {
        return compareFunction(a, b) === 0;
    };
}
exports.compareToEquals = compareToEquals;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* /// <reference path="scripting.ts"/> */
var scripting_1 = require("./scripting");
var util_1 = require("typescript-collections/dist/lib/util");
// 1. Define State
// locations
var TOM_HOUSE = "TOM_HOUSE";
var ALCH_HOUSE = "ALCH_HOUSE";
var WOODS = "WOODS";
scripting_1.addLocation(TOM_HOUSE, [WOODS, ALCH_HOUSE]);
scripting_1.addLocation(ALCH_HOUSE, [WOODS, TOM_HOUSE]);
scripting_1.addLocation(WOODS, [TOM_HOUSE, ALCH_HOUSE]);
// agents
var tom = scripting_1.addPersonalityAgent("tom", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
// items
var herbs = scripting_1.addItem("herbs");
var potion = scripting_1.addItem("potion");
var coin = scripting_1.addItem("coin");
var formula = scripting_1.addItem("formula");
var poison = scripting_1.addItem("poison");
scripting_1.setItemVariable(herbs, "currentLocation", WOODS);
scripting_1.setItemVariable(coin, "currentLocation", "tom");
scripting_1.setItemVariable(potion, "currentLocation", "none");
scripting_1.setItemVariable(formula, "currentLocation", ALCH_HOUSE);
scripting_1.setItemVariable(poison, "currentLocation", ALCH_HOUSE);
// variables
//alien
scripting_1.setAgentVariable(tom, "currentLocation", TOM_HOUSE);
//player
var playerLocation = scripting_1.setVariable("playerLocation", ALCH_HOUSE);
var playerSleep = scripting_1.setVariable("playerSleep", false);
var playerPoisonTicks = scripting_1.setVariable("playerPoisonTicks", 0);
var knowHerbs = scripting_1.setVariable("knowHerbs", false);
var offer = scripting_1.setVariable("offer", false);
var cure = scripting_1.setVariable("cure", false);
var lastAction = scripting_1.setVariable("lastAction", "Tom is at his home.");
// 2. Define BTs
// movement actions
var goToTOMS = scripting_1.action(function () { return true; }, function () {
    scripting_1.setAgentVariable(tom, "currentLocation", TOM_HOUSE);
    scripting_1.setVariable("lastAction", "Tom is at: " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Tom is at: " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
var goToALCH = scripting_1.action(function () { return true; }, function () {
    scripting_1.setAgentVariable(tom, "currentLocation", ALCH_HOUSE);
    scripting_1.setVariable("lastAction", "Tom is at: " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Tom is at: " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
var goToWOODS = scripting_1.action(function () { return true; }, function () {
    scripting_1.setAgentVariable(tom, "currentLocation", WOODS);
    scripting_1.setVariable("lastAction", "Tom is at: " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Tom is at: " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//other actions
//wait
var wait = scripting_1.action(function () { return true; }, function () {
    scripting_1.setVariable("lastAction", "Tom waits for this turn.");
    console.log("Tom waits for this turn.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//tell the alchemist about the herbs
var tellAlchAboutHerbs = scripting_1.action(function () { return scripting_1.getAgentVariable(tom, "currentLocation") == scripting_1.getVariable("playerLocation") && !scripting_1.getVariable("playerSleep") && !scripting_1.getVariable("knowHerbs"); }, function () {
    scripting_1.setVariable("knowHerbs", true);
    scripting_1.setVariable("lastAction", "Tom tells you where you can find herbs to make a healing potion.");
    console.log("Tom tells you where you can find herbs to make a healing potion.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//gather the herbs
var gatherHerbs = scripting_1.action(function () { return scripting_1.getAgentVariable(tom, "currentLocation") == WOODS && scripting_1.getItemVariable(herbs, "currentLocation") == WOODS; }, function () {
    scripting_1.setItemVariable(herbs, "currentLocation", "tom");
    scripting_1.setVariable("lastAction", "Tom gathers the herbs in the woods.");
    console.log("Tom gathers the herbs in the woods.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//give alchemist the herbs
var giveAlchHerbs = scripting_1.action(function () { return scripting_1.getAgentVariable(tom, "currentLocation") == scripting_1.getVariable("playerLocation") && !scripting_1.getVariable("playerSleep") && scripting_1.getItemVariable(herbs, "currentLocation") == "tom"; }, function () {
    scripting_1.setItemVariable(herbs, "currentLocation", "player");
    scripting_1.setVariable("lastAction", "Tom gives you herbs to make a healing potion.");
    console.log("Tom gives you herbs to make a healing potion.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//steal formula
var stealFormula = scripting_1.action(function () { return scripting_1.getAgentVariable(tom, "currentLocation") == ALCH_HOUSE && (scripting_1.getVariable("playerLocation") != ALCH_HOUSE || scripting_1.getVariable("playerSleep")) && scripting_1.getItemVariable(formula, "currentLocation") == ALCH_HOUSE; }, function () {
    scripting_1.setItemVariable(formula, "currentLocation", "tom");
    scripting_1.setVariable("lastAction", "Tom steals the formula for the healing potion.");
    console.log("Tom steals the formula for the healing potion.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//steal poison
var stealPoison = scripting_1.action(function () { return scripting_1.getAgentVariable(tom, "currentLocation") == ALCH_HOUSE && (scripting_1.getVariable("playerLocation") != ALCH_HOUSE || scripting_1.getVariable("playerSleep")) && scripting_1.getItemVariable(poison, "currentLocation") == ALCH_HOUSE; }, function () {
    scripting_1.setItemVariable(poison, "currentLocation", "tom");
    scripting_1.setVariable("lastAction", "Tom steals poison.");
    console.log("Tom steals poison.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//poison alchemist
var poisonAlch = scripting_1.action(function () { return scripting_1.getAgentVariable(tom, "currentLocation") == scripting_1.getVariable("playerLocation") && scripting_1.getItemVariable(poison, "currentLocation") == "tom"; }, function () {
    scripting_1.setItemVariable(poison, "currentLocation", "none");
    scripting_1.setVariable("playerSleep", true);
    scripting_1.setVariable("playerPoisonTicks", 5);
    scripting_1.setVariable("lastAction", "Tom poisons you.");
    console.log("Tom poisons you.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//make potion
var makePotion = scripting_1.action(function () { return scripting_1.getItemVariable(formula, "currentLocation") == "tom" && scripting_1.getItemVariable(herbs, "currentLocation") == "tom"; }, function () {
    scripting_1.setItemVariable(herbs, "currentLocation", "none");
    scripting_1.setItemVariable(potion, "currentLocation", "tom");
    scripting_1.setVariable("lastAction", "Tom makes the potion.");
    console.log("Tom makes the potion.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//stealPotion
var stealPotion = scripting_1.action(function () { return scripting_1.getAgentVariable(tom, "currentLocation") == scripting_1.getVariable("playerLocation") && scripting_1.getVariable("playerSleep") && scripting_1.getItemVariable(potion, "currentLocation") == "player"; }, function () {
    scripting_1.setItemVariable(potion, "currentLocation", "tom");
    scripting_1.setVariable("lastAction", "Tom steals the potion.");
    console.log("Tom steals the potion.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//make offer
var makeOffer = scripting_1.action(function () { return scripting_1.getAgentVariable(tom, "currentLocation") == scripting_1.getVariable("playerLocation") && !scripting_1.getVariable("playerSleep") && scripting_1.getItemVariable(potion, "currentLocation") == "player" && scripting_1.getItemVariable(coin, "currentLocation") == "tom"; }, function () {
    scripting_1.setVariable(offer, true);
    scripting_1.setVariable("lastAction", "Tom offers to buy the potion.");
    console.log("Tom offers to buy the potion.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
//take potion
var takePotion = scripting_1.action(function () { return scripting_1.getItemVariable(potion, "currentLocation") == tom; }, function () {
    scripting_1.setVariable(cure, true);
    scripting_1.setItemVariable(potion, "currentLocation", "none");
    scripting_1.setVariable("lastAction", "Tom takes the potion and is cured.");
    console.log("Tom takes the potion and is cured.");
    console.log(tom + " " + scripting_1.getAgentVariable(tom, "currentLocation"));
    console.log("Alchemist" + " " + scripting_1.getVariable("playerLocation"));
    console.log(herbs + " " + scripting_1.getItemVariable(herbs, "currentLocation"));
    console.log(coin + " " + scripting_1.getItemVariable(coin, "currentLocation"));
    console.log(potion + " " + scripting_1.getItemVariable(potion, "currentLocation"));
    console.log(formula + " " + scripting_1.getItemVariable(formula, "currentLocation"));
    console.log(poison + " " + scripting_1.getItemVariable(poison, "currentLocation"));
    console.log("Sleep" + " " + scripting_1.getVariable("playerSleep"));
    console.log("Poison Ticks" + " " + scripting_1.getVariable("playerPoisonTicks"));
    console.log("Know Herb" + " " + scripting_1.getVariable("knowHerbs"));
    console.log("Offer" + " " + scripting_1.getVariable("offer"));
    console.log("Cure" + " " + scripting_1.getVariable("cure"));
}, 1);
// description wrappers
// coming soon
// create behavior trees
var tryStealFormula = scripting_1.selector([
    stealFormula,
    scripting_1.sequence([
        poisonAlch, stealFormula,
    ])
]);
var tryStealPotion = scripting_1.selector([
    stealPotion,
    scripting_1.sequence([
        poisonAlch, stealPotion,
    ])
]);
var stealCraft = scripting_1.sequence([
    goToWOODS,
    gatherHerbs,
    goToALCH,
    tellAlchAboutHerbs,
    stealPoison,
    wait,
    poisonAlch,
    tryStealFormula,
    makePotion,
    takePotion
]);
var stealAlch = scripting_1.sequence([
    goToALCH,
    tellAlchAboutHerbs,
    stealPoison,
    wait,
    wait,
    poisonAlch,
    tryStealPotion,
    takePotion
]);
var purchase = scripting_1.sequence([
    goToALCH,
    tellAlchAboutHerbs,
    wait,
    wait,
    wait,
    wait,
    makeOffer,
    wait,
    takePotion
]);
var purchaseGather = scripting_1.sequence([
    goToWOODS,
    gatherHerbs,
    goToALCH,
    giveAlchHerbs,
    wait,
    makeOffer,
    wait,
    takePotion
]);
var tomBT = scripting_1.selector([
    purchaseGather,
    purchase,
    stealAlch,
    stealCraft
]);
//attach behaviour trees to agents
scripting_1.attachTreeToAgent(tom, tomBT);
// 3. Construct story
// create user actions
var moveWOODSBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) != WOODS && !scripting_1.getVariable(playerSleep) && !scripting_1.getVariable(cure); }, scripting_1.sequence([
    scripting_1.displayDescriptionDynamicAction(function () {
        return scripting_1.getVariable("lastAction");
    }),
    scripting_1.addUserAction("Go to the woods.", function () { return scripting_1.setVariable(playerLocation, WOODS); }),
    scripting_1.addUserAction("Do nothing.", function () { })
]));
scripting_1.addUserInteractionTree(moveWOODSBT);
var moveALCHBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) != ALCH_HOUSE && !scripting_1.getVariable(playerSleep) && !scripting_1.getVariable(cure); }, scripting_1.sequence([
    scripting_1.displayDescriptionDynamicAction(function () {
        return scripting_1.getVariable("lastAction");
    }),
    scripting_1.addUserAction("Go home.", function () { return scripting_1.setVariable(playerLocation, ALCH_HOUSE); }),
    scripting_1.addUserAction("Do nothing.", function () { })
]));
scripting_1.addUserInteractionTree(moveALCHBT);
//gather herbs
var gatherHerbsBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(herbs, "currentLocation") && !scripting_1.getVariable(playerSleep) && scripting_1.getVariable(knowHerbs) && !scripting_1.getVariable(cure); }, scripting_1.sequence([
    //displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Gather the herbs.", function () { return scripting_1.setItemVariable(herbs, "currentLocation", "player"); })
]));
scripting_1.addUserInteractionTree(gatherHerbsBT);
//make Potion
var makePotionBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ALCH_HOUSE && scripting_1.getItemVariable(herbs, "currentLocation") == "player" && !scripting_1.getVariable(playerSleep) && !scripting_1.getVariable(cure); }, scripting_1.sequence([
    //displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Make the potion.", function () { scripting_1.setItemVariable(herbs, "currentLocation", "none"); scripting_1.setItemVariable(potion, "currentLocation", "player"); })
]));
scripting_1.addUserInteractionTree(makePotionBT);
//accept offer
var acceptOfferBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getAgentVariable(tom, "currentLocation") && scripting_1.getItemVariable(potion, "currentLocation") == "player" && !scripting_1.getVariable(playerSleep) && scripting_1.getVariable(offer) && !scripting_1.getVariable(cure); }, scripting_1.sequence([
    //displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Sell the potion to Tom.", function () { scripting_1.setItemVariable(coin, "currentLocation", "player"); scripting_1.setItemVariable(potion, "currentLocation", "tom"); })
]));
scripting_1.addUserInteractionTree(acceptOfferBT);
//go to go to sleep
var sleepBT = scripting_1.guard(function () { return !scripting_1.getVariable(playerSleep) && !scripting_1.getVariable(cure); }, scripting_1.sequence([
    //displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Go to sleep.", function () { return scripting_1.setVariable(playerSleep, true); }),
]));
scripting_1.addUserInteractionTree(sleepBT);
//wake up
var wakeBT = scripting_1.guard(function () { return scripting_1.getVariable(playerPoisonTicks) == 0 && scripting_1.getVariable(playerSleep) && !scripting_1.getVariable(cure); }, scripting_1.sequence([
    scripting_1.displayDescriptionDynamicAction(function () {
        return scripting_1.getVariable("lastAction");
    }),
    scripting_1.addUserAction("Wake up.", function () { return scripting_1.setVariable(playerSleep, false); }),
    scripting_1.addUserAction("Do nothing.", function () { })
]));
scripting_1.addUserInteractionTree(wakeBT);
//be poisoned
var poisonedBT = scripting_1.guard(function () { return scripting_1.getVariable(playerPoisonTicks) > 0 && !scripting_1.getVariable(cure); }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You are poisoned. "),
    scripting_1.displayDescriptionAction(scripting_1.getVariable(lastAction)),
    scripting_1.addUserAction("Do nothing.", function () { scripting_1.setVariable(playerPoisonTicks, scripting_1.getVariable(playerPoisonTicks) - 1); })
]));
scripting_1.addUserInteractionTree(poisonedBT);
var gameOver = scripting_1.guard(function () { return scripting_1.getVariable(cure); }, scripting_1.displayDescriptionAction("Tom is cured!"));
scripting_1.addUserInteractionTree(gameOver);
//4. Run the world
scripting_1.initialize();
var userInteractionObject = scripting_1.getUserInteractionObject();
//RENDERING-----
var displayPanel = { x: 500, y: 0 };
var textPanel = { x: 500, y: 350 };
var actionsPanel = { x: 520, y: 425 };
var canvas = document.getElementById('display');
var context = canvas.getContext('2d');
var spaceshipImage = new Image();
spaceshipImage.onload = render;
//var playerImage = new Image();
//var alienImage = new Image();
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 300);
    // displayPlayer();
    // displayAlien();
    displayTextAndActions();
}
// var mapPositions = {
//     "START": {x: 230, y: 235},
//     "BC_CORRIDOR": {x: 240, y: 210},
//     "BR_CORRIDOR": {x: 300, y: 190},
//     "MR_CORRIDOR": {x: 305, y: 150},
//     "QUARTERS2": {x: 340, y: 155},
//     "QUARTERS1": {x: 340, y: 190},
//     "TR_CORRIDOR": {x: 300, y: 100},
//     "TC_CORRIDOR": {x: 230, y: 100},
//     "TL_CORRIDOR": {x: 170, y: 100},
//     "EXIT_ELEVATOR": {x: 230, y: 60},
//     "LAB": {x: 240, y: 170},
//     "ML_CORRIDOR": {x: 160, y: 150},
//     "BL_CORRIDOR": {x: 160, y: 200},
//     "ENGINES": {x: 170, y: 60},
//     "COCKPIT": {x: 120, y: 60},
//     "COMMS": {x: 120, y: 100},
//     "MEDICAL": {x: 250, y: 130},
//     "STORAGE": {x: 200, y: 150}
// };
//
// function displayPlayer() {
//     var currentLocation = getVariable(playerLocation);
//     if (!isUndefined(mapPositions[currentLocation]))
//         context.drawImage(playerImage, displayPanel.x + mapPositions[currentLocation].x, displayPanel.y + mapPositions[currentLocation].y, 16, 16);
// }
//
// function displayAlien() {
//     var currentLocation = getAgentVariable(alien, "currentLocation");
//     context.drawImage(alienImage, displayPanel.x + mapPositions[currentLocation].x, displayPanel.y + mapPositions[currentLocation].y, 24, 24);
// }
//
spaceshipImage.src = "../images/isolation_map.png";
// playerImage.src = "../images/player2.png";
// alienImage.src = "../images/xenomorph.png";
var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 50;
function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    yOffset = actionsPanel.y + 25;
    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    console.log("Actions effect text: " + userInteractionObject.actionEffectsText);
    var textToDisplay = userInteractionObject.actionEffectsText.length != 0 ? userInteractionObject.actionEffectsText : userInteractionObject.text;
    context.fillText(textToDisplay, textPanel.x, textPanel.y + 20);
    context.font = "15pt Calibri";
    context.fillStyle = 'white';
    for (var i = 0; i < userInteractionObject.userActionsText.length; i++) {
        var userActionText = userInteractionObject.userActionsText[i];
        context.fillText(userActionText, actionsPanel.x + 20, yOffset);
        if (i == 0) {
            currentSelection = i;
        }
        yOffset += yOffsetIncrement;
    }
    displayArrow();
    // console.log("Crew cards: " + getVariable(crewCardsCollected));
}
function displayArrow() {
    if (userInteractionObject.userActionsText.length != 0) {
        context.clearRect(actionsPanel.x, actionsPanel.y, 20, 1000);
        context.fillText("> ", 520, actionsPanel.y + 25 + (currentSelection * yOffsetIncrement));
    }
}
//User input
function keyPress(e) {
    if (e.keyCode == 13) {
        var selectedAction = userInteractionObject.userActionsText[currentSelection];
        if (!util_1.isUndefined(selectedAction)) {
            scripting_1.executeUserAction(selectedAction);
            scripting_1.worldTick();
            render();
        }
    }
}
function keyDown(e) {
    if (e.keyCode == 40) { //down
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection++;
            currentSelection = currentSelection % userInteractionObject.userActionsText.length;
            displayArrow();
        }
    }
    else if (e.keyCode == 38) { //up
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection--;
            if (currentSelection < 0)
                currentSelection = userInteractionObject.userActionsText.length - 1;
            displayArrow();
        }
    }
}
document.addEventListener("keypress", keyPress, false);
document.addEventListener("keydown", keyDown, false);
},{"./scripting":6,"typescript-collections/dist/lib/util":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue_1 = require("typescript-collections/dist/lib/Queue");
var util_1 = require("typescript-collections/dist/lib/util");
var Status;
(function (Status) {
    Status[Status["RUNNING"] = 0] = "RUNNING";
    Status[Status["SUCCESS"] = 1] = "SUCCESS";
    Status[Status["FAILURE"] = 2] = "FAILURE";
})(Status = exports.Status || (exports.Status = {}));
function terminateAndReturn(id, blackboard, status) {
    delete blackboard[id];
    return status;
}
var blackboard = {};
function getActionTick(id) {
    return function (precondition, effect, ticksRequired) {
        if (ticksRequired === void 0) { ticksRequired = 1; }
        return function () {
            // start of utility code
            if (getVariable("utilityCalc")) {
                //calculate utility from features of action
                var util = utility(1);
                //set utility in agent:ID
                var index = getVariable("utilityAgent") + ":" + id;
                if (!blackboard[index]) {
                    blackboard[index] = {};
                }
                blackboard[index].utility = util;
                // set last utility to utility
                setVariable("lastUtil", util);
                // return RUNNING
                return Status.RUNNING;
            }
            if (precondition()) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].ticksDone = ticksRequired;
                }
                if (blackboard[id].ticksDone > 0) {
                    blackboard[id].ticksDone--;
                    return Status.RUNNING;
                }
                else {
                    effect();
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                }
            }
            else {
                return Status.FAILURE;
            }
        };
    };
}
function getGuardTick() {
    return function (precondition, astTick, negate) {
        if (negate === void 0) { negate = false; }
        return function () {
            // start of utility code
            if (getVariable("utilityCalc")) {
                //utility is average of children
                // calc utility of child
                astTick();
                var util = getVariable("lastUtil");
                // set utility as utility of child in agent:id
                var index = getVariable("utilityAgent") + ":" + id;
                if (!blackboard[index]) {
                    blackboard[index] = {};
                }
                blackboard[index].utility = util;
                // set last utility to utility of child
                setVariable("lastUtil", util);
                // return RUNNING
                return Status.RUNNING;
            }
            var proceed = negate ? !precondition() : precondition();
            return proceed ? execute(astTick) : Status.FAILURE;
        };
    };
}
function getSequenceTick(id) {
    return function (astTicks) {
        return function () {
            // start of utility code
            if (getVariable("utilityCalc")) {
                //utility is average of children
                //get compiled utility from each child
                var util = 0;
                var count = 0;
                for (var i = 0; i < astTicks.length; i++) {
                    astTicks[i]();
                    var lastUtil = getVariable("lastUtil");
                    util += lastUtil;
                    count += 1;
                }
                util = util / count;
                // set utility for agent:id to average
                var index = getVariable("utilityAgent") + ":" + id;
                if (!blackboard[index]) {
                    blackboard[index] = {};
                }
                blackboard[index].utility = util;
                // set last utility
                setVariable("lastUtil", util);
                // return RUNNING
                return Status.RUNNING;
            }
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }
            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex]);
                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.FAILURE)
                    return terminateAndReturn(id, blackboard, Status.FAILURE);
                else if (childStatus == Status.SUCCESS)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.SUCCESS);
        };
    };
}
function getSelectorTick(id) {
    return function (astTicks) {
        return function () {
            // start of utility code
            if (getVariable("utilityCalc")) {
                //utility is max of children
                //get compiled utility from each child
                var util = -2;
                for (var i = 0; i < astTicks.length; i++) {
                    astTicks[i]();
                    var lastUtil = getVariable("lastUtil");
                    if (lastUtil > util) {
                        util = lastUtil;
                    }
                }
                // set utility for agent:id to max
                var index = getVariable("utilityAgent") + ":" + id;
                if (!blackboard[index]) {
                    blackboard[index] = {};
                }
                blackboard[index].utility = util;
                // set last utility
                setVariable("lastUtil", util);
                // return RUNNING
                return Status.RUNNING;
            }
            if (!blackboard[id]) {
                blackboard[id] = {};
                blackboard[id].currentIndex = 0;
            }
            while (blackboard[id].currentIndex < astTicks.length) {
                var childStatus = execute(astTicks[blackboard[id].currentIndex]);
                if (childStatus == Status.RUNNING)
                    return Status.RUNNING;
                else if (childStatus == Status.SUCCESS)
                    return terminateAndReturn(id, blackboard, Status.SUCCESS);
                else if (childStatus == Status.FAILURE)
                    blackboard[id].currentIndex += 1;
            }
            return terminateAndReturn(id, blackboard, Status.FAILURE);
        };
    };
}
function utility(f) {
    return f;
}
exports.utility = utility;
function execute(astTick) {
    return astTick();
}
exports.execute = execute;
var globalIdCounter = 0;
function action(precondition, effect, ticksRequired) {
    return getActionTick(globalIdCounter++)(precondition, effect, ticksRequired);
}
exports.action = action;
function guard(precondition, astTick) {
    return getGuardTick()(precondition, astTick);
}
exports.guard = guard;
function neg_guard(precondition, astTick) {
    return getGuardTick()(precondition, astTick, true);
}
exports.neg_guard = neg_guard;
/**
 * Cycles over its children: iterates to the next child on success of a child
 * Succeeds if all succeed, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function sequence(astTicks) {
    return getSequenceTick(globalIdCounter++)(astTicks);
}
exports.sequence = sequence;
/**
 * Cycles over its children: iterates to the next child on failure of a child(think of it as if-else blocks)
 * Succeeds if even one succeeds, else fails
 * @param {Tick[]} astTicks
 * @returns {Tick}
 */
function selector(astTicks) {
    return getSelectorTick(globalIdCounter++)(astTicks);
}
exports.selector = selector;
/*--------------- APIs --------------- */
//0. utilities
// min and max are inclusive
function getRandNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandNumber = getRandNumber;
//1. story instance
//1.1 locations
var locationGraph = {};
//add to both sides
function addLocation(locationName, adjacentLocations) {
    if (locationGraph[locationName] == undefined)
        locationGraph[locationName] = [];
    locationGraph[locationName] = locationGraph[locationName].concat(adjacentLocations);
    for (var i = 0; i < adjacentLocations.length; i++) {
        if (locationGraph[adjacentLocations[i]] == undefined)
            locationGraph[adjacentLocations[i]] = [];
        locationGraph[adjacentLocations[i]].push(locationName);
    }
}
exports.addLocation = addLocation;
function areAdjacent(location1, location2) {
    console.log("Are adjacent: " + location1 + ", " + location2);
    if (locationGraph[location1] == undefined || locationGraph[location2] == undefined) {
        console.log("Either one/both locations undefined");
        return false;
    }
    for (var i = 0; i < locationGraph[location1].length; i++) {
        if (locationGraph[location1][i] == location2) {
            return true;
        }
    }
    return false;
}
exports.areAdjacent = areAdjacent;
//pathfinding primitives
function getNextLocation(start, destination) {
    var visited = {};
    var previous = {};
    for (var key in locationGraph) {
        visited[key] = false;
    }
    visited[start] = true;
    var myQueue = new Queue_1.default();
    myQueue.enqueue(start);
    while (!myQueue.isEmpty()) {
        var current = myQueue.dequeue();
        if (current === destination) {
            break;
        }
        var neighbors = locationGraph[current];
        for (var i = 0; i < neighbors.length; i++) {
            if (!visited[neighbors[i]]) {
                myQueue.enqueue(neighbors[i]);
                visited[neighbors[i]] = true;
                previous[neighbors[i]] = current;
            }
        }
    }
    var current = destination;
    if (current == start)
        return current;
    while (previous[current] != start) {
        current = previous[current];
    }
    return current;
}
exports.getNextLocation = getNextLocation;
//1.2 agents
var agents = [];
var personalityAgents = {};
function addAgent(agentName) {
    agents.push(agentName);
    return agentName;
}
exports.addAgent = addAgent;
function addPersonalityAgent(agentName, o1, o2, c1, c2, e1, e2, a1, a2, n1, n2) {
    var personality = {};
    personality["name"] = agentName;
    personality["openness"] = o1;
    personality["intellect"] = o2;
    personality["industriousness"] = c1;
    personality["orderliness"] = c2;
    personality["enthusiasm"] = e1;
    personality["assertiveness"] = e2;
    personality["compassion"] = a1;
    personality["politeness"] = a2;
    personality["volatility"] = n1;
    personality["withdrawal"] = n2;
    personalityAgents[agentName] = personality;
    return agentName;
}
exports.addPersonalityAgent = addPersonalityAgent;
//1.3 items
var items = [];
function addItem(itemName) {
    items.push(itemName);
    return itemName;
}
exports.addItem = addItem;
//1.4 variables
var variables = {};
var agentVariables = {};
var itemVariables = {};
function setVariable(varName, value) {
    variables[varName] = value;
    return varName;
}
exports.setVariable = setVariable;
function setAgentVariable(agent, varName, value) {
    if (util_1.isUndefined(agentVariables[agent]))
        agentVariables[agent] = {};
    agentVariables[agent][varName] = value;
    return value;
}
exports.setAgentVariable = setAgentVariable;
function getVariable(varName) {
    if (util_1.isUndefined(variables[varName])) {
        console.log("Variable " + varName + " not set!");
        return;
    }
    return variables[varName];
}
exports.getVariable = getVariable;
function getAgentVariable(agent, varName) {
    if (util_1.isUndefined(agentVariables[agent]) || util_1.isUndefined(agentVariables[agent][varName])) {
        console.log("Variable " + varName + " for agent " + agent + " not set!");
        return;
    }
    return agentVariables[agent][varName];
}
exports.getAgentVariable = getAgentVariable;
function isVariableNotSet(varName) {
    return util_1.isUndefined(variables[varName]);
}
exports.isVariableNotSet = isVariableNotSet;
function isAgentVariableNotSet(agent, varName) {
    return util_1.isUndefined(agentVariables[agent]) || util_1.isUndefined(agentVariables[agent][varName]);
}
exports.isAgentVariableNotSet = isAgentVariableNotSet;
function setItemVariable(item, varName, value) {
    if (util_1.isUndefined(itemVariables[item]))
        itemVariables[item] = {};
    itemVariables[item][varName] = value;
    return value;
}
exports.setItemVariable = setItemVariable;
function getItemVariable(item, varName) {
    if (util_1.isUndefined(itemVariables[item]) || util_1.isUndefined(itemVariables[item][varName])) {
        console.log("Variable " + varName + " for item " + item + " not set!");
        return;
    }
    return itemVariables[item][varName];
}
exports.getItemVariable = getItemVariable;
//2
//agent-behavior tree mapping
var agentTrees = {};
function attachTreeToAgent(agent, tree) {
    agentTrees[agent] = tree;
    setVariable("utilityCalc", false);
    //code to determine utility here, only if personality agent
    if (personalityAgents[agent]) {
        //setVariable utilityCalc, call tree
        setVariable("utilityCalc", true);
        setVariable("utilityAgent", agent);
        tree();
        setVariable("utilityCalc", false);
    }
}
exports.attachTreeToAgent = attachTreeToAgent;
//3.1
//user actions
//TODO add variables to user action texts
var userInteractionObject = {
    text: "",
    userActionsText: [],
    actionEffectsText: ""
};
var userInteractionTrees = [];
var userActions = {};
function runUserInteractionTrees() {
    userInteractionObject.text = "";
    userInteractionObject.userActionsText = [];
    userActions = {}; //{"Go to location X" : effect
    for (var i = 0; i < userInteractionTrees.length; i++) {
        execute(userInteractionTrees[i]);
    }
}
exports.displayDescriptionAction = function (text) {
    return action(function () { return true; }, function () { return userInteractionObject.text += "\n" + text; }, 0);
};
exports.displayDescriptionDynamicAction = function (func) {
    return action(function () { return true; }, function () {
        var text = func();
        userInteractionObject.text += "\n" + text;
    }, 0);
};
exports.displayActionEffectText = function (text) { return userInteractionObject.actionEffectsText += "\n" + text; };
exports.addUserActionTree = function (text, effectTree) { return action(function () { return true; }, function () { return mapUserActionToTree(text, effectTree); }, 0); };
exports.addUserAction = function (text, effect) {
    return action(function () { return true; }, function () { return mapUserActionToTree(text, action(function () { return true; }, effect, 0)); }, 0);
};
function mapUserActionToTree(text, tree) {
    userActions[text] = tree;
    userInteractionObject.userActionsText.push(text);
}
function addUserInteractionTree(tick) {
    userInteractionTrees.push(tick);
}
exports.addUserInteractionTree = addUserInteractionTree;
function executeUserAction(text) {
    //execute the user action
    userInteractionObject.actionEffectsText = "";
    var userActionEffectTree = userActions[text];
    execute(userActionEffectTree);
}
exports.executeUserAction = executeUserAction;
//4.
function initialize() {
    runUserInteractionTrees();
}
exports.initialize = initialize;
function getUserInteractionObject() {
    return userInteractionObject;
}
exports.getUserInteractionObject = getUserInteractionObject;
function worldTick() {
    //all agent ticks
    for (var i = 0; i < agents.length; i++) {
        var tree = agentTrees[agents[i]];
        if (!util_1.isUndefined(tree)) {
            setVariable("executingAgent", agents[i]);
            execute(tree);
        }
    }
    var pAgents = Object.keys(personalityAgents);
    for (var i = 0; i < pAgents.length; i++) {
        var tree = agentTrees[pAgents[i]];
        if (!util_1.isUndefined(tree)) {
            setVariable("executingAgent", pAgents[i]);
            execute(tree);
        }
    }
    runUserInteractionTrees();
}
exports.worldTick = worldTick;
},{"typescript-collections/dist/lib/Queue":2,"typescript-collections/dist/lib/util":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2FsY2hlbWlzdC50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixXQUFXLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO0tBQ0o7SUFDRCx1QkFBdUIsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFsQkQsOEJBa0JDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xudmFyIExpbmtlZExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBMaW5rZWQgTGlzdC5cbiAgICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xuICAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMYXN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSBhZGRlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXG4gICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgYWRkZWQgb3IgZmFsc2UgaWYgdGhlIGluZGV4IGlzIGludmFsaWRcbiAgICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5uRWxlbWVudHMgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOb2RlID0gdGhpcy5jcmVhdGVOb2RlKGl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIC8vIENoYW5nZSBmaXJzdCBub2RlLlxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gcHJldi5uZXh0O1xuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5FbGVtZW50cysrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICAqIGVtcHR5LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXG4gICAgICogZW1wdHkuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGRlc2lyZWQgaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZVxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpc3QsIGlmIHByZXNlbnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzIDwgMSB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAgICogQHBhcmFtIHtMaW5rZWRMaXN0fSBvdGhlciB0aGUgb3RoZXIgbGlzdC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xuICAgICAqIGFyZSBjdXN0b20gb2JqZWN0cyB5b3Ugc2hvdWxkIHByb3ZpZGUgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIExpbmtlZExpc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsIG90aGVyLmZpcnN0Tm9kZSwgZXFGKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzQXV4ID0gZnVuY3Rpb24gKG4xLCBuMiwgZXFGKSB7XG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFlcUYobjEuZWxlbWVudCwgbjIuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuMSA9IG4xLm5leHQ7XG4gICAgICAgICAgICBuMiA9IG4yLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBnaXZlbiBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAxKSB7XG4gICAgICAgICAgICAvL0ZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJldmlvdXMubmV4dCA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSBudWxsICYmIHByZXZpb3VzLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBwcmV2aW91cy5uZXh0Lm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhjdXJyZW50Tm9kZS5lbGVtZW50KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0ZW1wID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5sYXN0Tm9kZTtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXG4gICAgICogc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7QXJyYXkuPCo+fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0LFxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPD0gMDtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJyYXlzLnRvU3RyaW5nKHRoaXMudG9BcnJheSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAodGhpcy5uRWxlbWVudHMgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleCAmJiBub2RlICE9PSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxlbWVudDogaXRlbSxcbiAgICAgICAgICAgIG5leHQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rZWRMaXN0O1xufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWRMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKFwiLi9MaW5rZWRMaXN0XCIpO1xudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgcXVldWUuXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xuICAgICAqIGltcGxlbWVudGF0aW9uIHVzZXMgYSBsaW5rZWQgbGlzdCBhcyBhIGNvbnRhaW5lci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yLCBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpIDw9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBxdWV1ZSBpblxuICAgICAqIEZJRk8gb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWV1ZTtcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMDtcbn1cbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcbi8qKlxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBjaGFuZ2VkIGFmdGVyIHRoaXMgY2FsbC5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheSBlcXVhbFxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB3aG9zZSBmcmVxdWVuY3kgaXMgdG8gYmUgZGV0ZXJtaW5lZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZnJlcXVlbmN5KGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgZnJlcSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgZnJlcSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmcmVxO1xufVxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxuICogb2YgZWxlbWVudHMsIGFuZCBhbGwgY29ycmVzcG9uZGluZyBwYWlycyBvZiBlbGVtZW50cyBpbiB0aGUgdHdvXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgdGhlIG90aGVyIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWVxdWFscyhhcnJheTFbaV0sIGFycmF5MltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuZXF1YWxzID0gZXF1YWxzO1xuLyoqXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSB0byBjb3B5LlxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGNvcHkoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XG59XG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuLyoqXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBzd2FwIGVsZW1lbnRzLlxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGlzIGRlZmluZWQgYW5kIHRoZSBpbmRleGVzIGFyZSB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xuICAgIGlmIChpIDwgMCB8fCBpID49IGFycmF5Lmxlbmd0aCB8fCBqIDwgMCB8fCBqID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnN3YXAgPSBzd2FwO1xuZnVuY3Rpb24gdG9TdHJpbmcoYXJyYXkpIHtcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcbn1cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcbiAqIHN0YXJ0aW5nIGZyb20gaW5kZXggMCB0byBsZW5ndGggLSAxLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGVsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn07XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0Q29tcGFyZSA9IGRlZmF1bHRDb21wYXJlO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICckcycgKyBpdGVtO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICckbycgKyBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0VG9TdHJpbmcgPSBkZWZhdWx0VG9TdHJpbmc7XG4vKipcbiAqIEpvaW5zIGFsbCB0aGUgcHJvcGVyaWVzIG9mIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGpvaW4gc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdHJpbmcoaXRlbSwgam9pbikge1xuICAgIGlmIChqb2luID09PSB2b2lkIDApIHsgam9pbiA9ICcsJzsgfVxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdG9yZXQgPSAneyc7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuaGFzKGl0ZW0sIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIHByb3AgKyAnOicgKyBpdGVtW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3JldCArICd9JztcbiAgICB9XG59XG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZnVuYykgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmopID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHN0cmluZy5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBSZXZlcnNlcyBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoY29tcGFyZUZ1bmN0aW9uKSB8fCAhaXNGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oZCwgdikgKiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xuLyoqXG4gKiBSZXR1cm5zIGFuIGVxdWFsIGZ1bmN0aW9uIGdpdmVuIGEgY29tcGFyZSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBjb21wYXJlVG9FcXVhbHMoY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYikgPT09IDA7XG4gICAgfTtcbn1cbmV4cG9ydHMuY29tcGFyZVRvRXF1YWxzID0gY29tcGFyZVRvRXF1YWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIvKiAvLy8gPHJlZmVyZW5jZSBwYXRoPVwic2NyaXB0aW5nLnRzXCIvPiAqL1xyXG5pbXBvcnQge1xyXG4gICAgYWRkQWdlbnQsIGFkZFBlcnNvbmFsaXR5QWdlbnQsIHNldEFnZW50VmFyaWFibGUsIGFkZEl0ZW0sIGFkZExvY2F0aW9uLCBzZXRWYXJpYWJsZSwgZ2V0TmV4dExvY2F0aW9uLCBhY3Rpb24sXHJcbiAgICBnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXHJcbiAgICBpc1ZhcmlhYmxlTm90U2V0LCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24sIGFkZFVzZXJBY3Rpb24sIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUsIGluaXRpYWxpemUsXHJcbiAgICBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QsIGV4ZWN1dGVVc2VyQWN0aW9uLCB3b3JsZFRpY2ssIGF0dGFjaFRyZWVUb0FnZW50LCBzZXRJdGVtVmFyaWFibGUsIGdldEl0ZW1WYXJpYWJsZSxcclxuICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWUsIGRpc3BsYXlEZXNjcmlwdGlvbkR5bmFtaWNBY3Rpb25cclxufSBmcm9tIFwiLi9zY3JpcHRpbmdcIjtcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xyXG5cclxuLy8gMS4gRGVmaW5lIFN0YXRlXHJcbi8vIGxvY2F0aW9uc1xyXG52YXIgVE9NX0hPVVNFID0gXCJUT01fSE9VU0VcIjtcclxudmFyIEFMQ0hfSE9VU0UgPSBcIkFMQ0hfSE9VU0VcIjtcclxudmFyIFdPT0RTID0gXCJXT09EU1wiO1xyXG5cclxuXHJcbmFkZExvY2F0aW9uKFRPTV9IT1VTRSwgW1dPT0RTLCBBTENIX0hPVVNFXSk7XHJcbmFkZExvY2F0aW9uKEFMQ0hfSE9VU0UsIFtXT09EUywgVE9NX0hPVVNFXSk7XHJcbmFkZExvY2F0aW9uKFdPT0RTLCBbVE9NX0hPVVNFLCBBTENIX0hPVVNFXSk7XHJcblxyXG4vLyBhZ2VudHNcclxudmFyIHRvbSA9IGFkZFBlcnNvbmFsaXR5QWdlbnQoXCJ0b21cIiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCk7XHJcblxyXG4vLyBpdGVtc1xyXG52YXIgaGVyYnMgPSBhZGRJdGVtKFwiaGVyYnNcIik7XHJcbnZhciBwb3Rpb24gPSBhZGRJdGVtKFwicG90aW9uXCIpO1xyXG52YXIgY29pbiA9IGFkZEl0ZW0oXCJjb2luXCIpO1xyXG52YXIgZm9ybXVsYSA9IGFkZEl0ZW0oXCJmb3JtdWxhXCIpO1xyXG52YXIgcG9pc29uID0gYWRkSXRlbShcInBvaXNvblwiKTtcclxuc2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiLCBXT09EUyk7XHJcbnNldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInRvbVwiKTtcclxuc2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJub25lXCIpO1xyXG5zZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIiwgQUxDSF9IT1VTRSk7XHJcbnNldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIsIEFMQ0hfSE9VU0UpO1xyXG5cclxuLy8gdmFyaWFibGVzXHJcbi8vYWxpZW5cclxuc2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIsIFRPTV9IT1VTRSk7XHJcbi8vcGxheWVyXHJcbnZhciBwbGF5ZXJMb2NhdGlvbiA9IHNldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIiwgQUxDSF9IT1VTRSk7XHJcbnZhciBwbGF5ZXJTbGVlcCA9IHNldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIiwgZmFsc2UpO1xyXG52YXIgcGxheWVyUG9pc29uVGlja3MgPSBzZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIsIDApO1xyXG52YXIga25vd0hlcmJzID0gc2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIiwgZmFsc2UpO1xyXG52YXIgb2ZmZXIgPSBzZXRWYXJpYWJsZShcIm9mZmVyXCIsIGZhbHNlKTtcclxudmFyIGN1cmUgPSBzZXRWYXJpYWJsZShcImN1cmVcIiwgZmFsc2UpO1xyXG52YXIgbGFzdEFjdGlvbiA9IHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSBpcyBhdCBoaXMgaG9tZS5cIik7XHJcblxyXG4vLyAyLiBEZWZpbmUgQlRzXHJcbi8vIG1vdmVtZW50IGFjdGlvbnNcclxubGV0IGdvVG9UT01TID0gYWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcclxuICAgIHNldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiLCBUT01fSE9VU0UpO1xyXG4gICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIGlzIGF0OiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlRvbSBpcyBhdDogXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2codG9tICsgXCIgXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhjb2luICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2cocG9pc29uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIktub3cgSGVyYlwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImtub3dIZXJic1wiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxufSwgMSk7XHJcbmxldCBnb1RvQUxDSCA9IGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XHJcbiAgICBzZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIiwgQUxDSF9IT1VTRSk7XHJcbiAgICBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gaXMgYXQ6IFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKVxyXG4gICAgY29uc29sZS5sb2coXCJUb20gaXMgYXQ6IFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbn0sIDEpO1xyXG5sZXQgZ29Ub1dPT0RTID0gYWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcclxuICAgIHNldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiLCBXT09EUyk7XHJcbiAgICBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gaXMgYXQ6IFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKVxyXG4gICAgY29uc29sZS5sb2coXCJUb20gaXMgYXQ6IFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbn0sIDEpO1xyXG5cclxuXHJcbi8vb3RoZXIgYWN0aW9uc1xyXG4vL3dhaXRcclxubGV0IHdhaXQgPSBhY3Rpb24oXHJcbiAgICAoKSA9PiB0cnVlLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSB3YWl0cyBmb3IgdGhpcyB0dXJuLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSB3YWl0cyBmb3IgdGhpcyB0dXJuLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbiAgICB9LFxyXG4gICAgMVxyXG4pO1xyXG5cclxuLy90ZWxsIHRoZSBhbGNoZW1pc3QgYWJvdXQgdGhlIGhlcmJzXHJcbmxldCB0ZWxsQWxjaEFib3V0SGVyYnMgPSBhY3Rpb24oXHJcbiAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSAmJiAhZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSAmJiAhZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIiksXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIiwgdHJ1ZSk7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIHRlbGxzIHlvdSB3aGVyZSB5b3UgY2FuIGZpbmQgaGVyYnMgdG8gbWFrZSBhIGhlYWxpbmcgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSB0ZWxscyB5b3Ugd2hlcmUgeW91IGNhbiBmaW5kIGhlcmJzIHRvIG1ha2UgYSBoZWFsaW5nIHBvdGlvbi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9tICsgXCIgXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGhlcmJzICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2luICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm11bGEgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG9pc29uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBvaXNvbiBUaWNrc1wiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIktub3cgSGVyYlwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImtub3dIZXJic1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cmVcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJjdXJlXCIpKVxyXG4gICAgfSxcclxuICAgIDFcclxuKTtcclxuXHJcbi8vZ2F0aGVyIHRoZSBoZXJic1xyXG5sZXQgZ2F0aGVySGVyYnMgPSBhY3Rpb24oXHJcbiAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gV09PRFMgJiYgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBXT09EUyxcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIsIFwidG9tXCIpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSBnYXRoZXJzIHRoZSBoZXJicyBpbiB0aGUgd29vZHMuXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9tIGdhdGhlcnMgdGhlIGhlcmJzIGluIHRoZSB3b29kcy5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9tICsgXCIgXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGhlcmJzICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2luICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm11bGEgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG9pc29uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBvaXNvbiBUaWNrc1wiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIktub3cgSGVyYlwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImtub3dIZXJic1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cmVcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJjdXJlXCIpKVxyXG4gICAgfSxcclxuICAgIDFcclxuKTtcclxuXHJcbi8vZ2l2ZSBhbGNoZW1pc3QgdGhlIGhlcmJzXHJcbmxldCBnaXZlQWxjaEhlcmJzID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikgJiYgIWdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikgJiYgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBcInRvbVwiLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIGdpdmVzIHlvdSBoZXJicyB0byBtYWtlIGEgaGVhbGluZyBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9tIGdpdmVzIHlvdSBoZXJicyB0byBtYWtlIGEgaGVhbGluZyBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxuICAgIH0sXHJcbiAgICAxXHJcbik7XHJcblxyXG4vL3N0ZWFsIGZvcm11bGFcclxubGV0IHN0ZWFsRm9ybXVsYSA9IGFjdGlvbihcclxuICAgICgpID0+IGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBBTENIX0hPVVNFICYmIChnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpICE9IEFMQ0hfSE9VU0UgfHwgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSkgJiYgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpID09IEFMQ0hfSE9VU0UsXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgc2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIsIFwidG9tXCIpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSBzdGVhbHMgdGhlIGZvcm11bGEgZm9yIHRoZSBoZWFsaW5nIHBvdGlvbi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUb20gc3RlYWxzIHRoZSBmb3JtdWxhIGZvciB0aGUgaGVhbGluZyBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxuICAgIH0sXHJcbiAgICAxXHJcbik7XHJcblxyXG4vL3N0ZWFsIHBvaXNvblxyXG5sZXQgc3RlYWxQb2lzb24gPSBhY3Rpb24oXHJcbiAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gQUxDSF9IT1VTRSAmJiAoZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSAhPSBBTENIX0hPVVNFIHx8IGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpICYmIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpID09IEFMQ0hfSE9VU0UsXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgc2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJ0b21cIik7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIHN0ZWFscyBwb2lzb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9tIHN0ZWFscyBwb2lzb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxuICAgIH0sXHJcbiAgICAxXHJcbik7XHJcblxyXG4vL3BvaXNvbiBhbGNoZW1pc3RcclxubGV0IHBvaXNvbkFsY2ggPSBhY3Rpb24oXHJcbiAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSAmJiBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBcInRvbVwiLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIsIFwibm9uZVwiKTtcclxuICAgICAgICBzZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIsIHRydWUpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIiwgNSk7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIHBvaXNvbnMgeW91LlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSBwb2lzb25zIHlvdS5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9tICsgXCIgXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGhlcmJzICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2luICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm11bGEgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG9pc29uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBvaXNvbiBUaWNrc1wiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIktub3cgSGVyYlwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImtub3dIZXJic1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cmVcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJjdXJlXCIpKVxyXG4gICAgfSxcclxuICAgIDFcclxuKTtcclxuXHJcbi8vbWFrZSBwb3Rpb25cclxubGV0IG1ha2VQb3Rpb24gPSBhY3Rpb24oXHJcbiAgICAoKSA9PiBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gXCJ0b21cIiAmJiBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpID09IFwidG9tXCIsXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgc2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgc2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJ0b21cIik7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIG1ha2VzIHRoZSBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9tIG1ha2VzIHRoZSBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxuICAgIH0sXHJcbiAgICAxXHJcbik7XHJcblxyXG4vL3N0ZWFsUG90aW9uXHJcbmxldCBzdGVhbFBvdGlvbiA9IGFjdGlvbihcclxuICAgICgpID0+IGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpICYmIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikgJiYgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gXCJwbGF5ZXJcIixcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInRvbVwiKTtcclxuICAgICAgICBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gc3RlYWxzIHRoZSBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9tIHN0ZWFscyB0aGUgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbiAgICB9LFxyXG4gICAgMVxyXG4pO1xyXG5cclxuLy9tYWtlIG9mZmVyXHJcbmxldCBtYWtlT2ZmZXIgPSBhY3Rpb24oXHJcbiAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSAmJiAhZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSAmJiBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBcInBsYXllclwiICYmIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBcInRvbVwiLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldFZhcmlhYmxlKG9mZmVyLCB0cnVlKTtcclxuICAgICAgICBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gb2ZmZXJzIHRvIGJ1eSB0aGUgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSBvZmZlcnMgdG8gYnV5IHRoZSBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxuICAgIH0sXHJcbiAgICAxXHJcbik7XHJcblxyXG4vL3Rha2UgcG90aW9uXHJcbmxldCB0YWtlUG90aW9uID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gdG9tLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldFZhcmlhYmxlKGN1cmUsIHRydWUpO1xyXG4gICAgICAgIHNldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIsIFwibm9uZVwiKTtcclxuICAgICAgICBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gdGFrZXMgdGhlIHBvdGlvbiBhbmQgaXMgY3VyZWQuXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9tIHRha2VzIHRoZSBwb3Rpb24gYW5kIGlzIGN1cmVkLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbiAgICB9LFxyXG4gICAgMVxyXG4pO1xyXG5cclxuLy8gZGVzY3JpcHRpb24gd3JhcHBlcnNcclxuLy8gY29taW5nIHNvb25cclxuXHJcbi8vIGNyZWF0ZSBiZWhhdmlvciB0cmVlc1xyXG5sZXQgdHJ5U3RlYWxGb3JtdWxhID0gc2VsZWN0b3IoW1xyXG4gICAgc3RlYWxGb3JtdWxhLFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgIHBvaXNvbkFsY2gsIHN0ZWFsRm9ybXVsYSxcclxuICAgIF0pXHJcbl0pO1xyXG5cclxubGV0IHRyeVN0ZWFsUG90aW9uID0gc2VsZWN0b3IoW1xyXG4gICAgc3RlYWxQb3Rpb24sXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgcG9pc29uQWxjaCwgc3RlYWxQb3Rpb24sXHJcbiAgICBdKVxyXG5dKTtcclxuXHJcbmxldCBzdGVhbENyYWZ0ID0gc2VxdWVuY2UoW1xyXG4gIGdvVG9XT09EUyxcclxuICBnYXRoZXJIZXJicyxcclxuICBnb1RvQUxDSCxcclxuICB0ZWxsQWxjaEFib3V0SGVyYnMsXHJcbiAgc3RlYWxQb2lzb24sXHJcbiAgd2FpdCxcclxuICBwb2lzb25BbGNoLFxyXG4gIHRyeVN0ZWFsRm9ybXVsYSxcclxuICBtYWtlUG90aW9uLFxyXG4gIHRha2VQb3Rpb25cclxuXSk7XHJcblxyXG5sZXQgc3RlYWxBbGNoID0gc2VxdWVuY2UoW1xyXG4gIGdvVG9BTENILFxyXG4gIHRlbGxBbGNoQWJvdXRIZXJicyxcclxuICBzdGVhbFBvaXNvbixcclxuICB3YWl0LFxyXG4gIHdhaXQsXHJcbiAgcG9pc29uQWxjaCxcclxuICB0cnlTdGVhbFBvdGlvbixcclxuICB0YWtlUG90aW9uXHJcbl0pO1xyXG5cclxubGV0IHB1cmNoYXNlID0gc2VxdWVuY2UoW1xyXG4gIGdvVG9BTENILFxyXG4gIHRlbGxBbGNoQWJvdXRIZXJicyxcclxuICB3YWl0LFxyXG4gIHdhaXQsXHJcbiAgd2FpdCxcclxuICB3YWl0LFxyXG4gIG1ha2VPZmZlcixcclxuICB3YWl0LFxyXG4gIHRha2VQb3Rpb25cclxuXSk7XHJcblxyXG5sZXQgcHVyY2hhc2VHYXRoZXIgPSBzZXF1ZW5jZShbXHJcbiAgZ29Ub1dPT0RTLFxyXG4gIGdhdGhlckhlcmJzLFxyXG4gIGdvVG9BTENILFxyXG4gIGdpdmVBbGNoSGVyYnMsXHJcbiAgd2FpdCxcclxuICBtYWtlT2ZmZXIsXHJcbiAgd2FpdCxcclxuICB0YWtlUG90aW9uXHJcbl0pO1xyXG5cclxubGV0IHRvbUJUID0gc2VsZWN0b3IoW1xyXG4gIHB1cmNoYXNlR2F0aGVyLFxyXG4gIHB1cmNoYXNlLFxyXG4gIHN0ZWFsQWxjaCxcclxuICBzdGVhbENyYWZ0XHJcbl0pO1xyXG5cclxuLy9hdHRhY2ggYmVoYXZpb3VyIHRyZWVzIHRvIGFnZW50c1xyXG5hdHRhY2hUcmVlVG9BZ2VudCh0b20sIHRvbUJUKTtcclxuXHJcbi8vIDMuIENvbnN0cnVjdCBzdG9yeVxyXG4vLyBjcmVhdGUgdXNlciBhY3Rpb25zXHJcblxyXG52YXIgbW92ZVdPT0RTQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgIT0gV09PRFMgJiYgIWdldFZhcmlhYmxlKHBsYXllclNsZWVwKSAmJiAhZ2V0VmFyaWFibGUoY3VyZSksXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkR5bmFtaWNBY3Rpb24oXHJcbiAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdvIHRvIHRoZSB3b29kcy5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFdPT0RTKSksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJEbyBub3RoaW5nLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShtb3ZlV09PRFNCVCk7XHJcbnZhciBtb3ZlQUxDSEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pICE9IEFMQ0hfSE9VU0UgJiYgIWdldFZhcmlhYmxlKHBsYXllclNsZWVwKSAmJiAhZ2V0VmFyaWFibGUoY3VyZSksXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkR5bmFtaWNBY3Rpb24oXHJcbiAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdvIGhvbWUuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBBTENIX0hPVVNFKSksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJEbyBub3RoaW5nLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShtb3ZlQUxDSEJUKTtcclxuLy9nYXRoZXIgaGVyYnNcclxudmFyIGdhdGhlckhlcmJzQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSAmJiAhZ2V0VmFyaWFibGUocGxheWVyU2xlZXApICYmIGdldFZhcmlhYmxlKGtub3dIZXJicykgJiYgIWdldFZhcmlhYmxlKGN1cmUpLFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZG9ja2luZyBzdGF0aW9uLlwiKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdhdGhlciB0aGUgaGVyYnMuXCIsICgpID0+IHNldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIikpXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoZ2F0aGVySGVyYnNCVCk7XHJcbi8vbWFrZSBQb3Rpb25cclxudmFyIG1ha2VQb3Rpb25CVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBBTENIX0hPVVNFICYmIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gXCJwbGF5ZXJcIiAmJiAhZ2V0VmFyaWFibGUocGxheWVyU2xlZXApICYmICFnZXRWYXJpYWJsZShjdXJlKSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgLy9kaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGRvY2tpbmcgc3RhdGlvbi5cIiksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNYWtlIHRoZSBwb3Rpb24uXCIsICgpID0+IHtzZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIsIFwibm9uZVwiKTsgc2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIil9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKG1ha2VQb3Rpb25CVCk7XHJcbi8vYWNjZXB0IG9mZmVyXHJcbnZhciBhY2NlcHRPZmZlckJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSAmJiBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBcInBsYXllclwiICYmICFnZXRWYXJpYWJsZShwbGF5ZXJTbGVlcCkgJiYgZ2V0VmFyaWFibGUob2ZmZXIpICYmICFnZXRWYXJpYWJsZShjdXJlKSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgLy9kaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGRvY2tpbmcgc3RhdGlvbi5cIiksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTZWxsIHRoZSBwb3Rpb24gdG8gVG9tLlwiLCAoKSA9PiB7c2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpOyBzZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInRvbVwiKX0pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoYWNjZXB0T2ZmZXJCVCk7XHJcbi8vZ28gdG8gZ28gdG8gc2xlZXBcclxudmFyIHNsZWVwQlQgPSBndWFyZCgoKSA9PiAhZ2V0VmFyaWFibGUocGxheWVyU2xlZXApICYmICFnZXRWYXJpYWJsZShjdXJlKSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgLy9kaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGRvY2tpbmcgc3RhdGlvbi5cIiksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJHbyB0byBzbGVlcC5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyU2xlZXAsIHRydWUpKSxcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShzbGVlcEJUKTtcclxuLy93YWtlIHVwXHJcbnZhciB3YWtlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJQb2lzb25UaWNrcykgPT0gMCAmJiBnZXRWYXJpYWJsZShwbGF5ZXJTbGVlcCkgJiYgIWdldFZhcmlhYmxlKGN1cmUpLFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25EeW5hbWljQWN0aW9uKFxyXG4gICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJXYWtlIHVwLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJTbGVlcCwgZmFsc2UpKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkRvIG5vdGhpbmcuXCIsICgpID0+IHt9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHdha2VCVCk7XHJcbi8vYmUgcG9pc29uZWRcclxudmFyIHBvaXNvbmVkQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJQb2lzb25UaWNrcykgPiAwICYmICFnZXRWYXJpYWJsZShjdXJlKSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGFyZSBwb2lzb25lZC4gXCIpLFxyXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oZ2V0VmFyaWFibGUobGFzdEFjdGlvbikpLFxyXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRG8gbm90aGluZy5cIiwgKCkgPT4ge3NldFZhcmlhYmxlKHBsYXllclBvaXNvblRpY2tzLCBnZXRWYXJpYWJsZShwbGF5ZXJQb2lzb25UaWNrcyktMSl9KVxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHBvaXNvbmVkQlQpO1xyXG52YXIgZ2FtZU92ZXIgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShjdXJlKSxcclxuICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIlRvbSBpcyBjdXJlZCFcIikpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGdhbWVPdmVyKTtcclxuXHJcbi8vNC4gUnVuIHRoZSB3b3JsZFxyXG5pbml0aWFsaXplKCk7XHJcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKTtcclxuXHJcbi8vUkVOREVSSU5HLS0tLS1cclxudmFyIGRpc3BsYXlQYW5lbCA9IHt4OiA1MDAsIHk6IDB9O1xyXG52YXIgdGV4dFBhbmVsID0ge3g6IDUwMCwgeTogMzUwfTtcclxudmFyIGFjdGlvbnNQYW5lbCA9IHt4OiA1MjAsIHk6IDQyNX07XHJcblxyXG52YXIgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheScpO1xyXG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxudmFyIHNwYWNlc2hpcEltYWdlID0gbmV3IEltYWdlKCk7XHJcbnNwYWNlc2hpcEltYWdlLm9ubG9hZCA9IHJlbmRlcjtcclxuLy92YXIgcGxheWVySW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuLy92YXIgYWxpZW5JbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIC8vY29udGV4dC5kcmF3SW1hZ2Uoc3BhY2VzaGlwSW1hZ2UsIGRpc3BsYXlQYW5lbC54LCBkaXNwbGF5UGFuZWwueSwgNTAwLCAzMDApO1xyXG4gICAgLy8gZGlzcGxheVBsYXllcigpO1xyXG4gICAgLy8gZGlzcGxheUFsaWVuKCk7XHJcbiAgICBkaXNwbGF5VGV4dEFuZEFjdGlvbnMoKTtcclxufVxyXG5cclxuLy8gdmFyIG1hcFBvc2l0aW9ucyA9IHtcclxuLy8gICAgIFwiU1RBUlRcIjoge3g6IDIzMCwgeTogMjM1fSxcclxuLy8gICAgIFwiQkNfQ09SUklET1JcIjoge3g6IDI0MCwgeTogMjEwfSxcclxuLy8gICAgIFwiQlJfQ09SUklET1JcIjoge3g6IDMwMCwgeTogMTkwfSxcclxuLy8gICAgIFwiTVJfQ09SUklET1JcIjoge3g6IDMwNSwgeTogMTUwfSxcclxuLy8gICAgIFwiUVVBUlRFUlMyXCI6IHt4OiAzNDAsIHk6IDE1NX0sXHJcbi8vICAgICBcIlFVQVJURVJTMVwiOiB7eDogMzQwLCB5OiAxOTB9LFxyXG4vLyAgICAgXCJUUl9DT1JSSURPUlwiOiB7eDogMzAwLCB5OiAxMDB9LFxyXG4vLyAgICAgXCJUQ19DT1JSSURPUlwiOiB7eDogMjMwLCB5OiAxMDB9LFxyXG4vLyAgICAgXCJUTF9DT1JSSURPUlwiOiB7eDogMTcwLCB5OiAxMDB9LFxyXG4vLyAgICAgXCJFWElUX0VMRVZBVE9SXCI6IHt4OiAyMzAsIHk6IDYwfSxcclxuLy8gICAgIFwiTEFCXCI6IHt4OiAyNDAsIHk6IDE3MH0sXHJcbi8vICAgICBcIk1MX0NPUlJJRE9SXCI6IHt4OiAxNjAsIHk6IDE1MH0sXHJcbi8vICAgICBcIkJMX0NPUlJJRE9SXCI6IHt4OiAxNjAsIHk6IDIwMH0sXHJcbi8vICAgICBcIkVOR0lORVNcIjoge3g6IDE3MCwgeTogNjB9LFxyXG4vLyAgICAgXCJDT0NLUElUXCI6IHt4OiAxMjAsIHk6IDYwfSxcclxuLy8gICAgIFwiQ09NTVNcIjoge3g6IDEyMCwgeTogMTAwfSxcclxuLy8gICAgIFwiTUVESUNBTFwiOiB7eDogMjUwLCB5OiAxMzB9LFxyXG4vLyAgICAgXCJTVE9SQUdFXCI6IHt4OiAyMDAsIHk6IDE1MH1cclxuLy8gfTtcclxuLy9cclxuLy8gZnVuY3Rpb24gZGlzcGxheVBsYXllcigpIHtcclxuLy8gICAgIHZhciBjdXJyZW50TG9jYXRpb24gPSBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbik7XHJcbi8vICAgICBpZiAoIWlzVW5kZWZpbmVkKG1hcFBvc2l0aW9uc1tjdXJyZW50TG9jYXRpb25dKSlcclxuLy8gICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShwbGF5ZXJJbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VycmVudExvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyZW50TG9jYXRpb25dLnksIDE2LCAxNik7XHJcbi8vIH1cclxuLy9cclxuLy8gZnVuY3Rpb24gZGlzcGxheUFsaWVuKCkge1xyXG4vLyAgICAgdmFyIGN1cnJlbnRMb2NhdGlvbiA9IGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpO1xyXG4vLyAgICAgY29udGV4dC5kcmF3SW1hZ2UoYWxpZW5JbWFnZSwgZGlzcGxheVBhbmVsLnggKyBtYXBQb3NpdGlvbnNbY3VycmVudExvY2F0aW9uXS54LCBkaXNwbGF5UGFuZWwueSArIG1hcFBvc2l0aW9uc1tjdXJyZW50TG9jYXRpb25dLnksIDI0LCAyNCk7XHJcbi8vIH1cclxuLy9cclxuIHNwYWNlc2hpcEltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL2lzb2xhdGlvbl9tYXAucG5nXCI7XHJcbi8vIHBsYXllckltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL3BsYXllcjIucG5nXCI7XHJcbi8vIGFsaWVuSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMveGVub21vcnBoLnBuZ1wiO1xyXG5cclxudmFyIGN1cnJlbnRTZWxlY3Rpb247XHJcbnZhciB5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcclxudmFyIHlPZmZzZXRJbmNyZW1lbnQgPSA1MDtcclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpIHtcclxuICAgIGNvbnRleHQuY2xlYXJSZWN0KHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSwgNTAwLCAxMDAwKTtcclxuICAgIHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xyXG5cclxuICAgIGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFjdGlvbnMgZWZmZWN0IHRleHQ6IFwiICsgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KTtcclxuICAgIHZhciB0ZXh0VG9EaXNwbGF5ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0Lmxlbmd0aCAhPSAwID8gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0IDogdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQ7XHJcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRleHRUb0Rpc3BsYXksIHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSArIDIwKTtcclxuXHJcbiAgICBjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHVzZXJBY3Rpb25UZXh0ID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtpXTtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHVzZXJBY3Rpb25UZXh0LCBhY3Rpb25zUGFuZWwueCArIDIwLCB5T2Zmc2V0KTtcclxuICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5T2Zmc2V0ICs9IHlPZmZzZXRJbmNyZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUFycm93KCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNyZXcgY2FyZHM6IFwiICsgZ2V0VmFyaWFibGUoY3Jld0NhcmRzQ29sbGVjdGVkKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlBcnJvdygpIHtcclxuICAgIGlmKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApe1xyXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KGFjdGlvbnNQYW5lbC54LCBhY3Rpb25zUGFuZWwueSwgMjAsIDEwMDApO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoXCI+IFwiLCA1MjAsIGFjdGlvbnNQYW5lbC55ICsgMjUgKyAoY3VycmVudFNlbGVjdGlvbiAqIHlPZmZzZXRJbmNyZW1lbnQpKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9Vc2VyIGlucHV0XHJcbmZ1bmN0aW9uIGtleVByZXNzKGUpIHtcclxuICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRBY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2N1cnJlbnRTZWxlY3Rpb25dO1xyXG4gICAgICAgIGlmKCFpc1VuZGVmaW5lZChzZWxlY3RlZEFjdGlvbikpe1xyXG4gICAgICAgICAgICBleGVjdXRlVXNlckFjdGlvbihzZWxlY3RlZEFjdGlvbik7XHJcbiAgICAgICAgICAgIHdvcmxkVGljaygpO1xyXG4gICAgICAgICAgICByZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtleURvd24oZSkge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PSA0MCkgey8vZG93blxyXG4gICAgICAgIGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24rKztcclxuICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbiA9IGN1cnJlbnRTZWxlY3Rpb24gJSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgZGlzcGxheUFycm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzgpIHsvL3VwXHJcbiAgICAgICAgaWYgKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi0tO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFNlbGVjdGlvbiA8IDApXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBkaXNwbGF5QXJyb3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBrZXlQcmVzcywgZmFsc2UpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duLCBmYWxzZSk7XHJcbiIsImltcG9ydCBRdWV1ZSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9RdWV1ZVwiO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XHJcblxyXG5leHBvcnQgZW51bSBTdGF0dXMge1xyXG4gICAgUlVOTklORyxcclxuICAgIFNVQ0NFU1MsXHJcbiAgICBGQUlMVVJFXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRlcm1pbmF0ZUFuZFJldHVybihpZDogbnVtYmVyLCBibGFja2JvYXJkOiBhbnksIHN0YXR1czogU3RhdHVzKSB7XHJcbiAgICBkZWxldGUgYmxhY2tib2FyZFtpZF07XHJcbiAgICByZXR1cm4gc3RhdHVzO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBNZXNzYWdlID0gKCkgPT4gc3RyaW5nXHJcbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcclxuZXhwb3J0IHR5cGUgUHJlY29uZGl0aW9uID0gKCkgPT4gYm9vbGVhblxyXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXHJcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xyXG4gKi9cclxuZXhwb3J0IHR5cGUgR3VhcmRUaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrLCBuZWdhdGU/OiBib29sZWFuKSA9PiBUaWNrXHJcbi8qKlxyXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXHJcblxyXG52YXIgYmxhY2tib2FyZCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XHJcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkID0gMSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBzdGFydCBvZiB1dGlsaXR5IGNvZGVcclxuICAgICAgICAgICAgaWYgKGdldFZhcmlhYmxlKFwidXRpbGl0eUNhbGNcIikpIHtcclxuICAgICAgICAgICAgICAvL2NhbGN1bGF0ZSB1dGlsaXR5IGZyb20gZmVhdHVyZXMgb2YgYWN0aW9uXHJcbiAgICAgICAgICAgICAgdmFyIHV0aWwgPSB1dGlsaXR5KDEpO1xyXG4gICAgICAgICAgICAgIC8vc2V0IHV0aWxpdHkgaW4gYWdlbnQ6SURcclxuICAgICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRWYXJpYWJsZShcInV0aWxpdHlBZ2VudFwiKSArIFwiOlwiICsgaWQ7XHJcbiAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpbmRleF0gPSB7fTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYmxhY2tib2FyZFtpbmRleF0udXRpbGl0eSA9IHV0aWw7XHJcbiAgICAgICAgICAgICAgLy8gc2V0IGxhc3QgdXRpbGl0eSB0byB1dGlsaXR5XHJcbiAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiLCB1dGlsKTtcclxuICAgICAgICAgICAgICAvLyByZXR1cm4gUlVOTklOR1xyXG4gICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHByZWNvbmRpdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPSB0aWNrc1JlcXVpcmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChibGFja2JvYXJkW2lkXS50aWNrc0RvbmUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLkZBSUxVUkU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEd1YXJkVGljaygpOiBHdWFyZFRpY2sge1xyXG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGFzdFRpY2ssIG5lZ2F0ZSA9IGZhbHNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0YXJ0IG9mIHV0aWxpdHkgY29kZVxyXG4gICAgICAgICAgICBpZiAoZ2V0VmFyaWFibGUoXCJ1dGlsaXR5Q2FsY1wiKSkge1xyXG4gICAgICAgICAgICAgIC8vdXRpbGl0eSBpcyBhdmVyYWdlIG9mIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgLy8gY2FsYyB1dGlsaXR5IG9mIGNoaWxkXHJcbiAgICAgICAgICAgICAgYXN0VGljaygpO1xyXG4gICAgICAgICAgICAgIHZhciB1dGlsID0gZ2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiKTtcclxuICAgICAgICAgICAgICAvLyBzZXQgdXRpbGl0eSBhcyB1dGlsaXR5IG9mIGNoaWxkIGluIGFnZW50OmlkXHJcbiAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0VmFyaWFibGUoXCJ1dGlsaXR5QWdlbnRcIikgKyBcIjpcIiArIGlkO1xyXG4gICAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaW5kZXhdID0ge307XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJsYWNrYm9hcmRbaW5kZXhdLnV0aWxpdHkgPSB1dGlsO1xyXG4gICAgICAgICAgICAgIC8vIHNldCBsYXN0IHV0aWxpdHkgdG8gdXRpbGl0eSBvZiBjaGlsZFxyXG4gICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwibGFzdFV0aWxcIiwgdXRpbCk7XHJcbiAgICAgICAgICAgICAgLy8gcmV0dXJuIFJVTk5JTkdcclxuICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvY2VlZCA9IG5lZ2F0ZSA/ICFwcmVjb25kaXRpb24oKSA6IHByZWNvbmRpdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvY2VlZCA/IGV4ZWN1dGUoYXN0VGljaykgOiBTdGF0dXMuRkFJTFVSRTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlcXVlbmNlVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XHJcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0YXJ0IG9mIHV0aWxpdHkgY29kZVxyXG4gICAgICAgICAgICBpZiAoZ2V0VmFyaWFibGUoXCJ1dGlsaXR5Q2FsY1wiKSkge1xyXG4gICAgICAgICAgICAgIC8vdXRpbGl0eSBpcyBhdmVyYWdlIG9mIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgLy9nZXQgY29tcGlsZWQgdXRpbGl0eSBmcm9tIGVhY2ggY2hpbGRcclxuICAgICAgICAgICAgICB2YXIgdXRpbCA9IDA7XHJcbiAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzdFRpY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhc3RUaWNrc1tpXSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RVdGlsID0gZ2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiKTtcclxuICAgICAgICAgICAgICAgIHV0aWwgKz0gbGFzdFV0aWw7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB1dGlsID0gdXRpbC9jb3VudDtcclxuICAgICAgICAgICAgICAvLyBzZXQgdXRpbGl0eSBmb3IgYWdlbnQ6aWQgdG8gYXZlcmFnZVxyXG4gICAgICAgICAgICAgIHZhciBpbmRleCA9IGdldFZhcmlhYmxlKFwidXRpbGl0eUFnZW50XCIpICsgXCI6XCIgKyBpZDtcclxuICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2luZGV4XSA9IHt9O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBibGFja2JvYXJkW2luZGV4XS51dGlsaXR5ID0gdXRpbDtcclxuICAgICAgICAgICAgICAvLyBzZXQgbGFzdCB1dGlsaXR5XHJcbiAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiLCB1dGlsKTtcclxuICAgICAgICAgICAgICAvLyByZXR1cm4gUlVOTklOR1xyXG4gICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5TVUNDRVNTKVxyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNlbGVjdG9yVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XHJcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0YXJ0IG9mIHV0aWxpdHkgY29kZVxyXG4gICAgICAgICAgICBpZiAoZ2V0VmFyaWFibGUoXCJ1dGlsaXR5Q2FsY1wiKSkge1xyXG4gICAgICAgICAgICAgIC8vdXRpbGl0eSBpcyBtYXggb2YgY2hpbGRyZW5cclxuICAgICAgICAgICAgICAvL2dldCBjb21waWxlZCB1dGlsaXR5IGZyb20gZWFjaCBjaGlsZFxyXG4gICAgICAgICAgICAgIHZhciB1dGlsID0gLTI7XHJcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3RUaWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXN0VGlja3NbaV0oKTtcclxuICAgICAgICAgICAgICAgIHZhciBsYXN0VXRpbCA9IGdldFZhcmlhYmxlKFwibGFzdFV0aWxcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFV0aWwgPiB1dGlsKSB7XHJcbiAgICAgICAgICAgICAgICAgIHV0aWwgPSBsYXN0VXRpbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLy8gc2V0IHV0aWxpdHkgZm9yIGFnZW50OmlkIHRvIG1heFxyXG4gICAgICAgICAgICAgIHZhciBpbmRleCA9IGdldFZhcmlhYmxlKFwidXRpbGl0eUFnZW50XCIpICsgXCI6XCIgKyBpZDtcclxuICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2luZGV4XSA9IHt9O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBibGFja2JvYXJkW2luZGV4XS51dGlsaXR5ID0gdXRpbDtcclxuICAgICAgICAgICAgICAvLyBzZXQgbGFzdCB1dGlsaXR5XHJcbiAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiLCB1dGlsKTtcclxuICAgICAgICAgICAgICAvLyByZXR1cm4gUlVOTklOR1xyXG4gICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xyXG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5TVUNDRVNTKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxyXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1dGlsaXR5KGY6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XHJcbiAgICByZXR1cm4gYXN0VGljaygpO1xyXG59XHJcblxyXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XHJcbiAgICByZXR1cm4gZ2V0QWN0aW9uVGljayhnbG9iYWxJZENvdW50ZXIrKykocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcclxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcclxuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXHJcbiAqIEByZXR1cm5zIHtUaWNrfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcclxuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxyXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xyXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcclxuICogQHJldHVybnMge1RpY2t9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xyXG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbi8vMC4gdXRpbGl0aWVzXHJcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmROdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG4vLzEuIHN0b3J5IGluc3RhbmNlXHJcblxyXG4vLzEuMSBsb2NhdGlvbnNcclxudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcclxuXHJcbi8vYWRkIHRvIGJvdGggc2lkZXNcclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xyXG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XHJcblxyXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcclxuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcclxuICAgIHZhciBwcmV2aW91cyA9IHt9O1xyXG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcclxuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XHJcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xyXG5cclxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcclxuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcclxuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxyXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xyXG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XHJcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59XHJcblxyXG4vLzEuMiBhZ2VudHNcclxudmFyIGFnZW50cyA9IFtdO1xyXG52YXIgcGVyc29uYWxpdHlBZ2VudHMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRBZ2VudChhZ2VudE5hbWU6IHN0cmluZykge1xyXG4gICAgYWdlbnRzLnB1c2goYWdlbnROYW1lKTtcclxuICAgIHJldHVybiBhZ2VudE5hbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRQZXJzb25hbGl0eUFnZW50KGFnZW50TmFtZTogc3RyaW5nLCBvMTogbnVtYmVyLCBvMjogbnVtYmVyLCBjMTogbnVtYmVyLFxyXG4gIGMyOiBudW1iZXIsIGUxOiBudW1iZXIsIGUyOiBudW1iZXIsIGExOiBudW1iZXIsIGEyOiBudW1iZXIsIG4xOiBudW1iZXIsIG4yOiBudW1iZXIpIHtcclxuICAgIHZhciBwZXJzb25hbGl0eSA9IHt9O1xyXG4gICAgcGVyc29uYWxpdHlbXCJuYW1lXCJdID0gYWdlbnROYW1lO1xyXG4gICAgcGVyc29uYWxpdHlbXCJvcGVubmVzc1wiXSA9IG8xO1xyXG4gICAgcGVyc29uYWxpdHlbXCJpbnRlbGxlY3RcIl0gPSBvMjtcclxuICAgIHBlcnNvbmFsaXR5W1wiaW5kdXN0cmlvdXNuZXNzXCJdID0gYzE7XHJcbiAgICBwZXJzb25hbGl0eVtcIm9yZGVybGluZXNzXCJdID0gYzI7XHJcbiAgICBwZXJzb25hbGl0eVtcImVudGh1c2lhc21cIl0gPSBlMTtcclxuICAgIHBlcnNvbmFsaXR5W1wiYXNzZXJ0aXZlbmVzc1wiXSA9IGUyO1xyXG4gICAgcGVyc29uYWxpdHlbXCJjb21wYXNzaW9uXCJdID0gYTE7XHJcbiAgICBwZXJzb25hbGl0eVtcInBvbGl0ZW5lc3NcIl0gPSBhMjtcclxuICAgIHBlcnNvbmFsaXR5W1widm9sYXRpbGl0eVwiXSA9IG4xO1xyXG4gICAgcGVyc29uYWxpdHlbXCJ3aXRoZHJhd2FsXCJdID0gbjI7XHJcbiAgICBwZXJzb25hbGl0eUFnZW50c1thZ2VudE5hbWVdID0gcGVyc29uYWxpdHk7XHJcbiAgICByZXR1cm4gYWdlbnROYW1lO1xyXG59XHJcblxyXG4vLzEuMyBpdGVtc1xyXG52YXIgaXRlbXMgPSBbXTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGl0ZW1OYW1lOiBzdHJpbmcpIHtcclxuICAgIGl0ZW1zLnB1c2goaXRlbU5hbWUpO1xyXG4gICAgcmV0dXJuIGl0ZW1OYW1lO1xyXG59XHJcblxyXG4vLzEuNCB2YXJpYWJsZXNcclxudmFyIHZhcmlhYmxlcyA9IHt9O1xyXG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcclxudmFyIGl0ZW1WYXJpYWJsZXMgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIHZhcmlhYmxlc1t2YXJOYW1lXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHZhck5hbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXHJcbiAgICAgICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdID0ge307XHJcblxyXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGFnZW50IFwiICsgYWdlbnQgKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhcmlhYmxlTm90U2V0KHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbVZhcmlhYmxlKGl0ZW06IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkpXHJcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtXSA9IHt9O1xyXG5cclxuICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0gPSB2YWx1ZTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xyXG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pIHx8IGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0pKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xyXG59XHJcblxyXG5cclxuLy8yXHJcbi8vYWdlbnQtYmVoYXZpb3IgdHJlZSBtYXBwaW5nXHJcbnZhciBhZ2VudFRyZWVzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoVHJlZVRvQWdlbnQoYWdlbnQ6IHN0cmluZywgdHJlZTogVGljaykge1xyXG4gICAgYWdlbnRUcmVlc1thZ2VudF0gPSB0cmVlO1xyXG4gICAgc2V0VmFyaWFibGUoXCJ1dGlsaXR5Q2FsY1wiLCBmYWxzZSk7XHJcbiAgICAvL2NvZGUgdG8gZGV0ZXJtaW5lIHV0aWxpdHkgaGVyZSwgb25seSBpZiBwZXJzb25hbGl0eSBhZ2VudFxyXG4gICAgaWYgKHBlcnNvbmFsaXR5QWdlbnRzW2FnZW50XSkge1xyXG4gICAgICAvL3NldFZhcmlhYmxlIHV0aWxpdHlDYWxjLCBjYWxsIHRyZWVcclxuICAgICAgc2V0VmFyaWFibGUoXCJ1dGlsaXR5Q2FsY1wiLCB0cnVlKTtcclxuICAgICAgc2V0VmFyaWFibGUoXCJ1dGlsaXR5QWdlbnRcIiwgYWdlbnQpO1xyXG4gICAgICB0cmVlKCk7XHJcbiAgICAgIHNldFZhcmlhYmxlKFwidXRpbGl0eUNhbGNcIiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8zLjFcclxuLy91c2VyIGFjdGlvbnNcclxuLy9UT0RPIGFkZCB2YXJpYWJsZXMgdG8gdXNlciBhY3Rpb24gdGV4dHNcclxudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcclxuICAgIHRleHQ6IFwiXCIsXHJcbiAgICB1c2VyQWN0aW9uc1RleHQ6IFtdLFxyXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcclxufVxyXG52YXIgdXNlckludGVyYWN0aW9uVHJlZXMgPSBbXTtcclxudmFyIHVzZXJBY3Rpb25zID0ge307XHJcblxyXG5mdW5jdGlvbiBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpIHtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcclxuICAgIHVzZXJBY3Rpb25zID0ge307Ly97XCJHbyB0byBsb2NhdGlvbiBYXCIgOiBlZmZlY3RcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24gPSAodGV4dDogc3RyaW5nKSA9PlxyXG4gICAgYWN0aW9uKFxyXG4gICAgICAgICgpID0+IHRydWUsXHJcbiAgICAgICAgKCkgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHQsIDBcclxuICAgICk7XHJcblxyXG5leHBvcnQgbGV0IGRpc3BsYXlEZXNjcmlwdGlvbkR5bmFtaWNBY3Rpb24gPSAoZnVuYzogTWVzc2FnZSkgPT5cclxuICAgIGFjdGlvbihcclxuICAgICAgICAoKSA9PiB0cnVlLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHZhciB0ZXh0ID0gZnVuYygpO1xyXG4gICAgICAgICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIDBcclxuICAgICk7XHJcblxyXG5leHBvcnQgbGV0IGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ICs9IFwiXFxuXCIgKyB0ZXh0O1xyXG5cclxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uVHJlZSA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdFRyZWU6IFRpY2spID0+IGFjdGlvbihcclxuICAgICgpID0+IHRydWUsXHJcbiAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGVmZmVjdFRyZWUpLCAwXHJcbik7XHJcblxyXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb24gPSAodGV4dDogc3RyaW5nLCBlZmZlY3Q6ICgpID0+IGFueSkgPT5cclxuICAgIGFjdGlvbihcclxuICAgICAgICAoKSA9PiB0cnVlLFxyXG4gICAgICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgYWN0aW9uKCgpPT50cnVlLCBlZmZlY3QsIDApKSwgMFxyXG4gICAgKTtcclxuXHJcbmZ1bmN0aW9uIG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dDogc3RyaW5nLCB0cmVlOiBUaWNrKSB7XHJcbiAgICB1c2VyQWN0aW9uc1t0ZXh0XSA9IHRyZWU7XHJcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0LnB1c2godGV4dCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRpY2s6IFRpY2spIHtcclxuICAgIHVzZXJJbnRlcmFjdGlvblRyZWVzLnB1c2godGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlVXNlckFjdGlvbih0ZXh0OiBzdHJpbmcpIHtcclxuICAgIC8vZXhlY3V0ZSB0aGUgdXNlciBhY3Rpb25cclxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCA9IFwiXCI7XHJcbiAgICB2YXIgdXNlckFjdGlvbkVmZmVjdFRyZWUgPSB1c2VyQWN0aW9uc1t0ZXh0XTtcclxuICAgIGV4ZWN1dGUodXNlckFjdGlvbkVmZmVjdFRyZWUpO1xyXG59XHJcblxyXG4vLzQuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpIHtcclxuICAgIHJldHVybiB1c2VySW50ZXJhY3Rpb25PYmplY3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3b3JsZFRpY2soKSB7XHJcbiAgICAvL2FsbCBhZ2VudCB0aWNrc1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldXTtcclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XHJcbiAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiZXhlY3V0aW5nQWdlbnRcIiwgYWdlbnRzW2ldKTtcclxuICAgICAgICAgICAgZXhlY3V0ZSh0cmVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgcEFnZW50cyA9IE9iamVjdC5rZXlzKHBlcnNvbmFsaXR5QWdlbnRzKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcEFnZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0cmVlID0gYWdlbnRUcmVlc1twQWdlbnRzW2ldXTtcclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XHJcbiAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiZXhlY3V0aW5nQWdlbnRcIiwgcEFnZW50c1tpXSk7XHJcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcclxufVxyXG4iXX0=
