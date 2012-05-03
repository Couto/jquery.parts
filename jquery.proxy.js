/*
  jQuery.proxy extracted from the jQuery source
  Here's a demo: http://jsfiddle.net/BuZ7J/
  Credits: @ @coutoantisocial

  Usage:
  // Extend
  var obj = proxy(function () {
      return this;
  }, document);

  obj() // returns document
*/

(function ( window ) {
    // Shortcuts
    var arrProto = Array.prototype,
        slice = arrProto.slice,
        toString = arrProto.toString;

    window.proxy = function( fn, context ) {
        if ( typeof context === "string" ) {
            var tmp = fn[context];
            context = fn;
            fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if (toString.call( fn ) !== '[object Function]') {
            return undefined;
        }

        // Simulated bind
        var args = slice.call( arguments, 2 ),
            proxy = function() {
                return fn.apply( context, args.concat( slice.call( arguments) ) );
            };

        return proxy;
    }

}( window ));
