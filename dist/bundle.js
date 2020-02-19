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
    takePotion
]);
var purchaseGather = scripting_1.sequence([
    goToWOODS,
    gatherHerbs,
    goToALCH,
    giveAlchHerbs,
    wait,
    makeOffer,
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
var moveWOODSBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) != WOODS && !scripting_1.getVariable(playerSleep); }, scripting_1.sequence([
    scripting_1.displayDescriptionAction(scripting_1.getVariable(lastAction)),
    scripting_1.addUserAction("Go to the woods.", function () { return scripting_1.setVariable(playerLocation, WOODS); }),
    scripting_1.addUserAction("Do nothing.", function () { })
]));
scripting_1.addUserInteractionTree(moveWOODSBT);
var moveALCHBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) != ALCH_HOUSE && !scripting_1.getVariable(playerSleep); }, scripting_1.sequence([
    scripting_1.displayDescriptionAction(scripting_1.getVariable(lastAction)),
    scripting_1.addUserAction("Go home.", function () { return scripting_1.setVariable(playerLocation, ALCH_HOUSE); }),
    scripting_1.addUserAction("Do nothing.", function () { })
]));
scripting_1.addUserInteractionTree(moveALCHBT);
//gather herbs
var gatherHerbsBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(herbs, "currentLocation") && !scripting_1.getVariable(playerSleep) && scripting_1.getVariable(knowHerbs); }, scripting_1.sequence([
    //displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Gather the herbs.", function () { return scripting_1.setItemVariable(herbs, "currentLocation", "player"); })
]));
scripting_1.addUserInteractionTree(gatherHerbsBT);
//make Potion
var makePotionBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ALCH_HOUSE && scripting_1.getItemVariable(herbs, "currentLocation") == "player" && !scripting_1.getVariable(playerSleep); }, scripting_1.sequence([
    //displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Make the potion.", function () { scripting_1.setItemVariable(herbs, "currentLocation", "none"); scripting_1.setItemVariable(potion, "currentLocation", "player"); })
]));
scripting_1.addUserInteractionTree(makePotionBT);
//accept offer
var acceptOfferBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getAgentVariable(tom, "currentLocation") && scripting_1.getItemVariable(potion, "currentLocation") == "player" && !scripting_1.getVariable(playerSleep) && scripting_1.getVariable(offer); }, scripting_1.sequence([
    //displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Sell the potion to Tom.", function () { scripting_1.setItemVariable(coin, "currentLocation", "player"); scripting_1.setItemVariable(potion, "currentLocation", "tom"); })
]));
scripting_1.addUserInteractionTree(acceptOfferBT);
//go to go to sleep
var sleepBT = scripting_1.guard(function () { return !scripting_1.getVariable(playerSleep); }, scripting_1.sequence([
    //displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Go to sleep.", function () { return scripting_1.setVariable(playerSleep, true); }),
]));
scripting_1.addUserInteractionTree(sleepBT);
//wake up
var wakeBT = scripting_1.guard(function () { return scripting_1.getVariable(playerPoisonTicks) == 0 && scripting_1.getVariable(playerSleep); }, scripting_1.sequence([
    scripting_1.displayDescriptionAction(scripting_1.getVariable(lastAction)),
    scripting_1.addUserAction("Wake up.", function () { return scripting_1.setVariable(playerSleep, false); }),
    scripting_1.addUserAction("Do nothing.", function () { })
]));
scripting_1.addUserInteractionTree(wakeBT);
//be poisoned
var poisonedBT = scripting_1.guard(function () { return scripting_1.getVariable(playerPoisonTicks) > 0; }, scripting_1.sequence([
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
            var proceed = negate ? !precondition() : precondition();
            return proceed ? execute(astTick) : Status.FAILURE;
        };
    };
}
function getSequenceTick(id) {
    return function (astTicks) {
        return function () {
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
var personalityAgents = [];
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
    personalityAgents.push(personality);
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
    for (var i = 0; i < personalityAgents.length; i++) {
        var tree = agentTrees[personalityAgents[i]["name"]];
        if (!util_1.isUndefined(tree)) {
            setVariable("executingAgent", personalityAgents[i]["name"]);
            execute(tree);
        }
    }
    runUserInteractionTrees();
}
exports.worldTick = worldTick;
},{"typescript-collections/dist/lib/Queue":2,"typescript-collections/dist/lib/util":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2FsY2hlbWlzdC50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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aUJBQWlCO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixXQUFXLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO0tBQ0o7SUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9DLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxrQkFBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBakJELDhCQWlCQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xudmFyIGFycmF5cyA9IHJlcXVpcmUoXCIuL2FycmF5c1wiKTtcbnZhciBMaW5rZWRMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgTGlua2VkIExpc3QuXG4gICAgICogQGNsYXNzIEEgbGlua2VkIGxpc3QgaXMgYSBkYXRhIHN0cnVjdHVyZSBjb25zaXN0aW5nIG9mIGEgZ3JvdXAgb2Ygbm9kZXNcbiAgICAgKiB3aGljaCB0b2dldGhlciByZXByZXNlbnQgYSBzZXF1ZW5jZS5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogTGFzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbGlzdFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGVsZW1lbnQgdG8gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgYWRkZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBpbmRleCBvcHRpb25hbCBpbmRleCB0byBhZGQgdGhlIGVsZW1lbnQuIElmIG5vIGluZGV4IGlzIHNwZWNpZmllZFxuICAgICAqIHRoZSBlbGVtZW50IGlzIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGFkZGVkIG9yIGZhbHNlIGlmIHRoZSBpbmRleCBpcyBpbnZhbGlkXG4gICAgICogb3IgaWYgdGhlIGVsZW1lbnQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpbmRleCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5uRWxlbWVudHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubkVsZW1lbnRzIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShpdGVtKTtcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAwIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gdGhpcy5uRWxlbWVudHMpIHtcbiAgICAgICAgICAgIC8vIEluc2VydCBhdCB0aGUgZW5kLlxuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZS5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAvLyBDaGFuZ2UgZmlyc3Qgbm9kZS5cbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZXYgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgICAgICBpZiAocHJldiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld05vZGUubmV4dCA9IHByZXYubmV4dDtcbiAgICAgICAgICAgIHByZXYubmV4dCA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcbiAgICAgKiBlbXB0eS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlyc3ROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICAqIGVtcHR5LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3ROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBkZXNpcmVkIGluZGV4LlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzXG4gICAgICogb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXgpO1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZS5lbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZVxuICAgICAqIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGUgTGlzdCBkb2VzIG5vdCBjb250YWluIHRoaXMgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgbGlzdCBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2VcbiAgICAgKiBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoaXMgbGlzdCBkb2VzIG5vdCBjb250YWluIHRoZVxuICAgICAqIGVsZW1lbnQuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIGZhbHNlXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5pbmRleE9mKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSByZW1vdmVkIGZyb20gdGhpcyBsaXN0LCBpZiBwcmVzZW50LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGxpc3QgY29udGFpbmVkIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA8IDEgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxuICAgICAqIFR3byBsaXN0cyBhcmUgZXF1YWwgaWYgdGhleSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7TGlua2VkTGlzdH0gb3RoZXIgdGhlIG90aGVyIGxpc3QuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuIElmIHRoZSBlbGVtZW50cyBpbiB0aGUgbGlzdHNcbiAgICAgKiBhcmUgY3VzdG9tIG9iamVjdHMgeW91IHNob3VsZCBwcm92aWRlIGEgZnVuY3Rpb24sIG90aGVyd2lzZVxuICAgICAqIHRoZSA9PT0gb3BlcmF0b3IgaXMgdXNlZCB0byBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbnRzLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChvdGhlciwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBMaW5rZWRMaXN0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNpemUoKSAhPT0gb3RoZXIuc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxzQXV4KHRoaXMuZmlyc3ROb2RlLCBvdGhlci5maXJzdE5vZGUsIGVxRik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xuICAgICAgICB3aGlsZSAobjEgIT09IG51bGwgJiYgbjIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gcmVtb3ZlZCBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXMgb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzIHx8IHRoaXMuZmlyc3ROb2RlID09PSBudWxsIHx8IHRoaXMubGFzdE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMSkge1xuICAgICAgICAgICAgLy9GaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5maXJzdE5vZGUubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByZXZpb3VzLm5leHQgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gbnVsbCAmJiBwcmV2aW91cy5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHByZXZpb3VzLm5leHQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gcHJldmlvdXMubmV4dC5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgbGlzdCBpbiBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2soY3VycmVudE5vZGUuZWxlbWVudCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldmVyc2VzIHRoZSBvcmRlciBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaW5rZWQgbGlzdCAobWFrZXMgdGhlIGxhc3RcbiAgICAgKiBlbGVtZW50IGZpcnN0LCBhbmQgdGhlIGZpcnN0IGVsZW1lbnQgbGFzdCkuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xuICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGVtcCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgIGN1cnJlbnQubmV4dCA9IHByZXZpb3VzO1xuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgICAgICAgICAgY3VycmVudCA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMubGFzdE5vZGU7XG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSB0ZW1wO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0IGluIHByb3BlclxuICAgICAqIHNlcXVlbmNlLlxuICAgICAqIEByZXR1cm4ge0FycmF5LjwqPn0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCxcbiAgICAgKiBpbiBwcm9wZXIgc2VxdWVuY2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goY3VycmVudE5vZGUuZWxlbWVudCk7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5cy50b1N0cmluZyh0aGlzLnRvQXJyYXkoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLm5vZGVBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gKHRoaXMubkVsZW1lbnRzIC0gMSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXggJiYgbm9kZSAhPT0gbnVsbDsgaSsrKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jcmVhdGVOb2RlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGl0ZW0sXG4gICAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gTGlua2VkTGlzdDtcbn0oKSk7IC8vIEVuZCBvZiBsaW5rZWQgbGlzdFxuZXhwb3J0cy5kZWZhdWx0ID0gTGlua2VkTGlzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZExpc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTGlua2VkTGlzdF8xID0gcmVxdWlyZShcIi4vTGlua2VkTGlzdFwiKTtcbnZhciBRdWV1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IHF1ZXVlLlxuICAgICAqIEBjbGFzcyBBIHF1ZXVlIGlzIGEgRmlyc3QtSW4tRmlyc3QtT3V0IChGSUZPKSBkYXRhIHN0cnVjdHVyZSwgdGhlIGZpcnN0XG4gICAgICogZWxlbWVudCBhZGRlZCB0byB0aGUgcXVldWUgd2lsbCBiZSB0aGUgZmlyc3Qgb25lIHRvIGJlIHJlbW92ZWQuIFRoaXNcbiAgICAgKiBpbXBsZW1lbnRhdGlvbiB1c2VzIGEgbGlua2VkIGxpc3QgYXMgYSBjb250YWluZXIuXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gUXVldWUoKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IG5ldyBMaW5rZWRMaXN0XzEuZGVmYXVsdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGFuZCByZW1vdmVzIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzLmxpc3QuZmlyc3QoKTtcbiAgICAgICAgICAgIHRoaXMubGlzdC5yZW1vdmVFbGVtZW50QXRJbmRleCgwKTtcbiAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzLCBidXQgZG9lcyBub3QgcmVtb3ZlLCB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5maXJzdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBxdWV1ZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIHN0YWNrIGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciwgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lIChwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LFxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoZWxlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5jb250YWlucyhlbGVtLCBlcXVhbHNGdW5jdGlvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGFuZCBvbmx5IGlmIHRoaXMgcXVldWUgY29udGFpbnMgbm8gaXRlbXM7IGZhbHNlXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKSA8PSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBxdWV1ZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubGlzdC5jbGVhcigpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgcXVldWUgaW5cbiAgICAgKiBGSUZPIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmxpc3QuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgfTtcbiAgICByZXR1cm4gUXVldWU7XG59KCkpOyAvLyBFbmQgb2YgcXVldWVcbmV4cG9ydHMuZGVmYXVsdCA9IFF1ZXVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UXVldWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgaXRlbVxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuNFxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSwgb3IgLTEgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnRzLmluZGV4T2YgPSBpbmRleE9mO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXkgb3IgLTEgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBsYXN0SW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnRzLmxhc3RJbmRleE9mID0gbGFzdEluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICovXG5mdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDA7XG59XG5leHBvcnRzLmNvbnRhaW5zID0gY29udGFpbnM7XG4vKipcbiAqIFJlbW92ZXMgdGhlIGZpcnN0IG9jdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgY2hhbmdlZCBhZnRlciB0aGlzIGNhbGwuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZShhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbik7XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnJlbW92ZSA9IHJlbW92ZTtcbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXkgZXF1YWxcbiAqIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIGRldGVybWluZSB0aGUgZnJlcXVlbmN5IG9mIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgd2hvc2UgZnJlcXVlbmN5IGlzIHRvIGJlIGRldGVybWluZWQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheVxuICogZXF1YWwgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZyZXF1ZW5jeShhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgdmFyIGZyZXEgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIGZyZXErKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnJlcTtcbn1cbmV4cG9ydHMuZnJlcXVlbmN5ID0gZnJlcXVlbmN5O1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHR3byBzcGVjaWZpZWQgYXJyYXlzIGFyZSBlcXVhbCB0byBvbmUgYW5vdGhlci5cbiAqIFR3byBhcnJheXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgaWYgYm90aCBhcnJheXMgY29udGFpbiB0aGUgc2FtZSBudW1iZXJcbiAqIG9mIGVsZW1lbnRzLCBhbmQgYWxsIGNvcnJlc3BvbmRpbmcgcGFpcnMgb2YgZWxlbWVudHMgaW4gdGhlIHR3b1xuICogYXJyYXlzIGFyZSBlcXVhbCBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIG9uZSBhcnJheSB0byBiZSB0ZXN0ZWQgZm9yIGVxdWFsaXR5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIHRoZSBvdGhlciBhcnJheSB0byBiZSB0ZXN0ZWQgZm9yIGVxdWFsaXR5LlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiBlbGVtZW1lbnRzIGluIHRoZSBhcnJheXMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSB0d28gYXJyYXlzIGFyZSBlcXVhbFxuICovXG5mdW5jdGlvbiBlcXVhbHMoYXJyYXkxLCBhcnJheTIsIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPT0gYXJyYXkyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBhcnJheTEubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFlcXVhbHMoYXJyYXkxW2ldLCBhcnJheTJbaV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLmVxdWFscyA9IGVxdWFscztcbi8qKlxuICogUmV0dXJucyBzaGFsbG93IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgdG8gY29weS5cbiAqIEByZXR1cm4ge0FycmF5fSBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheVxuICovXG5mdW5jdGlvbiBjb3B5KGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5LmNvbmNhdCgpO1xufVxuZXhwb3J0cy5jb3B5ID0gY29weTtcbi8qKlxuICogU3dhcHMgdGhlIGVsZW1lbnRzIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb25zIGluIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gc3dhcCBlbGVtZW50cy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpIHRoZSBpbmRleCBvZiBvbmUgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IGogdGhlIGluZGV4IG9mIHRoZSBvdGhlciBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBpcyBkZWZpbmVkIGFuZCB0aGUgaW5kZXhlcyBhcmUgdmFsaWQuXG4gKi9cbmZ1bmN0aW9uIHN3YXAoYXJyYXksIGksIGopIHtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBhcnJheS5sZW5ndGggfHwgaiA8IDAgfHwgaiA+PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xuICAgIGFycmF5W2ldID0gYXJyYXlbal07XG4gICAgYXJyYXlbal0gPSB0ZW1wO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5zd2FwID0gc3dhcDtcbmZ1bmN0aW9uIHRvU3RyaW5nKGFycmF5KSB7XG4gICAgcmV0dXJuICdbJyArIGFycmF5LnRvU3RyaW5nKCkgKyAnXSc7XG59XG5leHBvcnRzLnRvU3RyaW5nID0gdG9TdHJpbmc7XG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIGFycmF5XG4gKiBzdGFydGluZyBmcm9tIGluZGV4IDAgdG8gbGVuZ3RoIC0gMS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBpdGVyYXRlLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2spIHtcbiAgICBmb3IgKHZhciBfaSA9IDAsIGFycmF5XzEgPSBhcnJheTsgX2kgPCBhcnJheV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgZWxlID0gYXJyYXlfMVtfaV07XG4gICAgICAgIGlmIChjYWxsYmFjayhlbGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5mb3JFYWNoID0gZm9yRWFjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuZXhwb3J0cy5oYXMgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XG4gICAgcmV0dXJuIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59O1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbXBhcmUgZWxlbWVudCBvcmRlci5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZShhLCBiKSB7XG4gICAgaWYgKGEgPCBiKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdENvbXBhcmUgPSBkZWZhdWx0Q29tcGFyZTtcbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byB0ZXN0IGVxdWFsaXR5LlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRFcXVhbHMoYSwgYikge1xuICAgIHJldHVybiBhID09PSBiO1xufVxuZXhwb3J0cy5kZWZhdWx0RXF1YWxzID0gZGVmYXVsdEVxdWFscztcbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb252ZXJ0IGFuIG9iamVjdCB0byBhIHN0cmluZy5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWZhdWx0VG9TdHJpbmcoaXRlbSkge1xuICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnJHMnICsgaXRlbTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAnJG8nICsgaXRlbS50b1N0cmluZygpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdFRvU3RyaW5nID0gZGVmYXVsdFRvU3RyaW5nO1xuLyoqXG4gKiBKb2lucyBhbGwgdGhlIHByb3BlcmllcyBvZiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBqb2luIHN0cmluZ1xuICovXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIGpvaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XG4gICAgfVxufVxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyB1bmRlZmluZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcbi8qKlxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGNvbXBhcmVGdW5jdGlvbikgfHwgIWlzRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIGlmIChhIDwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGQsIHYpICogLTE7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5yZXZlcnNlQ29tcGFyZUZ1bmN0aW9uID0gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbjtcbi8qKlxuICogUmV0dXJucyBhbiBlcXVhbCBmdW5jdGlvbiBnaXZlbiBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gY29tcGFyZVRvRXF1YWxzKGNvbXBhcmVGdW5jdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gY29tcGFyZUZ1bmN0aW9uKGEsIGIpID09PSAwO1xuICAgIH07XG59XG5leHBvcnRzLmNvbXBhcmVUb0VxdWFscyA9IGNvbXBhcmVUb0VxdWFscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiLyogLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNjcmlwdGluZy50c1wiLz4gKi9cclxuaW1wb3J0IHtcclxuICAgIGFkZEFnZW50LCBhZGRQZXJzb25hbGl0eUFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxyXG4gICAgZ2V0UmFuZE51bWJlciwgZ2V0VmFyaWFibGUsIHNlcXVlbmNlLCBzZWxlY3RvciwgZXhlY3V0ZSwgUHJlY29uZGl0aW9uLCBnZXRBZ2VudFZhcmlhYmxlLCBuZWdfZ3VhcmQsIGd1YXJkLFxyXG4gICAgaXNWYXJpYWJsZU5vdFNldCwgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uLCBhZGRVc2VyQWN0aW9uLCBhZGRVc2VySW50ZXJhY3Rpb25UcmVlLCBpbml0aWFsaXplLFxyXG4gICAgZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXHJcbiAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dCwgYXJlQWRqYWNlbnQsIGFkZFVzZXJBY3Rpb25UcmVlXHJcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcclxuXHJcbi8vIDEuIERlZmluZSBTdGF0ZVxyXG4vLyBsb2NhdGlvbnNcclxudmFyIFRPTV9IT1VTRSA9IFwiVE9NX0hPVVNFXCI7XHJcbnZhciBBTENIX0hPVVNFID0gXCJBTENIX0hPVVNFXCI7XHJcbnZhciBXT09EUyA9IFwiV09PRFNcIjtcclxuXHJcblxyXG5hZGRMb2NhdGlvbihUT01fSE9VU0UsIFtXT09EUywgQUxDSF9IT1VTRV0pO1xyXG5hZGRMb2NhdGlvbihBTENIX0hPVVNFLCBbV09PRFMsIFRPTV9IT1VTRV0pO1xyXG5hZGRMb2NhdGlvbihXT09EUywgW1RPTV9IT1VTRSwgQUxDSF9IT1VTRV0pO1xyXG5cclxuLy8gYWdlbnRzXHJcbnZhciB0b20gPSBhZGRQZXJzb25hbGl0eUFnZW50KFwidG9tXCIsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDApO1xyXG5cclxuLy8gaXRlbXNcclxudmFyIGhlcmJzID0gYWRkSXRlbShcImhlcmJzXCIpO1xyXG52YXIgcG90aW9uID0gYWRkSXRlbShcInBvdGlvblwiKTtcclxudmFyIGNvaW4gPSBhZGRJdGVtKFwiY29pblwiKTtcclxudmFyIGZvcm11bGEgPSBhZGRJdGVtKFwiZm9ybXVsYVwiKTtcclxudmFyIHBvaXNvbiA9IGFkZEl0ZW0oXCJwb2lzb25cIik7XHJcbnNldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIiwgV09PRFMpO1xyXG5zZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJ0b21cIik7XHJcbnNldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIsIFwibm9uZVwiKTtcclxuc2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIsIEFMQ0hfSE9VU0UpO1xyXG5zZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiLCBBTENIX0hPVVNFKTtcclxuXHJcbi8vIHZhcmlhYmxlc1xyXG4vL2FsaWVuXHJcbnNldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiLCBUT01fSE9VU0UpO1xyXG4vL3BsYXllclxyXG52YXIgcGxheWVyTG9jYXRpb24gPSBzZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIsIEFMQ0hfSE9VU0UpO1xyXG52YXIgcGxheWVyU2xlZXAgPSBzZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIsIGZhbHNlKTtcclxudmFyIHBsYXllclBvaXNvblRpY2tzID0gc2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiLCAwKTtcclxudmFyIGtub3dIZXJicyA9IHNldFZhcmlhYmxlKFwia25vd0hlcmJzXCIsIGZhbHNlKTtcclxudmFyIG9mZmVyID0gc2V0VmFyaWFibGUoXCJvZmZlclwiLCBmYWxzZSk7XHJcbnZhciBjdXJlID0gc2V0VmFyaWFibGUoXCJjdXJlXCIsIGZhbHNlKTtcclxudmFyIGxhc3RBY3Rpb24gPSBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gaXMgYXQgaGlzIGhvbWUuXCIpO1xyXG5cclxuLy8gMi4gRGVmaW5lIEJUc1xyXG4vLyBtb3ZlbWVudCBhY3Rpb25zXHJcbmxldCBnb1RvVE9NUyA9IGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XHJcbiAgICBzZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIiwgVE9NX0hPVVNFKTtcclxuICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSBpcyBhdDogXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJUb20gaXMgYXQ6IFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbn0sIDEpO1xyXG5sZXQgZ29Ub0FMQ0ggPSBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xyXG4gICAgc2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIsIEFMQ0hfSE9VU0UpO1xyXG4gICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIGlzIGF0OiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSlcclxuICAgIGNvbnNvbGUubG9nKFwiVG9tIGlzIGF0OiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKGhlcmJzICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKGZvcm11bGEgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlBvaXNvbiBUaWNrc1wiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkN1cmVcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJjdXJlXCIpKVxyXG59LCAxKTtcclxubGV0IGdvVG9XT09EUyA9IGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XHJcbiAgICBzZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIiwgV09PRFMpO1xyXG4gICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIGlzIGF0OiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSlcclxuICAgIGNvbnNvbGUubG9nKFwiVG9tIGlzIGF0OiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKGhlcmJzICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKGZvcm11bGEgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlBvaXNvbiBUaWNrc1wiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkN1cmVcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJjdXJlXCIpKVxyXG59LCAxKTtcclxuXHJcblxyXG4vL290aGVyIGFjdGlvbnNcclxuLy93YWl0XHJcbmxldCB3YWl0ID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gdHJ1ZSxcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gd2FpdHMgZm9yIHRoaXMgdHVybi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUb20gd2FpdHMgZm9yIHRoaXMgdHVybi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9tICsgXCIgXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGhlcmJzICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2luICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm11bGEgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG9pc29uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBvaXNvbiBUaWNrc1wiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIktub3cgSGVyYlwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImtub3dIZXJic1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cmVcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJjdXJlXCIpKVxyXG4gICAgfSxcclxuICAgIDFcclxuKTtcclxuXHJcbi8vdGVsbCB0aGUgYWxjaGVtaXN0IGFib3V0IHRoZSBoZXJic1xyXG5sZXQgdGVsbEFsY2hBYm91dEhlcmJzID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikgJiYgIWdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikgJiYgIWdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwia25vd0hlcmJzXCIsIHRydWUpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSB0ZWxscyB5b3Ugd2hlcmUgeW91IGNhbiBmaW5kIGhlcmJzIHRvIG1ha2UgYSBoZWFsaW5nIHBvdGlvbi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUb20gdGVsbHMgeW91IHdoZXJlIHlvdSBjYW4gZmluZCBoZXJicyB0byBtYWtlIGEgaGVhbGluZyBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxuICAgIH0sXHJcbiAgICAxXHJcbik7XHJcblxyXG4vL2dhdGhlciB0aGUgaGVyYnNcclxubGV0IGdhdGhlckhlcmJzID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpID09IFdPT0RTICYmIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gV09PRFMsXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgc2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInRvbVwiKTtcclxuICAgICAgICBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gZ2F0aGVycyB0aGUgaGVyYnMgaW4gdGhlIHdvb2RzLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSBnYXRoZXJzIHRoZSBoZXJicyBpbiB0aGUgd29vZHMuXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxuICAgIH0sXHJcbiAgICAxXHJcbik7XHJcblxyXG4vL2dpdmUgYWxjaGVtaXN0IHRoZSBoZXJic1xyXG5sZXQgZ2l2ZUFsY2hIZXJicyA9IGFjdGlvbihcclxuICAgICgpID0+IGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpICYmICFnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpICYmIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gXCJ0b21cIixcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSBnaXZlcyB5b3UgaGVyYnMgdG8gbWFrZSBhIGhlYWxpbmcgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSBnaXZlcyB5b3UgaGVyYnMgdG8gbWFrZSBhIGhlYWxpbmcgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbiAgICB9LFxyXG4gICAgMVxyXG4pO1xyXG5cclxuLy9zdGVhbCBmb3JtdWxhXHJcbmxldCBzdGVhbEZvcm11bGEgPSBhY3Rpb24oXHJcbiAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gQUxDSF9IT1VTRSAmJiAoZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSAhPSBBTENIX0hPVVNFIHx8IGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpICYmIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBBTENIX0hPVVNFLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInRvbVwiKTtcclxuICAgICAgICBzZXRWYXJpYWJsZShcImxhc3RBY3Rpb25cIiwgXCJUb20gc3RlYWxzIHRoZSBmb3JtdWxhIGZvciB0aGUgaGVhbGluZyBwb3Rpb24uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVG9tIHN0ZWFscyB0aGUgZm9ybXVsYSBmb3IgdGhlIGhlYWxpbmcgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbiAgICB9LFxyXG4gICAgMVxyXG4pO1xyXG5cclxuLy9zdGVhbCBwb2lzb25cclxubGV0IHN0ZWFsUG9pc29uID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpID09IEFMQ0hfSE9VU0UgJiYgKGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikgIT0gQUxDSF9IT1VTRSB8fCBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKSAmJiBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBBTENIX0hPVVNFLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIsIFwidG9tXCIpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSBzdGVhbHMgcG9pc29uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSBzdGVhbHMgcG9pc29uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbiAgICB9LFxyXG4gICAgMVxyXG4pO1xyXG5cclxuLy9wb2lzb24gYWxjaGVtaXN0XHJcbmxldCBwb2lzb25BbGNoID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikgJiYgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gXCJ0b21cIixcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiLCB0cnVlKTtcclxuICAgICAgICBzZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIsIDUpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSBwb2lzb25zIHlvdS5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUb20gcG9pc29ucyB5b3UuXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRvbSArIFwiIFwiICsgZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFsY2hlbWlzdFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoZXJicyArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY29pbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb3Rpb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhmb3JtdWxhICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoZm9ybXVsYSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvaXNvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvaXNvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2xlZXBcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJTbGVlcFwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQb2lzb24gVGlja3NcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJQb2lzb25UaWNrc1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJLbm93IEhlcmJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJrbm93SGVyYnNcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT2ZmZXJcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJvZmZlclwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDdXJlXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwiY3VyZVwiKSlcclxuICAgIH0sXHJcbiAgICAxXHJcbik7XHJcblxyXG4vL21ha2UgcG90aW9uXHJcbmxldCBtYWtlUG90aW9uID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpID09IFwidG9tXCIgJiYgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBcInRvbVwiLFxyXG4gICAgKCkgPT4ge1xyXG4gICAgICAgIHNldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJub25lXCIpO1xyXG4gICAgICAgIHNldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIsIFwidG9tXCIpO1xyXG4gICAgICAgIHNldFZhcmlhYmxlKFwibGFzdEFjdGlvblwiLCBcIlRvbSBtYWtlcyB0aGUgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSBtYWtlcyB0aGUgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbiAgICB9LFxyXG4gICAgMVxyXG4pO1xyXG5cclxuLy9zdGVhbFBvdGlvblxyXG5sZXQgc3RlYWxQb3Rpb24gPSBhY3Rpb24oXHJcbiAgICAoKSA9PiBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSAmJiBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpICYmIGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpID09IFwicGxheWVyXCIsXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgc2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJ0b21cIik7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIHN0ZWFscyB0aGUgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSBzdGVhbHMgdGhlIHBvdGlvbi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9tICsgXCIgXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGhlcmJzICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2luICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm11bGEgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG9pc29uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBvaXNvbiBUaWNrc1wiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIktub3cgSGVyYlwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImtub3dIZXJic1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cmVcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJjdXJlXCIpKVxyXG4gICAgfSxcclxuICAgIDFcclxuKTtcclxuXHJcbi8vbWFrZSBvZmZlclxyXG5sZXQgbWFrZU9mZmVyID0gYWN0aW9uKFxyXG4gICAgKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZSh0b20sIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikgJiYgIWdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikgJiYgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gXCJwbGF5ZXJcIiAmJiBnZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gXCJ0b21cIixcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRWYXJpYWJsZShvZmZlciwgdHJ1ZSk7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIG9mZmVycyB0byBidXkgdGhlIHBvdGlvbi5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUb20gb2ZmZXJzIHRvIGJ1eSB0aGUgcG90aW9uLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0b20gKyBcIiBcIiArIGdldEFnZW50VmFyaWFibGUodG9tLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGNoZW1pc3RcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGVyYnMgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShoZXJicywgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvaW4gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShjb2luLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG90aW9uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZm9ybXVsYSArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKGZvcm11bGEsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhwb2lzb24gKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShwb2lzb24sIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNsZWVwXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyU2xlZXBcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9pc29uIFRpY2tzXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyUG9pc29uVGlja3NcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiS25vdyBIZXJiXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwia25vd0hlcmJzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk9mZmVyXCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwib2ZmZXJcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3VyZVwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImN1cmVcIikpXHJcbiAgICB9LFxyXG4gICAgMVxyXG4pO1xyXG5cclxuLy90YWtlIHBvdGlvblxyXG5sZXQgdGFrZVBvdGlvbiA9IGFjdGlvbihcclxuICAgICgpID0+IGdldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIpID09IHRvbSxcclxuICAgICgpID0+IHtcclxuICAgICAgICBzZXRWYXJpYWJsZShjdXJlLCB0cnVlKTtcclxuICAgICAgICBzZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0QWN0aW9uXCIsIFwiVG9tIHRha2VzIHRoZSBwb3Rpb24gYW5kIGlzIGN1cmVkLlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvbSB0YWtlcyB0aGUgcG90aW9uIGFuZCBpcyBjdXJlZC5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codG9tICsgXCIgXCIgKyBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxjaGVtaXN0XCIgKyBcIiBcIiArIGdldFZhcmlhYmxlKFwicGxheWVyTG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGhlcmJzICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoaGVyYnMsIFwiY3VycmVudExvY2F0aW9uXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2luICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUoY29pbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBvdGlvbiArIFwiIFwiICsgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZvcm11bGEgKyBcIiBcIiArIGdldEl0ZW1WYXJpYWJsZShmb3JtdWxhLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocG9pc29uICsgXCIgXCIgKyBnZXRJdGVtVmFyaWFibGUocG9pc29uLCBcImN1cnJlbnRMb2NhdGlvblwiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTbGVlcFwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclNsZWVwXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBvaXNvbiBUaWNrc1wiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcInBsYXllclBvaXNvblRpY2tzXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIktub3cgSGVyYlwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcImtub3dIZXJic1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPZmZlclwiICsgXCIgXCIgKyBnZXRWYXJpYWJsZShcIm9mZmVyXCIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkN1cmVcIiArIFwiIFwiICsgZ2V0VmFyaWFibGUoXCJjdXJlXCIpKVxyXG4gICAgfSxcclxuICAgIDFcclxuKTtcclxuXHJcbi8vIGRlc2NyaXB0aW9uIHdyYXBwZXJzXHJcbi8vIGNvbWluZyBzb29uXHJcblxyXG4vLyBjcmVhdGUgYmVoYXZpb3IgdHJlZXNcclxubGV0IHRyeVN0ZWFsRm9ybXVsYSA9IHNlbGVjdG9yKFtcclxuICAgIHN0ZWFsRm9ybXVsYSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICBwb2lzb25BbGNoLCBzdGVhbEZvcm11bGEsXHJcbiAgICBdKVxyXG5dKTtcclxuXHJcbmxldCB0cnlTdGVhbFBvdGlvbiA9IHNlbGVjdG9yKFtcclxuICAgIHN0ZWFsUG90aW9uLFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgIHBvaXNvbkFsY2gsIHN0ZWFsUG90aW9uLFxyXG4gICAgXSlcclxuXSk7XHJcblxyXG5sZXQgc3RlYWxDcmFmdCA9IHNlcXVlbmNlKFtcclxuICBnb1RvV09PRFMsXHJcbiAgZ2F0aGVySGVyYnMsXHJcbiAgZ29Ub0FMQ0gsXHJcbiAgdGVsbEFsY2hBYm91dEhlcmJzLFxyXG4gIHN0ZWFsUG9pc29uLFxyXG4gIHdhaXQsXHJcbiAgcG9pc29uQWxjaCxcclxuICB0cnlTdGVhbEZvcm11bGEsXHJcbiAgbWFrZVBvdGlvbixcclxuICB0YWtlUG90aW9uXHJcbl0pO1xyXG5cclxubGV0IHN0ZWFsQWxjaCA9IHNlcXVlbmNlKFtcclxuICBnb1RvQUxDSCxcclxuICB0ZWxsQWxjaEFib3V0SGVyYnMsXHJcbiAgc3RlYWxQb2lzb24sXHJcbiAgd2FpdCxcclxuICB3YWl0LFxyXG4gIHBvaXNvbkFsY2gsXHJcbiAgdHJ5U3RlYWxQb3Rpb24sXHJcbiAgdGFrZVBvdGlvblxyXG5dKTtcclxuXHJcbmxldCBwdXJjaGFzZSA9IHNlcXVlbmNlKFtcclxuICBnb1RvQUxDSCxcclxuICB0ZWxsQWxjaEFib3V0SGVyYnMsXHJcbiAgd2FpdCxcclxuICB3YWl0LFxyXG4gIHdhaXQsXHJcbiAgd2FpdCxcclxuICBtYWtlT2ZmZXIsXHJcbiAgdGFrZVBvdGlvblxyXG5dKTtcclxuXHJcbmxldCBwdXJjaGFzZUdhdGhlciA9IHNlcXVlbmNlKFtcclxuICBnb1RvV09PRFMsXHJcbiAgZ2F0aGVySGVyYnMsXHJcbiAgZ29Ub0FMQ0gsXHJcbiAgZ2l2ZUFsY2hIZXJicyxcclxuICB3YWl0LFxyXG4gIG1ha2VPZmZlcixcclxuICB0YWtlUG90aW9uXHJcbl0pO1xyXG5cclxubGV0IHRvbUJUID0gc2VsZWN0b3IoW1xyXG4gIHB1cmNoYXNlR2F0aGVyLFxyXG4gIHB1cmNoYXNlLFxyXG4gIHN0ZWFsQWxjaCxcclxuICBzdGVhbENyYWZ0XHJcbl0pO1xyXG5cclxuLy9hdHRhY2ggYmVoYXZpb3VyIHRyZWVzIHRvIGFnZW50c1xyXG5hdHRhY2hUcmVlVG9BZ2VudCh0b20sIHRvbUJUKTtcclxuXHJcbi8vIDMuIENvbnN0cnVjdCBzdG9yeVxyXG4vLyBjcmVhdGUgdXNlciBhY3Rpb25zXHJcblxyXG52YXIgbW92ZVdPT0RTQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgIT0gV09PRFMgJiYgIWdldFZhcmlhYmxlKHBsYXllclNsZWVwKSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKGdldFZhcmlhYmxlKGxhc3RBY3Rpb24pKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdvIHRvIHRoZSB3b29kcy5cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFdPT0RTKSksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJEbyBub3RoaW5nLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShtb3ZlV09PRFNCVCk7XHJcbnZhciBtb3ZlQUxDSEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pICE9IEFMQ0hfSE9VU0UgJiYgIWdldFZhcmlhYmxlKHBsYXllclNsZWVwKSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKGdldFZhcmlhYmxlKGxhc3RBY3Rpb24pKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdvIGhvbWUuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBBTENIX0hPVVNFKSksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJEbyBub3RoaW5nLlwiLCAoKSA9PiB7fSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShtb3ZlQUxDSEJUKTtcclxuLy9nYXRoZXIgaGVyYnNcclxudmFyIGdhdGhlckhlcmJzQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSAmJiAhZ2V0VmFyaWFibGUocGxheWVyU2xlZXApICYmIGdldFZhcmlhYmxlKGtub3dIZXJicyksXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIC8vZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2NraW5nIHN0YXRpb24uXCIpLFxyXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiR2F0aGVyIHRoZSBoZXJicy5cIiwgKCkgPT4gc2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInBsYXllclwiKSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShnYXRoZXJIZXJic0JUKTtcclxuLy9tYWtlIFBvdGlvblxyXG52YXIgbWFrZVBvdGlvbkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEFMQ0hfSE9VU0UgJiYgZ2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiKSA9PSBcInBsYXllclwiICYmICFnZXRWYXJpYWJsZShwbGF5ZXJTbGVlcCksXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIC8vZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBkb2NraW5nIHN0YXRpb24uXCIpLFxyXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTWFrZSB0aGUgcG90aW9uLlwiLCAoKSA9PiB7c2V0SXRlbVZhcmlhYmxlKGhlcmJzLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcIm5vbmVcIik7IHNldEl0ZW1WYXJpYWJsZShwb3Rpb24sIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpfSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShtYWtlUG90aW9uQlQpO1xyXG4vL2FjY2VwdCBvZmZlclxyXG52YXIgYWNjZXB0T2ZmZXJCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBnZXRBZ2VudFZhcmlhYmxlKHRvbSwgXCJjdXJyZW50TG9jYXRpb25cIikgJiYgZ2V0SXRlbVZhcmlhYmxlKHBvdGlvbiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gXCJwbGF5ZXJcIiAmJiAhZ2V0VmFyaWFibGUocGxheWVyU2xlZXApICYmIGdldFZhcmlhYmxlKG9mZmVyKSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgLy9kaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGRvY2tpbmcgc3RhdGlvbi5cIiksXHJcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTZWxsIHRoZSBwb3Rpb24gdG8gVG9tLlwiLCAoKSA9PiB7c2V0SXRlbVZhcmlhYmxlKGNvaW4sIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpOyBzZXRJdGVtVmFyaWFibGUocG90aW9uLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInRvbVwiKX0pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoYWNjZXB0T2ZmZXJCVCk7XHJcbi8vZ28gdG8gZ28gdG8gc2xlZXBcclxudmFyIHNsZWVwQlQgPSBndWFyZCgoKSA9PiAhZ2V0VmFyaWFibGUocGxheWVyU2xlZXApLFxyXG4gICAgc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAvL2Rpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZG9ja2luZyBzdGF0aW9uLlwiKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkdvIHRvIHNsZWVwLlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJTbGVlcCwgdHJ1ZSkpLFxyXG4gICAgICAgIF1cclxuICAgICkpO1xyXG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHNsZWVwQlQpO1xyXG4vL3dha2UgdXBcclxudmFyIHdha2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllclBvaXNvblRpY2tzKSA9PSAwICYmIGdldFZhcmlhYmxlKHBsYXllclNsZWVwKSxcclxuICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKGdldFZhcmlhYmxlKGxhc3RBY3Rpb24pKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIldha2UgdXAuXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllclNsZWVwLCBmYWxzZSkpLFxyXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRG8gbm90aGluZy5cIiwgKCkgPT4ge30pXHJcbiAgICAgICAgXVxyXG4gICAgKSk7XHJcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUod2FrZUJUKTtcclxuLy9iZSBwb2lzb25lZFxyXG52YXIgcG9pc29uZWRCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllclBvaXNvblRpY2tzKSA+IDAsXHJcbiAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBhcmUgcG9pc29uZWQuIFwiKSxcclxuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKGdldFZhcmlhYmxlKGxhc3RBY3Rpb24pKSxcclxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkRvIG5vdGhpbmcuXCIsICgpID0+IHtzZXRWYXJpYWJsZShwbGF5ZXJQb2lzb25UaWNrcywgZ2V0VmFyaWFibGUocGxheWVyUG9pc29uVGlja3MpLTEpfSlcclxuICAgICAgICBdXHJcbiAgICApKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShwb2lzb25lZEJUKTtcclxudmFyIGdhbWVPdmVyID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoY3VyZSksXHJcbiAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUb20gaXMgY3VyZWQhXCIpKTtcclxuYWRkVXNlckludGVyYWN0aW9uVHJlZShnYW1lT3Zlcik7XHJcblxyXG4vLzQuIFJ1biB0aGUgd29ybGRcclxuaW5pdGlhbGl6ZSgpO1xyXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCk7XHJcblxyXG4vL1JFTkRFUklORy0tLS0tXHJcbnZhciBkaXNwbGF5UGFuZWwgPSB7eDogNTAwLCB5OiAwfTtcclxudmFyIHRleHRQYW5lbCA9IHt4OiA1MDAsIHk6IDM1MH07XHJcbnZhciBhY3Rpb25zUGFuZWwgPSB7eDogNTIwLCB5OiA0MjV9O1xyXG5cclxudmFyIGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKTtcclxudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbnZhciBzcGFjZXNoaXBJbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5zcGFjZXNoaXBJbWFnZS5vbmxvYWQgPSByZW5kZXI7XHJcbi8vdmFyIHBsYXllckltYWdlID0gbmV3IEltYWdlKCk7XHJcbi8vdmFyIGFsaWVuSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAvL2NvbnRleHQuZHJhd0ltYWdlKHNwYWNlc2hpcEltYWdlLCBkaXNwbGF5UGFuZWwueCwgZGlzcGxheVBhbmVsLnksIDUwMCwgMzAwKTtcclxuICAgIC8vIGRpc3BsYXlQbGF5ZXIoKTtcclxuICAgIC8vIGRpc3BsYXlBbGllbigpO1xyXG4gICAgZGlzcGxheVRleHRBbmRBY3Rpb25zKCk7XHJcbn1cclxuXHJcbi8vIHZhciBtYXBQb3NpdGlvbnMgPSB7XHJcbi8vICAgICBcIlNUQVJUXCI6IHt4OiAyMzAsIHk6IDIzNX0sXHJcbi8vICAgICBcIkJDX0NPUlJJRE9SXCI6IHt4OiAyNDAsIHk6IDIxMH0sXHJcbi8vICAgICBcIkJSX0NPUlJJRE9SXCI6IHt4OiAzMDAsIHk6IDE5MH0sXHJcbi8vICAgICBcIk1SX0NPUlJJRE9SXCI6IHt4OiAzMDUsIHk6IDE1MH0sXHJcbi8vICAgICBcIlFVQVJURVJTMlwiOiB7eDogMzQwLCB5OiAxNTV9LFxyXG4vLyAgICAgXCJRVUFSVEVSUzFcIjoge3g6IDM0MCwgeTogMTkwfSxcclxuLy8gICAgIFwiVFJfQ09SUklET1JcIjoge3g6IDMwMCwgeTogMTAwfSxcclxuLy8gICAgIFwiVENfQ09SUklET1JcIjoge3g6IDIzMCwgeTogMTAwfSxcclxuLy8gICAgIFwiVExfQ09SUklET1JcIjoge3g6IDE3MCwgeTogMTAwfSxcclxuLy8gICAgIFwiRVhJVF9FTEVWQVRPUlwiOiB7eDogMjMwLCB5OiA2MH0sXHJcbi8vICAgICBcIkxBQlwiOiB7eDogMjQwLCB5OiAxNzB9LFxyXG4vLyAgICAgXCJNTF9DT1JSSURPUlwiOiB7eDogMTYwLCB5OiAxNTB9LFxyXG4vLyAgICAgXCJCTF9DT1JSSURPUlwiOiB7eDogMTYwLCB5OiAyMDB9LFxyXG4vLyAgICAgXCJFTkdJTkVTXCI6IHt4OiAxNzAsIHk6IDYwfSxcclxuLy8gICAgIFwiQ09DS1BJVFwiOiB7eDogMTIwLCB5OiA2MH0sXHJcbi8vICAgICBcIkNPTU1TXCI6IHt4OiAxMjAsIHk6IDEwMH0sXHJcbi8vICAgICBcIk1FRElDQUxcIjoge3g6IDI1MCwgeTogMTMwfSxcclxuLy8gICAgIFwiU1RPUkFHRVwiOiB7eDogMjAwLCB5OiAxNTB9XHJcbi8vIH07XHJcbi8vXHJcbi8vIGZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXIoKSB7XHJcbi8vICAgICB2YXIgY3VycmVudExvY2F0aW9uID0gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pO1xyXG4vLyAgICAgaWYgKCFpc1VuZGVmaW5lZChtYXBQb3NpdGlvbnNbY3VycmVudExvY2F0aW9uXSkpXHJcbi8vICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UocGxheWVySW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJlbnRMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VycmVudExvY2F0aW9uXS55LCAxNiwgMTYpO1xyXG4vLyB9XHJcbi8vXHJcbi8vIGZ1bmN0aW9uIGRpc3BsYXlBbGllbigpIHtcclxuLy8gICAgIHZhciBjdXJyZW50TG9jYXRpb24gPSBnZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiKTtcclxuLy8gICAgIGNvbnRleHQuZHJhd0ltYWdlKGFsaWVuSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJlbnRMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VycmVudExvY2F0aW9uXS55LCAyNCwgMjQpO1xyXG4vLyB9XHJcbi8vXHJcbiBzcGFjZXNoaXBJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9pc29sYXRpb25fbWFwLnBuZ1wiO1xyXG4vLyBwbGF5ZXJJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9wbGF5ZXIyLnBuZ1wiO1xyXG4vLyBhbGllbkltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL3hlbm9tb3JwaC5wbmdcIjtcclxuXHJcbnZhciBjdXJyZW50U2VsZWN0aW9uO1xyXG52YXIgeU9mZnNldCA9IGFjdGlvbnNQYW5lbC55ICsgMjU7XHJcbnZhciB5T2Zmc2V0SW5jcmVtZW50ID0gNTA7XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VGV4dEFuZEFjdGlvbnMoKSB7XHJcbiAgICBjb250ZXh0LmNsZWFyUmVjdCh0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnksIDUwMCwgMTAwMCk7XHJcbiAgICB5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcclxuXHJcbiAgICBjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgY29uc29sZS5sb2coXCJBY3Rpb25zIGVmZmVjdCB0ZXh0OiBcIiArIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCk7XHJcbiAgICB2YXIgdGV4dFRvRGlzcGxheSA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dC5sZW5ndGggIT0gMCA/IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCA6IHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0O1xyXG4gICAgY29udGV4dC5maWxsVGV4dCh0ZXh0VG9EaXNwbGF5LCB0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnkgKyAyMCk7XHJcblxyXG4gICAgY29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB1c2VyQWN0aW9uVGV4dCA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHRbaV07XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCh1c2VyQWN0aW9uVGV4dCwgYWN0aW9uc1BhbmVsLnggKyAyMCwgeU9mZnNldCk7XHJcbiAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uID0gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeU9mZnNldCArPSB5T2Zmc2V0SW5jcmVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlBcnJvdygpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJDcmV3IGNhcmRzOiBcIiArIGdldFZhcmlhYmxlKGNyZXdDYXJkc0NvbGxlY3RlZCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QXJyb3coKSB7XHJcbiAgICBpZih1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKXtcclxuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdChhY3Rpb25zUGFuZWwueCwgYWN0aW9uc1BhbmVsLnksIDIwLCAxMDAwKTtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KFwiPiBcIiwgNTIwLCBhY3Rpb25zUGFuZWwueSArIDI1ICsgKGN1cnJlbnRTZWxlY3Rpb24gKiB5T2Zmc2V0SW5jcmVtZW50KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vVXNlciBpbnB1dFxyXG5mdW5jdGlvbiBrZXlQcmVzcyhlKSB7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkQWN0aW9uID0gdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dFtjdXJyZW50U2VsZWN0aW9uXTtcclxuICAgICAgICBpZighaXNVbmRlZmluZWQoc2VsZWN0ZWRBY3Rpb24pKXtcclxuICAgICAgICAgICAgZXhlY3V0ZVVzZXJBY3Rpb24oc2VsZWN0ZWRBY3Rpb24pO1xyXG4gICAgICAgICAgICB3b3JsZFRpY2soKTtcclxuICAgICAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBrZXlEb3duKGUpIHtcclxuICAgIGlmIChlLmtleUNvZGUgPT0gNDApIHsvL2Rvd25cclxuICAgICAgICBpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uKys7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50U2VsZWN0aW9uICUgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGRpc3BsYXlBcnJvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDM4KSB7Ly91cFxyXG4gICAgICAgIGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24tLTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24gPCAwKVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgZGlzcGxheUFycm93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwga2V5UHJlc3MsIGZhbHNlKTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93biwgZmFsc2UpO1xyXG4iLCJpbXBvcnQgUXVldWUgZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWVcIjtcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcblxuZXhwb3J0IGVudW0gU3RhdHVzIHtcbiAgICBSVU5OSU5HLFxuICAgIFNVQ0NFU1MsXG4gICAgRkFJTFVSRVxufVxuXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcbiAgICByZXR1cm4gc3RhdHVzO1xufVxuXG5leHBvcnQgdHlwZSBFZmZlY3QgPSAoKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBQcmVjb25kaXRpb24gPSAoKSA9PiBib29sZWFuXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXG5leHBvcnQgdHlwZSBBY3Rpb25UaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcikgPT4gVGlja1xuLyoqXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xuICovXG5leHBvcnQgdHlwZSBHdWFyZFRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcbi8qKlxuICogU2VxdWVuY2UvU2VsZWN0b3JcbiAqL1xuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXG5cbnZhciBibGFja2JvYXJkID0ge307XG5cbmZ1bmN0aW9uIGdldEFjdGlvblRpY2soaWQ6IG51bWJlcik6IEFjdGlvblRpY2sge1xuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQgPSAxKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJlY29uZGl0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgYXN0VGljaywgbmVnYXRlID0gZmFsc2UpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2VlZCA/IGV4ZWN1dGUoYXN0VGljaykgOiBTdGF0dXMuRkFJTFVSRTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4IDwgYXN0VGlja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuUlVOTklORylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RvclRpY2soaWQ6IG51bWJlcik6IENvbXBvc2l0ZVRpY2sge1xuICAgIHJldHVybiAoYXN0VGlja3MpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlKGFzdFRpY2s6IFRpY2spOiBTdGF0dXMge1xuICAgIHJldHVybiBhc3RUaWNrKCk7XG59XG5cbnZhciBnbG9iYWxJZENvdW50ZXIgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gYWN0aW9uKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcik6IFRpY2sge1xuICAgIHJldHVybiBnZXRBY3Rpb25UaWNrKGdsb2JhbElkQ291bnRlcisrKShwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGd1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdfZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrLCB0cnVlKTtcbn1cblxuLyoqXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIHN1Y2Nlc3Mgb2YgYSBjaGlsZFxuICogU3VjY2VlZHMgaWYgYWxsIHN1Y2NlZWQsIGVsc2UgZmFpbHNcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xuICogQHJldHVybnMge1RpY2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShhc3RUaWNrczogVGlja1tdKTogVGljayB7XG4gICAgcmV0dXJuIGdldFNlcXVlbmNlVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xufVxuXG4vKipcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gZmFpbHVyZSBvZiBhIGNoaWxkKHRoaW5rIG9mIGl0IGFzIGlmLWVsc2UgYmxvY2tzKVxuICogU3VjY2VlZHMgaWYgZXZlbiBvbmUgc3VjY2VlZHMsIGVsc2UgZmFpbHNcbiAqIEBwYXJhbSB7VGlja1tdfSBhc3RUaWNrc1xuICogQHJldHVybnMge1RpY2t9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rvcihhc3RUaWNrczogVGlja1tdKTogVGljayB7XG4gICAgcmV0dXJuIGdldFNlbGVjdG9yVGljayhnbG9iYWxJZENvdW50ZXIrKykoYXN0VGlja3MpO1xufVxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tIEFQSXMgLS0tLS0tLS0tLS0tLS0tICovXG5cbi8vMC4gdXRpbGl0aWVzXG4vLyBtaW4gYW5kIG1heCBhcmUgaW5jbHVzaXZlXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZE51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxuXG4vLzEuIHN0b3J5IGluc3RhbmNlXG5cbi8vMS4xIGxvY2F0aW9uc1xudmFyIGxvY2F0aW9uR3JhcGggPSB7fTtcblxuLy9hZGQgdG8gYm90aCBzaWRlc1xuZXhwb3J0IGZ1bmN0aW9uIGFkZExvY2F0aW9uKGxvY2F0aW9uTmFtZTogc3RyaW5nLCBhZGphY2VudExvY2F0aW9uczogc3RyaW5nW10pIHtcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID09IHVuZGVmaW5lZClcbiAgICAgICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gW107XG4gICAgbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdID0gbG9jYXRpb25HcmFwaFtsb2NhdGlvbk5hbWVdLmNvbmNhdChhZGphY2VudExvY2F0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFkamFjZW50TG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXSA9IFtdO1xuXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dLnB1c2gobG9jYXRpb25OYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVBZGphY2VudChsb2NhdGlvbjE6IHN0cmluZywgbG9jYXRpb24yOiBzdHJpbmcpOmJvb2xlYW4ge1xuICAgIGNvbnNvbGUubG9nKFwiQXJlIGFkamFjZW50OiBcIiArIGxvY2F0aW9uMSArIFwiLCBcIitsb2NhdGlvbjIpO1xuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0gPT0gdW5kZWZpbmVkIHx8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24yXSA9PSB1bmRlZmluZWQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVpdGhlciBvbmUvYm90aCBsb2NhdGlvbnMgdW5kZWZpbmVkXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXVtpXSA9PSBsb2NhdGlvbjIpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL3BhdGhmaW5kaW5nIHByaW1pdGl2ZXNcbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0TG9jYXRpb24oc3RhcnQ6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFyIHZpc2l0ZWQgPSB7fTtcbiAgICB2YXIgcHJldmlvdXMgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbG9jYXRpb25HcmFwaCkge1xuICAgICAgICB2aXNpdGVkW2tleV0gPSBmYWxzZTtcbiAgICB9XG4gICAgdmlzaXRlZFtzdGFydF0gPSB0cnVlO1xuXG4gICAgdmFyIG15UXVldWUgPSBuZXcgUXVldWU8c3RyaW5nPigpO1xuICAgIG15UXVldWUuZW5xdWV1ZShzdGFydCk7XG5cbiAgICB3aGlsZSAoIW15UXVldWUuaXNFbXB0eSgpKSB7XG4gICAgICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBteVF1ZXVlLmRlcXVldWUoKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IGRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbG9jYXRpb25HcmFwaFtjdXJyZW50XTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKCF2aXNpdGVkW25laWdoYm9yc1tpXV0pIHtcbiAgICAgICAgICAgICAgICBteVF1ZXVlLmVucXVldWUobmVpZ2hib3JzW2ldKTtcbiAgICAgICAgICAgICAgICB2aXNpdGVkW25laWdoYm9yc1tpXV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzW25laWdoYm9yc1tpXV0gPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IGRlc3RpbmF0aW9uO1xuICAgIGlmIChjdXJyZW50ID09IHN0YXJ0KVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB3aGlsZSAocHJldmlvdXNbY3VycmVudF0gIT0gc3RhcnQpIHtcbiAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xufVxuXG4vLzEuMiBhZ2VudHNcbnZhciBhZ2VudHMgPSBbXTtcbnZhciBwZXJzb25hbGl0eUFnZW50cyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkQWdlbnQoYWdlbnROYW1lOiBzdHJpbmcpIHtcbiAgICBhZ2VudHMucHVzaChhZ2VudE5hbWUpO1xuICAgIHJldHVybiBhZ2VudE5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRQZXJzb25hbGl0eUFnZW50KGFnZW50TmFtZTogc3RyaW5nLCBvMTogbnVtYmVyLCBvMjogbnVtYmVyLCBjMTogbnVtYmVyLFxuICBjMjogbnVtYmVyLCBlMTogbnVtYmVyLCBlMjogbnVtYmVyLCBhMTogbnVtYmVyLCBhMjogbnVtYmVyLCBuMTogbnVtYmVyLCBuMjogbnVtYmVyKSB7XG4gICAgdmFyIHBlcnNvbmFsaXR5ID0ge307XG4gICAgcGVyc29uYWxpdHlbXCJuYW1lXCJdID0gYWdlbnROYW1lO1xuICAgIHBlcnNvbmFsaXR5W1wib3Blbm5lc3NcIl0gPSBvMTtcbiAgICBwZXJzb25hbGl0eVtcImludGVsbGVjdFwiXSA9IG8yO1xuICAgIHBlcnNvbmFsaXR5W1wiaW5kdXN0cmlvdXNuZXNzXCJdID0gYzE7XG4gICAgcGVyc29uYWxpdHlbXCJvcmRlcmxpbmVzc1wiXSA9IGMyO1xuICAgIHBlcnNvbmFsaXR5W1wiZW50aHVzaWFzbVwiXSA9IGUxO1xuICAgIHBlcnNvbmFsaXR5W1wiYXNzZXJ0aXZlbmVzc1wiXSA9IGUyO1xuICAgIHBlcnNvbmFsaXR5W1wiY29tcGFzc2lvblwiXSA9IGExO1xuICAgIHBlcnNvbmFsaXR5W1wicG9saXRlbmVzc1wiXSA9IGEyO1xuICAgIHBlcnNvbmFsaXR5W1widm9sYXRpbGl0eVwiXSA9IG4xO1xuICAgIHBlcnNvbmFsaXR5W1wid2l0aGRyYXdhbFwiXSA9IG4yO1xuICAgIHBlcnNvbmFsaXR5QWdlbnRzLnB1c2gocGVyc29uYWxpdHkpO1xuICAgIHJldHVybiBhZ2VudE5hbWU7XG59XG5cbi8vMS4zIGl0ZW1zXG52YXIgaXRlbXMgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEl0ZW0oaXRlbU5hbWU6IHN0cmluZykge1xuICAgIGl0ZW1zLnB1c2goaXRlbU5hbWUpO1xuICAgIHJldHVybiBpdGVtTmFtZTtcbn1cblxuLy8xLjQgdmFyaWFibGVzXG52YXIgdmFyaWFibGVzID0ge307XG52YXIgYWdlbnRWYXJpYWJsZXMgPSB7fTtcbnZhciBpdGVtVmFyaWFibGVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB2YXJpYWJsZXNbdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFyTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkpXG4gICAgICAgIGFnZW50VmFyaWFibGVzW2FnZW50XSA9IHt9O1xuXG4gICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICBpZiAoaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIG5vdCBzZXQhXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB2YXJpYWJsZXNbdmFyTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgYWdlbnQgXCIgKyBhZ2VudCArIFwiIG5vdCBzZXQhXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFyaWFibGVOb3RTZXQodmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FnZW50VmFyaWFibGVOb3RTZXQoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSlcbiAgICAgICAgaXRlbVZhcmlhYmxlc1tpdGVtXSA9IHt9O1xuXG4gICAgaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1WYXJpYWJsZShpdGVtOiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZykge1xuICAgIGlmIChpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dKSB8fCBpc1VuZGVmaW5lZChpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBpdGVtIFwiICsgaXRlbSArIFwiIG5vdCBzZXQhXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV07XG59XG5cblxuLy8yXG4vL2FnZW50LWJlaGF2aW9yIHRyZWUgbWFwcGluZ1xudmFyIGFnZW50VHJlZXMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFRyZWVUb0FnZW50KGFnZW50OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcbiAgICBhZ2VudFRyZWVzW2FnZW50XSA9IHRyZWU7XG59XG5cbi8vMy4xXG4vL3VzZXIgYWN0aW9uc1xuLy9UT0RPIGFkZCB2YXJpYWJsZXMgdG8gdXNlciBhY3Rpb24gdGV4dHNcbnZhciB1c2VySW50ZXJhY3Rpb25PYmplY3QgPSB7XG4gICAgdGV4dDogXCJcIixcbiAgICB1c2VyQWN0aW9uc1RleHQ6IFtdLFxuICAgIGFjdGlvbkVmZmVjdHNUZXh0OiBcIlwiXG59XG52YXIgdXNlckludGVyYWN0aW9uVHJlZXMgPSBbXTtcbnZhciB1c2VyQWN0aW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpIHtcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCA9IFwiXCI7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dCA9IFtdO1xuICAgIHVzZXJBY3Rpb25zID0ge307Ly97XCJHbyB0byBsb2NhdGlvbiBYXCIgOiBlZmZlY3RcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVzZXJJbnRlcmFjdGlvblRyZWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGV4ZWN1dGUodXNlckludGVyYWN0aW9uVHJlZXNbaV0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGxldCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24gPSAodGV4dDogc3RyaW5nKSA9PlxuICAgIGFjdGlvbihcbiAgICAgICAgKCkgPT4gdHJ1ZSxcbiAgICAgICAgKCkgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgKz0gXCJcXG5cIiArIHRleHQsIDBcbiAgICApO1xuZXhwb3J0IGxldCBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dCA9ICh0ZXh0OiBzdHJpbmcpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCArPSBcIlxcblwiICsgdGV4dDtcblxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uVHJlZSA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdFRyZWU6IFRpY2spID0+IGFjdGlvbihcbiAgICAoKSA9PiB0cnVlLFxuICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgZWZmZWN0VHJlZSksIDBcbik7XG5cbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcsIGVmZmVjdDogKCkgPT4gYW55KSA9PlxuICAgIGFjdGlvbihcbiAgICAgICAgKCkgPT4gdHJ1ZSxcbiAgICAgICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBhY3Rpb24oKCk9PnRydWUsIGVmZmVjdCwgMCkpLCAwXG4gICAgKTtcblxuZnVuY3Rpb24gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0OiBzdHJpbmcsIHRyZWU6IFRpY2spIHtcbiAgICB1c2VyQWN0aW9uc1t0ZXh0XSA9IHRyZWU7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5wdXNoKHRleHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlckludGVyYWN0aW9uVHJlZSh0aWNrOiBUaWNrKSB7XG4gICAgdXNlckludGVyYWN0aW9uVHJlZXMucHVzaCh0aWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVVc2VyQWN0aW9uKHRleHQ6IHN0cmluZykge1xuICAgIC8vZXhlY3V0ZSB0aGUgdXNlciBhY3Rpb25cbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgPSBcIlwiO1xuICAgIHZhciB1c2VyQWN0aW9uRWZmZWN0VHJlZSA9IHVzZXJBY3Rpb25zW3RleHRdO1xuICAgIGV4ZWN1dGUodXNlckFjdGlvbkVmZmVjdFRyZWUpO1xufVxuXG4vLzQuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCkge1xuICAgIHJldHVybiB1c2VySW50ZXJhY3Rpb25PYmplY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3b3JsZFRpY2soKSB7XG4gICAgLy9hbGwgYWdlbnQgdGlja3NcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbYWdlbnRzW2ldXTtcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0cmVlKSkge1xuICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJleGVjdXRpbmdBZ2VudFwiLCBhZ2VudHNbaV0pO1xuICAgICAgICAgICAgZXhlY3V0ZSh0cmVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBlcnNvbmFsaXR5QWdlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmVlID0gYWdlbnRUcmVlc1twZXJzb25hbGl0eUFnZW50c1tpXVtcIm5hbWVcIl1dO1xuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XG4gICAgICAgICAgICBzZXRWYXJpYWJsZShcImV4ZWN1dGluZ0FnZW50XCIsIHBlcnNvbmFsaXR5QWdlbnRzW2ldW1wibmFtZVwiXSk7XG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XG59XG4iXX0=
