/********************************************************************************************************************************************************** 
source code
-name:	jsCompatible
-type: 	java script	(Not JSON-Script compliant)
-vers:	alpha 1 (24 July 2011)
-Discription:
Ensures that, as much as possible, the missing functionalities of the client javascript browser are "fixed".
This prioritize mainly function calls, that may be a core of your script, and not the modern HTML5 features.

-Main refrences:
-ToDo:
Collect, the functionalitiy check results. So that programs can check for dependencies against it.
Consider, the usage of variable flags to show the result : exists, failed, hacked, partial-hack : at each level?

-future suggestion:
-BUGS:
-documentation:		
*************************************************************** Author Details & CopyRight ****************************************************************
author: 	picoCreator
email:		pico.creator@gmail.com
website:	blog.pic-o.com
copyright:	cc by [CreativeCommons Attribution licenses]
			http://creativecommons.org/licenses/by/3.0/
			
cc notes:	
	+ Crediting me (Eugene Cheah AKA picoCreator) is required for derivatives of this work, UNLESS...
	+ An exception is given for using this on a live website, (eg, using this for your blog in the background) in which crediting every single source file directly may be impractical (even for commercial sites). 
	However this exception is only given if you drop me an email, with the link to deployment.
	+ This exception however does not hold in any source release of which this code is used (Its stated in the cc license btw), hence credit should be given in this case.
	+ These license requirments would be applied to all forks / merges / derivatives, of this work.

additional notes:
	+ I may update to add an additional open source licenses in the future / on requested =)
	+ Remember to drop an email if you are using this for a live site, ty (for my curiosity, to see where this code goes)
**********************************************************************************************************************************************************/

/***********************************************************
* console hack : Ensures console functions calls are handled
* gracefully, in event it is not built/enabled client-side.
************************************************************/
(function(){
	if(!window.console)	console 		= {};
	if(!console.log) 	console.log 	= function(){};
	if(!console.warn) 	console.warn 	= function(){};
	if(!console.error)	console.error 	= function(){};
	if(!console.info)	console.info 	= function(){};
	return true;	//Ends hacking -> Success / Exists
})();

/***********************************************************
* DOM functionality hacking of document.getElementByID
* Returns true / false on hack check success
*
* Modifyed from: http://www.netlobo.com/javascript_get_element_id.html
***********************************************************/
(function () { 
    if (!document.getElementById) {
		if (document.all) {
			document.getElementById = function getElementById(id) { return document.all[id]; }; 
		} else if (document.layers) {
			document.getElementById = function getElementById(id) { return document.layers[id]; }; 
		} else {
			return false;	//Ends hacking -> Failed
		}
		return true;	//Ends hacking -> Success
	}
	return true;	//Ends hacking -> Exists
})();

/***********************************************************
* Prototype Object.extend functionality check
* Returns true / false on hack check success
*
* While, this is not part of the offical standard, 
* there are dependencies on this framework that relies on it.
************************************************************/
(function(){
	//Ensures Object.extend works / exists
	if (!Object.extend) {
		Object.extend = function extend(destination, source) {
			for (var property in source) {
				destination[property] = source[property];
			}
			return destination;
		}
		return true;	//Ends hacking -> Success
		
		//return false;	//Ends hacking -> Failed
	}
	return true;	//Ends hacking -> Exists
})();

/***********************************************************
* Object.create functionality check [For outdated browsers]
* Returns true / false on hack check success
************************************************************/
(function(){
	//Ensures Object.create works / exists
	//This is done by either the more efficent __proto__ hacking
	//OR the new object hacking methods
	if (!Object.create) {	
		//Uses the new object hack method
		Object.create = function create(proto, propertiesObject) {
			var createFunc = function() {}; //Creates new object
			if(proto && Object(proto) === proto ) {
				createFunc.prototype = proto;
			}
			var obj = new createFunc();
			if(propertiesObject && Object(propertiesObject) === propertiesObject ) { //its an object
				Object.extend(obj, propertiesObject); //Sets the properties
			}
			return obj;
		}
		return true;	//Ends hacking -> Success
	
		//return false;	//Ends hacking -> Failed
	}
	return true;	//Ends hacking -> Exists
})();

/***********************************************************
* Object.getPrototypeOf functionality check [For Opera]
* Returns true / false on hack check success
************************************************************/
(function(){
	//Ensures Object.getPrototypeOf works / exists
	if (!Object.getPrototypeOf) {
		Object.getPrototypeOf = function getPrototypeOf(o){
			return o.__proto__;
		}
		return true;	//Ends hacking -> Success
	
		//return false;	//Ends hacking -> Failed
	}
	return true;	//Ends hacking -> Exists
})();

/***********************************************************
* Object.keys functionality check [For outdated browsers]
* Returns true / false on hack check success
************************************************************/
(function(){
	//Ensures Object.keys works / exists
	if (!Object.keys) {
		Object.keys = function keys(o){
			if (o !== Object(o))
			throw new TypeError('Object.keys called on non-object');
			var ret=[],p;
			for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
			return ret;
		}
		return true;	//Ends hacking -> Success
	
		//return false;	//Ends hacking -> Failed
	}
	return true;	//Ends hacking -> Exists
})();

/***********************************************************
* Function.prototype.bind functionality check [For Old browsers]
* Returns true / false on hack check success
* Note: This is from MDN and not a fully functionality hack
************************************************************/
(function(){
	if (!Function.prototype.bind) {
		Function.prototype.bind = function bind(oThis) {
		
			if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
			  throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");

			var aArgs = Array.prototype.slice.call(arguments, 1), 
				fToBind = this, 
				fNOP = function () {},
				fBound = function () {
				  return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));    
				};

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;

		};
		return true;	//Ends hacking -> Success

		//return false;	//Ends hacking -> Failed
	}
	return true;	//Ends hacking -> Exists
})();

/***********************************************************
* Array.prototype.indexOf functionality check [For Old browsers]
* Returns true / false on hack check success
* Note: This is from MDN (https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf)
************************************************************/
(function(){
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
			"use strict";
			if (this === void 0 || this === null) {
				throw new TypeError();
			}
			var t = Object(this);
			var len = t.length >>> 0;
			if (len === 0) {
				return -1;
			}
			var n = 0;
			if (arguments.length > 0) {
				n = Number(arguments[1]);
				if (n !== n) { // shortcut for verifying if it's NaN
					n = 0;
				} else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
			}
			if (n >= len) {
				return -1;
			}
			var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
			for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		}
		return true;	//Ends hacking -> Success

		//return false;	//Ends hacking -> Failed
	}
	return true;	//Ends hacking -> Exists
})();

/***********************************************************
* Array.prototype.lastIndexOf functionality check [For Old browsers]
* Returns true / false on hack check success
* Note: This is from MDN (https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
************************************************************/
(function(){
	if (!Array.prototype.lastIndexOf) {
		Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
			"use strict";
			if (this === void 0 || this === null)
			  throw new TypeError();

			var t = Object(this);
			var len = t.length >>> 0;
			if (len === 0)
			  return -1;

			var n = len;
			if (arguments.length > 1)
			{
			  n = Number(arguments[1]);
			  if (n !== n)
				n = 0;
			  else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}

			var k = n >= 0
				  ? Math.min(n, len - 1)
				  : len - Math.abs(n);

			for (; k >= 0; k--)
			{
			  if (k in t && t[k] === searchElement)
				return k;
			}
			return -1;
		};
		return true;	//Ends hacking -> Success

		//return false;	//Ends hacking -> Failed
	}
	return true;	//Ends hacking -> Exists
})();