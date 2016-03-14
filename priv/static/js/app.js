(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var unalias = function(alias, loaderPath) {
    var result = aliases[alias] || aliases[alias + '/index.js'];
    return result || alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from ' + '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;}; /*!
 * jQuery JavaScript Library v2.2.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:11Z
 */(function(global,factory){if((typeof module==="undefined"?"undefined":_typeof(module))==="object"&&_typeof(module.exports)==="object"){ // For CommonJS and CommonJS-like environments where a proper `window`
// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info.
module.exports=global.document?factory(global,true):function(w){if(!w.document){throw new Error("jQuery requires a window with a document");}return factory(w);};}else {factory(global);} // Pass this if window is not defined yet
})(typeof window!=="undefined"?window:undefined,function(window,noGlobal){ // Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr=[];var document=window.document;var _slice=arr.slice;var concat=arr.concat;var push=arr.push;var indexOf=arr.indexOf;var class2type={};var toString=class2type.toString;var hasOwn=class2type.hasOwnProperty;var support={};var version="2.2.1", // Define a local copy of jQuery
jQuery=function jQuery(selector,context){ // The jQuery object is actually just the init constructor 'enhanced'
// Need init if jQuery is called (just allow error to be thrown if not included)
return new jQuery.fn.init(selector,context);}, // Support: Android<4.1
// Make sure we trim BOM and NBSP
rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, // Matches dashed string for camelizing
rmsPrefix=/^-ms-/,rdashAlpha=/-([\da-z])/gi, // Used by jQuery.camelCase as callback to replace()
fcamelCase=function fcamelCase(all,letter){return letter.toUpperCase();};jQuery.fn=jQuery.prototype={ // The current version of jQuery being used
jquery:version,constructor:jQuery, // Start with an empty selector
selector:"", // The default length of a jQuery object is 0
length:0,toArray:function toArray(){return _slice.call(this);}, // Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get:function get(num){return num!=null? // Return just the one element from the set
num<0?this[num+this.length]:this[num]: // Return all the elements in a clean array
_slice.call(this);}, // Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack:function pushStack(elems){ // Build a new jQuery matched element set
var ret=jQuery.merge(this.constructor(),elems); // Add the old object onto the stack (as a reference)
ret.prevObject=this;ret.context=this.context; // Return the newly-formed element set
return ret;}, // Execute a callback for every element in the matched set.
each:function each(callback){return jQuery.each(this,callback);},map:function map(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},slice:function slice(){return this.pushStack(_slice.apply(this,arguments));},first:function first(){return this.eq(0);},last:function last(){return this.eq(-1);},eq:function eq(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[]);},end:function end(){return this.prevObject||this.constructor();}, // For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push:push,sort:arr.sort,splice:arr.splice};jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false; // Handle a deep copy situation
if(typeof target==="boolean"){deep=target; // Skip the boolean and the target
target=arguments[i]||{};i++;} // Handle case when target is a string or something (possible in deep copy)
if((typeof target==="undefined"?"undefined":_typeof(target))!=="object"&&!jQuery.isFunction(target)){target={};} // Extend jQuery itself if only one argument is passed
if(i===length){target=this;i--;}for(;i<length;i++){ // Only deal with non-null/undefined values
if((options=arguments[i])!=null){ // Extend the base object
for(name in options){src=target[name];copy=options[name]; // Prevent never-ending loop
if(target===copy){continue;} // Recurse if we're merging plain objects or arrays
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&jQuery.isArray(src)?src:[];}else {clone=src&&jQuery.isPlainObject(src)?src:{};} // Never move original objects, clone them
target[name]=jQuery.extend(deep,clone,copy); // Don't bring in undefined values
}else if(copy!==undefined){target[name]=copy;}}}} // Return the modified object
return target;};jQuery.extend({ // Unique for each copy of jQuery on the page
expando:"jQuery"+(version+Math.random()).replace(/\D/g,""), // Assume jQuery is ready without the ready module
isReady:true,error:function error(msg){throw new Error(msg);},noop:function noop(){},isFunction:function isFunction(obj){return jQuery.type(obj)==="function";},isArray:Array.isArray,isWindow:function isWindow(obj){return obj!=null&&obj===obj.window;},isNumeric:function isNumeric(obj){ // parseFloat NaNs numeric-cast false positives (null|true|false|"")
// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
// subtraction forces infinities to NaN
// adding 1 corrects loss of precision from parseFloat (#15100)
var realStringObj=obj&&obj.toString();return !jQuery.isArray(obj)&&realStringObj-parseFloat(realStringObj)+1>=0;},isPlainObject:function isPlainObject(obj){ // Not plain objects:
// - Any object or value whose internal [[Class]] property is not "[object Object]"
// - DOM nodes
// - window
if(jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false;}if(obj.constructor&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;} // If the function hasn't returned already, we're confident that
// |obj| is a plain object, created by {} or constructed with new Object
return true;},isEmptyObject:function isEmptyObject(obj){var name;for(name in obj){return false;}return true;},type:function type(obj){if(obj==null){return obj+"";} // Support: Android<4.0, iOS<6 (functionish RegExp)
return (typeof obj==="undefined"?"undefined":_typeof(obj))==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj==="undefined"?"undefined":_typeof(obj);}, // Evaluates a script in a global context
globalEval:function globalEval(code){var script,indirect=eval;code=jQuery.trim(code);if(code){ // If the code includes a valid, prologue position
// strict mode pragma, execute code by injecting a
// script tag into the document.
if(code.indexOf("use strict")===1){script=document.createElement("script");script.text=code;document.head.appendChild(script).parentNode.removeChild(script);}else { // Otherwise, avoid the DOM node creation, insertion
// and removal by using an indirect global eval
indirect(code);}}}, // Convert dashed to camelCase; used by the css and data modules
// Support: IE9-11+
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase:function camelCase(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},nodeName:function nodeName(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();},each:function each(obj,callback){var length,i=0;if(isArrayLike(obj)){length=obj.length;for(;i<length;i++){if(callback.call(obj[i],i,obj[i])===false){break;}}}else {for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break;}}}return obj;}, // Support: Android<4.1
trim:function trim(text){return text==null?"":(text+"").replace(rtrim,"");}, // results is for internal usage only
makeArray:function makeArray(arr,results){var ret=results||[];if(arr!=null){if(isArrayLike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr);}else {push.call(ret,arr);}}return ret;},inArray:function inArray(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i);},merge:function merge(first,second){var len=+second.length,j=0,i=first.length;for(;j<len;j++){first[i++]=second[j];}first.length=i;return first;},grep:function grep(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert; // Go through the array, only saving the items
// that pass the validator function
for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i]);}}return matches;}, // arg is for internal usage only
map:function map(elems,callback,arg){var length,value,i=0,ret=[]; // Go through the array, translating each of the items to their new values
if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}} // Go through every key on the object,
}else {for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value);}}} // Flatten any nested arrays
return concat.apply([],ret);}, // A global GUID counter for objects
guid:1, // Bind a function to a context, optionally partially applying any
// arguments.
proxy:function proxy(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;} // Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if(!jQuery.isFunction(fn)){return undefined;} // Simulated bind
args=_slice.call(arguments,2);proxy=function proxy(){return fn.apply(context||this,args.concat(_slice.call(arguments)));}; // Set the guid of unique handler to the same of original handler, so it can be removed
proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;},now:Date.now, // jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support:support}); // JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */if(typeof Symbol==="function"){jQuery.fn[Symbol.iterator]=arr[Symbol.iterator];} /* jshint ignore: end */ // Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});function isArrayLike(obj){ // Support: iOS 8.2 (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length=!!obj&&"length" in obj&&obj.length,type=jQuery.type(obj);if(type==="function"||jQuery.isWindow(obj)){return false;}return type==="array"||length===0||typeof length==="number"&&length>0&&length-1 in obj;}var Sizzle= /*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */function(window){var i,support,Expr,getText,isXML,tokenize,compile,select,outermostContext,sortInput,hasDuplicate, // Local document vars
setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains, // Instance-specific data
expando="sizzle"+1*new Date(),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function sortOrder(a,b){if(a===b){hasDuplicate=true;}return 0;}, // General-purpose constants
MAX_NEGATIVE=1<<31, // Instance methods
hasOwn={}.hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice, // Use a stripped-down indexOf as it's faster than native
// http://jsperf.com/thor-indexof-vs-for/5
indexOf=function indexOf(list,elem){var i=0,len=list.length;for(;i<len;i++){if(list[i]===elem){return i;}}return -1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", // Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
whitespace="[\\x20\\t\\r\\n\\f]", // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
identifier="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
attributes="\\["+whitespace+"*("+identifier+")(?:"+whitespace+ // Operator (capture 2)
"*([*^$|!~]?=)"+whitespace+ // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+identifier+"))|)"+whitespace+"*\\]",pseudos=":("+identifier+")(?:\\(("+ // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|"+ // 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|"+attributes+")*)|"+ // 3. anything else (capture 2)
".*"+")\\)|)", // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
rwhitespace=new RegExp(whitespace+"+","g"),rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*?)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+identifier+")"),"CLASS":new RegExp("^\\.("+identifier+")"),"TAG":new RegExp("^("+identifier+"|[*])"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"), // For use in libraries implementing .is()
// We use this for POS matching in `select`
"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/, // Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,rescape=/'|\\/g, // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function funescape(_,escaped,escapedWhitespace){var high="0x"+escaped-0x10000; // NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
return high!==high||escapedWhitespace?escaped:high<0? // BMP codepoint
String.fromCharCode(high+0x10000): // Supplemental Plane codepoint (surrogate pair)
String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);}, // Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
unloadHandler=function unloadHandler(){setDocument();}; // Optimize for push.apply( _, NodeList )
try{push.apply(arr=slice.call(preferredDoc.childNodes),preferredDoc.childNodes); // Support: Android<4.0
// Detect silently failing push.apply
arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length? // Leverage slice if possible
function(target,els){push_native.apply(target,slice.call(els));}: // Support: IE<9
// Otherwise append directly
function(target,els){var j=target.length,i=0; // Can't trust NodeList.length
while(target[j++]=els[i++]){}target.length=j-1;}};}function Sizzle(selector,context,results,seed){var m,i,elem,nid,nidselect,match,groups,newSelector,newContext=context&&context.ownerDocument, // nodeType defaults to 9, since context defaults to document
nodeType=context?context.nodeType:9;results=results||[]; // Return early from calls with invalid selector or context
if(typeof selector!=="string"||!selector||nodeType!==1&&nodeType!==9&&nodeType!==11){return results;} // Try to shortcut find operations (as opposed to filters) in HTML documents
if(!seed){if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context);}context=context||document;if(documentIsHTML){ // If the selector is sufficiently simple, try using a "get*By*" DOM method
// (excepting DocumentFragment context, where the methods don't exist)
if(nodeType!==11&&(match=rquickExpr.exec(selector))){ // ID selector
if(m=match[1]){ // Document context
if(nodeType===9){if(elem=context.getElementById(m)){ // Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(elem.id===m){results.push(elem);return results;}}else {return results;} // Element context
}else { // Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by name instead of ID
if(newContext&&(elem=newContext.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}} // Type selector
}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results; // Class selector
}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}} // Take advantage of querySelectorAll
if(support.qsa&&!compilerCache[selector+" "]&&(!rbuggyQSA||!rbuggyQSA.test(selector))){if(nodeType!==1){newContext=context;newSelector=selector; // qSA looks outside Element context, which is not what we want
// Thanks to Andrew Dupont for this workaround technique
// Support: IE <=8
// Exclude object elements
}else if(context.nodeName.toLowerCase()!=="object"){ // Capture the context ID, setting it first if necessary
if(nid=context.getAttribute("id")){nid=nid.replace(rescape,"\\$&");}else {context.setAttribute("id",nid=expando);} // Prefix every selector in the list
groups=tokenize(selector);i=groups.length;nidselect=ridentifier.test(nid)?"#"+nid:"[id='"+nid+"']";while(i--){groups[i]=nidselect+" "+toSelector(groups[i]);}newSelector=groups.join(","); // Expand context for sibling selectors
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;}if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){}finally {if(nid===expando){context.removeAttribute("id");}}}}}} // All others
return select(selector.replace(rtrim,"$1"),context,results,seed);} /**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */function createCache(){var keys=[];function cache(key,value){ // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
if(keys.push(key+" ")>Expr.cacheLength){ // Only keep the most recent entries
delete cache[keys.shift()];}return cache[key+" "]=value;}return cache;} /**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */function markFunction(fn){fn[expando]=true;return fn;} /**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */function assert(fn){var div=document.createElement("div");try{return !!fn(div);}catch(e){return false;}finally { // Remove from its parent by default
if(div.parentNode){div.parentNode.removeChild(div);} // release memory in IE
div=null;}} /**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */function addHandle(attrs,handler){var arr=attrs.split("|"),i=arr.length;while(i--){Expr.attrHandle[arr[i]]=handler;}} /**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||MAX_NEGATIVE)-(~a.sourceIndex||MAX_NEGATIVE); // Use IE sourceIndex if available on both nodes
if(diff){return diff;} // Check if b follows a
if(cur){while(cur=cur.nextSibling){if(cur===b){return -1;}}}return a?1:-1;} /**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};} /**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return (name==="input"||name==="button")&&elem.type===type;};} /**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length; // Match elements found at the specified indexes
while(i--){if(seed[j=matchIndexes[i]]){seed[j]=!(matches[j]=seed[j]);}}});});} /**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */function testContext(context){return context&&typeof context.getElementsByTagName!=="undefined"&&context;} // Expose support vars for convenience
support=Sizzle.support={}; /**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */isXML=Sizzle.isXML=function(elem){ // documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;}; /**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */setDocument=Sizzle.setDocument=function(node){var hasCompare,parent,doc=node?node.ownerDocument||node:preferredDoc; // Return early if doc is invalid or already selected
if(doc===document||doc.nodeType!==9||!doc.documentElement){return document;} // Update global variables
document=doc;docElem=document.documentElement;documentIsHTML=!isXML(document); // Support: IE 9-11, Edge
// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
if((parent=document.defaultView)&&parent.top!==parent){ // Support: IE 11
if(parent.addEventListener){parent.addEventListener("unload",unloadHandler,false); // Support: IE 9 - 10 only
}else if(parent.attachEvent){parent.attachEvent("onunload",unloadHandler);}} /* Attributes
	---------------------------------------------------------------------- */ // Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
support.attributes=assert(function(div){div.className="i";return !div.getAttribute("className");}); /* getElement(s)By*
	---------------------------------------------------------------------- */ // Check if getElementsByTagName("*") returns only elements
support.getElementsByTagName=assert(function(div){div.appendChild(document.createComment(""));return !div.getElementsByTagName("*").length;}); // Support: IE<9
support.getElementsByClassName=rnative.test(document.getElementsByClassName); // Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programatically-set names,
// so use a roundabout getElementsByName test
support.getById=assert(function(div){docElem.appendChild(div).id=expando;return !document.getElementsByName||!document.getElementsByName(expando).length;}); // ID find and filter
if(support.getById){Expr.find["ID"]=function(id,context){if(typeof context.getElementById!=="undefined"&&documentIsHTML){var m=context.getElementById(id);return m?[m]:[];}};Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};}else { // Support: IE6/7
// getElementById is not reliable as a find shortcut
delete Expr.find["ID"];Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return node&&node.value===attrId;};};} // Tag
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(tag); // DocumentFragment nodes don't have gEBTN
}else if(support.qsa){return context.querySelectorAll(tag);}}:function(tag,context){var elem,tmp=[],i=0, // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
results=context.getElementsByTagName(tag); // Filter out possible comments
if(tag==="*"){while(elem=results[i++]){if(elem.nodeType===1){tmp.push(elem);}}return tmp;}return results;}; // Class
Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!=="undefined"&&documentIsHTML){return context.getElementsByClassName(className);}}; /* QSA/matchesSelector
	---------------------------------------------------------------------- */ // QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
rbuggyMatches=[]; // qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE error
// See http://bugs.jquery.com/ticket/13378
rbuggyQSA=[];if(support.qsa=rnative.test(document.querySelectorAll)){ // Build QSA regex
// Regex strategy adopted from Diego Perini
assert(function(div){ // Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,
// since its presence should be enough
// http://bugs.jquery.com/ticket/12359
docElem.appendChild(div).innerHTML="<a id='"+expando+"'></a>"+"<select id='"+expando+"-\r\\' msallowcapture=''>"+"<option selected=''></option></select>"; // Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^= or $= or *=
// The test attribute must be unknown in Opera but "safe" for WinRT
// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
if(div.querySelectorAll("[msallowcapture^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");} // Support: IE8
// Boolean attributes and "value" are not treated correctly
if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");} // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
if(!div.querySelectorAll("[id~="+expando+"-]").length){rbuggyQSA.push("~=");} // Webkit/Opera - :checked should return selected option elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
// IE8 throws error here and will not see later tests
if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");} // Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibing-combinator selector` fails
if(!div.querySelectorAll("a#"+expando+"+*").length){rbuggyQSA.push(".#.+[+~]");}});assert(function(div){ // Support: Windows 8 Native Apps
// The type and name attributes are restricted during .innerHTML assignment
var input=document.createElement("input");input.setAttribute("type","hidden");div.appendChild(input).setAttribute("name","D"); // Support: IE8
// Enforce case-sensitivity of name attribute
if(div.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");} // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
// IE8 throws error here and will not see later tests
if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled");} // Opera 10-11 does not throw on post-comma invalid pseudos
div.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}if(support.matchesSelector=rnative.test(matches=docElem.matches||docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)){assert(function(div){ // Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
support.disconnectedMatch=matches.call(div,"div"); // This should fail with an exception
// Gecko does not error, returns false instead
matches.call(div,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|")); /* Contains
	---------------------------------------------------------------------- */hasCompare=rnative.test(docElem.compareDocumentPosition); // Element contains another
// Purposefully self-exclusive
// As in, an element does not contain itself
contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while(b=b.parentNode){if(b===a){return true;}}}return false;}; /* Sorting
	---------------------------------------------------------------------- */ // Document order sorting
sortOrder=hasCompare?function(a,b){ // Flag for duplicate removal
if(a===b){hasDuplicate=true;return 0;} // Sort on method existence if only one input has compareDocumentPosition
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;} // Calculate position if both inputs belong to the same document
compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b): // Otherwise we know they are disconnected
1; // Disconnected nodes
if(compare&1||!support.sortDetached&&b.compareDocumentPosition(a)===compare){ // Choose the first element that is related to our preferred document
if(a===document||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)){return -1;}if(b===document||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)){return 1;} // Maintain original order
return sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0;}return compare&4?-1:1;}:function(a,b){ // Exit early if the nodes are identical
if(a===b){hasDuplicate=true;return 0;}var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b]; // Parentless nodes are either documents or disconnected
if(!aup||!bup){return a===document?-1:b===document?1:aup?-1:bup?1:sortInput?indexOf(sortInput,a)-indexOf(sortInput,b):0; // If the nodes are siblings, we can do a quick check
}else if(aup===bup){return siblingCheck(a,b);} // Otherwise we need full lists of their ancestors for comparison
cur=a;while(cur=cur.parentNode){ap.unshift(cur);}cur=b;while(cur=cur.parentNode){bp.unshift(cur);} // Walk down the tree looking for a discrepancy
while(ap[i]===bp[i]){i++;}return i? // Do a sibling check if the nodes have a common ancestor
siblingCheck(ap[i],bp[i]): // Otherwise nodes in our document sort first
ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0;};return document;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){ // Set document vars if needed
if((elem.ownerDocument||elem)!==document){setDocument(elem);} // Make sure that attribute selectors are quoted
expr=expr.replace(rattributeQuotes,"='$1']");if(support.matchesSelector&&documentIsHTML&&!compilerCache[expr+" "]&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr); // IE 9's matchesSelector returns false on disconnected nodes
if(ret||support.disconnectedMatch|| // As well, disconnected nodes are said to be in a document
// fragment in IE 9
elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){}}return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){ // Set document vars if needed
if((context.ownerDocument||context)!==document){setDocument(context);}return contains(context,elem);};Sizzle.attr=function(elem,name){ // Set document vars if needed
if((elem.ownerDocument||elem)!==document){setDocument(elem);}var fn=Expr.attrHandle[name.toLowerCase()], // Don't get fooled by Object.prototype properties (jQuery #13807)
val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);}; /**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0; // Unless we *know* we can detect duplicates, assume their presence
hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while(elem=results[i++]){if(elem===results[i]){j=duplicates.push(i);}}while(j--){results.splice(duplicates[j],1);}} // Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
sortInput=null;return results;}; /**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){ // If no nodeType, this is expected to be an array
while(node=elem[i++]){ // Do not traverse comment nodes
ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){ // Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery #11153)
if(typeof elem.textContent==="string"){return elem.textContent;}else { // Traverse its children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;} // Do not include comment or processing instruction nodes
return ret;};Expr=Sizzle.selectors={ // Can be adjusted by the user
cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function ATTR(match){match[1]=match[1].replace(runescape,funescape); // Move the given value to match[3] whether quoted or unquoted
match[3]=(match[3]||match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}return match.slice(0,4);},"CHILD":function CHILD(match){ /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){ // nth-* requires argument
if(!match[3]){Sizzle.error(match[0]);} // numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+(match[7]+match[8]||match[3]==="odd"); // other types prohibit arguments
}else if(match[3]){Sizzle.error(match[0]);}return match;},"PSEUDO":function PSEUDO(match){var excess,unquoted=!match[6]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;} // Accept quoted arguments as-is
if(match[3]){match[2]=match[4]||match[5]||""; // Strip excess characters from unquoted arguments
}else if(unquoted&&rpseudo.test(unquoted)&&( // Get excess from tokenize (recursively)
excess=tokenize(unquoted,true))&&( // advance to the next closing parenthesis
excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){ // excess is a negative index
match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);} // Return only captures needed by the pseudo filter method (type and argument)
return match.slice(0,3);}},filter:{"TAG":function TAG(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function CLASS(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!=="undefined"&&elem.getAttribute("class")||"");});},"ATTR":function ATTR(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}if(!operator){return true;}result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result.replace(rwhitespace," ")+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function CHILD(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0? // Shortcut for :nth-*(n)
function(elem){return !!elem.parentNode;}:function(elem,context,xml){var cache,uniqueCache,outerCache,node,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType,diff=false;if(parent){ // :(first|last|only)-(child|of-type)
if(simple){while(dir){node=elem;while(node=node[dir]){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}} // Reverse direction for :only-* (if we haven't yet done so)
start=dir=type==="only"&&!start&&"nextSibling";}return true;}start=[forward?parent.firstChild:parent.lastChild]; // non-xml :nth-child(...) stores cache data on `parent`
if(forward&&useCache){ // Seek `elem` from a previously-cached index
// ...in a gzip-friendly way
node=parent;outerCache=node[expando]||(node[expando]={}); // Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while(node=++nodeIndex&&node&&node[dir]||( // Fallback to seeking `elem` from the start
diff=nodeIndex=0)||start.pop()){ // When found, cache indexes on `parent` and break
if(node.nodeType===1&&++diff&&node===elem){uniqueCache[type]=[dirruns,nodeIndex,diff];break;}}}else { // Use previously-cached element index if available
if(useCache){ // ...in a gzip-friendly way
node=elem;outerCache=node[expando]||(node[expando]={}); // Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});cache=uniqueCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=nodeIndex;} // xml :nth-child(...)
// or :nth-last-child(...) or :nth(-last)?-of-type(...)
if(diff===false){ // Use the same loop as above to seek `elem` from the start
while(node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop()){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){ // Cache the index of each encountered element
if(useCache){outerCache=node[expando]||(node[expando]={}); // Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[node.uniqueID]||(outerCache[node.uniqueID]={});uniqueCache[type]=[dirruns,diff];}if(node===elem){break;}}}}} // Incorporate the offset, then check against cycle size
diff-=last;return diff===first||diff%first===0&&diff/first>=0;}};},"PSEUDO":function PSEUDO(pseudo,argument){ // pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
// Remember that setFilters inherits from pseudos
var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo); // The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
if(fn[expando]){return fn(argument);} // But maintain support for old signatures
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}return fn;}},pseudos:{ // Potentially complex pseudos
"not":markFunction(function(selector){ // Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length; // Match elements unmatched by `matcher`
while(i--){if(elem=unmatched[i]){seed[i]=!(matches[i]=elem);}}}):function(elem,context,xml){input[0]=elem;matcher(input,null,xml,results); // Don't keep the element (issue #299)
input[0]=null;return !results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){text=text.replace(runescape,funescape);return function(elem){return (elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1;};}), // "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is performed case-insensitively.
// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
"lang":markFunction(function(lang){ // lang value must be a valid identifier
if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do {if(elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang")){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}), // Miscellaneous
"target":function target(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function root(elem){return elem===docElem;},"focus":function focus(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);}, // Boolean properties
"enabled":function enabled(elem){return elem.disabled===false;},"disabled":function disabled(elem){return elem.disabled===true;},"checked":function checked(elem){ // In CSS3, :checked should return both checked and selected elements
// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var nodeName=elem.nodeName.toLowerCase();return nodeName==="input"&&!!elem.checked||nodeName==="option"&&!!elem.selected;},"selected":function selected(elem){ // Accessing this property makes selected-by-default
// options in Safari work properly
if(elem.parentNode){elem.parentNode.selectedIndex;}return elem.selected===true;}, // Contents
"empty":function empty(elem){ // http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
//   but not by others (comment: 8; processing instruction: 7; etc.)
// nodeType < 6 works because attributes (2) do not appear as children
for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}return true;},"parent":function parent(elem){return !Expr.pseudos["empty"](elem);}, // Element/input types
"header":function header(elem){return rheader.test(elem.nodeName);},"input":function input(elem){return rinputs.test(elem.nodeName);},"button":function button(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function text(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&( // Support: IE<8
// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
(attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");}, // Position-in-collection
"first":createPositionalPseudo(function(){return [0];}),"last":createPositionalPseudo(function(matchIndexes,length){return [length-1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return [argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;--i>=0;){matchIndexes.push(i);}return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"]; // Add button/input type pseudos
for(i in {radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}for(i in {submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);} // Easy API for creating new setFilters
function setFilters(){}setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();tokenize=Sizzle.tokenize=function(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){ // Comma and first run
if(!matched||(match=rcomma.exec(soFar))){if(match){ // Don't consume trailing commas as valid
soFar=soFar.slice(match[0].length)||soFar;}groups.push(tokens=[]);}matched=false; // Combinators
if(match=rcombinators.exec(soFar)){matched=match.shift();tokens.push({value:matched, // Cast descendant combinators to space
type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);} // Filters
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}if(!matched){break;}} // Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
return parseOnly?soFar.length:soFar?Sizzle.error(selector): // Cache the tokens
tokenCache(selector,groups).slice(0);};function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}return selector;}function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&dir==="parentNode",doneName=done++;return combinator.first? // Check against closest ancestor/preceding element
function(elem,context,xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}}: // Check against all ancestor/preceding elements
function(elem,context,xml){var oldCache,uniqueCache,outerCache,newCache=[dirruns,doneName]; // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
if(xml){while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else {while(elem=elem[dir]){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={}); // Support: IE <9 only
// Defend against cloned attroperties (jQuery gh-1709)
uniqueCache=outerCache[elem.uniqueID]||(outerCache[elem.uniqueID]={});if((oldCache=uniqueCache[dir])&&oldCache[0]===dirruns&&oldCache[1]===doneName){ // Assign to newCache so results back-propagate to previous elements
return newCache[2]=oldCache[2];}else { // Reuse newcache so results back-propagate to previous elements
uniqueCache[dir]=newCache; // A match means we're done; a fail means we have to keep checking
if(newCache[2]=matcher(elem,context,xml)){return true;}}}}}};}function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}return true;}:matchers[0];}function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}return results;}function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if(elem=unmatched[i]){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}return newUnmatched;}function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length, // Get initial elements from seed or context
elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]), // Prefilter to get matcher input, preserving a map for seed-results synchronization
matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
postFinder||(seed?preFilter:preexisting||postFilter)? // ...intermediate processing is necessary
[]: // ...otherwise use results directly
results:matcherIn; // Find primary matches
if(matcher){matcher(matcherIn,matcherOut,context,xml);} // Apply postFilter
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml); // Un-match failing elements by moving them back to matcherIn
i=temp.length;while(i--){if(elem=temp[i]){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}if(seed){if(postFinder||preFilter){if(postFinder){ // Get the final matcherOut by condensing this intermediate into postFinder contexts
temp=[];i=matcherOut.length;while(i--){if(elem=matcherOut[i]){ // Restore matcherIn since elem is not yet a final match
temp.push(matcherIn[i]=elem);}}postFinder(null,matcherOut=[],temp,xml);} // Move matched elements from seed to results to keep them synchronized
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}} // Add elements to results, through postFinder if defined
}else {matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else {push.apply(results,matcherOut);}}});}function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0, // The foundational matcher ensures that elements are reachable from top-level context(s)
matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){var ret=!leadingRelative&&(xml||context!==outermostContext)||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml)); // Avoid hanging onto element (issue #299)
checkContext=null;return ret;}];for(;i<len;i++){if(matcher=Expr.relative[tokens[i].type]){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else {matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches); // Return special upon seeing a positional matcher
if(matcher[expando]){ // Find the next relative operator (if any) for proper handling
j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector( // If the preceding token was a descendant combinator, insert an implicit any-element `*`
tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens(tokens=tokens.slice(j)),j<len&&toSelector(tokens));}matchers.push(matcher);}}return elementMatcher(matchers);}function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function superMatcher(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext, // We must always have either seed elements or outermost context
elems=seed||byElement&&Expr.find["TAG"]("*",outermost), // Use integer dirruns iff this is the outermost matcher
dirrunsUnique=dirruns+=contextBackup==null?1:Math.random()||0.1,len=elems.length;if(outermost){outermostContext=context===document||context||outermost;} // Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;if(!context&&elem.ownerDocument!==document){setDocument(elem);xml=!documentIsHTML;}while(matcher=elementMatchers[j++]){if(matcher(elem,context||document,xml)){results.push(elem);break;}}if(outermost){dirruns=dirrunsUnique;}} // Track unmatched elements for set filters
if(bySet){ // They will have gone through all possible matchers
if(elem=!matcher&&elem){matchedCount--;} // Lengthen the array for every element, matched or not
if(seed){unmatched.push(elem);}}} // `i` is now the count of elements visited above, and adding it to `matchedCount`
// makes the latter nonnegative.
matchedCount+=i; // Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
// case, which will result in a "00" `matchedCount` that differs from `i` but is also
// numerically zero.
if(bySet&&i!==matchedCount){j=0;while(matcher=setMatchers[j++]){matcher(unmatched,setMatched,context,xml);}if(seed){ // Reintegrate element matches to eliminate the need for sorting
if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}} // Discard index placeholder values to get only actual matches
setMatched=condense(setMatched);} // Add matches to results
push.apply(results,setMatched); // Seedless set matches succeeding multiple successful matchers stipulate sorting
if(outermost&&!seed&&setMatched.length>0&&matchedCount+setMatchers.length>1){Sizzle.uniqueSort(results);}} // Override manipulation of globals by nested matchers
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}compile=Sizzle.compile=function(selector,match /* Internal Use Only */){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){ // Generate a function of recursive functions that can be used to check each element
if(!match){match=tokenize(selector);}i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else {elementMatchers.push(cached);}} // Cache the compiled function
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers)); // Save selector and tokenization
cached.selector=selector;}return cached;}; /**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize(selector=compiled.selector||selector);results=results||[]; // Try to minimize operations if there is only one selector in the list and no seed
// (the latter of which guarantees us context)
if(match.length===1){ // Reduce context if the leading compound selector is an ID
tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&support.getById&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results; // Precompiled matchers will still verify ancestry, so step up a level
}else if(compiled){context=context.parentNode;}selector=selector.slice(tokens.shift().value.length);} // Fetch a seed set for right-to-left matching
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i]; // Abort if we hit a combinator
if(Expr.relative[type=token.type]){break;}if(find=Expr.find[type]){ // Search, expanding context for leading sibling combinators
if(seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context)){ // If seed is empty or no tokens remain, we can return early
tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}break;}}}} // Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector above
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,!context||rsibling.test(selector)&&testContext(context.parentNode)||context);return results;}; // One-time assignments
// Sort stability
support.sortStable=expando.split("").sort(sortOrder).join("")===expando; // Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates=!!hasDuplicate; // Initialize against the default document
setDocument(); // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached=assert(function(div1){ // Should return 1, but returns 4 (following)
return div1.compareDocumentPosition(document.createElement("div"))&1;}); // Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if(!assert(function(div){div.innerHTML="<a href='#'></a>";return div.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});} // Support: IE<9
// Use defaultValue in place of getAttribute("value")
if(!support.attributes||!assert(function(div){div.innerHTML="<input/>";div.firstChild.setAttribute("value","");return div.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});} // Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if(!assert(function(div){return div.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}return Sizzle;}(window);jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.uniqueSort=jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;var dir=function dir(elem,_dir,until){var matched=[],truncate=until!==undefined;while((elem=elem[_dir])&&elem.nodeType!==9){if(elem.nodeType===1){if(truncate&&jQuery(elem).is(until)){break;}matched.push(elem);}}return matched;};var _siblings=function _siblings(n,elem){var matched=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){matched.push(n);}}return matched;};var rneedsContext=jQuery.expr.match.needsContext;var rsingleTag=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;var risSimple=/^.[^:#\[\.,]*$/; // Implement the identical functionality for filter and not
function winnow(elements,qualifier,not){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){ /* jshint -W018 */return !!qualifier.call(elem,i,elem)!==not;});}if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return elem===qualifier!==not;});}if(typeof qualifier==="string"){if(risSimple.test(qualifier)){return jQuery.filter(qualifier,elements,not);}qualifier=jQuery.filter(qualifier,elements);}return jQuery.grep(elements,function(elem){return indexOf.call(qualifier,elem)>-1!==not;});}jQuery.filter=function(expr,elems,not){var elem=elems[0];if(not){expr=":not("+expr+")";}return elems.length===1&&elem.nodeType===1?jQuery.find.matchesSelector(elem,expr)?[elem]:[]:jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1;}));};jQuery.fn.extend({find:function find(selector){var i,len=this.length,ret=[],self=this;if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++){if(jQuery.contains(self[i],this)){return true;}}}));}for(i=0;i<len;i++){jQuery.find(selector,self[i],ret);} // Needed because $( selector, context ) becomes $( context ).find( selector )
ret=this.pushStack(len>1?jQuery.unique(ret):ret);ret.selector=this.selector?this.selector+" "+selector:selector;return ret;},filter:function filter(selector){return this.pushStack(winnow(this,selector||[],false));},not:function not(selector){return this.pushStack(winnow(this,selector||[],true));},is:function is(selector){return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
// so $("p:first").is("p:last") won't return true for a doc with two "p".
typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length;}}); // Initialize a jQuery object
// A central reference to the root jQuery(document)
var rootjQuery, // A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,init=jQuery.fn.init=function(selector,context,root){var match,elem; // HANDLE: $(""), $(null), $(undefined), $(false)
if(!selector){return this;} // Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
root=root||rootjQuery; // Handle HTML strings
if(typeof selector==="string"){if(selector[0]==="<"&&selector[selector.length-1]===">"&&selector.length>=3){ // Assume that strings that start and end with <> are HTML and skip the regex check
match=[null,selector,null];}else {match=rquickExpr.exec(selector);} // Match html or make sure no context is specified for #id
if(match&&(match[1]||!context)){ // HANDLE: $(html) -> $(array)
if(match[1]){context=context instanceof jQuery?context[0]:context; // Option to run scripts is true for back-compat
// Intentionally let the error be thrown if parseHTML is not present
jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true)); // HANDLE: $(html, props)
if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){ // Properties of context are called as methods if possible
if(jQuery.isFunction(this[match])){this[match](context[match]); // ...and otherwise set as attributes
}else {this.attr(match,context[match]);}}}return this; // HANDLE: $(#id)
}else {elem=document.getElementById(match[2]); // Support: Blackberry 4.6
// gEBID returns nodes no longer in the document (#6963)
if(elem&&elem.parentNode){ // Inject the element directly into the jQuery object
this.length=1;this[0]=elem;}this.context=document;this.selector=selector;return this;} // HANDLE: $(expr, $(...))
}else if(!context||context.jquery){return (context||root).find(selector); // HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
}else {return this.constructor(context).find(selector);} // HANDLE: $(DOMElement)
}else if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this; // HANDLE: $(function)
// Shortcut for document ready
}else if(jQuery.isFunction(selector)){return root.ready!==undefined?root.ready(selector): // Execute immediately if ready is not present
selector(jQuery);}if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context;}return jQuery.makeArray(selector,this);}; // Give the init function the jQuery prototype for later instantiation
init.prototype=jQuery.fn; // Initialize central reference
rootjQuery=jQuery(document);var rparentsprev=/^(?:parents|prev(?:Until|All))/, // Methods guaranteed to produce a unique set when starting from a unique set
guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({has:function has(target){var targets=jQuery(target,this),l=targets.length;return this.filter(function(){var i=0;for(;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},closest:function closest(selectors,context){var cur,i=0,l=this.length,matched=[],pos=rneedsContext.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;for(;i<l;i++){for(cur=this[i];cur&&cur!==context;cur=cur.parentNode){ // Always skip document fragments
if(cur.nodeType<11&&(pos?pos.index(cur)>-1: // Don't pass non-elements to Sizzle
cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){matched.push(cur);break;}}}return this.pushStack(matched.length>1?jQuery.uniqueSort(matched):matched);}, // Determine the position of an element within the set
index:function index(elem){ // No argument, return index in parent
if(!elem){return this[0]&&this[0].parentNode?this.first().prevAll().length:-1;} // Index in selector
if(typeof elem==="string"){return indexOf.call(jQuery(elem),this[0]);} // Locate the position of the desired element
return indexOf.call(this, // If it receives a jQuery object, the first element is used
elem.jquery?elem[0]:elem);},add:function add(selector,context){return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(),jQuery(selector,context))));},addBack:function addBack(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){while((cur=cur[dir])&&cur.nodeType!==1){}return cur;}jQuery.each({parent:function parent(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function parents(elem){return dir(elem,"parentNode");},parentsUntil:function parentsUntil(elem,i,until){return dir(elem,"parentNode",until);},next:function next(elem){return sibling(elem,"nextSibling");},prev:function prev(elem){return sibling(elem,"previousSibling");},nextAll:function nextAll(elem){return dir(elem,"nextSibling");},prevAll:function prevAll(elem){return dir(elem,"previousSibling");},nextUntil:function nextUntil(elem,i,until){return dir(elem,"nextSibling",until);},prevUntil:function prevUntil(elem,i,until){return dir(elem,"previousSibling",until);},siblings:function siblings(elem){return _siblings((elem.parentNode||{}).firstChild,elem);},children:function children(elem){return _siblings(elem.firstChild);},contents:function contents(elem){return elem.contentDocument||jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var matched=jQuery.map(this,fn,until);if(name.slice(-5)!=="Until"){selector=until;}if(selector&&typeof selector==="string"){matched=jQuery.filter(selector,matched);}if(this.length>1){ // Remove duplicates
if(!guaranteedUnique[name]){jQuery.uniqueSort(matched);} // Reverse order for parents* and prev-derivatives
if(rparentsprev.test(name)){matched.reverse();}}return this.pushStack(matched);};});var rnotwhite=/\S+/g; // Convert String-formatted options into Object-formatted ones
function createOptions(options){var object={};jQuery.each(options.match(rnotwhite)||[],function(_,flag){object[flag]=true;});return object;} /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */jQuery.Callbacks=function(options){ // Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options=typeof options==="string"?createOptions(options):jQuery.extend({},options);var  // Flag to know if list is currently firing
firing, // Last fire value for non-forgettable lists
memory, // Flag to know if list was already fired
_fired, // Flag to prevent firing
_locked, // Actual callback list
list=[], // Queue of execution data for repeatable lists
queue=[], // Index of currently firing callback (modified by add/remove as needed)
firingIndex=-1, // Fire callbacks
fire=function fire(){ // Enforce single-firing
_locked=options.once; // Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
_fired=firing=true;for(;queue.length;firingIndex=-1){memory=queue.shift();while(++firingIndex<list.length){ // Run callback and check for early termination
if(list[firingIndex].apply(memory[0],memory[1])===false&&options.stopOnFalse){ // Jump to end and forget the data so .add doesn't re-fire
firingIndex=list.length;memory=false;}}} // Forget the data if we're done with it
if(!options.memory){memory=false;}firing=false; // Clean up if we're done firing for good
if(_locked){ // Keep an empty list if we have data for future add calls
if(memory){list=[]; // Otherwise, this object is spent
}else {list="";}}}, // Actual Callbacks object
self={ // Add a callback or a collection of callbacks to the list
add:function add(){if(list){ // If we have memory from a past run, we should fire after adding
if(memory&&!firing){firingIndex=list.length-1;queue.push(memory);}(function add(args){jQuery.each(args,function(_,arg){if(jQuery.isFunction(arg)){if(!options.unique||!self.has(arg)){list.push(arg);}}else if(arg&&arg.length&&jQuery.type(arg)!=="string"){ // Inspect recursively
add(arg);}});})(arguments);if(memory&&!firing){fire();}}return this;}, // Remove a callback from the list
remove:function remove(){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1); // Handle firing indexes
if(index<=firingIndex){firingIndex--;}}});return this;}, // Check if a given callback is in the list.
// If no argument is given, return whether or not list has callbacks attached.
has:function has(fn){return fn?jQuery.inArray(fn,list)>-1:list.length>0;}, // Remove all callbacks from the list
empty:function empty(){if(list){list=[];}return this;}, // Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable:function disable(){_locked=queue=[];list=memory="";return this;},disabled:function disabled(){return !list;}, // Disable .fire
// Also disable .add unless we have memory (since it would have no effect)
// Abort any pending executions
lock:function lock(){_locked=queue=[];if(!memory){list=memory="";}return this;},locked:function locked(){return !!_locked;}, // Call all callbacks with the given context and arguments
fireWith:function fireWith(context,args){if(!_locked){args=args||[];args=[context,args.slice?args.slice():args];queue.push(args);if(!firing){fire();}}return this;}, // Call all the callbacks with the given arguments
fire:function fire(){self.fireWith(this,arguments);return this;}, // To know if the callbacks have already been called at least once
fired:function fired(){return !!_fired;}};return self;};jQuery.extend({Deferred:function Deferred(func){var tuples=[ // action, add listener, listener list, final state
["resolve","done",jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory")]],_state="pending",_promise={state:function state(){return _state;},always:function always(){deferred.done(arguments).fail(arguments);return this;},then:function then() /* fnDone, fnFail, fnProgress */{var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var fn=jQuery.isFunction(fns[i])&&fns[i]; // deferred[ done | fail | progress ] for forwarding actions to newDefer
deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);}else {newDefer[tuple[0]+"With"](this===_promise?newDefer.promise():this,fn?[returned]:arguments);}});});fns=null;}).promise();}, // Get a promise for this deferred
// If obj is provided, the promise aspect is added to the object
promise:function promise(obj){return obj!=null?jQuery.extend(obj,_promise):_promise;}},deferred={}; // Keep pipe for back-compat
_promise.pipe=_promise.then; // Add list-specific methods
jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[3]; // promise[ done | fail | progress ] = list.add
_promise[tuple[1]]=list.add; // Handle state
if(stateString){list.add(function(){ // state = [ resolved | rejected ]
_state=stateString; // [ reject_list | resolve_list ].disable; progress_list.lock
},tuples[i^1][2].disable,tuples[2][2].lock);} // deferred[ resolve | reject | notify ]
deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?_promise:this,arguments);return this;};deferred[tuple[0]+"With"]=list.fireWith;}); // Make the deferred a promise
_promise.promise(deferred); // Call given func if any
if(func){func.call(deferred,deferred);} // All done!
return deferred;}, // Deferred helper
when:function when(subordinate /* , ..., subordinateN */){var i=0,resolveValues=_slice.call(arguments),length=resolveValues.length, // the count of uncompleted subordinates
remaining=length!==1||subordinate&&jQuery.isFunction(subordinate.promise)?length:0, // the master Deferred.
// If resolveValues consist of only a single Deferred, just use that.
deferred=remaining===1?subordinate:jQuery.Deferred(), // Update function for both resolve and progress values
updateFunc=function updateFunc(i,contexts,values){return function(value){contexts[i]=this;values[i]=arguments.length>1?_slice.call(arguments):value;if(values===progressValues){deferred.notifyWith(contexts,values);}else if(! --remaining){deferred.resolveWith(contexts,values);}};},progressValues,progressContexts,resolveContexts; // Add listeners to Deferred subordinates; treat others as resolved
if(length>1){progressValues=new Array(length);progressContexts=new Array(length);resolveContexts=new Array(length);for(;i<length;i++){if(resolveValues[i]&&jQuery.isFunction(resolveValues[i].promise)){resolveValues[i].promise().progress(updateFunc(i,progressContexts,progressValues)).done(updateFunc(i,resolveContexts,resolveValues)).fail(deferred.reject);}else {--remaining;}}} // If we're not waiting on anything, resolve the master
if(!remaining){deferred.resolveWith(resolveContexts,resolveValues);}return deferred.promise();}}); // The deferred used on DOM ready
var readyList;jQuery.fn.ready=function(fn){ // Add the callback
jQuery.ready.promise().done(fn);return this;};jQuery.extend({ // Is the DOM ready to be used? Set to true once it occurs.
isReady:false, // A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait:1, // Hold (or release) the ready event
holdReady:function holdReady(hold){if(hold){jQuery.readyWait++;}else {jQuery.ready(true);}}, // Handle when the DOM is ready
ready:function ready(wait){ // Abort if there are pending holds or we're already ready
if(wait===true?--jQuery.readyWait:jQuery.isReady){return;} // Remember that the DOM is ready
jQuery.isReady=true; // If a normal DOM Ready event fired, decrement, and wait if need be
if(wait!==true&&--jQuery.readyWait>0){return;} // If there are functions bound, to execute
readyList.resolveWith(document,[jQuery]); // Trigger any bound ready events
if(jQuery.fn.triggerHandler){jQuery(document).triggerHandler("ready");jQuery(document).off("ready");}}}); /**
 * The ready event handler and self cleanup method
 */function completed(){document.removeEventListener("DOMContentLoaded",completed);window.removeEventListener("load",completed);jQuery.ready();}jQuery.ready.promise=function(obj){if(!readyList){readyList=jQuery.Deferred(); // Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE9-10 only
// Older IE sometimes signals "interactive" too soon
if(document.readyState==="complete"||document.readyState!=="loading"&&!document.documentElement.doScroll){ // Handle it asynchronously to allow scripts the opportunity to delay ready
window.setTimeout(jQuery.ready);}else { // Use the handy event callback
document.addEventListener("DOMContentLoaded",completed); // A fallback to window.onload, that will always work
window.addEventListener("load",completed);}}return readyList.promise(obj);}; // Kick off the DOM ready check even if the user does not
jQuery.ready.promise(); // Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access=function access(elems,fn,key,value,chainable,emptyGet,raw){var i=0,len=elems.length,bulk=key==null; // Sets many values
if(jQuery.type(key)==="object"){chainable=true;for(i in key){access(elems,fn,i,key[i],true,emptyGet,raw);} // Sets one value
}else if(value!==undefined){chainable=true;if(!jQuery.isFunction(value)){raw=true;}if(bulk){ // Bulk operations run against the entire set
if(raw){fn.call(elems,value);fn=null; // ...except when executing function values
}else {bulk=fn;fn=function fn(elem,key,value){return bulk.call(jQuery(elem),value);};}}if(fn){for(;i<len;i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}return chainable?elems: // Gets
bulk?fn.call(elems):len?fn(elems[0],key):emptyGet;};var acceptData=function acceptData(owner){ // Accepts only:
//  - Node
//    - Node.ELEMENT_NODE
//    - Node.DOCUMENT_NODE
//  - Object
//    - Any
/* jshint -W018 */return owner.nodeType===1||owner.nodeType===9||! +owner.nodeType;};function Data(){this.expando=jQuery.expando+Data.uid++;}Data.uid=1;Data.prototype={register:function register(owner,initial){var value=initial||{}; // If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
if(owner.nodeType){owner[this.expando]=value; // Otherwise secure it in a non-enumerable, non-writable property
// configurability must be true to allow the property to be
// deleted with the delete operator
}else {Object.defineProperty(owner,this.expando,{value:value,writable:true,configurable:true});}return owner[this.expando];},cache:function cache(owner){ // We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
if(!acceptData(owner)){return {};} // Check if the owner object already has a cache
var value=owner[this.expando]; // If not, create one
if(!value){value={}; // We can accept data for non-element nodes in modern browsers,
// but we should not, see #8335.
// Always return an empty object.
if(acceptData(owner)){ // If it is a node unlikely to be stringify-ed or looped over
// use plain assignment
if(owner.nodeType){owner[this.expando]=value; // Otherwise secure it in a non-enumerable property
// configurable must be true to allow the property to be
// deleted when data is removed
}else {Object.defineProperty(owner,this.expando,{value:value,configurable:true});}}}return value;},set:function set(owner,data,value){var prop,cache=this.cache(owner); // Handle: [ owner, key, value ] args
if(typeof data==="string"){cache[data]=value; // Handle: [ owner, { properties } ] args
}else { // Copy the properties one-by-one to the cache object
for(prop in data){cache[prop]=data[prop];}}return cache;},get:function get(owner,key){return key===undefined?this.cache(owner):owner[this.expando]&&owner[this.expando][key];},access:function access(owner,key,value){var stored; // In cases where either:
//
//   1. No key was specified
//   2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
//   1. The entire cache object
//   2. The data stored at the key
//
if(key===undefined||key&&typeof key==="string"&&value===undefined){stored=this.get(owner,key);return stored!==undefined?stored:this.get(owner,jQuery.camelCase(key));} // When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
//   1. An object of properties
//   2. A key and value
//
this.set(owner,key,value); // Since the "set" path can have two possible entry points
// return the expected data based on which path was taken[*]
return value!==undefined?value:key;},remove:function remove(owner,key){var i,name,camel,cache=owner[this.expando];if(cache===undefined){return;}if(key===undefined){this.register(owner);}else { // Support array or space separated string of keys
if(jQuery.isArray(key)){ // If "name" is an array of keys...
// When data is initially created, via ("key", "val") signature,
// keys will be converted to camelCase.
// Since there is no way to tell _how_ a key was added, remove
// both plain key and camelCase key. #12786
// This will only penalize the array argument path.
name=key.concat(key.map(jQuery.camelCase));}else {camel=jQuery.camelCase(key); // Try the string as a key before any manipulation
if(key in cache){name=[key,camel];}else { // If a key with the spaces exists, use it.
// Otherwise, create an array by matching non-whitespace
name=camel;name=name in cache?[name]:name.match(rnotwhite)||[];}}i=name.length;while(i--){delete cache[name[i]];}} // Remove the expando if there's no more data
if(key===undefined||jQuery.isEmptyObject(cache)){ // Support: Chrome <= 35-45+
// Webkit & Blink performance suffers when deleting properties
// from DOM nodes, so set to undefined instead
// https://code.google.com/p/chromium/issues/detail?id=378607
if(owner.nodeType){owner[this.expando]=undefined;}else {delete owner[this.expando];}}},hasData:function hasData(owner){var cache=owner[this.expando];return cache!==undefined&&!jQuery.isEmptyObject(cache);}};var dataPriv=new Data();var dataUser=new Data(); //	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,rmultiDash=/[A-Z]/g;function dataAttr(elem,key,data){var name; // If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if(data===undefined&&elem.nodeType===1){name="data-"+key.replace(rmultiDash,"-$&").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null: // Only convert to a number if it doesn't change the string
+data+""===data?+data:rbrace.test(data)?jQuery.parseJSON(data):data;}catch(e){} // Make sure we set the data so it isn't changed later
dataUser.set(elem,key,data);}else {data=undefined;}}return data;}jQuery.extend({hasData:function hasData(elem){return dataUser.hasData(elem)||dataPriv.hasData(elem);},data:function data(elem,name,_data){return dataUser.access(elem,name,_data);},removeData:function removeData(elem,name){dataUser.remove(elem,name);}, // TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data:function _data(elem,name,data){return dataPriv.access(elem,name,data);},_removeData:function _removeData(elem,name){dataPriv.remove(elem,name);}});jQuery.fn.extend({data:function data(key,value){var i,name,data,elem=this[0],attrs=elem&&elem.attributes; // Gets all values
if(key===undefined){if(this.length){data=dataUser.get(elem);if(elem.nodeType===1&&!dataPriv.get(elem,"hasDataAttrs")){i=attrs.length;while(i--){ // Support: IE11+
// The attrs elements can be null (#14894)
if(attrs[i]){name=attrs[i].name;if(name.indexOf("data-")===0){name=jQuery.camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}}dataPriv.set(elem,"hasDataAttrs",true);}}return data;} // Sets multiple values
if((typeof key==="undefined"?"undefined":_typeof(key))==="object"){return this.each(function(){dataUser.set(this,key);});}return access(this,function(value){var data,camelKey; // The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and the
// `value` parameter was not undefined. An empty jQuery object
// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is made.
if(elem&&value===undefined){ // Attempt to get data from the cache
// with the key as-is
data=dataUser.get(elem,key)|| // Try to find dashed key if it exists (gh-2779)
// This is for 2.2.x only
dataUser.get(elem,key.replace(rmultiDash,"-$&").toLowerCase());if(data!==undefined){return data;}camelKey=jQuery.camelCase(key); // Attempt to get data from the cache
// with the key camelized
data=dataUser.get(elem,camelKey);if(data!==undefined){return data;} // Attempt to "discover" the data in
// HTML5 custom data-* attrs
data=dataAttr(elem,camelKey,undefined);if(data!==undefined){return data;} // We tried really hard, but the data doesn't exist.
return;} // Set the data...
camelKey=jQuery.camelCase(key);this.each(function(){ // First, attempt to store a copy or reference of any
// data that might've been store with a camelCased key.
var data=dataUser.get(this,camelKey); // For HTML5 data-* attribute interop, we have to
// store property names with dashes in a camelCase form.
// This might not apply to all properties...*
dataUser.set(this,camelKey,value); // *... In the case of properties that might _actually_
// have dashes, we need to also store a copy of that
// unchanged property.
if(key.indexOf("-")>-1&&data!==undefined){dataUser.set(this,key,value);}});},null,value,arguments.length>1,null,true);},removeData:function removeData(key){return this.each(function(){dataUser.remove(this,key);});}});jQuery.extend({queue:function queue(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=dataPriv.get(elem,type); // Speed up dequeue by getting out quickly if this is just a lookup
if(data){if(!queue||jQuery.isArray(data)){queue=dataPriv.access(elem,type,jQuery.makeArray(data));}else {queue.push(data);}}return queue||[];}},dequeue:function dequeue(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function next(){jQuery.dequeue(elem,type);}; // If the fx queue is dequeued, always remove the progress sentinel
if(fn==="inprogress"){fn=queue.shift();startLength--;}if(fn){ // Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if(type==="fx"){queue.unshift("inprogress");} // Clear up the last queue stop function
delete hooks.stop;fn.call(elem,next,hooks);}if(!startLength&&hooks){hooks.empty.fire();}}, // Not public - generate a queueHooks object, or return the current one
_queueHooks:function _queueHooks(elem,type){var key=type+"queueHooks";return dataPriv.get(elem,key)||dataPriv.access(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){dataPriv.remove(elem,[type+"queue",key]);})});}});jQuery.fn.extend({queue:function queue(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}if(arguments.length<setter){return jQuery.queue(this[0],type);}return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data); // Ensure a hooks for this queue
jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function dequeue(type){return this.each(function(){jQuery.dequeue(this,type);});},clearQueue:function clearQueue(type){return this.queue(type||"fx",[]);}, // Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise:function promise(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function resolve(){if(! --count){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}type=type||"fx";while(i--){tmp=dataPriv.get(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}resolve();return defer.promise(obj);}});var pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;var rcssNum=new RegExp("^(?:([+-])=|)("+pnum+")([a-z%]*)$","i");var cssExpand=["Top","Right","Bottom","Left"];var isHidden=function isHidden(elem,el){ // isHidden might be called from jQuery#filter function;
// in that case, element will be second argument
elem=el||elem;return jQuery.css(elem,"display")==="none"||!jQuery.contains(elem.ownerDocument,elem);};function adjustCSS(elem,prop,valueParts,tween){var adjusted,scale=1,maxIterations=20,currentValue=tween?function(){return tween.cur();}:function(){return jQuery.css(elem,prop,"");},initial=currentValue(),unit=valueParts&&valueParts[3]||(jQuery.cssNumber[prop]?"":"px"), // Starting value computation is required for potential unit mismatches
initialInUnit=(jQuery.cssNumber[prop]||unit!=="px"&&+initial)&&rcssNum.exec(jQuery.css(elem,prop));if(initialInUnit&&initialInUnit[3]!==unit){ // Trust units reported by jQuery.css
unit=unit||initialInUnit[3]; // Make sure we update the tween properties later on
valueParts=valueParts||[]; // Iteratively approximate from a nonzero starting point
initialInUnit=+initial||1;do { // If previous iteration zeroed out, double until we get *something*.
// Use string for doubling so we don't accidentally see scale as unchanged below
scale=scale||".5"; // Adjust and apply
initialInUnit=initialInUnit/scale;jQuery.style(elem,prop,initialInUnit+unit); // Update scale, tolerating zero or NaN from tween.cur()
// Break the loop if scale is unchanged or perfect, or if we've just had enough.
}while(scale!==(scale=currentValue()/initial)&&scale!==1&&--maxIterations);}if(valueParts){initialInUnit=+initialInUnit||+initial||0; // Apply relative offset (+=/-=) if specified
adjusted=valueParts[1]?initialInUnit+(valueParts[1]+1)*valueParts[2]:+valueParts[2];if(tween){tween.unit=unit;tween.start=initialInUnit;tween.end=adjusted;}}return adjusted;}var rcheckableType=/^(?:checkbox|radio)$/i;var rtagName=/<([\w:-]+)/;var rscriptType=/^$|\/(?:java|ecma)script/i; // We have to close these tags to support XHTML (#13200)
var wrapMap={ // Support: IE9
option:[1,"<select multiple='multiple'>","</select>"], // XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]}; // Support: IE9
wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;function getAll(context,tag){ // Support: IE9-11+
// Use typeof to avoid zero-argument method invocation on host objects (#15151)
var ret=typeof context.getElementsByTagName!=="undefined"?context.getElementsByTagName(tag||"*"):typeof context.querySelectorAll!=="undefined"?context.querySelectorAll(tag||"*"):[];return tag===undefined||tag&&jQuery.nodeName(context,tag)?jQuery.merge([context],ret):ret;} // Mark scripts as having already been evaluated
function setGlobalEval(elems,refElements){var i=0,l=elems.length;for(;i<l;i++){dataPriv.set(elems[i],"globalEval",!refElements||dataPriv.get(refElements[i],"globalEval"));}}var rhtml=/<|&#?\w+;/;function buildFragment(elems,context,scripts,selection,ignored){var elem,tmp,tag,wrap,contains,j,fragment=context.createDocumentFragment(),nodes=[],i=0,l=elems.length;for(;i<l;i++){elem=elems[i];if(elem||elem===0){ // Add nodes directly
if(jQuery.type(elem)==="object"){ // Support: Android<4.1, PhantomJS<2
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,elem.nodeType?[elem]:elem); // Convert non-html into a text node
}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem)); // Convert html into DOM nodes
}else {tmp=tmp||fragment.appendChild(context.createElement("div")); // Deserialize a standard representation
tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;tmp.innerHTML=wrap[1]+jQuery.htmlPrefilter(elem)+wrap[2]; // Descend through wrappers to the right content
j=wrap[0];while(j--){tmp=tmp.lastChild;} // Support: Android<4.1, PhantomJS<2
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(nodes,tmp.childNodes); // Remember the top-level container
tmp=fragment.firstChild; // Ensure the created nodes are orphaned (#12392)
tmp.textContent="";}}} // Remove wrapper from fragment
fragment.textContent="";i=0;while(elem=nodes[i++]){ // Skip elements already in the context collection (trac-4087)
if(selection&&jQuery.inArray(elem,selection)>-1){if(ignored){ignored.push(elem);}continue;}contains=jQuery.contains(elem.ownerDocument,elem); // Append to fragment
tmp=getAll(fragment.appendChild(elem),"script"); // Preserve script evaluation history
if(contains){setGlobalEval(tmp);} // Capture executables
if(scripts){j=0;while(elem=tmp[j++]){if(rscriptType.test(elem.type||"")){scripts.push(elem);}}}}return fragment;}(function(){var fragment=document.createDocumentFragment(),div=fragment.appendChild(document.createElement("div")),input=document.createElement("input"); // Support: Android 4.0-4.3, Safari<=5.1
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
input.setAttribute("type","radio");input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input); // Support: Safari<=5.1, Android<4.2
// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone=div.cloneNode(true).cloneNode(true).lastChild.checked; // Support: IE<=11+
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML="<textarea>x</textarea>";support.noCloneChecked=!!div.cloneNode(true).lastChild.defaultValue;})();var rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,rtypenamespace=/^([^.]*)(?:\.(.+)|)/;function returnTrue(){return true;}function returnFalse(){return false;} // Support: IE9
// See #13393 for more info
function safeActiveElement(){try{return document.activeElement;}catch(err){}}function _on(elem,types,selector,data,fn,one){var origFn,type; // Types can be a map of types/handlers
if((typeof types==="undefined"?"undefined":_typeof(types))==="object"){ // ( types-Object, selector, data )
if(typeof selector!=="string"){ // ( types-Object, data )
data=data||selector;selector=undefined;}for(type in types){_on(elem,type,selector,data,types[type],one);}return elem;}if(data==null&&fn==null){ // ( types, fn )
fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){ // ( types, selector, fn )
fn=data;data=undefined;}else { // ( types, data, fn )
fn=data;data=selector;selector=undefined;}}if(fn===false){fn=returnFalse;}else if(!fn){return elem;}if(one===1){origFn=fn;fn=function fn(event){ // Can use an empty set, since event contains the info
jQuery().off(event);return origFn.apply(this,arguments);}; // Use same guid so caller can remove using origFn
fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}return elem.each(function(){jQuery.event.add(this,types,fn,data,selector);});} /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */jQuery.event={global:{},add:function add(elem,types,handler,data,selector){var handleObjIn,eventHandle,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.get(elem); // Don't attach events to noData or text/comment nodes (but allow plain objects)
if(!elemData){return;} // Caller can pass in an object of custom data in lieu of the handler
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;selector=handleObjIn.selector;} // Make sure that the handler has a unique ID, used to find/remove it later
if(!handler.guid){handler.guid=jQuery.guid++;} // Init the element's event structure and main handler, if this is the first
if(!(events=elemData.events)){events=elemData.events={};}if(!(eventHandle=elemData.handle)){eventHandle=elemData.handle=function(e){ // Discard the second event of a jQuery.event.trigger() and
// when an event is called after a page has unloaded
return typeof jQuery!=="undefined"&&jQuery.event.triggered!==e.type?jQuery.event.dispatch.apply(elem,arguments):undefined;};} // Handle multiple events separated by a space
types=(types||"").match(rnotwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort(); // There *must* be a type, no attaching namespace-only handlers
if(!type){continue;} // If event changes its type, use the special event handlers for the changed type
special=jQuery.event.special[type]||{}; // If selector defined, determine special event api type, otherwise given type
type=(selector?special.delegateType:special.bindType)||type; // Update special based on newly reset type
special=jQuery.event.special[type]||{}; // handleObj is passed to all event handlers
handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn); // Init the event handler queue if we're the first
if(!(handlers=events[type])){handlers=events[type]=[];handlers.delegateCount=0; // Only use addEventListener if the special events handler returns false
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle);}}}if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}} // Add to the element's handler list, delegates in front
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else {handlers.push(handleObj);} // Keep track of which events have ever been used, for event optimization
jQuery.event.global[type]=true;}}, // Detach an event or set of events from an element
remove:function remove(elem,types,handler,selector,mappedTypes){var j,origCount,tmp,events,t,handleObj,special,handlers,type,namespaces,origType,elemData=dataPriv.hasData(elem)&&dataPriv.get(elem);if(!elemData||!(events=elemData.events)){return;} // Once for each type.namespace in types; type may be omitted
types=(types||"").match(rnotwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort(); // Unbind all events (on this namespace, if provided) for the element
if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}continue;}special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;handlers=events[type]||[];tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"); // Remove matching events
origCount=j=handlers.length;while(j--){handleObj=handlers[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}if(special.remove){special.remove.call(elem,handleObj);}}} // Remove generic event handler if we removed something and no more handlers exist
// (avoids potential for endless recursion during removal of special event handlers)
if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}delete events[type];}} // Remove data and the expando if it's no longer used
if(jQuery.isEmptyObject(events)){dataPriv.remove(elem,"handle events");}},dispatch:function dispatch(event){ // Make a writable jQuery.Event from the native event object
event=jQuery.event.fix(event);var i,j,ret,matched,handleObj,handlerQueue=[],args=_slice.call(arguments),handlers=(dataPriv.get(this,"events")||{})[event.type]||[],special=jQuery.event.special[event.type]||{}; // Use the fix-ed jQuery.Event rather than the (read-only) native event
args[0]=event;event.delegateTarget=this; // Call the preDispatch hook for the mapped type, and let it bail if desired
if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;} // Determine handlers
handlerQueue=jQuery.event.handlers.call(this,event,handlers); // Run delegates first; they may want to stop propagation beneath us
i=0;while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;j=0;while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){ // Triggered event must either 1) have no namespace, or 2) have namespace(s)
// a subset or equal to those in the bound event (both can have no namespace).
if(!event.rnamespace||event.rnamespace.test(handleObj.namespace)){event.handleObj=handleObj;event.data=handleObj.data;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();event.stopPropagation();}}}}} // Call the postDispatch hook for the mapped type
if(special.postDispatch){special.postDispatch.call(this,event);}return event.result;},handlers:function handlers(event,_handlers){var i,matches,sel,handleObj,handlerQueue=[],delegateCount=_handlers.delegateCount,cur=event.target; // Support (at least): Chrome, IE9
// Find delegate handlers
// Black-hole SVG <use> instance trees (#13180)
//
// Support: Firefox<=42+
// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
if(delegateCount&&cur.nodeType&&(event.type!=="click"||isNaN(event.button)||event.button<1)){for(;cur!==this;cur=cur.parentNode||this){ // Don't check non-elements (#13208)
// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
if(cur.nodeType===1&&(cur.disabled!==true||event.type!=="click")){matches=[];for(i=0;i<delegateCount;i++){handleObj=_handlers[i]; // Don't conflict with Object.prototype properties (#13203)
sel=handleObj.selector+" ";if(matches[sel]===undefined){matches[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>-1:jQuery.find(sel,this,null,[cur]).length;}if(matches[sel]){matches.push(handleObj);}}if(matches.length){handlerQueue.push({elem:cur,handlers:matches});}}}} // Add the remaining (directly-bound) handlers
if(delegateCount<_handlers.length){handlerQueue.push({elem:this,handlers:_handlers.slice(delegateCount)});}return handlerQueue;}, // Includes some event props shared by KeyEvent and MouseEvent
props:("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase "+"metaKey relatedTarget shiftKey target timeStamp view which").split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function filter(event,original){ // Add which for key events
if(event.which==null){event.which=original.charCode!=null?original.charCode:original.keyCode;}return event;}},mouseHooks:{props:("button buttons clientX clientY offsetX offsetY pageX pageY "+"screenX screenY toElement").split(" "),filter:function filter(event,original){var eventDoc,doc,body,button=original.button; // Calculate pageX/Y if missing and clientX/Y available
if(event.pageX==null&&original.clientX!=null){eventDoc=event.target.ownerDocument||document;doc=eventDoc.documentElement;body=eventDoc.body;event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);} // Add which for click: 1 === left; 2 === middle; 3 === right
// Note: button is not normalized, so don't use it
if(!event.which&&button!==undefined){event.which=button&1?1:button&2?3:button&4?2:0;}return event;}},fix:function fix(event){if(event[jQuery.expando]){return event;} // Create a writable copy of the event object and normalize some properties
var i,prop,copy,type=event.type,originalEvent=event,fixHook=this.fixHooks[type];if(!fixHook){this.fixHooks[type]=fixHook=rmouseEvent.test(type)?this.mouseHooks:rkeyEvent.test(type)?this.keyHooks:{};}copy=fixHook.props?this.props.concat(fixHook.props):this.props;event=new jQuery.Event(originalEvent);i=copy.length;while(i--){prop=copy[i];event[prop]=originalEvent[prop];} // Support: Cordova 2.5 (WebKit) (#13255)
// All events should have a target; Cordova deviceready doesn't
if(!event.target){event.target=document;} // Support: Safari 6.0+, Chrome<28
// Target should not be a text node (#504, #13143)
if(event.target.nodeType===3){event.target=event.target.parentNode;}return fixHook.filter?fixHook.filter(event,originalEvent):event;},special:{load:{ // Prevent triggered image.load events from bubbling to window.load
noBubble:true},focus:{ // Fire native event if possible so blur/focus sequence is correct
trigger:function trigger(){if(this!==safeActiveElement()&&this.focus){this.focus();return false;}},delegateType:"focusin"},blur:{trigger:function trigger(){if(this===safeActiveElement()&&this.blur){this.blur();return false;}},delegateType:"focusout"},click:{ // For checkbox, fire native event so checked state will be right
trigger:function trigger(){if(this.type==="checkbox"&&this.click&&jQuery.nodeName(this,"input")){this.click();return false;}}, // For cross-browser consistency, don't fire native .click() on links
_default:function _default(event){return jQuery.nodeName(event.target,"a");}},beforeunload:{postDispatch:function postDispatch(event){ // Support: Firefox 20+
// Firefox doesn't alert if the returnValue field is not set.
if(event.result!==undefined&&event.originalEvent){event.originalEvent.returnValue=event.result;}}}}};jQuery.removeEvent=function(elem,type,handle){ // This "if" is needed for plain objects
if(elem.removeEventListener){elem.removeEventListener(type,handle);}};jQuery.Event=function(src,props){ // Allow instantiation without the 'new' keyword
if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);} // Event object
if(src&&src.type){this.originalEvent=src;this.type=src.type; // Events bubbling up the document may have been marked as prevented
// by a handler lower down the tree; reflect the correct value.
this.isDefaultPrevented=src.defaultPrevented||src.defaultPrevented===undefined&& // Support: Android<4.0
src.returnValue===false?returnTrue:returnFalse; // Event type
}else {this.type=src;} // Put explicitly provided properties onto the event object
if(props){jQuery.extend(this,props);} // Create a timestamp if incoming event doesn't have one
this.timeStamp=src&&src.timeStamp||jQuery.now(); // Mark it as fixed
this[jQuery.expando]=true;}; // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype={constructor:jQuery.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,preventDefault:function preventDefault(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue;if(e){e.preventDefault();}},stopPropagation:function stopPropagation(){var e=this.originalEvent;this.isPropagationStopped=returnTrue;if(e){e.stopPropagation();}},stopImmediatePropagation:function stopImmediatePropagation(){var e=this.originalEvent;this.isImmediatePropagationStopped=returnTrue;if(e){e.stopImmediatePropagation();}this.stopPropagation();}}; // Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function handle(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj; // For mouseenter/leave call the handler if related is outside the target.
// NB: No relatedTarget if the mouse left/entered the browser window
if(!related||related!==target&&!jQuery.contains(target,related)){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}return ret;}};});jQuery.fn.extend({on:function on(types,selector,data,fn){return _on(this,types,selector,data,fn);},one:function one(types,selector,data,fn){return _on(this,types,selector,data,fn,1);},off:function off(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){ // ( event )  dispatched jQuery.Event
handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}if((typeof types==="undefined"?"undefined":_typeof(types))==="object"){ // ( types-object [, selector] )
for(type in types){this.off(type,selector,types[type]);}return this;}if(selector===false||typeof selector==="function"){ // ( types [, fn] )
fn=selector;selector=undefined;}if(fn===false){fn=returnFalse;}return this.each(function(){jQuery.event.remove(this,types,fn,selector);});}});var rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, // Support: IE 10-11, Edge 10240+
// In IE/Edge using regex groups here causes severe slowdowns.
// See https://connect.microsoft.com/IE/feedback/details/1736512/
rnoInnerhtml=/<script|<style|<link/i, // checked="checked" or checked
rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptTypeMasked=/^true\/(.*)/,rcleanScript=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g; // Manipulating tables requires a tbody
function manipulationTarget(elem,content){return jQuery.nodeName(elem,"table")&&jQuery.nodeName(content.nodeType!==11?content:content.firstChild,"tr")?elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody")):elem;} // Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(elem){elem.type=(elem.getAttribute("type")!==null)+"/"+elem.type;return elem;}function restoreScript(elem){var match=rscriptTypeMasked.exec(elem.type);if(match){elem.type=match[1];}else {elem.removeAttribute("type");}return elem;}function cloneCopyEvent(src,dest){var i,l,type,pdataOld,pdataCur,udataOld,udataCur,events;if(dest.nodeType!==1){return;} // 1. Copy private data: events, handlers, etc.
if(dataPriv.hasData(src)){pdataOld=dataPriv.access(src);pdataCur=dataPriv.set(dest,pdataOld);events=pdataOld.events;if(events){delete pdataCur.handle;pdataCur.events={};for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}} // 2. Copy user data
if(dataUser.hasData(src)){udataOld=dataUser.access(src);udataCur=jQuery.extend({},udataOld);dataUser.set(dest,udataCur);}} // Fix IE bugs, see support tests
function fixInput(src,dest){var nodeName=dest.nodeName.toLowerCase(); // Fails to persist the checked state of a cloned checkbox or radio button.
if(nodeName==="input"&&rcheckableType.test(src.type)){dest.checked=src.checked; // Fails to return the selected option to the default selected state when cloning options
}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}}function domManip(collection,args,callback,ignored){ // Flatten any nested arrays
args=concat.apply([],args);var fragment,first,scripts,hasScripts,node,doc,i=0,l=collection.length,iNoClone=l-1,value=args[0],isFunction=jQuery.isFunction(value); // We can't cloneNode fragments that contain checked, in WebKit
if(isFunction||l>1&&typeof value==="string"&&!support.checkClone&&rchecked.test(value)){return collection.each(function(index){var self=collection.eq(index);if(isFunction){args[0]=value.call(this,index,self.html());}domManip(self,args,callback,ignored);});}if(l){fragment=buildFragment(args,collection[0].ownerDocument,false,collection,ignored);first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;} // Require either new content or an interest in ignored elements to invoke the callback
if(first||ignored){scripts=jQuery.map(getAll(fragment,"script"),disableScript);hasScripts=scripts.length; // Use the original fragment for the last item
// instead of the first because it can end up
// being emptied incorrectly in certain situations (#8070).
for(;i<l;i++){node=fragment;if(i!==iNoClone){node=jQuery.clone(node,true,true); // Keep references to cloned scripts for later restoration
if(hasScripts){ // Support: Android<4.1, PhantomJS<2
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge(scripts,getAll(node,"script"));}}callback.call(collection[i],node,i);}if(hasScripts){doc=scripts[scripts.length-1].ownerDocument; // Reenable scripts
jQuery.map(scripts,restoreScript); // Evaluate executable scripts on first document insertion
for(i=0;i<hasScripts;i++){node=scripts[i];if(rscriptType.test(node.type||"")&&!dataPriv.access(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src){ // Optional AJAX dependency, but won't run scripts if not present
if(jQuery._evalUrl){jQuery._evalUrl(node.src);}}else {jQuery.globalEval(node.textContent.replace(rcleanScript,""));}}}}}}return collection;}function _remove(elem,selector,keepData){var node,nodes=selector?jQuery.filter(selector,elem):elem,i=0;for(;(node=nodes[i])!=null;i++){if(!keepData&&node.nodeType===1){jQuery.cleanData(getAll(node));}if(node.parentNode){if(keepData&&jQuery.contains(node.ownerDocument,node)){setGlobalEval(getAll(node,"script"));}node.parentNode.removeChild(node);}}return elem;}jQuery.extend({htmlPrefilter:function htmlPrefilter(html){return html.replace(rxhtmlTag,"<$1></$2>");},clone:function clone(elem,dataAndEvents,deepDataAndEvents){var i,l,srcElements,destElements,clone=elem.cloneNode(true),inPage=jQuery.contains(elem.ownerDocument,elem); // Fix IE cloning issues
if(!support.noCloneChecked&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){ // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
destElements=getAll(clone);srcElements=getAll(elem);for(i=0,l=srcElements.length;i<l;i++){fixInput(srcElements[i],destElements[i]);}} // Copy the events from the original to the clone
if(dataAndEvents){if(deepDataAndEvents){srcElements=srcElements||getAll(elem);destElements=destElements||getAll(clone);for(i=0,l=srcElements.length;i<l;i++){cloneCopyEvent(srcElements[i],destElements[i]);}}else {cloneCopyEvent(elem,clone);}} // Preserve script evaluation history
destElements=getAll(clone,"script");if(destElements.length>0){setGlobalEval(destElements,!inPage&&getAll(elem,"script"));} // Return the cloned set
return clone;},cleanData:function cleanData(elems){var data,elem,type,special=jQuery.event.special,i=0;for(;(elem=elems[i])!==undefined;i++){if(acceptData(elem)){if(data=elem[dataPriv.expando]){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type); // This is a shortcut to avoid jQuery.event.remove's overhead
}else {jQuery.removeEvent(elem,type,data.handle);}}} // Support: Chrome <= 35-45+
// Assign undefined instead of using delete, see Data#remove
elem[dataPriv.expando]=undefined;}if(elem[dataUser.expando]){ // Support: Chrome <= 35-45+
// Assign undefined instead of using delete, see Data#remove
elem[dataUser.expando]=undefined;}}}}});jQuery.fn.extend({ // Keep domManip exposed until 3.0 (gh-2225)
domManip:domManip,detach:function detach(selector){return _remove(this,selector,true);},remove:function remove(selector){return _remove(this,selector);},text:function text(value){return access(this,function(value){return value===undefined?jQuery.text(this):this.empty().each(function(){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){this.textContent=value;}});},null,value,arguments.length);},append:function append(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.appendChild(elem);}});},prepend:function prepend(){return domManip(this,arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild);}});},before:function before(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this);}});},after:function after(){return domManip(this,arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling);}});},empty:function empty(){var elem,i=0;for(;(elem=this[i])!=null;i++){if(elem.nodeType===1){ // Prevent memory leaks
jQuery.cleanData(getAll(elem,false)); // Remove any remaining nodes
elem.textContent="";}}return this;},clone:function clone(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function html(value){return access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined&&elem.nodeType===1){return elem.innerHTML;} // See if we can take a shortcut and just use innerHTML
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=jQuery.htmlPrefilter(value);try{for(;i<l;i++){elem=this[i]||{}; // Remove element nodes and prevent memory leaks
if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));elem.innerHTML=value;}}elem=0; // If using innerHTML throws an exception, use the fallback method
}catch(e){}}if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function replaceWith(){var ignored=[]; // Make the changes, replacing each non-ignored context element with the new content
return domManip(this,arguments,function(elem){var parent=this.parentNode;if(jQuery.inArray(this,ignored)<0){jQuery.cleanData(getAll(this));if(parent){parent.replaceChild(elem,this);}} // Force callback invocation
},ignored);}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,ret=[],insert=jQuery(selector),last=insert.length-1,i=0;for(;i<=last;i++){elems=i===last?this:this.clone(true);jQuery(insert[i])[original](elems); // Support: QtWebKit
// .get() because push.apply(_, arraylike) throws
push.apply(ret,elems.get());}return this.pushStack(ret);};});var iframe,elemdisplay={ // Support: Firefox
// We have to pre-define these values for FF (#10227)
HTML:"block",BODY:"block"}; /**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */ // Called only from within defaultDisplay
function actualDisplay(name,doc){var elem=jQuery(doc.createElement(name)).appendTo(doc.body),display=jQuery.css(elem[0],"display"); // We don't have any data stored on the element,
// so use "detach" method as fast way to get rid of the element
elem.detach();return display;} /**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */function defaultDisplay(nodeName){var doc=document,display=elemdisplay[nodeName];if(!display){display=actualDisplay(nodeName,doc); // If the simple way fails, read from inside an iframe
if(display==="none"||!display){ // Use the already-created iframe if possible
iframe=(iframe||jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement); // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
doc=iframe[0].contentDocument; // Support: IE
doc.write();doc.close();display=actualDisplay(nodeName,doc);iframe.detach();} // Store the correct default display
elemdisplay[nodeName]=display;}return display;}var rmargin=/^margin/;var rnumnonpx=new RegExp("^("+pnum+")(?!px)[a-z%]+$","i");var getStyles=function getStyles(elem){ // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
// IE throws on elements created in popups
// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
var view=elem.ownerDocument.defaultView;if(!view||!view.opener){view=window;}return view.getComputedStyle(elem);};var swap=function swap(elem,options,callback,args){var ret,name,old={}; // Remember the old values, and insert the new ones
for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}ret=callback.apply(elem,args||[]); // Revert the old values
for(name in options){elem.style[name]=old[name];}return ret;};var documentElement=document.documentElement;(function(){var pixelPositionVal,boxSizingReliableVal,pixelMarginRightVal,reliableMarginLeftVal,container=document.createElement("div"),div=document.createElement("div"); // Finish early in limited (non-browser) environments
if(!div.style){return;} // Support: IE9-11+
// Style of cloned element affects source element cloned (#8908)
div.style.backgroundClip="content-box";div.cloneNode(true).style.backgroundClip="";support.clearCloneStyle=div.style.backgroundClip==="content-box";container.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;"+"padding:0;margin-top:1px;position:absolute";container.appendChild(div); // Executing both pixelPosition & boxSizingReliable tests require only one layout
// so they're executed at the same time to save the second computation.
function computeStyleTests(){div.style.cssText= // Support: Firefox<29, Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;"+"position:relative;display:block;"+"margin:auto;border:1px;padding:1px;"+"top:1%;width:50%";div.innerHTML="";documentElement.appendChild(container);var divStyle=window.getComputedStyle(div);pixelPositionVal=divStyle.top!=="1%";reliableMarginLeftVal=divStyle.marginLeft==="2px";boxSizingReliableVal=divStyle.width==="4px"; // Support: Android 4.0 - 4.3 only
// Some styles come back with percentage values, even though they shouldn't
div.style.marginRight="50%";pixelMarginRightVal=divStyle.marginRight==="4px";documentElement.removeChild(container);}jQuery.extend(support,{pixelPosition:function pixelPosition(){ // This test is executed only once but we still do memoizing
// since we can use the boxSizingReliable pre-computing.
// No need to check if the test was already performed, though.
computeStyleTests();return pixelPositionVal;},boxSizingReliable:function boxSizingReliable(){if(boxSizingReliableVal==null){computeStyleTests();}return boxSizingReliableVal;},pixelMarginRight:function pixelMarginRight(){ // Support: Android 4.0-4.3
// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
// since that compresses better and they're computed together anyway.
if(boxSizingReliableVal==null){computeStyleTests();}return pixelMarginRightVal;},reliableMarginLeft:function reliableMarginLeft(){ // Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
if(boxSizingReliableVal==null){computeStyleTests();}return reliableMarginLeftVal;},reliableMarginRight:function reliableMarginRight(){ // Support: Android 2.3
// Check if div with explicit width and no margin-right incorrectly
// gets computed margin-right based on width of container. (#3333)
// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
// This support function is only executed once so no memoizing is needed.
var ret,marginDiv=div.appendChild(document.createElement("div")); // Reset CSS: box-sizing; display; margin; border; padding
marginDiv.style.cssText=div.style.cssText= // Support: Android 2.3
// Vendor-prefix box-sizing
"-webkit-box-sizing:content-box;box-sizing:content-box;"+"display:block;margin:0;border:0;padding:0";marginDiv.style.marginRight=marginDiv.style.width="0";div.style.width="1px";documentElement.appendChild(container);ret=!parseFloat(window.getComputedStyle(marginDiv).marginRight);documentElement.removeChild(container);div.removeChild(marginDiv);return ret;}});})();function curCSS(elem,name,computed){var width,minWidth,maxWidth,ret,style=elem.style;computed=computed||getStyles(elem);ret=computed?computed.getPropertyValue(name)||computed[name]:undefined; // Support: Opera 12.1x only
// Fall back to style even without computed
// computed is undefined for elems on document fragments
if((ret===""||ret===undefined)&&!jQuery.contains(elem.ownerDocument,elem)){ret=jQuery.style(elem,name);} // Support: IE9
// getPropertyValue is only needed for .css('filter') (#12537)
if(computed){ // A tribute to the "awesome hack by Dean Edwards"
// Android Browser returns percentage for some values,
// but width seems to be reliably pixels.
// This is against the CSSOM draft spec:
// http://dev.w3.org/csswg/cssom/#resolved-values
if(!support.pixelMarginRight()&&rnumnonpx.test(ret)&&rmargin.test(name)){ // Remember the original values
width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth; // Put in the new values to get a computed value out
style.minWidth=style.maxWidth=style.width=ret;ret=computed.width; // Revert the changed values
style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}return ret!==undefined? // Support: IE9-11+
// IE returns zIndex value as an integer.
ret+"":ret;}function addGetHookIf(conditionFn,hookFn){ // Define the hook, we'll check on the first run if it's really needed.
return {get:function get(){if(conditionFn()){ // Hook not needed (or it's not possible to use it due
// to missing dependency), remove it.
delete this.get;return;} // Hook needed; redefine it so that the support test is not executed again.
return (this.get=hookFn).apply(this,arguments);}};}var  // Swappable if display is none or starts with table
// except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
rdisplayswap=/^(none|table(?!-c[ea]).+)/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:"0",fontWeight:"400"},cssPrefixes=["Webkit","O","Moz","ms"],emptyStyle=document.createElement("div").style; // Return a css property mapped to a potentially vendor prefixed property
function vendorPropName(name){ // Shortcut for names that are not vendor prefixed
if(name in emptyStyle){return name;} // Check for vendor prefixed names
var capName=name[0].toUpperCase()+name.slice(1),i=cssPrefixes.length;while(i--){name=cssPrefixes[i]+capName;if(name in emptyStyle){return name;}}}function setPositiveNumber(elem,value,subtract){ // Any relative (+/-) values have already been
// normalized at this point
var matches=rcssNum.exec(value);return matches? // Guard against undefined "subtract", e.g., when used as in cssHooks
Math.max(0,matches[2]-(subtract||0))+(matches[3]||"px"):value;}function augmentWidthOrHeight(elem,name,extra,isBorderBox,styles){var i=extra===(isBorderBox?"border":"content")? // If we already have the right measurement, avoid augmentation
4: // Otherwise initialize for horizontal or vertical properties
name==="width"?1:0,val=0;for(;i<4;i+=2){ // Both box models exclude margin, so add it if we want it
if(extra==="margin"){val+=jQuery.css(elem,extra+cssExpand[i],true,styles);}if(isBorderBox){ // border-box includes padding, so remove it if we want content
if(extra==="content"){val-=jQuery.css(elem,"padding"+cssExpand[i],true,styles);} // At this point, extra isn't border nor margin, so remove border
if(extra!=="margin"){val-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}else { // At this point, extra isn't content, so add padding
val+=jQuery.css(elem,"padding"+cssExpand[i],true,styles); // At this point, extra isn't content nor padding, so add border
if(extra!=="padding"){val+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}}return val;}function getWidthOrHeight(elem,name,extra){ // Start with offset property, which is equivalent to the border-box value
var valueIsBorderBox=true,val=name==="width"?elem.offsetWidth:elem.offsetHeight,styles=getStyles(elem),isBorderBox=jQuery.css(elem,"boxSizing",false,styles)==="border-box"; // Support: IE11 only
// In IE 11 fullscreen elements inside of an iframe have
// 100x too small dimensions (gh-1764).
if(document.msFullscreenElement&&window.top!==window){ // Support: IE11 only
// Running getBoundingClientRect on a disconnected node
// in IE throws an error.
if(elem.getClientRects().length){val=Math.round(elem.getBoundingClientRect()[name]*100);}} // Some non-html elements return undefined for offsetWidth, so check for null/undefined
// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
if(val<=0||val==null){ // Fall back to computed then uncomputed css if necessary
val=curCSS(elem,name,styles);if(val<0||val==null){val=elem.style[name];} // Computed unit is not pixels. Stop here and return.
if(rnumnonpx.test(val)){return val;} // Check for style in case a browser which returns unreliable values
// for getComputedStyle silently falls back to the reliable elem.style
valueIsBorderBox=isBorderBox&&(support.boxSizingReliable()||val===elem.style[name]); // Normalize "", auto, and prepare for extra
val=parseFloat(val)||0;} // Use the active box-sizing model to add/subtract irrelevant styles
return val+augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles)+"px";}function showHide(elements,show){var display,elem,hidden,values=[],index=0,length=elements.length;for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}values[index]=dataPriv.get(elem,"olddisplay");display=elem.style.display;if(show){ // Reset the inline display of this element to learn if it is
// being hidden by cascaded rules or not
if(!values[index]&&display==="none"){elem.style.display="";} // Set elements which have been overridden with display: none
// in a stylesheet to whatever the default browser style is
// for such an element
if(elem.style.display===""&&isHidden(elem)){values[index]=dataPriv.access(elem,"olddisplay",defaultDisplay(elem.nodeName));}}else {hidden=isHidden(elem);if(display!=="none"||!hidden){dataPriv.set(elem,"olddisplay",hidden?display:jQuery.css(elem,"display"));}}} // Set the display of most of the elements in a second loop
// to avoid the constant reflow
for(index=0;index<length;index++){elem=elements[index];if(!elem.style){continue;}if(!show||elem.style.display==="none"||elem.style.display===""){elem.style.display=show?values[index]||"":"none";}}return elements;}jQuery.extend({ // Add in style property hooks for overriding the default
// behavior of getting and setting a style property
cssHooks:{opacity:{get:function get(elem,computed){if(computed){ // We should always get a number back from opacity
var ret=curCSS(elem,"opacity");return ret===""?"1":ret;}}}}, // Don't automatically add "px" to these possibly-unitless properties
cssNumber:{"animationIterationCount":true,"columnCount":true,"fillOpacity":true,"flexGrow":true,"flexShrink":true,"fontWeight":true,"lineHeight":true,"opacity":true,"order":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true}, // Add in properties whose names you wish to fix before
// setting or getting the value
cssProps:{"float":"cssFloat"}, // Get and set the style property on a DOM Node
style:function style(elem,name,value,extra){ // Don't set styles on text and comment nodes
if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;} // Make sure that we're working with the right name
var ret,type,hooks,origName=jQuery.camelCase(name),style=elem.style;name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(origName)||origName); // Gets hook for the prefixed version, then unprefixed version
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName]; // Check if we're setting a value
if(value!==undefined){type=typeof value==="undefined"?"undefined":_typeof(value); // Convert "+=" or "-=" to relative numbers (#7345)
if(type==="string"&&(ret=rcssNum.exec(value))&&ret[1]){value=adjustCSS(elem,name,ret); // Fixes bug #9237
type="number";} // Make sure that null and NaN values aren't set (#7116)
if(value==null||value!==value){return;} // If a number was passed in, add the unit (except for certain CSS properties)
if(type==="number"){value+=ret&&ret[3]||(jQuery.cssNumber[origName]?"":"px");} // Support: IE9-11+
// background-* props affect original clone's values
if(!support.clearCloneStyle&&value===""&&name.indexOf("background")===0){style[name]="inherit";} // If a hook was provided, use that value, otherwise just set the specified value
if(!hooks||!("set" in hooks)||(value=hooks.set(elem,value,extra))!==undefined){style[name]=value;}}else { // If a hook was provided get the non-computed value from there
if(hooks&&"get" in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;} // Otherwise just get the value from the style object
return style[name];}},css:function css(elem,name,extra,styles){var val,num,hooks,origName=jQuery.camelCase(name); // Make sure that we're working with the right name
name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(origName)||origName); // Try prefixed name followed by the unprefixed name
hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName]; // If a hook was provided get the computed value from there
if(hooks&&"get" in hooks){val=hooks.get(elem,true,extra);} // Otherwise, if a way to get the computed value exists, use that
if(val===undefined){val=curCSS(elem,name,styles);} // Convert "normal" to computed value
if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name];} // Make numeric if forced or a qualifier was provided and val looks numeric
if(extra===""||extra){num=parseFloat(val);return extra===true||isFinite(num)?num||0:val;}return val;}});jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function get(elem,computed,extra){if(computed){ // Certain elements can have dimension info if we invisibly show them
// but it must have a current display style that would benefit
return rdisplayswap.test(jQuery.css(elem,"display"))&&elem.offsetWidth===0?swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra);}):getWidthOrHeight(elem,name,extra);}},set:function set(elem,value,extra){var matches,styles=extra&&getStyles(elem),subtract=extra&&augmentWidthOrHeight(elem,name,extra,jQuery.css(elem,"boxSizing",false,styles)==="border-box",styles); // Convert to pixels if value adjustment is needed
if(subtract&&(matches=rcssNum.exec(value))&&(matches[3]||"px")!=="px"){elem.style[name]=value;value=jQuery.css(elem,name);}return setPositiveNumber(elem,value,subtract);}};});jQuery.cssHooks.marginLeft=addGetHookIf(support.reliableMarginLeft,function(elem,computed){if(computed){return (parseFloat(curCSS(elem,"marginLeft"))||elem.getBoundingClientRect().left-swap(elem,{marginLeft:0},function(){return elem.getBoundingClientRect().left;}))+"px";}}); // Support: Android 2.3
jQuery.cssHooks.marginRight=addGetHookIf(support.reliableMarginRight,function(elem,computed){if(computed){return swap(elem,{"display":"inline-block"},curCSS,[elem,"marginRight"]);}}); // These hooks are used by animate to expand properties
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function expand(value){var i=0,expanded={}, // Assumes a single number if not a string
parts=typeof value==="string"?value.split(" "):[value];for(;i<4;i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];}return expanded;}};if(!rmargin.test(prefix)){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});jQuery.fn.extend({css:function css(name,value){return access(this,function(elem,name,value){var styles,len,map={},i=0;if(jQuery.isArray(name)){styles=getStyles(elem);len=name.length;for(;i<len;i++){map[name[i]]=jQuery.css(elem,name[i],false,styles);}return map;}return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length>1);},show:function show(){return showHide(this,true);},hide:function hide(){return showHide(this);},toggle:function toggle(state){if(typeof state==="boolean"){return state?this.show():this.hide();}return this.each(function(){if(isHidden(this)){jQuery(this).show();}else {jQuery(this).hide();}});}});function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}jQuery.Tween=Tween;Tween.prototype={constructor:Tween,init:function init(elem,options,prop,end,easing,unit){this.elem=elem;this.prop=prop;this.easing=easing||jQuery.easing._default;this.options=options;this.start=this.now=this.cur();this.end=end;this.unit=unit||(jQuery.cssNumber[prop]?"":"px");},cur:function cur(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function run(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else {this.pos=eased=percent;}this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}if(hooks&&hooks.set){hooks.set(this);}else {Tween.propHooks._default.set(this);}return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function get(tween){var result; // Use a property on the element directly when it is not a DOM element,
// or when there is no matching style property that exists.
if(tween.elem.nodeType!==1||tween.elem[tween.prop]!=null&&tween.elem.style[tween.prop]==null){return tween.elem[tween.prop];} // Passing an empty string as a 3rd parameter to .css will automatically
// attempt a parseFloat and fallback to a string if the parse fails.
// Simple values such as "10px" are parsed to Float;
// complex values such as "rotate(1rad)" are returned as-is.
result=jQuery.css(tween.elem,tween.prop,""); // Empty strings, null, undefined and "auto" are converted to 0.
return !result||result==="auto"?0:result;},set:function set(tween){ // Use step hook for back compat.
// Use cssHook if its there.
// Use .style if available and use plain properties where available.
if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.nodeType===1&&(tween.elem.style[jQuery.cssProps[tween.prop]]!=null||jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else {tween.elem[tween.prop]=tween.now;}}}}; // Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function set(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.easing={linear:function linear(p){return p;},swing:function swing(p){return 0.5-Math.cos(p*Math.PI)/2;},_default:"swing"};jQuery.fx=Tween.prototype.init; // Back Compat <1.8 extension point
jQuery.fx.step={};var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rrun=/queueHooks$/; // Animations created synchronously will run synchronously
function createFxNow(){window.setTimeout(function(){fxNow=undefined;});return fxNow=jQuery.now();} // Generate parameters to create a standard animation
function genFx(type,includeWidth){var which,i=0,attrs={height:type}; // If we include width, step value is 1 to do all cssExpand values,
// otherwise step value is 2 to skip over Left and Right
includeWidth=includeWidth?1:0;for(;i<4;i+=2-includeWidth){which=cssExpand[i];attrs["margin"+which]=attrs["padding"+which]=type;}if(includeWidth){attrs.opacity=attrs.width=type;}return attrs;}function createTween(value,prop,animation){var tween,collection=(Animation.tweeners[prop]||[]).concat(Animation.tweeners["*"]),index=0,length=collection.length;for(;index<length;index++){if(tween=collection[index].call(animation,prop,value)){ // We're done with this property
return tween;}}}function defaultPrefilter(elem,props,opts){ /* jshint validthis: true */var prop,value,toggle,tween,hooks,oldfire,display,checkDisplay,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHidden(elem),dataShow=dataPriv.get(elem,"fxshow"); // Handle queue: false promises
if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}hooks.unqueued++;anim.always(function(){ // Ensure the complete handler is called before this completes
anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});} // Height/width overflow pass
if(elem.nodeType===1&&("height" in props||"width" in props)){ // Make sure that nothing sneaks out
// Record all 3 overflow attributes because IE9-10 do not
// change the overflow attribute when overflowX and
// overflowY are set to the same value
opts.overflow=[style.overflow,style.overflowX,style.overflowY]; // Set display property to inline-block for height/width
// animations on inline elements that are having width/height animated
display=jQuery.css(elem,"display"); // Test default display if display is currently "none"
checkDisplay=display==="none"?dataPriv.get(elem,"olddisplay")||defaultDisplay(elem.nodeName):display;if(checkDisplay==="inline"&&jQuery.css(elem,"float")==="none"){style.display="inline-block";}}if(opts.overflow){style.overflow="hidden";anim.always(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});} // show/hide pass
for(prop in props){value=props[prop];if(rfxtypes.exec(value)){delete props[prop];toggle=toggle||value==="toggle";if(value===(hidden?"hide":"show")){ // If there is dataShow left over from a stopped hide or show
// and we are going to proceed with show, we should pretend to be hidden
if(value==="show"&&dataShow&&dataShow[prop]!==undefined){hidden=true;}else {continue;}}orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop); // Any non-fx value stops us from restoring the original display value
}else {display=undefined;}}if(!jQuery.isEmptyObject(orig)){if(dataShow){if("hidden" in dataShow){hidden=dataShow.hidden;}}else {dataShow=dataPriv.access(elem,"fxshow",{});} // Store state if its toggle - enables .stop().toggle() to "reverse"
if(toggle){dataShow.hidden=!hidden;}if(hidden){jQuery(elem).show();}else {anim.done(function(){jQuery(elem).hide();});}anim.done(function(){var prop;dataPriv.remove(elem,"fxshow");for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});for(prop in orig){tween=createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop]=tween.start;if(hidden){tween.end=tween.start;tween.start=prop==="width"||prop==="height"?1:0;}}} // If this is a noop like .hide().hide(), restore an overwritten display value
}else if((display==="none"?defaultDisplay(elem.nodeName):display)==="inline"){style.display=display;}}function propFilter(props,specialEasing){var index,name,easing,value,hooks; // camelCase, specialEasing and expand cssHook pass
for(index in props){name=jQuery.camelCase(index);easing=specialEasing[name];value=props[index];if(jQuery.isArray(value)){easing=value[1];value=props[index]=value[0];}if(index!==name){props[name]=value;delete props[index];}hooks=jQuery.cssHooks[name];if(hooks&&"expand" in hooks){value=hooks.expand(value);delete props[name]; // Not quite $.extend, this won't overwrite existing keys.
// Reusing 'index' because we have the correct "name"
for(index in value){if(!(index in props)){props[index]=value[index];specialEasing[index]=easing;}}}else {specialEasing[name]=easing;}}}function Animation(elem,properties,options){var result,stopped,index=0,length=Animation.prefilters.length,deferred=jQuery.Deferred().always(function(){ // Don't match elem in the :animated selector
delete tick.elem;}),tick=function tick(){if(stopped){return false;}var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime), // Support: Android 2.3
// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}deferred.notifyWith(elem,[animation,percent,remaining]);if(percent<1&&length){return remaining;}else {deferred.resolveWith(elem,[animation]);return false;}},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{},easing:jQuery.easing._default},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function createTween(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function stop(gotoEnd){var index=0, // If we are going to the end, we want to run all the tweens
// otherwise we skip this part
length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}stopped=true;for(;index<length;index++){animation.tweens[index].run(1);} // Resolve when we played the last frame; otherwise, reject
if(gotoEnd){deferred.notifyWith(elem,[animation,1,0]);deferred.resolveWith(elem,[animation,gotoEnd]);}else {deferred.rejectWith(elem,[animation,gotoEnd]);}return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=Animation.prefilters[index].call(animation,elem,props,animation.opts);if(result){if(jQuery.isFunction(result.stop)){jQuery._queueHooks(animation.elem,animation.opts.queue).stop=jQuery.proxy(result.stop,result);}return result;}}jQuery.map(props,createTween,animation);if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue})); // attach callbacks from options
return animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);}jQuery.Animation=jQuery.extend(Animation,{tweeners:{"*":[function(prop,value){var tween=this.createTween(prop,value);adjustCSS(tween.elem,prop,rcssNum.exec(value),tween);return tween;}]},tweener:function tweener(props,callback){if(jQuery.isFunction(props)){callback=props;props=["*"];}else {props=props.match(rnotwhite);}var prop,index=0,length=props.length;for(;index<length;index++){prop=props[index];Animation.tweeners[prop]=Animation.tweeners[prop]||[];Animation.tweeners[prop].unshift(callback);}},prefilters:[defaultPrefilter],prefilter:function prefilter(callback,prepend){if(prepend){Animation.prefilters.unshift(callback);}else {Animation.prefilters.push(callback);}}});jQuery.speed=function(speed,easing,fn){var opt=speed&&(typeof speed==="undefined"?"undefined":_typeof(speed))==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default; // Normalize opt.queue - true/undefined/null -> "fx"
if(opt.queue==null||opt.queue===true){opt.queue="fx";} // Queueing
opt.old=opt.complete;opt.complete=function(){if(jQuery.isFunction(opt.old)){opt.old.call(this);}if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.fn.extend({fadeTo:function fadeTo(speed,to,easing,callback){ // Show any hidden elements after setting opacity to 0
return this.filter(isHidden).css("opacity",0).show() // Animate to the value specified
.end().animate({opacity:to},speed,easing,callback);},animate:function animate(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function doAnimation(){ // Operate on a copy of prop so per-property easing won't be lost
var anim=Animation(this,jQuery.extend({},prop),optall); // Empty animations, or finishing resolves immediately
if(empty||dataPriv.get(this,"finish")){anim.stop(true);}};doAnimation.finish=doAnimation;return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function stop(type,clearQueue,gotoEnd){var stopQueue=function stopQueue(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}if(clearQueue&&type!==false){this.queue(type||"fx",[]);}return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=dataPriv.get(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else {for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}} // Start the next in the queue if the last step wasn't forced.
// Timers currently will call their complete callbacks, which
// will dequeue but only if they were gotoEnd.
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});},finish:function finish(type){if(type!==false){type=type||"fx";}return this.each(function(){var index,data=dataPriv.get(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0; // Enable finishing flag on private data
data.finish=true; // Empty the queue first
jQuery.queue(this,type,[]);if(hooks&&hooks.stop){hooks.stop.call(this,true);} // Look for any active animations, and finish them
for(index=timers.length;index--;){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);timers.splice(index,1);}} // Look for any animations in the old queue and finish them
for(index=0;index<length;index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this);}} // Turn off finishing flag
delete data.finish;});}});jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};}); // Generate shortcuts for custom animations
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.timers=[];jQuery.fx.tick=function(){var timer,i=0,timers=jQuery.timers;fxNow=jQuery.now();for(;i<timers.length;i++){timer=timers[i]; // Checks the timer has not already been removed
if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}if(!timers.length){jQuery.fx.stop();}fxNow=undefined;};jQuery.fx.timer=function(timer){jQuery.timers.push(timer);if(timer()){jQuery.fx.start();}else {jQuery.timers.pop();}};jQuery.fx.interval=13;jQuery.fx.start=function(){if(!timerId){timerId=window.setInterval(jQuery.fx.tick,jQuery.fx.interval);}};jQuery.fx.stop=function(){window.clearInterval(timerId);timerId=null;};jQuery.fx.speeds={slow:600,fast:200, // Default speed
_default:400}; // Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay=function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=window.setTimeout(next,time);hooks.stop=function(){window.clearTimeout(timeout);};});};(function(){var input=document.createElement("input"),select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));input.type="checkbox"; // Support: iOS<=5.1, Android<=4.2+
// Default value for a checkbox should be "on"
support.checkOn=input.value!==""; // Support: IE<=11+
// Must access selectedIndex to make default options select
support.optSelected=opt.selected; // Support: Android<=2.3
// Options inside disabled selects are incorrectly marked as disabled
select.disabled=true;support.optDisabled=!opt.disabled; // Support: IE<=11+
// An input loses its value after becoming a radio
input=document.createElement("input");input.value="t";input.type="radio";support.radioValue=input.value==="t";})();var boolHook,attrHandle=jQuery.expr.attrHandle;jQuery.fn.extend({attr:function attr(name,value){return access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function removeAttr(name){return this.each(function(){jQuery.removeAttr(this,name);});}});jQuery.extend({attr:function attr(elem,name,value){var ret,hooks,nType=elem.nodeType; // Don't get/set attributes on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;} // Fallback to prop when attributes are not supported
if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value);} // All attributes are lowercase
// Grab necessary hook if one is defined
if(nType!==1||!jQuery.isXMLDoc(elem)){name=name.toLowerCase();hooks=jQuery.attrHooks[name]||(jQuery.expr.match.bool.test(name)?boolHook:undefined);}if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return;}if(hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}elem.setAttribute(name,value+"");return value;}if(hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}ret=jQuery.find.attr(elem,name); // Non-existent attributes return null, we normalize to undefined
return ret==null?undefined:ret;},attrHooks:{type:{set:function set(elem,value){if(!support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}return value;}}}},removeAttr:function removeAttr(elem,value){var name,propName,i=0,attrNames=value&&value.match(rnotwhite);if(attrNames&&elem.nodeType===1){while(name=attrNames[i++]){propName=jQuery.propFix[name]||name; // Boolean attributes get special treatment (#10870)
if(jQuery.expr.match.bool.test(name)){ // Set corresponding property to false
elem[propName]=false;}elem.removeAttribute(name);}}}}); // Hooks for boolean attributes
boolHook={set:function set(elem,value,name){if(value===false){ // Remove boolean attributes when set to false
jQuery.removeAttr(elem,name);}else {elem.setAttribute(name,name);}return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(i,name){var getter=attrHandle[name]||jQuery.find.attr;attrHandle[name]=function(elem,name,isXML){var ret,handle;if(!isXML){ // Avoid an infinite loop by temporarily removing this function from the getter
handle=attrHandle[name];attrHandle[name]=ret;ret=getter(elem,name,isXML)!=null?name.toLowerCase():null;attrHandle[name]=handle;}return ret;};});var rfocusable=/^(?:input|select|textarea|button)$/i,rclickable=/^(?:a|area)$/i;jQuery.fn.extend({prop:function prop(name,value){return access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function removeProp(name){return this.each(function(){delete this[jQuery.propFix[name]||name];});}});jQuery.extend({prop:function prop(elem,name,value){var ret,hooks,nType=elem.nodeType; // Don't get/set properties on text, comment and attribute nodes
if(nType===3||nType===8||nType===2){return;}if(nType!==1||!jQuery.isXMLDoc(elem)){ // Fix name and attach hooks
name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}if(value!==undefined){if(hooks&&"set" in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}return elem[name]=value;}if(hooks&&"get" in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}return elem[name];},propHooks:{tabIndex:{get:function get(elem){ // elem.tabIndex doesn't always return the
// correct value when it hasn't been explicitly set
// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
// Use proper attribute retrieval(#12072)
var tabindex=jQuery.find.attr(elem,"tabindex");return tabindex?parseInt(tabindex,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:-1;}}},propFix:{"for":"htmlFor","class":"className"}});if(!support.optSelected){jQuery.propHooks.selected={get:function get(elem){var parent=elem.parentNode;if(parent&&parent.parentNode){parent.parentNode.selectedIndex;}return null;}};}jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this;});var rclass=/[\t\r\n\f]/g;function getClass(elem){return elem.getAttribute&&elem.getAttribute("class")||"";}jQuery.fn.extend({addClass:function addClass(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,getClass(this)));});}if(typeof value==="string"&&value){classes=value.match(rnotwhite)||[];while(elem=this[i++]){curValue=getClass(elem);cur=elem.nodeType===1&&(" "+curValue+" ").replace(rclass," ");if(cur){j=0;while(clazz=classes[j++]){if(cur.indexOf(" "+clazz+" ")<0){cur+=clazz+" ";}} // Only assign if different to avoid unneeded rendering.
finalValue=jQuery.trim(cur);if(curValue!==finalValue){elem.setAttribute("class",finalValue);}}}}return this;},removeClass:function removeClass(value){var classes,elem,cur,curValue,clazz,j,finalValue,i=0;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,getClass(this)));});}if(!arguments.length){return this.attr("class","");}if(typeof value==="string"&&value){classes=value.match(rnotwhite)||[];while(elem=this[i++]){curValue=getClass(elem); // This expression is here for better compressibility (see addClass)
cur=elem.nodeType===1&&(" "+curValue+" ").replace(rclass," ");if(cur){j=0;while(clazz=classes[j++]){ // Remove *all* instances
while(cur.indexOf(" "+clazz+" ")>-1){cur=cur.replace(" "+clazz+" "," ");}} // Only assign if different to avoid unneeded rendering.
finalValue=jQuery.trim(cur);if(curValue!==finalValue){elem.setAttribute("class",finalValue);}}}}return this;},toggleClass:function toggleClass(value,stateVal){var type=typeof value==="undefined"?"undefined":_typeof(value);if(typeof stateVal==="boolean"&&type==="string"){return stateVal?this.addClass(value):this.removeClass(value);}if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,getClass(this),stateVal),stateVal);});}return this.each(function(){var className,i,self,classNames;if(type==="string"){ // Toggle individual class names
i=0;self=jQuery(this);classNames=value.match(rnotwhite)||[];while(className=classNames[i++]){ // Check each className given, space separated list
if(self.hasClass(className)){self.removeClass(className);}else {self.addClass(className);}} // Toggle whole class name
}else if(value===undefined||type==="boolean"){className=getClass(this);if(className){ // Store className if set
dataPriv.set(this,"__className__",className);} // If the element has a class name or if we're passed `false`,
// then remove the whole classname (if there was one, the above saved it).
// Otherwise bring back whatever was previously saved (if anything),
// falling back to the empty string if nothing was stored.
if(this.setAttribute){this.setAttribute("class",className||value===false?"":dataPriv.get(this,"__className__")||"");}}});},hasClass:function hasClass(selector){var className,elem,i=0;className=" "+selector+" ";while(elem=this[i++]){if(elem.nodeType===1&&(" "+getClass(elem)+" ").replace(rclass," ").indexOf(className)>-1){return true;}}return false;}});var rreturn=/\r/g;jQuery.fn.extend({val:function val(value){var hooks,ret,isFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get" in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}ret=elem.value;return typeof ret==="string"? // Handle most common string cases
ret.replace(rreturn,""): // Handle cases where value is null/undef or number
ret==null?"":ret;}return;}isFunction=jQuery.isFunction(value);return this.each(function(i){var val;if(this.nodeType!==1){return;}if(isFunction){val=value.call(this,i,jQuery(this).val());}else {val=value;} // Treat null/undefined as ""; convert numbers to string
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()]; // If set returns undefined, fall back to normal setting
if(!hooks||!("set" in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function get(elem){ // Support: IE<11
// option.value not trimmed (#14858)
return jQuery.trim(elem.value);}},select:{get:function get(elem){var value,option,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one"||index<0,values=one?null:[],max=one?index+1:options.length,i=index<0?max:one?index:0; // Loop through all the selected options
for(;i<max;i++){option=options[i]; // IE8-9 doesn't update selected after form reset (#2551)
if((option.selected||i===index)&&( // Don't return options that are disabled or in a disabled optgroup
support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){ // Get the specific value for the option
value=jQuery(option).val(); // We don't need an array for one selects
if(one){return value;} // Multi-Selects return an array
values.push(value);}}return values;},set:function set(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--){option=options[i];if(option.selected=jQuery.inArray(jQuery.valHooks.option.get(option),values)>-1){optionSet=true;}} // Force browsers to behave consistently when non-matching value is set
if(!optionSet){elem.selectedIndex=-1;}return values;}}}}); // Radios and checkboxes getter/setter
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function set(elem,value){if(jQuery.isArray(value)){return elem.checked=jQuery.inArray(jQuery(elem).val(),value)>-1;}}};if(!support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value;};}}); // Return jQuery for attributes-only inclusion
var rfocusMorph=/^(?:focusinfocus|focusoutblur)$/;jQuery.extend(jQuery.event,{trigger:function trigger(event,data,elem,onlyHandlers){var i,cur,tmp,bubbleType,ontype,handle,special,eventPath=[elem||document],type=hasOwn.call(event,"type")?event.type:event,namespaces=hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur=tmp=elem=elem||document; // Don't do events on text and comment nodes
if(elem.nodeType===3||elem.nodeType===8){return;} // focus/blur morphs to focusin/out; ensure we're not firing them right now
if(rfocusMorph.test(type+jQuery.event.triggered)){return;}if(type.indexOf(".")>-1){ // Namespaced trigger; create a regexp to match event type in handle()
namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}ontype=type.indexOf(":")<0&&"on"+type; // Caller can pass in a jQuery.Event object, Object, or just an event type string
event=event[jQuery.expando]?event:new jQuery.Event(type,(typeof event==="undefined"?"undefined":_typeof(event))==="object"&&event); // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
event.isTrigger=onlyHandlers?2:3;event.namespace=namespaces.join(".");event.rnamespace=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null; // Clean up the event in case it is being reused
event.result=undefined;if(!event.target){event.target=elem;} // Clone any incoming data and prepend the event, creating the handler arg list
data=data==null?[event]:jQuery.makeArray(data,[event]); // Allow special events to draw outside the lines
special=jQuery.event.special[type]||{};if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return;} // Determine event propagation path in advance, per W3C events spec (#9951)
// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode;}for(;cur;cur=cur.parentNode){eventPath.push(cur);tmp=cur;} // Only add window if we got to document (e.g., not plain obj or detached DOM)
if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window);}} // Fire handlers on the event path
i=0;while((cur=eventPath[i++])&&!event.isPropagationStopped()){event.type=i>1?bubbleType:special.bindType||type; // jQuery handler
handle=(dataPriv.get(cur,"events")||{})[event.type]&&dataPriv.get(cur,"handle");if(handle){handle.apply(cur,data);} // Native handler
handle=ontype&&cur[ontype];if(handle&&handle.apply&&acceptData(cur)){event.result=handle.apply(cur,data);if(event.result===false){event.preventDefault();}}}event.type=type; // If nobody prevented the default action, do it now
if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&acceptData(elem)){ // Call a native DOM method on the target with the same name name as the event.
// Don't do default actions on window, that's where global variables be (#6170)
if(ontype&&jQuery.isFunction(elem[type])&&!jQuery.isWindow(elem)){ // Don't re-trigger an onFOO event when we call its FOO() method
tmp=elem[ontype];if(tmp){elem[ontype]=null;} // Prevent re-triggering of the same event, since we already bubbled it above
jQuery.event.triggered=type;elem[type]();jQuery.event.triggered=undefined;if(tmp){elem[ontype]=tmp;}}}}return event.result;}, // Piggyback on a donor event to simulate a different one
simulate:function simulate(type,elem,event){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true // Previously, `originalEvent: {}` was set here, so stopPropagation call
// would not be triggered on donor event, since in our own
// jQuery.event.stopPropagation function we had a check for existence of
// originalEvent.stopPropagation method, so, consequently it would be a noop.
//
// But now, this "simulate" function is used only for events
// for which stopPropagation() is noop, so there is no need for that anymore.
//
// For the 1.x branch though, guard for "click" and "submit"
// events is still used, but was moved to jQuery.event.stopPropagation function
// because `originalEvent` should point to the original event for the constancy
// with other events and for more focused logic
});jQuery.event.trigger(e,null,elem);if(e.isDefaultPrevented()){event.preventDefault();}}});jQuery.fn.extend({trigger:function trigger(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function triggerHandler(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){ // Handle event binding
jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};});jQuery.fn.extend({hover:function hover(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});support.focusin="onfocusin" in window; // Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if(!support.focusin){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){ // Attach a single capturing handler on the document while someone wants focusin/focusout
var handler=function handler(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event));};jQuery.event.special[fix]={setup:function setup(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix);if(!attaches){doc.addEventListener(orig,handler,true);}dataPriv.access(doc,fix,(attaches||0)+1);},teardown:function teardown(){var doc=this.ownerDocument||this,attaches=dataPriv.access(doc,fix)-1;if(!attaches){doc.removeEventListener(orig,handler,true);dataPriv.remove(doc,fix);}else {dataPriv.access(doc,fix,attaches);}}};});}var location=window.location;var nonce=jQuery.now();var rquery=/\?/; // Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON=function(data){return JSON.parse(data+"");}; // Cross-browser xml parsing
jQuery.parseXML=function(data){var xml;if(!data||typeof data!=="string"){return null;} // Support: IE9
try{xml=new window.DOMParser().parseFromString(data,"text/xml");}catch(e){xml=undefined;}if(!xml||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data);}return xml;};var rhash=/#.*$/,rts=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)$/mg, // #7653, #8125, #8152: local protocol detection
rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//, /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */prefilters={}, /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */transports={}, // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
allTypes="*/".concat("*"), // Anchor tag for parsing the document origin
originAnchor=document.createElement("a");originAnchor.href=location.href; // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports(structure){ // dataTypeExpression is optional and defaults to "*"
return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnotwhite)||[];if(jQuery.isFunction(func)){ // For each dataType in the dataTypeExpression
while(dataType=dataTypes[i++]){ // Prepend if requested
if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";(structure[dataType]=structure[dataType]||[]).unshift(func); // Otherwise append
}else {(structure[dataType]=structure[dataType]||[]).push(func);}}}};} // Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=structure===transports;function inspect(dataType){var selected;inspected[dataType]=true;jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return !(selected=dataTypeOrTransport);}});return selected;}return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*");} // A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:deep||(deep={}))[key]=src[key];}}if(deep){jQuery.extend(true,target,deep);}return target;} /* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes; // Remove auto dataType and get content-type in the process
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type");}} // Check if we're dealing with a known content-type
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}} // Check to see if we have a response for the expected dataType
if(dataTypes[0] in responses){finalDataType=dataTypes[0];}else { // Try convertible dataTypes
for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}if(!firstDataType){firstDataType=type;}} // Or just use first one
finalDataType=finalDataType||firstDataType;} // If we found a dataType
// We add the dataType to the list if needed
// and return the corresponding response
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}return responses[finalDataType];}} /* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={}, // Work with a copy of dataTypes in case we need to modify it for conversion
dataTypes=s.dataTypes.slice(); // Create converters map with lowercased keys
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}current=dataTypes.shift(); // Convert to each sequential dataType
while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response;} // Apply the dataFilter if provided
if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType);}prev=current;current=dataTypes.shift();if(current){ // There's only work to do if current dataType is non-auto
if(current==="*"){current=prev; // Convert response if prev dataType is non-auto and differs from current
}else if(prev!=="*"&&prev!==current){ // Seek a direct converter
conv=converters[prev+" "+current]||converters["* "+current]; // If none found, seek a pair
if(!conv){for(conv2 in converters){ // If conv2 outputs current
tmp=conv2.split(" ");if(tmp[1]===current){ // If prev can be converted to accepted input
conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){ // Condense equivalence converters
if(conv===true){conv=converters[conv2]; // Otherwise, insert the intermediate dataType
}else if(converters[conv2]!==true){current=tmp[0];dataTypes.unshift(tmp[1]);}break;}}}} // Apply converter (if not an equivalence)
if(conv!==true){ // Unless errors are allowed to bubble, catch and return them
if(conv&&s.throws){response=conv(response);}else {try{response=conv(response);}catch(e){return {state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current};}}}}}}return {state:"success",data:response};}jQuery.extend({ // Counter for holding the number of active queries
active:0, // Last-Modified header cache for next request
lastModified:{},etag:{},ajaxSettings:{url:location.href,type:"GET",isLocal:rlocalProtocol.test(location.protocol),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8", /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"}, // Data converters
// Keys separate source (or catchall "*") and destination types with a single space
converters:{ // Convert anything to text
"* text":String, // Text to html (true = no transformation)
"text html":true, // Evaluate text as a json expression
"text json":jQuery.parseJSON, // Parse text as xml
"text xml":jQuery.parseXML}, // For options that shouldn't be deep extended:
// you can add your own custom options here if
// and when you create one that shouldn't be
// deep extended (see ajaxExtend)
flatOptions:{url:true,context:true}}, // Creates a full fledged settings object into target
// with both ajaxSettings and settings fields.
// If target is omitted, writes into ajaxSettings.
ajaxSetup:function ajaxSetup(target,settings){return settings? // Building a settings object
ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings): // Extending ajaxSettings
ajaxExtend(jQuery.ajaxSettings,target);},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports), // Main method
ajax:function ajax(url,options){ // If url is an object, simulate pre-1.5 signature
if((typeof url==="undefined"?"undefined":_typeof(url))==="object"){options=url;url=undefined;} // Force options to be an object
options=options||{};var transport, // URL without anti-cache param
cacheURL, // Response headers
responseHeadersString,responseHeaders, // timeout handle
timeoutTimer, // Url cleanup var
urlAnchor, // To know if global events are to be dispatched
fireGlobals, // Loop variable
i, // Create the final options object
s=jQuery.ajaxSetup({},options), // Callbacks context
callbackContext=s.context||s, // Context for global events is callbackContext if it is a DOM node or jQuery collection
globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event, // Deferreds
deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"), // Status-dependent callbacks
_statusCode=s.statusCode||{}, // Headers (they are sent all at once)
requestHeaders={},requestHeadersNames={}, // The jqXHR state
state=0, // Default abort message
strAbort="canceled", // Fake xhr
jqXHR={readyState:0, // Builds headers hashtable if needed
getResponseHeader:function getResponseHeader(key){var match;if(state===2){if(!responseHeaders){responseHeaders={};while(match=rheaders.exec(responseHeadersString)){responseHeaders[match[1].toLowerCase()]=match[2];}}match=responseHeaders[key.toLowerCase()];}return match==null?null:match;}, // Raw string
getAllResponseHeaders:function getAllResponseHeaders(){return state===2?responseHeadersString:null;}, // Caches the header
setRequestHeader:function setRequestHeader(name,value){var lname=name.toLowerCase();if(!state){name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;requestHeaders[name]=value;}return this;}, // Overrides response content-type header
overrideMimeType:function overrideMimeType(type){if(!state){s.mimeType=type;}return this;}, // Status-dependent callbacks
statusCode:function statusCode(map){var code;if(map){if(state<2){for(code in map){ // Lazy-add the new callback in a way that preserves old ones
_statusCode[code]=[_statusCode[code],map[code]];}}else { // Execute the appropriate callbacks
jqXHR.always(map[jqXHR.status]);}}return this;}, // Cancel the request
abort:function abort(statusText){var finalText=statusText||strAbort;if(transport){transport.abort(finalText);}done(0,finalText);return this;}}; // Attach deferreds
deferred.promise(jqXHR).complete=completeDeferred.add;jqXHR.success=jqXHR.done;jqXHR.error=jqXHR.fail; // Remove hash character (#7531: and string promotion)
// Add protocol if not provided (prefilters might expect it)
// Handle falsy url in the settings object (#10093: consistency with old signature)
// We also use the url parameter if available
s.url=((url||s.url||location.href)+"").replace(rhash,"").replace(rprotocol,location.protocol+"//"); // Alias method option to type as per ticket #12004
s.type=options.method||options.type||s.method||s.type; // Extract dataTypes list
s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().match(rnotwhite)||[""]; // A cross-domain request is in order when the origin doesn't match the current origin.
if(s.crossDomain==null){urlAnchor=document.createElement("a"); // Support: IE8-11+
// IE throws exception if url is malformed, e.g. http://example.com:80x/
try{urlAnchor.href=s.url; // Support: IE8-11+
// Anchor's host property isn't correctly set when s.url is relative
urlAnchor.href=urlAnchor.href;s.crossDomain=originAnchor.protocol+"//"+originAnchor.host!==urlAnchor.protocol+"//"+urlAnchor.host;}catch(e){ // If there is an error parsing the URL, assume it is crossDomain,
// it can be rejected by the transport if it is invalid
s.crossDomain=true;}} // Convert data if not already a string
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);} // Apply prefilters
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR); // If request was aborted inside a prefilter, stop there
if(state===2){return jqXHR;} // We can fire global events as of now if asked to
// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
fireGlobals=jQuery.event&&s.global; // Watch for a new set of requests
if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");} // Uppercase the type
s.type=s.type.toUpperCase(); // Determine if request has content
s.hasContent=!rnoContent.test(s.type); // Save the URL in case we're toying with the If-Modified-Since
// and/or If-None-Match header later on
cacheURL=s.url; // More options handling for requests with no content
if(!s.hasContent){ // If data is available, append data to url
if(s.data){cacheURL=s.url+=(rquery.test(cacheURL)?"&":"?")+s.data; // #9682: remove data so that it's not used in an eventual retry
delete s.data;} // Add anti-cache in url if needed
if(s.cache===false){s.url=rts.test(cacheURL)? // If there is already a '_' parameter, set its value
cacheURL.replace(rts,"$1_="+nonce++): // Otherwise add one to the end
cacheURL+(rquery.test(cacheURL)?"&":"?")+"_="+nonce++;}} // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}} // Set the correct header, if data is being sent
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);} // Set the Accepts header for the server, depending on the dataType
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]); // Check for headers option
for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);} // Allow custom headers/mimetypes and early abort
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){ // Abort if not done already and return
return jqXHR.abort();} // Aborting is no longer a cancellation
strAbort="abort"; // Install callbacks on deferreds
for(i in {success:1,error:1,complete:1}){jqXHR[i](s[i]);} // Get transport
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR); // If no transport, we auto-abort
if(!transport){done(-1,"No Transport");}else {jqXHR.readyState=1; // Send global event
if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);} // If request was aborted inside ajaxSend, stop there
if(state===2){return jqXHR;} // Timeout
if(s.async&&s.timeout>0){timeoutTimer=window.setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}try{state=1;transport.send(requestHeaders,done);}catch(e){ // Propagate exception as error if not done
if(state<2){done(-1,e); // Simply rethrow otherwise
}else {throw e;}}} // Callback for when everything is done
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText; // Called once
if(state===2){return;} // State is "done" now
state=2; // Clear timeout if it exists
if(timeoutTimer){window.clearTimeout(timeoutTimer);} // Dereference transport for early garbage collection
// (no matter how long the jqXHR object will be used)
transport=undefined; // Cache response headers
responseHeadersString=headers||""; // Set readyState
jqXHR.readyState=status>0?4:0; // Determine if successful
isSuccess=status>=200&&status<300||status===304; // Get response data
if(responses){response=ajaxHandleResponses(s,jqXHR,responses);} // Convert no matter what (that way responseXXX fields are always set)
response=ajaxConvert(s,response,jqXHR,isSuccess); // If successful, handle type chaining
if(isSuccess){ // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[cacheURL]=modified;}modified=jqXHR.getResponseHeader("etag");if(modified){jQuery.etag[cacheURL]=modified;}} // if no content
if(status===204||s.type==="HEAD"){statusText="nocontent"; // if not modified
}else if(status===304){statusText="notmodified"; // If we have data, let's convert it
}else {statusText=response.state;success=response.data;error=response.error;isSuccess=!error;}}else { // Extract error from statusText and normalize for non-aborts
error=statusText;if(status||!statusText){statusText="error";if(status<0){status=0;}}} // Set data for the fake xhr object
jqXHR.status=status;jqXHR.statusText=(nativeStatusText||statusText)+""; // Success/Error
if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else {deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);} // Status-dependent callbacks
jqXHR.statusCode(_statusCode);_statusCode=undefined;if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]);} // Complete
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]); // Handle the global AJAX counter
if(! --jQuery.active){jQuery.event.trigger("ajaxStop");}}}return jqXHR;},getJSON:function getJSON(url,data,callback){return jQuery.get(url,data,callback,"json");},getScript:function getScript(url,callback){return jQuery.get(url,undefined,callback,"script");}});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){ // Shift arguments if data argument was omitted
if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;} // The url can be an options object (which then must have .url)
return jQuery.ajax(jQuery.extend({url:url,type:method,dataType:type,data:data,success:callback},jQuery.isPlainObject(url)&&url));};});jQuery._evalUrl=function(url){return jQuery.ajax({url:url, // Make this explicit, since user can override this through ajaxSetup (#11264)
type:"GET",dataType:"script",async:false,global:false,"throws":true});};jQuery.fn.extend({wrapAll:function wrapAll(html){var wrap;if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}if(this[0]){ // The elements to wrap the target around
wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}wrap.map(function(){var elem=this;while(elem.firstElementChild){elem=elem.firstElementChild;}return elem;}).append(this);}return this;},wrapInner:function wrapInner(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else {self.append(html);}});},wrap:function wrap(html){var isFunction=jQuery.isFunction(html);return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html);});},unwrap:function unwrap(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();}});jQuery.expr.filters.hidden=function(elem){return !jQuery.expr.filters.visible(elem);};jQuery.expr.filters.visible=function(elem){ // Support: Opera <= 12.12
// Opera reports offsetWidths and offsetHeights less than zero on some elements
// Use OR instead of AND as the element is not visible if either is true
// See tickets #10406 and #13132
return elem.offsetWidth>0||elem.offsetHeight>0||elem.getClientRects().length>0;};var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;function buildParams(prefix,obj,traditional,add){var name;if(jQuery.isArray(obj)){ // Serialize array item.
jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){ // Treat each array item as a scalar.
add(prefix,v);}else { // Item is non-scalar (array or object), encode its numeric index.
buildParams(prefix+"["+((typeof v==="undefined"?"undefined":_typeof(v))==="object"&&v!=null?i:"")+"]",v,traditional,add);}});}else if(!traditional&&jQuery.type(obj)==="object"){ // Serialize object item.
for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else { // Serialize scalar item.
add(prefix,obj);}} // Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param=function(a,traditional){var prefix,s=[],add=function add(key,value){ // If value is a function, invoke it and return its value
value=jQuery.isFunction(value)?value():value==null?"":value;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);}; // Set traditional to true for jQuery <= 1.3.2 behavior.
if(traditional===undefined){traditional=jQuery.ajaxSettings&&jQuery.ajaxSettings.traditional;} // If an array was passed in, assume that it is an array of form elements.
if(jQuery.isArray(a)||a.jquery&&!jQuery.isPlainObject(a)){ // Serialize the form elements
jQuery.each(a,function(){add(this.name,this.value);});}else { // If traditional, encode the "old" way (the way 1.3.2 or older
// did it), otherwise encode params recursively.
for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}} // Return the resulting serialization
return s.join("&").replace(r20,"+");};jQuery.fn.extend({serialize:function serialize(){return jQuery.param(this.serializeArray());},serializeArray:function serializeArray(){return this.map(function(){ // Can add propHook for "elements" to filter or add form elements
var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type; // Use .is( ":disabled" ) so that fieldset[disabled] works
return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!rcheckableType.test(type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val){return {name:elem.name,value:val.replace(rCRLF,"\r\n")};}):{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});jQuery.ajaxSettings.xhr=function(){try{return new window.XMLHttpRequest();}catch(e){}};var xhrSuccessStatus={ // File protocol always yields status code 0, assume 200
0:200, // Support: IE9
// #1450: sometimes IE returns 1223 when it should be 204
1223:204},xhrSupported=jQuery.ajaxSettings.xhr();support.cors=!!xhrSupported&&"withCredentials" in xhrSupported;support.ajax=xhrSupported=!!xhrSupported;jQuery.ajaxTransport(function(options){var _callback,errorCallback; // Cross domain only allowed if supported through XMLHttpRequest
if(support.cors||xhrSupported&&!options.crossDomain){return {send:function send(headers,complete){var i,xhr=options.xhr();xhr.open(options.type,options.url,options.async,options.username,options.password); // Apply custom fields if provided
if(options.xhrFields){for(i in options.xhrFields){xhr[i]=options.xhrFields[i];}} // Override mime type if needed
if(options.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(options.mimeType);} // X-Requested-With header
// For cross-domain requests, seeing as conditions for a preflight are
// akin to a jigsaw puzzle, we simply never set it to be sure.
// (it can always be set on a per-request basis or even using ajaxSetup)
// For same-domain requests, won't change header if already provided.
if(!options.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";} // Set headers
for(i in headers){xhr.setRequestHeader(i,headers[i]);} // Callback
_callback=function callback(type){return function(){if(_callback){_callback=errorCallback=xhr.onload=xhr.onerror=xhr.onabort=xhr.onreadystatechange=null;if(type==="abort"){xhr.abort();}else if(type==="error"){ // Support: IE9
// On a manual native abort, IE9 throws
// errors on any property access that is not readyState
if(typeof xhr.status!=="number"){complete(0,"error");}else {complete( // File: protocol always yields status 0; see #8605, #14207
xhr.status,xhr.statusText);}}else {complete(xhrSuccessStatus[xhr.status]||xhr.status,xhr.statusText, // Support: IE9 only
// IE9 has no XHR2 but throws on binary (trac-11426)
// For XHR2 non-text, let the caller handle it (gh-2498)
(xhr.responseType||"text")!=="text"||typeof xhr.responseText!=="string"?{binary:xhr.response}:{text:xhr.responseText},xhr.getAllResponseHeaders());}}};}; // Listen to events
xhr.onload=_callback();errorCallback=xhr.onerror=_callback("error"); // Support: IE9
// Use onreadystatechange to replace onabort
// to handle uncaught aborts
if(xhr.onabort!==undefined){xhr.onabort=errorCallback;}else {xhr.onreadystatechange=function(){ // Check readyState before timeout as it changes
if(xhr.readyState===4){ // Allow onerror to be called first,
// but that will not handle a native abort
// Also, save errorCallback to a variable
// as xhr.onerror cannot be accessed
window.setTimeout(function(){if(_callback){errorCallback();}});}};} // Create the abort callback
_callback=_callback("abort");try{ // Do send the request (this may raise an exception)
xhr.send(options.hasContent&&options.data||null);}catch(e){ // #14683: Only rethrow if this hasn't been notified as an error yet
if(_callback){throw e;}}},abort:function abort(){if(_callback){_callback();}}};}}); // Install script dataType
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, "+"application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function textScript(text){jQuery.globalEval(text);return text;}}}); // Handle cache's special case and crossDomain
jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}if(s.crossDomain){s.type="GET";}}); // Bind script tag hack transport
jQuery.ajaxTransport("script",function(s){ // This transport only deals with cross domain requests
if(s.crossDomain){var script,_callback2;return {send:function send(_,complete){script=jQuery("<script>").prop({charset:s.scriptCharset,src:s.url}).on("load error",_callback2=function callback(evt){script.remove();_callback2=null;if(evt){complete(evt.type==="error"?404:200,evt.type);}}); // Use native DOM manipulation to avoid our domManip AJAX trickery
document.head.appendChild(script[0]);},abort:function abort(){if(_callback2){_callback2();}}};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/; // Default jsonp settings
jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function jsonpCallback(){var callback=oldCallbacks.pop()||jQuery.expando+"_"+nonce++;this[callback]=true;return callback;}}); // Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&(s.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&rjsonp.test(s.data)&&"data"); // Handle iff the expected data type is "jsonp" or we have a parameter to set
if(jsonProp||s.dataTypes[0]==="jsonp"){ // Get callback name, remembering preexisting value associated with it
callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback; // Insert callback into url or form data
if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName);}else if(s.jsonp!==false){s.url+=(rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName;} // Use data converter to retrieve json after script execution
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}return responseContainer[0];}; // Force json dataType
s.dataTypes[0]="json"; // Install callback
overwritten=window[callbackName];window[callbackName]=function(){responseContainer=arguments;}; // Clean-up function (fires after converters)
jqXHR.always(function(){ // If previous value didn't exist - remove it
if(overwritten===undefined){jQuery(window).removeProp(callbackName); // Otherwise restore preexisting value
}else {window[callbackName]=overwritten;} // Save back as free
if(s[callbackName]){ // Make sure that re-using the options doesn't screw things around
s.jsonpCallback=originalSettings.jsonpCallback; // Save the callback name for future use
oldCallbacks.push(callbackName);} // Call if it was a function and we have a response
if(responseContainer&&jQuery.isFunction(overwritten)){overwritten(responseContainer[0]);}responseContainer=overwritten=undefined;}); // Delegate to script
return "script";}}); // Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument=function(){var body=document.implementation.createHTMLDocument("").body;body.innerHTML="<form></form><form></form>";return body.childNodes.length===2;}(); // Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML=function(data,context,keepScripts){if(!data||typeof data!=="string"){return null;}if(typeof context==="boolean"){keepScripts=context;context=false;} // Stop scripts or inline event handlers from being executed immediately
// by using document.implementation
context=context||(support.createHTMLDocument?document.implementation.createHTMLDocument(""):document);var parsed=rsingleTag.exec(data),scripts=!keepScripts&&[]; // Single tag
if(parsed){return [context.createElement(parsed[1])];}parsed=buildFragment([data],context,scripts);if(scripts&&scripts.length){jQuery(scripts).remove();}return jQuery.merge([],parsed.childNodes);}; // Keep a copy of the old load method
var _load=jQuery.fn.load; /**
 * Load a url into a page
 */jQuery.fn.load=function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments);}var selector,type,response,self=this,off=url.indexOf(" ");if(off>-1){selector=jQuery.trim(url.slice(off));url=url.slice(0,off);} // If it's a function
if(jQuery.isFunction(params)){ // We assume that it's the callback
callback=params;params=undefined; // Otherwise, build a param string
}else if(params&&(typeof params==="undefined"?"undefined":_typeof(params))==="object"){type="POST";} // If we have elements to modify, make the request
if(self.length>0){jQuery.ajax({url:url, // If "type" variable is undefined, then "GET" method will be used.
// Make value of this field explicit since
// user can override it through ajaxSetup method
type:type||"GET",dataType:"html",data:params}).done(function(responseText){ // Save response for use in complete callback
response=arguments;self.html(selector? // If a selector was specified, locate the right elements in a dummy div
// Exclude scripts to avoid IE 'Permission Denied' errors
jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector): // Otherwise use the full result
responseText); // If the request succeeds, this function gets "data", "status", "jqXHR"
// but they are ignored because response was set above.
// If it fails, this function gets "jqXHR", "status", "error"
}).always(callback&&function(jqXHR,status){self.each(function(){callback.apply(self,response||[jqXHR.responseText,status,jqXHR]);});});}return this;}; // Attach a bunch of functions for handling common AJAX events
jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(i,type){jQuery.fn[type]=function(fn){return this.on(type,fn);};});jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;}; /**
 * Gets a window from an element
 */function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9&&elem.defaultView;}jQuery.offset={setOffset:function setOffset(elem,options,i){var curPosition,curLeft,curCSSTop,curTop,curOffset,curCSSLeft,calculatePosition,position=jQuery.css(elem,"position"),curElem=jQuery(elem),props={}; // Set position first, in-case top/left are set even on static elem
if(position==="static"){elem.style.position="relative";}curOffset=curElem.offset();curCSSTop=jQuery.css(elem,"top");curCSSLeft=jQuery.css(elem,"left");calculatePosition=(position==="absolute"||position==="fixed")&&(curCSSTop+curCSSLeft).indexOf("auto")>-1; // Need to be able to calculate position if either
// top or left is auto and position is either absolute or fixed
if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else {curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}if(jQuery.isFunction(options)){ // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
options=options.call(elem,i,jQuery.extend({},curOffset));}if(options.top!=null){props.top=options.top-curOffset.top+curTop;}if(options.left!=null){props.left=options.left-curOffset.left+curLeft;}if("using" in options){options.using.call(elem,props);}else {curElem.css(props);}}};jQuery.fn.extend({offset:function offset(options){if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}var docElem,win,elem=this[0],box={top:0,left:0},doc=elem&&elem.ownerDocument;if(!doc){return;}docElem=doc.documentElement; // Make sure it's not a disconnected DOM node
if(!jQuery.contains(docElem,elem)){return box;}box=elem.getBoundingClientRect();win=getWindow(doc);return {top:box.top+win.pageYOffset-docElem.clientTop,left:box.left+win.pageXOffset-docElem.clientLeft};},position:function position(){if(!this[0]){return;}var offsetParent,offset,elem=this[0],parentOffset={top:0,left:0}; // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
// because it is its only offset parent
if(jQuery.css(elem,"position")==="fixed"){ // Assume getBoundingClientRect is there when computed position is fixed
offset=elem.getBoundingClientRect();}else { // Get *real* offsetParent
offsetParent=this.offsetParent(); // Get correct offsets
offset=this.offset();if(!jQuery.nodeName(offsetParent[0],"html")){parentOffset=offsetParent.offset();} // Add offsetParent borders
parentOffset.top+=jQuery.css(offsetParent[0],"borderTopWidth",true);parentOffset.left+=jQuery.css(offsetParent[0],"borderLeftWidth",true);} // Subtract parent offsets and element margins
return {top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",true),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",true)};}, // This method will return documentElement in the following cases:
// 1) For the element inside the iframe without offsetParent, this method will return
//    documentElement of the parent window
// 2) For the hidden or detached element
// 3) For body or html element, i.e. in case of the html node - it will return itself
//
// but those exceptions were never presented as a real life use-cases
// and might be considered as more preferable results.
//
// This logic, however, is not guaranteed and can change at any point in the future
offsetParent:function offsetParent(){return this.map(function(){var offsetParent=this.offsetParent;while(offsetParent&&jQuery.css(offsetParent,"position")==="static"){offsetParent=offsetParent.offsetParent;}return offsetParent||documentElement;});}}); // Create scrollLeft and scrollTop methods
jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top="pageYOffset"===prop;jQuery.fn[method]=function(val){return access(this,function(elem,method,val){var win=getWindow(elem);if(val===undefined){return win?win[prop]:elem[method];}if(win){win.scrollTo(!top?val:win.pageXOffset,top?val:win.pageYOffset);}else {elem[method]=val;}},method,val,arguments.length);};}); // Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]=addGetHookIf(support.pixelPosition,function(elem,computed){if(computed){computed=curCSS(elem,prop); // If curCSS returns percentage, fallback to offset
return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed;}});}); // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){ // Margin is only for outerHeight, outerWidth
jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return access(this,function(elem,type,value){var doc;if(jQuery.isWindow(elem)){ // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
// isn't a whole lot we can do. See pull request at this URL for discussion:
// https://github.com/jquery/jquery/pull/764
return elem.document.documentElement["client"+name];} // Get document width or height
if(elem.nodeType===9){doc=elem.documentElement; // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
// whichever is greatest
return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}return value===undefined? // Get width or height on the element, requesting but not forcing parseFloat
jQuery.css(elem,type,extra): // Set width or height on the element
jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable,null);};});});jQuery.fn.extend({bind:function bind(types,data,fn){return this.on(types,null,data,fn);},unbind:function unbind(types,fn){return this.off(types,null,fn);},delegate:function delegate(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function undelegate(selector,types,fn){ // ( namespace ) or ( selector, types [, fn] )
return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn);},size:function size(){return this.length;}});jQuery.fn.andSelf=jQuery.fn.addBack; // Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
if(typeof define==="function"&&define.amd){define("jquery",[],function(){return jQuery;});}var  // Map over jQuery in case of overwrite
_jQuery=window.jQuery, // Map over the $ in case of overwrite
_$=window.$;jQuery.noConflict=function(deep){if(window.$===jQuery){window.$=_$;}if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}return jQuery;}; // Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if(!noGlobal){window.jQuery=window.$=jQuery;}return jQuery;});
"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;}; /*
 Highcharts JS v4.2.3 (2016-02-08)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/(function(E,X){(typeof module==="undefined"?"undefined":_typeof(module))==="object"&&module.exports?module.exports=E.document?X(E):X:E.Highcharts=X(E);})(typeof window!=="undefined"?window:undefined,function(E){function X(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw Error(c);E.console&&console.log(c);}function pb(a,b,c){this.options=b;this.elem=a;this.prop=c;}function D(){var a,b=arguments,c,d={},e=function e(a,b){var c,d;(typeof a==="undefined"?"undefined":_typeof(a))!=="object"&&(a={});for(d in b){b.hasOwnProperty(d)&&(c=b[d],a[d]=c&&(typeof c==="undefined"?"undefined":_typeof(c))==="object"&&Object.prototype.toString.call(c)!=="[object Array]"&&d!=="renderTo"&&typeof c.nodeType!=="number"?e(a[d]||{},c):b[d]);}return a;};b[0]===!0&&(d=b[1],b=Array.prototype.slice.call(b,2));c=b.length;for(a=0;a<c;a++){d=e(d,b[a]);}return d;}function C(a,b){return parseInt(a,b||10);}function xa(a){return typeof a==="string";}function Y(a){return a&&(typeof a==="undefined"?"undefined":_typeof(a))==="object";}function Ia(a){return Object.prototype.toString.call(a)==="[object Array]";}function ma(a){return typeof a==="number";}function Da(a){return W.log(a)/W.LN10;}function na(a){return W.pow(10,a);}function oa(a,b){for(var c=a.length;c--;){if(a[c]===b){a.splice(c,1);break;}}}function q(a){return a!==z&&a!==null;}function K(a,b,c){var d,e;if(xa(b))q(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(q(b)&&Y(b))for(d in b){a.setAttribute(d,b[d]);}return e;}function ta(a){return Ia(a)?a:[a];}function Pa(a,b,c){if(b)return setTimeout(a,b,c);a.call(0,c);}function L(a,b){if(ya&&!ca&&b&&b.opacity!==z)b.filter="alpha(opacity="+b.opacity*100+")";u(a.style,b);}function Z(a,b,c,d,e){a=y.createElement(a);b&&u(a,b);e&&L(a,{padding:0,border:"none",margin:0});c&&L(a,c);d&&d.appendChild(a);return a;}function pa(a,b){var c=function c(){};c.prototype=new a();u(c.prototype,b);return c;}function Ja(a,b){return Array((b||2)+1-String(a).length).join(0)+a;}function Ya(a){return (Za&&Za(a)||qb||0)*6E4;}function Ka(a,b){for(var c="{",d=!1,e,f,g,h,i,k=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++){e=e[g[h]];}if(f.length)f=f.join(":"),g=/\.([0-9])/,h=N.lang,i=void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e!==null&&(e=B.numberFormat(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:""))):e=Qa(f,e);}k.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{";}k.push(a);return k.join("");}function rb(a){return W.pow(10,T(W.log(a)/W.LN10));}function sb(a,b,c,d,e){var f,g=a,c=p(c,1);f=a/c;b||(b=[1,2,2.5,5,10],d===!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++){if(g=b[d],e&&g*c>=a||!e&&f<=(b[d]+(b[d+1]||b[d]))/2)break;}g*=c;return g;}function ib(a,b){var c=a.length,d,e;for(e=0;e<c;e++){a[e].safeI=e;}a.sort(function(a,c){d=b(a,c);return d===0?a.safeI-c.safeI:d;});for(e=0;e<c;e++){delete a[e].safeI;}}function Ra(a){for(var b=a.length,c=a[0];b--;){a[b]<c&&(c=a[b]);}return c;}function Ea(a){for(var b=a.length,c=a[0];b--;){a[b]>c&&(c=a[b]);}return c;}function Sa(a,b){for(var c in a){a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c];}}function Ta(a){jb||(jb=Z(La));a&&jb.appendChild(a);jb.innerHTML="";}function fa(a,b){return parseFloat(a.toPrecision(b||14));}function Ua(a,b){b.renderer.globalAnimation=p(a,b.animation);}function Fb(){var a=N.global,b=a.useUTC,c=b?"getUTC":"get",d=b?"setUTC":"set";qa=a.Date||E.Date;qb=b&&a.timezoneOffset;Za=b&&a.getTimezoneOffset;kb=function kb(a,c,d,h,i,k){var j;b?(j=qa.UTC.apply(0,arguments),j+=Ya(j)):j=new qa(a,c,p(d,1),p(h,0),p(i,0),p(k,0)).getTime();return j;};tb=c+"Minutes";ub=c+"Hours";vb=c+"Day";$a=c+"Date";ab=c+"Month";bb=c+"FullYear";Gb=d+"Milliseconds";Hb=d+"Seconds";Ib=d+"Minutes";Jb=d+"Hours";wb=d+"Date";xb=d+"Month";yb=d+"FullYear";}function ia(a){if(!(this instanceof ia))return new ia(a);this.init(a);}function O(){}function Va(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel();}function Kb(a,b,c,d,e){var f=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=null;this.points={};this.stack=e;this.rightCliff=this.leftCliff=0;this.alignOptions={align:b.align||(f?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(f?"middle":c?"bottom":"top"),y:p(b.y,f?4:c?14:-6),x:p(b.x,f?c?-6:6:0)};this.textAlign=b.textAlign||(f?c?"right":"left":"center");}var z,y=E.document,W=Math,A=W.round,T=W.floor,ua=W.ceil,t=W.max,F=W.min,P=W.abs,U=W.cos,$=W.sin,ra=W.PI,ga=ra*2/360,za=E.navigator&&E.navigator.userAgent||"",Lb=E.opera,ya=/(msie|trident|edge)/i.test(za)&&!Lb,lb=y&&y.documentMode===8,mb=!ya&&/AppleWebKit/.test(za),Ma=/Firefox/.test(za),Mb=/(Mobile|Android|Windows Phone)/.test(za),Fa="http://www.w3.org/2000/svg",ca=y&&y.createElementNS&&!!y.createElementNS(Fa,"svg").createSVGRect,Qb=Ma&&parseInt(za.split("Firefox/")[1],10)<4,ha=y&&!ca&&!ya&&!!y.createElement("canvas").getContext,cb,db,Nb={},zb=0,jb,N,Qa,G,Aa=function Aa(){},S=[],eb=0,La="div",Rb=/^[0-9]+$/,nb=["plotTop","marginRight","marginBottom","plotLeft"],qa,kb,qb,Za,tb,ub,vb,$a,ab,bb,Gb,Hb,Ib,Jb,wb,xb,yb,I={},B;B=E.Highcharts?X(16,!0):{win:E};B.seriesTypes=I;var Ga=[],_ja2,sa,o,Na,Ab,Ba,M,V,H,Wa,Oa;pb.prototype={dSetter:function dSetter(){var a=this.paths[0],b=this.paths[1],c=[],d=this.now,e=a.length,f;if(d===1)c=this.toD;else if(e===b.length&&d<1)for(;e--;){f=parseFloat(a[e]),c[e]=isNaN(f)?a[e]:d*parseFloat(b[e]-f)+f;}else c=b;this.elem.attr("d",c);},update:function update(){var a=this.elem,b=this.prop,c=this.now,d=this.options.step;if(this[b+"Setter"])this[b+"Setter"]();else a.attr?a.element&&a.attr(b,c):a.style[b]=c+this.unit;d&&d.call(a,c,this);},run:function run(a,b,c){var d=this,e=function e(a){return e.stopped?!1:d.step(a);},f;this.startTime=+new qa();this.start=a;this.end=b;this.unit=c;this.now=this.start;this.pos=0;e.elem=this.elem;if(e()&&Ga.push(e)===1)e.timerId=setInterval(function(){for(f=0;f<Ga.length;f++){Ga[f]()||Ga.splice(f--,1);}Ga.length||clearInterval(e.timerId);},13);},step:function step(a){var b=+new qa(),c,d=this.options;c=this.elem;var e=d.complete,f=d.duration,g=d.curAnim,h;if(c.attr&&!c.element)c=!1;else if(a||b>=f+this.startTime){this.now=this.end;this.pos=1;this.update();a=g[this.prop]=!0;for(h in g){g[h]!==!0&&(a=!1);}a&&e&&e.call(c);c=!1;}else this.pos=d.easing((b-this.startTime)/f),this.now=this.start+(this.end-this.start)*this.pos,this.update(),c=!0;return c;},initPath:function initPath(a,b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h=a.isArea,i=h?2:1,k=function k(a){for(g=a.length;g--;){(a[g]==="M"||a[g]==="L")&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2]);}};e&&(k(b),k(c));if(d<=c.length/f&&b.length===c.length)for(;d--;){c=c.slice(0,f).concat(c),h&&(c=c.concat(c.slice(c.length-f)));}a.shift=0;if(b.length)for(a=c.length;b.length<a;){d=b.slice().splice(b.length/i-f,f*i),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),[].splice.apply(b,[b.length/i,0].concat(d));}return [b,c];}};var u=B.extend=function(a,b){var c;a||(a={});for(c in b){a[c]=b[c];}return a;},p=B.pick=function(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++){if(c=a[b],c!==z&&c!==null)return c;}},fb=B.wrap=function(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a);};};Qa=function Qa(a,b,c){if(!q(b)||isNaN(b))return N.lang.invalidDate||"";var a=p(a,"%Y-%m-%d %H:%M:%S"),d=new qa(b-Ya(b)),e,f=d[ub](),g=d[vb](),h=d[$a](),i=d[ab](),k=d[bb](),j=N.lang,l=j.weekdays,d=u({a:l[g].substr(0,3),A:l[g],d:Ja(h),e:h,w:g,b:j.shortMonths[i],B:j.months[i],m:Ja(i+1),y:k.toString().substr(2,2),Y:k,H:Ja(f),k:f,I:Ja(f%12||12),l:f%12||12,M:Ja(d[tb]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:Ja(d.getSeconds()),L:Ja(A(b%1E3),3)},B.dateFormats);for(e in d){for(;a.indexOf("%"+e)!==-1;){a=a.replace("%"+e,typeof d[e]==="function"?d[e](b):d[e]);}}return c?a.substr(0,1).toUpperCase()+a.substr(1):a;};G={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};B.numberFormat=function(a,b,c,d){var a=+a||0,e=N.lang,f=(a.toString().split(".")[1]||"").length,g,h,i=Math.abs(a);b===-1?b=Math.min(f,20):isNaN(b)&&(b=2);g=String(C(i.toFixed(b)));h=g.length>3?g.length%3:0;c=p(c,e.decimalPoint);d=p(d,e.thousandsSep);a=a<0?"-":"";a+=h?g.substr(0,h)+d:"";a+=g.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+d);+b&&(d=Math.abs(i-g+Math.pow(10,-Math.max(b,f)-1)),a+=c+d.toFixed(b).slice(2));return a;};Math.easeInOutSine=function(a){return -0.5*(Math.cos(Math.PI*a)-1);};_ja2=function ja(a,b){var c;if(b==="width")return Math.min(a.offsetWidth,a.scrollWidth)-_ja2(a,"padding-left")-_ja2(a,"padding-right");else if(b==="height")return Math.min(a.offsetHeight,a.scrollHeight)-_ja2(a,"padding-top")-_ja2(a,"padding-bottom");return (c=E.getComputedStyle(a,void 0))&&C(c.getPropertyValue(b));};sa=function sa(a,b){return b.indexOf?b.indexOf(a):[].indexOf.call(b,a);};Na=function Na(a,b){return [].filter.call(a,b);};Ba=function Ba(a,b){for(var c=[],d=0,e=a.length;d<e;d++){c[d]=b.call(a[d],a[d],d,a);}return c;};Ab=function Ab(a){var b=y.documentElement,a=a.getBoundingClientRect();return {top:a.top+(E.pageYOffset||b.scrollTop)-(b.clientTop||0),left:a.left+(E.pageXOffset||b.scrollLeft)-(b.clientLeft||0)};};Oa=function Oa(a){for(var b=Ga.length;b--;){if(Ga[b].elem===a)Ga[b].stopped=!0;}};o=function o(a,b){return Array.prototype.forEach.call(a,b);};M=function M(a,b,c){function d(b){b.target=b.srcElement||E;c.call(a,b);}var e=a.hcEvents=a.hcEvents||{};if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent){if(!a.hcEventsIE)a.hcEventsIE={};a.hcEventsIE[c.toString()]=d;a.attachEvent("on"+b,d);}e[b]||(e[b]=[]);e[b].push(c);};V=function V(a,b,c){function d(b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.attachEvent&&(c=a.hcEventsIE[c.toString()],a.detachEvent("on"+b,c));}function e(){var c,e,f;if(a.nodeName)for(f in b?(c={},c[b]=!0):c=g,c){if(g[f])for(e=g[f].length;e--;){d(f,g[f][e]);}}}var f,g=a.hcEvents,h;if(g)b?(f=g[b]||[],c?(h=sa(c,f),h>-1&&(f.splice(h,1),g[b]=f),d(b,c)):(e(),g[b]=[])):(e(),a.hcEvents={});};H=function H(a,b,c,d){var e;e=a.hcEvents;var f,g,h,i,c=c||{};if(y.createEvent&&(a.dispatchEvent||a.fireEvent))e=y.createEvent("Events"),e.initEvent(b,!0,!0),e.target=a,u(e,c),a.dispatchEvent?a.dispatchEvent(e):a.fireEvent(b,e);else if(e){e=e[b]||[];f=e.length;h=function h(){c.defaultPrevented=!0;};for(g=0;g<f;g++){i=e[g];if(c.stopped)return;c.preventDefault=h;c.target=a;if(!c.type)c.type=b;i.call(a,c)===!1&&c.preventDefault();}}d&&!c.defaultPrevented&&d(c);};Wa=function Wa(a,b,c){var d,e="",f,g,h;Y(c)||(d=arguments,c={duration:d[2],easing:d[3],complete:d[4]});if(!ma(c.duration))c.duration=400;c.easing=Math[c.easing]||Math.easeInOutSine;c.curAnim=D(b);for(h in b){g=new pb(a,c,h),f=null,h==="d"?(g.paths=g.initPath(a,a.d,b.d),g.toD=b.d,d=0,f=1):a.attr?d=a.attr(h):(d=parseFloat(_ja2(a,h))||0,h!=="opacity"&&(e="px")),f||(f=b[h]),f.match&&f.match("px")&&(f=f.replace(/px/g,"")),g.run(d,f,e);}};if(E.jQuery)E.jQuery.fn.highcharts=function(){var a=[].slice.call(arguments);if(this[0])return a[0]?(new B[xa(a[0])?a.shift():"Chart"](this[0],a[0],a[1]),this):S[K(this[0],"data-highcharts-chart")];};y&&!y.defaultView&&(_ja2=function _ja(a,b){var c;c={width:"clientWidth",height:"clientHeight"}[b];if(a.style[b])return C(a.style[b]);b==="opacity"&&(b="filter");if(c)return a.style.zoom=1,a[c]-2*_ja2(a,"padding");c=a.currentStyle[b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase();})];b==="filter"&&(c=c.replace(/alpha\(opacity=([0-9]+)\)/,function(a,b){return b/100;}));return c===""?1:C(c);});Array.prototype.forEach||(o=function o(a,b){for(var c=0,d=a.length;c<d;c++){if(b.call(a[c],a[c],c,a)===!1)return c;}});Array.prototype.indexOf||(sa=function sa(a,b){var c,d=0;if(b)for(c=b.length;d<c;d++){if(b[d]===a)return d;}return -1;});Array.prototype.filter||(Na=function Na(a,b){for(var c=[],d=0,e=a.length;d<e;d++){b(a[d],d)&&c.push(a[d]);}return c;});B.Fx=pb;B.inArray=sa;B.each=o;B.grep=Na;B.offset=Ab;B.map=Ba;B.addEvent=M;B.removeEvent=V;B.fireEvent=H;B.animate=Wa;B.stop=Oa;N={colors:"#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#2b908f,#f45b5b,#91e8e1".split(","),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,canvasToolsURL:"http://code.highcharts.com/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/4.2.3/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#333333",fontSize:"18px"}},subtitle:{text:"",align:"center",style:{color:"#555555"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0,lineWidthPlus:1,radiusPlus:2},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function formatter(){return this.y===null?"":B.numberFormat(this.y,-1);},style:{color:"contrast",fontSize:"11px",fontWeight:"bold",textShadow:"0 0 6px contrast, 0 0 3px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:0.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function labelFormatter(){return this.name;},borderColor:"#909090",borderRadius:0,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:!1,itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:ca,backgroundColor:"rgba(249, 249, 249, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:"<span style=\"color:{point.color}\">●</span> {series.name}: <b>{point.y}</b><br/>",shadow:!0,snap:Mb?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var aa=N.plotOptions,da=aa.line;Fb();ia.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function parse(a){return [C(a[1]),C(a[2]),C(a[3]),parseFloat(a[4],10)];}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function parse(a){return [C(a[1],16),C(a[2],16),C(a[3],16),1];}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function parse(a){return [C(a[1]),C(a[2]),C(a[3]),1];}}],init:function init(a){var b,c,d,e;if((this.input=a)&&a.stops)this.stops=Ba(a.stops,function(a){return new ia(a[1]);});else for(d=this.parsers.length;d--&&!c;){e=this.parsers[d],(b=e.regex.exec(a))&&(c=e.parse(b));}this.rgba=c||[];},get:function get(a){var b=this.input,c=this.rgba,d;this.stops?(d=D(b),d.stops=[].concat(d.stops),o(this.stops,function(b,c){d.stops[c]=[d.stops[c][0],b.get(a)];})):d=c&&!isNaN(c[0])?a==="rgb"||!a&&c[3]===1?"rgb("+c[0]+","+c[1]+","+c[2]+")":a==="a"?c[3]:"rgba("+c.join(",")+")":b;return d;},brighten:function brighten(a){var b,c=this.rgba;if(this.stops)o(this.stops,function(b){b.brighten(a);});else if(ma(a)&&a!==0)for(b=0;b<3;b++){c[b]+=C(a*255),c[b]<0&&(c[b]=0),c[b]>255&&(c[b]=255);}return this;},setOpacity:function setOpacity(a){this.rgba[3]=a;return this;}};O.prototype={opacity:1,textProps:"direction,fontSize,fontWeight,fontFamily,fontStyle,color,lineHeight,width,textDecoration,textOverflow,textShadow".split(","),init:function init(a,b){this.element=b==="span"?Z(b):y.createElementNS(Fa,b);this.renderer=a;},animate:function animate(a,b,c){b=p(b,this.renderer.globalAnimation,!0);Oa(this);if(b){b=D(b,{});if(c)b.complete=c;Wa(this,a,b);}else this.attr(a,null,c);return this;},colorGradient:function colorGradient(a,b,c){var d=this.renderer,e,f,g,h,i,k,j,l,m,n,r,s=[],p;a.linearGradient?f="linearGradient":a.radialGradient&&(f="radialGradient");if(f){g=a[f];i=d.gradients;j=a.stops;n=c.radialReference;Ia(g)&&(a[f]=g={x1:g[0],y1:g[1],x2:g[2],y2:g[3],gradientUnits:"userSpaceOnUse"});f==="radialGradient"&&n&&!q(g.gradientUnits)&&(h=g,g=D(g,d.getRadialAttr(n,h),{gradientUnits:"userSpaceOnUse"}));for(r in g){r!=="id"&&s.push(r,g[r]);}for(r in j){s.push(j[r]);}s=s.join(",");i[s]?n=i[s].attr("id"):(g.id=n="highcharts-"+zb++,i[s]=k=d.createElement(f).attr(g).add(d.defs),k.radAttr=h,k.stops=[],o(j,function(a){a[1].indexOf("rgba")===0?(e=ia(a[1]),l=e.get("rgb"),m=e.get("a")):(l=a[1],m=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":l,"stop-opacity":m}).add(k);k.stops.push(a);}));p="url("+d.url+"#"+n+")";c.setAttribute(b,p);c.gradient=s;a.toString=function(){return p;};}},applyTextShadow:function applyTextShadow(a){var b=this.element,c,d=a.indexOf("contrast")!==-1,e={},f=this.renderer.forExport,g=f||b.style.textShadow!==z&&!ya;if(d)e.textShadow=a=a.replace(/contrast/g,this.renderer.getContrast(b.style.fill));if(mb||f)e.textRendering="geometricPrecision";g?this.css(e):(this.fakeTS=!0,this.ySetter=this.xSetter,c=[].slice.call(b.getElementsByTagName("tspan")),o(a.split(/\s?,\s?/g),function(a){var d=b.firstChild,e,f,a=a.split(" ");e=a[a.length-1];(f=a[a.length-2])&&o(c,function(a,c){var g;c===0&&(a.setAttribute("x",b.getAttribute("x")),c=b.getAttribute("y"),a.setAttribute("y",c||0),c===null&&b.setAttribute("y",0));g=a.cloneNode(1);K(g,{"class":"highcharts-text-shadow",fill:e,stroke:e,"stroke-opacity":1/t(C(f),3),"stroke-width":f,"stroke-linejoin":"round"});b.insertBefore(g,d);});}));},attr:function attr(a,b,c){var d,e=this.element,f,g=this,h;typeof a==="string"&&b!==z&&(d=a,a={},a[d]=b);if(typeof a==="string")g=(this[a+"Getter"]||this._defaultGetter).call(this,a,e);else {for(d in a){b=a[d];h=!1;this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(d)&&(f||(this.symbolAttr(a),f=!0),h=!0);if(this.rotation&&(d==="x"||d==="y"))this.doTransform=!0;h||(h=this[d+"Setter"]||this._defaultSetter,h.call(this,b,d,e),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d)&&this.updateShadows(d,b,h));}if(this.doTransform)this.updateTransform(),this.doTransform=!1;}c&&c();return g;},updateShadows:function updateShadows(a,b,c){for(var d=this.shadows,e=d.length;e--;){c.call(null,a==="height"?Math.max(b-(d[e].cutHeight||0),0):a==="d"?this.d:b,a,d[e]);}},addClass:function addClass(a){var b=this.element,c=K(b,"class")||"";c.indexOf(a)===-1&&K(b,"class",c+" "+a);return this;},symbolAttr:function symbolAttr(a){var b=this;o("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=p(a[c],b[c]);});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)});},clip:function clip(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none");},crisp:function crisp(a){var b,c={},d,e=this.strokeWidth||0;d=A(e)%2/2;a.x=T(a.x||this.x||0)+d;a.y=T(a.y||this.y||0)+d;a.width=T((a.width||this.width||0)-2*d);a.height=T((a.height||this.height||0)-2*d);a.strokeWidth=e;for(b in a){this[b]!==a[b]&&(this[b]=c[b]=a[b]);}return c;},css:function css(a){var b=this.styles,c={},d=this.element,e,f,g="";e=!b;if(a&&a.color)a.fill=a.color;if(b)for(f in a){a[f]!==b[f]&&(c[f]=a[f],e=!0);}if(e){e=this.textWidth=a&&a.width&&d.nodeName.toLowerCase()==="text"&&C(a.width)||this.textWidth;b&&(a=u(b,c));this.styles=a;e&&(ha||!ca&&this.renderer.forExport)&&delete a.width;if(ya&&!ca)L(this.element,a);else {b=function b(a,_b){return "-"+_b.toLowerCase();};for(f in a){g+=f.replace(/([A-Z])/g,b)+":"+a[f]+";";}K(d,"style",g);}e&&this.added&&this.renderer.buildText(this);}return this;},on:function on(a,b){var c=this,d=c.element;db&&a==="click"?(d.ontouchstart=function(a){c.touchEventFired=qa.now();a.preventDefault();b.call(d,a);},d.onclick=function(a){(za.indexOf("Android")===-1||qa.now()-(c.touchEventFired||0)>1100)&&b.call(d,a);}):d["on"+a]=b;return this;},setRadialReference:function setRadialReference(a){var b=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this;},translate:function translate(a,b){return this.attr({translateX:a,translateY:b});},invert:function invert(){this.inverted=!0;this.updateTransform();return this;},updateTransform:function updateTransform(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,d=this.scaleY,e=this.inverted,f=this.rotation,g=this.element;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(g.getAttribute("x")||0)+" "+(g.getAttribute("y")||0)+")");(q(c)||q(d))&&a.push("scale("+p(c,1)+" "+p(d,1)+")");a.length&&g.setAttribute("transform",a.join(" "));},toFront:function toFront(){var a=this.element;a.parentNode.appendChild(a);return this;},align:function align(a,b,c){var d,e,f,g,h={};e=this.renderer;f=e.alignedObjects;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||xa(c))this.alignTo=d=c||"renderer",oa(f,this),f.push(this),c=null;}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=p(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||0)+(a.x||0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=A(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=A(g);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this;},getBBox:function getBBox(a,b){var c,d=this.renderer,e,f,g,h=this.element,i=this.styles;e=this.textStr;var k,j=h.style,l,m=d.cache,n=d.cacheKeys,r;f=p(b,this.rotation);g=f*ga;e!==z&&(r=["",f||0,i&&i.fontSize,h.style.width].join(","),r=e===""||Rb.test(e)?"num:"+e.toString().length+r:e+r);r&&!a&&(c=m[r]);if(!c){if(h.namespaceURI===Fa||d.forExport){try{l=this.fakeTS&&function(a){o(h.querySelectorAll(".highcharts-text-shadow"),function(b){b.style.display=a;});},Ma&&j.textShadow?(k=j.textShadow,j.textShadow=""):l&&l("none"),c=h.getBBox?u({},h.getBBox()):{width:h.offsetWidth,height:h.offsetHeight},k?j.textShadow=k:l&&l("");}catch(s){}if(!c||c.width<0)c={width:0,height:0};}else c=this.htmlGetBBox();if(d.isSVG){d=c.width;e=c.height;if(ya&&i&&i.fontSize==="11px"&&e.toPrecision(3)==="16.9")c.height=e=14;if(f)c.width=P(e*$(g))+P(d*U(g)),c.height=P(e*U(g))+P(d*$(g));}if(r){for(;n.length>250;){delete m[n.shift()];}m[r]||n.push(r);m[r]=c;}}return c;},show:function show(a){return this.attr({visibility:a?"inherit":"visible"});},hide:function hide(){return this.attr({visibility:"hidden"});},fadeOut:function fadeOut(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function complete(){b.attr({y:-9999});}});},add:function add(a){var b=this.renderer,c=this.element,d;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==void 0&&b.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)d=this.zIndexSetter();d||(a?a.element:b.box).appendChild(c);if(this.onAdd)this.onAdd();return this;},safeRemoveChild:function safeRemoveChild(a){var b=a.parentNode;b&&b.removeChild(a);},destroy:function destroy(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&a.parentGroup,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;Oa(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=0;f<a.stops.length;f++){a.stops[f]=a.stops[f].destroy();}a.stops=null;}a.safeRemoveChild(b);for(c&&o(c,function(b){a.safeRemoveChild(b);});d&&d.div&&d.div.childNodes.length===0;){b=d.parentGroup,a.safeRemoveChild(d.div),delete d.div,d=b;}a.alignTo&&oa(a.renderer.alignedObjects,a);for(e in a){delete a[e];}return null;},shadow:function shadow(a,b,c){var d=[],e,f,g=this.element,h,i,k,j;if(a){i=p(a.width,3);k=(a.opacity||0.15)/i;j=this.parentInverted?"(-1,-1)":"("+p(a.offsetX,1)+", "+p(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;K(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":k*e,"stroke-width":h,transform:"translate"+j,fill:"none"});if(c)K(f,"height",t(K(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):g.parentNode.insertBefore(f,g);d.push(f);}this.shadows=d;}return this;},xGetter:function xGetter(a){this.element.nodeName==="circle"&&(a={x:"cx",y:"cy"}[a]||a);return this._defaultGetter(a);},_defaultGetter:function _defaultGetter(a){a=p(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a;},dSetter:function dSetter(a,b,c){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");c.setAttribute(b,a);this[b]=a;},dashstyleSetter:function dashstyleSetter(a){var b;if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;){a[b]=C(a[b])*this["stroke-width"];}a=a.join(",").replace("NaN","none");this.element.setAttribute("stroke-dasharray",a);}},alignSetter:function alignSetter(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a]);},opacitySetter:function opacitySetter(a,b,c){this[b]=a;c.setAttribute(b,a);},titleSetter:function titleSetter(a){var b=this.element.getElementsByTagName("title")[0];b||(b=y.createElementNS(Fa,"title"),this.element.appendChild(b));b.appendChild(y.createTextNode(String(p(a),"").replace(/<[^>]*>/g,"")));},textSetter:function textSetter(a){if(a!==this.textStr)delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this);},fillSetter:function fillSetter(a,b,c){typeof a==="string"?c.setAttribute(b,a):a&&this.colorGradient(a,b,c);},visibilitySetter:function visibilitySetter(a,b,c){a==="inherit"?c.removeAttribute(b):c.setAttribute(b,a);},zIndexSetter:function zIndexSetter(a,b){var c=this.renderer,d=this.parentGroup,c=(d||c).element||c.box,e,f,g=this.element,h;e=this.added;var i;q(a)&&(g.setAttribute(b,a),a=+a,this[b]===a&&(e=!1),this[b]=a);if(e){if((a=this.zIndex)&&d)d.handleZ=!0;d=c.childNodes;for(i=0;i<d.length&&!h;i++){if(e=d[i],f=K(e,"zIndex"),e!==g&&(C(f)>a||!q(a)&&q(f)))c.insertBefore(g,e),h=!0;}h||c.appendChild(g);}return h;},_defaultSetter:function _defaultSetter(a,b,c){c.setAttribute(b,a);}};O.prototype.yGetter=O.prototype.xGetter;O.prototype.translateXSetter=O.prototype.translateYSetter=O.prototype.rotationSetter=O.prototype.verticalAlignSetter=O.prototype.scaleXSetter=O.prototype.scaleYSetter=function(a,b){this[b]=a;this.doTransform=!0;};O.prototype["stroke-widthSetter"]=O.prototype.strokeSetter=function(a,b,c){this[b]=a;if(this.stroke&&this["stroke-width"])this.strokeWidth=this["stroke-width"],O.prototype.fillSetter.call(this,this.stroke,"stroke",c),c.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0;else if(b==="stroke-width"&&a===0&&this.hasStroke)c.removeAttribute("stroke"),this.hasStroke=!1;};var Ca=function Ca(){this.init.apply(this,arguments);};Ca.prototype={Element:O,init:function init(a,b,c,d,e,f){var g,d=this.createElement("svg").attr({version:"1.1"}).css(this.getStyle(d));g=d.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&K(g,"xmlns",Fa);this.isSVG=!0;this.box=g;this.boxWrapper=d;this.alignedObjects=[];this.url=(Ma||mb)&&y.getElementsByTagName("base").length?E.location.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 4.2.3"));this.defs=this.createElement("defs").add();this.allowHTML=f;this.forExport=e;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);var h;if(Ma&&a.getBoundingClientRect)this.subPixelFix=b=function b(){L(a,{left:0,top:0});h=a.getBoundingClientRect();L(a,{left:ua(h.left)-h.left+"px",top:ua(h.top)-h.top+"px"});},b(),M(E,"resize",b);},getStyle:function getStyle(a){return this.style=u({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a);},isHidden:function isHidden(){return !this.boxWrapper.getBBox().width;},destroy:function destroy(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Sa(this.gradients||{});this.gradients=null;if(a)this.defs=a.destroy();this.subPixelFix&&V(E,"resize",this.subPixelFix);return this.alignedObjects=null;},createElement:function createElement(a){var b=new this.Element();b.init(this,a);return b;},draw:function draw(){},getRadialAttr:function getRadialAttr(a,b){return {cx:a[0]-a[2]/2+b.cx*a[2],cy:a[1]-a[2]/2+b.cy*a[2],r:b.r*a[2]};},buildText:function buildText(a){for(var b=a.element,c=this,d=c.forExport,e=p(a.textStr,"").toString(),f=e.indexOf("<")!==-1,g=b.childNodes,h,i,k=K(b,"x"),j=a.styles,l=a.textWidth,m=j&&j.lineHeight,n=j&&j.textShadow,r=j&&j.textOverflow==="ellipsis",s=g.length,R=l&&!a.added&&this.box,v=function v(a){return m?C(m):c.fontMetrics(/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:j&&j.fontSize||c.style.fontSize||12,a).h;},x=function x(a){return a.replace(/&lt;/g,"<").replace(/&gt;/g,">");};s--;){b.removeChild(g[s]);}!f&&!n&&!r&&e.indexOf(" ")===-1?b.appendChild(y.createTextNode(x(e))):(h=/<.*style="([^"]+)".*>/,i=/<.*href="(http[^"]+)".*>/,R&&R.appendChild(b),e=f?e.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g):[e],e[e.length-1]===""&&e.pop(),o(e,function(e,f){var g,m=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");g=e.split("|||");o(g,function(e){if(e!==""||g.length===1){var n={},s=y.createElementNS(Fa,"tspan"),p;h.test(e)&&(p=e.match(h)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),K(s,"style",p));i.test(e)&&!d&&(K(s,"onclick",'location.href="'+e.match(i)[1]+'"'),L(s,{cursor:"pointer"}));e=x(e.replace(/<(.|\n)*?>/g,"")||" ");if(e!==" "){s.appendChild(y.createTextNode(e));if(m)n.dx=0;else if(f&&k!==null)n.x=k;K(s,n);b.appendChild(s);!m&&f&&(!ca&&d&&L(s,{display:"block"}),K(s,"dy",v(s)));if(l){for(var n=e.replace(/([^\^])-/g,"$1- ").split(" "),R=g.length>1||f||n.length>1&&j.whiteSpace!=="nowrap",o,w,q,t=[],u=v(s),A=1,z=a.rotation,B=e,D=B.length;(R||r)&&(n.length||t.length);){a.rotation=0,o=a.getBBox(!0),q=o.width,!ca&&c.forExport&&(q=c.measureSpanWidth(s.firstChild.data,a.styles)),o=q>l,w===void 0&&(w=o),r&&w?(D/=2,B===""||!o&&D<0.5?n=[]:(o&&(w=!0),B=e.substring(0,B.length+(o?-1:1)*ua(D)),n=[B+(l>3?"…":"")],s.removeChild(s.firstChild))):!o||n.length===1?(n=t,t=[],n.length&&(A++,s=y.createElementNS(Fa,"tspan"),K(s,{dy:u,x:k}),p&&K(s,"style",p),b.appendChild(s)),q>l&&(l=q)):(s.removeChild(s.firstChild),t.unshift(n.pop())),n.length&&s.appendChild(y.createTextNode(n.join(" ").replace(/- /g,"-")));}w&&a.attr("title",a.textStr);a.rotation=z;}m++;}}});}),R&&R.removeChild(b),n&&a.applyTextShadow&&a.applyTextShadow(n));},getContrast:function getContrast(a){a=ia(a).rgba;return a[0]+a[1]+a[2]>384?"#000000":"#FFFFFF";},button:function button(a,b,c,d,e,f,g,h,i){var k=this.label(a,b,c,i,null,null,null,null,"button"),j=0,l,m,n,r,s,p,a={x1:0,y1:0,x2:0,y2:1},e=D({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},e);n=e.style;delete e.style;f=D(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);r=f.style;delete f.style;g=D(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);s=g.style;delete g.style;h=D(e,{style:{color:"#CCC"}},h);p=h.style;delete h.style;M(k.element,ya?"mouseover":"mouseenter",function(){j!==3&&k.attr(f).css(r);});M(k.element,ya?"mouseout":"mouseleave",function(){j!==3&&(l=[e,f,g][j],m=[n,r,s][j],k.attr(l).css(m));});k.setState=function(a){(k.state=j=a)?a===2?k.attr(g).css(s):a===3&&k.attr(h).css(p):k.attr(e).css(n);};return k.on("click",function(a){j!==3&&d.call(k,a);}).attr(e).css(u({cursor:"default"},n));},crispLine:function crispLine(a,b){a[1]===a[4]&&(a[1]=a[4]=A(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=A(a[2])+b%2/2);return a;},path:function path(a){var b={fill:"none"};Ia(a)?b.d=a:Y(a)&&u(b,a);return this.createElement("path").attr(b);},circle:function circle(a,b,c){a=Y(a)?a:{x:a,y:b,r:c};b=this.createElement("circle");b.xSetter=b.ySetter=function(a,b,c){c.setAttribute("c"+b,a);};return b.attr(a);},arc:function arc(a,b,c,d,e,f){if(Y(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0});a.r=c;return a;},rect:function rect(a,b,c,d,e,f){var e=Y(a)?a.r:e,g=this.createElement("rect"),a=Y(a)?a:a===z?{}:{x:a,y:b,width:t(c,0),height:t(d,0)};if(f!==z)g.strokeWidth=f,a=g.crisp(a);if(e)a.r=e;g.rSetter=function(a,b,c){K(c,{rx:a,ry:a});};return g.attr(a);},setSize:function setSize(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[p(c,!0)?"animate":"attr"]({width:a,height:b});e--;){d[e].align();}},g:function g(a){var b=this.createElement("g");return q(a)?b.attr({"class":"highcharts-"+a}):b;},image:function image(a,b,c,d,e){var f={preserveAspectRatio:"none"};arguments.length>1&&u(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f;},symbol:function symbol(a,b,c,d,e,f){var g=this,h,i=this.symbols[a],i=i&&i(A(b),A(c),d,e,f),k=/^url\((.*?)\)$/,j,l;if(i)h=this.path(i),u(h,{symbolName:a,x:b,y:c,width:d,height:e}),f&&u(h,f);else if(k.test(a))l=function l(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(A((d-b[0])/2),A((e-b[1])/2)));},j=a.match(k)[1],a=Nb[j]||f&&f.width&&f.height&&[f.width,f.height],h=this.image(j).attr({x:b,y:c}),h.isImg=!0,a?l(h,a):(h.attr({width:0,height:0}),Z("img",{onload:function onload(){this.width===0&&(L(this,{position:"absolute",top:"-999em"}),y.body.appendChild(this));l(h,Nb[j]=[this.width,this.height]);this.parentNode&&this.parentNode.removeChild(this);g.imgCount--;if(!g.imgCount)S[g.chartIndex].onload();},src:j})),this.imgCount++;return h;},symbols:{circle:function circle(a,b,c,d){var e=0.166*c;return ["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"];},square:function square(a,b,c,d){return ["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"];},triangle:function triangle(a,b,c,d){return ["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"];},"triangle-down":function triangleDown(a,b,c,d){return ["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"];},diamond:function diamond(a,b,c,d){return ["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"];},arc:function arc(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=U(f),k=$(f),j=U(g),g=$(g),e=e.end-f<ra?0:1;return ["M",a+c*i,b+c*k,"A",c,c,0,e,1,a+c*j,b+c*g,h?"M":"L",a+d*j,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*k,h?"":"Z"];},callout:function callout(a,b,c,d,e){var f=F(e&&e.r||0,c,d),g=f+6,h=e&&e.anchorX,e=e&&e.anchorY,i;i=["M",a+f,b,"L",a+c-f,b,"C",a+c,b,a+c,b,a+c,b+f,"L",a+c,b+d-f,"C",a+c,b+d,a+c,b+d,a+c-f,b+d,"L",a+f,b+d,"C",a,b+d,a,b+d,a,b+d-f,"L",a,b+f,"C",a,b,a,b,a+f,b];h&&h>c&&e>b+g&&e<b+d-g?i.splice(13,3,"L",a+c,e-6,a+c+6,e,a+c,e+6,a+c,b+d-f):h&&h<0&&e>b+g&&e<b+d-g?i.splice(33,3,"L",a,e+6,a-6,e,a,e-6,a,b+f):e&&e>d&&h>a+g&&h<a+c-g?i.splice(23,3,"L",h+6,b+d,h,b+d+6,h-6,b+d,a+f,b+d):e&&e<0&&h>a+g&&h<a+c-g&&i.splice(3,3,"L",h-6,b,h,b-6,h+6,b,c-f,b);return i;}},clipRect:function clipRect(a,b,c,d){var e="highcharts-"+zb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;a.count=0;return a;},text:function text(a,b,c,d){var e=ha||!ca&&this.forExport,f={};if(d&&(this.allowHTML||!this.forExport))return this.html(a,b,c);f.x=Math.round(b||0);if(c)f.y=Math.round(c);if(a||a===0)f.text=a;a=this.createElement("text").attr(f);e&&a.css({position:"absolute"});if(!d)a.xSetter=function(a,b,c){var d=c.getElementsByTagName("tspan"),e,f=c.getAttribute(b),m;for(m=0;m<d.length;m++){e=d[m],e.getAttribute(b)===f&&e.setAttribute(b,a);}c.setAttribute(b,a);};return a;},fontMetrics:function fontMetrics(a,b){var c,d,a=a||this.style.fontSize;!a&&b&&E.getComputedStyle&&(b=b.element||b,a=(c=E.getComputedStyle(b,""))&&c.fontSize);a=/px/.test(a)?C(a):/em/.test(a)?parseFloat(a)*12:12;c=a<24?a+3:A(a*1.2);d=A(c*0.8);return {h:c,b:d,f:a};},rotCorr:function rotCorr(a,b,c){var d=a;b&&c&&(d=t(d*U(b*ga),4));return {x:-a/3*$(b*ga),y:d};},label:function label(a,b,c,d,e,f,g,h,i){var k=this,j=k.g(i),l=k.text("",0,0,g).attr({zIndex:1}),m,n,r=0,s=3,p=0,v,x,w,t,ba=0,gb={},B,y,Bb,F,E;Bb=function Bb(){var a,b;a=l.element.style;n=(v===void 0||x===void 0||j.styles.textAlign)&&q(l.textStr)&&l.getBBox();j.width=(v||n.width||0)+2*s+p;j.height=(x||n.height||0)+2*s;B=s+k.fontMetrics(a&&a.fontSize,l).b;if(y){if(!m)a=ba,b=(h?-B:0)+ba,j.box=m=d?k.symbol(d,a,b,j.width,j.height,gb):k.rect(a,b,j.width,j.height,0,gb["stroke-width"]),m.isImg||m.attr("fill","none"),m.add(j);m.isImg||m.attr(u({width:A(j.width),height:A(j.height)},gb));gb=null;}};F=function F(){var a=j.styles,a=a&&a.textAlign,b=p+s,c;c=h?0:B;if(q(v)&&n&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(v-n.width);if(b!==l.x||c!==l.y)l.attr("x",b),c!==z&&l.attr("y",c);l.x=b;l.y=c;};E=function E(a,b){m?m.attr(a,b):gb[a]=b;};j.onAdd=function(){l.add(j);j.attr({text:a||a===0?a:"",x:b,y:c});m&&q(e)&&j.attr({anchorX:e,anchorY:f});};j.widthSetter=function(a){v=a;};j.heightSetter=function(a){x=a;};j.paddingSetter=function(a){if(q(a)&&a!==s)s=j.padding=a,F();};j.paddingLeftSetter=function(a){q(a)&&a!==p&&(p=a,F());};j.alignSetter=function(a){a={left:0,center:0.5,right:1}[a];a!==r&&(r=a,n&&j.attr({x:b}));};j.textSetter=function(a){a!==z&&l.textSetter(a);Bb();F();};j["stroke-widthSetter"]=function(a,b){a&&(y=!0);ba=a%2/2;E(b,a);};j.strokeSetter=j.fillSetter=j.rSetter=function(a,b){b==="fill"&&a&&(y=!0);E(b,a);};j.anchorXSetter=function(a,b){e=a;E(b,A(a)-ba-w);};j.anchorYSetter=function(a,b){f=a;E(b,a-t);};j.xSetter=function(a){j.x=a;r&&(a-=r*((v||n.width)+2*s));w=A(a);j.attr("translateX",w);};j.ySetter=function(a){t=j.y=A(a);j.attr("translateY",t);};var C=j.css;return u(j,{css:function css(a){if(a){var b={},a=D(a);o(j.textProps,function(c){a[c]!==z&&(b[c]=a[c],delete a[c]);});l.css(b);}return C.call(j,a);},getBBox:function getBBox(){return {width:n.width+2*s,height:n.height+2*s,x:n.x-s,y:n.y-s};},shadow:function shadow(a){m&&m.shadow(a);return j;},destroy:function destroy(){V(j.element,"mouseenter");V(j.element,"mouseleave");l&&(l=l.destroy());m&&(m=m.destroy());O.prototype.destroy.call(j);j=k=Bb=F=E=null;}});}};cb=Ca;u(O.prototype,{htmlCss:function htmlCss(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();if(a&&a.textOverflow==="ellipsis")a.whiteSpace="nowrap",a.overflow="hidden";this.styles=u(this.styles,a);L(this.element,a);return this;},htmlGetBBox:function htmlGetBBox(){var a=this.element;if(a.nodeName==="text")a.style.position="absolute";return {x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight};},htmlUpdateTransform:function htmlUpdateTransform(){if(this.added){var a=this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=this.shadows,k=this.styles;L(b,{marginLeft:c,marginTop:d});i&&o(i,function(a){L(a,{marginLeft:c+1,marginTop:d+1});});this.inverted&&o(b.childNodes,function(c){a.invertChild(c,b);});if(b.tagName==="SPAN"){var i=this.rotation,j=C(this.textWidth),l=k&&k.whiteSpace,m=[i,g,b.innerHTML,this.textWidth,this.textAlign].join(",");if(m!==this.cTT){k=a.fontMetrics(b.style.fontSize).b;q(i)&&this.setSpanRotation(i,h,k);if(b.offsetWidth>j&&/[ \-]/.test(b.textContent||b.innerText))L(b,{width:j+"px",display:"block",whiteSpace:l||"normal"}),this.hasTextWidth=!0;else if(this.hasTextWidth)L(b,{width:"",display:"",whiteSpace:l||"nowrap"}),this.hasTextWidth=!1;this.getSpanCorrection(this.hasTextWidth?j:b.offsetWidth,k,h,i,g);}L(b,{left:e+(this.xCorr||0)+"px",top:f+(this.yCorr||0)+"px"});if(mb)k=b.offsetHeight;this.cTT=m;}}else this.alignOnAdd=!0;},setSpanRotation:function setSpanRotation(a,b,c){var d={},e=ya?"-ms-transform":mb?"-webkit-transform":Ma?"MozTransform":Lb?"-o-transform":"";d[e]=d.transform="rotate("+a+"deg)";d[e+(Ma?"Origin":"-origin")]=d.transformOrigin=b*100+"% "+c+"px";L(this.element,d);},getSpanCorrection:function getSpanCorrection(a,b,c){this.xCorr=-a*c;this.yCorr=-b;}});u(Ca.prototype,{html:function html(a,b,c){var d=this.createElement("span"),e=d.element,f=d.renderer,g=function g(a,b){o(["opacity","visibility"],function(c){fb(a,c+"Setter",function(a,c,d,e){a.call(this,c,d,e);b[d]=c;});});};d.textSetter=function(a){a!==e.innerHTML&&delete this.bBox;e.innerHTML=this.textStr=a;d.htmlUpdateTransform();};g(d,d.element.style);d.xSetter=d.ySetter=d.alignSetter=d.rotationSetter=function(a,b){b==="align"&&(b="textAlign");d[b]=a;d.htmlUpdateTransform();};d.attr({text:a,x:A(b),y:A(c)}).css({position:"absolute",fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});e.style.whiteSpace="nowrap";d.css=d.htmlCss;if(f.isSVG)d.add=function(a){var b,c=f.box.parentNode,j=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;){j.push(a),a=a.parentGroup;}o(j.reverse(),function(a){var d,e=K(a.element,"class");e&&(e={className:e});b=a.div=a.div||Z(La,e,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;u(a,{translateXSetter:function translateXSetter(b,c){d.left=b+"px";a[c]=b;a.doTransform=!0;},translateYSetter:function translateYSetter(b,c){d.top=b+"px";a[c]=b;a.doTransform=!0;}});g(a,d);});}}else b=c;b.appendChild(e);d.added=!0;d.alignOnAdd&&d.htmlUpdateTransform();return d;};return d;}});var J;if(!ca&&!ha){J={init:function init(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===La;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=Z(c);this.renderer=a;},add:function add(a){var b=this.renderer,c=this.element,d=b.box,e=a&&a.inverted,d=a?a.element||a:d;if(a)this.parentGroup=a;e&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();return this;},updateTransform:O.prototype.htmlUpdateTransform,setSpanRotation:function setSpanRotation(){var a=this.rotation,b=U(a*ga),c=$(a*ga);L(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",b,", M12=",-c,", M21=",c,", M22=",b,", sizingMethod='auto expand')"].join(""):"none"});},getSpanCorrection:function getSpanCorrection(a,b,c,d,e){var f=d?U(d*ga):1,g=d?$(d*ga):0,h=p(this.elemHeight,this.element.offsetHeight),i;this.xCorr=f<0&&-a;this.yCorr=g<0&&-h;i=f*g<0;this.xCorr+=g*b*(i?1-c:c);this.yCorr-=f*b*(d?i?c:1-c:1);e&&e!=="left"&&(this.xCorr-=a*c*(f<0?-1:1),d&&(this.yCorr-=h*c*(g<0?-1:1)),L(this.element,{textAlign:e}));},pathToVML:function pathToVML(a){for(var b=a.length,c=[];b--;){if(ma(a[b]))c[b]=A(a[b]*10)-5;else if(a[b]==="Z")c[b]="x";else if(c[b]=a[b],a.isArc&&(a[b]==="wa"||a[b]==="at"))c[b+5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1);}return c.join(" ")||"x";},clip:function clip(a){var b=this,c;a?(c=a.members,oa(c,b),c.push(b),b.destroyClip=function(){oa(c,b);},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:lb?"inherit":"rect(auto)"});return b.css(a);},css:O.prototype.htmlCss,safeRemoveChild:function safeRemoveChild(a){a.parentNode&&Ta(a);},destroy:function destroy(){this.destroyClip&&this.destroyClip();return O.prototype.destroy.apply(this);},on:function on(a,b){this.element["on"+a]=function(){var a=E.event;a.target=a.srcElement;b(a);};return this;},cutOffPath:function cutOffPath(a,b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=C(a[c-2])-10*b;return a.join(" ");},shadow:function shadow(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,k,j=f.path,l,m,n,r;j&&typeof j.value!=="string"&&(j="x");m=j;if(a){n=p(a.width,3);r=(a.opacity||0.15)/n;for(e=1;e<=3;e++){l=n*2+1-2*e;c&&(m=this.cutOffPath(j.value,l+0.5));k=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=Z(g.prepVML(k),null,{left:C(i.left)+p(a.offsetX,1),top:C(i.top)+p(a.offsetY,1)});if(c)h.cutOff=l+1;k=['<stroke color="',a.color||"black",'" opacity="',r*e,'"/>'];Z(g.prepVML(k),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);d.push(h);}this.shadows=d;}return this;},updateShadows:Aa,setAttr:function setAttr(a,b){lb?this.element[a]=b:this.element.setAttribute(a,b);},classSetter:function classSetter(a){this.element.className=a;},dashstyleSetter:function dashstyleSetter(a,b,c){(c.getElementsByTagName("stroke")[0]||Z(this.renderer.prepVML(["<stroke/>"]),null,null,c))[b]=a||"solid";this[b]=a;},dSetter:function dSetter(a,b,c){var d=this.shadows,a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(d)for(c=d.length;c--;){d[c].path=d[c].cutOff?this.cutOffPath(a,d[c].cutOff):a;}this.setAttr(b,a);},fillSetter:function fillSetter(a,b,c){var d=c.nodeName;if(d==="SPAN")c.style.color=a;else if(d!=="IMG")c.filled=a!=="none",this.setAttr("fillcolor",this.renderer.color(a,c,b,this));},"fill-opacitySetter":function fillOpacitySetter(a,b,c){Z(this.renderer.prepVML(["<",b.split("-")[0],' opacity="',a,'"/>']),null,null,c);},opacitySetter:Aa,rotationSetter:function rotationSetter(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-A($(a*ga)+1)+"px";c.top=A(U(a*ga))+"px";},strokeSetter:function strokeSetter(a,b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b,this));},"stroke-widthSetter":function strokeWidthSetter(a,b,c){c.stroked=!!a;this[b]=a;ma(a)&&(a+="px");this.setAttr("strokeweight",a);},titleSetter:function titleSetter(a,b){this.setAttr(b,a);},visibilitySetter:function visibilitySetter(a,b,c){a==="inherit"&&(a="visible");this.shadows&&o(this.shadows,function(c){c.style[b]=a;});c.nodeName==="DIV"&&(a=a==="hidden"?"-999em":0,lb||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a;},xSetter:function xSetter(a,b,c){this[b]=a;b==="x"?b="left":b==="y"&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a;},zIndexSetter:function zIndexSetter(a,b,c){c.style[b]=a;}};J["stroke-opacitySetter"]=J["fill-opacitySetter"];B.VMLElement=J=pa(O,J);J.prototype.ySetter=J.prototype.widthSetter=J.prototype.heightSetter=J.prototype.xSetter;var Cb={Element:J,isIE8:za.indexOf("MSIE 8.0")>-1,init:function init(a,b,c,d){var e;this.alignedObjects=[];d=this.createElement(La).css(u(this.getStyle(d),{position:"relative"}));e=d.element;a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=d;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!y.namespaces.hcv){y.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{y.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";}catch(f){y.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";}}},isHidden:function isHidden(){return !this.box.offsetWidth;},clipRect:function clipRect(a,b,c,d){var e=this.createElement(),f=Y(a);return u(e,{members:[],count:0,left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:c)-1,height:(f?a.height:d)-1,getCSS:function getCSS(a){var b=a.element,c=b.nodeName,a=a.inverted,d=this.top-(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+A(a?e:d)+"px,"+A(a?f:b)+"px,"+A(a?b:f)+"px,"+A(a?d:e)+"px)"};!a&&lb&&c==="DIV"&&u(d,{width:b+"px",height:f+"px"});return d;},updateClipping:function updateClipping(){o(e.members,function(a){a.element&&a.css(e.getCSS(a));});}});},color:function color(a,b,c,d){var e=this,f,g=/^rgba/,h,i,k="none";a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var j,l,m=a.linearGradient||a.radialGradient,n,r,s,p,v,x="",a=a.stops,w,q=[],ba=function ba(){h=['<fill colors="'+q.join(",")+'" opacity="',s,'" o:opacity2="',r,'" type="',i,'" ',x,'focus="100%" method="any" />'];Z(e.prepVML(h),null,null,b);};n=a[0];w=a[a.length-1];n[0]>0&&a.unshift([0,n[1]]);w[0]<1&&a.push([1,w[1]]);o(a,function(a,b){g.test(a[1])?(f=ia(a[1]),j=f.get("rgb"),l=f.get("a")):(j=a[1],l=1);q.push(a[0]*100+"% "+j);b?(s=l,p=j):(r=l,v=j);});if(c==="fill"){if(i==="gradient")c=m.x1||m[0]||0,a=m.y1||m[1]||0,n=m.x2||m[2]||0,m=m.y2||m[3]||0,x='angle="'+(90-W.atan((m-a)/(n-c))*180/ra)+'"',ba();else {var k=m.r,t=k*2,u=k*2,A=m.cx,B=m.cy,z=b.radialReference,y,k=function k(){z&&(y=d.getBBox(),A+=(z[0]-y.x)/y.width-0.5,B+=(z[1]-y.y)/y.height-0.5,t*=z[2]/y.width,u*=z[2]/y.height);x='src="'+N.global.VMLRadialGradientURL+'" size="'+t+","+u+'" origin="0.5,0.5" position="'+A+","+B+'" color2="'+v+'" ';ba();};d.added?k():d.onAdd=k;k=p;}}else k=j;}else if(g.test(a)&&b.tagName!=="IMG")f=ia(a),d[c+"-opacitySetter"](f.get("a"),c,b),k=f.get("rgb");else {k=b.getElementsByTagName(c);if(k.length)k[0].opacity=1,k[0].type="solid";k=a;}return k;},prepVML:function prepVML(a){var b=this.isIE8,a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a;},text:Ca.prototype.html,path:function path(a){var b={coordsize:"10 10"};Ia(a)?b.d=a:Y(a)&&u(b,a);return this.createElement("shape").attr(b);},circle:function circle(a,b,c){var d=this.symbol("circle");if(Y(a))c=a.r,b=a.y,a=a.x;d.isCircle=!0;d.r=c;return d.attr({x:a,y:b});},g:function g(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(La).attr(b);},image:function image(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,height:e});return f;},createElement:function createElement(a){return a==="rect"?this.symbol(a):Ca.prototype.createElement.call(this,a);},invertChild:function invertChild(a,b){var c=this,d=b.style,e=a.tagName==="IMG"&&a.style;L(a,{flip:"x",left:C(d.width)-(e?C(e.top):1),top:C(d.height)-(e?C(e.left):1),rotation:-90});o(a.childNodes,function(b){c.invertChild(b,a);});},symbols:{arc:function arc(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=U(f),i=$(f),k=U(g),j=$(g);if(g-f===0)return ["x"];f=["wa",a-h,b-h,a+h,b+h,a+h*d,b+h*i,a+h*k,b+h*j];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*k,b+c*j,a+c*d,b+c*i,"x","e");f.isArc=!0;return f;},circle:function circle(a,b,c,d,e){e&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return ["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"];},rect:function rect(a,b,c,d,e){return Ca.prototype.symbols[!q(e)||!e.r?"square":"callout"].call(0,a,b,c,d,e);}}};B.VMLRenderer=J=function J(){this.init.apply(this,arguments);};J.prototype=D(Ca.prototype,Cb);cb=J;}Ca.prototype.measureSpanWidth=function(a,b){var c=y.createElement("span"),d;d=y.createTextNode(a);c.appendChild(d);L(c,b);this.box.appendChild(c);d=c.offsetWidth;Ta(c);return d;};var Ob;if(ha)B.CanVGRenderer=J=function J(){Fa="http://www.w3.org/1999/xhtml";},J.prototype.symbols={},Ob=function(){function a(){var a=b.length,d;for(d=0;d<a;d++){b[d]();}b=[];}var b=[];return {push:function push(c,d){if(b.length===0){var e=y.getElementsByTagName("head")[0],f=y.createElement("script");f.type="text/javascript";f.src=d;f.onload=a;e.appendChild(f);}b.push(c);}};}(),cb=J;Va.prototype={addLabel:function addLabel(){var a=this.axis,b=a.options,c=a.chart,d=a.categories,e=a.names,f=this.pos,g=b.labels,h=a.tickPositions,i=f===h[0],k=f===h[h.length-1],e=d?p(d[f],e[f],f):f,d=this.label,h=h.info,j;a.isDatetimeAxis&&h&&(j=b.dateTimeLabelFormats[h.higherRanks[f]||h.unitName]);this.isFirst=i;this.isLast=k;b=a.labelFormatter.call({axis:a,chart:c,isFirst:i,isLast:k,dateTimeLabelFormat:j,value:a.isLog?fa(na(e)):e});q(d)?d&&d.attr({text:b}):(this.labelLength=(this.label=d=q(b)&&g.enabled?c.renderer.text(b,0,0,g.useHTML).css(D(g.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0);},getLabelSize:function getLabelSize(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0;},handleOverflow:function handleOverflow(a){var b=this.axis,c=a.x,d=b.chart.chartWidth,e=b.chart.spacing,f=p(b.labelLeft,F(b.pos,e[3])),e=p(b.labelRight,t(b.pos+b.len,d-e[1])),g=this.label,h=this.rotation,i={left:0,center:0.5,right:1}[b.labelAlign],k=g.getBBox().width,j=b.slotWidth,l=1,m,n={};if(h)h<0&&c-i*k<f?m=A(c/U(h*ga)-f):h>0&&c+i*k>e&&(m=A((d-c)/U(h*ga)));else if(d=c+(1-i)*k,c-i*k<f?j=a.x+j*(1-i)-f:d>e&&(j=e-a.x+j*i,l=-1),j=F(b.slotWidth,j),j<b.slotWidth&&b.labelAlign==="center"&&(a.x+=l*(b.slotWidth-j-i*(b.slotWidth-F(k,j)))),k>j||b.autoRotation&&g.styles.width)m=j;if(m){n.width=m;if(!b.options.labels.style.textOverflow)n.textOverflow="ellipsis";g.css(n);}},getPosition:function getPosition(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return {x:a?e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB};},getLabelPosition:function getLabelPosition(a,b,c,d,e,f,g,h){var i=this.axis,k=i.transA,j=i.reversed,l=i.staggerLines,m=i.tickRotCorr||{x:0,y:0},n=e.y;q(n)||(n=i.side===2?m.y+8:n=U(c.rotation*ga)*(m.y-c.getBBox(!1,0).height/2));a=a+e.x+m.x-(f&&d?f*k*(j?-1:1):0);b=b+n-(f&&!d?f*k*(j?1:-1):0);l&&(c=g/(h||1)%l,i.opposite&&(c=l-c-1),b+=c*(i.labelOffset/l));return {x:a,y:A(b)};},getMarkPath:function getMarkPath(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d);},render:function render(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,i=this.label,k=this.pos,j=e.labels,l=this.gridLine,m=h?h+"Grid":"grid",n=h?h+"Tick":"tick",r=e[m+"LineWidth"],s=e[m+"LineColor"],o=e[m+"LineDashStyle"],v=e[n+"Length"],m=p(e[n+"Width"],!h&&d.isXAxis?1:0),x=e[n+"Color"],w=e[n+"Position"],n=this.mark,q=j.step,ba=!0,t=d.tickmarkOffset,u=this.getPosition(g,k,t,b),A=u.x,u=u.y,B=g&&A===d.pos+d.len||!g&&u===d.pos?-1:1,c=p(c,1);this.isActive=!0;if(r){k=d.getPlotLinePath(k+t,r*B,b,!0);if(l===z){l={stroke:s,"stroke-width":r};if(o)l.dashstyle=o;if(!h)l.zIndex=1;if(b)l.opacity=0;this.gridLine=l=r?f.path(k).attr(l).add(d.gridGroup):null;}if(!b&&l&&k)l[this.isNew?"attr":"animate"]({d:k,opacity:c});}if(m&&v)w==="inside"&&(v=-v),d.opposite&&(v=-v),h=this.getMarkPath(A,u,v,m*B,g,f),n?n.animate({d:h,opacity:c}):this.mark=f.path(h).attr({stroke:x,"stroke-width":m,opacity:c}).add(d.axisGroup);if(i&&!isNaN(A))i.xy=u=this.getLabelPosition(A,u,i,g,j,t,a,q),this.isFirst&&!this.isLast&&!p(e.showFirstLabel,1)||this.isLast&&!this.isFirst&&!p(e.showLastLabel,1)?ba=!1:g&&!d.isRadial&&!j.step&&!j.rotation&&!b&&c!==0&&this.handleOverflow(u),q&&a%q&&(ba=!1),ba&&!isNaN(u.y)?(u.opacity=c,i[this.isNew?"attr":"animate"](u),this.isNew=!1):i.attr("y",-9999);},destroy:function destroy(){Sa(this,this.axis);}};B.PlotLineOrBand=function(a,b){this.axis=a;if(b)this.options=b,this.id=b.id;};B.PlotLineOrBand.prototype={render:function render(){var a=this,b=a.axis,c=b.horiz,d=a.options,e=d.label,f=a.label,g=d.width,h=d.to,i=d.from,k=q(i)&&q(h),j=d.value,l=d.dashStyle,m=a.svgElem,n=[],r,s=d.color,o=p(d.zIndex,0),v=d.events,x={},w=b.chart.renderer;b.isLog&&(i=Da(i),h=Da(h),j=Da(j));if(g){if(n=b.getPlotLinePath(j,g),x={stroke:s,"stroke-width":g},l)x.dashstyle=l;}else if(k){n=b.getPlotBandPath(i,h,d);if(s)x.fill=s;if(d.borderWidth)x.stroke=d.borderColor,x["stroke-width"]=d.borderWidth;}else return;x.zIndex=o;if(m){if(n)m.show(),m.animate({d:n});else {if(m.hide(),f)a.label=f=f.destroy();}}else if(n&&n.length&&(a.svgElem=m=w.path(n).attr(x).add(),v))for(r in d=function d(b){m.on(b,function(c){v[b].apply(a,[c]);});},v){d(r);}e&&q(e.text)&&n&&n.length&&b.width>0&&b.height>0&&!n.flat?(e=D({align:c&&k&&"center",x:c?!k&&4:10,verticalAlign:!c&&k&&"middle",y:c?k?16:10:k?6:-4,rotation:c&&!k&&90},e),this.renderLabel(e,n,k,o)):f&&f.hide();return a;},renderLabel:function renderLabel(a,b,c,d){var e=this.label,f=this.axis.chart.renderer;if(!e)e={align:a.textAlign||a.align,rotation:a.rotation},e.zIndex=d,this.label=e=f.text(a.text,0,0,a.useHTML).attr(e).css(a.style).add();d=[b[1],b[4],c?b[6]:b[1]];b=[b[2],b[5],c?b[7]:b[2]];c=Ra(d);f=Ra(b);e.align(a,!1,{x:c,y:f,width:Ea(d)-c,height:Ea(b)-f});e.show();},destroy:function destroy(){oa(this.axis.plotLinesAndBands,this);delete this.axis;Sa(this);}};var ka=B.Axis=function(){this.init.apply(this,arguments);};ka.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#D8D8D8",labels:{enabled:!0,style:{color:"#606060",cursor:"default",fontSize:"11px"},x:0,y:15},lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#707070"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function formatter(){return B.numberFormat(this.total,-1);},style:D(aa.line.dataLabels.style,{color:"#000000"})}},defaultLeftAxisOptions:{labels:{x:-15,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0,y:null},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0,y:-15},title:{rotation:0}},init:function init(a,b){var c=b.isX;this.chart=a;this.horiz=a.inverted?!c:c;this.coll=(this.isXAxis=c)?"xAxis":"yAxis";this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.reversed=d.reversed;this.visible=d.visible!==!1;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.names=this.names||[];this.isLog=e==="logarithmic";this.isDatetimeAxis=e==="datetime";this.isLinked=q(d.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=p(d.crosshair,ta(a.options.tooltip.crosshairs)[c?0:1],!1);var f,d=this.options.events;sa(this,a.axes)===-1&&(c&&!this.isColorAxis?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];if(a.inverted&&c&&this.reversed===z)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d){M(this,f,d[f]);}if(this.isLog)this.val2lin=Da,this.lin2val=na;},setOptions:function setOptions(a){this.options=D(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],D(N[this.coll],a));},defaultLabelFormatter:function defaultLabelFormatter(){var a=this.axis,b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=N.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=Ka(h,this);else if(c)g=b;else if(d)g=Qa(d,b);else if(f&&a>=1E3)for(;f--&&g===z;){c=Math.pow(1E3,f+1),a>=c&&b*10%c===0&&e[f]!==null&&(g=B.numberFormat(b/c,-1)+e[f]);}g===z&&(g=P(b)>=1E4?B.numberFormat(b,-1):B.numberFormat(b,-1,z,""));return g;},getSeriesExtremes:function getSeriesExtremes(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();o(a.series,function(c){if(c.visible||!b.options.chart.ignoreHiddenSeries){var d=c.options,e=d.threshold,f;a.hasVisibleSeries=!0;a.isLog&&e<=0&&(e=null);if(a.isXAxis){if(d=c.xData,d.length)a.dataMin=F(p(a.dataMin,d[0]),Ra(d)),a.dataMax=t(p(a.dataMax,d[0]),Ea(d));}else {c.getExtremes();f=c.dataMax;c=c.dataMin;if(q(c)&&q(f))a.dataMin=F(p(a.dataMin,c),c),a.dataMax=t(p(a.dataMax,f),f);if(q(e))a.threshold=e;if(!d.softThreshold||a.isLog)a.softThreshold=!1;}}});},translate:function translate(a,b,c,d,e,f){var g=this.linkedParent||this,h=1,i=0,k=d?g.oldTransA:g.transA,d=d?g.oldMin:g.min,j=g.minPixelPadding,e=(g.isOrdinal||g.isBroken||g.isLog&&e)&&g.lin2val;if(!k)k=g.transA;if(c)h*=-1,i=g.len;g.reversed&&(h*=-1,i-=h*(g.sector||g.len));b?(a=a*h+i,a-=j,a=a/k+d,e&&(a=g.lin2val(a))):(e&&(a=g.val2lin(a)),f==="between"&&(f=0.5),a=h*(a-d)*k+i+h*j+(ma(f)?k*f*g.pointRange:0));return a;},toPixels:function toPixels(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos);},toValue:function toValue(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0);},getPlotLinePath:function getPlotLinePath(a,b,c,d,e){var f=this.chart,g=this.left,h=this.top,i,k,j=c&&f.oldChartHeight||f.chartHeight,l=c&&f.oldChartWidth||f.chartWidth,m;i=this.transB;var n=function n(a,b,c){if(a<b||a>c)d?a=F(t(b,a),c):m=!0;return a;},e=p(e,this.translate(a,null,null,c)),a=c=A(e+i);i=k=A(j-e-i);isNaN(e)?m=!0:this.horiz?(i=h,k=j-this.bottom,a=c=n(a,g,g+this.width)):(a=g,c=l-this.right,i=k=n(i,h,h+this.height));return m&&!d?null:f.renderer.crispLine(["M",a,i,"L",c,k],b||1);},getLinearTickPositions:function getLinearTickPositions(a,b,c){var d,e=fa(T(b/a)*a),f=fa(ua(c/a)*a),g=[];if(b===c&&ma(b))return [b];for(b=e;b<=f;){g.push(b);b=fa(b+a);if(b===d)break;d=b;}return g;},getMinorTickPositions:function getMinorTickPositions(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e,f=this.pointRangePadding||0;e=this.min-f;var f=this.max+f,g=f-e;if(g&&g/c<this.len/3)if(this.isLog){f=b.length;for(e=1;e<f;e++){d=d.concat(this.getLogTickPositions(c,b[e-1],b[e],!0));}}else if(this.isDatetimeAxis&&a.minorTickInterval==="auto")d=d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),e,f,a.startOfWeek));else for(b=e+(b[0]-e)%c;b<=f;b+=c){d.push(b);}d.length!==0&&this.trimTicks(d,a.startOnTick,a.endOnTick);return d;},adjustForMinRange:function adjustForMinRange(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-this.dataMin>=this.minRange,f,g,h,i,k,j;if(this.isXAxis&&this.minRange===z&&!this.isLog)q(a.min)||q(a.max)?this.minRange=null:(o(this.series,function(a){i=a.xData;for(g=k=a.xIncrement?1:i.length-1;g>0;g--){if(h=i[g]-i[g-1],f===z||h<f)f=h;}}),this.minRange=F(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){j=this.minRange;d=(j-c+b)/2;d=[b-d,p(a.min,b-d)];if(e)d[2]=this.dataMin;b=Ea(d);c=[b+j,p(a.max,b+j)];if(e)c[2]=this.dataMax;c=Ra(c);c-b<j&&(d[0]=c-j,d[1]=p(a.min,c-j),b=Ea(d));}this.min=b;this.max=c;},setAxisTranslation:function setAxisTranslation(a){var b=this,c=b.max-b.min,d=b.axisPointRange||0,e,f=0,g=0,h=b.linkedParent,i=!!b.categories,k=b.transA,j=b.isXAxis;if(j||i||d)if(h?(f=h.minPointOffset,g=h.pointRangePadding):(o(b.series,function(a){var b=a.closestPointRange;!a.noSharedTooltip&&q(b)&&(e=q(e)?F(e,b):b);}),o(b.series,function(a){var c=i?1:j?p(a.options.pointRange,e,0):b.axisPointRange||0,a=a.options.pointPlacement;d=t(d,c);b.single||(f=t(f,xa(a)?0:c/2),g=t(g,a==="on"?0:c));})),h=b.ordinalSlope&&e?b.ordinalSlope/e:1,b.minPointOffset=f*=h,b.pointRangePadding=g*=h,b.pointRange=F(d,c),j)b.closestPointRange=e;if(a)b.oldTransA=k;b.translationSlope=b.transA=k=b.len/(c+g||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=k*f;},minFromRange:function minFromRange(){return this.max-this.range;},setTickInterval:function setTickInterval(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,g=b.isXAxis,h=b.isLinked,i=d.maxPadding,k=d.minPadding,j=d.tickInterval,l=d.tickPixelInterval,m=b.categories,n=b.threshold,r=b.softThreshold,s,R,v,x;!f&&!m&&!h&&this.getTickAmount();v=p(b.userMin,d.min);x=p(b.userMax,d.max);h?(b.linkedParent=c[b.coll][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=p(c.min,c.dataMin),b.max=p(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&X(11,1)):(!r&&q(n)&&(b.dataMin>=n?(s=n,k=0):b.dataMax<=n&&(R=n,i=0)),b.min=p(v,s,b.dataMin),b.max=p(x,R,b.dataMax));if(e)!a&&F(b.min,p(b.dataMin,b.min))<=0&&X(10,1),b.min=fa(Da(b.min),15),b.max=fa(Da(b.max),15);if(b.range&&q(b.max))b.userMin=b.min=v=t(b.min,b.minFromRange()),b.userMax=x=b.max,b.range=null;b.beforePadding&&b.beforePadding();b.adjustForMinRange();if(!m&&!b.axisPointRange&&!b.usePercentage&&!h&&q(b.min)&&q(b.max)&&(c=b.max-b.min))!q(v)&&k&&(b.min-=c*k),!q(x)&&i&&(b.max+=c*i);if(ma(d.floor))b.min=t(b.min,d.floor);if(ma(d.ceiling))b.max=F(b.max,d.ceiling);if(r&&q(b.dataMin))if(n=n||0,!q(v)&&b.min<n&&b.dataMin>=n)b.min=n;else if(!q(x)&&b.max>n&&b.dataMax<=n)b.max=n;b.tickInterval=b.min===b.max||b.min===void 0||b.max===void 0?1:h&&!j&&l===b.linkedParent.options.tickPixelInterval?j=b.linkedParent.tickInterval:p(j,this.tickAmount?(b.max-b.min)/t(this.tickAmount-1,1):void 0,m?1:(b.max-b.min)*l/t(b.len,l));g&&!a&&o(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax);});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);if(b.pointRange&&!j)b.tickInterval=t(b.pointRange,b.tickInterval);a=p(d.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);if(!j&&b.tickInterval<a)b.tickInterval=a;if(!f&&!e&&!j)b.tickInterval=sb(b.tickInterval,null,rb(b.tickInterval),p(d.allowDecimals,!(b.tickInterval>0.5&&b.tickInterval<5&&b.max>1E3&&b.max<9999)),!!this.tickAmount);if(!this.tickAmount&&this.len)b.tickInterval=b.unsquish();this.setTickPositions();},setTickPositions:function setTickPositions(){var a=this.options,b,c=a.tickPositions,d=a.tickPositioner,e=a.startOnTick,f=a.endOnTick,g;this.tickmarkOffset=this.categories&&a.tickmarkPlacement==="between"&&this.tickInterval===1?0.5:0;this.minorTickInterval=a.minorTickInterval==="auto"&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=b=c&&c.slice();if(!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,d&&(d=d.apply(this,[this.min,this.max]))))this.tickPositions=b=d;if(!this.isLinked)this.trimTicks(b,e,f),this.min===this.max&&q(this.min)&&!this.tickAmount&&(g=!0,this.min-=0.5,this.max+=0.5),this.single=g,!c&&!d&&this.adjustTickAmount();},trimTicks:function trimTicks(a,b,c){var d=a[0],e=a[a.length-1],f=this.minPointOffset||0;if(b)this.min=d;else for(;this.min-f>a[0];){a.shift();}if(c)this.max=e;else for(;this.max+f<a[a.length-1];){a.pop();}a.length===0&&q(d)&&a.push((e+d)/2);},alignToOthers:function alignToOthers(){var a={},b,c=this.options;this.chart.options.chart.alignTicks!==!1&&c.alignTicks!==!1&&o(this.chart[this.coll],function(c){var e=c.options,e=[c.horiz?e.left:e.top,e.width,e.height,e.pane].join(",");c.series.length&&(a[e]?b=!0:a[e]=1);});return b;},getTickAmount:function getTickAmount(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!q(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=ua(this.len/c)+1);if(b<4)this.finalTickAmt=b,b=5;this.tickAmount=b;},adjustTickAmount:function adjustTickAmount(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,d=this.finalTickAmt,e=b&&b.length;if(e<c){for(;b.length<c;){b.push(fa(b[b.length-1]+a));}this.transA*=(e-1)/(c-1);this.max=b[b.length-1];}else e>c&&(this.tickInterval*=2,this.setTickPositions());if(q(d)){for(a=c=b.length;a--;){(d===3&&a%2===1||d<=2&&a>0&&a<c-1)&&b.splice(a,1);}this.finalTickAmt=z;}},setScale:function setScale(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;o(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0;});if(b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()){if(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,!this.isDirty)this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax;}else this.cleanStacks&&this.cleanStacks();},setExtremes:function setExtremes(a,b,c,d,e){var f=this,g=f.chart,c=p(c,!0);o(f.series,function(a){delete a.kdTree;});e=u(e,{min:a,max:b});H(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.eventArgs=e;c&&g.redraw(d);});},zoom:function zoom(a,b){var c=this.dataMin,d=this.dataMax,e=this.options,f=F(c,p(e.min,c)),e=t(d,p(e.max,d));this.allowZoomOutside||(q(c)&&a<=f&&(a=f),q(d)&&b>=e&&(b=e));this.displayBtn=a!==z||b!==z;this.setExtremes(a,b,!1,z,{trigger:"zoom"});return !0;},setAxisSize:function setAxisSize(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=this.horiz,e=p(b.width,a.plotWidth-c+(b.offsetRight||0)),f=p(b.height,a.plotHeight),g=p(b.top,a.plotTop),b=p(b.left,a.plotLeft+c),c=/%$/;c.test(f)&&(f=Math.round(parseFloat(f)/100*a.plotHeight));c.test(g)&&(g=Math.round(parseFloat(g)/100*a.plotHeight+a.plotTop));this.left=b;this.top=g;this.width=e;this.height=f;this.bottom=a.chartHeight-f-g;this.right=a.chartWidth-e-b;this.len=t(d?e:f,0);this.pos=d?b:g;},getExtremes:function getExtremes(){var a=this.isLog;return {min:a?fa(na(this.min)):this.min,max:a?fa(na(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax};},getThreshold:function getThreshold(a){var b=this.isLog,c=b?na(this.min):this.min,b=b?na(this.max):this.max;a===null?a=b<0?b:c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1);},autoLabelAlign:function autoLabelAlign(a){a=(p(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center";},unsquish:function unsquish(){var a=this.ticks,b=this.options.labels,c=this.horiz,d=this.tickInterval,e=d,f=this.len/(((this.categories?1:0)+this.max-this.min)/d),g,h=b.rotation,i=this.chart.renderer.fontMetrics(b.style.fontSize,a[0]&&a[0].label),k,j=Number.MAX_VALUE,l,m=function m(a){a/=f||1;a=a>1?ua(a):1;return a*d;};c?(l=!b.staggerLines&&!b.step&&(q(h)?[h]:f<p(b.autoRotationLimit,80)&&b.autoRotation))&&o(l,function(a){var b;if(a===h||a&&a>=-90&&a<=90)k=m(P(i.h/$(ga*a))),b=k+P(a/360),b<j&&(j=b,g=a,e=k);}):b.step||(e=m(i.h));this.autoRotation=l;this.labelRotation=p(g,h);return e;},renderUnsquish:function renderUnsquish(){var a=this.chart,b=a.renderer,c=this.tickPositions,d=this.ticks,e=this.options.labels,f=this.horiz,g=a.margin,h=this.categories?c.length:c.length-1,g=this.slotWidth=f&&(e.step||0)<2&&!e.rotation&&(this.staggerLines||1)*a.plotWidth/h||!f&&(g[3]&&g[3]-a.spacing[3]||a.chartWidth*0.33),i=t(1,A(g-2*(e.padding||5))),k={},h=b.fontMetrics(e.style.fontSize,d[0]&&d[0].label),j=e.style.textOverflow,l,m=0,n,r;if(!xa(e.rotation))k.rotation=e.rotation||0;if(this.autoRotation)o(c,function(a){if((a=d[a])&&a.labelLength>m)m=a.labelLength;}),m>i&&m>h.h?k.rotation=this.labelRotation:this.labelRotation=0;else if(g&&(l={width:i+"px"},!j)){l.textOverflow="clip";for(n=c.length;!f&&n--;){if(r=c[n],i=d[r].label)if(i.styles.textOverflow==="ellipsis"&&i.css({textOverflow:"clip"}),i.getBBox().height>this.len/c.length-(h.h-h.f)||d[r].labelLength>g)i.specCss={textOverflow:"ellipsis"};}}if(k.rotation&&(l={width:(m>a.chartHeight*0.5?a.chartHeight*0.33:a.chartHeight)+"px"},!j))l.textOverflow="ellipsis";if(this.labelAlign=e.align||this.autoLabelAlign(this.labelRotation))k.align=this.labelAlign;o(c,function(a){var b=(a=d[a])&&a.label;if(b)b.attr(k),l&&b.css(D(l,b.specCss)),delete b.specCss,a.rotation=k.rotation;});this.tickRotCorr=b.rotCorr(h.b,this.labelRotation||0,this.side!==0);},hasData:function hasData(){return this.hasVisibleSeries||q(this.min)&&q(this.max)&&!!this.tickPositions;},getOffset:function getOffset(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,k,j,l=0,m,n=0,r=d.title,s=d.labels,R=0,v=a.opposite,x=b.axisOffset,b=b.clipOffset,w=[-1,1,1,-1][h],u,ba=a.axisParent;k=a.hasData();a.showAxis=j=k||p(d.showEmpty,!0);a.staggerLines=a.horiz&&s.staggerLines;if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(ba),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(ba),a.labelGroup=c.g("axis-labels").attr({zIndex:s.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels").add(ba);if(k||a.isLinked){if(o(e,function(b){f[b]?f[b].addLabel():f[b]=new Va(a,b);}),a.renderUnsquish(),s.reserveSpace!==!1&&(h===0||h===2||{1:"left",3:"right"}[h]===a.labelAlign||a.labelAlign==="center")&&o(e,function(a){R=t(f[a].getLabelSize(),R);}),a.staggerLines)R*=a.staggerLines,a.labelOffset=R*(a.opposite?-1:1);}else for(u in f){f[u].destroy(),delete f[u];}if(r&&r.text&&r.enabled!==!1){if(!a.axisTitle)a.axisTitle=c.text(r.text,0,0,r.useHTML).attr({zIndex:7,rotation:r.rotation||0,align:r.textAlign||{low:v?"right":"left",middle:"center",high:v?"left":"right"}[r.align]}).addClass("highcharts-"+this.coll.toLowerCase()+"-title").css(r.style).add(a.axisGroup),a.axisTitle.isNew=!0;if(j)l=a.axisTitle.getBBox()[g?"height":"width"],m=r.offset,n=q(m)?0:p(r.margin,g?5:10);a.axisTitle[j?"show":"hide"](!0);}a.offset=w*p(d.offset,x[h]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=h===2?a.tickRotCorr.y:0;g=Math.abs(R)+n+(R&&w*(g?p(s.y,a.tickRotCorr.y+8):s.x)-c);a.axisTitleMargin=p(m,g);x[h]=t(x[h],a.axisTitleMargin+l+w*a.offset,g);d=d.offset?0:T(d.lineWidth/2)*2;b[i]=t(b[i],d);},getLinePath:function getLinePath(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d,d=b.chartHeight-this.bottom-(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a);},getTitlePosition:function getTitlePosition(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=e.x||0,k=e.y||0,j=C(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?j:0);return {x:a?d+i:b+(g?this.width:0)+h+i,y:a?b+k-(g?this.height:0)+h:d+k};},render:function render(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.isLog,f=a.isLinked,g=a.tickPositions,h=a.axisTitle,i=a.ticks,k=a.minorTicks,j=a.alternateBands,l=d.stackLabels,m=d.alternateGridColor,n=a.tickmarkOffset,r=d.lineWidth,s,p=b.hasRendered&&q(a.oldMin)&&!isNaN(a.oldMin),v=a.showAxis,x=c.globalAnimation,w,t;a.labelEdge.length=0;a.overlap=!1;o([i,k,j],function(a){for(var b in a){a[b].isActive=!1;}});if(a.hasData()||f){a.minorTickInterval&&!a.categories&&o(a.getMinorTickPositions(),function(b){k[b]||(k[b]=new Va(a,b,"minor"));p&&k[b].isNew&&k[b].render(null,!0);k[b].render(null,!1,1);});if(g.length&&(o(g,function(b,c){if(!f||b>=a.min&&b<=a.max)i[b]||(i[b]=new Va(a,b)),p&&i[b].isNew&&i[b].render(c,!0,0.1),i[b].render(c);}),n&&(a.min===0||a.single)))i[-1]||(i[-1]=new Va(a,-1,null,!0)),i[-1].render(-1);m&&o(g,function(c,d){t=g[d+1]!==z?g[d+1]+n:a.max-n;if(d%2===0&&c<a.max&&t<=a.max+(b.polar?-n:n))j[c]||(j[c]=new B.PlotLineOrBand(a)),w=c+n,j[c].options={from:e?na(w):w,to:e?na(t):t,color:m},j[c].render(),j[c].isActive=!0;});if(!a._addedPlotLB)o((d.plotLines||[]).concat(d.plotBands||[]),function(b){a.addPlotBandOrLine(b);}),a._addedPlotLB=!0;}o([i,k,j],function(a){var c,d,e=[],f=x?x.duration||500:0;for(c in a){if(!a[c].isActive)a[c].render(c,!1,0),a[c].isActive=!1,e.push(c);}Pa(function(){for(d=e.length;d--;){a[e[d]]&&!a[e[d]].isActive&&(a[e[d]].destroy(),delete a[e[d]]);}},a===j||!b.hasRendered||!f?0:f);});if(r)s=a.getLinePath(r),a.axisLine?a.axisLine.animate({d:s}):a.axisLine=c.path(s).attr({stroke:d.lineColor,"stroke-width":r,zIndex:7}).add(a.axisGroup),a.axisLine[v?"show":"hide"](!0);if(h&&v)h[h.isNew?"attr":"animate"](a.getTitlePosition()),h.isNew=!1;l&&l.enabled&&a.renderStackTotals();a.isDirty=!1;},redraw:function redraw(){this.visible&&(this.render(),o(this.plotLinesAndBands,function(a){a.render();}));o(this.series,function(a){a.isDirty=!0;});},destroy:function destroy(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;a||V(b);for(d in c){Sa(c[d]),c[d]=null;}o([b.ticks,b.minorTicks,b.alternateBands],function(a){Sa(a);});for(a=e.length;a--;){e[a].destroy();}o("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","),function(a){b[a]&&(b[a]=b[a].destroy());});this.cross&&this.cross.destroy();},drawCrosshair:function drawCrosshair(a,b){var c,d=this.crosshair,e,f;if(!this.crosshair||(q(b)||!p(d.snap,!0))===!1)this.hideCrosshair();else if(p(d.snap,!0)?q(b)&&(c=this.isXAxis?b.plotX:this.len-b.plotY):c=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos,c=this.isRadial?this.getPlotLinePath(this.isXAxis?b.x:p(b.stackY,b.y))||null:this.getPlotLinePath(null,null,null,null,c)||null,c===null)this.hideCrosshair();else if(e=this.categories&&!this.isRadial,f=p(d.width,e?this.transA:1),this.cross)this.cross.attr({d:c,visibility:"visible","stroke-width":f});else {e={"stroke-width":f,stroke:d.color||(e?"rgba(155,200,255,0.2)":"#C0C0C0"),zIndex:p(d.zIndex,2)};if(d.dashStyle)e.dashstyle=d.dashStyle;this.cross=this.chart.renderer.path(c).attr(e).add();}},hideCrosshair:function hideCrosshair(){this.cross&&this.cross.hide();}};u(ka.prototype,{getPlotBandPath:function getPlotBandPath(a,b){var c=this.getPlotLinePath(b,null,null,!0),d=this.getPlotLinePath(a,null,null,!0);d&&c?(d.flat=d.toString()===c.toString(),d.push(c[4],c[5],c[1],c[2])):d=null;return d;},addPlotBand:function addPlotBand(a){return this.addPlotBandOrLine(a,"plotBands");},addPlotLine:function addPlotLine(a){return this.addPlotBandOrLine(a,"plotLines");},addPlotBandOrLine:function addPlotBandOrLine(a,b){var c=new B.PlotLineOrBand(this,a).render(),d=this.userOptions;c&&(b&&(d[b]=d[b]||[],d[b].push(a)),this.plotLinesAndBands.push(c));return c;},removePlotBandOrLine:function removePlotBandOrLine(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;){b[e].id===a&&b[e].destroy();}o([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(e=b.length;e--;){b[e].id===a&&oa(b,b[e]);}});}});ka.prototype.getTimeTicks=function(a,b,c,d){var e=[],f={},g=N.global.useUTC,h,i=new qa(b-Ya(b)),k=a.unitRange,j=a.count;if(q(b)){i[Gb](k>=G.second?0:j*T(i.getMilliseconds()/j));if(k>=G.second)i[Hb](k>=G.minute?0:j*T(i.getSeconds()/j));if(k>=G.minute)i[Ib](k>=G.hour?0:j*T(i[tb]()/j));if(k>=G.hour)i[Jb](k>=G.day?0:j*T(i[ub]()/j));if(k>=G.day)i[wb](k>=G.month?1:j*T(i[$a]()/j));k>=G.month&&(i[xb](k>=G.year?0:j*T(i[ab]()/j)),h=i[bb]());k>=G.year&&(h-=h%j,i[yb](h));if(k===G.week)i[wb](i[$a]()-i[vb]()+p(d,1));b=1;if(qb||Za)i=i.getTime(),i=new qa(i+Ya(i));h=i[bb]();for(var d=i.getTime(),l=i[ab](),m=i[$a](),n=!g||!!Za,r=(G.day+(g?Ya(i):i.getTimezoneOffset()*6E4))%G.day;d<c;){e.push(d),k===G.year?d=kb(h+b*j,0):k===G.month?d=kb(h,l+b*j):n&&(k===G.day||k===G.week)?d=kb(h,l,m+b*j*(k===G.day?1:7)):d+=k*j,b++;}e.push(d);o(Na(e,function(a){return k<=G.hour&&a%G.day===r;}),function(a){f[a]="day";});}e.info=u(a,{higherRanks:f,totalRange:k*j});return e;};ka.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],d=c[c.length-1],e=G[d[0]],f=d[1],g;for(g=0;g<c.length;g++){if(d=c[g],e=G[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+G[c[g+1][0]])/2)break;}e===G.year&&a<5*e&&(f=[1,2,5]);c=sb(a/e,f,d[0]==="year"?t(rb(a/e),1):1);return {unitRange:e,count:c,unitName:d[0]};};ka.prototype.getLogTickPositions=function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=A(a),g=this.getLinearTickPositions(a,b,c);else if(a>=0.08)for(var f=T(b),h,i,k,j,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++){k=Da(na(f)*e[h]),k>b&&(!d||j<=c)&&j!==z&&g.push(j),j>c&&(l=!0),j=k;}}else if(b=na(b),c=na(c),a=e[d?"minorTickInterval":"tickInterval"],a=p(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=sb(a,null,rb(a)),g=Ba(this.getLinearTickPositions(a,b,c),Da),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=a;return g;};var Pb=B.Tooltip=function(){this.init.apply(this,arguments);};Pb.prototype={init:function init(a,b){var c=b.borderWidth,d=b.style,e=C(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape||"callout",null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).add().attr({y:-9999});ha||this.label.shadow(b.shadow);this.shared=b.shared;},destroy:function destroy(){if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout);},move:function move(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden&&(P(a-f.x)>1||P(b-f.y)>1),h=e.followPointer||e.len>1;u(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:h?z:g?(2*f.anchorX+c)/3:c,anchorY:h?z:g?(f.anchorY+d)/2:d});e.label.attr(f);if(g)clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,c,d);},32);},hide:function hide(a){var b=this;clearTimeout(this.hideTimer);a=p(a,this.options.hideDelay,500);if(!this.isHidden)this.hideTimer=Pa(function(){b.label[a?"fadeOut":"hide"]();b.isHidden=!0;},a);},getAnchor:function getAnchor(a,b){var c,d=this.chart,e=d.inverted,f=d.plotTop,g=d.plotLeft,h=0,i=0,k,j,a=ta(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===z&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(o(a,function(a){k=a.series.yAxis;j=a.series.xAxis;h+=a.plotX+(!e&&j?j.left-g:0);i+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&k?k.top-f:0);}),h/=a.length,i/=a.length,c=[e?d.plotWidth-i:h,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-h:i]);return Ba(c,A);},getPosition:function getPosition(a,b,c){var d=this.chart,e=this.distance,f={},g=c.h||0,h,i=["y",d.chartHeight,b,c.plotY+d.plotTop,d.plotTop,d.plotTop+d.plotHeight],k=["x",d.chartWidth,a,c.plotX+d.plotLeft,d.plotLeft,d.plotLeft+d.plotWidth],j=p(c.ttBelow,d.inverted&&!c.negative||!d.inverted&&c.negative),l=function l(a,b,c,d,h,i){var k=c<d-e,l=d+e+c<b,m=d-e-c;d+=e;if(j&&l)f[a]=d;else if(!j&&k)f[a]=m;else if(k)f[a]=F(i-c,m-g<0?m:m-g);else if(l)f[a]=t(h,d+g+c>b?d:d+g);else return !1;},m=function m(a,b,c,d){var g;d<e||d>b-e?g=!1:f[a]=d<c/2?1:d>b-c/2?b-c-2:d-c/2;return g;},n=function n(a){var b=i;i=k;k=b;h=a;},r=function r(){l.apply(0,i)!==!1?m.apply(0,k)===!1&&!h&&(n(!0),r()):h?f.x=f.y=0:(n(!0),r());};(d.inverted||this.len>1)&&n();r();return f;},defaultFormatter:function defaultFormatter(a){var b=this.points||ta(this),c;c=[a.tooltipFooterHeaderFormatter(b[0])];c=c.concat(a.bodyFormatter(b));c.push(a.tooltipFooterHeaderFormatter(b[0],!0));return c.join("");},refresh:function refresh(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h,i={},k,j=[];k=e.formatter||this.defaultFormatter;var i=c.hoverPoints,l,m=this.shared;clearTimeout(this.hideTimer);this.followPointer=ta(a)[0].series.tooltipOptions.followPointer;h=this.getAnchor(a,b);f=h[0];g=h[1];m&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,i&&o(i,function(a){a.setState();}),o(a,function(a){a.setState("hover");j.push(a.getLabelConfig());}),i={x:a[0].category,y:a[0].y},i.points=j,this.len=j.length,a=a[0]):i=a.getLabelConfig();k=k.call(i,this);i=a.series;this.distance=p(i.tooltipOptions.distance,16);k===!1?this.hide():(this.isHidden&&(Oa(d),d.attr("opacity",1).show()),d.attr({text:k}),l=e.borderColor||a.color||i.color||"#606060",d.attr({stroke:l}),this.updatePosition({plotX:f,plotY:g,negative:a.negative,ttBelow:a.ttBelow,h:h[2]||0}),this.isHidden=!1);H(c,"tooltipRefresh",{text:k,x:f+c.plotLeft,y:g+c.plotTop,borderColor:l});},updatePosition:function updatePosition(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(A(c.x),A(c.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop);},getXDateFormat:function getXDateFormat(a,b,c){var d,b=b.dateTimeLabelFormats,e=c&&c.closestPointRange,f,g={millisecond:15,second:12,minute:9,hour:6,day:3},h,i="millisecond";if(e){h=Qa("%m-%d %H:%M:%S.%L",a.x);for(f in G){if(e===G.week&&+Qa("%w",a.x)===c.options.startOfWeek&&h.substr(6)==="00:00:00.000"){f="week";break;}if(G[f]>e){f=i;break;}if(g[f]&&h.substr(g[f])!=="01-01 00:00:00.000".substr(g[f]))break;f!=="week"&&(i=f);}f&&(d=b[f]);}else d=b.day;return d||b.year;},tooltipFooterHeaderFormatter:function tooltipFooterHeaderFormatter(a,b){var c=b?"footer":"header",d=a.series,e=d.tooltipOptions,f=e.xDateFormat,g=d.xAxis,h=g&&g.options.type==="datetime"&&ma(a.key),c=e[c+"Format"];h&&!f&&(f=this.getXDateFormat(a,e,g));h&&f&&(c=c.replace("{point.key}","{point.key:"+f+"}"));return Ka(c,{point:a,series:d});},bodyFormatter:function bodyFormatter(a){return Ba(a,function(a){var c=a.series.tooltipOptions;return (c.pointFormatter||a.point.tooltipFormatter).call(a.point,c.pointFormat);});}};var ea;db=y&&y.documentElement.ontouchstart!==z;var Xa=B.Pointer=function(a,b){this.init(a,b);};Xa.prototype={init:function init(a,b){var c=b.chart,d=c.events,e=ha?"":c.zoomType,c=a.inverted,f;this.options=b;this.chart=a;this.zoomX=f=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=f&&!c||e&&c;this.zoomVert=e&&!c||f&&c;this.hasZoom=f||e;this.runChartClick=d&&!!d.click;this.pinchDown=[];this.lastValidTouch={};if(B.Tooltip&&b.tooltip.enabled)a.tooltip=new Pb(a,b.tooltip),this.followTouchMove=p(b.tooltip.followTouchMove,!0);this.setDOMEvents();},normalize:function normalize(a,b){var c,d,a=a||E.event;if(!a.target)a.target=a.srcElement;d=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;if(!b)this.chartPosition=b=Ab(this.chart.container);d.pageX===z?(c=t(a.x,a.clientX-b.left),d=a.y):(c=d.pageX-b.left,d=d.pageY-b.top);return u(a,{chartX:A(c),chartY:A(d)});},getCoordinates:function getCoordinates(a){var b={xAxis:[],yAxis:[]};o(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])});});return b;},runPointActions:function runPointActions(a){var b=this.chart,c=b.series,d=b.tooltip,e=d?d.shared:!1,f=b.hoverPoint,g=b.hoverSeries,h=[Number.MAX_VALUE,Number.MAX_VALUE],i,k,j=[],l=[],m;if(!e&&!g)for(b=0;b<c.length;b++){if(c[b].directTouch||!c[b].options.stickyTracking)c=[];}g&&(e?g.noSharedTooltip:g.directTouch)&&f?l=[f]:(o(c,function(b){i=b.noSharedTooltip&&e;k=!e&&b.directTouch;b.visible&&!i&&!k&&p(b.options.enableMouseTracking,!0)&&(m=b.searchPoint(a,!i&&b.kdDimensions===1))&&j.push(m);}),o(j,function(a){a&&o(["dist","distX"],function(b,c){typeof a[b]==="number"&&a[b]<h[c]&&(h[c]=a[b],l[c]=a);});}));if(e)for(b=j.length;b--;){(j[b].clientX!==l[1].clientX||j[b].series.noSharedTooltip)&&j.splice(b,1);}if(l[0]&&(l[0]!==this.prevKDPoint||d&&d.isHidden)){if(e&&!l[0].series.noSharedTooltip)j.length&&d&&d.refresh(j,a),o(j,function(b){b.onMouseOver(a,b!==(g&&g.directTouch&&f||l[0]));}),this.prevKDPoint=l[1];else {d&&d.refresh(l[0],a);if(!g||!g.directTouch)l[0].onMouseOver(a);this.prevKDPoint=l[0];}}else c=g&&g.tooltipOptions.followPointer,d&&c&&!d.isHidden&&(c=d.getAnchor([{}],a),d.updatePosition({plotX:c[0],plotY:c[1]}));if(!this._onDocumentMouseMove)this._onDocumentMouseMove=function(a){if(S[ea])S[ea].pointer.onDocumentMouseMove(a);},M(y,"mousemove",this._onDocumentMouseMove);o(e?j:[p(l[1],f)],function(b){var c=b&&b.series;c&&o(["xAxis","yAxis","colorAxis"],function(d){c[d]&&c[d].drawCrosshair(a,b);});});},reset:function reset(a,b){var c=this.chart,d=c.hoverSeries,e=c.hoverPoint,f=c.hoverPoints,g=c.tooltip,h=g&&g.shared?f:e;(a=a&&g&&h)&&o(ta(h),function(b){b.plotX===void 0&&(a=!1);});if(a)g.refresh(h),e&&(e.setState(e.state,!0),o(c.axes,function(a){p(a.options.crosshair&&a.options.crosshair.snap,!0)?a.drawCrosshair(null,e):a.hideCrosshair();}));else {if(e)e.onMouseOut();f&&o(f,function(a){a.setState();});if(d)d.onMouseOut();g&&g.hide(b);if(this._onDocumentMouseMove)V(y,"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null;o(c.axes,function(a){a.hideCrosshair();});this.hoverX=c.hoverPoints=c.hoverPoint=null;}},scaleGroups:function scaleGroups(a,b){var c=this.chart,d;o(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d));});c.clipRect.attr(b||c.clipBox);},dragStart:function dragStart(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY;},drag:function drag(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,g=this.zoomVert,h=b.plotLeft,i=b.plotTop,k=b.plotWidth,j=b.plotHeight,l,m=this.selectionMarker,n=this.mouseDownX,r=this.mouseDownY,s=c.panKey&&a[c.panKey+"Key"];if(!m||!m.touch)if(d<h?d=h:d>h+k&&(d=h+k),e<i?e=i:e>i+j&&(e=i+j),this.hasDragged=Math.sqrt(Math.pow(n-d,2)+Math.pow(r-e,2)),this.hasDragged>10){l=b.isInsidePlot(n-h,r-i);if(b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!s&&!m)this.selectionMarker=m=b.renderer.rect(h,i,f?1:k,g?1:j,0).attr({fill:c.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();m&&f&&(d-=n,m.attr({width:P(d),x:(d>0?0:d)+n}));m&&g&&(d=e-r,m.attr({height:P(d),y:(d>0?0:d)+r}));l&&!m&&c.panning&&b.pan(a,c.panning);}},drop:function drop(a){var b=this,c=this.chart,d=this.hasPinched;if(this.selectionMarker){var e={originalEvent:a,xAxis:[],yAxis:[]},f=this.selectionMarker,g=f.attr?f.attr("x"):f.x,h=f.attr?f.attr("y"):f.y,i=f.attr?f.attr("width"):f.width,k=f.attr?f.attr("height"):f.height,j;if(this.hasDragged||d)o(c.axes,function(c){if(c.zoomEnabled&&q(c.min)&&(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var f=c.horiz,n=a.type==="touchend"?c.minPixelPadding:0,r=c.toValue((f?g:h)+n),f=c.toValue((f?g+i:h+k)-n);e[c.coll].push({axis:c,min:F(r,f),max:t(r,f)});j=!0;}}),j&&H(c,"selection",e,function(a){c.zoom(u(a,d?{animation:!1}:null));});this.selectionMarker=this.selectionMarker.destroy();d&&this.scaleGroups();}if(c)L(c.container,{cursor:c._cursor}),c.cancelClick=this.hasDragged>10,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[];},onContainerMouseDown:function onContainerMouseDown(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();this.dragStart(a);},onDocumentMouseUp:function onDocumentMouseUp(a){S[ea]&&S[ea].pointer.drop(a);},onDocumentMouseMove:function onDocumentMouseMove(a){var b=this.chart,c=this.chartPosition,a=this.normalize(a,c);c&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)&&this.reset();},onContainerMouseLeave:function onContainerMouseLeave(a){var b=S[ea];if(b&&(a.relatedTarget||a.toElement))b.pointer.reset(),b.pointer.chartPosition=null;},onContainerMouseMove:function onContainerMouseMove(a){var b=this.chart;if(!q(ea)||!S[ea]||!S[ea].mouseIsDown)ea=b.index;a=this.normalize(a);a.returnValue=!1;b.mouseIsDown==="mousedown"&&this.drag(a);(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a);},inClass:function inClass(a,b){for(var c;a;){if(c=K(a,"class")){if(c.indexOf(b)!==-1)return !0;if(c.indexOf("highcharts-container")!==-1)return !1;}a=a.parentNode;}},onTrackerMouseOut:function onTrackerMouseOut(a){var b=this.chart.hoverSeries,a=a.relatedTarget||a.toElement;if(b&&a&&!b.options.stickyTracking&&!this.inClass(a,"highcharts-tooltip")&&!this.inClass(a,"highcharts-series-"+b.index))b.onMouseOut();},onContainerClick:function onContainerClick(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(H(c.series,"click",u(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(u(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&H(b,"click",a)));},setDOMEvents:function setDOMEvents(){var a=this,b=a.chart.container;b.onmousedown=function(b){a.onContainerMouseDown(b);};b.onmousemove=function(b){a.onContainerMouseMove(b);};b.onclick=function(b){a.onContainerClick(b);};M(b,"mouseleave",a.onContainerMouseLeave);eb===1&&M(y,"mouseup",a.onDocumentMouseUp);if(db)b.ontouchstart=function(b){a.onContainerTouchStart(b);},b.ontouchmove=function(b){a.onContainerTouchMove(b);},eb===1&&M(y,"touchend",a.onDocumentTouchEnd);},destroy:function destroy(){var a;V(this.chart.container,"mouseleave",this.onContainerMouseLeave);eb||(V(y,"mouseup",this.onDocumentMouseUp),V(y,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(a in this){this[a]=null;}}};u(B.Pointer.prototype,{pinchTranslate:function pinchTranslate(a,b,c,d,e,f){(this.zoomHor||this.pinchHor)&&this.pinchTranslateDirection(!0,a,b,c,d,e,f);(this.zoomVert||this.pinchVert)&&this.pinchTranslateDirection(!1,a,b,c,d,e,f);},pinchTranslateDirection:function pinchTranslateDirection(a,b,c,d,e,f,g,h){var i=this.chart,k=a?"x":"y",j=a?"X":"Y",l="chart"+j,m=a?"width":"height",n=i["plot"+(a?"Left":"Top")],r,s,p=h||1,o=i.inverted,x=i.bounds[a?"h":"v"],w=b.length===1,q=b[0][l],t=c[0][l],u=!w&&b[1][l],A=!w&&c[1][l],B,c=function c(){!w&&P(q-u)>20&&(p=h||P(t-A)/P(q-u));s=(n-t)/p+q;r=i["plot"+(a?"Width":"Height")]/p;};c();b=s;b<x.min?(b=x.min,B=!0):b+r>x.max&&(b=x.max-r,B=!0);B?(t-=0.8*(t-g[k][0]),w||(A-=0.8*(A-g[k][1])),c()):g[k]=[t,A];o||(f[k]=s-n,f[m]=r);f=o?1/p:p;e[m]=r;e[k]=b;d[o?a?"scaleY":"scaleX":"scale"+j]=p;d["translate"+j]=f*n+(t-f*q);},pinch:function pinch(a){var b=this,c=b.chart,d=b.pinchDown,e=a.touches,f=e.length,g=b.lastValidTouch,h=b.hasZoom,i=b.selectionMarker,k={},j=f===1&&(b.inClass(a.target,"highcharts-tracker")&&c.runTrackerClick||b.runChartClick),l={};if(f>1)b.initiated=!0;h&&b.initiated&&!j&&a.preventDefault();Ba(e,function(a){return b.normalize(a);});if(a.type==="touchstart")o(e,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY};}),g.x=[d[0].chartX,d[1]&&d[1].chartX],g.y=[d[0].chartY,d[1]&&d[1].chartY],o(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(p(a.options.min,a.dataMin)),f=a.toPixels(p(a.options.max,a.dataMax)),g=F(e,f),e=t(e,f);b.min=F(a.pos,g-d);b.max=t(a.pos+a.len,e+d);}}),b.res=!0;else if(d.length){if(!i)b.selectionMarker=i=u({destroy:Aa,touch:!0},c.plotBox);b.pinchTranslate(d,e,k,i,l,g);b.hasPinched=h;b.scaleGroups(k,l);if(!h&&b.followTouchMove&&f===1)this.runPointActions(b.normalize(a));else if(b.res)b.res=!1,this.reset(!1,0);}},touch:function touch(a,b){var c=this.chart;ea=c.index;a.touches.length===1?(a=this.normalize(a),c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)&&!c.openMenu?(b&&this.runPointActions(a),this.pinch(a)):b&&this.reset()):a.touches.length===2&&this.pinch(a);},onContainerTouchStart:function onContainerTouchStart(a){this.touch(a,!0);},onContainerTouchMove:function onContainerTouchMove(a){this.touch(a);},onDocumentTouchEnd:function onDocumentTouchEnd(a){S[ea]&&S[ea].pointer.drop(a);}});if(E.PointerEvent||E.MSPointerEvent){var va={},Db=!!E.PointerEvent,Sb=function Sb(){var a,b=[];b.item=function(a){return this[a];};for(a in va){va.hasOwnProperty(a)&&b.push({pageX:va[a].pageX,pageY:va[a].pageY,target:va[a].target});}return b;},Eb=function Eb(a,b,c,d){if((a.pointerType==="touch"||a.pointerType===a.MSPOINTER_TYPE_TOUCH)&&S[ea])d(a),d=S[ea].pointer,d[b]({type:c,target:a.currentTarget,preventDefault:Aa,touches:Sb()});};u(Xa.prototype,{onContainerPointerDown:function onContainerPointerDown(a){Eb(a,"onContainerTouchStart","touchstart",function(a){va[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget};});},onContainerPointerMove:function onContainerPointerMove(a){Eb(a,"onContainerTouchMove","touchmove",function(a){va[a.pointerId]={pageX:a.pageX,pageY:a.pageY};if(!va[a.pointerId].target)va[a.pointerId].target=a.currentTarget;});},onDocumentPointerUp:function onDocumentPointerUp(a){Eb(a,"onDocumentTouchEnd","touchend",function(a){delete va[a.pointerId];});},batchMSEvents:function batchMSEvents(a){a(this.chart.container,Db?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,Db?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(y,Db?"pointerup":"MSPointerUp",this.onDocumentPointerUp);}});fb(Xa.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&L(b.container,{"-ms-touch-action":"none","touch-action":"none"});});fb(Xa.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(M);});fb(Xa.prototype,"destroy",function(a){this.batchMSEvents(V);a.call(this);});}var ob=B.Legend=function(a,b){this.init(a,b);};ob.prototype={init:function init(a,b){var c=this,d=b.itemStyle,e=b.itemMarginTop||0;this.options=b;if(b.enabled)c.itemStyle=d,c.itemHiddenStyle=D(d,b.itemHiddenStyle),c.itemMarginTop=e,c.padding=d=p(b.padding,8),c.initialItemX=d,c.initialItemY=d-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.symbolWidth=p(b.symbolWidth,16),c.pages=[],c.render(),M(c.chart,"endResize",function(){c.positionCheckboxes();});},colorizeItem:function colorizeItem(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=b?c.itemStyle.color:g,h=b?a.legendColor||a.color||"#CCC":g,g=a.options&&a.options.marker,i={fill:h},k;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(k in i.stroke=h,g=a.convertAttribs(g),g){d=g[k],d!==z&&(i[k]=d);}f.attr(i);}},positionItem:function positionItem(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d;},destroyItem:function destroyItem(a){var b=a.checkbox;o(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy());});b&&Ta(a.checkbox);},destroy:function destroy(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy();},positionCheckboxes:function positionCheckboxes(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight,e=this.titleHeight;if(b)c=b.translateY,o(this.allItems,function(f){var g=f.checkbox,h;g&&(h=c+e+g.y+(a||0)+3,L(g,{left:b.translateX+f.checkboxOffset+g.x-20+"px",top:h+"px",display:h>c-6&&h<c+d-6?"":"none"}));});},renderTitle:function renderTitle(){var a=this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);a=this.title.getBBox();c=a.height;this.offsetWidth=a.width;this.contentGroup.attr({translateY:c});}this.titleHeight=c;},setText:function setText(a){var b=this.options;a.legendItem.attr({text:b.labelFormat?Ka(b.labelFormat,a):b.labelFormatter.call(a)});},renderItem:function renderItem(a){var b=this.chart,c=b.renderer,d=this.options,e=d.layout==="horizontal",f=this.symbolWidth,g=d.symbolPadding,h=this.itemStyle,i=this.itemHiddenStyle,k=this.padding,j=e?p(d.itemDistance,20):0,l=!d.rtl,m=d.width,n=d.itemMarginBottom||0,r=this.itemMarginTop,s=this.initialItemX,o=a.legendItem,v=a.series&&a.series.drawLegendSymbol?a.series:a,x=v.options,x=this.createCheckboxForItem&&x&&x.showCheckbox,w=d.useHTML;if(!o){a.legendGroup=c.g("legend-item").attr({zIndex:1}).add(this.scrollGroup);a.legendItem=o=c.text("",l?f+g:-g,this.baseline||0,w).css(D(a.visible?h:i)).attr({align:l?"left":"right",zIndex:2}).add(a.legendGroup);if(!this.baseline)this.fontMetrics=c.fontMetrics(h.fontSize,o),this.baseline=this.fontMetrics.f+3+r,o.attr("y",this.baseline);v.drawLegendSymbol(this,a);this.setItemEvents&&this.setItemEvents(a,o,w,h,i);x&&this.createCheckboxForItem(a);}this.colorizeItem(a,a.visible);this.setText(a);c=o.getBBox();f=a.checkboxOffset=d.itemWidth||a.legendItemWidth||f+g+c.width+j+(x?20:0);this.itemHeight=g=A(a.legendItemHeight||c.height);if(e&&this.itemX-s+f>(m||b.chartWidth-2*k-s-d.x))this.itemX=s,this.itemY+=r+this.lastLineHeight+n,this.lastLineHeight=0;this.maxItemWidth=t(this.maxItemWidth,f);this.lastItemY=r+this.itemY+n;this.lastLineHeight=t(g,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=f:(this.itemY+=r+g+n,this.lastLineHeight=g);this.offsetWidth=m||t((e?this.itemX-s-j:f)+k,this.offsetWidth);},getAllItems:function getAllItems(){var a=[];o(this.chart.series,function(b){var c=b.options;if(p(c.showInLegend,!q(c.linkedTo)?z:!1,!0))a=a.concat(b.legendItems||(c.legendType==="point"?b.data:b));});return a;},adjustMargins:function adjustMargins(a,b){var c=this.chart,d=this.options,e=d.align.charAt(0)+d.verticalAlign.charAt(0)+d.layout.charAt(0);this.display&&!d.floating&&o([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(f,g){f.test(e)&&!q(a[g])&&(c[nb[g]]=t(c[nb[g]],c.legend[(g+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][g]*d[g%2?"x":"y"]+p(d.margin,12)+b[g]));});},render:function render(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,k=a.options,j=a.padding,l=k.borderWidth,m=k.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup);a.renderTitle();e=a.getAllItems();ib(e,function(a,b){return (a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0);});k.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;a.lastLineHeight=0;o(e,function(b){a.renderItem(b);});g=(k.width||a.offsetWidth)+j;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);h+=j;if(l||m){if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp({width:g,height:h})),i.isNew=!1;}else a.box=i=c.rect(0,0,g,h,k.borderRadius,l||0).attr({stroke:k.borderColor,"stroke-width":l||0,fill:m||"none"}).add(d).shadow(k.shadow),i.isNew=!0;i[f?"show":"hide"]();}a.legendWidth=g;a.legendHeight=h;o(e,function(b){a.positionItem(b);});f&&d.align(u({width:g,height:h},k),!0,"spacingBox");b.isResizing||this.positionCheckboxes();},handleOverflow:function handleOverflow(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,h,i=this.clipRect,k=e.navigation,j=p(k.animation,!0),l=k.arrowSize||12,m=this.nav,n=this.pages,r=this.padding,s,R=this.allItems,v=function v(a){i.attr({height:a});if(b.contentGroup.div)b.contentGroup.div.style.clip="rect("+r+"px,9999px,"+(r+a)+"px,0)";};e.layout==="horizontal"&&(f/=2);g&&(f=F(f,g));n.length=0;if(a>f){this.clipHeight=h=t(f-20-this.titleHeight-r,0);this.currentPage=p(this.currentPage,1);this.fullHeight=a;o(R,function(a,b){var c=a._legendItemPos[1],d=A(a.legendItem.getBBox().height),e=n.length;if(!e||c-n[e-1]>h&&(s||c)!==n[e-1])n.push(s||c),e++;b===R.length-1&&c+d-n[e-1]>h&&n.push(c);c!==s&&(s=c);});if(!i)i=b.clipRect=d.clipRect(0,r,9999,0),b.contentGroup.clip(i);v(h);if(!m)this.nav=m=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,l,l).on("click",function(){b.scroll(-1,j);}).add(m),this.pager=d.text("",15,10).css(k.style).add(m),this.down=d.symbol("triangle-down",0,0,l,l).on("click",function(){b.scroll(1,j);}).add(m);b.scroll(0);a=f;}else if(m)v(c.chartHeight),m.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a;},scroll:function scroll(a,b){var c=this.pages,d=c.length,e=this.currentPage+a,f=this.clipHeight,g=this.options.navigation,h=g.activeColor,g=g.inactiveColor,i=this.pager,k=this.padding;e>d&&(e=d);if(e>0)b!==z&&Ua(b,this.chart),this.nav.attr({translateX:k,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:e===1?g:h}).css({cursor:e===1?"default":"pointer"}),i.attr({text:e+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,fill:e===d?g:h}).css({cursor:e===d?"default":"pointer"}),c=-c[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:c}),this.currentPage=e,this.positionCheckboxes(c);}};J=B.LegendSymbolMixin={drawRectangle:function drawRectangle(a,b){var c=a.options.symbolHeight||a.fontMetrics.f;b.legendSymbol=this.chart.renderer.rect(0,a.baseline-c+1,a.symbolWidth,c,a.options.symbolRadius||0).attr({zIndex:3}).add(b.legendGroup);},drawLineMarker:function drawLineMarker(a){var b=this.options,c=b.marker,d=a.symbolWidth,e=this.chart.renderer,f=this.legendGroup,a=a.baseline-A(a.fontMetrics.b*0.3),g;if(b.lineWidth){g={"stroke-width":b.lineWidth};if(b.dashStyle)g.dashstyle=b.dashStyle;this.legendLine=e.path(["M",0,a,"L",d,a]).attr(g).add(f);}if(c&&c.enabled!==!1)b=c.radius,this.legendSymbol=c=e.symbol(this.symbol,d/2-b,a-b,2*b,2*b,c).add(f),c.isMarker=!0;}};(/Trident\/7\.0/.test(za)||Ma)&&fb(ob.prototype,"positionItem",function(a,b){var c=this,d=function d(){b._legendItemPos&&a.call(c,b);};d();setTimeout(d);});var hb=B.Chart=function(){this.getArgs.apply(this,arguments);};B.chart=function(a,b,c){return new hb(a,b,c);};hb.prototype={callbacks:[],getArgs:function getArgs(){var a=[].slice.call(arguments);if(xa(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1]);},init:function init(a,b){var c,d=a.series;a.series=null;c=D(N,a);c.series=a.series=d;this.userOptions=a;d=c.chart;this.margin=this.splashArray("margin",d);this.spacing=this.splashArray("spacing",d);var e=d.events;this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,g;f.index=S.length;S.push(f);eb++;d.reflow!==!1&&M(f,"load",function(){f.initReflow();});if(e)for(g in e){M(f,g,e[g]);}f.xAxis=[];f.yAxis=[];f.animation=ha?!1:p(d.animation,!0);f.pointCount=f.colorCounter=f.symbolCounter=0;f.firstRender();},initSeries:function initSeries(a){var b=this.options.chart;(b=I[a.type||b.type||b.defaultSeriesType])||X(17,!0);b=new b();b.init(this,a);return b;},isInsidePlot:function isInsidePlot(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight;},redraw:function redraw(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.hasCartesianSeries,k=this.isDirtyBox,j=c.length,l=j,m=this.renderer,n=m.isHidden(),r=[];Ua(a,this);n&&this.cloneRenderTo();for(this.layOutTitles();l--;){if(a=c[l],a.options.stacking&&(g=!0,a.isDirty)){h=!0;break;}}if(h)for(l=j;l--;){if(a=c[l],a.options.stacking)a.isDirty=!0;}o(c,function(a){a.isDirty&&a.options.legendType==="point"&&(a.updateTotals&&a.updateTotals(),f=!0);});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;g&&this.getStacks();if(i&&!this.isResizing)this.maxTicks=null,o(b,function(a){a.setScale();});this.getMargins();i&&(o(b,function(a){a.isDirty&&(k=!0);}),o(b,function(a){var b=a.min+","+a.max;if(a.extKey!==b)a.extKey=b,r.push(function(){H(a,"afterSetExtremes",u(a.eventArgs,a.getExtremes()));delete a.eventArgs;});(k||g)&&a.redraw();}));k&&this.drawChartBox();o(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw();});d&&d.reset(!0);m.draw();H(this,"redraw");n&&this.cloneRenderTo(!0);o(r,function(a){a.call();});},get:function get(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++){if(b[d].options.id===a)return b[d];}for(d=0;d<c.length;d++){if(c[d].options.id===a)return c[d];}for(d=0;d<c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++){if(e[b].id===a)return e[b];}}return null;},getAxes:function getAxes(){var a=this,b=this.options,c=b.xAxis=ta(b.xAxis||{}),b=b.yAxis=ta(b.yAxis||{});o(c,function(a,b){a.index=b;a.isX=!0;});o(b,function(a,b){a.index=b;});c=c.concat(b);o(c,function(b){new ka(a,b);});},getSelectedPoints:function getSelectedPoints(){var a=[];o(this.series,function(b){a=a.concat(Na(b.points||[],function(a){return a.selected;}));});return a;},getSelectedSeries:function getSelectedSeries(){return Na(this.series,function(a){return a.selected;});},setTitle:function setTitle(a,b,c){var g;var d=this,e=d.options,f;f=e.title=D(e.title,a);g=e.subtitle=D(e.subtitle,b),e=g;o([["title",a,f],["subtitle",b,e]],function(a){var b=a[0],c=d[b],e=a[1],a=a[2];c&&e&&(d[b]=c=c.destroy());a&&a.text&&!c&&(d[b]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add());});d.layOutTitles(c);},layOutTitles:function layOutTitles(a){var b=0,c=this.title,d=this.subtitle,e=this.options,f=e.title,e=e.subtitle,g=this.renderer,h=this.spacingBox.width-44;if(c&&(c.css({width:(f.width||h)+"px"}).align(u({y:g.fontMetrics(f.style.fontSize,c).b-3},f),!1,"spacingBox"),!f.floating&&!f.verticalAlign))b=c.getBBox().height;d&&(d.css({width:(e.width||h)+"px"}).align(u({y:b+(f.margin-13)+g.fontMetrics(e.style.fontSize,c).b},e),!1,"spacingBox"),!e.floating&&!e.verticalAlign&&(b=ua(b+d.getBBox().height)));c=this.titleOffset!==b;this.titleOffset=b;if(!this.isDirtyBox&&c)this.isDirtyBox=c,this.hasRendered&&p(a,!0)&&this.isDirtyBox&&this.redraw();},getChartSize:function getChartSize(){var a=this.options.chart,b=a.width,a=a.height,c=this.renderToClone||this.renderTo;if(!q(b))this.containerWidth=_ja2(c,"width");if(!q(a))this.containerHeight=_ja2(c,"height");this.chartWidth=t(0,b||this.containerWidth||600);this.chartHeight=t(0,p(a,this.containerHeight>19?this.containerHeight:400));},cloneRenderTo:function cloneRenderTo(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Ta(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),L(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&b.style.setProperty("display","block","important"),y.body.appendChild(b),c&&b.appendChild(c));},getContainer:function getContainer(){var a,b=this.options,c=b.chart,d,e;a=this.renderTo;var f="highcharts-"+zb++;if(!a)this.renderTo=a=c.renderTo;if(xa(a))this.renderTo=a=y.getElementById(a);a||X(13,!0);d=C(K(a,"data-highcharts-chart"));!isNaN(d)&&S[d]&&S[d].hasRendered&&S[d].destroy();K(a,"data-highcharts-chart",this.index);a.innerHTML="";!c.skipClone&&!a.offsetWidth&&this.cloneRenderTo();this.getChartSize();d=this.chartWidth;e=this.chartHeight;this.container=a=Z(La,{className:"highcharts-container"+(c.className?" "+c.className:""),id:f},u({position:"relative",overflow:"hidden",width:d+"px",height:e+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},c.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=new (B[c.renderer]||cb)(a,d,e,c.style,c.forExport,b.exporting&&b.exporting.allowHTML);ha&&this.renderer.create(this,a,d,e);this.renderer.chartIndex=this.index;},getMargins:function getMargins(a){var b=this.spacing,c=this.margin,d=this.titleOffset;this.resetMargins();if(d&&!q(c[0]))this.plotTop=t(this.plotTop,d+this.options.title.margin+b[0]);this.legend.adjustMargins(c,b);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins();},getAxisMargins:function getAxisMargins(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&o(a.axes,function(a){a.visible&&a.getOffset();});o(nb,function(d,e){q(c[e])||(a[d]+=b[e]);});a.setChartSize();},reflow:function reflow(a){var b=this,c=b.options.chart,d=b.renderTo,e=c.width||_ja2(d,"width"),f=c.height||_ja2(d,"height"),c=a?a.target:E;if(!b.hasUserSize&&!b.isPrinting&&e&&f&&(c===E||c===y)){if(e!==b.containerWidth||f!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=Pa(function(){if(b.container)b.setSize(e,f,!1),b.hasUserSize=null;},a?100:0);b.containerWidth=e;b.containerHeight=f;}},initReflow:function initReflow(){var a=this,b=function b(_b2){a.reflow(_b2);};M(E,"resize",b);M(a,"destroy",function(){V(E,"resize",b);});},setSize:function setSize(a,b,c){var d=this,e,f,g=d.renderer;d.isResizing+=1;Ua(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;if(q(a))d.chartWidth=e=t(0,A(a)),d.hasUserSize=!!e;if(q(b))d.chartHeight=f=t(0,A(b));a=g.globalAnimation;(a?Wa:L)(d.container,{width:e+"px",height:f+"px"},a);d.setChartSize(!0);g.setSize(e,f,c);d.maxTicks=null;o(d.axes,function(a){a.isDirty=!0;a.setScale();});o(d.series,function(a){a.isDirty=!0;});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(c);d.oldChartHeight=null;H(d,"resize");a=g.globalAnimation;Pa(function(){d&&H(d,"endResize",null,function(){d.isResizing-=1;});},a===!1?0:a&&a.duration||500);},setChartSize:function setChartSize(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,g=this.spacing,h=this.clipOffset,i,k,j,l;this.plotLeft=i=A(this.plotLeft);this.plotTop=k=A(this.plotTop);this.plotWidth=j=t(0,A(d-i-this.marginRight));this.plotHeight=l=t(0,A(e-k-this.marginBottom));this.plotSizeX=b?l:j;this.plotSizeY=b?j:l;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:g[3],y:g[0],width:d-g[3]-g[1],height:e-g[0]-g[2]};this.plotBox=c.plotBox={x:i,y:k,width:j,height:l};d=2*T(this.plotBorderWidth/2);b=ua(t(d,h[3])/2);c=ua(t(d,h[0])/2);this.clipBox={x:b,y:c,width:T(this.plotSizeX-t(d,h[1])/2-b),height:t(0,T(this.plotSizeY-t(d,h[2])/2-c))};a||o(this.axes,function(a){a.setAxisSize();a.setAxisTranslation();});},resetMargins:function resetMargins(){var a=this;o(nb,function(b,c){a[b]=p(a.margin[c],a.spacing[c]);});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0];},drawChartBox:function drawChartBox(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,k=a.backgroundColor,j=a.plotBackgroundColor,l=a.plotBackgroundImage,m=a.plotBorderWidth||0,n,r=this.plotLeft,p=this.plotTop,o=this.plotWidth,v=this.plotHeight,x=this.plotBox,w=this.clipRect,t=this.clipBox;n=i+(a.shadow?8:0);if(i||k)if(e)e.animate(e.crisp({width:c-n,height:d-n}));else {e={fill:k||"none"};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(n/2,n/2,c-n,d-n,a.borderRadius,i).attr(e).addClass("highcharts-background").add().shadow(a.shadow);}if(j)f?f.animate(x):this.plotBackground=b.rect(r,p,o,v,0).attr({fill:j}).add().shadow(a.plotShadow);if(l)h?h.animate(x):this.plotBGImage=b.image(l,r,p,o,v).add();w?w.animate({width:t.width,height:t.height}):this.clipRect=b.clipRect(t);if(m)g?(g.strokeWidth=-m,g.animate(g.crisp({x:r,y:p,width:o,height:v}))):this.plotBorder=b.rect(r,p,o,v,0,-m).attr({stroke:a.plotBorderColor,"stroke-width":m,fill:"none",zIndex:1}).add();this.isDirtyBox=!1;},propFromSeries:function propFromSeries(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;o(["inverted","angular","polar"],function(g){c=I[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;){(c=I[d[e].type])&&c.prototype[g]&&(f=!0);}a[g]=f;});},linkSeries:function linkSeries(){var a=this,b=a.series;o(b,function(a){a.linkedSeries.length=0;});o(b,function(b){var d=b.options.linkedTo;if(xa(d)&&(d=d===":previous"?a.series[b.index-1]:a.get(d)))d.linkedSeries.push(b),b.linkedParent=d,b.visible=p(b.options.visible,d.options.visible,b.visible);});},renderSeries:function renderSeries(){o(this.series,function(a){a.translate();a.render();});},renderLabels:function renderLabels(){var a=this,b=a.options.labels;b.items&&o(b.items,function(c){var d=u(b.style,c.style),e=C(d.left)+a.plotLeft,f=C(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,e,f).attr({zIndex:2}).css(d).add();});},render:function render(){var a=this.axes,b=this.renderer,c=this.options,d,e,f,g;this.setTitle();this.legend=new ob(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();d=this.plotWidth;e=this.plotHeight-=21;o(a,function(a){a.setScale();});this.getAxisMargins();f=d/this.plotWidth>1.1;g=e/this.plotHeight>1.05;if(f||g)this.maxTicks=null,o(a,function(a){(a.horiz&&f||!a.horiz&&g)&&a.setTickInterval(!0);}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&o(a,function(a){a.visible&&a.render();});if(!this.seriesGroup)this.seriesGroup=b.g("series-group").attr({zIndex:3}).add();this.renderSeries();this.renderLabels();this.showCredits(c.credits);this.hasRendered=!0;},showCredits:function showCredits(a){if(a.enabled&&!this.credits)this.credits=this.renderer.text(a.text,0,0).on("click",function(){if(a.href)E.location.href=a.href;}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position);},destroy:function destroy(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;H(a,"destroy");S[a.index]=z;eb--;a.renderTo.removeAttribute("data-highcharts-chart");V(a);for(e=b.length;e--;){b[e]=b[e].destroy();}for(e=c.length;e--;){c[e]=c[e].destroy();}o("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy());});if(d)d.innerHTML="",V(d),f&&Ta(d);for(e in a){delete a[e];}},isReadyToRender:function isReadyToRender(){var a=this;return !ca&&E==E.top&&y.readyState!=="complete"||ha&&!E.canvg?(ha?Ob.push(function(){a.firstRender();},a.options.global.canvasToolsURL):y.attachEvent("onreadystatechange",function(){y.detachEvent("onreadystatechange",a.firstRender);y.readyState==="complete"&&a.firstRender();}),!1):!0;},firstRender:function firstRender(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();H(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();o(b.series||[],function(b){a.initSeries(b);});a.linkSeries();H(a,"beforeRender");if(B.Pointer)a.pointer=new Xa(a,b);a.render();a.renderer.draw();if(!a.renderer.imgCount)a.onload();a.cloneRenderTo(!0);}},onload:function onload(){var a=this;o([this.callback].concat(this.callbacks),function(b){b&&a.index!==void 0&&b.apply(a,[a]);});a.renderer.imgCount||H(a,"load");},splashArray:function splashArray(a,b){var c=b[a],c=Y(c)?c:[c,c,c,c];return [p(b[a+"Top"],c[0]),p(b[a+"Right"],c[1]),p(b[a+"Bottom"],c[2]),p(b[a+"Left"],c[3])];}};var Cb=B.CenteredSeriesMixin={getCenter:function getCenter(){var a=this.options,b=this.chart,c=2*(a.slicedOffset||0),d=b.plotWidth-2*c,b=b.plotHeight-2*c,e=a.center,e=[p(e[0],"50%"),p(e[1],"50%"),a.size||"100%",a.innerSize||0],f=F(d,b),g,h;for(g=0;g<4;++g){h=e[g],a=g<2||g===2&&/%$/.test(h),e[g]=(/%$/.test(h)?[d,b,f,e[2]][g]*parseFloat(h)/100:parseFloat(h))+(a?c:0);}e[3]>e[2]&&(e[3]=e[2]);return e;}},Ha=function Ha(){};Ha.prototype={init:function init(a,b,c){this.series=a;this.color=a.color;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter++],a.colorCounter===b.length))a.colorCounter=0;a.chart.pointCount++;return this;},applyOptions:function applyOptions(a,b){var c=this.series,d=c.options.pointValKey||c.pointValKey,a=Ha.prototype.optionsToObject.call(this,a);u(this,a);this.options=this.options?u(this.options,a):a;if(d)this.y=this[d];this.isNull=this.y===null;if(typeof this.x!=="number"&&c)this.x=b===void 0?c.autoIncrement():b;return this;},optionsToObject:function optionsToObject(a){var b={},c=this.series,d=c.options.keys,e=d||c.pointArrayMap||["y"],f=e.length,g=0,h=0;if(typeof a==="number"||a===null)b[e[0]]=a;else if(Ia(a)){if(!d&&a.length>f){c=_typeof(a[0]);if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];g++;}for(;h<f;){if(!d||a[g]!==void 0)b[e[h]]=a[g];g++;h++;}}else if((typeof a==="undefined"?"undefined":_typeof(a))==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0;}return b;},destroy:function destroy(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),oa(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)V(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this){this[c]=null;}},destroyElements:function destroyElements(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],b,c=6;c--;){b=a[c],this[b]&&(this[b]=this[b].destroy());}},getLabelConfig:function getLabelConfig(){return {x:this.category,y:this.y,color:this.color,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal};},tooltipFormatter:function tooltipFormatter(a){var b=this.series,c=b.tooltipOptions,d=p(c.valueDecimals,""),e=c.valuePrefix||"",f=c.valueSuffix||"";o(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}");});return Ka(a,{point:this,series:this.series});},firePointEvent:function firePointEvent(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&e.allowPointSelect&&(c=function c(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey);});H(this,a,b,c);},visible:!0};var Q=B.Series=function(){};Q.prototype={isCartesian:!0,type:"line",pointClass:Ha,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],init:function init(a,b){var c=this,d,e,f=a.series,g=function g(a,b){return p(a.options.index,a._i)-p(b.options.index,b._i);};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();u(c,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(ha)b.animation=!1;e=b.events;for(d in e){M(c,d,e[d]);}if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();o(c.parallelArrays,function(a){c[a+"Data"]=[];});c.setData(b.data,!1);if(c.isCartesian)a.hasCartesianSeries=!0;f.push(c);c._i=f.length-1;ib(f,g);this.yAxis&&ib(this.yAxis.series,g);o(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1);});},bindAxes:function bindAxes(){var a=this,b=a.options,c=a.chart,d;o(a.axisTypes||[],function(e){o(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]!==z&&b[e]===d.id||b[e]===z&&d.index===0)c.series.push(a),a[e]=c,c.isDirty=!0;});!a[e]&&a.optionalAxis!==e&&X(18,!0);});},updateParallelArrays:function updateParallelArrays(a,b){var c=a.series,d=arguments;o(c.parallelArrays,typeof b==="number"?function(d){var f=d==="y"&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=f;}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2));});},autoIncrement:function autoIncrement(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,b=p(b,a.pointStart,0);this.pointInterval=c=p(this.pointInterval,a.pointInterval,1);if(d==="month"||d==="year")a=new qa(b),a=d==="month"?+a[xb](a[ab]()+c):+a[yb](a[bb]()+c),c=a-b;this.xIncrement=b+c;return b;},setOptions:function setOptions(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},e=c[this.type];this.userOptions=a;c=D(e,c.series,a);this.tooltipOptions=D(N.tooltip,N.plotOptions[this.type].tooltip,b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);e.marker===null&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();if((c.negativeColor||c.negativeFillColor)&&!c.zones)a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&q(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c;},getCyclic:function getCyclic(a,b,c){var d=this.userOptions,e="_"+a+"Index",f=a+"Counter";b||(q(d[e])?b=d[e]:(d[e]=b=this.chart[f]%c.length,this.chart[f]+=1),b=c[b]);this[a]=b;},getColor:function getColor(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||aa[this.type].color,this.chart.options.colors);},getSymbol:function getSymbol(){var a=this.options.marker;this.getCyclic("symbol",a.symbol,this.chart.options.symbols);if(/^url/.test(this.symbol))a.radius=0;},drawLegendSymbol:J.drawLineMarker,setData:function setData(a,b,c,d){var e=this,f=e.points,g=f&&f.length||0,h,i=e.options,k=e.chart,j=null,l=e.xAxis,m=l&&!!l.categories,n=i.turboThreshold,r=this.xData,s=this.yData,t=(h=e.pointArrayMap)&&h.length,a=a||[];h=a.length;b=p(b,!0);if(d!==!1&&h&&g===h&&!e.cropped&&!e.hasGroupedData&&e.visible)o(a,function(a,b){f[b].update&&a!==i.data[b]&&f[b].update(a,!1,null,!1);});else {e.xIncrement=null;e.colorCounter=0;o(this.parallelArrays,function(a){e[a+"Data"].length=0;});if(n&&h>n){for(c=0;j===null&&c<h;){j=a[c],c++;}if(ma(j)){m=p(i.pointStart,0);j=p(i.pointInterval,1);for(c=0;c<h;c++){r[c]=m,s[c]=a[c],m+=j;}e.xIncrement=m;}else if(Ia(j)){if(t)for(c=0;c<h;c++){j=a[c],r[c]=j[0],s[c]=j.slice(1,t+1);}else for(c=0;c<h;c++){j=a[c],r[c]=j[0],s[c]=j[1];}}else X(12);}else for(c=0;c<h;c++){if(a[c]!==z&&(j={series:e},e.pointClass.prototype.applyOptions.apply(j,[a[c]]),e.updateParallelArrays(j,c),m&&q(j.name)))l.names[j.x]=j.name;}xa(s[0])&&X(14,!0);e.data=[];e.options.data=e.userOptions.data=a;for(c=g;c--;){f[c]&&f[c].destroy&&f[c].destroy();}if(l)l.minRange=l.userMinRange;e.isDirty=e.isDirtyData=k.isDirtyBox=!0;c=!1;}i.legendType==="point"&&(this.processData(),this.generatePoints());b&&k.redraw(c);},processData:function processData(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i,k=this.options;i=k.cropThreshold;var j=this.getExtremesFromAll||k.getExtremesFromAll,l=this.isCartesian,k=h&&h.val2lin,m=h&&h.isLog,n,p;if(l&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return !1;if(h)a=h.getExtremes(),n=a.min,p=a.max;if(l&&this.sorted&&!j&&(!i||d>i||this.forceCrop))if(b[d-1]<n||b[0]>p)b=[],c=[];else if(b[0]<n||b[d-1]>p)e=this.cropData(this.xData,this.yData,n,p),b=e.xData,c=e.yData,e=e.start,f=!0;for(i=b.length||1;--i;){d=m?k(b[i])-k(b[i-1]):b[i]-b[i-1],d>0&&(g===z||d<g)?g=d:d<0&&this.requireSorting&&X(15);}this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;this.closestPointRange=g;},cropData:function cropData(a,b,c,d){var e=a.length,f=0,g=e,h=p(this.cropShoulder,1),i;for(i=0;i<e;i++){if(a[i]>=c){f=t(0,i-h);break;}}for(c=i;c<e;c++){if(a[c]>d){g=c+h;break;}}return {xData:a.slice(f,g),yData:b.slice(f,g),start:f,end:g};},generatePoints:function generatePoints(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,h=this.cropStart||0,i,k=this.hasGroupedData,j,l=[],m;if(!b&&!k)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++){i=h+m,k?l[m]=new f().init(this,[d[m]].concat(ta(e[m]))):(b[i]?j=b[i]:a[i]!==z&&(b[i]=j=new f().init(this,a[i],d[m])),l[m]=j),l[m].index=i;}if(b&&(g!==(c=b.length)||k))for(m=0;m<c;m++){if(m===h&&!k&&(m+=g),b[m])b[m].destroyElements(),b[m].plotX=z;}this.data=b;this.points=l;},getExtremes:function getExtremes(a){var b=this.yAxis,c=this.processedXData,d,e=[],f=0;d=this.xAxis.getExtremes();var g=d.min,h=d.max,i,k,j,l,a=a||this.stackedYData||this.processedYData;d=a.length;for(l=0;l<d;l++){if(k=c[l],j=a[l],i=j!==null&&j!==z&&(!b.isLog||j.length||j>0),k=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[l+1]||k)>=g&&(c[l-1]||k)<=h,i&&k)if(i=j.length)for(;i--;){j[i]!==null&&(e[f++]=j[i]);}else e[f++]=j;}this.dataMin=Ra(e);this.dataMax=Ea(e);},translate:function translate(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,k=i==="between"||ma(i),j=a.threshold,l=a.startFromThreshold?j:0,m,n,r,o,R=Number.MAX_VALUE,a=0;a<g;a++){var v=f[a],x=v.x,w=v.y;n=v.low;var u=b&&e.stacks[(this.negStacks&&w<(l?0:j)?"-":"")+this.stackKey];if(e.isLog&&w!==null&&w<=0)v.y=w=null,X(10);v.plotX=m=F(t(-1E5,c.translate(x,0,0,0,1,i,this.type==="flags")),1E5);if(b&&this.visible&&!v.isNull&&u&&u[x])o=this.getStackIndicator(o,x,this.index),u=u[x],w=u.points[o.key],n=w[0],w=w[1],n===l&&(n=p(j,e.min)),e.isLog&&n<=0&&(n=null),v.total=v.stackTotal=u.total,v.percentage=u.total&&v.y/u.total*100,v.stackY=w,u.setOffset(this.pointXOffset||0,this.barW||0);v.yBottom=q(n)?e.translate(n,0,1,0,1):null;h&&(w=this.modifyValue(w,v));v.plotY=n=typeof w==="number"&&w!==Infinity?F(t(-1E5,e.translate(w,0,1,0,1)),1E5):z;v.isInside=n!==z&&n>=0&&n<=e.len&&m>=0&&m<=c.len;v.clientX=k?c.translate(x,0,0,0,1):m;v.negative=v.y<(j||0);v.category=d&&d[v.x]!==z?d[v.x]:v.x;a&&(R=F(R,P(m-r)));r=m;}this.closestPointRangePx=R;},getValidPoints:function getValidPoints(a){return Na(a||this.points,function(a){return !a.isNull;});},setClip:function setClip(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,f=this.clipBox,g=f||b.clipBox,h=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,c.xAxis,c.yAxis].join(","),i=b[h],k=b[h+"m"];if(!i){if(a)g.width=0,b[h+"m"]=k=d.clipRect(-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight);b[h]=i=d.clipRect(g);}a&&(i.count+=1);if(c.clip!==!1)this.group.clip(a||f?i:b.clipRect),this.markerGroup.clip(k),this.sharedClipKey=h;a||(i.count-=1,i.count<=0&&h&&b[h]&&(f||(b[h]=b[h].destroy()),b[h+"m"]&&(b[h+"m"]=b[h+"m"].destroy())));},animate:function animate(a){var b=this.chart,c=this.options.animation,d;if(c&&!Y(c))c=aa[this.type].animation;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null);},afterAnimate:function afterAnimate(){this.setClip();H(this,"afterAnimate");},drawPoints:function drawPoints(){var a,b=this.points,c=this.chart,d,e,f,g,h,i,k,j,l=this.options.marker,m=this.pointAttr[""],n,r,o,t=this.markerGroup,v=p(l.enabled,this.xAxis.isRadial,this.closestPointRangePx>2*l.radius);if(l.enabled!==!1||this._hasPointMarkers)for(f=b.length;f--;){if(g=b[f],d=T(g.plotX),e=g.plotY,j=g.graphic,n=g.marker||{},r=!!g.marker,a=v&&n.enabled===z||n.enabled,o=g.isInside,a&&e!==z&&!isNaN(e)&&g.y!==null){if(a=g.pointAttr[g.selected?"select":""]||m,h=a.r,i=p(n.symbol,this.symbol),k=i.indexOf("url")===0,j)j[o?"show":"hide"](!0).attr(a).animate(u({x:d-h,y:e-h},j.symbolName?{width:2*h,height:2*h}:{}));else {if(o&&(h>0||k))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h,r?n:l).attr(a).add(t);}}else if(j)g.graphic=j.destroy();}},convertAttribs:function convertAttribs(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e){g=e[f],h[f]=p(a[g],b[f],c[f],d[f]);}return h;},getAttribs:function getAttribs(){var a=this,b=a.options,c=aa[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color,h=a.options.negativeColor;f={stroke:g,fill:g};var i=a.points||[],k,j,l=[],m=a.pointAttrToOptions;k=a.hasPointSpecificOptions;var n=c.lineColor,r=c.fillColor;j=b.turboThreshold;var s=a.zones,t=a.zoneAxis||"y",v;b.marker?(e.radius=e.radius||c.radius+e.radiusPlus,e.lineWidth=e.lineWidth||c.lineWidth+e.lineWidthPlus):(e.color=e.color||ia(e.color||g).brighten(e.brightness).get(),e.negativeColor=e.negativeColor||ia(e.negativeColor||h).brighten(e.brightness).get());l[""]=a.convertAttribs(c,f);o(["hover","select"],function(b){l[b]=a.convertAttribs(d[b],l[""]);});a.pointAttr=l;g=i.length;if(!j||g<j||k)for(;g--;){j=i[g];if((c=j.options&&j.options.marker||j.options)&&c.enabled===!1)c.radius=0;if(s.length){k=0;for(f=s[k];j[t]>=f.value;){f=s[++k];}j.color=j.fillColor=p(f.color,a.color);}k=b.colorByPoint||j.color;if(j.options)for(v in m){q(c[m[v]])&&(k=!0);}if(k){c=c||{};k=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker||j.negative&&!f.fillColor&&!e.fillColor)f[a.pointAttrToOptions.fill]=f.color||!j.options.color&&e[j.negative&&h?"negativeColor":"color"]||ia(j.color).brighten(f.brightness||e.brightness).get();f={color:j.color};if(!r)f.fillColor=j.color;if(!n)f.lineColor=j.color;c.hasOwnProperty("color")&&!c.color&&delete c.color;k[""]=a.convertAttribs(u(f,c),l[""]);k.hover=a.convertAttribs(d.hover,l.hover,k[""]);k.select=a.convertAttribs(d.select,l.select,k[""]);}else k=l;j.pointAttr=k;}},destroy:function destroy(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(za),d,e=a.data||[],f,g,h;H(a,"destroy");V(a);o(a.axisTypes||[],function(b){if(h=a[b])oa(h.series,a),h.isDirty=h.forceRedraw=!0;});a.legendItem&&a.chart.legend.destroyItem(a);for(d=e.length;d--;){(f=e[d])&&f.destroy&&f.destroy();}a.points=null;clearTimeout(a.animationTimeout);for(g in a){a[g] instanceof O&&!a[g].survive&&(d=c&&g==="group"?"hide":"destroy",a[g][d]());}if(b.hoverSeries===a)b.hoverSeries=null;oa(b.series,a);for(g in a){delete a[g];}},getGraphPath:function getGraphPath(a,b,c){var d=this,e=d.options,f=e.step,g,h=[],i,a=a||d.points;(g=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&g&&(f=4-f);e.connectNulls&&!b&&!c&&(a=this.getValidPoints(a));o(a,function(g,j){var l=g.plotX,m=g.plotY,n=a[j-1];if((g.leftCliff||n&&n.rightCliff)&&!c)i=!0;g.isNull&&!q(b)&&j>0?i=!e.connectNulls:g.isNull&&!b?i=!0:(j===0||i?n=["M",g.plotX,g.plotY]:d.getPointSpline?n=d.getPointSpline(a,g,j):f?(n=f===1?["L",n.plotX,m]:f===2?["L",(n.plotX+l)/2,n.plotY,"L",(n.plotX+l)/2,m]:["L",l,n.plotY],n.push("L",l,m)):n=["L",l,m],h.push.apply(h,n),i=!1);});return d.graphPath=h;},drawGraph:function drawGraph(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color,b.dashStyle]],d=b.lineWidth,e=b.linecap!=="square",f=(this.gappedPath||this.getGraphPath).call(this),g=this.fillGraph&&this.color||"none";o(this.zones,function(d,e){c.push(["zoneGraph"+e,d.color||a.color,d.dashStyle||b.dashStyle]);});o(c,function(c,i){var k=c[0],j=a[k];if(j)j.animate({d:f});else if((d||g)&&f.length)j={stroke:c[1],"stroke-width":d,fill:g,zIndex:1},c[2]?j.dashstyle=c[2]:e&&(j["stroke-linecap"]=j["stroke-linejoin"]="round"),a[k]=a.chart.renderer.path(f).attr(j).add(a.group).shadow(i<2&&b.shadow);});},applyZones:function applyZones(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e,f,g=this.clips||[],h,i=this.graph,k=this.area,j=t(b.chartWidth,b.chartHeight),l=this[(this.zoneAxis||"y")+"Axis"],m,n=l.reversed,r=b.inverted,s=l.horiz,q,v,x,w=!1;if(d.length&&(i||k)&&l.min!==z)i&&i.hide(),k&&k.hide(),m=l.getExtremes(),o(d,function(d,o){e=n?s?b.plotWidth:0:s?0:l.toPixels(m.min);e=F(t(p(f,e),0),j);f=F(t(A(l.toPixels(p(d.value,m.max),!0)),0),j);w&&(e=f=l.toPixels(m.max));q=Math.abs(e-f);v=F(e,f);x=t(e,f);if(l.isXAxis){if(h={x:r?x:v,y:0,width:q,height:j},!s)h.x=b.plotHeight-h.x;}else if(h={x:0,y:r?x:v,width:j,height:q},s)h.y=b.plotWidth-h.y;b.inverted&&c.isVML&&(h=l.isXAxis?{x:0,y:n?v:x,height:h.width,width:b.chartWidth}:{x:h.y-b.plotLeft-b.spacingBox.x,y:0,width:h.height,height:b.chartHeight});g[o]?g[o].animate(h):(g[o]=c.clipRect(h),i&&a["zoneGraph"+o].clip(g[o]),k&&a["zoneArea"+o].clip(g[o]));w=d.value>m.max;}),this.clips=g;},invertGroups:function invertGroups(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};o(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert();});}var b=this,c=b.chart;if(b.xAxis)M(c,"resize",a),M(b,"destroy",function(){V(c,"resize",a);}),a(),b.invertGroups=a;},plotGroup:function plotGroup(a,b,c,d,e){var f=this[a],g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({zIndex:d||0.1}).add(e),f.addClass("highcharts-series-"+this.index));f.attr({visibility:c})[g?"attr":"animate"](this.getPlotBox());return f;},getPlotBox:function getPlotBox(){var a=this.chart,b=this.xAxis,c=this.yAxis;if(a.inverted)b=c,c=this.xAxis;return {translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1};},render:function render(){var a=this,b=a.chart,c,d=a.options,e=(c=d.animation)&&!!a.animate&&b.renderer.isSVG&&p(c.duration,500)||0,f=a.visible?"inherit":"hidden",g=d.zIndex,h=a.hasRendered,i=b.seriesGroup;c=a.plotGroup("group","series",f,g,i);a.markerGroup=a.plotGroup("markerGroup","markers",f,g,i);e&&a.animate(!0);a.getAttribs();c.inverted=a.isCartesian?b.inverted:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());o(a.points,function(a){a.redraw&&a.redraw();});a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&a.options.enableMouseTracking!==!1&&a.drawTracker();b.inverted&&a.invertGroups();d.clip!==!1&&!a.sharedClipKey&&!h&&c.clip(b.clipRect);e&&a.animate();if(!h)a.animationTimeout=Pa(function(){a.afterAnimate();},e);a.isDirty=a.isDirtyData=!1;a.hasRendered=!0;},redraw:function redraw(){var a=this.chart,b=this.isDirtyData,c=this.isDirty,d=this.group,e=this.xAxis,f=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:p(e&&e.left,a.plotLeft),translateY:p(f&&f.top,a.plotTop)}));this.translate();this.render();b&&H(this,"updatedData");(c||b)&&delete this.kdTree;},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function searchPoint(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b);},buildKDTree:function buildKDTree(){function a(c,e,f){var g,h;if(h=c&&c.length)return g=b.kdAxisArray[e%f],c.sort(function(a,b){return a[g]-b[g];}),h=Math.floor(h/2),{point:c[h],left:a(c.slice(0,h),e+1,f),right:a(c.slice(h+1),e+1,f)};}var b=this,c=b.kdDimensions;delete b.kdTree;Pa(function(){b.kdTree=a(b.getValidPoints(),c,c);},b.options.kdNow?0:1);},searchKDTree:function searchKDTree(a,b){function c(a,b,k,j){var l=b.point,m=d.kdAxisArray[k%j],n,p,o=l;p=q(a[e])&&q(l[e])?Math.pow(a[e]-l[e],2):null;n=q(a[f])&&q(l[f])?Math.pow(a[f]-l[f],2):null;n=(p||0)+(n||0);l.dist=q(n)?Math.sqrt(n):Number.MAX_VALUE;l.distX=q(p)?Math.sqrt(p):Number.MAX_VALUE;m=a[m]-l[m];n=m<0?"left":"right";p=m<0?"right":"left";b[n]&&(n=c(a,b[n],k+1,j),o=n[g]<o[g]?n:l);b[p]&&Math.sqrt(m*m)<o[g]&&(a=c(a,b[p],k+1,j),o=a[g]<o[g]?a:o);return o;}var d=this,e=this.kdAxisArray[0],f=this.kdAxisArray[1],g=b?"distX":"dist";this.kdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions);}};Kb.prototype={destroy:function destroy(){Sa(this,this.axis);},render:function render(a){var b=this.options,c=b.format,c=c?Ka(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,null,null,b.useHTML).css(b.style).attr({align:this.textAlign,rotation:b.rotation,visibility:"hidden"}).add(a);},setOffset:function setOffset(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=c.reversed,f=this.isNegative&&!f||!this.isNegative&&f,g=c.translate(c.usePercentage?100:this.total,0,0,0,1),c=c.translate(0),c=P(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e[this.options.crop===!1||d.isInsidePlot(f.x,f.y)?"show":"hide"](!0);}};hb.prototype.getStacks=function(){var a=this;o(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks;});o(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+p(b.options.stack,"");});};ka.prototype.buildStacks=function(){var a=this.series,b,c=p(this.options.reversedStacks,!0),d=a.length,e;if(!this.isXAxis){this.usePercentage=!1;for(e=d;e--;){a[c?e:d-e-1].setStackedPoints();}for(e=d;e--;){b=a[c?e:d-e-1],b.setStackCliffs&&b.setStackCliffs();}if(this.usePercentage)for(e=0;e<d;e++){a[e].setPercentStacks();}}};ka.prototype.renderStackTotals=function(){var a=this.chart,b=a.renderer,c=this.stacks,d,e,f=this.stackTotalGroup;if(!f)this.stackTotalGroup=f=b.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();f.translate(a.plotLeft,a.plotTop);for(d in c){for(e in a=c[d],a){a[e].render(f);}}};ka.prototype.resetStacks=function(){var a=this.stacks,b,c;if(!this.isXAxis)for(b in a){for(c in a[b]){a[b][c].touched<this.stacksTouched?(a[b][c].destroy(),delete a[b][c]):(a[b][c].total=null,a[b][c].cum=0);}}};ka.prototype.cleanStacks=function(){var a,b,c;if(!this.isXAxis){if(this.oldStacks)a=this.stacks=this.oldStacks;for(b in a){for(c in a[b]){a[b][c].cum=a[b][c].total;}}}};Q.prototype.setStackedPoints=function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=this.processedXData,b=this.processedYData,c=[],d=b.length,e=this.options,f=e.threshold,g=e.startFromThreshold?f:0,h=e.stack,e=e.stacking,i=this.stackKey,k="-"+i,j=this.negStacks,l=this.yAxis,m=l.stacks,n=l.oldStacks,o,s,q,v,x,w,u;l.stacksTouched+=1;for(x=0;x<d;x++){w=a[x];u=b[x];o=this.getStackIndicator(o,w,this.index);v=o.key;q=(s=j&&u<(g?0:f))?k:i;m[q]||(m[q]={});if(!m[q][w])n[q]&&n[q][w]?(m[q][w]=n[q][w],m[q][w].total=null):m[q][w]=new Kb(l,l.options.stackLabels,s,w,h);q=m[q][w];if(u!==null)q.points[v]=q.points[this.index]=[p(q.cum,g)],q.touched=l.stacksTouched,o.index>0&&this.singleStacks===!1&&(q.points[v][0]=q.points[this.index+","+w+",0"][0]);e==="percent"?(s=s?i:k,j&&m[s]&&m[s][w]?(s=m[s][w],q.total=s.total=t(s.total,q.total)+P(u)||0):q.total=fa(q.total+(P(u)||0))):q.total=fa(q.total+(u||0));q.cum=p(q.cum,g)+(u||0);u!==null&&q.points[v].push(q.cum);c[x]=q.cum;}if(e==="percent")l.usePercentage=!0;this.stackedYData=c;l.oldStacks={};}};Q.prototype.setPercentStacks=function(){var a=this,b=a.stackKey,c=a.yAxis.stacks,d=a.processedXData,e;o([b,"-"+b],function(b){var f;for(var g=d.length,h,i;g--;){if(h=d[g],e=a.getStackIndicator(e,h,a.index),f=(i=c[b]&&c[b][h])&&i.points[e.key],h=f)i=i.total?100/i.total:0,h[0]=fa(h[0]*i),h[1]=fa(h[1]*i),a.stackedYData[g]=h[1];}});};Q.prototype.getStackIndicator=function(a,b,c){!q(a)||a.x!==b?a={x:b,index:0}:a.index++;a.key=[c,b,a.index].join(",");return a;};u(hb.prototype,{addSeries:function addSeries(a,b,c){var d,e=this;a&&(b=p(b,!0),H(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&e.redraw(c);}));return d;},addAxis:function addAxis(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;new ka(this,D(a,{index:this[e].length,isX:b}));f[e]=ta(f[e]||{});f[e].push(a);p(c,!0)&&this.redraw(d);},showLoading:function showLoading(a){var b=this,c=b.options,d=b.loadingDiv,e=c.loading,f=function f(){d&&L(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"});};if(!d)b.loadingDiv=d=Z(La,{className:"highcharts-loading"},u(e.style,{zIndex:10,display:"none"}),b.container),b.loadingSpan=Z("span",null,e.labelStyle,d),M(b,"redraw",f);b.loadingSpan.innerHTML=a||c.lang.loading;if(!b.loadingShown)L(d,{opacity:0,display:""}),Wa(d,{opacity:e.style.opacity},{duration:e.showDuration||0}),b.loadingShown=!0;f();},hideLoading:function hideLoading(){var a=this.options,b=this.loadingDiv;b&&Wa(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function complete(){L(b,{display:"none"});}});this.loadingShown=!1;}});u(Ha.prototype,{update:function update(a,b,c,d){function e(){f.applyOptions(a);if(f.y===null&&h)f.graphic=h.destroy();if(Y(a)&&!Ia(a))f.redraw=function(){if(h&&h.element&&a&&a.marker&&a.marker.symbol)f.graphic=h.destroy();if(a&&a.dataLabels&&f.dataLabel)f.dataLabel=f.dataLabel.destroy();f.redraw=null;};i=f.index;g.updateParallelArrays(f,i);if(l&&f.name)l[f.x]=f.name;j.data[i]=Y(j.data[i])?f.options:a;g.isDirty=g.isDirtyData=!0;if(!g.fixedBox&&g.hasCartesianSeries)k.isDirtyBox=!0;if(j.legendType==="point")k.isDirtyLegend=!0;b&&k.redraw(c);}var f=this,g=f.series,h=f.graphic,i,k=g.chart,j=g.options,l=g.xAxis&&g.xAxis.names,b=p(b,!0);d===!1?e():f.firePointEvent("update",{options:a},e);},remove:function remove(a,b){this.series.removePoint(sa(this,this.series.data),a,b);}});u(Q.prototype,{addPoint:function addPoint(a,b,c,d){var e=this,f=e.options,g=e.data,h=e.graph,i=e.area,k=e.chart,j=e.xAxis&&e.xAxis.names,l=h&&h.shift||0,m=["graph","area"],h=f.data,n,r=e.xData;Ua(d,k);if(c){for(d=e.zones.length;d--;){m.push("zoneGraph"+d,"zoneArea"+d);}o(m,function(a){if(e[a])e[a].shift=l+(f.step?2:1);});}if(i)i.isArea=!0;b=p(b,!0);i={series:e};e.pointClass.prototype.applyOptions.apply(i,[a]);m=i.x;d=r.length;if(e.requireSorting&&m<r[d-1])for(n=!0;d&&r[d-1]>m;){d--;}e.updateParallelArrays(i,"splice",d,0,0);e.updateParallelArrays(i,d);if(j&&i.name)j[m]=i.name;h.splice(d,0,a);n&&(e.data.splice(d,0,null),e.processData());f.legendType==="point"&&e.generatePoints();c&&(g[0]&&g[0].remove?g[0].remove(!1):(g.shift(),e.updateParallelArrays(i,"shift"),h.shift()));e.isDirty=!0;e.isDirtyData=!0;b&&(e.getAttribs(),k.redraw());},removePoint:function removePoint(a,b,c){var d=this,e=d.data,f=e[a],g=d.points,h=d.chart,i=function i(){g&&g.length===e.length&&g.splice(a,1);e.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(f||{series:d},"splice",a,1);f&&f.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&h.redraw();};Ua(c,h);b=p(b,!0);f?f.firePointEvent("remove",null,i):i();},remove:function remove(a,b){var c=this,d=c.chart;H(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();p(a,!0)&&d.redraw(b);});},update:function update(a,b){var c=this,d=this.chart,e=this.userOptions,f=this.type,g=I[f].prototype,h=["group","markerGroup","dataLabelsGroup"],i;if(a.type&&a.type!==f||a.zIndex!==void 0)h.length=0;o(h,function(a){h[a]=c[a];delete c[a];});a=D(e,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);for(i in g){this[i]=z;}u(this,I[a.type||f].prototype);o(h,function(a){c[a]=h[a];});this.init(d,a);d.linkSeries();p(b,!0)&&d.redraw(!1);}});u(ka.prototype,{update:function update(a,b){var c=this.chart,a=c.options[this.coll][this.options.index]=D(this.userOptions,a);this.destroy(!0);this._addedPlotLB=this.chart._labelPanes=z;this.init(c,u(a,{events:z}));c.isDirtyBox=!0;p(b,!0)&&c.redraw();},remove:function remove(a){for(var b=this.chart,c=this.coll,d=this.series,e=d.length;e--;){d[e]&&d[e].remove(!1);}oa(b.axes,this);oa(b[c],this);b.options[c].splice(this.options.index,1);o(b[c],function(a,b){a.options.index=b;});this.destroy();b.isDirtyBox=!0;p(a,!0)&&b.redraw();},setTitle:function setTitle(a,b){this.update({title:a},b);},setCategories:function setCategories(a,b){this.update({categories:a},b);}});var wa=pa(Q);I.line=wa;aa.area=D(da,{softThreshold:!1,threshold:0});var la=pa(Q,{type:"area",singleStacks:!1,getStackPoints:function getStackPoints(){var a=[],b=[],c=this.xAxis,d=this.yAxis,e=d.stacks[this.stackKey],f={},g=this.points,h=this.index,i=d.series,k=i.length,j,l=p(d.options.reversedStacks,!0)?1:-1,m,n;if(this.options.stacking){for(m=0;m<g.length;m++){f[g[m].x]=g[m];}for(n in e){e[n].total!==null&&b.push(+n);}b.sort(function(a,b){return a-b;});j=Ba(i,function(){return this.visible;});o(b,function(g,i){var n=0,p,q;if(f[g]&&!f[g].isNull)a.push(f[g]),o([-1,1],function(a){var c=a===1?"rightNull":"leftNull",d=0,n=e[b[i+a]];if(n)for(m=h;m>=0&&m<k;){p=n.points[m],p||(m===h?f[g][c]=!0:j[m]&&(q=e[g].points[m])&&(d-=q[1]-q[0])),m+=l;}f[g][a===1?"rightCliff":"leftCliff"]=d;});else {for(m=h;m>=0&&m<k;){if(p=e[g].points[m]){n=p[1];break;}m+=l;}n=d.toPixels(n,!0);a.push({isNull:!0,plotX:c.toPixels(g,!0),plotY:n,yBottom:n});}});}return a;},getGraphPath:function getGraphPath(a){var b=Q.prototype.getGraphPath,c=this.options,d=c.stacking,e=this.yAxis,f,g,h=[],i=[],k=this.index,j,l=e.stacks[this.stackKey],m=c.threshold,n=e.getThreshold(c.threshold),o,c=c.connectNulls||d==="percent",s=function s(b,c,f){var g=a[b],b=d&&l[g.x].points[k],p=g[f+"Null"]||0,f=g[f+"Cliff"]||0,o,r,g=!0;f||p?(o=(p?b[0]:b[1])+f,r=b[0]+f,g=!!p):!d&&a[c]&&a[c].isNull&&(o=r=m);o!==void 0&&(i.push({plotX:j,plotY:o===null?n:e.toPixels(o,!0),isNull:g}),h.push({plotX:j,plotY:r===null?n:e.toPixels(r,!0)}));},a=a||this.points;d&&(a=this.getStackPoints());for(f=0;f<a.length;f++){if(g=a[f].isNull,j=p(a[f].rectPlotX,a[f].plotX),o=p(a[f].yBottom,n),!g||c){c||s(f,f-1,"left");if(!g||d||!c)i.push(a[f]),h.push({x:f,plotX:j,plotY:o});c||s(f,f+1,"right");}}f=b.call(this,i,!0,!0);h.reversed=!0;g=b.call(this,h,!0,!0);g.length&&(g[0]="L");f=f.concat(g);b=b.call(this,i,!1,c);this.areaPath=f;return b;},drawGraph:function drawGraph(){this.areaPath=[];Q.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=[["area",this.color,c.fillColor]];o(this.zones,function(b,f){d.push(["zoneArea"+f,b.color||a.color,b.fillColor||c.fillColor]);});o(d,function(d){var f=d[0],g=a[f];g?g.animate({d:b}):(g={fill:d[2]||d[1],zIndex:0},d[2]||(g["fill-opacity"]=p(c.fillOpacity,0.75)),a[f]=a.chart.renderer.path(b).attr(g).add(a.group));});},drawLegendSymbol:J.drawRectangle});I.area=la;aa.spline=D(da);wa=pa(Q,{type:"spline",getPointSpline:function getPointSpline(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],c=a[c+1],g,h,i,k;if(f&&!f.isNull&&c&&!c.isNull){a=f.plotY;i=c.plotX;var c=c.plotY,j=0;g=(1.5*d+f.plotX)/2.5;h=(1.5*e+a)/2.5;i=(1.5*d+i)/2.5;k=(1.5*e+c)/2.5;i!==g&&(j=(k-h)*(i-d)/(i-g)+e-k);h+=j;k+=j;h>a&&h>e?(h=t(a,e),k=2*e-h):h<a&&h<e&&(h=F(a,e),k=2*e-h);k>c&&k>e?(k=t(c,e),h=2*e-k):k<c&&k<e&&(k=F(c,e),h=2*e-k);b.rightContX=i;b.rightContY=k;}b=["C",p(f.rightContX,f.plotX),p(f.rightContY,f.plotY),p(g,d),p(h,e),d,e];f.rightContX=f.rightContY=null;return b;}});I.spline=wa;aa.areaspline=D(aa.area);la=la.prototype;wa=pa(wa,{type:"areaspline",getStackPoints:la.getStackPoints,getGraphPath:la.getGraphPath,setStackCliffs:la.setStackCliffs,drawGraph:la.drawGraph,drawLegendSymbol:J.drawRectangle});I.areaspline=wa;aa.column=D(da,{borderColor:"#FFFFFF",borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1,halo:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0});wa=pa(Q,{type:"column",pointAttrToOptions:{stroke:"borderColor",fill:"color",r:"borderRadius"},cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function init(){Q.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&o(b.series,function(b){if(b.type===a.type)b.isDirty=!0;});},getColumnMetrics:function getColumnMetrics(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,g={},h=0;b.grouping===!1?h=1:o(a.chart.series,function(b){var c=b.options,e=b.yAxis,i;if(b.type===a.type&&b.visible&&d.len===e.len&&d.pos===e.pos)c.stacking?(f=b.stackKey,g[f]===z&&(g[f]=h++),i=g[f]):c.grouping!==!1&&(i=h++),b.columnIndex=i;});var i=F(P(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||c.tickInterval||1),c.len),k=i*b.groupPadding,j=(i-2*k)/h,b=F(b.maxPointWidth||c.len,p(b.pointWidth,j*(1-2*b.pointPadding)));a.columnMetrics={width:b,offset:(j-b)/2+(k+((a.columnIndex||0)+(e?1:0))*j-i/2)*(e?-1:1)};return a.columnMetrics;},crispCol:function crispCol(a,b,c,d){var e=this.chart,f=this.borderWidth,g=-(f%2?0.5:0),f=f%2?0.5:1;e.inverted&&e.renderer.isVML&&(f+=1);c=Math.round(a+c)+g;a=Math.round(a)+g;c-=a;d=Math.round(b+d)+f;g=P(b)<=0.5&&d>0.5;b=Math.round(b)+f;d-=b;g&&(b-=1,d+=1);return {x:a,y:b,width:c,height:d};},translate:function translate(){var a=this,b=a.chart,c=a.options,d=a.borderWidth=p(c.borderWidth,a.closestPointRange*a.xAxis.transA<2?0:1),e=a.yAxis,f=a.translatedThreshold=e.getThreshold(c.threshold),g=p(c.minPointLength,5),h=a.getColumnMetrics(),i=h.width,k=a.barW=t(i,1+2*d),j=a.pointXOffset=h.offset;b.inverted&&(f-=0.5);c.pointPadding&&(k=ua(k));Q.prototype.translate.apply(a);o(a.points,function(c){var d=F(p(c.yBottom,f),9E4),h=999+P(d),h=F(t(-h,c.plotY),e.len+h),o=c.plotX+j,s=k,q=F(h,d),v,u=t(h,d)-q;P(u)<g&&g&&(u=g,v=!e.reversed&&!c.negative||e.reversed&&c.negative,q=P(q-f)>g?d-g:f-(v?g:0));c.barX=o;c.pointWidth=i;c.tooltipPos=b.inverted?[e.len+e.pos-b.plotLeft-h,a.xAxis.len-o-s/2,u]:[o+s/2,h+e.pos-b.plotTop,u];c.shapeType="rect";c.shapeArgs=a.crispCol(o,q,s,u);});},getSymbol:Aa,drawLegendSymbol:J.drawRectangle,drawGraph:Aa,drawPoints:function drawPoints(){var a=this,b=this.chart,c=a.options,d=b.renderer,e=c.animationLimit||250,f,g;o(a.points,function(h){var i=h.plotY,k=h.graphic;if(i!==z&&!isNaN(i)&&h.y!==null)f=h.shapeArgs,i=q(a.borderWidth)?{"stroke-width":a.borderWidth}:{},g=h.pointAttr[h.selected?"select":""]||a.pointAttr[""],k?(Oa(k),k.attr(i).attr(g)[b.pointCount<e?"animate":"attr"](D(f))):h.graphic=d[h.shapeType](f).attr(i).attr(g).add(h.group||a.group).shadow(c.shadow,null,c.stacking&&!c.borderRadius);else if(k)h.graphic=k.destroy();});},animate:function animate(a){var b=this.yAxis,c=this.options,d=this.chart.inverted,e={};if(ca)a?(e.scaleY=0.001,a=F(b.pos+b.len,t(b.pos,b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null);},remove:function remove(){var a=this,b=a.chart;b.hasRendered&&o(b.series,function(b){if(b.type===a.type)b.isDirty=!0;});Q.prototype.remove.apply(a,arguments);}});I.column=wa;aa.bar=D(aa.column);la=pa(wa,{type:"bar",inverted:!0});I.bar=la;aa.scatter=D(da,{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:"<span style=\"color:{point.color}\">●</span> <span style=\"font-size: 10px;\"> {series.name}</span><br/>",pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}});la=pa(Q,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function drawGraph(){this.options.lineWidth&&Q.prototype.drawGraph.call(this);}});I.scatter=la;aa.pie=D(da,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function formatter(){return this.y===null?void 0:this.point.name;},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});da={type:"pie",isCartesian:!1,pointClass:pa(Ha,{init:function init(){Ha.prototype.init.apply(this,arguments);var a=this,b;a.name=p(a.name,"Slice");b=function b(_b3){a.slice(_b3.type==="select");};M(a,"select",b);M(a,"unselect",b);return a;},setVisible:function setVisible(a,b){var c=this,d=c.series,e=d.chart,f=d.options.ignoreHiddenPoint,b=p(b,f);if(a!==c.visible){c.visible=c.options.visible=a=a===z?!c.visible:a;d.options.data[sa(c,d.data)]=c.options;o(["graphic","dataLabel","connector","shadowGroup"],function(b){if(c[b])c[b][a?"show":"hide"](!0);});c.legendItem&&e.legend.colorizeItem(c,a);!a&&c.state==="hover"&&c.setState("");if(f)d.isDirty=!0;b&&e.redraw();}},slice:function slice(a,b,c){var d=this.series;Ua(c,d.chart);p(b,!0);this.sliced=this.options.sliced=a=q(a)?a:!this.sliced;d.options.data[sa(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a);},haloPath:function haloPath(a){var b=this.shapeArgs,c=this.series.chart;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.plotLeft+b.x,c.plotTop+b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end});}}),requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},animate:function animate(a){var b=this,c=b.points,d=b.startAngleRad;if(!a)o(c,function(a){var c=a.graphic,g=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:d,end:d}),c.animate({r:g.r,start:g.start,end:g.end},b.options.animation));}),b.animate=null;},updateTotals:function updateTotals(){var a,b=0,c=this.points,d=c.length,e,f=this.options.ignoreHiddenPoint;for(a=0;a<d;a++){e=c[a],b+=f&&!e.visible?0:e.y;}this.total=b;for(a=0;a<d;a++){e=c[a],e.percentage=b>0&&(e.visible||!f)?e.y/b*100:0,e.total=b;}},generatePoints:function generatePoints(){Q.prototype.generatePoints.call(this);this.updateTotals();},translate:function translate(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=c.startAngle||0,k=this.startAngleRad=ra/180*(i-90),i=(this.endAngleRad=ra/180*(p(c.endAngle,i+360)-90))-k,j=this.points,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,m,n=j.length,o;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=W.asin(F((b-a[1])/(a[2]/2+l),1));return a[0]+(c?-1:1)*U(h)*(a[2]/2+l);};for(m=0;m<n;m++){o=j[m];f=k+b*i;if(!c||o.visible)b+=o.percentage/100;g=k+b*i;o.shapeType="arc";o.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:A(f*1E3)/1E3,end:A(g*1E3)/1E3};h=(g+f)/2;h>1.5*ra?h-=2*ra:h<-ra/2&&(h+=2*ra);o.slicedTranslation={translateX:A(U(h)*d),translateY:A($(h)*d)};f=U(h)*a[2]/2;g=$(h)*a[2]/2;o.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];o.half=h<-ra/2||h>ra/2?1:0;o.angle=h;e=F(e,l/2);o.labelPos=[a[0]+f+U(h)*l,a[1]+g+$(h)*l,a[0]+f+U(h)*e,a[1]+g+$(h)*e,a[0]+f,a[1]+g,l<0?"center":o.half?"right":"left",h];}},drawGraph:null,drawPoints:function drawPoints(){var a=this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g,h,i;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);o(a.points,function(k){if(k.y!==null){d=k.graphic;h=k.shapeArgs;f=k.shadowGroup;g=k.pointAttr[k.selected?"select":""];if(!g.stroke)g.stroke=g.fill;if(e&&!f)f=k.shadowGroup=b.g("shadow").add(a.shadowGroup);c=k.sliced?k.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);if(d)d.setRadialReference(a.center).attr(g).animate(u(h,c));else {i={"stroke-linejoin":"round"};if(!k.visible)i.visibility="hidden";k.graphic=d=b[k.shapeType](h).setRadialReference(a.center).attr(g).attr(i).attr(c).add(a.group).shadow(e,f);}}});},searchPoint:Aa,sortByAngle:function sortByAngle(a,b){a.sort(function(a,d){return a.angle!==void 0&&(d.angle-a.angle)*b;});},drawLegendSymbol:J.drawRectangle,getCenter:Cb.getCenter,getSymbol:Aa};da=pa(Q,da);I.pie=da;Q.prototype.drawDataLabels=function(){var a=this,b=a.options,c=b.cursor,d=b.dataLabels,e=a.points,f,g,h=a.hasRendered||0,i,k,j=a.chart.renderer;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),k=a.plotGroup("dataLabelsGroup","data-labels",d.defer?"hidden":"visible",d.zIndex||6),p(d.defer,!0)&&(k.attr({opacity:+h}),h||M(a,"afterAnimate",function(){a.visible&&k.show();k[b.animation?"animate":"attr"]({opacity:1},{duration:200});})),g=d,o(e,function(e){var h,n=e.dataLabel,o,s,t=e.connector,v=!0,x,w={};f=e.dlOptions||e.options&&e.options.dataLabels;h=p(f&&f.enabled,g.enabled)&&e.y!==null;if(n&&!h)e.dataLabel=n.destroy();else if(h){d=D(g,f);x=d.style;h=d.rotation;o=e.getLabelConfig();i=d.format?Ka(d.format,o):d.formatter.call(o,d);x.color=p(d.color,x.color,a.color,"black");if(n){if(q(i))n.attr({text:i}),v=!1;else {if(e.dataLabel=n=n.destroy(),t)e.connector=t.destroy();}}else if(q(i)){n={fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:h,padding:d.padding,zIndex:1};if(x.color==="contrast")w.color=d.inside||d.distance<0||b.stacking?j.getContrast(e.color||a.color):"#000000";if(c)w.cursor=c;for(s in n){n[s]===z&&delete n[s];}n=e.dataLabel=j[h?"text":"label"](i,0,-9999,d.shape,null,null,d.useHTML).attr(n).css(u(x,w)).add(k).shadow(d.shadow);}n&&a.alignDataLabel(e,n,d,null,v);}});};Q.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=p(a.plotX,-9999),i=p(a.plotY,-9999),k=b.getBBox(),j=f.renderer.fontMetrics(c.style.fontSize).b,l=c.rotation,m=c.align,n=this.visible&&(a.series.forceDL||f.isInsidePlot(h,A(i),g)||d&&f.isInsidePlot(h,g?d.x+1:d.y+d.height-1,g)),o=p(c.overflow,"justify")==="justify";if(n)d=u({x:g?f.plotWidth-i:h,y:A(g?f.plotHeight-h:i),width:0,height:0},d),u(c,{width:k.width,height:k.height}),l?(o=!1,g=f.renderer.rotCorr(j,l),g={x:d.x+c.x+d.width/2+g.x,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](g).attr({align:c.align}),h=(l+720)%360,h=h>180&&h<360,m==="left"?g.y-=h?k.height:0:m==="center"?(g.x-=k.width/2,g.y-=k.height/2):m==="right"&&(g.x-=k.width,g.y-=h?0:k.height)):(b.align(c,null,d),g=b.alignAttr),o?this.justifyDataLabel(b,c,g,k,d,e):p(c.crop,!0)&&(n=f.isInsidePlot(g.x,g.y)&&f.isInsidePlot(g.x+k.width,g.y+k.height)),c.shape&&!l&&b.attr({anchorX:a.plotX,anchorY:a.plotY});if(!n)Oa(b),b.attr({y:-9999}),b.placed=!1;};Q.prototype.justifyDataLabel=function(a,b,c,d,e,f){var g=this.chart,h=b.align,i=b.verticalAlign,k,j,l=a.box?0:a.padding||0;k=c.x+l;if(k<0)h==="right"?b.align="left":b.x=-k,j=!0;k=c.x+d.width-l;if(k>g.plotWidth)h==="left"?b.align="right":b.x=g.plotWidth-k,j=!0;k=c.y+l;if(k<0)i==="bottom"?b.verticalAlign="top":b.y=-k,j=!0;k=c.y+d.height-l;if(k>g.plotHeight)i==="top"?b.verticalAlign="bottom":b.y=g.plotHeight-k,j=!0;if(j)a.placed=!f,a.align(b,null,e);};if(I.pie)I.pie.prototype.drawDataLabels=function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=p(e.connectorPadding,10),g=p(e.connectorWidth,1),h=d.plotWidth,i=d.plotHeight,k,j,l=p(e.softConnector,!0),m=e.distance,n=a.center,r=n[2]/2,q=n[1],u=m>0,v,x,w,B=[[],[]],z,y,E,D,C,G=[0,0,0,0],L=function L(a,b){return b.y-a.y;};if(a.visible&&(e.enabled||a._hasPointLabels)){Q.prototype.drawDataLabels.apply(a);o(b,function(a){if(a.dataLabel&&a.visible)B[a.half].push(a),a.dataLabel._pos=null;});for(D=2;D--;){var H=[],M=[],I=B[D],K=I.length,J;if(K){a.sortByAngle(I,D-0.5);for(C=b=0;!b&&I[C];){b=I[C]&&I[C].dataLabel&&(I[C].dataLabel.getBBox().height||21),C++;}if(m>0){x=F(q+r+m,d.plotHeight);for(C=t(0,q-r-m);C<=x;C+=b){H.push(C);}x=H.length;if(K>x){c=[].concat(I);c.sort(L);for(C=K;C--;){c[C].rank=C;}for(C=K;C--;){I[C].rank>=x&&I.splice(C,1);}K=I.length;}for(C=0;C<K;C++){c=I[C];w=c.labelPos;c=9999;var O,N;for(N=0;N<x;N++){O=P(H[N]-w[1]),O<c&&(c=O,J=N);}if(J<C&&H[C]!==null)J=C;else for(x<K-C+J&&H[C]!==null&&(J=x-K+C);H[J]===null;){J++;}M.push({i:J,y:H[J]});H[J]=null;}M.sort(L);}for(C=0;C<K;C++){c=I[C];w=c.labelPos;v=c.dataLabel;E=c.visible===!1?"hidden":"inherit";c=w[1];if(m>0){if(x=M.pop(),J=x.i,y=x.y,c>y&&H[J+1]!==null||c<y&&H[J-1]!==null)y=F(t(0,c),d.plotHeight);}else y=c;z=e.justify?n[0]+(D?-1:1)*(r+m):a.getX(y===q-r-m||y===q+r+m?c:y,D);v._attr={visibility:E,align:w[6]};v._pos={x:z+e.x+({left:f,right:-f}[w[6]]||0),y:y+e.y-10};v.connX=z;v.connY=y;if(this.options.size===null)x=v.width,z-x<f?G[3]=t(A(x-z+f),G[3]):z+x>h-f&&(G[1]=t(A(z+x-h+f),G[1])),y-b/2<0?G[0]=t(A(-y+b/2),G[0]):y+b/2>i&&(G[2]=t(A(y+b/2-i),G[2]));}}}if(Ea(G)===0||this.verifyDataLabelOverflow(G))this.placeDataLabels(),u&&g&&o(this.points,function(b){k=b.connector;w=b.labelPos;if((v=b.dataLabel)&&v._pos&&b.visible)E=v._attr.visibility,z=v.connX,y=v.connY,j=l?["M",z+(w[6]==="left"?5:-5),y,"C",z,y,2*w[2]-w[4],2*w[3]-w[5],w[2],w[3],"L",w[4],w[5]]:["M",z+(w[6]==="left"?5:-5),y,"L",w[2],w[3],"L",w[4],w[5]],k?(k.animate({d:j}),k.attr("visibility",E)):b.connector=k=a.chart.renderer.path(j).attr({"stroke-width":g,stroke:e.connectorColor||b.color||"#606060",visibility:E}).add(a.dataLabelsGroup);else if(k)b.connector=k.destroy();});}},I.pie.prototype.placeDataLabels=function(){o(this.points,function(a){var b=a.dataLabel;if(b&&a.visible)(a=b._pos)?(b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999});});},I.pie.prototype.alignDataLabel=Aa,I.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,e=c.minSize||80,f=e,g;d[0]!==null?f=t(b[2]-t(a[1],a[3]),e):(f=t(b[2]-a[1]-a[3],e),b[0]+=(a[3]-a[1])/2);d[1]!==null?f=t(F(f,b[2]-t(a[0],a[2])),e):(f=t(F(f,b[2]-a[0]-a[2]),e),b[1]+=(a[0]-a[2])/2);f<b[2]?(b[2]=f,b[3]=Math.min(/%$/.test(c.innerSize||0)?f*parseFloat(c.innerSize||0)/100:parseFloat(c.innerSize||0),f),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):g=!0;return g;};if(I.column)I.column.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart.inverted,g=a.series,h=a.dlBox||a.shapeArgs,i=p(a.below,a.plotY>p(this.translatedThreshold,g.yAxis.len)),k=p(c.inside,!!this.options.stacking);if(h){d=D(h);if(d.y<0)d.height+=d.y,d.y=0;h=d.y+d.height-g.yAxis.len;h>0&&(d.height-=h);f&&(d={x:g.yAxis.len-d.y-d.height,y:g.xAxis.len-d.x-d.width,width:d.height,height:d.width});if(!k)f?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0);}c.align=p(c.align,!f||k?"center":i?"right":"left");c.verticalAlign=p(c.verticalAlign,f||k?"middle":i?"top":"bottom");Q.prototype.alignDataLabel.call(this,a,b,c,d,e);};(function(a){var b=a.Chart,c=a.each,d=a.pick,e=a.addEvent;b.prototype.callbacks.push(function(a){function b(){var e=[];c(a.series,function(a){var b=a.options.dataLabels,f=a.dataLabelCollections||["dataLabel"];(b.enabled||a._hasPointLabels)&&!b.allowOverlap&&a.visible&&c(f,function(b){c(a.points,function(a){if(a[b])a[b].labelrank=d(a.labelrank,a.shapeArgs&&a.shapeArgs.height),e.push(a[b]);});});});a.hideOverlappingLabels(e);}b();e(a,"redraw",b);});b.prototype.hideOverlappingLabels=function(a){var b=a.length,d,e,k,j,l,m,n,o,p;for(e=0;e<b;e++){if(d=a[e])d.oldOpacity=d.opacity,d.newOpacity=1;}a.sort(function(a,b){return (b.labelrank||0)-(a.labelrank||0);});for(e=0;e<b;e++){k=a[e];for(d=e+1;d<b;++d){if(j=a[d],k&&j&&k.placed&&j.placed&&k.newOpacity!==0&&j.newOpacity!==0&&(l=k.alignAttr,m=j.alignAttr,n=k.parentGroup,o=j.parentGroup,p=2*(k.box?0:k.padding),l=!(m.x+o.translateX>l.x+n.translateX+(k.width-p)||m.x+o.translateX+(j.width-p)<l.x+n.translateX||m.y+o.translateY>l.y+n.translateY+(k.height-p)||m.y+o.translateY+(j.height-p)<l.y+n.translateY)))(k.labelrank<j.labelrank?k:j).newOpacity=0;}}c(a,function(a){var b,c;if(a){c=a.newOpacity;if(a.oldOpacity!==c&&a.placed)c?a.show(!0):b=function b(){a.hide();},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b);a.isOld=!0;}});};})(B);da=B.TrackerMixin={drawTrackerPoint:function drawTrackerPoint(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function f(a){for(var c=a.target,d;c&&!d;){d=c.point,c=c.parentNode;}if(d!==z&&d!==b.hoverPoint)d.onMouseOver(a);};o(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a;});if(!a._hasTracking)o(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a);}).css(e),db))a[b].on("touchstart",f);}),a._hasTracking=!0;},drawTrackerGraph:function drawTrackerGraph(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=f.pointer,h=f.renderer,i=f.options.tooltip.snap,k=a.tracker,j=b.cursor,l=j&&{cursor:j},m=function m(){if(f.hoverSeries!==a)a.onMouseOver();},n="rgba(192,192,192,"+(ca?1.0E-4:0.002)+")";if(e&&!c)for(j=e+1;j--;){d[j]==="M"&&d.splice(j+1,0,d[j+1]-i,d[j+2],"L"),(j&&d[j]==="M"||j===e)&&d.splice(j,0,"L",d[j-2]+i,d[j-1]);}k?k.attr({d:d}):(a.tracker=h.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:n,fill:c?n:"none","stroke-width":b.lineWidth+(c?0:2*i),zIndex:2}).add(a.group),o([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",m).on("mouseout",function(a){g.onTrackerMouseOut(a);}).css(l);if(db)a.on("touchstart",m);}));}};if(I.column)wa.prototype.drawTracker=da.drawTrackerPoint;if(I.pie)I.pie.prototype.drawTracker=da.drawTrackerPoint;if(I.scatter)la.prototype.drawTracker=da.drawTrackerPoint;u(ob.prototype,{setItemEvents:function setItemEvents(a,b,c,d,e){var f=this;(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");b.css(f.options.itemHoverStyle);}).on("mouseout",function(){b.css(a.visible?d:e);a.setState();}).on("click",function(b){var c=function c(){a.setVisible&&a.setVisible();},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):H(a,"legendItemClick",b,c);});},createCheckboxForItem:function createCheckboxForItem(a){a.checkbox=Z("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);M(a.checkbox,"click",function(b){H(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select();});});}});N.legend.itemStyle.cursor="pointer";u(hb.prototype,{showResetZoom:function showResetZoom(){var a=this,b=N.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo==="chart"?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut();},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f);},zoomOut:function zoomOut(){var a=this;H(a,"selection",{resetSelection:!0},function(){a.zoom();});},zoom:function zoom(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?o(this.axes,function(a){b=a.zoom();}):o(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=e.zoom(a.min,a.max),e.displayBtn&&(d=!0);});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&Y(e))this.resetZoomButton=e.destroy();b&&this.redraw(p(this.options.chart.animation,a&&a.animation,this.pointCount<100));},pan:function pan(a,b){var c=this,d=c.hoverPoints,e;d&&o(d,function(a){a.setState();});o(b==="xy"?[1,0]:[1],function(b){var b=c[b?"xAxis":"yAxis"][0],d=b.horiz,h=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",i=c[d],k=(b.pointRange||0)/2,j=b.getExtremes(),l=b.toValue(i-h,!0)+k,k=b.toValue(i+b.len-h,!0)-k,i=i>h;if(b.series.length&&(i||l>F(j.dataMin,j.min))&&(!i||k<t(j.dataMax,j.max)))b.setExtremes(l,k,!1,!1,{trigger:"pan"}),e=!0;c[d]=h;});e&&c.redraw(!1);L(c.container,{cursor:"move"});}});u(Ha.prototype,{select:function select(a,b){var c=this,d=c.series,e=d.chart,a=p(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[sa(c,d.data)]=c.options;c.setState(a&&"select");b||o(e.getSelectedPoints(),function(a){if(a.selected&&a!==c)a.selected=a.options.selected=!1,d.options.data[sa(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect");});});},onMouseOver:function onMouseOver(a,b){var c=this.series,d=c.chart,e=d.tooltip,f=d.hoverPoint;if(d.hoverSeries!==c)c.onMouseOver();if(f&&f!==this)f.onMouseOut();if(this.series&&(this.firePointEvent("mouseOver"),e&&(!e.shared||c.noSharedTooltip)&&e.refresh(this,a),this.setState("hover"),!b))d.hoverPoint=this;},onMouseOut:function onMouseOut(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");if(!b||sa(this,b)===-1)this.setState(),a.hoverPoint=null;},importEvents:function importEvents(){if(!this.hasImportedEvents){var a=D(this.series.options.point,this.options).events,b;this.events=a;for(b in a){M(this,b,a[b]);}this.hasImportedEvents=!0;}},setState:function setState(a,b){var c=T(this.plotX),d=this.plotY,e=this.series,f=e.options.states,g=aa[e.type].marker&&e.options.marker,h=g&&!g.enabled,i=g&&g.states[a],k=i&&i.enabled===!1,j=e.stateMarkerGraphic,l=this.marker||{},m=e.chart,n=e.halo,o,a=a||"";o=this.pointAttr[a]||e.pointAttr[a];if(!(a===this.state&&!b||this.selected&&a!=="select"||f[a]&&f[a].enabled===!1||a&&(k||h&&i.enabled===!1)||a&&l.states&&l.states[a]&&l.states[a].enabled===!1)){if(this.graphic)g=g&&this.graphic.symbolName&&o.r,this.graphic.attr(D(o,g?{x:c-g,y:d-g,width:2*g,height:2*g}:{})),j&&j.hide();else {if(a&&i)if(g=i.radius,l=l.symbol||e.symbol,j&&j.currentSymbol!==l&&(j=j.destroy()),j)j[b?"animate":"attr"]({x:c-g,y:d-g});else if(l)e.stateMarkerGraphic=j=m.renderer.symbol(l,c-g,d-g,2*g,2*g).attr(o).add(e.markerGroup),j.currentSymbol=l;if(j)j[a&&m.isInsidePlot(c,d,m.inverted)?"show":"hide"](),j.element.point=this;}if((c=f[a]&&f[a].halo)&&c.size){if(!n)e.halo=n=m.renderer.path().add(m.seriesGroup);n.attr(u({fill:this.color||e.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))[b?"animate":"attr"]({d:this.haloPath(c.size)});}else n&&n.attr({d:[]});this.state=a;}},haloPath:function haloPath(a){var b=this.series,c=b.chart,d=b.getPlotBox(),e=c.inverted,f=Math.floor(this.plotX);return c.renderer.symbols.circle(d.translateX+(e?b.yAxis.len-this.plotY:f)-a,d.translateY+(e?b.xAxis.len-f:this.plotY)-a,a*2,a*2);}});u(Q.prototype,{onMouseOver:function onMouseOver(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&H(this,"mouseOver");this.setState("hover");a.hoverSeries=this;},onMouseOut:function onMouseOut(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&H(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&c.hide();this.setState();},setState:function setState(a){var b=this.options,c=this.graph,d=b.states,e=b.lineWidth,b=0,a=a||"";if(this.state!==a&&(this.state=a,!(d[a]&&d[a].enabled===!1)&&(a&&(e=d[a].lineWidth||e+(d[a].lineWidthPlus||0)),c&&!c.dashstyle))){a={"stroke-width":e};for(c.attr(a);this["zoneGraph"+b];){this["zoneGraph"+b].attr(a),b+=1;}}},setVisible:function setVisible(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===z?!h:a)?"show":"hide";o(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]();});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&o(d.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0;});o(c.linkedSeries,function(b){b.setVisible(a,!1);});if(g)d.isDirtyBox=!0;b!==!1&&d.redraw();H(c,f);},show:function show(){this.setVisible(!0);},hide:function hide(){this.setVisible(!1);},select:function select(a){this.selected=a=a===z?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;H(this,a?"select":"unselect");},drawTracker:da.drawTrackerGraph});u(B,{Color:ia,Point:Ha,Tick:Va,Renderer:cb,SVGElement:O,SVGRenderer:Ca,arrayMin:Ra,arrayMax:Ea,charts:S,dateFormat:Qa,error:X,format:Ka,pathAnim:void 0,getOptions:function getOptions(){return N;},hasBidiBug:Qb,isTouchDevice:Mb,setOptions:function setOptions(a){N=D(!0,N,a);Fb();return N;},addEvent:M,removeEvent:V,createElement:Z,discardElement:Ta,css:L,each:o,map:Ba,merge:D,splat:ta,stableSort:ib,extendClass:pa,pInt:C,svg:ca,canvas:ha,vml:!ca&&!ha,product:"Highcharts",version:"4.2.3"});return B;});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*
 Highcharts JS v4.2.3 (2016-02-08)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (m) {
  (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports ? module.exports = m : m(Highcharts);
})(function (m) {
  function J(a, b, c) {
    this.init(a, b, c);
  }var O = m.arrayMin,
      P = m.arrayMax,
      s = m.each,
      F = m.extend,
      t = m.merge,
      Q = m.map,
      q = m.pick,
      A = m.pInt,
      o = m.getOptions().plotOptions,
      k = m.seriesTypes,
      u = m.extendClass,
      K = m.splat,
      v = m.wrap,
      L = m.Axis,
      y = m.Tick,
      G = m.Point,
      R = m.Pointer,
      S = m.CenteredSeriesMixin,
      B = m.TrackerMixin,
      w = m.Series,
      x = Math,
      E = x.round,
      C = x.floor,
      M = x.max,
      T = m.Color,
      r = function r() {};F(J.prototype, { init: function init(a, b, c) {
      var d = this,
          g = d.defaultOptions;d.chart = b;d.options = a = t(g, b.angular ? { background: {} } : void 0, a);(a = a.background) && s([].concat(K(a)).reverse(), function (a) {
        var g = a.backgroundColor,
            b = c.userOptions,
            a = t(d.defaultBackgroundOptions, a);if (g) a.backgroundColor = g;a.color = a.backgroundColor;c.options.plotBands.unshift(a);b.plotBands = b.plotBands || [];b.plotBands !== c.options.plotBands && b.plotBands.unshift(a);
      });
    }, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: { shape: "circle", borderWidth: 1, borderColor: "silver",
      backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#FFF"], [1, "#DDD"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%" } });var z = L.prototype,
      y = y.prototype,
      U = { getOffset: r, redraw: function redraw() {
      this.isDirty = !1;
    }, render: function render() {
      this.isDirty = !1;
    }, setScale: r, setCategories: r, setTitle: r },
      N = { isRadial: !0, defaultRadialGaugeOptions: { labels: { align: "center", x: 0, y: null }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1,
      tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2 }, defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, defaultRadialYOptions: { gridLineInterpolation: "circle", labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } }, setOptions: function setOptions(a) {
      a = this.options = t(this.defaultOptions, this.defaultRadialOptions, a);if (!a.plotBands) a.plotBands = [];
    }, getOffset: function getOffset() {
      z.getOffset.call(this);
      this.chart.axisOffset[this.side] = 0;this.center = this.pane.center = S.getCenter.call(this.pane);
    }, getLinePath: function getLinePath(a, b) {
      var c = this.center,
          b = q(b, c[2] / 2 - this.offset);return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 });
    }, setAxisTranslation: function setAxisTranslation() {
      z.setAxisTranslation.call(this);if (this.center) this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0;
    }, beforeSetTickPositions: function beforeSetTickPositions() {
      this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0);
    }, setAxisSize: function setAxisSize() {
      z.setAxisSize.call(this);if (this.isRadial) {
        this.center = this.pane.center = m.CenteredSeriesMixin.getCenter.call(this.pane);if (this.isCircular) this.sector = this.endAngleRad - this.startAngleRad;this.len = this.width = this.height = this.center[2] * q(this.sector, 1) / 2;
      }
    }, getPosition: function getPosition(a, b) {
      return this.postTranslate(this.isCircular ? this.translate(a) : 0, q(this.isCircular ? b : this.translate(a), this.center[2] / 2) - this.offset);
    }, postTranslate: function postTranslate(a, b) {
      var c = this.chart,
          d = this.center,
          a = this.startAngleRad + a;return { x: c.plotLeft + d[0] + Math.cos(a) * b, y: c.plotTop + d[1] + Math.sin(a) * b };
    }, getPlotBandPath: function getPlotBandPath(a, b, c) {
      var d = this.center,
          g = this.startAngleRad,
          e = d[2] / 2,
          j = [q(c.outerRadius, "100%"), c.innerRadius, q(c.thickness, 10)],
          l = /%$/,
          i,
          f = this.isCircular;this.options.gridLineInterpolation === "polygon" ? d = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (a = Math.max(a, this.min), b = Math.min(b, this.max), f || (j[0] = this.translate(a), j[1] = this.translate(b)), j = Q(j, function (a) {
        l.test(a) && (a = A(a, 10) * e / 100);return a;
      }), c.shape === "circle" || !f ? (a = -Math.PI / 2, b = Math.PI * 1.5, i = !0) : (a = g + this.translate(a), b = g + this.translate(b)), d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], j[0], j[0], { start: Math.min(a, b), end: Math.max(a, b), innerR: q(j[1], j[0] - j[2]), open: i }));return d;
    }, getPlotLinePath: function getPlotLinePath(a, b) {
      var c = this,
          d = c.center,
          g = c.chart,
          e = c.getPosition(a),
          j,
          l,
          i;c.isCircular ? i = ["M", d[0] + g.plotLeft, d[1] + g.plotTop, "L", e.x, e.y] : c.options.gridLineInterpolation === "circle" ? (a = c.translate(a)) && (i = c.getLinePath(0, a)) : (s(g.xAxis, function (a) {
        a.pane === c.pane && (j = a);
      }), i = [], a = c.translate(a), d = j.tickPositions, j.autoConnect && (d = d.concat([d[0]])), b && (d = [].concat(d).reverse()), s(d, function (e, b) {
        l = j.getPosition(e, a);i.push(b ? "L" : "M", l.x, l.y);
      }));return i;
    }, getTitlePosition: function getTitlePosition() {
      var a = this.center,
          b = this.chart,
          c = this.options.title;return { x: b.plotLeft + a[0] + (c.x || 0), y: b.plotTop + a[1] - { high: 0.5, middle: 0.25, low: 0 }[c.align] * a[2] + (c.y || 0) };
    } };v(z, "init", function (a, b, c) {
    var h;var d = b.angular,
        g = b.polar,
        e = c.isX,
        j = d && e,
        l,
        i;i = b.options;var f = c.pane || 0;if (d) {
      if (F(this, j ? U : N), l = !e) this.defaultRadialOptions = this.defaultRadialGaugeOptions;
    } else if (g) F(this, N), this.defaultRadialOptions = (l = e) ? this.defaultRadialXOptions : t(this.defaultYAxisOptions, this.defaultRadialYOptions);a.call(this, b, c);if (!j && (d || g)) {
      a = this.options;if (!b.panes) b.panes = [];this.pane = (h = b.panes[f] = b.panes[f] || new J(K(i.pane)[f], b, this), f = h);f = f.options;b.inverted = !1;i.chart.zoomType = null;this.startAngleRad = b = (f.startAngle - 90) * Math.PI / 180;this.endAngleRad = i = (q(f.endAngle, f.startAngle + 360) - 90) * Math.PI / 180;this.offset = a.offset || 0;if ((this.isCircular = l) && c.max === void 0 && i - b === 2 * Math.PI) this.autoConnect = !0;
    }
  });v(z, "autoLabelAlign", function (a) {
    if (!this.isRadial) return a.apply(this, [].slice.call(arguments, 1));
  });v(y, "getPosition", function (a, b, c, d, g) {
    var e = this.axis;return e.getPosition ? e.getPosition(c) : a.call(this, b, c, d, g);
  });v(y, "getLabelPosition", function (a, b, c, d, g, e, j, l, i) {
    var f = this.axis,
        h = e.y,
        n = 20,
        k = e.align,
        m = (f.translate(this.pos) + f.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360;f.isRadial ? (a = f.getPosition(this.pos, f.center[2] / 2 + q(e.distance, -25)), e.rotation === "auto" ? d.attr({ rotation: m }) : h === null && (h = f.chart.renderer.fontMetrics(d.styles.fontSize).b - d.getBBox().height / 2), k === null && (f.isCircular ? (this.label.getBBox().width > f.len * f.tickInterval / (f.max - f.min) && (n = 0), k = m > n && m < 180 - n ? "left" : m > 180 + n && m < 360 - n ? "right" : "center") : k = "center", d.attr({ align: k })), a.x += e.x, a.y += h) : a = a.call(this, b, c, d, g, e, j, l, i);return a;
  });v(y, "getMarkPath", function (a, b, c, d, g, e, j) {
    var l = this.axis;l.isRadial ? (a = l.getPosition(this.pos, l.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, g, e, j);return b;
  });o.arearange = t(o.area, { lineWidth: 1, marker: null, threshold: null, tooltip: { pointFormat: "<span style=\"color:{series.color}\">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>" },
    trackByArea: !0, dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }, states: { hover: { halo: !1 } } });k.arearange = u(k.area, { type: "arearange", pointArrayMap: ["low", "high"], dataLabelCollections: ["dataLabel", "dataLabelUpper"], toYData: function toYData(a) {
      return [a.low, a.high];
    }, pointValKey: "low", deferTranslatePolar: !0, highToXY: function highToXY(a) {
      var b = this.chart,
          c = this.xAxis.postTranslate(a.rectPlotX, this.yAxis.len - a.plotHigh);a.plotHighX = c.x - b.plotLeft;a.plotHigh = c.y - b.plotTop;
    }, translate: function translate() {
      var a = this,
          b = a.yAxis;k.area.prototype.translate.apply(a);s(a.points, function (a) {
        var d = a.low,
            g = a.high,
            e = a.plotY;g === null || d === null ? a.isNull = !0 : (a.plotLow = e, a.plotHigh = b.translate(g, 0, 1, 0, 1));
      });this.chart.polar && s(this.points, function (b) {
        a.highToXY(b);
      });
    }, getGraphPath: function getGraphPath() {
      var a = this.points,
          b = [],
          c = [],
          d = a.length,
          g = w.prototype.getGraphPath,
          e,
          j,
          l;l = this.options;for (var i = l.step, d = a.length; d--;) {
        e = a[d], !e.isNull && (!a[d + 1] || a[d + 1].isNull) && c.push({ plotX: e.plotX, plotY: e.plotLow }), j = { plotX: e.plotX, plotY: e.plotHigh,
          isNull: e.isNull }, c.push(j), b.push(j), !e.isNull && (!a[d - 1] || a[d - 1].isNull) && c.push({ plotX: e.plotX, plotY: e.plotLow });
      }a = g.call(this, a);if (i) i === !0 && (i = "left"), l.step = { left: "right", center: "center", right: "left" }[i];b = g.call(this, b);c = g.call(this, c);l.step = i;l = [].concat(a, b);!this.chart.polar && c[0] === "M" && (c[0] = "L");this.areaPath = this.areaPath.concat(a, c);return l;
    }, drawDataLabels: function drawDataLabels() {
      var a = this.data,
          b = a.length,
          c,
          d = [],
          g = w.prototype,
          e = this.options.dataLabels,
          j = e.align,
          l = e.verticalAlign,
          i = e.inside,
          f,
          h,
          n = this.chart.inverted;if (e.enabled || this._hasPointLabels) {
        for (c = b; c--;) {
          if (f = a[c]) {
            h = i ? f.plotHigh < f.plotLow : f.plotHigh > f.plotLow;f.y = f.high;f._plotY = f.plotY;f.plotY = f.plotHigh;d[c] = f.dataLabel;f.dataLabel = f.dataLabelUpper;f.below = h;if (n) {
              if (!j) e.align = h ? "right" : "left";
            } else if (!l) e.verticalAlign = h ? "top" : "bottom";e.x = e.xHigh;e.y = e.yHigh;
          }
        }g.drawDataLabels && g.drawDataLabels.apply(this, arguments);for (c = b; c--;) {
          if (f = a[c]) {
            h = i ? f.plotHigh < f.plotLow : f.plotHigh > f.plotLow;f.dataLabelUpper = f.dataLabel;f.dataLabel = d[c];f.y = f.low;f.plotY = f._plotY;f.below = !h;if (n) {
              if (!j) e.align = h ? "left" : "right";
            } else if (!l) e.verticalAlign = h ? "bottom" : "top";e.x = e.xLow;e.y = e.yLow;
          }
        }g.drawDataLabels && g.drawDataLabels.apply(this, arguments);
      }e.align = j;e.verticalAlign = l;
    }, alignDataLabel: function alignDataLabel() {
      k.column.prototype.alignDataLabel.apply(this, arguments);
    }, setStackedPoints: r, getSymbol: r, drawPoints: r });o.areasplinerange = t(o.arearange);k.areasplinerange = u(k.arearange, { type: "areasplinerange", getPointSpline: k.spline.prototype.getPointSpline });
  (function () {
    var a = k.column.prototype;o.columnrange = t(o.column, o.arearange, { lineWidth: 1, pointRange: null });k.columnrange = u(k.arearange, { type: "columnrange", translate: function translate() {
        var b = this,
            c = b.yAxis,
            d = b.xAxis,
            g = b.chart,
            e;a.translate.apply(b);s(b.points, function (a) {
          var l = a.shapeArgs,
              i = b.options.minPointLength,
              f,
              h;a.plotHigh = e = c.translate(a.high, 0, 1, 0, 1);a.plotLow = a.plotY;h = e;f = a.plotY - e;Math.abs(f) < i ? (i -= f, f += i, h -= i / 2) : f < 0 && (f *= -1, h -= f);l.height = f;l.y = h;a.tooltipPos = g.inverted ? [c.len + c.pos - g.plotLeft - h - f / 2, d.len + d.pos - g.plotTop - l.x - l.width / 2, f] : [d.left - g.plotLeft + l.x + l.width / 2, c.pos - g.plotTop + h + f / 2, f];
        });
      }, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], drawGraph: r, crispCol: a.crispCol, pointAttrToOptions: a.pointAttrToOptions, drawPoints: a.drawPoints, drawTracker: a.drawTracker, animate: a.animate, getColumnMetrics: a.getColumnMetrics });
  })();o.gauge = t(o.line, { dataLabels: { enabled: !0, defer: !1, y: 15, borderWidth: 1, borderColor: "silver", borderRadius: 3, crop: !1, verticalAlign: "top", zIndex: 2 }, dial: {}, pivot: {},
    tooltip: { headerFormat: "" }, showInLegend: !1 });B = { type: "gauge", pointClass: u(G, { setState: function setState(a) {
        this.state = a;
      } }), angular: !0, drawGraph: r, fixedBox: !0, forceDL: !0, trackerGroups: ["group", "dataLabelsGroup"], translate: function translate() {
      var a = this.yAxis,
          b = this.options,
          c = a.center;this.generatePoints();s(this.points, function (d) {
        var g = t(b.dial, d.dial),
            e = A(q(g.radius, 80)) * c[2] / 200,
            j = A(q(g.baseLength, 70)) * e / 100,
            l = A(q(g.rearLength, 10)) * e / 100,
            i = g.baseWidth || 3,
            f = g.topWidth || 1,
            h = b.overshoot,
            n = a.startAngleRad + a.translate(d.y, null, null, null, !0);h && typeof h === "number" ? (h = h / 180 * Math.PI, n = Math.max(a.startAngleRad - h, Math.min(a.endAngleRad + h, n))) : b.wrap === !1 && (n = Math.max(a.startAngleRad, Math.min(a.endAngleRad, n)));n = n * 180 / Math.PI;d.shapeType = "path";d.shapeArgs = { d: g.path || ["M", -l, -i / 2, "L", j, -i / 2, e, -f / 2, e, f / 2, j, i / 2, -l, i / 2, "z"], translateX: c[0], translateY: c[1], rotation: n };d.plotX = c[0];d.plotY = c[1];
      });
    }, drawPoints: function drawPoints() {
      var a = this,
          b = a.yAxis.center,
          c = a.pivot,
          d = a.options,
          g = d.pivot,
          e = a.chart.renderer;s(a.points, function (b) {
        var g = b.graphic,
            c = b.shapeArgs,
            f = c.d,
            h = t(d.dial, b.dial);g ? (g.animate(c), c.d = f) : b.graphic = e[b.shapeType](c).attr({ stroke: h.borderColor || "none", "stroke-width": h.borderWidth || 0, fill: h.backgroundColor || "black", rotation: c.rotation, zIndex: 1 }).add(a.group);
      });c ? c.animate({ translateX: b[0], translateY: b[1] }) : a.pivot = e.circle(0, 0, q(g.radius, 5)).attr({ "stroke-width": g.borderWidth || 0, stroke: g.borderColor || "silver", fill: g.backgroundColor || "black", zIndex: 2 }).translate(b[0], b[1]).add(a.group);
    }, animate: function animate(a) {
      var b = this;if (!a) s(b.points, function (a) {
        var d = a.graphic;d && (d.attr({ rotation: b.yAxis.startAngleRad * 180 / Math.PI }), d.animate({ rotation: a.shapeArgs.rotation }, b.options.animation));
      }), b.animate = null;
    }, render: function render() {
      this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);w.prototype.render.call(this);this.group.clip(this.chart.clipRect);
    }, setData: function setData(a, b) {
      w.prototype.setData.call(this, a, !1);this.processData();this.generatePoints();q(b, !0) && this.chart.redraw();
    }, drawTracker: B && B.drawTrackerPoint };k.gauge = u(k.line, B);o.boxplot = t(o.column, { fillColor: "#FFFFFF", lineWidth: 1, medianWidth: 2, states: { hover: { brightness: -0.3 } }, threshold: null, tooltip: { pointFormat: "<span style=\"color:{point.color}\">●</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>" }, whiskerLength: "50%", whiskerWidth: 2 });k.boxplot = u(k.column, { type: "boxplot",
    pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function toYData(a) {
      return [a.low, a.q1, a.median, a.q3, a.high];
    }, pointValKey: "high", pointAttrToOptions: { fill: "fillColor", stroke: "color", "stroke-width": "lineWidth" }, drawDataLabels: r, translate: function translate() {
      var a = this.yAxis,
          b = this.pointArrayMap;k.column.prototype.translate.apply(this);s(this.points, function (c) {
        s(b, function (b) {
          c[b] !== null && (c[b + "Plot"] = a.translate(c[b], 0, 1, 0, 1));
        });
      });
    }, drawPoints: function drawPoints() {
      var a = this,
          b = a.options,
          c = a.chart.renderer,
          d,
          g,
          e,
          j,
          l,
          i,
          f,
          h,
          n,
          k,
          m,
          H,
          I,
          o,
          t,
          r,
          v,
          u,
          w,
          x,
          B,
          A,
          y = a.doQuartiles !== !1,
          z,
          D = a.options.whiskerLength;s(a.points, function (p) {
        n = p.graphic;B = p.shapeArgs;m = {};o = {};r = {};A = p.color || a.color;if (p.plotY !== void 0) if (d = p.pointAttr[p.selected ? "selected" : ""], v = B.width, u = C(B.x), w = u + v, x = E(v / 2), g = C(y ? p.q1Plot : p.lowPlot), e = C(y ? p.q3Plot : p.lowPlot), j = C(p.highPlot), l = C(p.lowPlot), m.stroke = p.stemColor || b.stemColor || A, m["stroke-width"] = q(p.stemWidth, b.stemWidth, b.lineWidth), m.dashstyle = p.stemDashStyle || b.stemDashStyle, o.stroke = p.whiskerColor || b.whiskerColor || A, o["stroke-width"] = q(p.whiskerWidth, b.whiskerWidth, b.lineWidth), r.stroke = p.medianColor || b.medianColor || A, r["stroke-width"] = q(p.medianWidth, b.medianWidth, b.lineWidth), f = m["stroke-width"] % 2 / 2, h = u + x + f, k = ["M", h, e, "L", h, j, "M", h, g, "L", h, l], y && (f = d["stroke-width"] % 2 / 2, h = C(h) + f, g = C(g) + f, e = C(e) + f, u += f, w += f, H = ["M", u, e, "L", u, g, "L", w, g, "L", w, e, "L", u, e, "z"]), D && (f = o["stroke-width"] % 2 / 2, j += f, l += f, z = /%$/.test(D) ? x * parseFloat(D) / 100 : D / 2, I = ["M", h - z, j, "L", h + z, j, "M", h - z, l, "L", h + z, l]), f = r["stroke-width"] % 2 / 2, i = E(p.medianPlot) + f, t = ["M", u, i, "L", w, i], n) p.stem.animate({ d: k }), D && p.whiskers.animate({ d: I }), y && p.box.animate({ d: H }), p.medianShape.animate({ d: t });else {
          p.graphic = n = c.g().add(a.group);p.stem = c.path(k).attr(m).add(n);if (D) p.whiskers = c.path(I).attr(o).add(n);if (y) p.box = c.path(H).attr(d).add(n);p.medianShape = c.path(t).attr(r).add(n);
        }
      });
    }, setStackedPoints: r });o.errorbar = t(o.boxplot, { color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: "<span style=\"color:{point.color}\">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>" },
    whiskerWidth: null });k.errorbar = u(k.boxplot, { type: "errorbar", pointArrayMap: ["low", "high"], toYData: function toYData(a) {
      return [a.low, a.high];
    }, pointValKey: "high", doQuartiles: !1, drawDataLabels: k.arearange ? k.arearange.prototype.drawDataLabels : r, getColumnMetrics: function getColumnMetrics() {
      return this.linkedParent && this.linkedParent.columnMetrics || k.column.prototype.getColumnMetrics.call(this);
    } });o.waterfall = t(o.column, { lineWidth: 1, lineColor: "#333", dashStyle: "dot", borderColor: "#333", dataLabels: { inside: !0 }, states: { hover: { lineWidthPlus: 0 } } });
  k.waterfall = u(k.column, { type: "waterfall", upColorProp: "fill", pointValKey: "y", translate: function translate() {
      var a = this.options,
          b = this.yAxis,
          c,
          d,
          g,
          e,
          j,
          l,
          i,
          f,
          h,
          n = q(a.minPointLength, 5),
          m = a.threshold,
          o = a.stacking;k.column.prototype.translate.apply(this);this.minPointLengthOffset = 0;i = f = m;d = this.points;for (c = 0, a = d.length; c < a; c++) {
        g = d[c];l = this.processedYData[c];e = g.shapeArgs;h = (j = o && b.stacks[(this.negStacks && l < m ? "-" : "") + this.stackKey]) ? j[g.x].points[this.index + "," + c] : [0, l];if (g.isSum) g.y = l;else if (g.isIntermediateSum) g.y = l - f;j = M(i, i + g.y) + h[0];e.y = b.translate(j, 0, 1);if (g.isSum) e.y = b.translate(h[1], 0, 1), e.height = Math.min(b.translate(h[0], 0, 1), b.len) - e.y + this.minPointLengthOffset;else if (g.isIntermediateSum) e.y = b.translate(h[1], 0, 1), e.height = Math.min(b.translate(f, 0, 1), b.len) - e.y + this.minPointLengthOffset, f = h[1];else {
          if (i !== 0) e.height = l > 0 ? b.translate(i, 0, 1) - e.y : b.translate(i, 0, 1) - b.translate(i - l, 0, 1);i += l;
        }e.height < 0 && (e.y += e.height, e.height *= -1);g.plotY = e.y = E(e.y) - this.borderWidth % 2 / 2;e.height = M(E(e.height), 0.001);g.yBottom = e.y + e.height;if (e.height <= n) e.height = n, this.minPointLengthOffset += n;e.y -= this.minPointLengthOffset;e = g.plotY + (g.negative ? e.height : 0) - this.minPointLengthOffset;this.chart.inverted ? g.tooltipPos[0] = b.len - e : g.tooltipPos[1] = e;
      }
    }, processData: function processData(a) {
      var b = this.yData,
          c = this.options.data,
          d,
          g = b.length,
          e,
          j,
          l,
          i,
          f,
          h;j = e = l = i = this.options.threshold || 0;for (h = 0; h < g; h++) {
        f = b[h], d = c && c[h] ? c[h] : {}, f === "sum" || d.isSum ? b[h] = j : f === "intermediateSum" || d.isIntermediateSum ? b[h] = e : (j += f, e += f), l = Math.min(j, l), i = Math.max(j, i);
      }w.prototype.processData.call(this, a);this.dataMin = l;this.dataMax = i;
    }, toYData: function toYData(a) {
      return a.isSum ? a.x === 0 ? null : "sum" : a.isIntermediateSum ? a.x === 0 ? null : "intermediateSum" : a.y;
    }, getAttribs: function getAttribs() {
      k.column.prototype.getAttribs.apply(this, arguments);var a = this,
          b = a.options,
          c = b.states,
          d = b.upColor || a.color,
          b = m.Color(d).brighten(0.1).get(),
          g = t(a.pointAttr),
          e = a.upColorProp;g[""][e] = d;g.hover[e] = c.hover.upColor || b;g.select[e] = c.select.upColor || d;s(a.points, function (e) {
        if (!e.options.color) e.y > 0 ? (e.pointAttr = g, e.color = d) : e.pointAttr = a.pointAttr;
      });
    }, getGraphPath: function getGraphPath() {
      var a = this.data,
          b = a.length,
          c = E(this.options.lineWidth + this.borderWidth) % 2 / 2,
          d = [],
          g,
          e,
          j;for (j = 1; j < b; j++) {
        e = a[j].shapeArgs, g = a[j - 1].shapeArgs, e = ["M", g.x + g.width, g.y + c, "L", e.x, g.y + c], a[j - 1].y < 0 && (e[2] += g.height, e[5] += g.height), d = d.concat(e);
      }return d;
    }, getExtremes: r, drawGraph: w.prototype.drawGraph });o.polygon = t(o.scatter, { marker: { enabled: !1 } });k.polygon = u(k.scatter, { type: "polygon", fillGraph: !0, getSegmentPath: function getSegmentPath(a) {
      return w.prototype.getSegmentPath.call(this, a).concat("z");
    }, drawGraph: w.prototype.drawGraph, drawLegendSymbol: m.LegendSymbolMixin.drawRectangle });o.bubble = t(o.scatter, { dataLabels: { formatter: function formatter() {
        return this.point.z;
      }, inside: !0, verticalAlign: "middle" }, marker: { lineColor: null, lineWidth: 1 }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z" });B = u(G, { haloPath: function haloPath() {
      return G.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size);
    }, ttBelow: !1 });k.bubble = u(k.scatter, { type: "bubble", pointClass: B, pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], bubblePadding: !0, zoneAxis: "z", pointAttrToOptions: { stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor" }, applyOpacity: function applyOpacity(a) {
      var b = this.options.marker,
          c = q(b.fillOpacity, 0.5),
          a = a || b.fillColor || this.color;c !== 1 && (a = T(a).setOpacity(c).get("rgba"));return a;
    }, convertAttribs: function convertAttribs() {
      var a = w.prototype.convertAttribs.apply(this, arguments);a.fill = this.applyOpacity(a.fill);return a;
    }, getRadii: function getRadii(a, b, c, d) {
      var g,
          e,
          j,
          l = this.zData,
          i = [],
          f = this.options,
          h = f.sizeBy !== "width",
          n = f.zThreshold,
          k = b - a;for (e = 0, g = l.length; e < g; e++) {
        j = l[e], f.sizeByAbsoluteValue && j !== null && (j = Math.abs(j - n), b = Math.max(b - n, Math.abs(a - n)), a = 0), j === null ? j = null : j < a ? j = c / 2 - 1 : (j = k > 0 ? (j - a) / k : 0.5, h && j >= 0 && (j = Math.sqrt(j)), j = x.ceil(c + j * (d - c)) / 2), i.push(j);
      }this.radii = i;
    }, animate: function animate(a) {
      var b = this.options.animation;if (!a) s(this.points, function (a) {
        var d = a.graphic,
            a = a.shapeArgs;d && a && (d.attr("r", 1), d.animate({ r: a.r }, b));
      }), this.animate = null;
    }, translate: function translate() {
      var a,
          b = this.data,
          c,
          d,
          g = this.radii;k.scatter.prototype.translate.call(this);for (a = b.length; a--;) {
        c = b[a], d = g ? g[a] : 0, typeof d === "number" && d >= this.minPxSize / 2 ? (c.shapeType = "circle", c.shapeArgs = { x: c.plotX, y: c.plotY, r: d }, c.dlBox = { x: c.plotX - d, y: c.plotY - d, width: 2 * d, height: 2 * d }) : c.shapeArgs = c.plotY = c.dlBox = void 0;
      }
    }, drawLegendSymbol: function drawLegendSymbol(a, b) {
      var c = this.chart.renderer,
          d = c.fontMetrics(a.itemStyle.fontSize).f / 2;b.legendSymbol = c.circle(d, a.baseline - d, d).attr({ zIndex: 3 }).add(b.legendGroup);b.legendSymbol.isMarker = !0;
    }, drawPoints: k.column.prototype.drawPoints, alignDataLabel: k.column.prototype.alignDataLabel, buildKDTree: r, applyZones: r });L.prototype.beforePadding = function () {
    var a = this,
        b = this.len,
        c = this.chart,
        d = 0,
        g = b,
        e = this.isXAxis,
        j = e ? "xData" : "yData",
        l = this.min,
        i = {},
        f = x.min(c.plotWidth, c.plotHeight),
        h = Number.MAX_VALUE,
        n = -Number.MAX_VALUE,
        k = this.max - l,
        m = b / k,
        o = [];s(this.series, function (b) {
      var g = b.options;if (b.bubblePadding && (b.visible || !c.options.chart.ignoreHiddenSeries)) if (a.allowZoomOutside = !0, o.push(b), e) s(["minSize", "maxSize"], function (a) {
        var b = g[a],
            e = /%$/.test(b),
            b = A(b);i[a] = e ? f * b / 100 : b;
      }), b.minPxSize = i.minSize, b.maxPxSize = i.maxSize, b = b.zData, b.length && (h = q(g.zMin, x.min(h, x.max(O(b), g.displayNegative === !1 ? g.zThreshold : -Number.MAX_VALUE))), n = q(g.zMax, x.max(n, P(b))));
    });s(o, function (a) {
      var b = a[j],
          c = b.length,
          f;e && a.getRadii(h, n, a.minPxSize, a.maxPxSize);if (k > 0) for (; c--;) {
        typeof b[c] === "number" && (f = a.radii[c], d = Math.min((b[c] - l) * m - f, d), g = Math.max((b[c] - l) * m + f, g));
      }
    });o.length && k > 0 && !this.isLog && (g -= b, m *= (b + d - g) / b, s([["min", "userMin", d], ["max", "userMax", g]], function (b) {
      q(a.options[b[0]], a[b[1]]) === void 0 && (a[b[0]] += b[2] / m);
    }));
  };(function () {
    function a(a, b) {
      var c = this.chart,
          d = this.options.animation,
          i = this.group,
          f = this.markerGroup,
          h = this.xAxis.center,
          n = c.plotLeft,
          k = c.plotTop;if (c.polar) {
        if (c.renderer.isSVG) d === !0 && (d = {}), b ? (c = { translateX: h[0] + n, translateY: h[1] + k, scaleX: 0.001, scaleY: 0.001 }, i.attr(c), f && f.attr(c)) : (c = { translateX: n,
          translateY: k, scaleX: 1, scaleY: 1 }, i.animate(c, d), f && f.animate(c, d), this.animate = null);
      } else a.call(this, b);
    }var b = w.prototype,
        c = R.prototype,
        d;b.searchPointByAngle = function (a) {
      var b = this.chart,
          c = this.xAxis.pane.center;return this.searchKDTree({ clientX: 180 + Math.atan2(a.chartX - c[0] - b.plotLeft, a.chartY - c[1] - b.plotTop) * (-180 / Math.PI) });
    };v(b, "buildKDTree", function (a) {
      if (this.chart.polar) this.kdByAngle ? this.searchPoint = this.searchPointByAngle : this.kdDimensions = 2;a.apply(this);
    });b.toXY = function (a) {
      var b,
          c = this.chart,
          d = a.plotX;b = a.plotY;a.rectPlotX = d;a.rectPlotY = b;b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - b);a.plotX = a.polarPlotX = b.x - c.plotLeft;a.plotY = a.polarPlotY = b.y - c.plotTop;this.kdByAngle ? (c = (d / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, c < 0 && (c += 360), a.clientX = c) : a.clientX = a.plotX;
    };k.spline && v(k.spline.prototype, "getPointSpline", function (a, b, c, d) {
      var i, f, h, n, k, m, o;if (this.chart.polar) {
        i = c.plotX;f = c.plotY;a = b[d - 1];h = b[d + 1];this.connectEnds && (a || (a = b[b.length - 2]), h || (h = b[1]));if (a && h) n = a.plotX, k = a.plotY, b = h.plotX, m = h.plotY, n = (1.5 * i + n) / 2.5, k = (1.5 * f + k) / 2.5, h = (1.5 * i + b) / 2.5, o = (1.5 * f + m) / 2.5, b = Math.sqrt(Math.pow(n - i, 2) + Math.pow(k - f, 2)), m = Math.sqrt(Math.pow(h - i, 2) + Math.pow(o - f, 2)), n = Math.atan2(k - f, n - i), k = Math.atan2(o - f, h - i), o = Math.PI / 2 + (n + k) / 2, Math.abs(n - o) > Math.PI / 2 && (o -= Math.PI), n = i + Math.cos(o) * b, k = f + Math.sin(o) * b, h = i + Math.cos(Math.PI + o) * m, o = f + Math.sin(Math.PI + o) * m, c.rightContX = h, c.rightContY = o;d ? (c = ["C", a.rightContX || a.plotX, a.rightContY || a.plotY, n || i, k || f, i, f], a.rightContX = a.rightContY = null) : c = ["M", i, f];
      } else c = a.call(this, b, c, d);return c;
    });v(b, "translate", function (a) {
      var b = this.chart;a.call(this);if (b.polar && (this.kdByAngle = b.tooltip && b.tooltip.shared, !this.preventPostTranslate)) {
        a = this.points;for (b = a.length; b--;) {
          this.toXY(a[b]);
        }
      }
    });v(b, "getGraphPath", function (a, b) {
      var c = this;if (this.chart.polar) {
        b = b || this.points;if (this.options.connectEnds !== !1 && b[0].y !== null) this.connectEnds = !0, b.splice(b.length, 0, b[0]);s(b, function (a) {
          a.polarPlotY === void 0 && c.toXY(a);
        });
      }return a.apply(this, [].slice.call(arguments, 1));
    });v(b, "animate", a);if (k.column) d = k.column.prototype, v(d, "animate", a), v(d, "translate", function (a) {
      var b = this.xAxis,
          c = this.yAxis.len,
          d = b.center,
          i = b.startAngleRad,
          f = this.chart.renderer,
          h,
          k;this.preventPostTranslate = !0;a.call(this);if (b.isRadial) {
        b = this.points;for (k = b.length; k--;) {
          h = b[k], a = h.barX + i, h.shapeType = "path", h.shapeArgs = { d: f.symbols.arc(d[0], d[1], c - h.plotY, null, { start: a, end: a + h.pointWidth, innerR: c - q(h.yBottom, c) }) }, this.toXY(h), h.tooltipPos = [h.plotX, h.plotY], h.ttBelow = h.plotY > d[1];
        }
      }
    }), v(d, "alignDataLabel", function (a, c, d, l, i, f) {
      if (this.chart.polar) {
        a = c.rectPlotX / Math.PI * 180;if (l.align === null) l.align = a > 20 && a < 160 ? "left" : a > 200 && a < 340 ? "right" : "center";if (l.verticalAlign === null) l.verticalAlign = a < 45 || a > 315 ? "bottom" : a > 135 && a < 225 ? "top" : "middle";b.alignDataLabel.call(this, c, d, l, i, f);
      } else a.call(this, c, d, l, i, f);
    });v(c, "getCoordinates", function (a, b) {
      var c = this.chart,
          d = { xAxis: [], yAxis: [] };c.polar ? s(c.axes, function (a) {
        var f = a.isXAxis,
            g = a.center,
            k = b.chartX - g[0] - c.plotLeft,
            g = b.chartY - g[1] - c.plotTop;
        d[f ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(f ? Math.PI - Math.atan2(k, g) : Math.sqrt(Math.pow(k, 2) + Math.pow(g, 2)), !0) });
      }) : d = a.call(this, b);return d;
    });
  })();
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*
 Highcharts JS v4.2.3 (2016-02-08)
 Exporting module

 (c) 2010-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (f) {
  (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports ? module.exports = f : f(Highcharts);
})(function (f) {
  var r = f.win,
      m = r.document,
      A = f.Chart,
      t = f.addEvent,
      B = f.removeEvent,
      C = f.fireEvent,
      n = f.createElement,
      s = f.discardElement,
      v = f.css,
      l = f.merge,
      i = f.each,
      q = f.extend,
      F = f.splat,
      G = Math.max,
      H = f.isTouchDevice,
      I = f.Renderer.prototype.symbols,
      y = f.getOptions(),
      z;q(y.lang, { printChart: "Print chart", downloadPNG: "Download PNG image", downloadJPEG: "Download JPEG image", downloadPDF: "Download PDF document", downloadSVG: "Download SVG vector image",
    contextButtonTitle: "Chart context menu" });y.navigation = { menuStyle: { border: "1px solid #A0A0A0", background: "#FFFFFF", padding: "5px 0" }, menuItemStyle: { padding: "0 10px", background: "none", color: "#303030", fontSize: H ? "14px" : "11px" }, menuItemHoverStyle: { background: "#4572A5", color: "#FFFFFF" }, buttonOptions: { symbolFill: "#E0E0E0", symbolSize: 14, symbolStroke: "#666", symbolStrokeWidth: 3, symbolX: 12.5, symbolY: 10.5, align: "right", buttonSpacing: 3, height: 22, theme: { fill: "white", stroke: "none" }, verticalAlign: "top", width: 24 } };
  y.exporting = { type: "image/png", url: "http://export.highcharts.com/", buttons: { contextButton: { menuClassName: "highcharts-contextmenu", symbol: "menu", _titleKey: "contextButtonTitle", menuItems: [{ textKey: "printChart", onclick: function onclick() {
            this.print();
          } }, { separator: !0 }, { textKey: "downloadPNG", onclick: function onclick() {
            this.exportChart();
          } }, { textKey: "downloadJPEG", onclick: function onclick() {
            this.exportChart({ type: "image/jpeg" });
          } }, { textKey: "downloadPDF", onclick: function onclick() {
            this.exportChart({ type: "application/pdf" });
          } }, { textKey: "downloadSVG",
          onclick: function onclick() {
            this.exportChart({ type: "image/svg+xml" });
          } }] } } };f.post = function (a, b, e) {
    var c,
        a = n("form", l({ method: "post", action: a, enctype: "multipart/form-data" }, e), { display: "none" }, m.body);for (c in b) {
      n("input", { type: "hidden", name: c, value: b[c] }, null, a);
    }a.submit();s(a);
  };q(A.prototype, { sanitizeSVG: function sanitizeSVG(a) {
      return a.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g, " xlink:href=").replace(/\n/, " ").replace(/<\/svg>.*?$/, "</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, " ").replace(/&shy;/g, "­").replace(/<IMG /g, "<image ").replace(/<(\/?)TITLE>/g, "<$1title>").replace(/height=([^" ]+)/g, 'height="$1"').replace(/width=([^" ]+)/g, 'width="$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>').replace(/ id=([^" >]+)/g, ' id="$1"').replace(/class=([^" >]+)/g, 'class="$1"').replace(/ transform /g, " ").replace(/:(path|rect)/g, "$1").replace(/style="([^"]+)"/g, function (b) {
        return b.toLowerCase();
      });
    }, getChartHTML: function getChartHTML() {
      return this.container.innerHTML;
    }, getSVG: function getSVG(a) {
      var b = this,
          e,
          c,
          g,
          j,
          k,
          d = l(b.options, a),
          J = d.exporting.allowHTML;if (!m.createElementNS) m.createElementNS = function (b, a) {
        return m.createElement(a);
      };c = n("div", null, { position: "absolute", top: "-9999em", width: b.chartWidth + "px", height: b.chartHeight + "px" }, m.body);g = b.renderTo.style.width;k = b.renderTo.style.height;g = d.exporting.sourceWidth || d.chart.width || /px$/.test(g) && parseInt(g, 10) || 600;k = d.exporting.sourceHeight || d.chart.height || /px$/.test(k) && parseInt(k, 10) || 400;q(d.chart, { animation: !1, renderTo: c, forExport: !0, renderer: "SVGRenderer", width: g, height: k });d.exporting.enabled = !1;delete d.data;d.series = [];i(b.series, function (a) {
        j = l(a.userOptions, { animation: !1, enableMouseTracking: !1, showCheckbox: !1, visible: a.visible });j.isInternal || d.series.push(j);
      });a && i(["xAxis", "yAxis"], function (b) {
        i(F(a[b]), function (a, c) {
          d[b][c] = l(d[b][c], a);
        });
      });e = new f.Chart(d, b.callback);i(["xAxis", "yAxis"], function (a) {
        i(b[a], function (b, c) {
          var d = e[a][c],
              f = b.getExtremes(),
              g = f.userMin,
              f = f.userMax;d && (g !== void 0 || f !== void 0) && d.setExtremes(g, f, !0, !1);
        });
      });g = e.getChartHTML();d = null;e.destroy();s(c);if (J && (c = g.match(/<\/svg>(.*?$)/))) c = '<foreignObject x="0" y="0" width="200" height="200"><body xmlns="http://www.w3.org/1999/xhtml">' + c[1] + "</body></foreignObject>", g = g.replace("</svg>", c + "</svg>");g = this.sanitizeSVG(g);return g = g.replace(/(url\(#highcharts-[0-9]+)&quot;/g, "$1").replace(/&quot;/g, "'");
    }, getSVGForExport: function getSVGForExport(a, b) {
      var e = this.options.exporting;return this.getSVG(l({ chart: { borderRadius: 0 } }, e.chartOptions, b, { exporting: { sourceWidth: a && a.sourceWidth || e.sourceWidth, sourceHeight: a && a.sourceHeight || e.sourceHeight } }));
    }, exportChart: function exportChart(a, b) {
      var e = this.getSVGForExport(a, b),
          a = l(this.options.exporting, a);f.post(a.url, { filename: a.filename || "chart", type: a.type, width: a.width || 0, scale: a.scale || 2, svg: e }, a.formAttributes);
    }, print: function print() {
      var a = this,
          b = a.container,
          e = [],
          c = b.parentNode,
          f = m.body,
          j = f.childNodes;if (!a.isPrinting) a.isPrinting = !0, a.pointer.reset(null, 0), C(a, "beforePrint"), i(j, function (a, b) {
        if (a.nodeType === 1) e[b] = a.style.display, a.style.display = "none";
      }), f.appendChild(b), r.focus(), r.print(), setTimeout(function () {
        c.appendChild(b);i(j, function (a, b) {
          if (a.nodeType === 1) a.style.display = e[b];
        });a.isPrinting = !1;C(a, "afterPrint");
      }, 1E3);
    }, contextMenu: function contextMenu(a, b, e, c, f, j, k) {
      var d = this,
          l = d.options.navigation,
          D = l.menuItemStyle,
          o = d.chartWidth,
          p = d.chartHeight,
          E = "cache-" + a,
          h = d[E],
          u = G(f, j),
          w,
          x,
          r,
          s = function s(b) {
        d.pointer.inClass(b.target, a) || x();
      };if (!h) d[E] = h = n("div", { className: a }, { position: "absolute", zIndex: 1E3, padding: u + "px" }, d.container), w = n("div", null, q({ MozBoxShadow: "3px 3px 10px #888", WebkitBoxShadow: "3px 3px 10px #888", boxShadow: "3px 3px 10px #888" }, l.menuStyle), h), x = function x() {
        v(h, { display: "none" });k && k.setState(0);d.openMenu = !1;
      }, t(h, "mouseleave", function () {
        r = setTimeout(x, 500);
      }), t(h, "mouseenter", function () {
        clearTimeout(r);
      }), t(m, "mouseup", s), t(d, "destroy", function () {
        B(m, "mouseup", s);
      }), i(b, function (a) {
        if (a) {
          var b = a.separator ? n("hr", null, null, w) : n("div", { onmouseover: function onmouseover() {
              v(this, l.menuItemHoverStyle);
            }, onmouseout: function onmouseout() {
              v(this, D);
            }, onclick: function onclick(b) {
              b && b.stopPropagation();x();a.onclick && a.onclick.apply(d, arguments);
            }, innerHTML: a.text || d.options.lang[a.textKey] }, q({ cursor: "pointer" }, D), w);d.exportDivElements.push(b);
        }
      }), d.exportDivElements.push(w, h), d.exportMenuWidth = h.offsetWidth, d.exportMenuHeight = h.offsetHeight;b = { display: "block" };e + d.exportMenuWidth > o ? b.right = o - e - f - u + "px" : b.left = e - u + "px";c + j + d.exportMenuHeight > p && k.alignOptions.verticalAlign !== "top" ? b.bottom = p - c - u + "px" : b.top = c + j - u + "px";v(h, b);d.openMenu = !0;
    }, addButton: function addButton(a) {
      var b = this,
          e = b.renderer,
          c = l(b.options.navigation.buttonOptions, a),
          g = c.onclick,
          j = c.menuItems,
          k,
          d,
          m = { stroke: c.symbolStroke, fill: c.symbolFill },
          i = c.symbolSize || 12;if (!b.btnCount) b.btnCount = 0;if (!b.exportDivElements) b.exportDivElements = [], b.exportSVGElements = [];if (c.enabled !== !1) {
        var o = c.theme,
            p = o.states,
            n = p && p.hover,
            p = p && p.select,
            h;delete o.states;g ? h = function h(a) {
          a.stopPropagation();g.call(b, a);
        } : j && (h = function h() {
          b.contextMenu(d.menuClassName, j, d.translateX, d.translateY, d.width, d.height, d);d.setState(2);
        });c.text && c.symbol ? o.paddingLeft = f.pick(o.paddingLeft, 25) : c.text || q(o, { width: c.width, height: c.height, padding: 0 });d = e.button(c.text, 0, 0, h, o, n, p).attr({ title: b.options.lang[c._titleKey], "stroke-linecap": "round", zIndex: 3 });d.menuClassName = a.menuClassName || "highcharts-menu-" + b.btnCount++;c.symbol && (k = e.symbol(c.symbol, c.symbolX - i / 2, c.symbolY - i / 2, i, i).attr(q(m, { "stroke-width": c.symbolStrokeWidth || 1, zIndex: 1 })).add(d));d.add().align(q(c, { width: d.width, x: f.pick(c.x, z) }), !0, "spacingBox");z += (d.width + c.buttonSpacing) * (c.align === "right" ? -1 : 1);b.exportSVGElements.push(d, k);
      }
    }, destroyExport: function destroyExport(a) {
      var a = a.target,
          b,
          e;for (b = 0; b < a.exportSVGElements.length; b++) {
        if (e = a.exportSVGElements[b]) e.onclick = e.ontouchstart = null, a.exportSVGElements[b] = e.destroy();
      }for (b = 0; b < a.exportDivElements.length; b++) {
        e = a.exportDivElements[b], B(e, "mouseleave"), a.exportDivElements[b] = e.onmouseout = e.onmouseover = e.ontouchstart = e.onclick = null, s(e);
      }
    } });I.menu = function (a, b, e, c) {
    return ["M", a, b + 2.5, "L", a + e, b + 2.5, "M", a, b + c / 2 + 0.5, "L", a + e, b + c / 2 + 0.5, "M", a, b + c - 1.5, "L", a + e, b + c - 1.5];
  };A.prototype.callbacks.push(function (a) {
    var b,
        e = a.options.exporting,
        c = e.buttons;z = 0;if (e.enabled !== !1) {
      for (b in c) {
        a.addButton(c[b]);
      }t(a, "destroy", a.destroyExport);
    }
  });
});
require.register("deps/phoenix/web/static/js/phoenix", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Phoenix Channels JavaScript client
//
// ## Socket Connection
//
// A single connection is established to the server and
// channels are mulitplexed over the connection.
// Connect to the server using the `Socket` class:
//
//     let socket = new Socket("/ws", {params: {userToken: "123"}})
//     socket.connect()
//
// The `Socket` constructor takes the mount point of the socket,
// the authentication params, as well as options that can be found in
// the Socket docs, such as configuring the `LongPoll` transport, and
// heartbeat.
//
// ## Channels
//
// Channels are isolated, concurrent processes on the server that
// subscribe to topics and broker events between the client and server.
// To join a channel, you must provide the topic, and channel params for
// authorization. Here's an example chat room example where `"new_msg"`
// events are listened for, messages are pushed to the server, and
// the channel is joined with ok/error/timeout matches:
//
//     let channel = socket.channel("rooms:123", {token: roomToken})
//     channel.on("new_msg", msg => console.log("Got message", msg) )
//     $input.onEnter( e => {
//       channel.push("new_msg", {body: e.target.val}, 10000)
//        .receive("ok", (msg) => console.log("created message", msg) )
//        .receive("error", (reasons) => console.log("create failed", reasons) )
//        .receive("timeout", () => console.log("Networking issue...") )
//     })
//     channel.join()
//       .receive("ok", ({messages}) => console.log("catching up", messages) )
//       .receive("error", ({reason}) => console.log("failed join", reason) )
//       .receive("timeout", () => console.log("Networking issue. Still waiting...") )
//
//
// ## Joining
//
// Creating a channel with `socket.channel(topic, params)`, binds the params to
// `channel.params`, which are sent up on `channel.join()`.
// Subsequent rejoins will send up the modified params for
// updating authorization params, or passing up last_message_id information.
// Successful joins receive an "ok" status, while unsuccessful joins
// receive "error".
//
//
// ## Pushing Messages
//
// From the previous example, we can see that pushing messages to the server
// can be done with `channel.push(eventName, payload)` and we can optionally
// receive responses from the push. Additionally, we can use
// `receive("timeout", callback)` to abort waiting for our other `receive` hooks
//  and take action after some period of waiting. The default timeout is 5000ms.
//
//
// ## Socket Hooks
//
// Lifecycle events of the multiplexed connection can be hooked into via
// `socket.onError()` and `socket.onClose()` events, ie:
//
//     socket.onError( () => console.log("there was an error with the connection!") )
//     socket.onClose( () => console.log("the connection dropped") )
//
//
// ## Channel Hooks
//
// For each joined channel, you can bind to `onError` and `onClose` events
// to monitor the channel lifecycle, ie:
//
//     channel.onError( () => console.log("there was an error!") )
//     channel.onClose( () => console.log("the channel has gone away gracefully") )
//
// ### onError hooks
//
// `onError` hooks are invoked if the socket connection drops, or the channel
// crashes on the server. In either case, a channel rejoin is attemtped
// automatically in an exponential backoff manner.
//
// ### onClose hooks
//
// `onClose` hooks are invoked only in two cases. 1) the channel explicitly
// closed on the server, or 2). The client explicitly closed, by calling
// `channel.leave()`
//

var VSN = "1.0.0";
var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
var DEFAULT_TIMEOUT = 10000;
var CHANNEL_STATES = {
  closed: "closed",
  errored: "errored",
  joined: "joined",
  joining: "joining"
};
var CHANNEL_EVENTS = {
  close: "phx_close",
  error: "phx_error",
  join: "phx_join",
  reply: "phx_reply",
  leave: "phx_leave"
};
var TRANSPORTS = {
  longpoll: "longpoll",
  websocket: "websocket"
};

var Push = function () {

  // Initializes the Push
  //
  // channel - The Channel
  // event - The event, for example `"phx_join"`
  // payload - The payload, for example `{user_id: 123}`
  // timeout - The push timeout in milliseconds
  //

  function Push(channel, event, payload, timeout) {
    _classCallCheck(this, Push);

    this.channel = channel;
    this.event = event;
    this.payload = payload || {};
    this.receivedResp = null;
    this.timeout = timeout;
    this.timeoutTimer = null;
    this.recHooks = [];
    this.sent = false;
  }

  _createClass(Push, [{
    key: "resend",
    value: function resend(timeout) {
      this.timeout = timeout;
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
      this.send();
    }
  }, {
    key: "send",
    value: function send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload,
        ref: this.ref
      });
    }
  }, {
    key: "receive",
    value: function receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }

      this.recHooks.push({ status: status, callback: callback });
      return this;
    }

    // private

  }, {
    key: "matchReceive",
    value: function matchReceive(_ref) {
      var status = _ref.status;
      var response = _ref.response;
      var ref = _ref.ref;

      this.recHooks.filter(function (h) {
        return h.status === status;
      }).forEach(function (h) {
        return h.callback(response);
      });
    }
  }, {
    key: "cancelRefEvent",
    value: function cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
  }, {
    key: "cancelTimeout",
    value: function cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
  }, {
    key: "startTimeout",
    value: function startTimeout() {
      var _this = this;

      if (this.timeoutTimer) {
        return;
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);

      this.channel.on(this.refEvent, function (payload) {
        _this.cancelRefEvent();
        _this.cancelTimeout();
        _this.receivedResp = payload;
        _this.matchReceive(payload);
      });

      this.timeoutTimer = setTimeout(function () {
        _this.trigger("timeout", {});
      }, this.timeout);
    }
  }, {
    key: "hasReceived",
    value: function hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
  }, {
    key: "trigger",
    value: function trigger(status, response) {
      this.channel.trigger(this.refEvent, { status: status, response: response });
    }
  }]);

  return Push;
}();

var Channel = exports.Channel = function () {
  function Channel(topic, params, socket) {
    var _this2 = this;

    _classCallCheck(this, Channel);

    this.state = CHANNEL_STATES.closed;
    this.topic = topic;
    this.params = params || {};
    this.socket = socket;
    this.bindings = [];
    this.timeout = this.socket.timeout;
    this.joinedOnce = false;
    this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
    this.pushBuffer = [];
    this.rejoinTimer = new Timer(function () {
      return _this2.rejoinUntilConnected();
    }, this.socket.reconnectAfterMs);
    this.joinPush.receive("ok", function () {
      _this2.state = CHANNEL_STATES.joined;
      _this2.rejoinTimer.reset();
      _this2.pushBuffer.forEach(function (pushEvent) {
        return pushEvent.send();
      });
      _this2.pushBuffer = [];
    });
    this.onClose(function () {
      _this2.socket.log("channel", "close " + _this2.topic);
      _this2.state = CHANNEL_STATES.closed;
      _this2.socket.remove(_this2);
    });
    this.onError(function (reason) {
      _this2.socket.log("channel", "error " + _this2.topic, reason);
      _this2.state = CHANNEL_STATES.errored;
      _this2.rejoinTimer.scheduleTimeout();
    });
    this.joinPush.receive("timeout", function () {
      if (_this2.state !== CHANNEL_STATES.joining) {
        return;
      }

      _this2.socket.log("channel", "timeout " + _this2.topic, _this2.joinPush.timeout);
      _this2.state = CHANNEL_STATES.errored;
      _this2.rejoinTimer.scheduleTimeout();
    });
    this.on(CHANNEL_EVENTS.reply, function (payload, ref) {
      _this2.trigger(_this2.replyEventName(ref), payload);
    });
  }

  _createClass(Channel, [{
    key: "rejoinUntilConnected",
    value: function rejoinUntilConnected() {
      this.rejoinTimer.scheduleTimeout();
      if (this.socket.isConnected()) {
        this.rejoin();
      }
    }
  }, {
    key: "join",
    value: function join() {
      var timeout = arguments.length <= 0 || arguments[0] === undefined ? this.timeout : arguments[0];

      if (this.joinedOnce) {
        throw "tried to join multiple times. 'join' can only be called a single time per channel instance";
      } else {
        this.joinedOnce = true;
      }
      this.rejoin(timeout);
      return this.joinPush;
    }
  }, {
    key: "onClose",
    value: function onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
  }, {
    key: "onError",
    value: function onError(callback) {
      this.on(CHANNEL_EVENTS.error, function (reason) {
        return callback(reason);
      });
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      this.bindings.push({ event: event, callback: callback });
    }
  }, {
    key: "off",
    value: function off(event) {
      this.bindings = this.bindings.filter(function (bind) {
        return bind.event !== event;
      });
    }
  }, {
    key: "canPush",
    value: function canPush() {
      return this.socket.isConnected() && this.state === CHANNEL_STATES.joined;
    }
  }, {
    key: "push",
    value: function push(event, payload) {
      var timeout = arguments.length <= 2 || arguments[2] === undefined ? this.timeout : arguments[2];

      if (!this.joinedOnce) {
        throw "tried to push '" + event + "' to '" + this.topic + "' before joining. Use channel.join() before pushing events";
      }
      var pushEvent = new Push(this, event, payload, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }

      return pushEvent;
    }

    // Leaves the channel
    //
    // Unsubscribes from server events, and
    // instructs channel to terminate on server
    //
    // Triggers onClose() hooks
    //
    // To receive leave acknowledgements, use the a `receive`
    // hook to bind to the server ack, ie:
    //
    //     channel.leave().receive("ok", () => alert("left!") )
    //

  }, {
    key: "leave",
    value: function leave() {
      var _this3 = this;

      var timeout = arguments.length <= 0 || arguments[0] === undefined ? this.timeout : arguments[0];

      var onClose = function onClose() {
        _this3.socket.log("channel", "leave " + _this3.topic);
        _this3.trigger(CHANNEL_EVENTS.close, "leave");
      };
      var leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
      leavePush.receive("ok", function () {
        return onClose();
      }).receive("timeout", function () {
        return onClose();
      });
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }

      return leavePush;
    }

    // Overridable message hook
    //
    // Receives all events for specialized message handling

  }, {
    key: "onMessage",
    value: function onMessage(event, payload, ref) {}

    // private

  }, {
    key: "isMember",
    value: function isMember(topic) {
      return this.topic === topic;
    }
  }, {
    key: "sendJoin",
    value: function sendJoin(timeout) {
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
  }, {
    key: "rejoin",
    value: function rejoin() {
      var timeout = arguments.length <= 0 || arguments[0] === undefined ? this.timeout : arguments[0];
      this.sendJoin(timeout);
    }
  }, {
    key: "trigger",
    value: function trigger(triggerEvent, payload, ref) {
      this.onMessage(triggerEvent, payload, ref);
      this.bindings.filter(function (bind) {
        return bind.event === triggerEvent;
      }).map(function (bind) {
        return bind.callback(payload, ref);
      });
    }
  }, {
    key: "replyEventName",
    value: function replyEventName(ref) {
      return "chan_reply_" + ref;
    }
  }]);

  return Channel;
}();

var Socket = exports.Socket = function () {

  // Initializes the Socket
  //
  // endPoint - The string WebSocket endpoint, ie, "ws://example.com/ws",
  //                                               "wss://example.com"
  //                                               "/ws" (inherited host & protocol)
  // opts - Optional configuration
  //   transport - The Websocket Transport, for example WebSocket or Phoenix.LongPoll.
  //               Defaults to WebSocket with automatic LongPoll fallback.
  //   timeout - The default timeout in milliseconds to trigger push timeouts.
  //             Defaults `DEFAULT_TIMEOUT`
  //   heartbeatIntervalMs - The millisec interval to send a heartbeat message
  //   reconnectAfterMs - The optional function that returns the millsec
  //                      reconnect interval. Defaults to stepped backoff of:
  //
  //     function(tries){
  //       return [1000, 5000, 10000][tries - 1] || 10000
  //     }
  //
  //   logger - The optional function for specialized logging, ie:
  //     `logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
  //
  //   longpollerTimeout - The maximum timeout of a long poll AJAX request.
  //                        Defaults to 20s (double the server long poll timer).
  //
  //   params - The optional params to pass when connecting
  //
  // For IE8 support use an ES5-shim (https://github.com/es-shims/es5-shim)
  //

  function Socket(endPoint) {
    var _this4 = this;

    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Socket);

    this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
    this.channels = [];
    this.sendBuffer = [];
    this.ref = 0;
    this.timeout = opts.timeout || DEFAULT_TIMEOUT;
    this.transport = opts.transport || window.WebSocket || LongPoll;
    this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 30000;
    this.reconnectAfterMs = opts.reconnectAfterMs || function (tries) {
      return [1000, 2000, 5000, 10000][tries - 1] || 10000;
    };
    this.logger = opts.logger || function () {}; // noop
    this.longpollerTimeout = opts.longpollerTimeout || 20000;
    this.params = opts.params || {};
    this.endPoint = endPoint + "/" + TRANSPORTS.websocket;
    this.reconnectTimer = new Timer(function () {
      _this4.disconnect(function () {
        return _this4.connect();
      });
    }, this.reconnectAfterMs);
  }

  _createClass(Socket, [{
    key: "protocol",
    value: function protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
  }, {
    key: "endPointURL",
    value: function endPointURL() {
      var uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params), { vsn: VSN });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return this.protocol() + ":" + uri;
      }

      return this.protocol() + "://" + location.host + uri;
    }
  }, {
    key: "disconnect",
    value: function disconnect(callback, code, reason) {
      if (this.conn) {
        this.conn.onclose = function () {}; // noop
        if (code) {
          this.conn.close(code, reason || "");
        } else {
          this.conn.close();
        }
        this.conn = null;
      }
      callback && callback();
    }

    // params - The params to send when connecting, for example `{user_id: userToken}`

  }, {
    key: "connect",
    value: function connect(params) {
      var _this5 = this;

      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = params;
      }
      if (this.conn) {
        return;
      }

      this.conn = new this.transport(this.endPointURL());
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = function () {
        return _this5.onConnOpen();
      };
      this.conn.onerror = function (error) {
        return _this5.onConnError(error);
      };
      this.conn.onmessage = function (event) {
        return _this5.onConnMessage(event);
      };
      this.conn.onclose = function (event) {
        return _this5.onConnClose(event);
      };
    }

    // Logs the message. Override `this.logger` for specialized logging. noops by default

  }, {
    key: "log",
    value: function log(kind, msg, data) {
      this.logger(kind, msg, data);
    }

    // Registers callbacks for connection state change events
    //
    // Examples
    //
    //    socket.onError(function(error){ alert("An error occurred") })
    //

  }, {
    key: "onOpen",
    value: function onOpen(callback) {
      this.stateChangeCallbacks.open.push(callback);
    }
  }, {
    key: "onClose",
    value: function onClose(callback) {
      this.stateChangeCallbacks.close.push(callback);
    }
  }, {
    key: "onError",
    value: function onError(callback) {
      this.stateChangeCallbacks.error.push(callback);
    }
  }, {
    key: "onMessage",
    value: function onMessage(callback) {
      this.stateChangeCallbacks.message.push(callback);
    }
  }, {
    key: "onConnOpen",
    value: function onConnOpen() {
      var _this6 = this;

      this.log("transport", "connected to " + this.endPointURL(), this.transport.prototype);
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      if (!this.conn.skipHeartbeat) {
        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(function () {
          return _this6.sendHeartbeat();
        }, this.heartbeatIntervalMs);
      }
      this.stateChangeCallbacks.open.forEach(function (callback) {
        return callback();
      });
    }
  }, {
    key: "onConnClose",
    value: function onConnClose(event) {
      this.log("transport", "close", event);
      this.triggerChanError();
      clearInterval(this.heartbeatTimer);
      this.reconnectTimer.scheduleTimeout();
      this.stateChangeCallbacks.close.forEach(function (callback) {
        return callback(event);
      });
    }
  }, {
    key: "onConnError",
    value: function onConnError(error) {
      this.log("transport", error);
      this.triggerChanError();
      this.stateChangeCallbacks.error.forEach(function (callback) {
        return callback(error);
      });
    }
  }, {
    key: "triggerChanError",
    value: function triggerChanError() {
      this.channels.forEach(function (channel) {
        return channel.trigger(CHANNEL_EVENTS.error);
      });
    }
  }, {
    key: "connectionState",
    value: function connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this.connectionState() === "open";
    }
  }, {
    key: "remove",
    value: function remove(channel) {
      this.channels = this.channels.filter(function (c) {
        return !c.isMember(channel.topic);
      });
    }
  }, {
    key: "channel",
    value: function channel(topic) {
      var chanParams = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
  }, {
    key: "push",
    value: function push(data) {
      var _this7 = this;

      var topic = data.topic;
      var event = data.event;
      var payload = data.payload;
      var ref = data.ref;

      var callback = function callback() {
        return _this7.conn.send(JSON.stringify(data));
      };
      this.log("push", topic + " " + event + " (" + ref + ")", payload);
      if (this.isConnected()) {
        callback();
      } else {
        this.sendBuffer.push(callback);
      }
    }

    // Return the next message ref, accounting for overflows

  }, {
    key: "makeRef",
    value: function makeRef() {
      var newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }

      return this.ref.toString();
    }
  }, {
    key: "sendHeartbeat",
    value: function sendHeartbeat() {
      if (!this.isConnected()) {
        return;
      }
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.makeRef() });
    }
  }, {
    key: "flushSendBuffer",
    value: function flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach(function (callback) {
          return callback();
        });
        this.sendBuffer = [];
      }
    }
  }, {
    key: "onConnMessage",
    value: function onConnMessage(rawMessage) {
      var msg = JSON.parse(rawMessage.data);
      var topic = msg.topic;
      var event = msg.event;
      var payload = msg.payload;
      var ref = msg.ref;

      this.log("receive", (payload.status || "") + " " + topic + " " + event + " " + (ref && "(" + ref + ")" || ""), payload);
      this.channels.filter(function (channel) {
        return channel.isMember(topic);
      }).forEach(function (channel) {
        return channel.trigger(event, payload, ref);
      });
      this.stateChangeCallbacks.message.forEach(function (callback) {
        return callback(msg);
      });
    }
  }]);

  return Socket;
}();

var LongPoll = exports.LongPoll = function () {
  function LongPoll(endPoint) {
    _classCallCheck(this, LongPoll);

    this.endPoint = null;
    this.token = null;
    this.skipHeartbeat = true;
    this.onopen = function () {}; // noop
    this.onerror = function () {}; // noop
    this.onmessage = function () {}; // noop
    this.onclose = function () {}; // noop
    this.pollEndpoint = this.normalizeEndpoint(endPoint);
    this.readyState = SOCKET_STATES.connecting;

    this.poll();
  }

  _createClass(LongPoll, [{
    key: "normalizeEndpoint",
    value: function normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)\/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
  }, {
    key: "endpointURL",
    value: function endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
  }, {
    key: "closeAndRetry",
    value: function closeAndRetry() {
      this.close();
      this.readyState = SOCKET_STATES.connecting;
    }
  }, {
    key: "ontimeout",
    value: function ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry();
    }
  }, {
    key: "poll",
    value: function poll() {
      var _this8 = this;

      if (!(this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting)) {
        return;
      }

      Ajax.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), function (resp) {
        if (resp) {
          var status = resp.status;
          var token = resp.token;
          var messages = resp.messages;

          _this8.token = token;
        } else {
          var status = 0;
        }

        switch (status) {
          case 200:
            messages.forEach(function (msg) {
              return _this8.onmessage({ data: JSON.stringify(msg) });
            });
            _this8.poll();
            break;
          case 204:
            _this8.poll();
            break;
          case 410:
            _this8.readyState = SOCKET_STATES.open;
            _this8.onopen();
            _this8.poll();
            break;
          case 0:
          case 500:
            _this8.onerror();
            _this8.closeAndRetry();
            break;
          default:
            throw "unhandled poll status " + status;
        }
      });
    }
  }, {
    key: "send",
    value: function send(body) {
      var _this9 = this;

      Ajax.request("POST", this.endpointURL(), "application/json", body, this.timeout, this.onerror.bind(this, "timeout"), function (resp) {
        if (!resp || resp.status !== 200) {
          _this9.onerror(status);
          _this9.closeAndRetry();
        }
      });
    }
  }, {
    key: "close",
    value: function close(code, reason) {
      this.readyState = SOCKET_STATES.closed;
      this.onclose();
    }
  }]);

  return LongPoll;
}();

var Ajax = exports.Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, null, [{
    key: "request",
    value: function request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (window.XDomainRequest) {
        var req = new XDomainRequest(); // IE8, IE9
        this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        var req = window.XMLHttpRequest ? new XMLHttpRequest() : // IE7+, Firefox, Chrome, Opera, Safari
        new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
        this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
  }, {
    key: "xdomainRequest",
    value: function xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      var _this10 = this;

      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = function () {
        var response = _this10.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }

      // Work around bug in IE9 that requires an attached onprogress handler
      req.onprogress = function () {};

      req.send(body);
    }
  }, {
    key: "xhrRequest",
    value: function xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      var _this11 = this;

      req.timeout = timeout;
      req.open(method, endPoint, true);
      req.setRequestHeader("Content-Type", accept);
      req.onerror = function () {
        callback && callback(null);
      };
      req.onreadystatechange = function () {
        if (req.readyState === _this11.states.complete && callback) {
          var response = _this11.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }

      req.send(body);
    }
  }, {
    key: "parseJSON",
    value: function parseJSON(resp) {
      return resp && resp !== "" ? JSON.parse(resp) : null;
    }
  }, {
    key: "serialize",
    value: function serialize(obj, parentKey) {
      var queryStr = [];
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        var paramKey = parentKey ? parentKey + "[" + key + "]" : key;
        var paramVal = obj[key];
        if ((typeof paramVal === "undefined" ? "undefined" : _typeof(paramVal)) === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
  }, {
    key: "appendParams",
    value: function appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }

      var prefix = url.match(/\?/) ? "&" : "?";
      return "" + url + prefix + this.serialize(params);
    }
  }]);

  return Ajax;
}();

Ajax.states = { complete: 4 };

// Creates a timer that accepts a `timerCalc` function to perform
// calculated timeout retries, such as exponential backoff.
//
// ## Examples
//
//    let reconnectTimer = new Timer(() => this.connect(), function(tries){
//      return [1000, 5000, 10000][tries - 1] || 10000
//    })
//    reconnectTimer.scheduleTimeout() // fires after 1000
//    reconnectTimer.scheduleTimeout() // fires after 5000
//    reconnectTimer.reset()
//    reconnectTimer.scheduleTimeout() // fires after 1000
//

var Timer = function () {
  function Timer(callback, timerCalc) {
    _classCallCheck(this, Timer);

    this.callback = callback;
    this.timerCalc = timerCalc;
    this.timer = null;
    this.tries = 0;
  }

  _createClass(Timer, [{
    key: "reset",
    value: function reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }

    // Cancels any previous scheduleTimeout and schedules callback

  }, {
    key: "scheduleTimeout",
    value: function scheduleTimeout() {
      var _this12 = this;

      clearTimeout(this.timer);

      this.timer = setTimeout(function () {
        _this12.tries = _this12.tries + 1;
        _this12.callback();
      }, this.timerCalc(this.tries + 1));
    }
  }]);

  return Timer;
}();
});

;require.register("deps/phoenix_html/web/static/js/phoenix_html", function(exports, require, module) {
'use strict';

// Although ^=parent is not technically correct,
// we need to use it in order to get IE8 support.
var elements = document.querySelectorAll('[data-submit^=parent]');
var len = elements.length;

for (var i = 0; i < len; ++i) {
  elements[i].addEventListener('click', function (event) {
    var message = this.getAttribute("data-confirm");
    if (message === null || confirm(message)) {
      this.parentNode.submit();
    };
    event.preventDefault();
    return false;
  }, false);
}
});

;require.register("web/static/js/app", function(exports, require, module) {
"use strict";

require("deps/phoenix_html/web/static/js/phoenix_html");

var _highcharts_theme = require("./highcharts_theme");

var highchartsTheme = _interopRequireWildcard(_highcharts_theme);

var _socket = require("./socket");

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
});

;require.register("web/static/js/highcharts", function(exports, require, module) {
"use strict";
});

;require.register("web/static/js/highcharts_theme", function(exports, require, module) {
"use strict";

/**
 * Dark theme for Highcharts JS
 * @author Torstein Honsi
 */

Highcharts.theme = {
   colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [[0, '#2a2a2b'], [1, '#3e3e40']]
      },
      style: {
         fontFamily: "sans-serif"
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
});

require.register("web/static/js/socket", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _phoenix = require("deps/phoenix/web/static/js/phoenix");

var socket = new _phoenix.Socket("/socket", { params: { token: window.userToken } }); // NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":

socket.connect();

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

$(function () {
    var chart = new Highcharts.Chart({

        chart: {
            renderTo: 'container',
            defaultSeriesType: 'spline'
        },
        title: {
            text: 'Erlang Memory'
        },
        subtitle: {
            text: "Click on label to show/hide series"
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Bytes (Base10)',
                margin: 80
            }
        }
    });

    var chart_1 = new Highcharts.Chart({

        chart: {
            renderTo: 'container_1',
            defaultSeriesType: 'spline'
        },
        title: {
            text: 'Socket connections'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Connections',
                margin: 80
            }
        }
    });

    var chart_2 = new Highcharts.Chart({

        chart: {
            renderTo: 'container_2',
            defaultSeriesType: 'spline'
        },
        title: {
            text: 'Random numbers'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Value',
                margin: 80
            }
        }
    });

    var chart_3 = new Highcharts.Chart({

        chart: {
            renderTo: 'container_3',
            defaultSeriesType: 'spline'
        },
        title: {
            text: 'Run Queue'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Processes',
                margin: 80
            }
        }
    });

    function join_channel(name, target_chart) {
        var channel = socket.channel(name, {});
        channel.join().receive("ok", function (data) {
            console.log("Joined channel", name);
        }).receive("error", function (resp) {
            console.log("Unable to join topic", name);
        });

        channel.on("change", function (stat) {
            var series = target_chart.get(name);
            var shift = series.data.length > 40;
            var point = [stat.timestamp, stat.value];
            series.addPoint(point, true, shift);
        });
    }

    var topics = ["atom", "binary", "ets", "processes", "total"];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = topics[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var t = _step.value;

            var topic = "stats:erlang_memory_" + t;
            chart.addSeries({ id: topic, name: t.capitalize() });
            join_channel(topic, chart);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var topic = "stats:socket_connections_size";
    chart_1.addSeries({ id: topic, name: "Socket connections" });
    join_channel(topic, chart_1);

    var topic = "stats:random_number_value_1";
    chart_2.addSeries({ id: topic, name: "Random value #1" });
    join_channel(topic, chart_2);

    var topic = "stats:random_number_value_2";
    chart_2.addSeries({ id: topic, name: "Random value #2" });
    join_channel(topic, chart_2);

    var topic = "stats:random_number_value_3";
    chart_2.addSeries({ id: topic, name: "Random value #3" });
    join_channel(topic, chart_2);

    var topic = "stats:erlang_statistics_run_queue";
    chart_3.addSeries({ id: topic, name: "Proccesses" });
    join_channel(topic, chart_3);
});

exports.default = socket;
});

;require('web/static/js/app');
//# sourceMappingURL=app.js.map