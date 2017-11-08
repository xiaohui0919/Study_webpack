/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _app = __webpack_require__(6);

var _app2 = _interopRequireDefault(_app);

__webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
    el: '#app',
    // 渲染方法，用于渲染app组件
    render: function render(create) {
        return create(_app2.default);
    }
}); // import Vue from '../node_modules/vue/dist/vue.js'

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/*!
 * Vue.js v2.5.3
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.functionalOptions = undefined;
  this.functionalScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production' && inject) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if (inBrowser && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      data && data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject).filter(function (key) {
          /* istanbul ignore next */
          return Object.getOwnPropertyDescriptor(inject, key).enumerable
        })
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  // static trees can be rendered once and cached on the contructor options
  // so every instance shares the same cached trees
  var options = this.$options;
  var cached = options.cached || (options.cached = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = options.staticRenderFns[index].call(this._renderProxy, null, this);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.functionalScopeId = options._scopeId;
        vnode.functionalContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.functionalContext = contextVm;
    vnode.functionalOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        if (slot._rendered) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && cached$$1 !== current) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.exclude && matches(this.exclude, name)) ||
        (this.include && !matches(this.include, name))
      )) {
        return vnode
      }

      var ref = this;
      var cache = ref.cache;
      var keys = ref.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.3';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(
            config.ignoredElements.length &&
            config.ignoredElements.some(function (ignore) {
              return isRegExp(ignore)
                ? ignore.test(tag)
                : ignore === tag
            })
          ) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.functionalScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.functionalContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !vnodeToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE9 || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */















// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(1), __webpack_require__(4).setImmediate))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(5);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bced26ea_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_app_vue__ = __webpack_require__(14);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(7)
}
var normalizeComponent = __webpack_require__(12)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bced26ea_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_app_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bced26ea", Component.options)
  } else {
    hotAPI.reload("data-v-bced26ea", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("717fcd61", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bced26ea\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./app.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bced26ea\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./app.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(11)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _vm._v("\n    app.vue\n    "),
      _c("br"),
      _vm._v(" "),
      _c("img", { attrs: { src: __webpack_require__(15), alt: "" } }),
      _vm._v(" "),
      _c("h1", [_vm._v("这是个h1标签的内容")])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-bced26ea", esExports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);