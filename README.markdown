jsCompatible
============

Ensures that, as much as possible, the missing functionalities of the client javascript browser are "fixed". This prioritize mainly function calls, that may be a core of your script, and not the modern HTML5 features.


Usage
-----
Just include it inside your html/php file, before any other .js file.

> `<script type="text/javascript" src="jsCompatible.js"></script>`

Extending?
----------
Remember the focus is on functions that may not be fully supported, not html5 features. As this also aims to be as light-weight as possible. 

A good way to extend this, would be looking around mozilla MDN [<https://developer.mozilla.org/en/javascript>]. And to find functions that are part of the (newer?) javascript Ecma standard, but not fully supported, implementing the various compatibility patches provided.

Personally, i may extend this file as i use the various functions that may not be fully suported. If you are likewise doing the same, feel free to contribute.


Future & Syntax?
----------------
Note that each individual hack, is nested in its own function. This is to facilitate portability, and to make it easier "to selective customize" the hacks as of needed. (if required in specialised deployments)

You may also notice, each hack is nested around a single function, that may return true / false. The idea is that in the future, this true/false response may be captured, to provide a holistic compatibility report, for developers. It is however, currently just left in place for future use.