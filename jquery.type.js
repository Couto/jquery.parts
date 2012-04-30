/*!
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

/*

jQuery.type() and other specific type checks
extracted from the jQuery 1.7.2 source

Credit: @sindresorhus


Usage:
isFunction( ['a','b'] );	// false
isArray( ['a','b'] );		// true

Demo: http://jsfiddle.net/mofle/AzdKq/


See the jQuery API for documentation:
http://api.jquery.com/category/utilities/


*/
(function( window ) {
	"use strict";

	// [[Class]] -> type pairs
	var class2type = {},
		classTypes = "Boolean Number String Function Array Date RegExp Object".split(" "),
		l = classTypes.length,
		classTypeName,
		hasOwn = Object.prototype.hasOwnProperty;

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	window.isFunction = function( obj ) {
		return window.type(obj) === "function";
	};

	window.isArray = Array.isArray || function( obj ) {
		return window.type(obj) === "array";
	};

	window.isWindow = function( obj ) {
		return obj != null && obj == obj.window;
	};

	window.isNumeric = function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	};

	window.type = function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	};

	window.isPlainObject = function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || window.type(obj) !== "object" || obj.nodeType || window.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	};

	window.isEmptyObject = function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	};

	// Populate the class2type map
	while ( l-- ) {
		classTypeName = classTypes[ l ];
		class2type[ "[object " + classTypeName + "]" ] = classTypeName.toLowerCase();
	}

})( window );