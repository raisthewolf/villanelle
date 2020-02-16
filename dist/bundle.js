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
var START = "START";
var BC_CORRIDOR = "BC_CORRIDOR";
var BL_CORRIDOR = "BL_CORRIDOR";
var BR_CORRIDOR = "BR_CORRIDOR";
var ML_CORRIDOR = "ML_CORRIDOR";
var TL_CORRIDOR = "TL_CORRIDOR";
var TC_CORRIDOR = "TC_CORRIDOR";
var TR_CORRIDOR = "TR_CORRIDOR";
var MR_CORRIDOR = "MR_CORRIDOR";
var LAB = "LAB";
var STORAGE = "STORAGE";
var MEDICAL = "MEDICAL";
var QUARTERS1 = "QUARTERS1";
var QUARTERS2 = "QUARTERS2";
var EXIT_ELEVATOR = "EXIT_ELEVATOR";
var ENGINES = "ENGINES";
var COCKPIT = "COCKPIT";
var COMMS = "COMMS";
scripting_1.addLocation(START, [BC_CORRIDOR]);
scripting_1.addLocation(BC_CORRIDOR, [BL_CORRIDOR, BR_CORRIDOR, LAB]);
scripting_1.addLocation(BL_CORRIDOR, [ML_CORRIDOR]);
scripting_1.addLocation(ML_CORRIDOR, [STORAGE, TL_CORRIDOR]);
scripting_1.addLocation(TL_CORRIDOR, [TC_CORRIDOR, ENGINES, COMMS]);
scripting_1.addLocation(ENGINES, [COCKPIT]);
scripting_1.addLocation(COCKPIT, [COMMS]);
scripting_1.addLocation(TC_CORRIDOR, [EXIT_ELEVATOR, MEDICAL, TR_CORRIDOR]);
scripting_1.addLocation(TR_CORRIDOR, [MR_CORRIDOR]);
scripting_1.addLocation(MR_CORRIDOR, [MEDICAL, QUARTERS2, BR_CORRIDOR]);
scripting_1.addLocation(BR_CORRIDOR, [QUARTERS1]);
// agents
var alien = scripting_1.addPersonalityAgent("Alien", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
// items
var crewCard1 = scripting_1.addItem("Crew card1");
var crewCard2 = scripting_1.addItem("Crew card2");
scripting_1.setItemVariable(crewCard1, "currentLocation", LAB);
scripting_1.setItemVariable(crewCard2, "currentLocation", MEDICAL);
// variables
//alien
scripting_1.setAgentVariable(alien, "currentLocation", COCKPIT);
//player
var playerLocation = scripting_1.setVariable("playerLocation", START);
var crewCardsCollected = scripting_1.setVariable("crewCardsCollected", 0);
// 2. Define BTs
// create ground actions
var setRandNumber = scripting_1.action(function () { return true; }, function () { return scripting_1.setVariable("randNumber", scripting_1.getRandNumber(1, 18)); }, 0);
var chooseSTART = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 1; }, function () { return scripting_1.setVariable("destination", START); }, 0);
var chooseBC_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 2; }, function () { return scripting_1.setVariable("destination", BC_CORRIDOR); }, 0);
var chooseBL_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 3; }, function () { return scripting_1.setVariable("destination", BL_CORRIDOR); }, 0);
var chooseBR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 4; }, function () { return scripting_1.setVariable("destination", BR_CORRIDOR); }, 0);
var chooseML_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 5; }, function () { return scripting_1.setVariable("destination", ML_CORRIDOR); }, 0);
var chooseTL_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 6; }, function () { return scripting_1.setVariable("destination", TL_CORRIDOR); }, 0);
var chooseTC_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 7; }, function () { return scripting_1.setVariable("destination", TC_CORRIDOR); }, 0);
var chooseTR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 8; }, function () { return scripting_1.setVariable("destination", TR_CORRIDOR); }, 0);
var chooseMR_CORRIDOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 9; }, function () { return scripting_1.setVariable("destination", MR_CORRIDOR); }, 0);
var chooseLAB = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 10; }, function () { return scripting_1.setVariable("destination", LAB); }, 0);
var chooseSTORAGE = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 11; }, function () { return scripting_1.setVariable("destination", STORAGE); }, 0);
var chooseMEDICAL = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 12; }, function () { return scripting_1.setVariable("destination", MEDICAL); }, 0);
var chooseQUARTERS1 = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 13; }, function () { return scripting_1.setVariable("destination", QUARTERS1); }, 0);
var chooseQUARTERS2 = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 14; }, function () { return scripting_1.setVariable("destination", QUARTERS2); }, 0);
var chooseEXIT_ELEVATOR = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 15; }, function () { return scripting_1.setVariable("destination", EXIT_ELEVATOR); }, 0);
var chooseENGINES = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 16; }, function () { return scripting_1.setVariable("destination", ENGINES); }, 0);
var chooseCOCKPIT = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 17; }, function () { return scripting_1.setVariable("destination", COCKPIT); }, 0);
var chooseCOMMS = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 18; }, function () { return scripting_1.setVariable("destination", COMMS); }, 0);
var atDestination = function () { return scripting_1.getVariable("destination") == scripting_1.getAgentVariable(alien, "currentLocation"); };
var setDestinationPrecond = function () { return scripting_1.isVariableNotSet("destination") || atDestination(); };
// create behavior trees
var setNextDestination = scripting_1.sequence([
    setRandNumber,
    scripting_1.selector([
        chooseSTART,
        chooseBC_CORRIDOR,
        chooseBL_CORRIDOR,
        chooseBR_CORRIDOR,
        chooseML_CORRIDOR,
        chooseTL_CORRIDOR,
        chooseTC_CORRIDOR,
        chooseTR_CORRIDOR,
        chooseMR_CORRIDOR,
        chooseLAB,
        chooseSTORAGE,
        chooseMEDICAL,
        chooseQUARTERS1,
        chooseQUARTERS2,
        chooseEXIT_ELEVATOR,
        chooseENGINES,
        chooseCOCKPIT,
        chooseCOMMS
    ])
]);
var gotoNextLocation = scripting_1.action(function () { return true; }, function () {
    scripting_1.setAgentVariable(alien, "currentLocation", scripting_1.getNextLocation(scripting_1.getAgentVariable(alien, "currentLocation"), scripting_1.getVariable("destination")));
    console.log("Alien is at: " + scripting_1.getAgentVariable(alien, "currentLocation"));
}, 0);
var eatPlayer = scripting_1.action(function () { return scripting_1.getAgentVariable(alien, "currentLocation") == scripting_1.getVariable(playerLocation); }, function () {
    scripting_1.setVariable("endGame", "lose");
    scripting_1.setVariable(playerLocation, "NA");
}, 0);
/*let search = selector([
    eatPlayer,
    sequence([
        selector([
            guard(setDestinationPrecond, {}, setNextDestination),
            action(() => true, () => {
            }, {}, 0)
        ]),
        gotoNextLocation,
        eatPlayer
    ])
]);*/
var search = scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(setDestinationPrecond, setNextDestination),
        scripting_1.action(function () { return true; }, function () {
        }, 0)
    ]),
    gotoNextLocation,
]);
var alienBT = scripting_1.selector([
    eatPlayer,
    scripting_1.sequence([
        search, eatPlayer
    ])
]);
//attach behaviour trees to agents
scripting_1.attachTreeToAgent(alien, alienBT);
// 3. Construct story
// create user actions
var startStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == START; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the docking station."),
    scripting_1.addUserAction("Go forward to enter the corridor", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(startStateBT);
var bcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BC_CORRIDOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the corridor."),
    scripting_1.addUserAction("Head west in the corridor", function () { return scripting_1.setVariable(playerLocation, BL_CORRIDOR); }),
    scripting_1.addUserAction("Enter the lab", function () { return scripting_1.setVariable(playerLocation, LAB); }),
    scripting_1.addUserAction("Head east in the corridor", function () { return scripting_1.setVariable(playerLocation, BR_CORRIDOR); }),
    scripting_1.addUserAction("Go back to the start", function () { return scripting_1.setVariable(playerLocation, START); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(bcStateBT);
var brStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BR_CORRIDOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.addUserAction("Enter the staff quarters", function () { return scripting_1.setVariable(playerLocation, QUARTERS1); }),
    scripting_1.addUserAction("Move north in the corridor", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.addUserAction("Head west in the corridor", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(brStateBT);
var quarters1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == QUARTERS1; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the staff quarters."),
    scripting_1.addUserAction("Exit the staff quarters", function () { return scripting_1.setVariable(playerLocation, BR_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(quarters1BT);
var mrStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MR_CORRIDOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.addUserAction("Enter the captain's quarters on the east", function () { return scripting_1.setVariable(playerLocation, QUARTERS2); }),
    scripting_1.addUserAction("Enter the medical room on the west", function () { return scripting_1.setVariable(playerLocation, MEDICAL); }),
    scripting_1.addUserAction("Move north in the corridor", function () { return scripting_1.setVariable(playerLocation, TR_CORRIDOR); }),
    scripting_1.addUserAction("Move south in the corridor", function () { return scripting_1.setVariable(playerLocation, BR_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(mrStateBT);
var quarters2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == QUARTERS2; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the captain's quarters."),
    scripting_1.addUserAction("Exit the captain's quarters", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(quarters2BT);
var medicalBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MEDICAL; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the medical room."),
    scripting_1.addUserAction("Exit to the north", function () { return scripting_1.setVariable(playerLocation, TC_CORRIDOR); }),
    scripting_1.addUserAction("Exit to the east", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(medicalBT);
var labBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == LAB; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the lab."),
    scripting_1.addUserAction("Exit the lab", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(labBT);
var trStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TR_CORRIDOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.addUserAction("Move to the west", function () { return scripting_1.setVariable(playerLocation, TC_CORRIDOR); }),
    scripting_1.addUserAction("Move to the south", function () { return scripting_1.setVariable(playerLocation, MR_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(trStateBT);
var tcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TC_CORRIDOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.addUserAction("Move to the west", function () { return scripting_1.setVariable(playerLocation, TL_CORRIDOR); }),
    scripting_1.addUserAction("Enter the medical room", function () { return scripting_1.setVariable(playerLocation, MEDICAL); }),
    scripting_1.addUserAction("Move towards the elevator", function () { return scripting_1.setVariable(playerLocation, EXIT_ELEVATOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(tcStateBT);
var elevatorBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == EXIT_ELEVATOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You reach the exit elevator."),
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable(crewCardsCollected) >= 2; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You can now activate the exit and flee!"),
            scripting_1.addUserAction("Activate and get out!", function () {
                scripting_1.setVariable("endGame", "win");
                scripting_1.setVariable(playerLocation, "NA");
            })
        ])),
        scripting_1.displayDescriptionAction("You need 2 crew cards to activate the exit elevator system.")
    ]),
    scripting_1.addUserAction("Move back in the corridor", function () { return scripting_1.setVariable(playerLocation, TC_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(elevatorBT);
var tlStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TL_CORRIDOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.addUserAction("Enter the engines room to the north", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
    scripting_1.addUserAction("Enter the communications room to the east", function () { return scripting_1.setVariable(playerLocation, COMMS); }),
    scripting_1.addUserAction("Move to the east in the corridor", function () { return scripting_1.setVariable(playerLocation, TC_CORRIDOR); }),
    scripting_1.addUserAction("Move to the south", function () { return scripting_1.setVariable(playerLocation, ML_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(tlStateBT);
var blStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BL_CORRIDOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.addUserAction("Move to the north in the corridor", function () { return scripting_1.setVariable(playerLocation, ML_CORRIDOR); }),
    scripting_1.addUserAction("Move to the east in the corridor", function () { return scripting_1.setVariable(playerLocation, BC_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(blStateBT);
var mlStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ML_CORRIDOR; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward in the corridor."),
    scripting_1.addUserAction("Enter the storage room", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
    scripting_1.addUserAction("Move to the north in the corridor", function () { return scripting_1.setVariable(playerLocation, TL_CORRIDOR); }),
    scripting_1.addUserAction("Move to the south", function () { return scripting_1.setVariable(playerLocation, BL_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(mlStateBT);
var storageBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == STORAGE; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the storage."),
    scripting_1.addUserAction("Exit the storage room", function () { return scripting_1.setVariable(playerLocation, ML_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(storageBT);
var commsBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == COMMS; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the communications room."),
    scripting_1.addUserAction("Enter the cockpit", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
    scripting_1.addUserAction("Exit the communications room into the corridor", function () { return scripting_1.setVariable(playerLocation, TL_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(commsBT);
var cockpitBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == COCKPIT; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the cockpit."),
    scripting_1.addUserAction("Enter the engines room to the east", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
    scripting_1.addUserAction("Enter the communications room to the south", function () { return scripting_1.setVariable(playerLocation, COMMS); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(cockpitBT);
var enginesBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ENGINES; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the engines room."),
    scripting_1.addUserAction("Enter the cockpit to the east", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
    scripting_1.addUserAction("Enter the corridor to the south", function () { return scripting_1.setVariable(playerLocation, TL_CORRIDOR); }),
    scripting_1.addUserAction("Stay where you are.", function () { })
]));
scripting_1.addUserInteractionTree(enginesBT);
var crewCard1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(crewCard1, "currentLocation"); }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You notice a crew card lying around."),
    scripting_1.addUserActionTree("Pick up the crew card", scripting_1.sequence([
        scripting_1.action(function () { return true; }, function () {
            scripting_1.displayActionEffectText("You pick up the crew card.");
            scripting_1.setItemVariable(crewCard1, "currentLocation", "player");
            scripting_1.setVariable(crewCardsCollected, scripting_1.getVariable(crewCardsCollected) + 1);
        }, 0),
        scripting_1.action(function () { return true; }, function () {
            scripting_1.displayActionEffectText("Wow you know how to pick up things.");
        }, 0)
    ]))
]));
var crewCard2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(crewCard2, "currentLocation"); }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You notice a crew card lying around."),
    scripting_1.addUserAction("Pick up the crew card", function () {
        scripting_1.displayActionEffectText("You pick up the crew card.");
        scripting_1.setItemVariable(crewCard2, "currentLocation", "player");
        scripting_1.setVariable(crewCardsCollected, scripting_1.getVariable(crewCardsCollected) + 1);
    })
]));
scripting_1.addUserInteractionTree(crewCard1BT);
scripting_1.addUserInteractionTree(crewCard2BT);
var alienNearby = scripting_1.guard(function () { return scripting_1.areAdjacent(scripting_1.getVariable(playerLocation), scripting_1.getAgentVariable(alien, "currentLocation")); }, scripting_1.displayDescriptionAction("You hear a thumping sound. The alien is nearby."));
scripting_1.addUserInteractionTree(alienNearby);
var gameOver = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == "NA"; }, scripting_1.selector([
    scripting_1.guard(function () { return scripting_1.getVariable("endGame") == "win"; }, scripting_1.displayDescriptionAction("You have managed to escape!")),
    scripting_1.guard(function () { return scripting_1.getVariable("endGame") == "lose"; }, scripting_1.displayDescriptionAction("The creature grabs you before you can react! You struggle for a bit before realising it's all over.."))
]));
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
var playerImage = new Image();
var alienImage = new Image();
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 300);
    displayPlayer();
    displayAlien();
    displayTextAndActions();
}
var mapPositions = {
    "START": { x: 230, y: 235 },
    "BC_CORRIDOR": { x: 240, y: 210 },
    "BR_CORRIDOR": { x: 300, y: 190 },
    "MR_CORRIDOR": { x: 305, y: 150 },
    "QUARTERS2": { x: 340, y: 155 },
    "QUARTERS1": { x: 340, y: 190 },
    "TR_CORRIDOR": { x: 300, y: 100 },
    "TC_CORRIDOR": { x: 230, y: 100 },
    "TL_CORRIDOR": { x: 170, y: 100 },
    "EXIT_ELEVATOR": { x: 230, y: 60 },
    "LAB": { x: 240, y: 170 },
    "ML_CORRIDOR": { x: 160, y: 150 },
    "BL_CORRIDOR": { x: 160, y: 200 },
    "ENGINES": { x: 170, y: 60 },
    "COCKPIT": { x: 120, y: 60 },
    "COMMS": { x: 120, y: 100 },
    "MEDICAL": { x: 250, y: 130 },
    "STORAGE": { x: 200, y: 150 }
};
function displayPlayer() {
    var currLocation = scripting_1.getVariable(playerLocation);
    if (!util_1.isUndefined(mapPositions[currLocation]))
        context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 16, 16);
}
function displayAlien() {
    var currLocation = scripting_1.getAgentVariable(alien, "currentLocation");
    context.drawImage(alienImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 24, 24);
}
spaceshipImage.src = "../images/isolation_map.png";
playerImage.src = "../images/player2.png";
alienImage.src = "../images/xenomorph.png";
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
    console.log("Crew cards: " + scripting_1.getVariable(crewCardsCollected));
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
            var util = getVariable("utility");
            if (util) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                }
                if (!blackboard[id].utility) {
                    var utility = 1;
                    blackboard[id].utility = utility;
                }
                setVariable("lastUtil", utility);
                return Status.RUNNING;
            }
            if (precondition()) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].ticksDone = ticksRequired;
                }
                if (!blackboard[id].ticksDone) {
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
            var util = getVariable("utility");
            if (util) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].currentIndexP = 0;
                }
                if (!blackboard[id].utility) {
                    var utility = 0;
                    while (blackboard[id].currentIndexP < astTicks.length) {
                        var childStatus = execute(astTicks[blackboard[id].currentIndexP]);
                        blackboard[id].currentIndexP += 1;
                        utility += getVariable("lastUtil");
                    }
                    utility = utility / astTicks.length;
                    blackboard[id].utility = utility;
                }
                setVariable("lastUtil", utility);
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
            var util = getVariable("utility");
            if (util) {
                if (!blackboard[id]) {
                    blackboard[id] = {};
                    blackboard[id].currentIndexP = 0;
                }
                if (!blackboard[id].utility) {
                    var utility = 0;
                    while (blackboard[id].currentIndexP < astTicks.length) {
                        var childStatus = execute(astTicks[blackboard[id].currentIndexP]);
                        blackboard[id].currentIndexP += 1;
                        if (utility < getVariable("lastUtil")) {
                            utility = getVariable("lastUtil");
                        }
                    }
                    blackboard[id]["utility"] = utility;
                }
                setVariable("lastUtil", utility);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2lzb2xhdGlvbi50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO0tBQ0o7SUFDRCx1QkFBdUIsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFqQkQsOEJBaUJDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG52YXIgYXJyYXlzID0gcmVxdWlyZShcIi4vYXJyYXlzXCIpO1xudmFyIExpbmtlZExpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBMaW5rZWQgTGlzdC5cbiAgICAgKiBAY2xhc3MgQSBsaW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlIGNvbnNpc3Rpbmcgb2YgYSBncm91cCBvZiBub2Rlc1xuICAgICAqIHdoaWNoIHRvZ2V0aGVyIHJlcHJlc2VudCBhIHNlcXVlbmNlLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJzdCBub2RlIGluIHRoZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMYXN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogTnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gZWxlbWVudCB0byB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSBhZGRlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcj19IGluZGV4IG9wdGlvbmFsIGluZGV4IHRvIGFkZCB0aGUgZWxlbWVudC4gSWYgbm8gaW5kZXggaXMgc3BlY2lmaWVkXG4gICAgICogdGhlIGVsZW1lbnQgaXMgYWRkZWQgdG8gdGhlIGVuZCBvZiB0aGlzIGxpc3QuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgYWRkZWQgb3IgZmFsc2UgaWYgdGhlIGluZGV4IGlzIGludmFsaWRcbiAgICAgKiBvciBpZiB0aGUgZWxlbWVudCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGluZGV4KSkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5FbGVtZW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5uRWxlbWVudHMgfHwgdXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOb2RlID0gdGhpcy5jcmVhdGVOb2RlKGl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDAgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGF0IHRoZSBlbmQuXG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlLm5leHQgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIC8vIENoYW5nZSBmaXJzdCBub2RlLlxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXggLSAxKTtcbiAgICAgICAgICAgIGlmIChwcmV2ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gcHJldi5uZXh0O1xuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5FbGVtZW50cysrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IG9yIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpc1xuICAgICAqIGVtcHR5LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5maXJzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXG4gICAgICogZW1wdHkuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGRlc2lyZWQgaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXNcbiAgICAgKiBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCk7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlXG4gICAgICogc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoZSBMaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhpcyBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZVxuICAgICAqIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhpcyBsaXN0IGRvZXMgbm90IGNvbnRhaW4gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHNGKGN1cnJlbnROb2RlLmVsZW1lbnQsIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoZSBsaXN0IGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgPSBmdW5jdGlvbihwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCwgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmluZGV4T2YoaXRlbSwgZXF1YWxzRnVuY3Rpb24pID49IDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW4gdGhpcyBsaXN0LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIHJlbW92ZWQgZnJvbSB0aGlzIGxpc3QsIGlmIHByZXNlbnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgbGlzdCBjb250YWluZWQgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzIDwgMSB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZpb3VzID0gbnVsbDtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAgICogQHBhcmFtIHtMaW5rZWRMaXN0fSBvdGhlciB0aGUgb3RoZXIgbGlzdC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xuICAgICAqIGFyZSBjdXN0b20gb2JqZWN0cyB5b3Ugc2hvdWxkIHByb3ZpZGUgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIExpbmtlZExpc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsIG90aGVyLmZpcnN0Tm9kZSwgZXFGKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzQXV4ID0gZnVuY3Rpb24gKG4xLCBuMiwgZXFGKSB7XG4gICAgICAgIHdoaWxlIChuMSAhPT0gbnVsbCAmJiBuMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCFlcUYobjEuZWxlbWVudCwgbjIuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuMSA9IG4xLm5leHQ7XG4gICAgICAgICAgICBuMiA9IG4yLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBnaXZlbiBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSByZW1vdmVkIGVsZW1lbnQgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJlbW92ZUVsZW1lbnRBdEluZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5uRWxlbWVudHMgfHwgdGhpcy5maXJzdE5vZGUgPT09IG51bGwgfHwgdGhpcy5sYXN0Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAxKSB7XG4gICAgICAgICAgICAvL0ZpcnN0IG5vZGUgaW4gdGhlIGxpc3QuXG4gICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJldmlvdXMubmV4dCA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmxhc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByZXZpb3VzICE9PSBudWxsICYmIHByZXZpb3VzLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBwcmV2aW91cy5uZXh0Lm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhjdXJyZW50Tm9kZS5lbGVtZW50KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0ZW1wID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5sYXN0Tm9kZTtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXG4gICAgICogc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7QXJyYXkuPCo+fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0LFxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPD0gMDtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJyYXlzLnRvU3RyaW5nKHRoaXMudG9BcnJheSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAodGhpcy5uRWxlbWVudHMgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleCAmJiBub2RlICE9PSBudWxsOyBpKyspIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxlbWVudDogaXRlbSxcbiAgICAgICAgICAgIG5leHQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBMaW5rZWRMaXN0O1xufSgpKTsgLy8gRW5kIG9mIGxpbmtlZCBsaXN0XG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWRMaXN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlua2VkTGlzdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKFwiLi9MaW5rZWRMaXN0XCIpO1xudmFyIFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgcXVldWUuXG4gICAgICogQGNsYXNzIEEgcXVldWUgaXMgYSBGaXJzdC1Jbi1GaXJzdC1PdXQgKEZJRk8pIGRhdGEgc3RydWN0dXJlLCB0aGUgZmlyc3RcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBxdWV1ZSB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xuICAgICAqIGltcGxlbWVudGF0aW9uIHVzZXMgYSBsaW5rZWQgbGlzdCBhcyBhIGNvbnRhaW5lci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoZSBlbmQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSB0aGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgaW5zZXJ0ZWQsIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5hZGQoZWxlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYW5kIHJlbW92ZXMgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubGlzdC5maXJzdCgpO1xuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZUVsZW1lbnRBdEluZGV4KDApO1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMsIGJ1dCBkb2VzIG5vdCByZW1vdmUsIHRoZSBoZWFkIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3Quc2l6ZSgpICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LnNpemUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgc3RhY2sgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yLCBhIGN1c3RvbSBlcXVhbHMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZXkgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBjb25zdCBwZXRzQXJlRXF1YWxCeU5hbWUgKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmNvbnRhaW5zKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpIDw9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIHF1ZXVlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBxdWV1ZSBpblxuICAgICAqIEZJRk8gb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdC5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWV1ZTtcbn0oKSk7IC8vIEVuZCBvZiBxdWV1ZVxuZXhwb3J0cy5kZWZhdWx0ID0gUXVldWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMDtcbn1cbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcbi8qKlxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBjaGFuZ2VkIGFmdGVyIHRoaXMgY2FsbC5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheSBlcXVhbFxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB3aG9zZSBmcmVxdWVuY3kgaXMgdG8gYmUgZGV0ZXJtaW5lZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZnJlcXVlbmN5KGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgZnJlcSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgZnJlcSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmcmVxO1xufVxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxuICogb2YgZWxlbWVudHMsIGFuZCBhbGwgY29ycmVzcG9uZGluZyBwYWlycyBvZiBlbGVtZW50cyBpbiB0aGUgdHdvXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgdGhlIG90aGVyIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWVxdWFscyhhcnJheTFbaV0sIGFycmF5MltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuZXF1YWxzID0gZXF1YWxzO1xuLyoqXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSB0byBjb3B5LlxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGNvcHkoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XG59XG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuLyoqXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBzd2FwIGVsZW1lbnRzLlxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGlzIGRlZmluZWQgYW5kIHRoZSBpbmRleGVzIGFyZSB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xuICAgIGlmIChpIDwgMCB8fCBpID49IGFycmF5Lmxlbmd0aCB8fCBqIDwgMCB8fCBqID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnN3YXAgPSBzd2FwO1xuZnVuY3Rpb24gdG9TdHJpbmcoYXJyYXkpIHtcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcbn1cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcbiAqIHN0YXJ0aW5nIGZyb20gaW5kZXggMCB0byBsZW5ndGggLSAxLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGVsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn07XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0Q29tcGFyZSA9IGRlZmF1bHRDb21wYXJlO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICckcycgKyBpdGVtO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICckbycgKyBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0VG9TdHJpbmcgPSBkZWZhdWx0VG9TdHJpbmc7XG4vKipcbiAqIEpvaW5zIGFsbCB0aGUgcHJvcGVyaWVzIG9mIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGpvaW4gc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIG1ha2VTdHJpbmcoaXRlbSwgam9pbikge1xuICAgIGlmIChqb2luID09PSB2b2lkIDApIHsgam9pbiA9ICcsJzsgfVxuICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9OVUxMJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX1VOREVGSU5FRCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdG9yZXQgPSAneyc7XG4gICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gaXRlbSkge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuaGFzKGl0ZW0sIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgam9pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIHByb3AgKyAnOicgKyBpdGVtW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3JldCArICd9JztcbiAgICB9XG59XG5leHBvcnRzLm1ha2VTdHJpbmcgPSBtYWtlU3RyaW5nO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZnVuYykgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIHVuZGVmaW5lZC5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmopID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIHN0cmluZy5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuLyoqXG4gKiBSZXZlcnNlcyBhIGNvbXBhcmUgZnVuY3Rpb24uXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gcmV2ZXJzZUNvbXBhcmVGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoY29tcGFyZUZ1bmN0aW9uKSB8fCAhaXNGdW5jdGlvbihjb21wYXJlRnVuY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgaWYgKGEgPCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGQsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oZCwgdikgKiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLnJldmVyc2VDb21wYXJlRnVuY3Rpb24gPSByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uO1xuLyoqXG4gKiBSZXR1cm5zIGFuIGVxdWFsIGZ1bmN0aW9uIGdpdmVuIGEgY29tcGFyZSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBjb21wYXJlVG9FcXVhbHMoY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYikgPT09IDA7XG4gICAgfTtcbn1cbmV4cG9ydHMuY29tcGFyZVRvRXF1YWxzID0gY29tcGFyZVRvRXF1YWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIvKiAvLy8gPHJlZmVyZW5jZSBwYXRoPVwic2NyaXB0aW5nLnRzXCIvPiAqL1xuaW1wb3J0IHtcbiAgICBhZGRBZ2VudCwgYWRkUGVyc29uYWxpdHlBZ2VudCwgc2V0QWdlbnRWYXJpYWJsZSwgYWRkSXRlbSwgYWRkTG9jYXRpb24sIHNldFZhcmlhYmxlLCBnZXROZXh0TG9jYXRpb24sIGFjdGlvbixcbiAgICBnZXRSYW5kTnVtYmVyLCBnZXRWYXJpYWJsZSwgc2VxdWVuY2UsIHNlbGVjdG9yLCBleGVjdXRlLCBQcmVjb25kaXRpb24sIGdldEFnZW50VmFyaWFibGUsIG5lZ19ndWFyZCwgZ3VhcmQsXG4gICAgaXNWYXJpYWJsZU5vdFNldCwgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uLCBhZGRVc2VyQWN0aW9uLCBhZGRVc2VySW50ZXJhY3Rpb25UcmVlLCBpbml0aWFsaXplLFxuICAgIGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCwgZXhlY3V0ZVVzZXJBY3Rpb24sIHdvcmxkVGljaywgYXR0YWNoVHJlZVRvQWdlbnQsIHNldEl0ZW1WYXJpYWJsZSwgZ2V0SXRlbVZhcmlhYmxlLFxuICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0LCBhcmVBZGphY2VudCwgYWRkVXNlckFjdGlvblRyZWVcbn0gZnJvbSBcIi4vc2NyaXB0aW5nXCI7XG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsXCI7XG5cbi8vIDEuIERlZmluZSBTdGF0ZVxuLy8gbG9jYXRpb25zXG52YXIgU1RBUlQgPSBcIlNUQVJUXCI7XG52YXIgQkNfQ09SUklET1IgPSBcIkJDX0NPUlJJRE9SXCI7XG52YXIgQkxfQ09SUklET1IgPSBcIkJMX0NPUlJJRE9SXCI7XG52YXIgQlJfQ09SUklET1IgPSBcIkJSX0NPUlJJRE9SXCI7XG52YXIgTUxfQ09SUklET1IgPSBcIk1MX0NPUlJJRE9SXCI7XG52YXIgVExfQ09SUklET1IgPSBcIlRMX0NPUlJJRE9SXCI7XG52YXIgVENfQ09SUklET1IgPSBcIlRDX0NPUlJJRE9SXCI7XG52YXIgVFJfQ09SUklET1IgPSBcIlRSX0NPUlJJRE9SXCI7XG52YXIgTVJfQ09SUklET1IgPSBcIk1SX0NPUlJJRE9SXCI7XG52YXIgTEFCID0gXCJMQUJcIjtcbnZhciBTVE9SQUdFID0gXCJTVE9SQUdFXCI7XG52YXIgTUVESUNBTCA9IFwiTUVESUNBTFwiO1xudmFyIFFVQVJURVJTMSA9IFwiUVVBUlRFUlMxXCI7XG52YXIgUVVBUlRFUlMyID0gXCJRVUFSVEVSUzJcIjtcbnZhciBFWElUX0VMRVZBVE9SID0gXCJFWElUX0VMRVZBVE9SXCI7XG52YXIgRU5HSU5FUyA9IFwiRU5HSU5FU1wiO1xudmFyIENPQ0tQSVQgPSBcIkNPQ0tQSVRcIjtcbnZhciBDT01NUyA9IFwiQ09NTVNcIjtcblxuYWRkTG9jYXRpb24oU1RBUlQsIFtCQ19DT1JSSURPUl0pO1xuYWRkTG9jYXRpb24oQkNfQ09SUklET1IsIFtCTF9DT1JSSURPUiwgQlJfQ09SUklET1IsIExBQl0pO1xuYWRkTG9jYXRpb24oQkxfQ09SUklET1IsIFtNTF9DT1JSSURPUl0pO1xuYWRkTG9jYXRpb24oTUxfQ09SUklET1IsIFtTVE9SQUdFLCBUTF9DT1JSSURPUl0pO1xuYWRkTG9jYXRpb24oVExfQ09SUklET1IsIFtUQ19DT1JSSURPUiwgRU5HSU5FUywgQ09NTVNdKTtcbmFkZExvY2F0aW9uKEVOR0lORVMsIFtDT0NLUElUXSk7XG5hZGRMb2NhdGlvbihDT0NLUElULCBbQ09NTVNdKTtcbmFkZExvY2F0aW9uKFRDX0NPUlJJRE9SLCBbRVhJVF9FTEVWQVRPUiwgTUVESUNBTCwgVFJfQ09SUklET1JdKTtcbmFkZExvY2F0aW9uKFRSX0NPUlJJRE9SLCBbTVJfQ09SUklET1JdKTtcbmFkZExvY2F0aW9uKE1SX0NPUlJJRE9SLCBbTUVESUNBTCwgUVVBUlRFUlMyLCBCUl9DT1JSSURPUl0pO1xuYWRkTG9jYXRpb24oQlJfQ09SUklET1IsIFtRVUFSVEVSUzFdKTtcblxuLy8gYWdlbnRzXG52YXIgYWxpZW4gPSBhZGRQZXJzb25hbGl0eUFnZW50KFwiQWxpZW5cIiwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCk7XG5cbi8vIGl0ZW1zXG52YXIgY3Jld0NhcmQxID0gYWRkSXRlbShcIkNyZXcgY2FyZDFcIik7XG52YXIgY3Jld0NhcmQyID0gYWRkSXRlbShcIkNyZXcgY2FyZDJcIik7XG5zZXRJdGVtVmFyaWFibGUoY3Jld0NhcmQxLCBcImN1cnJlbnRMb2NhdGlvblwiLCBMQUIpO1xuc2V0SXRlbVZhcmlhYmxlKGNyZXdDYXJkMiwgXCJjdXJyZW50TG9jYXRpb25cIiwgTUVESUNBTCk7XG5cbi8vIHZhcmlhYmxlc1xuLy9hbGllblxuc2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIiwgQ09DS1BJVCk7XG4vL3BsYXllclxudmFyIHBsYXllckxvY2F0aW9uID0gc2V0VmFyaWFibGUoXCJwbGF5ZXJMb2NhdGlvblwiLCBTVEFSVCk7XG52YXIgY3Jld0NhcmRzQ29sbGVjdGVkID0gc2V0VmFyaWFibGUoXCJjcmV3Q2FyZHNDb2xsZWN0ZWRcIiwgMCk7XG5cbi8vIDIuIERlZmluZSBCVHNcbi8vIGNyZWF0ZSBncm91bmQgYWN0aW9uc1xubGV0IHNldFJhbmROdW1iZXIgPSBhY3Rpb24oXG4gICAgKCkgPT4gdHJ1ZSxcbiAgICAoKSA9PiBzZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIiwgZ2V0UmFuZE51bWJlcigxLCAxOCkpLFxuICAgIDBcbik7XG5sZXQgY2hvb3NlU1RBUlQgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDEsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgU1RBUlQpLCAwKTtcbmxldCBjaG9vc2VCQ19DT1JSSURPUiA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMiwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBCQ19DT1JSSURPUiksIDApO1xubGV0IGNob29zZUJMX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAzLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIEJMX0NPUlJJRE9SKSwgMCk7XG5sZXQgY2hvb3NlQlJfQ09SUklET1IgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDQsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgQlJfQ09SUklET1IpLCAwKTtcbmxldCBjaG9vc2VNTF9DT1JSSURPUiA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gNSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBNTF9DT1JSSURPUiksIDApO1xubGV0IGNob29zZVRMX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA2LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIFRMX0NPUlJJRE9SKSwgMCk7XG5sZXQgY2hvb3NlVENfQ09SUklET1IgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDcsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgVENfQ09SUklET1IpLCAwKTtcbmxldCBjaG9vc2VUUl9DT1JSSURPUiA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gOCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBUUl9DT1JSSURPUiksIDApO1xubGV0IGNob29zZU1SX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA5LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIE1SX0NPUlJJRE9SKSwgMCk7XG5sZXQgY2hvb3NlTEFCID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxMCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBMQUIpLCAwKTtcbmxldCBjaG9vc2VTVE9SQUdFID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxMSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBTVE9SQUdFKSwgMCk7XG5sZXQgY2hvb3NlTUVESUNBTCA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTIsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgTUVESUNBTCksIDApO1xubGV0IGNob29zZVFVQVJURVJTMSA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTMsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgUVVBUlRFUlMxKSwgMCk7XG5sZXQgY2hvb3NlUVVBUlRFUlMyID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxNCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBRVUFSVEVSUzIpLCAwKTtcbmxldCBjaG9vc2VFWElUX0VMRVZBVE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxNSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBFWElUX0VMRVZBVE9SKSwgMCk7XG5sZXQgY2hvb3NlRU5HSU5FUyA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTYsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgRU5HSU5FUyksIDApO1xubGV0IGNob29zZUNPQ0tQSVQgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDE3LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIENPQ0tQSVQpLCAwKTtcbmxldCBjaG9vc2VDT01NUyA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTgsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgQ09NTVMpLCAwKTtcblxubGV0IGF0RGVzdGluYXRpb246IFByZWNvbmRpdGlvbiA9ICgpID0+IGdldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIikgPT0gZ2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIik7XG5sZXQgc2V0RGVzdGluYXRpb25QcmVjb25kOiBQcmVjb25kaXRpb24gPSAoKSA9PiBpc1ZhcmlhYmxlTm90U2V0KFwiZGVzdGluYXRpb25cIikgfHwgYXREZXN0aW5hdGlvbigpO1xuXG4vLyBjcmVhdGUgYmVoYXZpb3IgdHJlZXNcbmxldCBzZXROZXh0RGVzdGluYXRpb24gPSBzZXF1ZW5jZShbXG4gICAgc2V0UmFuZE51bWJlcixcbiAgICBzZWxlY3RvcihbXG4gICAgICAgIGNob29zZVNUQVJULFxuICAgICAgICBjaG9vc2VCQ19DT1JSSURPUixcbiAgICAgICAgY2hvb3NlQkxfQ09SUklET1IsXG4gICAgICAgIGNob29zZUJSX0NPUlJJRE9SLFxuICAgICAgICBjaG9vc2VNTF9DT1JSSURPUixcbiAgICAgICAgY2hvb3NlVExfQ09SUklET1IsXG4gICAgICAgIGNob29zZVRDX0NPUlJJRE9SLFxuICAgICAgICBjaG9vc2VUUl9DT1JSSURPUixcbiAgICAgICAgY2hvb3NlTVJfQ09SUklET1IsXG4gICAgICAgIGNob29zZUxBQixcbiAgICAgICAgY2hvb3NlU1RPUkFHRSxcbiAgICAgICAgY2hvb3NlTUVESUNBTCxcbiAgICAgICAgY2hvb3NlUVVBUlRFUlMxLFxuICAgICAgICBjaG9vc2VRVUFSVEVSUzIsXG4gICAgICAgIGNob29zZUVYSVRfRUxFVkFUT1IsXG4gICAgICAgIGNob29zZUVOR0lORVMsXG4gICAgICAgIGNob29zZUNPQ0tQSVQsXG4gICAgICAgIGNob29zZUNPTU1TXG4gICAgXSlcbl0pO1xuXG5sZXQgZ290b05leHRMb2NhdGlvbiA9IGFjdGlvbihcbiAgICAoKSA9PiB0cnVlLFxuICAgICgpID0+IHtcbiAgICAgICAgc2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIiwgZ2V0TmV4dExvY2F0aW9uKGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpLCBnZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIpKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWxpZW4gaXMgYXQ6IFwiICsgZ2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIikpXG4gICAgfSxcbiAgICAwXG4pO1xuXG5sZXQgZWF0UGxheWVyID0gYWN0aW9uKCgpID0+IGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpID09IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSxcbiAgICAoKSA9PiB7XG4gICAgICAgIHNldFZhcmlhYmxlKFwiZW5kR2FtZVwiLCBcImxvc2VcIik7XG4gICAgICAgIHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBcIk5BXCIpO1xuICAgIH0sIDBcbik7XG5cbi8qbGV0IHNlYXJjaCA9IHNlbGVjdG9yKFtcbiAgICBlYXRQbGF5ZXIsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICBzZWxlY3RvcihbXG4gICAgICAgICAgICBndWFyZChzZXREZXN0aW5hdGlvblByZWNvbmQsIHt9LCBzZXROZXh0RGVzdGluYXRpb24pLFxuICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcbiAgICAgICAgICAgIH0sIHt9LCAwKVxuICAgICAgICBdKSxcbiAgICAgICAgZ290b05leHRMb2NhdGlvbixcbiAgICAgICAgZWF0UGxheWVyXG4gICAgXSlcbl0pOyovXG5cbmxldCBzZWFyY2ggPSBzZXF1ZW5jZShbXG4gICAgICAgIHNlbGVjdG9yKFtcbiAgICAgICAgICAgIGd1YXJkKHNldERlc3RpbmF0aW9uUHJlY29uZCwgc2V0TmV4dERlc3RpbmF0aW9uKSxcbiAgICAgICAgICAgIGFjdGlvbigoKSA9PiB0cnVlLCAoKSA9PiB7XG4gICAgICAgICAgICB9LDApXG4gICAgICAgIF0pLFxuICAgICAgICBnb3RvTmV4dExvY2F0aW9uLFxuICAgIF0pO1xuXG5sZXQgYWxpZW5CVCA9IHNlbGVjdG9yKFtcbiAgICBlYXRQbGF5ZXIsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICBzZWFyY2gsIGVhdFBsYXllclxuICAgIF0pXG5dKTtcblxuLy9hdHRhY2ggYmVoYXZpb3VyIHRyZWVzIHRvIGFnZW50c1xuYXR0YWNoVHJlZVRvQWdlbnQoYWxpZW4sIGFsaWVuQlQpO1xuXG4vLyAzLiBDb25zdHJ1Y3Qgc3Rvcnlcbi8vIGNyZWF0ZSB1c2VyIGFjdGlvbnNcblxudmFyIHN0YXJ0U3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBTVEFSVCxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGRvY2tpbmcgc3RhdGlvbi5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiR28gZm9yd2FyZCB0byBlbnRlciB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJDX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShzdGFydFN0YXRlQlQpO1xudmFyIGJjU3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBCQ19DT1JSSURPUixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGNvcnJpZG9yLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJIZWFkIHdlc3QgaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBsYWJcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIExBQikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkhlYWQgZWFzdCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJSX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiR28gYmFjayB0byB0aGUgc3RhcnRcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFNUQVJUKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShiY1N0YXRlQlQpO1xudmFyIGJyU3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBCUl9DT1JSSURPUixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIHN0YWZmIHF1YXJ0ZXJzXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBRVUFSVEVSUzEpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIG5vcnRoIGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTVJfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJIZWFkIHdlc3QgaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQ19DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoYnJTdGF0ZUJUKTtcbnZhciBxdWFydGVyczFCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBRVUFSVEVSUzEsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBzdGFmZiBxdWFydGVycy5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRXhpdCB0aGUgc3RhZmYgcXVhcnRlcnNcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJSX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShxdWFydGVyczFCVCk7XG52YXIgbXJTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1SX0NPUlJJRE9SLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW4gdGhlIGNvcnJpZG9yLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgY2FwdGFpbidzIHF1YXJ0ZXJzIG9uIHRoZSBlYXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBRVUFSVEVSUzIpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWVkaWNhbCByb29tIG9uIHRoZSB3ZXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNRURJQ0FMKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSBub3J0aCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRSX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSBzb3V0aCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJSX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShtclN0YXRlQlQpO1xudmFyIHF1YXJ0ZXJzMkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFFVQVJURVJTMixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGNhcHRhaW4ncyBxdWFydGVycy5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRXhpdCB0aGUgY2FwdGFpbidzIHF1YXJ0ZXJzXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNUl9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUocXVhcnRlcnMyQlQpO1xudmFyIG1lZGljYWxCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBNRURJQ0FMLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgbWVkaWNhbCByb29tLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRvIHRoZSBub3J0aFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVENfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRvIHRoZSBlYXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNUl9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUobWVkaWNhbEJUKTtcbnZhciBsYWJCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBMQUIsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBsYWIuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkV4aXQgdGhlIGxhYlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkNfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGxhYkJUKTtcbnZhciB0clN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVFJfQ09SUklET1IsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgZm9yd2FyZCBpbiB0aGUgY29ycmlkb3IuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk1vdmUgdG8gdGhlIHdlc3RcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRDX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgc291dGhcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1SX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZSh0clN0YXRlQlQpO1xudmFyIHRjU3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBUQ19DT1JSSURPUixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgd2VzdFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVExfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgbWVkaWNhbCByb29tXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNRURJQ0FMKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0b3dhcmRzIHRoZSBlbGV2YXRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRVhJVF9FTEVWQVRPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGNTdGF0ZUJUKTtcbnZhciBlbGV2YXRvckJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVYSVRfRUxFVkFUT1IsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IHJlYWNoIHRoZSBleGl0IGVsZXZhdG9yLlwiKSxcbiAgICAgICAgICAgIHNlbGVjdG9yKFtcbiAgICAgICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShjcmV3Q2FyZHNDb2xsZWN0ZWQpID49IDIsXG4gICAgICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBjYW4gbm93IGFjdGl2YXRlIHRoZSBleGl0IGFuZCBmbGVlIVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJBY3RpdmF0ZSBhbmQgZ2V0IG91dCFcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiZW5kR2FtZVwiLCBcIndpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgXCJOQVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSkpLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBuZWVkIDIgY3JldyBjYXJkcyB0byBhY3RpdmF0ZSB0aGUgZXhpdCBlbGV2YXRvciBzeXN0ZW0uXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIGJhY2sgaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUQ19DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoZWxldmF0b3JCVCk7XG52YXIgdGxTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFRMX0NPUlJJRE9SLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW4gdGhlIGNvcnJpZG9yLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgZW5naW5lcyByb29tIHRvIHRoZSBub3J0aFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBjb21tdW5pY2F0aW9ucyByb29tIHRvIHRoZSBlYXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT01NUykpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk1vdmUgdG8gdGhlIGVhc3QgaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUQ19DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk1vdmUgdG8gdGhlIHNvdXRoXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGxTdGF0ZUJUKTtcbnZhciBibFN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gQkxfQ09SUklET1IsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgZm9yd2FyZCBpbiB0aGUgY29ycmlkb3IuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk1vdmUgdG8gdGhlIG5vcnRoIGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUxfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSBlYXN0IGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkNfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGJsU3RhdGVCVCk7XG52YXIgbWxTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1MX0NPUlJJRE9SLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW4gdGhlIGNvcnJpZG9yLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgc3RvcmFnZSByb29tXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBTVE9SQUdFKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgbm9ydGggaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk1vdmUgdG8gdGhlIHNvdXRoXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUobWxTdGF0ZUJUKTtcbnZhciBzdG9yYWdlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gU1RPUkFHRSxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHN0b3JhZ2UuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkV4aXQgdGhlIHN0b3JhZ2Ugcm9vbVwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTUxfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHN0b3JhZ2VCVCk7XG52YXIgY29tbXNCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBDT01NUyxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGNvbW11bmljYXRpb25zIHJvb20uXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBjb2NrcGl0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRXhpdCB0aGUgY29tbXVuaWNhdGlvbnMgcm9vbSBpbnRvIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVExfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGNvbW1zQlQpO1xudmFyIGNvY2twaXRCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBDT0NLUElULFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgY29ja3BpdC5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGVuZ2luZXMgcm9vbSB0byB0aGUgZWFzdFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgRU5HSU5FUykpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBjb21tdW5pY2F0aW9ucyByb29tIHRvIHRoZSBzb3V0aFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQ09NTVMpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGNvY2twaXRCVCk7XG52YXIgZW5naW5lc0JUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEVOR0lORVMsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBlbmdpbmVzIHJvb20uXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBjb2NrcGl0IHRvIHRoZSBlYXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT0NLUElUKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvcnJpZG9yIHRvIHRoZSBzb3V0aFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVExfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGVuZ2luZXNCVCk7XG5cbnZhciBjcmV3Q2FyZDFCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBnZXRJdGVtVmFyaWFibGUoY3Jld0NhcmQxLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIGEgY3JldyBjYXJkIGx5aW5nIGFyb3VuZC5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uVHJlZShcIlBpY2sgdXAgdGhlIGNyZXcgY2FyZFwiLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpPT50cnVlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiWW91IHBpY2sgdXAgdGhlIGNyZXcgY2FyZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIHNldEl0ZW1WYXJpYWJsZShjcmV3Q2FyZDEsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShjcmV3Q2FyZHNDb2xsZWN0ZWQsIGdldFZhcmlhYmxlKGNyZXdDYXJkc0NvbGxlY3RlZCkgKyAxKTtcbiAgICAgICAgICAgICAgICB9LCAwKSxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKCgpPT50cnVlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIldvdyB5b3Uga25vdyBob3cgdG8gcGljayB1cCB0aGluZ3MuXCIpfSwgMClcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICBdXG4gICAgKSk7XG52YXIgY3Jld0NhcmQyQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gZ2V0SXRlbVZhcmlhYmxlKGNyZXdDYXJkMiwgXCJjdXJyZW50TG9jYXRpb25cIiksXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5vdGljZSBhIGNyZXcgY2FyZCBseWluZyBhcm91bmQuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlBpY2sgdXAgdGhlIGNyZXcgY2FyZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgY3JldyBjYXJkLlwiKTtcbiAgICAgICAgICAgICAgICBzZXRJdGVtVmFyaWFibGUoY3Jld0NhcmQyLCBcImN1cnJlbnRMb2NhdGlvblwiLCBcInBsYXllclwiKTtcbiAgICAgICAgICAgICAgICBzZXRWYXJpYWJsZShjcmV3Q2FyZHNDb2xsZWN0ZWQsIGdldFZhcmlhYmxlKGNyZXdDYXJkc0NvbGxlY3RlZCkgKyAxKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoY3Jld0NhcmQxQlQpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShjcmV3Q2FyZDJCVCk7XG5cbnZhciBhbGllbk5lYXJieSA9IGd1YXJkKCgpID0+IGFyZUFkamFjZW50KGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSwgZ2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIikpLFxuICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBoZWFyIGEgdGh1bXBpbmcgc291bmQuIFRoZSBhbGllbiBpcyBuZWFyYnkuXCIpKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoYWxpZW5OZWFyYnkpO1xuXG52YXIgZ2FtZU92ZXIgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gXCJOQVwiLFxuICAgIHNlbGVjdG9yKFtcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiZW5kR2FtZVwiKSA9PSBcIndpblwiLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBoYXZlIG1hbmFnZWQgdG8gZXNjYXBlIVwiKSksXG4gICAgICAgICAgICBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShcImVuZEdhbWVcIikgPT0gXCJsb3NlXCIsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiVGhlIGNyZWF0dXJlIGdyYWJzIHlvdSBiZWZvcmUgeW91IGNhbiByZWFjdCEgWW91IHN0cnVnZ2xlIGZvciBhIGJpdCBiZWZvcmUgcmVhbGlzaW5nIGl0J3MgYWxsIG92ZXIuLlwiKSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShnYW1lT3Zlcik7XG5cbi8vNC4gUnVuIHRoZSB3b3JsZFxuaW5pdGlhbGl6ZSgpO1xudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpO1xuXG4vL1JFTkRFUklORy0tLS0tXG52YXIgZGlzcGxheVBhbmVsID0ge3g6IDUwMCwgeTogMH07XG52YXIgdGV4dFBhbmVsID0ge3g6IDUwMCwgeTogMzUwfTtcbnZhciBhY3Rpb25zUGFuZWwgPSB7eDogNTIwLCB5OiA0MjV9O1xuXG52YXIgY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheScpO1xudmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxudmFyIHNwYWNlc2hpcEltYWdlID0gbmV3IEltYWdlKCk7XG5zcGFjZXNoaXBJbWFnZS5vbmxvYWQgPSByZW5kZXI7XG52YXIgcGxheWVySW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnZhciBhbGllbkltYWdlID0gbmV3IEltYWdlKCk7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKHNwYWNlc2hpcEltYWdlLCBkaXNwbGF5UGFuZWwueCwgZGlzcGxheVBhbmVsLnksIDUwMCwgMzAwKTtcbiAgICBkaXNwbGF5UGxheWVyKCk7XG4gICAgZGlzcGxheUFsaWVuKCk7XG4gICAgZGlzcGxheVRleHRBbmRBY3Rpb25zKCk7XG59XG5cbnZhciBtYXBQb3NpdGlvbnMgPSB7XG4gICAgXCJTVEFSVFwiOiB7eDogMjMwLCB5OiAyMzV9LFxuICAgIFwiQkNfQ09SUklET1JcIjoge3g6IDI0MCwgeTogMjEwfSxcbiAgICBcIkJSX0NPUlJJRE9SXCI6IHt4OiAzMDAsIHk6IDE5MH0sXG4gICAgXCJNUl9DT1JSSURPUlwiOiB7eDogMzA1LCB5OiAxNTB9LFxuICAgIFwiUVVBUlRFUlMyXCI6IHt4OiAzNDAsIHk6IDE1NX0sXG4gICAgXCJRVUFSVEVSUzFcIjoge3g6IDM0MCwgeTogMTkwfSxcbiAgICBcIlRSX0NPUlJJRE9SXCI6IHt4OiAzMDAsIHk6IDEwMH0sXG4gICAgXCJUQ19DT1JSSURPUlwiOiB7eDogMjMwLCB5OiAxMDB9LFxuICAgIFwiVExfQ09SUklET1JcIjoge3g6IDE3MCwgeTogMTAwfSxcbiAgICBcIkVYSVRfRUxFVkFUT1JcIjoge3g6IDIzMCwgeTogNjB9LFxuICAgIFwiTEFCXCI6IHt4OiAyNDAsIHk6IDE3MH0sXG4gICAgXCJNTF9DT1JSSURPUlwiOiB7eDogMTYwLCB5OiAxNTB9LFxuICAgIFwiQkxfQ09SUklET1JcIjoge3g6IDE2MCwgeTogMjAwfSxcbiAgICBcIkVOR0lORVNcIjoge3g6IDE3MCwgeTogNjB9LFxuICAgIFwiQ09DS1BJVFwiOiB7eDogMTIwLCB5OiA2MH0sXG4gICAgXCJDT01NU1wiOiB7eDogMTIwLCB5OiAxMDB9LFxuICAgIFwiTUVESUNBTFwiOiB7eDogMjUwLCB5OiAxMzB9LFxuICAgIFwiU1RPUkFHRVwiOiB7eDogMjAwLCB5OiAxNTB9XG59O1xuXG5mdW5jdGlvbiBkaXNwbGF5UGxheWVyKCkge1xuICAgIHZhciBjdXJyTG9jYXRpb24gPSBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbik7XG4gICAgaWYgKCFpc1VuZGVmaW5lZChtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXSkpXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHBsYXllckltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgMTYsIDE2KTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUFsaWVuKCkge1xuICAgIHZhciBjdXJyTG9jYXRpb24gPSBnZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZShhbGllbkltYWdlLCBkaXNwbGF5UGFuZWwueCArIG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dLngsIGRpc3BsYXlQYW5lbC55ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueSwgMjQsIDI0KTtcbn1cblxuc3BhY2VzaGlwSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvaXNvbGF0aW9uX21hcC5wbmdcIjtcbnBsYXllckltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL3BsYXllcjIucG5nXCI7XG5hbGllbkltYWdlLnNyYyA9IFwiLi4vaW1hZ2VzL3hlbm9tb3JwaC5wbmdcIjtcblxudmFyIGN1cnJlbnRTZWxlY3Rpb247XG52YXIgeU9mZnNldCA9IGFjdGlvbnNQYW5lbC55ICsgMjU7XG52YXIgeU9mZnNldEluY3JlbWVudCA9IDUwO1xuXG5mdW5jdGlvbiBkaXNwbGF5VGV4dEFuZEFjdGlvbnMoKSB7XG4gICAgY29udGV4dC5jbGVhclJlY3QodGV4dFBhbmVsLngsIHRleHRQYW5lbC55LCA1MDAsIDEwMDApO1xuICAgIHlPZmZzZXQgPSBhY3Rpb25zUGFuZWwueSArIDI1O1xuXG4gICAgY29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgY29uc29sZS5sb2coXCJBY3Rpb25zIGVmZmVjdCB0ZXh0OiBcIiArIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCk7XG4gICAgdmFyIHRleHRUb0Rpc3BsYXkgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQubGVuZ3RoICE9IDAgPyB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgOiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dDtcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRleHRUb0Rpc3BsYXksIHRleHRQYW5lbC54LCB0ZXh0UGFuZWwueSArIDIwKTtcblxuICAgIGNvbnRleHQuZm9udCA9IFwiMTVwdCBDYWxpYnJpXCI7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdXNlckFjdGlvblRleHQgPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2ldO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHVzZXJBY3Rpb25UZXh0LCBhY3Rpb25zUGFuZWwueCArIDIwLCB5T2Zmc2V0KTtcbiAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbiA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgeU9mZnNldCArPSB5T2Zmc2V0SW5jcmVtZW50O1xuICAgIH1cblxuICAgIGRpc3BsYXlBcnJvdygpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3JldyBjYXJkczogXCIgKyBnZXRWYXJpYWJsZShjcmV3Q2FyZHNDb2xsZWN0ZWQpKTtcbn1cblxuZnVuY3Rpb24gZGlzcGxheUFycm93KCkge1xuICAgIGlmKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApe1xuICAgICAgICBjb250ZXh0LmNsZWFyUmVjdChhY3Rpb25zUGFuZWwueCwgYWN0aW9uc1BhbmVsLnksIDIwLCAxMDAwKTtcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChcIj4gXCIsIDUyMCwgYWN0aW9uc1BhbmVsLnkgKyAyNSArIChjdXJyZW50U2VsZWN0aW9uICogeU9mZnNldEluY3JlbWVudCkpO1xuICAgIH1cbn1cblxuLy9Vc2VyIGlucHV0XG5mdW5jdGlvbiBrZXlQcmVzcyhlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgICB2YXIgc2VsZWN0ZWRBY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0W2N1cnJlbnRTZWxlY3Rpb25dO1xuICAgICAgICBpZighaXNVbmRlZmluZWQoc2VsZWN0ZWRBY3Rpb24pKXtcbiAgICAgICAgICAgIGV4ZWN1dGVVc2VyQWN0aW9uKHNlbGVjdGVkQWN0aW9uKTtcbiAgICAgICAgICAgIHdvcmxkVGljaygpO1xuICAgICAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGtleURvd24oZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT0gNDApIHsvL2Rvd25cbiAgICAgICAgaWYgKHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24rKztcbiAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50U2VsZWN0aW9uICUgdXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGg7XG4gICAgICAgICAgICBkaXNwbGF5QXJyb3coKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDM4KSB7Ly91cFxuICAgICAgICBpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi0tO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24gPCAwKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBkaXNwbGF5QXJyb3coKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGtleVByZXNzLCBmYWxzZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duLCBmYWxzZSk7XG4iLCJpbXBvcnQgUXVldWUgZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWVcIjtcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcblxuZXhwb3J0IGVudW0gU3RhdHVzIHtcbiAgICBSVU5OSU5HLFxuICAgIFNVQ0NFU1MsXG4gICAgRkFJTFVSRVxufVxuXG5mdW5jdGlvbiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQ6IG51bWJlciwgYmxhY2tib2FyZDogYW55LCBzdGF0dXM6IFN0YXR1cykge1xuICAgIGRlbGV0ZSBibGFja2JvYXJkW2lkXTtcbiAgICByZXR1cm4gc3RhdHVzO1xufVxuXG5leHBvcnQgdHlwZSBFZmZlY3QgPSAoKSA9PiB2b2lkXG5leHBvcnQgdHlwZSBQcmVjb25kaXRpb24gPSAoKSA9PiBib29sZWFuXG5leHBvcnQgdHlwZSBUaWNrID0gKCkgPT4gU3RhdHVzXG5leHBvcnQgdHlwZSBBY3Rpb25UaWNrID0gKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBlZmZlY3Q6IEVmZmVjdCwgdGlja3NSZXF1aXJlZD86IG51bWJlcikgPT4gVGlja1xuLyoqXG4gKiBUaGUgZ3VhcmQgdGljayBpcyB0byBhZGQgYSBwcmVjb25kaXRpb24gdG8gdGhlIGNvbXBvc2l0ZSB0aWNrc1xuICovXG5leHBvcnQgdHlwZSBHdWFyZFRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2ssIG5lZ2F0ZT86IGJvb2xlYW4pID0+IFRpY2tcbi8qKlxuICogU2VxdWVuY2UvU2VsZWN0b3JcbiAqL1xuZXhwb3J0IHR5cGUgQ29tcG9zaXRlVGljayA9IChhc3RUaWNrczogVGlja1tdKSA9PiBUaWNrXG5cbnZhciBibGFja2JvYXJkID0ge307XG5cbmZ1bmN0aW9uIGdldEFjdGlvblRpY2soaWQ6IG51bWJlcik6IEFjdGlvblRpY2sge1xuICAgIHJldHVybiAocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQgPSAxKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgdXRpbCA9IGdldFZhcmlhYmxlKFwidXRpbGl0eVwiKTtcbiAgICAgICAgICAgIGlmICh1dGlsKSB7XG4gICAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXS51dGlsaXR5KXtcbiAgICAgICAgICAgICAgICB2YXIgdXRpbGl0eSA9IDE7XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udXRpbGl0eSA9IHV0aWxpdHk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiLCB1dGlsaXR5KTtcbiAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJlY29uZGl0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXS50aWNrc0RvbmUpIHtcbiAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgYXN0VGljaywgbmVnYXRlID0gZmFsc2UpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2VlZCA/IGV4ZWN1dGUoYXN0VGljaykgOiBTdGF0dXMuRkFJTFVSRTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgdXRpbCA9IGdldFZhcmlhYmxlKFwidXRpbGl0eVwiKTtcbiAgICAgICAgICAgIGlmICh1dGlsKSB7XG4gICAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhQID0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdLnV0aWxpdHkpe1xuICAgICAgICAgICAgICAgIHZhciB1dGlsaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4UCA8IGFzdFRpY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleFBdKTtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4UCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB1dGlsaXR5ICs9IGdldFZhcmlhYmxlKFwibGFzdFV0aWxcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHV0aWxpdHkgPSB1dGlsaXR5L2FzdFRpY2tzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS51dGlsaXR5ID0gdXRpbGl0eTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRWYXJpYWJsZShcImxhc3RVdGlsXCIsIHV0aWxpdHkpO1xuICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdG9yVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIHV0aWwgPSBnZXRWYXJpYWJsZShcInV0aWxpdHlcIik7XG4gICAgICAgICAgICBpZiAodXRpbCkge1xuICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4UCA9IDA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXS51dGlsaXR5KXtcbiAgICAgICAgICAgICAgICB2YXIgdXRpbGl0eSA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleFAgPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhQXSk7XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleFAgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWxpdHkgPCBnZXRWYXJpYWJsZShcImxhc3RVdGlsXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICB1dGlsaXR5ID0gZ2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXVtcInV0aWxpdHlcIl0gPSB1dGlsaXR5O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwibGFzdFV0aWxcIiwgdXRpbGl0eSk7XG4gICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlJVTk5JTkcpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5GQUlMVVJFKVxuICAgICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoYXN0VGljazogVGljayk6IFN0YXR1cyB7XG4gICAgcmV0dXJuIGFzdFRpY2soKTtcbn1cblxudmFyIGdsb2JhbElkQ291bnRlciA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb24ocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKTogVGljayB7XG4gICAgcmV0dXJuIGdldEFjdGlvblRpY2soZ2xvYmFsSWRDb3VudGVyKyspKHByZWNvbmRpdGlvbiwgZWZmZWN0LCB0aWNrc1JlcXVpcmVkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VhcmQocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGFzdFRpY2s6IFRpY2spOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0R3VhcmRUaWNrKCkocHJlY29uZGl0aW9uLCBhc3RUaWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ19ndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2ssIHRydWUpO1xufVxuXG4vKipcbiAqIEN5Y2xlcyBvdmVyIGl0cyBjaGlsZHJlbjogaXRlcmF0ZXMgdG8gdGhlIG5leHQgY2hpbGQgb24gc3VjY2VzcyBvZiBhIGNoaWxkXG4gKiBTdWNjZWVkcyBpZiBhbGwgc3VjY2VlZCwgZWxzZSBmYWlsc1xuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXG4gKiBAcmV0dXJucyB7VGlja31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0U2VxdWVuY2VUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XG59XG5cbi8qKlxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBmYWlsdXJlIG9mIGEgY2hpbGQodGhpbmsgb2YgaXQgYXMgaWYtZWxzZSBibG9ja3MpXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXG4gKiBAcmV0dXJucyB7VGlja31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdG9yKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0U2VsZWN0b3JUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XG59XG5cbi8qKlxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBmYWlsdXJlIG9mIGEgY2hpbGQodGhpbmsgb2YgaXQgYXMgaWYtZWxzZSBibG9ja3MpXG4gKiBTdWNjZWVkcyBpZiBldmVuIG9uZSBzdWNjZWVkcywgZWxzZSBmYWlsc1xuICogQHBhcmFtIHtUaWNrW119IGFzdFRpY2tzXG4gKiBAcmV0dXJucyB7VGlja31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdG9yKGFzdFRpY2tzOiBUaWNrW10pOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0U2VsZWN0b3JUaWNrKGdsb2JhbElkQ291bnRlcisrKShhc3RUaWNrcyk7XG59XG5cblxuLyotLS0tLS0tLS0tLS0tLS0gQVBJcyAtLS0tLS0tLS0tLS0tLS0gKi9cblxuLy8wLiB1dGlsaXRpZXNcbi8vIG1pbiBhbmQgbWF4IGFyZSBpbmNsdXNpdmVcbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5kTnVtYmVyKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG5cbi8vMS4gc3RvcnkgaW5zdGFuY2VcblxuLy8xLjEgbG9jYXRpb25zXG52YXIgbG9jYXRpb25HcmFwaCA9IHt9O1xuXG4vL2FkZCB0byBib3RoIHNpZGVzXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9jYXRpb24obG9jYXRpb25OYW1lOiBzdHJpbmcsIGFkamFjZW50TG9jYXRpb25zOiBzdHJpbmdbXSkge1xuICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKVxuICAgICAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBbXTtcbiAgICBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0gPSBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uTmFtZV0uY29uY2F0KGFkamFjZW50TG9jYXRpb25zKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWRqYWNlbnRMb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGxvY2F0aW9uR3JhcGhbYWRqYWNlbnRMb2NhdGlvbnNbaV1dID0gW107XG5cbiAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0ucHVzaChsb2NhdGlvbk5hbWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFkamFjZW50KGxvY2F0aW9uMTogc3RyaW5nLCBsb2NhdGlvbjI6IHN0cmluZyk6Ym9vbGVhbiB7XG4gICAgY29uc29sZS5sb2coXCJBcmUgYWRqYWNlbnQ6IFwiICsgbG9jYXRpb24xICsgXCIsIFwiK2xvY2F0aW9uMik7XG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXSA9PSB1bmRlZmluZWQgfHwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjJdID09IHVuZGVmaW5lZCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWl0aGVyIG9uZS9ib3RoIGxvY2F0aW9ucyB1bmRlZmluZWRcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uR3JhcGhbbG9jYXRpb24xXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdW2ldID09IGxvY2F0aW9uMil7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8vcGF0aGZpbmRpbmcgcHJpbWl0aXZlc1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRMb2NhdGlvbihzdGFydDogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YXIgdmlzaXRlZCA9IHt9O1xuICAgIHZhciBwcmV2aW91cyA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBsb2NhdGlvbkdyYXBoKSB7XG4gICAgICAgIHZpc2l0ZWRba2V5XSA9IGZhbHNlO1xuICAgIH1cbiAgICB2aXNpdGVkW3N0YXJ0XSA9IHRydWU7XG5cbiAgICB2YXIgbXlRdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XG4gICAgbXlRdWV1ZS5lbnF1ZXVlKHN0YXJ0KTtcblxuICAgIHdoaWxlICghbXlRdWV1ZS5pc0VtcHR5KCkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQ6IHN0cmluZyA9IG15UXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSBsb2NhdGlvbkdyYXBoW2N1cnJlbnRdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXZpc2l0ZWRbbmVpZ2hib3JzW2ldXSkge1xuICAgICAgICAgICAgICAgIG15UXVldWUuZW5xdWV1ZShuZWlnaGJvcnNbaV0pO1xuICAgICAgICAgICAgICAgIHZpc2l0ZWRbbmVpZ2hib3JzW2ldXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNbbmVpZ2hib3JzW2ldXSA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY3VycmVudDogc3RyaW5nID0gZGVzdGluYXRpb247XG4gICAgaWYgKGN1cnJlbnQgPT0gc3RhcnQpXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIHdoaWxlIChwcmV2aW91c1tjdXJyZW50XSAhPSBzdGFydCkge1xuICAgICAgICBjdXJyZW50ID0gcHJldmlvdXNbY3VycmVudF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbi8vMS4yIGFnZW50c1xudmFyIGFnZW50cyA9IFtdO1xudmFyIHBlcnNvbmFsaXR5QWdlbnRzID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRBZ2VudChhZ2VudE5hbWU6IHN0cmluZykge1xuICAgIGFnZW50cy5wdXNoKGFnZW50TmFtZSk7XG4gICAgcmV0dXJuIGFnZW50TmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFBlcnNvbmFsaXR5QWdlbnQoYWdlbnROYW1lOiBzdHJpbmcsIG8xOiBudW1iZXIsIG8yOiBudW1iZXIsIGMxOiBudW1iZXIsXG4gIGMyOiBudW1iZXIsIGUxOiBudW1iZXIsIGUyOiBudW1iZXIsIGExOiBudW1iZXIsIGEyOiBudW1iZXIsIG4xOiBudW1iZXIsIG4yOiBudW1iZXIpIHtcbiAgICB2YXIgcGVyc29uYWxpdHkgPSB7fTtcbiAgICBwZXJzb25hbGl0eVtcIm5hbWVcIl0gPSBhZ2VudE5hbWU7XG4gICAgcGVyc29uYWxpdHlbXCJvcGVubmVzc1wiXSA9IG8xO1xuICAgIHBlcnNvbmFsaXR5W1wiaW50ZWxsZWN0XCJdID0gbzI7XG4gICAgcGVyc29uYWxpdHlbXCJpbmR1c3RyaW91c25lc3NcIl0gPSBjMTtcbiAgICBwZXJzb25hbGl0eVtcIm9yZGVybGluZXNzXCJdID0gYzI7XG4gICAgcGVyc29uYWxpdHlbXCJlbnRodXNpYXNtXCJdID0gZTE7XG4gICAgcGVyc29uYWxpdHlbXCJhc3NlcnRpdmVuZXNzXCJdID0gZTI7XG4gICAgcGVyc29uYWxpdHlbXCJjb21wYXNzaW9uXCJdID0gYTE7XG4gICAgcGVyc29uYWxpdHlbXCJwb2xpdGVuZXNzXCJdID0gYTI7XG4gICAgcGVyc29uYWxpdHlbXCJ2b2xhdGlsaXR5XCJdID0gbjE7XG4gICAgcGVyc29uYWxpdHlbXCJ3aXRoZHJhd2FsXCJdID0gbjI7XG4gICAgcGVyc29uYWxpdHlBZ2VudHMucHVzaChwZXJzb25hbGl0eSk7XG4gICAgcmV0dXJuIGFnZW50TmFtZTtcbn1cblxuLy8xLjMgaXRlbXNcbnZhciBpdGVtcyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSXRlbShpdGVtTmFtZTogc3RyaW5nKSB7XG4gICAgaXRlbXMucHVzaChpdGVtTmFtZSk7XG4gICAgcmV0dXJuIGl0ZW1OYW1lO1xufVxuXG4vLzEuNCB2YXJpYWJsZXNcbnZhciB2YXJpYWJsZXMgPSB7fTtcbnZhciBhZ2VudFZhcmlhYmxlcyA9IHt9O1xudmFyIGl0ZW1WYXJpYWJsZXMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZhcmlhYmxlKHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHZhcmlhYmxlc1t2YXJOYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YXJOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSlcbiAgICAgICAgYWdlbnRWYXJpYWJsZXNbYWdlbnRdID0ge307XG5cbiAgICBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWYXJpYWJsZSh2YXJOYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmIChpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgbm90IHNldCFcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHZhcmlhYmxlc1t2YXJOYW1lXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFnZW50VmFyaWFibGUoYWdlbnQ6IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XSkgfHwgaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZhcmlhYmxlIFwiICsgdmFyTmFtZSArIFwiIGZvciBhZ2VudCBcIiArIGFnZW50ICsgXCIgbm90IHNldCFcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gYWdlbnRWYXJpYWJsZXNbYWdlbnRdW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYXJpYWJsZU5vdFNldCh2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQodmFyaWFibGVzW3Zhck5hbWVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWdlbnRWYXJpYWJsZU5vdFNldChhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SXRlbVZhcmlhYmxlKGl0ZW06IHN0cmluZywgdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pKVxuICAgICAgICBpdGVtVmFyaWFibGVzW2l0ZW1dID0ge307XG5cbiAgICBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXRlbVZhcmlhYmxlKGl0ZW06IHN0cmluZywgdmFyTmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV0pIHx8IGlzVW5kZWZpbmVkKGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGl0ZW0gXCIgKyBpdGVtICsgXCIgbm90IHNldCFcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXTtcbn1cblxuXG4vLzJcbi8vYWdlbnQtYmVoYXZpb3IgdHJlZSBtYXBwaW5nXG52YXIgYWdlbnRUcmVlcyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoVHJlZVRvQWdlbnQoYWdlbnQ6IHN0cmluZywgdHJlZTogVGljaykge1xuICAgIGFnZW50VHJlZXNbYWdlbnRdID0gdHJlZTtcbn1cblxuLy8zLjFcbi8vdXNlciBhY3Rpb25zXG4vL1RPRE8gYWRkIHZhcmlhYmxlcyB0byB1c2VyIGFjdGlvbiB0ZXh0c1xudmFyIHVzZXJJbnRlcmFjdGlvbk9iamVjdCA9IHtcbiAgICB0ZXh0OiBcIlwiLFxuICAgIHVzZXJBY3Rpb25zVGV4dDogW10sXG4gICAgYWN0aW9uRWZmZWN0c1RleHQ6IFwiXCJcbn1cbnZhciB1c2VySW50ZXJhY3Rpb25UcmVlcyA9IFtdO1xudmFyIHVzZXJBY3Rpb25zID0ge307XG5cbmZ1bmN0aW9uIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCkge1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ID0gXCJcIjtcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0ID0gW107XG4gICAgdXNlckFjdGlvbnMgPSB7fTsvL3tcIkdvIHRvIGxvY2F0aW9uIFhcIiA6IGVmZmVjdFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlckludGVyYWN0aW9uVHJlZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZXhlY3V0ZSh1c2VySW50ZXJhY3Rpb25UcmVlc1tpXSk7XG4gICAgfVxufVxuXG5leHBvcnQgbGV0IGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbiA9ICh0ZXh0OiBzdHJpbmcpID0+XG4gICAgYWN0aW9uKFxuICAgICAgICAoKSA9PiB0cnVlLFxuICAgICAgICAoKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QudGV4dCArPSBcIlxcblwiICsgdGV4dCwgMFxuICAgICk7XG5leHBvcnQgbGV0IGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4gdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ICs9IFwiXFxuXCIgKyB0ZXh0O1xuXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb25UcmVlID0gKHRleHQ6IHN0cmluZywgZWZmZWN0VHJlZTogVGljaykgPT4gYWN0aW9uKFxuICAgICgpID0+IHRydWUsXG4gICAgKCkgPT4gbWFwVXNlckFjdGlvblRvVHJlZSh0ZXh0LCBlZmZlY3RUcmVlKSwgMFxuKTtcblxuZXhwb3J0IGxldCBhZGRVc2VyQWN0aW9uID0gKHRleHQ6IHN0cmluZywgZWZmZWN0OiAoKSA9PiBhbnkpID0+XG4gICAgYWN0aW9uKFxuICAgICAgICAoKSA9PiB0cnVlLFxuICAgICAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGFjdGlvbigoKT0+dHJ1ZSwgZWZmZWN0LCAwKSksIDBcbiAgICApO1xuXG5mdW5jdGlvbiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQ6IHN0cmluZywgdHJlZTogVGljaykge1xuICAgIHVzZXJBY3Rpb25zW3RleHRdID0gdHJlZTtcbiAgICB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0LnB1c2godGV4dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRpY2s6IFRpY2spIHtcbiAgICB1c2VySW50ZXJhY3Rpb25UcmVlcy5wdXNoKHRpY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVVzZXJBY3Rpb24odGV4dDogc3RyaW5nKSB7XG4gICAgLy9leGVjdXRlIHRoZSB1c2VyIGFjdGlvblxuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCA9IFwiXCI7XG4gICAgdmFyIHVzZXJBY3Rpb25FZmZlY3RUcmVlID0gdXNlckFjdGlvbnNbdGV4dF07XG4gICAgZXhlY3V0ZSh1c2VyQWN0aW9uRWZmZWN0VHJlZSk7XG59XG5cbi8vNC5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHJ1blVzZXJJbnRlcmFjdGlvblRyZWVzKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySW50ZXJhY3Rpb25PYmplY3QoKSB7XG4gICAgcmV0dXJuIHVzZXJJbnRlcmFjdGlvbk9iamVjdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdvcmxkVGljaygpIHtcbiAgICAvL2FsbCBhZ2VudCB0aWNrc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWdlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0cmVlID0gYWdlbnRUcmVlc1thZ2VudHNbaV1dO1xuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRyZWUpKSB7XG4gICAgICAgICAgICBzZXRWYXJpYWJsZShcImV4ZWN1dGluZ0FnZW50XCIsIGFnZW50c1tpXSk7XG4gICAgICAgICAgICBleGVjdXRlKHRyZWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGVyc29uYWxpdHlBZ2VudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyZWUgPSBhZ2VudFRyZWVzW3BlcnNvbmFsaXR5QWdlbnRzW2ldW1wibmFtZVwiXV07XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodHJlZSkpIHtcbiAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiZXhlY3V0aW5nQWdlbnRcIiwgcGVyc29uYWxpdHlBZ2VudHNbaV1bXCJuYW1lXCJdKTtcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcbn1cbiJdfQ==
