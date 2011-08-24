jsCompatible
============

Ensures that, as much as possible, the missing functionalities of the client javascript browser are "fixed". This prioritize mainly function calls, that may be a core of your script, and not the modern HTML5 features.


Usage
-----
Just include it inside your html/php file, before any other .js file.

> `<script type="text/javascript" src="jsCompatible.js"></script>`

Extending?
----------
Remember the focus is on functions that may not be fully supported in all browsers, not html5 features. Keep it as light-weight as possible. 

A good way to extend this, would be looking around mozilla MDN [<https://developer.mozilla.org/en/javascript>]. And to find functions that are part of the (newer?) javascript Ecma standard, but not fully supported, implementing the various compatibility patches provided.

Personally, i may extend this file as i stumble across the various functions. If you are likewise doing the same, feel free to contribute.


Future & Syntax?
----------------
Note that each individual hack, is nested in its own function. This is to facilitate portability, and to make it easier "to selective customize" the hacks as of needed. (if required in specialized deployments)

You may also notice, each hack is nested around a single function, which may return true / false. The idea is that in the future, this true/false response may be captured, to provide a holistic compatibility report, for developers. It is however, currently just left in place for future use.

License?
--------
### author:		
picoCreator AKA Eugene Cheah
### email:
pico.creator{at}gmail.com
### website:		
blog.pic-o.com
### copyright:	
cc by (CreativeCommons Attribution licenses)
[http://creativecommons.org/licenses/by/3.0/]
### cc notes:
+ Crediting me (Eugene Cheah AKA picoCreator) is required for derivatives of this work, UNLESS...
+ An exception is given for using this on a live website, (eg, using this for your blog in the background) in which crediting every single source file directly may be impractical (even for commercial sites). 
However this exception is only given if you drop me an email, with the link to deployment.
+ This exception however does not hold in any source release of which this code is used (Its stated in the cc license btw), hence credit should be given in this case.
+ These license requirments would be applied to all forks / merges / derivatives, of this work.
### additional notes:
I may update to add an additional open source licenses in the future / on requested =)

Remember to drop an email if you are using this for a live site, ty (for my curiosity, to see where this code goes)