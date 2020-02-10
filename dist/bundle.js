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
                var utility = 1;
                blackboard[id]["utility"] = utility;
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
                    blackboard[id].currentIndex = 0;
                }
                var utility = 0;
                while (blackboard[id].currentIndex < astTicks.length) {
                    var childStatus = execute(astTicks[blackboard[id].currentIndex]);
                    blackboard[id].currentIndex += 1;
                    utility += getVariable("lastUtil");
                }
                utility = utility / astTicks.length;
                blackboard[id]["utility"] = utility;
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
                    blackboard[id].currentIndex = 0;
                }
                var utility = 0;
                while (blackboard[id].currentIndex < astTicks.length) {
                    var childStatus = execute(astTicks[blackboard[id].currentIndex]);
                    blackboard[id].currentIndex += 1;
                    if (utility < getVariable("lastUtil")) {
                        utility = getVariable("lastUtil");
                    }
                }
                blackboard[id]["utility"] = utility;
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
    setVariable("utility", true);
    astTick();
    setVariable("utility", false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9MaW5rZWRMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvUXVldWUuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9hcnJheXMuanMiLCJub2RlX21vZHVsZXMvdHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi91dGlsLmpzIiwic3JjL2lzb2xhdGlvbi50cyIsInNyYy9zY3JpcHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUMsQ0FBQztBQUNsQyxDQUFDO0FBTEQsOENBS0M7QUFFRCxJQUFJO0FBQ0o7SUFDSSx1QkFBdUIsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFGRCxnQ0FFQztBQUVEO0lBQ0ksT0FBTyxxQkFBcUIsQ0FBQztBQUNqQyxDQUFDO0FBRkQsNERBRUM7QUFFRDtJQUNJLGlCQUFpQjtJQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGtCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsa0JBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwQixXQUFXLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELHVCQUF1QixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQWpCRCw4QkFpQkMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbnZhciBhcnJheXMgPSByZXF1aXJlKFwiLi9hcnJheXNcIik7XG52YXIgTGlua2VkTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IExpbmtlZCBMaXN0LlxuICAgICAqIEBjbGFzcyBBIGxpbmtlZCBsaXN0IGlzIGEgZGF0YSBzdHJ1Y3R1cmUgY29uc2lzdGluZyBvZiBhIGdyb3VwIG9mIG5vZGVzXG4gICAgICogd2hpY2ggdG9nZXRoZXIgcmVwcmVzZW50IGEgc2VxdWVuY2UuXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpcnN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIExhc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBOdW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGxpc3RcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBlbGVtZW50IHRvIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIGJlIGFkZGVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gaW5kZXggb3B0aW9uYWwgaW5kZXggdG8gYWRkIHRoZSBlbGVtZW50LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWRcbiAgICAgKiB0aGUgZWxlbWVudCBpcyBhZGRlZCB0byB0aGUgZW5kIG9mIHRoaXMgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBhZGRlZCBvciBmYWxzZSBpZiB0aGUgaW5kZXggaXMgaW52YWxpZFxuICAgICAqIG9yIGlmIHRoZSBlbGVtZW50IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaW5kZXgpKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMubkVsZW1lbnRzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLm5FbGVtZW50cyB8fCB1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmNyZWF0ZU5vZGUoaXRlbSk7XG4gICAgICAgIGlmICh0aGlzLm5FbGVtZW50cyA9PT0gMCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBGaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnQgYXQgdGhlIGVuZC5cbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUubmV4dCA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgaWYgKHByZXYgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSBwcmV2Lm5leHQ7XG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubkVsZW1lbnRzKys7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXG4gICAgICogZW1wdHkuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpcnN0Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcbiAgICAgKiBlbXB0eS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZGVzaXJlZCBpbmRleC5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggb3IgdW5kZWZpbmVkIGlmIHRoZSBpbmRleCBpc1xuICAgICAqIG91dCBvZiBib3VuZHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4KTtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IGluIHRoaXMgbGlzdCBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGVcbiAgICAgKiBzcGVjaWZpZWQgZWxlbWVudCwgb3IgLTEgaWYgdGhlIExpc3QgZG9lcyBub3QgY29udGFpbiB0aGlzIGVsZW1lbnQuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlXG4gICAgICogb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGlzIGxpc3QgZG9lcyBub3QgY29udGFpbiB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAoaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIGVxdWFsc0YgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVxdWFsc0YoY3VycmVudE5vZGUuZWxlbWVudCwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXG4gICAgICogbm90IGNvbXBhcmFibGUgd2l0aCB0aGUgPT09IG9wZXJhdG9yIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgKiAgcmV0dXJuIHBldDEubmFtZSA9PT0gcGV0Mi5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gT3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LCBmYWxzZVxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gKHRoaXMuaW5kZXhPZihpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoaXMgbGlzdCwgaWYgcHJlc2VudC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBsaXN0IGNvbnRhaW5lZCB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPCAxIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5sYXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHByZXZpb3VzO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cy5uZXh0ID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKiBUd28gbGlzdHMgYXJlIGVxdWFsIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBvcmRlci5cbiAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3R9IG90aGVyIHRoZSBvdGhlciBsaXN0LlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjaGVjayBpZiB0d28gZWxlbWVudHMgYXJlIGVxdWFsLiBJZiB0aGUgZWxlbWVudHMgaW4gdGhlIGxpc3RzXG4gICAgICogYXJlIGN1c3RvbSBvYmplY3RzIHlvdSBzaG91bGQgcHJvdmlkZSBhIGZ1bmN0aW9uLCBvdGhlcndpc2VcbiAgICAgKiB0aGUgPT09IG9wZXJhdG9yIGlzIHVzZWQgdG8gY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob3RoZXIsIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcUYgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTGlua2VkTGlzdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaXplKCkgIT09IG90aGVyLnNpemUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFsc0F1eCh0aGlzLmZpcnN0Tm9kZSwgb3RoZXIuZmlyc3ROb2RlLCBlcUYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lcXVhbHNBdXggPSBmdW5jdGlvbiAobjEsIG4yLCBlcUYpIHtcbiAgICAgICAgd2hpbGUgKG4xICE9PSBudWxsICYmIG4yICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoIWVxRihuMS5lbGVtZW50LCBuMi5lbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG4xID0gbjEubmV4dDtcbiAgICAgICAgICAgIG4yID0gbjIubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGVsZW1lbnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGlzIGxpc3QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IGdpdmVuIGluZGV4LlxuICAgICAqIEByZXR1cm4geyp9IHJlbW92ZWQgZWxlbWVudCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzIG91dCBvZiBib3VuZHMuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmVtb3ZlRWxlbWVudEF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cyB8fCB0aGlzLmZpcnN0Tm9kZSA9PT0gbnVsbCB8fCB0aGlzLmxhc3ROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDEpIHtcbiAgICAgICAgICAgIC8vRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXMgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMuZmlyc3ROb2RlLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcmV2aW91cy5uZXh0ID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMubGFzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJldmlvdXMgIT09IG51bGwgJiYgcHJldmlvdXMubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwcmV2aW91cy5uZXh0LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IHByZXZpb3VzLm5leHQubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIGxpc3QgaW4gb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGN1cnJlbnROb2RlLmVsZW1lbnQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXZlcnNlcyB0aGUgb3JkZXIgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlua2VkIGxpc3QgKG1ha2VzIHRoZSBsYXN0XG4gICAgICogZWxlbWVudCBmaXJzdCwgYW5kIHRoZSBmaXJzdCBlbGVtZW50IGxhc3QpLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmV2aW91cyA9IG51bGw7XG4gICAgICAgIHZhciBjdXJyZW50ID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHZhciB0ZW1wID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRlbXAgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBwcmV2aW91cztcbiAgICAgICAgICAgIHByZXZpb3VzID0gY3VycmVudDtcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICAgIHRlbXAgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmxhc3ROb2RlO1xuICAgICAgICB0aGlzLmxhc3ROb2RlID0gdGVtcDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgbGlzdCBpbiBwcm9wZXJcbiAgICAgKiBzZXF1ZW5jZS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheS48Kj59IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QsXG4gICAgICogaW4gcHJvcGVyIHNlcXVlbmNlLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKGN1cnJlbnROb2RlLmVsZW1lbnQpO1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgbGlzdC5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cyA8PSAwO1xuICAgIH07XG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcnJheXMudG9TdHJpbmcodGhpcy50b0FycmF5KCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5ub2RlQXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09ICh0aGlzLm5FbGVtZW50cyAtIDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGV4ICYmIG5vZGUgIT09IG51bGw7IGkrKykge1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY3JlYXRlTm9kZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlbGVtZW50OiBpdGVtLFxuICAgICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtlZExpc3Q7XG59KCkpOyAvLyBFbmQgb2YgbGlua2VkIGxpc3RcbmV4cG9ydHMuZGVmYXVsdCA9IExpbmtlZExpc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5rZWRMaXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoXCIuL0xpbmtlZExpc3RcIik7XG52YXIgUXVldWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cbiAgICAgKiBAY2xhc3MgQSBxdWV1ZSBpcyBhIEZpcnN0LUluLUZpcnN0LU91dCAoRklGTykgZGF0YSBzdHJ1Y3R1cmUsIHRoZSBmaXJzdFxuICAgICAqIGVsZW1lbnQgYWRkZWQgdG8gdGhlIHF1ZXVlIHdpbGwgYmUgdGhlIGZpcnN0IG9uZSB0byBiZSByZW1vdmVkLiBUaGlzXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlua2VkTGlzdF8xLmRlZmF1bHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbmQgcmVtb3ZlcyB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3QuZmlyc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBzdGFjayBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSAocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuY29udGFpbnMoZWxlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhbmQgb25seSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIG5vIGl0ZW1zOyBmYWxzZVxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXG4gICAgICogRklGTyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goY2FsbGJhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXVlO1xufSgpKTsgLy8gRW5kIG9mIHF1ZXVlXG5leHBvcnRzLmRlZmF1bHQgPSBRdWV1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGl0ZW1cbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LjRcbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudFxuICogd2l0aGluIHRoZSBzcGVjaWZpZWQgYXJyYXksIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcG9zaXRpb24gb2YgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5IG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gbGFzdEluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufVxuZXhwb3J0cy5sYXN0SW5kZXhPZiA9IGxhc3RJbmRleE9mO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGFycmF5IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSA+PSAwO1xufVxuZXhwb3J0cy5jb250YWlucyA9IGNvbnRhaW5zO1xuLyoqXG4gKiBSZW1vdmVzIHRoZSBmaXJzdCBvY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50IGZyb20gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGNoYW5nZWQgYWZ0ZXIgdGhpcyBjYWxsLlxuICovXG5mdW5jdGlvbiByZW1vdmUoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihhcnJheSwgaXRlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5yZW1vdmUgPSByZW1vdmU7XG4vKipcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5IGVxdWFsXG4gKiB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHdob3NlIGZyZXF1ZW5jeSBpcyB0byBiZSBkZXRlcm1pbmVkLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZCB0b1xuICogY2hlY2sgZXF1YWxpdHkgYmV0d2VlbiAyIGVsZW1lbnRzLlxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAqIGVxdWFsIHRvIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmcmVxdWVuY3koYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHZhciBmcmVxID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlcXVhbHMoYXJyYXlbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICBmcmVxKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZyZXE7XG59XG5leHBvcnRzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB0d28gc3BlY2lmaWVkIGFycmF5cyBhcmUgZXF1YWwgdG8gb25lIGFub3RoZXIuXG4gKiBUd28gYXJyYXlzIGFyZSBjb25zaWRlcmVkIGVxdWFsIGlmIGJvdGggYXJyYXlzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyXG4gKiBvZiBlbGVtZW50cywgYW5kIGFsbCBjb3JyZXNwb25kaW5nIHBhaXJzIG9mIGVsZW1lbnRzIGluIHRoZSB0d29cbiAqIGFycmF5cyBhcmUgZXF1YWwgYW5kIGFyZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBvbmUgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiB0aGUgb3RoZXIgYXJyYXkgdG8gYmUgdGVzdGVkIGZvciBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVtZW50cyBpbiB0aGUgYXJyYXlzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWxcbiAqL1xuZnVuY3Rpb24gZXF1YWxzKGFycmF5MSwgYXJyYXkyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkxLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZXF1YWxzKGFycmF5MVtpXSwgYXJyYXkyW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZXhwb3J0cy5lcXVhbHMgPSBlcXVhbHM7XG4vKipcbiAqIFJldHVybnMgc2hhbGxvdyBhIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IHRvIGNvcHkuXG4gKiBAcmV0dXJuIHtBcnJheX0gYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAqL1xuZnVuY3Rpb24gY29weShhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5jb25jYXQoKTtcbn1cbmV4cG9ydHMuY29weSA9IGNvcHk7XG4vKipcbiAqIFN3YXBzIHRoZSBlbGVtZW50cyBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9ucyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5LlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIHN3YXAgZWxlbWVudHMuXG4gKiBAcGFyYW0ge251bWJlcn0gaSB0aGUgaW5kZXggb2Ygb25lIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBqIHRoZSBpbmRleCBvZiB0aGUgb3RoZXIgZWxlbWVudCB0byBiZSBzd2FwcGVkLlxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgYXJyYXkgaXMgZGVmaW5lZCBhbmQgdGhlIGluZGV4ZXMgYXJlIHZhbGlkLlxuICovXG5mdW5jdGlvbiBzd2FwKGFycmF5LCBpLCBqKSB7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gYXJyYXkubGVuZ3RoIHx8IGogPCAwIHx8IGogPj0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcbiAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xuICAgIGFycmF5W2pdID0gdGVtcDtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuc3dhcCA9IHN3YXA7XG5mdW5jdGlvbiB0b1N0cmluZyhhcnJheSkge1xuICAgIHJldHVybiAnWycgKyBhcnJheS50b1N0cmluZygpICsgJ10nO1xufVxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuLyoqXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBhcnJheVxuICogc3RhcnRpbmcgZnJvbSBpbmRleCAwIHRvIGxlbmd0aCAtIDEuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgaW4gd2hpY2ggdG8gaXRlcmF0ZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBhcnJheV8xID0gYXJyYXk7IF9pIDwgYXJyYXlfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGVsZSA9IGFycmF5XzFbX2ldO1xuICAgICAgICBpZiAoY2FsbGJhY2soZWxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZm9yRWFjaCA9IGZvckVhY2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmV4cG9ydHMuaGFzID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICAgIHJldHVybiBfaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufTtcbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb21wYXJlIGVsZW1lbnQgb3JkZXIuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmUoYSwgYikge1xuICAgIGlmIChhIDwgYikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHRDb21wYXJlID0gZGVmYXVsdENvbXBhcmU7XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gdGVzdCBlcXVhbGl0eS5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWZhdWx0RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSA9PT0gYjtcbn1cbmV4cG9ydHMuZGVmYXVsdEVxdWFscyA9IGRlZmF1bHRFcXVhbHM7XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29udmVydCBhbiBvYmplY3QgdG8gYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdFRvU3RyaW5nKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gJyRzJyArIGl0ZW07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJyRvJyArIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHRUb1N0cmluZyA9IGRlZmF1bHRUb1N0cmluZztcbi8qKlxuICogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gbWFrZVN0cmluZyhpdGVtLCBqb2luKSB7XG4gICAgaWYgKGpvaW4gPT09IHZvaWQgMCkgeyBqb2luID0gJywnOyB9XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciB0b3JldCA9ICd7JztcbiAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBpdGVtKSB7XG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5oYXMoaXRlbSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBqb2luO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b3JldCA9IHRvcmV0ICsgcHJvcCArICc6JyArIGl0ZW1bcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvcmV0ICsgJ30nO1xuICAgIH1cbn1cbmV4cG9ydHMubWFrZVN0cmluZyA9IG1ha2VTdHJpbmc7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmMpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBmdW5jKSA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgdW5kZWZpbmVkLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICAgIHJldHVybiAodHlwZW9mIG9iaikgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG4vKipcbiAqIFJldmVyc2VzIGEgY29tcGFyZSBmdW5jdGlvbi5cbiAqIEBmdW5jdGlvblxuICovXG5mdW5jdGlvbiByZXZlcnNlQ29tcGFyZUZ1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikge1xuICAgIGlmIChpc1VuZGVmaW5lZChjb21wYXJlRnVuY3Rpb24pIHx8ICFpc0Z1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgdikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihkLCB2KSAqIC0xO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMucmV2ZXJzZUNvbXBhcmVGdW5jdGlvbiA9IHJldmVyc2VDb21wYXJlRnVuY3Rpb247XG4vKipcbiAqIFJldHVybnMgYW4gZXF1YWwgZnVuY3Rpb24gZ2l2ZW4gYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVUb0VxdWFscyhjb21wYXJlRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKSA9PT0gMDtcbiAgICB9O1xufVxuZXhwb3J0cy5jb21wYXJlVG9FcXVhbHMgPSBjb21wYXJlVG9FcXVhbHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIi8qIC8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzY3JpcHRpbmcudHNcIi8+ICovXG5pbXBvcnQge1xuICAgIGFkZEFnZW50LCBhZGRQZXJzb25hbGl0eUFnZW50LCBzZXRBZ2VudFZhcmlhYmxlLCBhZGRJdGVtLCBhZGRMb2NhdGlvbiwgc2V0VmFyaWFibGUsIGdldE5leHRMb2NhdGlvbiwgYWN0aW9uLFxuICAgIGdldFJhbmROdW1iZXIsIGdldFZhcmlhYmxlLCBzZXF1ZW5jZSwgc2VsZWN0b3IsIGV4ZWN1dGUsIFByZWNvbmRpdGlvbiwgZ2V0QWdlbnRWYXJpYWJsZSwgbmVnX2d1YXJkLCBndWFyZCxcbiAgICBpc1ZhcmlhYmxlTm90U2V0LCBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24sIGFkZFVzZXJBY3Rpb24sIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUsIGluaXRpYWxpemUsXG4gICAgZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0LCBleGVjdXRlVXNlckFjdGlvbiwgd29ybGRUaWNrLCBhdHRhY2hUcmVlVG9BZ2VudCwgc2V0SXRlbVZhcmlhYmxlLCBnZXRJdGVtVmFyaWFibGUsXG4gICAgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQsIGFyZUFkamFjZW50LCBhZGRVc2VyQWN0aW9uVHJlZVxufSBmcm9tIFwiLi9zY3JpcHRpbmdcIjtcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gXCJ0eXBlc2NyaXB0LWNvbGxlY3Rpb25zL2Rpc3QvbGliL3V0aWxcIjtcblxuLy8gMS4gRGVmaW5lIFN0YXRlXG4vLyBsb2NhdGlvbnNcbnZhciBTVEFSVCA9IFwiU1RBUlRcIjtcbnZhciBCQ19DT1JSSURPUiA9IFwiQkNfQ09SUklET1JcIjtcbnZhciBCTF9DT1JSSURPUiA9IFwiQkxfQ09SUklET1JcIjtcbnZhciBCUl9DT1JSSURPUiA9IFwiQlJfQ09SUklET1JcIjtcbnZhciBNTF9DT1JSSURPUiA9IFwiTUxfQ09SUklET1JcIjtcbnZhciBUTF9DT1JSSURPUiA9IFwiVExfQ09SUklET1JcIjtcbnZhciBUQ19DT1JSSURPUiA9IFwiVENfQ09SUklET1JcIjtcbnZhciBUUl9DT1JSSURPUiA9IFwiVFJfQ09SUklET1JcIjtcbnZhciBNUl9DT1JSSURPUiA9IFwiTVJfQ09SUklET1JcIjtcbnZhciBMQUIgPSBcIkxBQlwiO1xudmFyIFNUT1JBR0UgPSBcIlNUT1JBR0VcIjtcbnZhciBNRURJQ0FMID0gXCJNRURJQ0FMXCI7XG52YXIgUVVBUlRFUlMxID0gXCJRVUFSVEVSUzFcIjtcbnZhciBRVUFSVEVSUzIgPSBcIlFVQVJURVJTMlwiO1xudmFyIEVYSVRfRUxFVkFUT1IgPSBcIkVYSVRfRUxFVkFUT1JcIjtcbnZhciBFTkdJTkVTID0gXCJFTkdJTkVTXCI7XG52YXIgQ09DS1BJVCA9IFwiQ09DS1BJVFwiO1xudmFyIENPTU1TID0gXCJDT01NU1wiO1xuXG5hZGRMb2NhdGlvbihTVEFSVCwgW0JDX0NPUlJJRE9SXSk7XG5hZGRMb2NhdGlvbihCQ19DT1JSSURPUiwgW0JMX0NPUlJJRE9SLCBCUl9DT1JSSURPUiwgTEFCXSk7XG5hZGRMb2NhdGlvbihCTF9DT1JSSURPUiwgW01MX0NPUlJJRE9SXSk7XG5hZGRMb2NhdGlvbihNTF9DT1JSSURPUiwgW1NUT1JBR0UsIFRMX0NPUlJJRE9SXSk7XG5hZGRMb2NhdGlvbihUTF9DT1JSSURPUiwgW1RDX0NPUlJJRE9SLCBFTkdJTkVTLCBDT01NU10pO1xuYWRkTG9jYXRpb24oRU5HSU5FUywgW0NPQ0tQSVRdKTtcbmFkZExvY2F0aW9uKENPQ0tQSVQsIFtDT01NU10pO1xuYWRkTG9jYXRpb24oVENfQ09SUklET1IsIFtFWElUX0VMRVZBVE9SLCBNRURJQ0FMLCBUUl9DT1JSSURPUl0pO1xuYWRkTG9jYXRpb24oVFJfQ09SUklET1IsIFtNUl9DT1JSSURPUl0pO1xuYWRkTG9jYXRpb24oTVJfQ09SUklET1IsIFtNRURJQ0FMLCBRVUFSVEVSUzIsIEJSX0NPUlJJRE9SXSk7XG5hZGRMb2NhdGlvbihCUl9DT1JSSURPUiwgW1FVQVJURVJTMV0pO1xuXG4vLyBhZ2VudHNcbnZhciBhbGllbiA9IGFkZFBlcnNvbmFsaXR5QWdlbnQoXCJBbGllblwiLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwKTtcblxuLy8gaXRlbXNcbnZhciBjcmV3Q2FyZDEgPSBhZGRJdGVtKFwiQ3JldyBjYXJkMVwiKTtcbnZhciBjcmV3Q2FyZDIgPSBhZGRJdGVtKFwiQ3JldyBjYXJkMlwiKTtcbnNldEl0ZW1WYXJpYWJsZShjcmV3Q2FyZDEsIFwiY3VycmVudExvY2F0aW9uXCIsIExBQik7XG5zZXRJdGVtVmFyaWFibGUoY3Jld0NhcmQyLCBcImN1cnJlbnRMb2NhdGlvblwiLCBNRURJQ0FMKTtcblxuLy8gdmFyaWFibGVzXG4vL2FsaWVuXG5zZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiLCBDT0NLUElUKTtcbi8vcGxheWVyXG52YXIgcGxheWVyTG9jYXRpb24gPSBzZXRWYXJpYWJsZShcInBsYXllckxvY2F0aW9uXCIsIFNUQVJUKTtcbnZhciBjcmV3Q2FyZHNDb2xsZWN0ZWQgPSBzZXRWYXJpYWJsZShcImNyZXdDYXJkc0NvbGxlY3RlZFwiLCAwKTtcblxuLy8gMi4gRGVmaW5lIEJUc1xuLy8gY3JlYXRlIGdyb3VuZCBhY3Rpb25zXG5sZXQgc2V0UmFuZE51bWJlciA9IGFjdGlvbihcbiAgICAoKSA9PiB0cnVlLFxuICAgICgpID0+IHNldFZhcmlhYmxlKFwicmFuZE51bWJlclwiLCBnZXRSYW5kTnVtYmVyKDEsIDE4KSksXG4gICAgMFxuKTtcbmxldCBjaG9vc2VTVEFSVCA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMSwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBTVEFSVCksIDApO1xubGV0IGNob29zZUJDX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAyLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIEJDX0NPUlJJRE9SKSwgMCk7XG5sZXQgY2hvb3NlQkxfQ09SUklET1IgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDMsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgQkxfQ09SUklET1IpLCAwKTtcbmxldCBjaG9vc2VCUl9DT1JSSURPUiA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gNCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBCUl9DT1JSSURPUiksIDApO1xubGV0IGNob29zZU1MX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA1LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIE1MX0NPUlJJRE9SKSwgMCk7XG5sZXQgY2hvb3NlVExfQ09SUklET1IgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDYsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgVExfQ09SUklET1IpLCAwKTtcbmxldCBjaG9vc2VUQ19DT1JSSURPUiA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gNywgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBUQ19DT1JSSURPUiksIDApO1xubGV0IGNob29zZVRSX0NPUlJJRE9SID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSA4LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIFRSX0NPUlJJRE9SKSwgMCk7XG5sZXQgY2hvb3NlTVJfQ09SUklET1IgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDksICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgTVJfQ09SUklET1IpLCAwKTtcbmxldCBjaG9vc2VMQUIgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDEwLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIExBQiksIDApO1xubGV0IGNob29zZVNUT1JBR0UgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDExLCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIFNUT1JBR0UpLCAwKTtcbmxldCBjaG9vc2VNRURJQ0FMID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxMiwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBNRURJQ0FMKSwgMCk7XG5sZXQgY2hvb3NlUVVBUlRFUlMxID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxMywgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBRVUFSVEVSUzEpLCAwKTtcbmxldCBjaG9vc2VRVUFSVEVSUzIgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDE0LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIFFVQVJURVJTMiksIDApO1xubGV0IGNob29zZUVYSVRfRUxFVkFUT1IgPSBhY3Rpb24oKCkgPT4gZ2V0VmFyaWFibGUoXCJyYW5kTnVtYmVyXCIpID09IDE1LCAoKSA9PiBzZXRWYXJpYWJsZShcImRlc3RpbmF0aW9uXCIsIEVYSVRfRUxFVkFUT1IpLCAwKTtcbmxldCBjaG9vc2VFTkdJTkVTID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxNiwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBFTkdJTkVTKSwgMCk7XG5sZXQgY2hvb3NlQ09DS1BJVCA9IGFjdGlvbigoKSA9PiBnZXRWYXJpYWJsZShcInJhbmROdW1iZXJcIikgPT0gMTcsICgpID0+IHNldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIiwgQ09DS1BJVCksIDApO1xubGV0IGNob29zZUNPTU1TID0gYWN0aW9uKCgpID0+IGdldFZhcmlhYmxlKFwicmFuZE51bWJlclwiKSA9PSAxOCwgKCkgPT4gc2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiLCBDT01NUyksIDApO1xuXG5sZXQgYXREZXN0aW5hdGlvbjogUHJlY29uZGl0aW9uID0gKCkgPT4gZ2V0VmFyaWFibGUoXCJkZXN0aW5hdGlvblwiKSA9PSBnZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiKTtcbmxldCBzZXREZXN0aW5hdGlvblByZWNvbmQ6IFByZWNvbmRpdGlvbiA9ICgpID0+IGlzVmFyaWFibGVOb3RTZXQoXCJkZXN0aW5hdGlvblwiKSB8fCBhdERlc3RpbmF0aW9uKCk7XG5cbi8vIGNyZWF0ZSBiZWhhdmlvciB0cmVlc1xubGV0IHNldE5leHREZXN0aW5hdGlvbiA9IHNlcXVlbmNlKFtcbiAgICBzZXRSYW5kTnVtYmVyLFxuICAgIHNlbGVjdG9yKFtcbiAgICAgICAgY2hvb3NlU1RBUlQsXG4gICAgICAgIGNob29zZUJDX0NPUlJJRE9SLFxuICAgICAgICBjaG9vc2VCTF9DT1JSSURPUixcbiAgICAgICAgY2hvb3NlQlJfQ09SUklET1IsXG4gICAgICAgIGNob29zZU1MX0NPUlJJRE9SLFxuICAgICAgICBjaG9vc2VUTF9DT1JSSURPUixcbiAgICAgICAgY2hvb3NlVENfQ09SUklET1IsXG4gICAgICAgIGNob29zZVRSX0NPUlJJRE9SLFxuICAgICAgICBjaG9vc2VNUl9DT1JSSURPUixcbiAgICAgICAgY2hvb3NlTEFCLFxuICAgICAgICBjaG9vc2VTVE9SQUdFLFxuICAgICAgICBjaG9vc2VNRURJQ0FMLFxuICAgICAgICBjaG9vc2VRVUFSVEVSUzEsXG4gICAgICAgIGNob29zZVFVQVJURVJTMixcbiAgICAgICAgY2hvb3NlRVhJVF9FTEVWQVRPUixcbiAgICAgICAgY2hvb3NlRU5HSU5FUyxcbiAgICAgICAgY2hvb3NlQ09DS1BJVCxcbiAgICAgICAgY2hvb3NlQ09NTVNcbiAgICBdKVxuXSk7XG5cbmxldCBnb3RvTmV4dExvY2F0aW9uID0gYWN0aW9uKFxuICAgICgpID0+IHRydWUsXG4gICAgKCkgPT4ge1xuICAgICAgICBzZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiLCBnZXROZXh0TG9jYXRpb24oZ2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIiksIGdldFZhcmlhYmxlKFwiZGVzdGluYXRpb25cIikpKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbGllbiBpcyBhdDogXCIgKyBnZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiKSlcbiAgICB9LFxuICAgIDBcbik7XG5cbmxldCBlYXRQbGF5ZXIgPSBhY3Rpb24oKCkgPT4gZ2V0QWdlbnRWYXJpYWJsZShhbGllbiwgXCJjdXJyZW50TG9jYXRpb25cIikgPT0gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pLFxuICAgICgpID0+IHtcbiAgICAgICAgc2V0VmFyaWFibGUoXCJlbmRHYW1lXCIsIFwibG9zZVwiKTtcbiAgICAgICAgc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFwiTkFcIik7XG4gICAgfSwgMFxuKTtcblxuLypsZXQgc2VhcmNoID0gc2VsZWN0b3IoW1xuICAgIGVhdFBsYXllcixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgIHNlbGVjdG9yKFtcbiAgICAgICAgICAgIGd1YXJkKHNldERlc3RpbmF0aW9uUHJlY29uZCwge30sIHNldE5leHREZXN0aW5hdGlvbiksXG4gICAgICAgICAgICBhY3Rpb24oKCkgPT4gdHJ1ZSwgKCkgPT4ge1xuICAgICAgICAgICAgfSwge30sIDApXG4gICAgICAgIF0pLFxuICAgICAgICBnb3RvTmV4dExvY2F0aW9uLFxuICAgICAgICBlYXRQbGF5ZXJcbiAgICBdKVxuXSk7Ki9cblxubGV0IHNlYXJjaCA9IHNlcXVlbmNlKFtcbiAgICAgICAgc2VsZWN0b3IoW1xuICAgICAgICAgICAgZ3VhcmQoc2V0RGVzdGluYXRpb25QcmVjb25kLCBzZXROZXh0RGVzdGluYXRpb24pLFxuICAgICAgICAgICAgYWN0aW9uKCgpID0+IHRydWUsICgpID0+IHtcbiAgICAgICAgICAgIH0sMClcbiAgICAgICAgXSksXG4gICAgICAgIGdvdG9OZXh0TG9jYXRpb24sXG4gICAgXSk7XG5cbmxldCBhbGllbkJUID0gc2VsZWN0b3IoW1xuICAgIGVhdFBsYXllcixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgIHNlYXJjaCwgZWF0UGxheWVyXG4gICAgXSlcbl0pO1xuXG4vL2F0dGFjaCBiZWhhdmlvdXIgdHJlZXMgdG8gYWdlbnRzXG5hdHRhY2hUcmVlVG9BZ2VudChhbGllbiwgYWxpZW5CVCk7XG5cbi8vIDMuIENvbnN0cnVjdCBzdG9yeVxuLy8gY3JlYXRlIHVzZXIgYWN0aW9uc1xuXG52YXIgc3RhcnRTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFNUQVJULFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgZG9ja2luZyBzdGF0aW9uLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJHbyBmb3J3YXJkIHRvIGVudGVyIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQkNfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHN0YXJ0U3RhdGVCVCk7XG52YXIgYmNTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEJDX0NPUlJJRE9SLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgY29ycmlkb3IuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkhlYWQgd2VzdCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJMX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGxhYlwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTEFCKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiSGVhZCBlYXN0IGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQlJfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJHbyBiYWNrIHRvIHRoZSBzdGFydFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgU1RBUlQpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGJjU3RhdGVCVCk7XG52YXIgYnJTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IEJSX0NPUlJJRE9SLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW4gdGhlIGNvcnJpZG9yLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgc3RhZmYgcXVhcnRlcnNcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFFVQVJURVJTMSkpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk1vdmUgbm9ydGggaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNUl9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkhlYWQgd2VzdCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJDX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShiclN0YXRlQlQpO1xudmFyIHF1YXJ0ZXJzMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFFVQVJURVJTMSxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIHN0YWZmIHF1YXJ0ZXJzLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRoZSBzdGFmZiBxdWFydGVyc1wiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQlJfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHF1YXJ0ZXJzMUJUKTtcbnZhciBtclN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTVJfQ09SUklET1IsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgZm9yd2FyZCBpbiB0aGUgY29ycmlkb3IuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBjYXB0YWluJ3MgcXVhcnRlcnMgb24gdGhlIGVhc3RcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFFVQVJURVJTMikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBtZWRpY2FsIHJvb20gb24gdGhlIHdlc3RcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1FRElDQUwpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIG5vcnRoIGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVFJfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHNvdXRoIGluIHRoZSBjb3JyaWRvclwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgQlJfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKG1yU3RhdGVCVCk7XG52YXIgcXVhcnRlcnMyQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gUVVBUlRFUlMyLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgY2FwdGFpbidzIHF1YXJ0ZXJzLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRoZSBjYXB0YWluJ3MgcXVhcnRlcnNcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1SX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShxdWFydGVyczJCVCk7XG52YXIgbWVkaWNhbEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IE1FRElDQUwsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBtZWRpY2FsIHJvb20uXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkV4aXQgdG8gdGhlIG5vcnRoXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUQ19DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkV4aXQgdG8gdGhlIGVhc3RcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1SX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShtZWRpY2FsQlQpO1xudmFyIGxhYkJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IExBQixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGxhYi5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRXhpdCB0aGUgbGFiXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQ19DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUobGFiQlQpO1xudmFyIHRyU3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBUUl9DT1JSSURPUixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgd2VzdFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgVENfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSBzb3V0aFwiLCAoKSA9PiBzZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbiwgTVJfQ09SUklET1IpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJTdGF5IHdoZXJlIHlvdSBhcmUuXCIsICgpID0+IHt9KVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKHRyU3RhdGVCVCk7XG52YXIgdGNTdGF0ZUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IFRDX0NPUlJJRE9SLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBtb3ZlIGZvcndhcmQgaW4gdGhlIGNvcnJpZG9yLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSB3ZXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBtZWRpY2FsIHJvb21cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1FRElDQUwpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHRvd2FyZHMgdGhlIGVsZXZhdG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFWElUX0VMRVZBVE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZSh0Y1N0YXRlQlQpO1xudmFyIGVsZXZhdG9yQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRVhJVF9FTEVWQVRPUixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgcmVhY2ggdGhlIGV4aXQgZWxldmF0b3IuXCIpLFxuICAgICAgICAgICAgc2VsZWN0b3IoW1xuICAgICAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKGNyZXdDYXJkc0NvbGxlY3RlZCkgPj0gMixcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGNhbiBub3cgYWN0aXZhdGUgdGhlIGV4aXQgYW5kIGZsZWUhXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkFjdGl2YXRlIGFuZCBnZXQgb3V0IVwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJlbmRHYW1lXCIsIFwid2luXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBcIk5BXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdKSksXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG5lZWQgMiBjcmV3IGNhcmRzIHRvIGFjdGl2YXRlIHRoZSBleGl0IGVsZXZhdG9yIHN5c3RlbS5cIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk1vdmUgYmFjayBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRDX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShlbGV2YXRvckJUKTtcbnZhciB0bFN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gVExfQ09SUklET1IsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgZm9yd2FyZCBpbiB0aGUgY29ycmlkb3IuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBlbmdpbmVzIHJvb20gdG8gdGhlIG5vcnRoXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvbW11bmljYXRpb25zIHJvb20gdG8gdGhlIGVhc3RcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPTU1TKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgZWFzdCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRDX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgc291dGhcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIE1MX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZSh0bFN0YXRlQlQpO1xudmFyIGJsU3RhdGVCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBCTF9DT1JSSURPUixcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgbW92ZSBmb3J3YXJkIGluIHRoZSBjb3JyaWRvci5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgbm9ydGggaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIk1vdmUgdG8gdGhlIGVhc3QgaW4gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBCQ19DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoYmxTdGF0ZUJUKTtcbnZhciBtbFN0YXRlQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gTUxfQ09SUklET1IsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IG1vdmUgZm9yd2FyZCBpbiB0aGUgY29ycmlkb3IuXCIpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIkVudGVyIHRoZSBzdG9yYWdlIHJvb21cIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFNUT1JBR0UpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJNb3ZlIHRvIHRoZSBub3J0aCBpbiB0aGUgY29ycmlkb3JcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIFRMX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiTW92ZSB0byB0aGUgc291dGhcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIEJMX0NPUlJJRE9SKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiU3RheSB3aGVyZSB5b3UgYXJlLlwiLCAoKSA9PiB7fSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShtbFN0YXRlQlQpO1xudmFyIHN0b3JhZ2VCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBTVE9SQUdFLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgc3RvcmFnZS5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRXhpdCB0aGUgc3RvcmFnZSByb29tXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBNTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoc3RvcmFnZUJUKTtcbnZhciBjb21tc0JUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IENPTU1TLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBlbnRlciB0aGUgY29tbXVuaWNhdGlvbnMgcm9vbS5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvY2twaXRcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPQ0tQSVQpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFeGl0IHRoZSBjb21tdW5pY2F0aW9ucyByb29tIGludG8gdGhlIGNvcnJpZG9yXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoY29tbXNCVCk7XG52YXIgY29ja3BpdEJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IENPQ0tQSVQsXG4gICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGVudGVyIHRoZSBjb2NrcGl0LlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgZW5naW5lcyByb29tIHRvIHRoZSBlYXN0XCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBFTkdJTkVTKSksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvbW11bmljYXRpb25zIHJvb20gdG8gdGhlIHNvdXRoXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBDT01NUykpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoY29ja3BpdEJUKTtcbnZhciBlbmdpbmVzQlQgPSBndWFyZCgoKSA9PiBnZXRWYXJpYWJsZShwbGF5ZXJMb2NhdGlvbikgPT0gRU5HSU5FUyxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3UgZW50ZXIgdGhlIGVuZ2luZXMgcm9vbS5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiRW50ZXIgdGhlIGNvY2twaXQgdG8gdGhlIGVhc3RcIiwgKCkgPT4gc2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24sIENPQ0tQSVQpKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb24oXCJFbnRlciB0aGUgY29ycmlkb3IgdG8gdGhlIHNvdXRoXCIsICgpID0+IHNldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uLCBUTF9DT1JSSURPUikpLFxuICAgICAgICAgICAgYWRkVXNlckFjdGlvbihcIlN0YXkgd2hlcmUgeW91IGFyZS5cIiwgKCkgPT4ge30pXG4gICAgICAgIF1cbiAgICApKTtcbmFkZFVzZXJJbnRlcmFjdGlvblRyZWUoZW5naW5lc0JUKTtcblxudmFyIGNyZXdDYXJkMUJUID0gZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pID09IGdldEl0ZW1WYXJpYWJsZShjcmV3Q2FyZDEsIFwiY3VycmVudExvY2F0aW9uXCIpLFxuICAgIHNlcXVlbmNlKFtcbiAgICAgICAgICAgIGRpc3BsYXlEZXNjcmlwdGlvbkFjdGlvbihcIllvdSBub3RpY2UgYSBjcmV3IGNhcmQgbHlpbmcgYXJvdW5kLlwiKSxcbiAgICAgICAgICAgIGFkZFVzZXJBY3Rpb25UcmVlKFwiUGljayB1cCB0aGUgY3JldyBjYXJkXCIsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UoW1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCk9PnRydWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQoXCJZb3UgcGljayB1cCB0aGUgY3JldyBjYXJkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SXRlbVZhcmlhYmxlKGNyZXdDYXJkMSwgXCJjdXJyZW50TG9jYXRpb25cIiwgXCJwbGF5ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKGNyZXdDYXJkc0NvbGxlY3RlZCwgZ2V0VmFyaWFibGUoY3Jld0NhcmRzQ29sbGVjdGVkKSArIDEpO1xuICAgICAgICAgICAgICAgIH0sIDApLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24oKCk9PnRydWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlBY3Rpb25FZmZlY3RUZXh0KFwiV293IHlvdSBrbm93IGhvdyB0byBwaWNrIHVwIHRoaW5ncy5cIil9LCAwKVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgIF1cbiAgICApKTtcbnZhciBjcmV3Q2FyZDJCVCA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBnZXRJdGVtVmFyaWFibGUoY3Jld0NhcmQyLCBcImN1cnJlbnRMb2NhdGlvblwiKSxcbiAgICBzZXF1ZW5jZShbXG4gICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJZb3Ugbm90aWNlIGEgY3JldyBjYXJkIGx5aW5nIGFyb3VuZC5cIiksXG4gICAgICAgICAgICBhZGRVc2VyQWN0aW9uKFwiUGljayB1cCB0aGUgY3JldyBjYXJkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5QWN0aW9uRWZmZWN0VGV4dChcIllvdSBwaWNrIHVwIHRoZSBjcmV3IGNhcmQuXCIpO1xuICAgICAgICAgICAgICAgIHNldEl0ZW1WYXJpYWJsZShjcmV3Q2FyZDIsIFwiY3VycmVudExvY2F0aW9uXCIsIFwicGxheWVyXCIpO1xuICAgICAgICAgICAgICAgIHNldFZhcmlhYmxlKGNyZXdDYXJkc0NvbGxlY3RlZCwgZ2V0VmFyaWFibGUoY3Jld0NhcmRzQ29sbGVjdGVkKSArIDEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICkpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShjcmV3Q2FyZDFCVCk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGNyZXdDYXJkMkJUKTtcblxudmFyIGFsaWVuTmVhcmJ5ID0gZ3VhcmQoKCkgPT4gYXJlQWRqYWNlbnQoZ2V0VmFyaWFibGUocGxheWVyTG9jYXRpb24pLCBnZXRBZ2VudFZhcmlhYmxlKGFsaWVuLCBcImN1cnJlbnRMb2NhdGlvblwiKSksXG4gICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGhlYXIgYSB0aHVtcGluZyBzb3VuZC4gVGhlIGFsaWVuIGlzIG5lYXJieS5cIikpO1xuYWRkVXNlckludGVyYWN0aW9uVHJlZShhbGllbk5lYXJieSk7XG5cbnZhciBnYW1lT3ZlciA9IGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKSA9PSBcIk5BXCIsXG4gICAgc2VsZWN0b3IoW1xuICAgICAgICAgICAgZ3VhcmQoKCkgPT4gZ2V0VmFyaWFibGUoXCJlbmRHYW1lXCIpID09IFwid2luXCIsXG4gICAgICAgICAgICAgICAgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uKFwiWW91IGhhdmUgbWFuYWdlZCB0byBlc2NhcGUhXCIpKSxcbiAgICAgICAgICAgIGd1YXJkKCgpID0+IGdldFZhcmlhYmxlKFwiZW5kR2FtZVwiKSA9PSBcImxvc2VcIixcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVzY3JpcHRpb25BY3Rpb24oXCJUaGUgY3JlYXR1cmUgZ3JhYnMgeW91IGJlZm9yZSB5b3UgY2FuIHJlYWN0ISBZb3Ugc3RydWdnbGUgZm9yIGEgYml0IGJlZm9yZSByZWFsaXNpbmcgaXQncyBhbGwgb3Zlci4uXCIpKVxuICAgICAgICBdXG4gICAgKSk7XG5hZGRVc2VySW50ZXJhY3Rpb25UcmVlKGdhbWVPdmVyKTtcblxuLy80LiBSdW4gdGhlIHdvcmxkXG5pbml0aWFsaXplKCk7XG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0gZ2V0VXNlckludGVyYWN0aW9uT2JqZWN0KCk7XG5cbi8vUkVOREVSSU5HLS0tLS1cbnZhciBkaXNwbGF5UGFuZWwgPSB7eDogNTAwLCB5OiAwfTtcbnZhciB0ZXh0UGFuZWwgPSB7eDogNTAwLCB5OiAzNTB9O1xudmFyIGFjdGlvbnNQYW5lbCA9IHt4OiA1MjAsIHk6IDQyNX07XG5cbnZhciBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5Jyk7XG52YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG52YXIgc3BhY2VzaGlwSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbnNwYWNlc2hpcEltYWdlLm9ubG9hZCA9IHJlbmRlcjtcbnZhciBwbGF5ZXJJbWFnZSA9IG5ldyBJbWFnZSgpO1xudmFyIGFsaWVuSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2Uoc3BhY2VzaGlwSW1hZ2UsIGRpc3BsYXlQYW5lbC54LCBkaXNwbGF5UGFuZWwueSwgNTAwLCAzMDApO1xuICAgIGRpc3BsYXlQbGF5ZXIoKTtcbiAgICBkaXNwbGF5QWxpZW4oKTtcbiAgICBkaXNwbGF5VGV4dEFuZEFjdGlvbnMoKTtcbn1cblxudmFyIG1hcFBvc2l0aW9ucyA9IHtcbiAgICBcIlNUQVJUXCI6IHt4OiAyMzAsIHk6IDIzNX0sXG4gICAgXCJCQ19DT1JSSURPUlwiOiB7eDogMjQwLCB5OiAyMTB9LFxuICAgIFwiQlJfQ09SUklET1JcIjoge3g6IDMwMCwgeTogMTkwfSxcbiAgICBcIk1SX0NPUlJJRE9SXCI6IHt4OiAzMDUsIHk6IDE1MH0sXG4gICAgXCJRVUFSVEVSUzJcIjoge3g6IDM0MCwgeTogMTU1fSxcbiAgICBcIlFVQVJURVJTMVwiOiB7eDogMzQwLCB5OiAxOTB9LFxuICAgIFwiVFJfQ09SUklET1JcIjoge3g6IDMwMCwgeTogMTAwfSxcbiAgICBcIlRDX0NPUlJJRE9SXCI6IHt4OiAyMzAsIHk6IDEwMH0sXG4gICAgXCJUTF9DT1JSSURPUlwiOiB7eDogMTcwLCB5OiAxMDB9LFxuICAgIFwiRVhJVF9FTEVWQVRPUlwiOiB7eDogMjMwLCB5OiA2MH0sXG4gICAgXCJMQUJcIjoge3g6IDI0MCwgeTogMTcwfSxcbiAgICBcIk1MX0NPUlJJRE9SXCI6IHt4OiAxNjAsIHk6IDE1MH0sXG4gICAgXCJCTF9DT1JSSURPUlwiOiB7eDogMTYwLCB5OiAyMDB9LFxuICAgIFwiRU5HSU5FU1wiOiB7eDogMTcwLCB5OiA2MH0sXG4gICAgXCJDT0NLUElUXCI6IHt4OiAxMjAsIHk6IDYwfSxcbiAgICBcIkNPTU1TXCI6IHt4OiAxMjAsIHk6IDEwMH0sXG4gICAgXCJNRURJQ0FMXCI6IHt4OiAyNTAsIHk6IDEzMH0sXG4gICAgXCJTVE9SQUdFXCI6IHt4OiAyMDAsIHk6IDE1MH1cbn07XG5cbmZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXIoKSB7XG4gICAgdmFyIGN1cnJMb2NhdGlvbiA9IGdldFZhcmlhYmxlKHBsYXllckxvY2F0aW9uKTtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKG1hcFBvc2l0aW9uc1tjdXJyTG9jYXRpb25dKSlcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UocGxheWVySW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCAxNiwgMTYpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5QWxpZW4oKSB7XG4gICAgdmFyIGN1cnJMb2NhdGlvbiA9IGdldEFnZW50VmFyaWFibGUoYWxpZW4sIFwiY3VycmVudExvY2F0aW9uXCIpO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGFsaWVuSW1hZ2UsIGRpc3BsYXlQYW5lbC54ICsgbWFwUG9zaXRpb25zW2N1cnJMb2NhdGlvbl0ueCwgZGlzcGxheVBhbmVsLnkgKyBtYXBQb3NpdGlvbnNbY3VyckxvY2F0aW9uXS55LCAyNCwgMjQpO1xufVxuXG5zcGFjZXNoaXBJbWFnZS5zcmMgPSBcIi4uL2ltYWdlcy9pc29sYXRpb25fbWFwLnBuZ1wiO1xucGxheWVySW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMvcGxheWVyMi5wbmdcIjtcbmFsaWVuSW1hZ2Uuc3JjID0gXCIuLi9pbWFnZXMveGVub21vcnBoLnBuZ1wiO1xuXG52YXIgY3VycmVudFNlbGVjdGlvbjtcbnZhciB5T2Zmc2V0ID0gYWN0aW9uc1BhbmVsLnkgKyAyNTtcbnZhciB5T2Zmc2V0SW5jcmVtZW50ID0gNTA7XG5cbmZ1bmN0aW9uIGRpc3BsYXlUZXh0QW5kQWN0aW9ucygpIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCh0ZXh0UGFuZWwueCwgdGV4dFBhbmVsLnksIDUwMCwgMTAwMCk7XG4gICAgeU9mZnNldCA9IGFjdGlvbnNQYW5lbC55ICsgMjU7XG5cbiAgICBjb250ZXh0LmZvbnQgPSBcIjE1cHQgQ2FsaWJyaVwiO1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjb25zb2xlLmxvZyhcIkFjdGlvbnMgZWZmZWN0IHRleHQ6IFwiICsgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0KTtcbiAgICB2YXIgdGV4dFRvRGlzcGxheSA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dC5sZW5ndGggIT0gMCA/IHVzZXJJbnRlcmFjdGlvbk9iamVjdC5hY3Rpb25FZmZlY3RzVGV4dCA6IHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0O1xuICAgIGNvbnRleHQuZmlsbFRleHQodGV4dFRvRGlzcGxheSwgdGV4dFBhbmVsLngsIHRleHRQYW5lbC55ICsgMjApO1xuXG4gICAgY29udGV4dC5mb250ID0gXCIxNXB0IENhbGlicmlcIjtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB1c2VyQWN0aW9uVGV4dCA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHRbaV07XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQodXNlckFjdGlvblRleHQsIGFjdGlvbnNQYW5lbC54ICsgMjAsIHlPZmZzZXQpO1xuICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uID0gaTtcbiAgICAgICAgfVxuICAgICAgICB5T2Zmc2V0ICs9IHlPZmZzZXRJbmNyZW1lbnQ7XG4gICAgfVxuXG4gICAgZGlzcGxheUFycm93KCk7XG4gICAgY29uc29sZS5sb2coXCJDcmV3IGNhcmRzOiBcIiArIGdldFZhcmlhYmxlKGNyZXdDYXJkc0NvbGxlY3RlZCkpO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5QXJyb3coKSB7XG4gICAgaWYodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCl7XG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KGFjdGlvbnNQYW5lbC54LCBhY3Rpb25zUGFuZWwueSwgMjAsIDEwMDApO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KFwiPiBcIiwgNTIwLCBhY3Rpb25zUGFuZWwueSArIDI1ICsgKGN1cnJlbnRTZWxlY3Rpb24gKiB5T2Zmc2V0SW5jcmVtZW50KSk7XG4gICAgfVxufVxuXG4vL1VzZXIgaW5wdXRcbmZ1bmN0aW9uIGtleVByZXNzKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZEFjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHRbY3VycmVudFNlbGVjdGlvbl07XG4gICAgICAgIGlmKCFpc1VuZGVmaW5lZChzZWxlY3RlZEFjdGlvbikpe1xuICAgICAgICAgICAgZXhlY3V0ZVVzZXJBY3Rpb24oc2VsZWN0ZWRBY3Rpb24pO1xuICAgICAgICAgICAgd29ybGRUaWNrKCk7XG4gICAgICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24ga2V5RG93bihlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSA0MCkgey8vZG93blxuICAgICAgICBpZiAodXNlckludGVyYWN0aW9uT2JqZWN0LnVzZXJBY3Rpb25zVGV4dC5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbisrO1xuICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbiA9IGN1cnJlbnRTZWxlY3Rpb24gJSB1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgIGRpc3BsYXlBcnJvdygpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzgpIHsvL3VwXG4gICAgICAgIGlmICh1c2VySW50ZXJhY3Rpb25PYmplY3QudXNlckFjdGlvbnNUZXh0Lmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLS07XG4gICAgICAgICAgICBpZiAoY3VycmVudFNlbGVjdGlvbiA8IDApXG4gICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbiA9IHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGRpc3BsYXlBcnJvdygpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwga2V5UHJlc3MsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleURvd24sIGZhbHNlKTtcbiIsImltcG9ydCBRdWV1ZSBmcm9tIFwidHlwZXNjcmlwdC1jb2xsZWN0aW9ucy9kaXN0L2xpYi9RdWV1ZVwiO1xuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSBcInR5cGVzY3JpcHQtY29sbGVjdGlvbnMvZGlzdC9saWIvdXRpbFwiO1xuXG5leHBvcnQgZW51bSBTdGF0dXMge1xuICAgIFJVTk5JTkcsXG4gICAgU1VDQ0VTUyxcbiAgICBGQUlMVVJFXG59XG5cbmZ1bmN0aW9uIHRlcm1pbmF0ZUFuZFJldHVybihpZDogbnVtYmVyLCBibGFja2JvYXJkOiBhbnksIHN0YXR1czogU3RhdHVzKSB7XG4gICAgZGVsZXRlIGJsYWNrYm9hcmRbaWRdO1xuICAgIHJldHVybiBzdGF0dXM7XG59XG5cbmV4cG9ydCB0eXBlIEVmZmVjdCA9ICgpID0+IHZvaWRcbmV4cG9ydCB0eXBlIFByZWNvbmRpdGlvbiA9ICgpID0+IGJvb2xlYW5cbmV4cG9ydCB0eXBlIFRpY2sgPSAoKSA9PiBTdGF0dXNcbmV4cG9ydCB0eXBlIEFjdGlvblRpY2sgPSAocHJlY29uZGl0aW9uOiBQcmVjb25kaXRpb24sIGVmZmVjdDogRWZmZWN0LCB0aWNrc1JlcXVpcmVkPzogbnVtYmVyKSA9PiBUaWNrXG4vKipcbiAqIFRoZSBndWFyZCB0aWNrIGlzIHRvIGFkZCBhIHByZWNvbmRpdGlvbiB0byB0aGUgY29tcG9zaXRlIHRpY2tzXG4gKi9cbmV4cG9ydCB0eXBlIEd1YXJkVGljayA9IChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljaywgbmVnYXRlPzogYm9vbGVhbikgPT4gVGlja1xuLyoqXG4gKiBTZXF1ZW5jZS9TZWxlY3RvclxuICovXG5leHBvcnQgdHlwZSBDb21wb3NpdGVUaWNrID0gKGFzdFRpY2tzOiBUaWNrW10pID0+IFRpY2tcblxudmFyIGJsYWNrYm9hcmQgPSB7fTtcblxuZnVuY3Rpb24gZ2V0QWN0aW9uVGljayhpZDogbnVtYmVyKTogQWN0aW9uVGljayB7XG4gICAgcmV0dXJuIChwcmVjb25kaXRpb24sIGVmZmVjdCwgdGlja3NSZXF1aXJlZCA9IDEpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciB1dGlsID0gZ2V0VmFyaWFibGUoXCJ1dGlsaXR5XCIpO1xuICAgICAgICAgICAgaWYgKHV0aWwpIHtcbiAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXSkge1xuICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgdXRpbGl0eSA9IDE7XG4gICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdW1widXRpbGl0eVwiXSA9IHV0aWxpdHk7XG4gICAgICAgICAgICAgIHNldFZhcmlhYmxlKFwibGFzdFV0aWxcIiwgdXRpbGl0eSlcbiAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5SVU5OSU5HO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJlY29uZGl0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFibGFja2JvYXJkW2lkXS50aWNrc0RvbmUpIHtcbiAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA9IHRpY2tzUmVxdWlyZWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGJsYWNrYm9hcmRbaWRdLnRpY2tzRG9uZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0udGlja3NEb25lLS07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdGF0dXMuUlVOTklORztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZUFuZFJldHVybihpZCwgYmxhY2tib2FyZCwgU3RhdHVzLlNVQ0NFU1MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXR1cy5GQUlMVVJFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRHdWFyZFRpY2soKTogR3VhcmRUaWNrIHtcbiAgICByZXR1cm4gKHByZWNvbmRpdGlvbiwgYXN0VGljaywgbmVnYXRlID0gZmFsc2UpID0+IHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9jZWVkID0gbmVnYXRlID8gIXByZWNvbmRpdGlvbigpIDogcHJlY29uZGl0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2VlZCA/IGV4ZWN1dGUoYXN0VGljaykgOiBTdGF0dXMuRkFJTFVSRTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VxdWVuY2VUaWNrKGlkOiBudW1iZXIpOiBDb21wb3NpdGVUaWNrIHtcbiAgICByZXR1cm4gKGFzdFRpY2tzKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgdXRpbCA9IGdldFZhcmlhYmxlKFwidXRpbGl0eVwiKTtcbiAgICAgICAgICAgIGlmICh1dGlsKSB7XG4gICAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdID0ge307XG4gICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciB1dGlsaXR5ID0gMDtcbiAgICAgICAgICAgICAgd2hpbGUgKGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA8IGFzdFRpY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkU3RhdHVzID0gZXhlY3V0ZShhc3RUaWNrc1tibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCArPSAxO1xuICAgICAgICAgICAgICAgICAgdXRpbGl0eSArPSBnZXRWYXJpYWJsZShcImxhc3RVdGlsXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHV0aWxpdHkgPSB1dGlsaXR5L2FzdFRpY2tzLmxlbmd0aDtcbiAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF1bXCJ1dGlsaXR5XCJdID0gdXRpbGl0eTtcbiAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiLCB1dGlsaXR5KVxuICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLkZBSUxVUkUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5GQUlMVVJFKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuU1VDQ0VTUylcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuU1VDQ0VTUyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdG9yVGljayhpZDogbnVtYmVyKTogQ29tcG9zaXRlVGljayB7XG4gICAgcmV0dXJuIChhc3RUaWNrcykgPT4ge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIHV0aWwgPSBnZXRWYXJpYWJsZShcInV0aWxpdHlcIik7XG4gICAgICAgICAgICBpZiAodXRpbCkge1xuICAgICAgICAgICAgICBpZiAoIWJsYWNrYm9hcmRbaWRdKSB7XG4gICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgdXRpbGl0eSA9IDA7XG4gICAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBjaGlsZFN0YXR1cyA9IGV4ZWN1dGUoYXN0VGlja3NbYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgIGlmICh1dGlsaXR5IDwgZ2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiKSl7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxpdHkgPSBnZXRWYXJpYWJsZShcImxhc3RVdGlsXCIpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF1bXCJ1dGlsaXR5XCJdID0gdXRpbGl0eTtcbiAgICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJsYXN0VXRpbFwiLCB1dGlsaXR5KVxuICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmxhY2tib2FyZFtpZF0pIHtcbiAgICAgICAgICAgICAgICBibGFja2JvYXJkW2lkXSA9IHt9O1xuICAgICAgICAgICAgICAgIGJsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChibGFja2JvYXJkW2lkXS5jdXJyZW50SW5kZXggPCBhc3RUaWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRTdGF0dXMgPSBleGVjdXRlKGFzdFRpY2tzW2JsYWNrYm9hcmRbaWRdLmN1cnJlbnRJbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkU3RhdHVzID09IFN0YXR1cy5SVU5OSU5HKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RhdHVzLlJVTk5JTkc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGRTdGF0dXMgPT0gU3RhdHVzLlNVQ0NFU1MpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGVBbmRSZXR1cm4oaWQsIGJsYWNrYm9hcmQsIFN0YXR1cy5TVUNDRVNTKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZFN0YXR1cyA9PSBTdGF0dXMuRkFJTFVSRSlcbiAgICAgICAgICAgICAgICAgICAgYmxhY2tib2FyZFtpZF0uY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVybWluYXRlQW5kUmV0dXJuKGlkLCBibGFja2JvYXJkLCBTdGF0dXMuRkFJTFVSRSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlKGFzdFRpY2s6IFRpY2spOiBTdGF0dXMge1xuICAgIHNldFZhcmlhYmxlKFwidXRpbGl0eVwiLCB0cnVlKTtcbiAgICBhc3RUaWNrKCk7XG4gICAgc2V0VmFyaWFibGUoXCJ1dGlsaXR5XCIsIGZhbHNlKTtcbiAgICByZXR1cm4gYXN0VGljaygpO1xufVxuXG52YXIgZ2xvYmFsSWRDb3VudGVyID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbihwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgZWZmZWN0OiBFZmZlY3QsIHRpY2tzUmVxdWlyZWQ/OiBudW1iZXIpOiBUaWNrIHtcbiAgICByZXR1cm4gZ2V0QWN0aW9uVGljayhnbG9iYWxJZENvdW50ZXIrKykocHJlY29uZGl0aW9uLCBlZmZlY3QsIHRpY2tzUmVxdWlyZWQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWFyZChwcmVjb25kaXRpb246IFByZWNvbmRpdGlvbiwgYXN0VGljazogVGljayk6IFRpY2sge1xuICAgIHJldHVybiBnZXRHdWFyZFRpY2soKShwcmVjb25kaXRpb24sIGFzdFRpY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmVnX2d1YXJkKHByZWNvbmRpdGlvbjogUHJlY29uZGl0aW9uLCBhc3RUaWNrOiBUaWNrKTogVGljayB7XG4gICAgcmV0dXJuIGdldEd1YXJkVGljaygpKHByZWNvbmRpdGlvbiwgYXN0VGljaywgdHJ1ZSk7XG59XG5cbi8qKlxuICogQ3ljbGVzIG92ZXIgaXRzIGNoaWxkcmVuOiBpdGVyYXRlcyB0byB0aGUgbmV4dCBjaGlsZCBvbiBzdWNjZXNzIG9mIGEgY2hpbGRcbiAqIFN1Y2NlZWRzIGlmIGFsbCBzdWNjZWVkLCBlbHNlIGZhaWxzXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcbiAqIEByZXR1cm5zIHtUaWNrfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVuY2UoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xuICAgIHJldHVybiBnZXRTZXF1ZW5jZVRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcbn1cblxuLyoqXG4gKiBDeWNsZXMgb3ZlciBpdHMgY2hpbGRyZW46IGl0ZXJhdGVzIHRvIHRoZSBuZXh0IGNoaWxkIG9uIGZhaWx1cmUgb2YgYSBjaGlsZCh0aGluayBvZiBpdCBhcyBpZi1lbHNlIGJsb2NrcylcbiAqIFN1Y2NlZWRzIGlmIGV2ZW4gb25lIHN1Y2NlZWRzLCBlbHNlIGZhaWxzXG4gKiBAcGFyYW0ge1RpY2tbXX0gYXN0VGlja3NcbiAqIEByZXR1cm5zIHtUaWNrfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0b3IoYXN0VGlja3M6IFRpY2tbXSk6IFRpY2sge1xuICAgIHJldHVybiBnZXRTZWxlY3RvclRpY2soZ2xvYmFsSWRDb3VudGVyKyspKGFzdFRpY2tzKTtcbn1cblxuXG4vKi0tLS0tLS0tLS0tLS0tLSBBUElzIC0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vLzAuIHV0aWxpdGllc1xuLy8gbWluIGFuZCBtYXggYXJlIGluY2x1c2l2ZVxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmROdW1iZXIobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbn1cblxuLy8xLiBzdG9yeSBpbnN0YW5jZVxuXG4vLzEuMSBsb2NhdGlvbnNcbnZhciBsb2NhdGlvbkdyYXBoID0ge307XG5cbi8vYWRkIHRvIGJvdGggc2lkZXNcbmV4cG9ydCBmdW5jdGlvbiBhZGRMb2NhdGlvbihsb2NhdGlvbk5hbWU6IHN0cmluZywgYWRqYWNlbnRMb2NhdGlvbnM6IHN0cmluZ1tdKSB7XG4gICAgaWYgKGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9PSB1bmRlZmluZWQpXG4gICAgICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IFtdO1xuICAgIGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXSA9IGxvY2F0aW9uR3JhcGhbbG9jYXRpb25OYW1lXS5jb25jYXQoYWRqYWNlbnRMb2NhdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGphY2VudExvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbG9jYXRpb25HcmFwaFthZGphY2VudExvY2F0aW9uc1tpXV0gPSBbXTtcblxuICAgICAgICBsb2NhdGlvbkdyYXBoW2FkamFjZW50TG9jYXRpb25zW2ldXS5wdXNoKGxvY2F0aW9uTmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJlQWRqYWNlbnQobG9jYXRpb24xOiBzdHJpbmcsIGxvY2F0aW9uMjogc3RyaW5nKTpib29sZWFuIHtcbiAgICBjb25zb2xlLmxvZyhcIkFyZSBhZGphY2VudDogXCIgKyBsb2NhdGlvbjEgKyBcIiwgXCIrbG9jYXRpb24yKTtcbiAgICBpZiAobG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdID09IHVuZGVmaW5lZCB8fCBsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMl0gPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJFaXRoZXIgb25lL2JvdGggbG9jYXRpb25zIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25HcmFwaFtsb2NhdGlvbjFdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbkdyYXBoW2xvY2F0aW9uMV1baV0gPT0gbG9jYXRpb24yKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy9wYXRoZmluZGluZyBwcmltaXRpdmVzXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExvY2F0aW9uKHN0YXJ0OiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciB2aXNpdGVkID0ge307XG4gICAgdmFyIHByZXZpb3VzID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIGxvY2F0aW9uR3JhcGgpIHtcbiAgICAgICAgdmlzaXRlZFtrZXldID0gZmFsc2U7XG4gICAgfVxuICAgIHZpc2l0ZWRbc3RhcnRdID0gdHJ1ZTtcblxuICAgIHZhciBteVF1ZXVlID0gbmV3IFF1ZXVlPHN0cmluZz4oKTtcbiAgICBteVF1ZXVlLmVucXVldWUoc3RhcnQpO1xuXG4gICAgd2hpbGUgKCFteVF1ZXVlLmlzRW1wdHkoKSkge1xuICAgICAgICB2YXIgY3VycmVudDogc3RyaW5nID0gbXlRdWV1ZS5kZXF1ZXVlKCk7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IGxvY2F0aW9uR3JhcGhbY3VycmVudF07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdmlzaXRlZFtuZWlnaGJvcnNbaV1dKSB7XG4gICAgICAgICAgICAgICAgbXlRdWV1ZS5lbnF1ZXVlKG5laWdoYm9yc1tpXSk7XG4gICAgICAgICAgICAgICAgdmlzaXRlZFtuZWlnaGJvcnNbaV1dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1tuZWlnaGJvcnNbaV1dID0gY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjdXJyZW50OiBzdHJpbmcgPSBkZXN0aW5hdGlvbjtcbiAgICBpZiAoY3VycmVudCA9PSBzdGFydClcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgd2hpbGUgKHByZXZpb3VzW2N1cnJlbnRdICE9IHN0YXJ0KSB7XG4gICAgICAgIGN1cnJlbnQgPSBwcmV2aW91c1tjdXJyZW50XTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudDtcbn1cblxuLy8xLjIgYWdlbnRzXG52YXIgYWdlbnRzID0gW107XG52YXIgcGVyc29uYWxpdHlBZ2VudHMgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFnZW50KGFnZW50TmFtZTogc3RyaW5nKSB7XG4gICAgYWdlbnRzLnB1c2goYWdlbnROYW1lKTtcbiAgICByZXR1cm4gYWdlbnROYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkUGVyc29uYWxpdHlBZ2VudChhZ2VudE5hbWU6IHN0cmluZywgbzE6IG51bWJlciwgbzI6IG51bWJlciwgYzE6IG51bWJlcixcbiAgYzI6IG51bWJlciwgZTE6IG51bWJlciwgZTI6IG51bWJlciwgYTE6IG51bWJlciwgYTI6IG51bWJlciwgbjE6IG51bWJlciwgbjI6IG51bWJlcikge1xuICAgIHZhciBwZXJzb25hbGl0eSA9IHt9O1xuICAgIHBlcnNvbmFsaXR5W1wibmFtZVwiXSA9IGFnZW50TmFtZTtcbiAgICBwZXJzb25hbGl0eVtcIm9wZW5uZXNzXCJdID0gbzE7XG4gICAgcGVyc29uYWxpdHlbXCJpbnRlbGxlY3RcIl0gPSBvMjtcbiAgICBwZXJzb25hbGl0eVtcImluZHVzdHJpb3VzbmVzc1wiXSA9IGMxO1xuICAgIHBlcnNvbmFsaXR5W1wib3JkZXJsaW5lc3NcIl0gPSBjMjtcbiAgICBwZXJzb25hbGl0eVtcImVudGh1c2lhc21cIl0gPSBlMTtcbiAgICBwZXJzb25hbGl0eVtcImFzc2VydGl2ZW5lc3NcIl0gPSBlMjtcbiAgICBwZXJzb25hbGl0eVtcImNvbXBhc3Npb25cIl0gPSBhMTtcbiAgICBwZXJzb25hbGl0eVtcInBvbGl0ZW5lc3NcIl0gPSBhMjtcbiAgICBwZXJzb25hbGl0eVtcInZvbGF0aWxpdHlcIl0gPSBuMTtcbiAgICBwZXJzb25hbGl0eVtcIndpdGhkcmF3YWxcIl0gPSBuMjtcbiAgICBwZXJzb25hbGl0eUFnZW50cy5wdXNoKHBlcnNvbmFsaXR5KTtcbiAgICByZXR1cm4gYWdlbnROYW1lO1xufVxuXG4vLzEuMyBpdGVtc1xudmFyIGl0ZW1zID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRJdGVtKGl0ZW1OYW1lOiBzdHJpbmcpIHtcbiAgICBpdGVtcy5wdXNoKGl0ZW1OYW1lKTtcbiAgICByZXR1cm4gaXRlbU5hbWU7XG59XG5cbi8vMS40IHZhcmlhYmxlc1xudmFyIHZhcmlhYmxlcyA9IHt9O1xudmFyIGFnZW50VmFyaWFibGVzID0ge307XG52YXIgaXRlbVZhcmlhYmxlcyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0VmFyaWFibGUodmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdmFyaWFibGVzW3Zhck5hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhck5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBZ2VudFZhcmlhYmxlKGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmIChpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pKVxuICAgICAgICBhZ2VudFZhcmlhYmxlc1thZ2VudF0gPSB7fTtcblxuICAgIGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhcmlhYmxlKHZhck5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhcmlhYmxlc1t2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBub3Qgc2V0IVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gdmFyaWFibGVzW3Zhck5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWdlbnRWYXJpYWJsZShhZ2VudDogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoYWdlbnRWYXJpYWJsZXNbYWdlbnRdKSB8fCBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV0pKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVmFyaWFibGUgXCIgKyB2YXJOYW1lICsgXCIgZm9yIGFnZW50IFwiICsgYWdlbnQgKyBcIiBub3Qgc2V0IVwiKVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBhZ2VudFZhcmlhYmxlc1thZ2VudF1bdmFyTmFtZV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhcmlhYmxlTm90U2V0KHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1VuZGVmaW5lZCh2YXJpYWJsZXNbdmFyTmFtZV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBZ2VudFZhcmlhYmxlTm90U2V0KGFnZW50OiBzdHJpbmcsIHZhck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1VuZGVmaW5lZChhZ2VudFZhcmlhYmxlc1thZ2VudF0pIHx8IGlzVW5kZWZpbmVkKGFnZW50VmFyaWFibGVzW2FnZW50XVt2YXJOYW1lXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkpXG4gICAgICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV0gPSB7fTtcblxuICAgIGl0ZW1WYXJpYWJsZXNbaXRlbV1bdmFyTmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJdGVtVmFyaWFibGUoaXRlbTogc3RyaW5nLCB2YXJOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXSkgfHwgaXNVbmRlZmluZWQoaXRlbVZhcmlhYmxlc1tpdGVtXVt2YXJOYW1lXSkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJWYXJpYWJsZSBcIiArIHZhck5hbWUgKyBcIiBmb3IgaXRlbSBcIiArIGl0ZW0gKyBcIiBub3Qgc2V0IVwiKVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBpdGVtVmFyaWFibGVzW2l0ZW1dW3Zhck5hbWVdO1xufVxuXG5cbi8vMlxuLy9hZ2VudC1iZWhhdmlvciB0cmVlIG1hcHBpbmdcbnZhciBhZ2VudFRyZWVzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hUcmVlVG9BZ2VudChhZ2VudDogc3RyaW5nLCB0cmVlOiBUaWNrKSB7XG4gICAgYWdlbnRUcmVlc1thZ2VudF0gPSB0cmVlO1xufVxuXG4vLzMuMVxuLy91c2VyIGFjdGlvbnNcbi8vVE9ETyBhZGQgdmFyaWFibGVzIHRvIHVzZXIgYWN0aW9uIHRleHRzXG52YXIgdXNlckludGVyYWN0aW9uT2JqZWN0ID0ge1xuICAgIHRleHQ6IFwiXCIsXG4gICAgdXNlckFjdGlvbnNUZXh0OiBbXSxcbiAgICBhY3Rpb25FZmZlY3RzVGV4dDogXCJcIlxufVxudmFyIHVzZXJJbnRlcmFjdGlvblRyZWVzID0gW107XG52YXIgdXNlckFjdGlvbnMgPSB7fTtcblxuZnVuY3Rpb24gcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKSB7XG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LnRleHQgPSBcIlwiO1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQgPSBbXTtcbiAgICB1c2VyQWN0aW9ucyA9IHt9Oy8ve1wiR28gdG8gbG9jYXRpb24gWFwiIDogZWZmZWN0XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1c2VySW50ZXJhY3Rpb25UcmVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBleGVjdXRlKHVzZXJJbnRlcmFjdGlvblRyZWVzW2ldKTtcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgZGlzcGxheURlc2NyaXB0aW9uQWN0aW9uID0gKHRleHQ6IHN0cmluZykgPT5cbiAgICBhY3Rpb24oXG4gICAgICAgICgpID0+IHRydWUsXG4gICAgICAgICgpID0+IHVzZXJJbnRlcmFjdGlvbk9iamVjdC50ZXh0ICs9IFwiXFxuXCIgKyB0ZXh0LCAwXG4gICAgKTtcbmV4cG9ydCBsZXQgZGlzcGxheUFjdGlvbkVmZmVjdFRleHQgPSAodGV4dDogc3RyaW5nKSA9PiB1c2VySW50ZXJhY3Rpb25PYmplY3QuYWN0aW9uRWZmZWN0c1RleHQgKz0gXCJcXG5cIiArIHRleHQ7XG5cbmV4cG9ydCBsZXQgYWRkVXNlckFjdGlvblRyZWUgPSAodGV4dDogc3RyaW5nLCBlZmZlY3RUcmVlOiBUaWNrKSA9PiBhY3Rpb24oXG4gICAgKCkgPT4gdHJ1ZSxcbiAgICAoKSA9PiBtYXBVc2VyQWN0aW9uVG9UcmVlKHRleHQsIGVmZmVjdFRyZWUpLCAwXG4pO1xuXG5leHBvcnQgbGV0IGFkZFVzZXJBY3Rpb24gPSAodGV4dDogc3RyaW5nLCBlZmZlY3Q6ICgpID0+IGFueSkgPT5cbiAgICBhY3Rpb24oXG4gICAgICAgICgpID0+IHRydWUsXG4gICAgICAgICgpID0+IG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dCwgYWN0aW9uKCgpPT50cnVlLCBlZmZlY3QsIDApKSwgMFxuICAgICk7XG5cbmZ1bmN0aW9uIG1hcFVzZXJBY3Rpb25Ub1RyZWUodGV4dDogc3RyaW5nLCB0cmVlOiBUaWNrKSB7XG4gICAgdXNlckFjdGlvbnNbdGV4dF0gPSB0cmVlO1xuICAgIHVzZXJJbnRlcmFjdGlvbk9iamVjdC51c2VyQWN0aW9uc1RleHQucHVzaCh0ZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJJbnRlcmFjdGlvblRyZWUodGljazogVGljaykge1xuICAgIHVzZXJJbnRlcmFjdGlvblRyZWVzLnB1c2godGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlVXNlckFjdGlvbih0ZXh0OiBzdHJpbmcpIHtcbiAgICAvL2V4ZWN1dGUgdGhlIHVzZXIgYWN0aW9uXG4gICAgdXNlckludGVyYWN0aW9uT2JqZWN0LmFjdGlvbkVmZmVjdHNUZXh0ID0gXCJcIjtcbiAgICB2YXIgdXNlckFjdGlvbkVmZmVjdFRyZWUgPSB1c2VyQWN0aW9uc1t0ZXh0XTtcbiAgICBleGVjdXRlKHVzZXJBY3Rpb25FZmZlY3RUcmVlKTtcbn1cblxuLy80LlxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgcnVuVXNlckludGVyYWN0aW9uVHJlZXMoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJJbnRlcmFjdGlvbk9iamVjdCgpIHtcbiAgICByZXR1cm4gdXNlckludGVyYWN0aW9uT2JqZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd29ybGRUaWNrKCkge1xuICAgIC8vYWxsIGFnZW50IHRpY2tzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyZWUgPSBhZ2VudFRyZWVzW2FnZW50c1tpXV07XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodHJlZSkpIHtcbiAgICAgICAgICAgIHNldFZhcmlhYmxlKFwiZXhlY3V0aW5nQWdlbnRcIiwgYWdlbnRzW2ldKTtcbiAgICAgICAgICAgIGV4ZWN1dGUodHJlZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJzb25hbGl0eUFnZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJlZSA9IGFnZW50VHJlZXNbcGVyc29uYWxpdHlBZ2VudHNbaV1bXCJuYW1lXCJdXTtcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0cmVlKSkge1xuICAgICAgICAgICAgc2V0VmFyaWFibGUoXCJleGVjdXRpbmdBZ2VudFwiLCBwZXJzb25hbGl0eUFnZW50c1tpXVtcIm5hbWVcIl0pO1xuICAgICAgICAgICAgZXhlY3V0ZSh0cmVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBydW5Vc2VySW50ZXJhY3Rpb25UcmVlcygpO1xufVxuIl19
