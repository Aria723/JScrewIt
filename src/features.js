/* global self */

var FEATURE_INFOS;

var availableFeatureMask;
var featureMaskMap;
var getFeatureMask;
var incompatibleFeatureMasks;

(function ()
{
    'use strict';
    
    function completeFeature(feature, ignoreExcludes)
    {
        var mask = featureMaskMap[feature];
        if (mask == null)
        {
            var info = FEATURE_INFOS[feature];
            if (typeof info === 'string')
            {
                mask = completeFeature(info, ignoreExcludes);
                FEATURE_INFOS[feature] = FEATURE_INFOS[info];
            }
            else
            {
                if (info.check)
                {
                    mask = 1 << bitIndex++;
                    if (info.check())
                    {
                        availableFeatureMask |= mask;
                        autoIncludes.push(feature);
                    }
                }
                mask ^= 0;
                var includes = info.includes || (info.includes = []);
                includes.forEach(
                    function (include)
                    {
                        var includeMask = completeFeature(include);
                        mask |= includeMask;
                    }
                );
                var excludes = info.excludes || (info.excludes = []);
                if (ignoreExcludes !== true)
                {
                    excludes.forEach(
                        function (exclude)
                        {
                            var excludeMask = completeFeature(exclude, true);
                            var incompatibleMask = mask | excludeMask;
                            incompatibleFeatureMasks.push(incompatibleMask);
                        }
                    );
                }
                info.name = feature;
                var available = (mask & availableFeatureMask) === mask;
                info.available = available;
            }
            featureMaskMap[feature] = mask;
        }
        return mask;
    }
    
    var bitIndex = 0;
    
    FEATURE_INFOS =
    {
        ATOB:
        {
            description:
                'Existence of the global object functions atob and btoa.\n' +
                'This feature is not available in Internet Explorer versions prior to 11 and ' +
                'Node.js.',
            check: function ()
            {
                return typeof atob === 'function' && typeof btoa === 'function';
            }
        },
        CAPITAL_HTML:
        {
            description:
                'The property that the various string methods returning HTML code such as ' +
                'String.prototype.big or String.prototype.link have both the tag name and ' +
                'attributes written in capital letters.\n' +
                'This feature is only available in Internet Explorer.',
            check: function ()
            {
                var available =
                    ''.big()            === '<BIG></BIG>'               &&
                    ''.fontcolor('')    === '<FONT COLOR=""></FONT>'    &&
                    ''.fontsize('')     === '<FONT SIZE=""></FONT>'     &&
                    ''.link('')         === '<A HREF=""></A>'           &&
                    ''.small()          === '<SMALL></SMALL>'           &&
                    ''.strike()         === '<STRIKE></STRIKE>'         &&
                    ''.sub()            === '<SUB></SUB>'               &&
                    ''.sup()            === '<SUP></SUP>';
                return available;
            }
        },
        DOMWINDOW:
        {
            description:
                'The property that the string representation of the global object evaluates to ' +
                '"[object DOMWindow]".\n' +
                'Only available in Android Browser versions prior to 4.4.2.',
            check: function ()
            {
                // self + '' throws an error in a web worker in Safari 8
                return typeof self !== 'undefined' && self.toString() === '[object DOMWindow]';
            },
            includes: ['SELF'],
            excludes: ['WINDOW']
        },
        DOUBLE_QUOTE_ESC_HTML:
        {
            description:
                'The property that double quote characters in the argument of ' +
                'String.prototype.fontcolor are escaped as "&quot;".\n' +
                'This feature is not available in Internet Explorer.',
            check: function ()
            {
                var available = ''.fontcolor('"').substr(13, 6) === '&quot;';
                return available;
            }
        },
        ENTRIES:
        {
            description:
                'The property that the string representation of Array.prototype.entries() starts ' +
                'with "[object Array".\n' +
                'This feature is available in Firefox, Chrome 38, Opera 25, Safari 7.1, Node.js ' +
                '0.12 and later versions.',
            check: function ()
            {
                return Array.prototype.entries && /^\[object Array/.test([].entries());
            }
        },
        FF_SAFARI_SRC:
        {
            description:
                'A string representation of native functions typically found in Firefox and ' +
                'Safari.\n' +
                'Remarkable traits are the lack of characters in the beginning of the string ' +
                'before "function" and a line feed with four whitespaces ("\\n    ") before the ' +
                '"[native code]" sequence.',
            check: function ()
            {
                return /^.{19}\n    \[native code\]\n\}/.test(Object);
            },
            includes: ['NO_IE_SRC'],
            excludes: ['V8_SRC']
        },
        FILL:
        {
            description:
                'Existence of the native function Array.prototype.fill.\n' +
                'Currently only available in Firefox 31, Safari 7.1 and later versions.',
            check: function ()
            {
                return Array.prototype.fill;
            }
        },
        GMT:
        {
            description:
                'Presence of the text "GMT" after the first 25 characters in the string returned ' +
                'by Date().\n' +
                'Although ECMAScript states that string representation of dates is ' +
                'implementation dependent, most engines align to the same format, making this ' +
                'feature available in all supported engines except Internet Explorer 9 and 10.',
            check: function ()
            {
                return /^.{25}GMT/.test(Date());
            }
        },
        IE_SRC:
        {
            description:
                'A string representation of native functions typical for Internet Explorer.\n' +
                'Remarkable traits are the presence of a line feed character ("\\n") in the ' +
                'beginning of the string before "function" and a line feed with four whitespaces ' +
                '("\\n    ") before the "[native code]" sequence.',
            check: function ()
            {
                return /^\nfunction Object\(\) \{\n    \[native code\]\n\}/.test(Object);
            },
            excludes: ['NO_IE_SRC']
        },
        NAME:
        {
            description:
                'Existence of the name property for functions.\n' +
                'This feature is not available in Internet Explorer.',
            check: function ()
            {
                return 'name' in Function();
            }
        },
        NO_IE_SRC:
        {
            description:
                'A string representation of native functions typical for most browsers with the ' +
                'notable exception of Internet Explorer.\n' +
                'A remarkable trait for this feature is the lack of characters in the beginning ' +
                'of the string before "function".',
            check: function ()
            {
                return /^function Object\(\) \{(\n   )? \[native code\][^]\}/.test(Object);
            },
            excludes: ['IE_SRC']
        },
        NO_SAFARI_ARRAY_ITERATOR:
        {
            description:
                'The property that the string representation of Array.prototype.entries() ' +
                'evaluates to "[object Array Iterator]".\n' +
                'Available in Firefox, Chrome 38, Opera 25, Node.js 0.12 and later versions.',
            check: function ()
            {
                return Array.prototype.entries && ([].entries() + '')[22] === ']';
            },
            includes: ['ENTRIES'],
            excludes: ['SAFARI_ARRAY_ITERATOR']
        },
        NO_SAFARI_LF:
        {
            description:
                'A string representation of dynamically generated functions typical for most ' +
                'browsers with the notable exception of Safari.\n' +
                'More specifically, in this representation, the character at index 22 is a line ' +
                'feed ("\\n").',
            check: function ()
            {
                return (Function() + '')[22] === '\n';
            }
        },
        QUOTE:
        {
            description:
                'Existence of the native function String.prototype.quote.\n' +
                'This feature is deprecated and not available in any engine.\n' +
                'Native support only exists in Firefox versions prior to 37.',
            check: function ()
            {
                return false;
            }
        },
        SAFARI_ARRAY_ITERATOR:
        {
            description:
                'The property that the string representation of Array.prototype.entries() ' +
                'evaluates to "[object ArrayIterator]".\n' +
                'Available in Safari 7.1 and later versions.',
            check: function ()
            {
                return Array.prototype.entries && ([].entries() + '')[21] === ']';
            },
            includes: ['ENTRIES'],
            excludes: ['NO_SAFARI_ARRAY_ITERATOR']
        },
        SELF:
        {
            description:
                'Existence of the global object property self whose string representation starts ' +
                'with "[object " and ends with "Window]"\n' +
                'This feature is not available in Node.js.',
            check: function ()
            {
                return typeof self !== 'undefined' && /^\[object .*Window]$/.test(self);
            }
        },
        UNDEFINED:
        {
            description:
                'The property that Object.prototype.toString.call() evaluates to "[object ' +
                'Undefined]".\n' +
                'This behavior is defined by ECMAScript, but Android Browser prior to 4.1.2 does ' +
                'not comply with the specification and so this feature is not available in that ' +
                'browser.',
            check: function ()
            {
                return Object.prototype.toString.call() === '[object Undefined]';
            }
        },
        V8_SRC:
        {
            description:
                'A string representation of native functions found in the V8 JavaScript engine.\n' +
                'V8 is used among others in Chrome, Opera, Android Browser and Node.js.\n' +
                'Remarkable traits are the lack of characters in the beginning of the string ' +
                'before "function" and a single whitespace before the "[native code]" sequence.',
            check: function ()
            {
                return /^.{19} \[native code\] \}/.test(Object);
            },
            includes: ['NO_IE_SRC'],
            excludes: ['FF_SAFARI_SRC']
        },
        WINDOW:
        {
            description:
                'The property that the string representation of the global object evaluates to ' +
                '"[object Window]".\n' +
                'Not available in Android Browser versions prior to 4.4.2 and Node.js.',
            check: function ()
            {
                // self + '' throws an error in a web worker in Safari 8
                return typeof self !== 'undefined' && self.toString() === '[object Window]';
            },
            includes: ['SELF'],
            excludes: ['DOMWINDOW']
        },
        
        DEFAULT:
        {
            description: 'Minimun feature level, compatible with all supported engines.'
        },
        COMPACT:
        {
            description:
                'All new browsers\' features.\n' +
                'No support for Node.js and older browsers like Internet Explorer 10 or Android ' +
                'Browser 4.1.2.',
            includes: ['ATOB', 'GMT', 'SELF', 'UNDEFINED', 'WINDOW']
        },
        NO_IE:
        {
            description:
                'Features available in all supported engines except Internet Explorer.\n' +
                'Includes features used by JSfuck with the exception of "UNDEFINED", which is ' +
                'not available in older Android Browser versions.',
            includes: ['DOUBLE_QUOTE_ESC_HTML', 'GMT', 'NAME', 'NO_IE_SRC']
        },
        FF31:
        {
            description: 'Features available in Firefox 31 or later.',
            includes:
            [
                'ATOB',
                'DOUBLE_QUOTE_ESC_HTML',
                'ENTRIES',
                'FF_SAFARI_SRC',
                'FILL',
                'GMT',
                'NAME',
                'NO_SAFARI_ARRAY_ITERATOR',
                'NO_SAFARI_LF',
                'SELF',
                'UNDEFINED',
                'WINDOW'
            ]
        },
        IE9:
        {
            description: 'Features available in Internet Explorer 9 or later.',
            includes: ['CAPITAL_HTML', 'IE_SRC', 'NO_SAFARI_LF', 'SELF', 'UNDEFINED', 'WINDOW']
        },
        IE10:
        {
            description: 'Features available in Internet Explorer 10 or later.',
            includes:
            [
                'ATOB',
                'CAPITAL_HTML',
                'IE_SRC',
                'NO_SAFARI_LF',
                'SELF',
                'UNDEFINED',
                'WINDOW'
            ]
        },
        IE11:
        {
            description: 'Features available in Internet Explorer 11.',
            includes:
            [
                'ATOB',
                'CAPITAL_HTML',
                'GMT',
                'IE_SRC',
                'NO_SAFARI_LF',
                'SELF',
                'UNDEFINED',
                'WINDOW'
            ]
        },
        NODE: 'NODE010',
        NODE010:
        {
            description:
                'Features available in Node.js 0.10.28 or later.\n' +
                'Also compatible with Chrome, Opera and Android Browser 4.1.2 or later.',
            includes:
            [
                'DOUBLE_QUOTE_ESC_HTML',
                'GMT',
                'NAME',
                'NO_SAFARI_LF',
                'UNDEFINED',
                'V8_SRC'
            ]
        },
        NODE012:
        {
            description:
                'Features available in Node.js 0.12.\n' +
                'Also compatible with Chrome 38, Opera 25 and Android Browser 4.1.2 and later ' +
                'versions.',
            includes:
            [
                'DOUBLE_QUOTE_ESC_HTML',
                'GMT',
                'NAME',
                'NO_SAFARI_ARRAY_ITERATOR',
                'NO_SAFARI_LF',
                'UNDEFINED',
                'V8_SRC'
            ]
        }
    };
    
    featureMaskMap = Object.create(null);
    
    getFeatureMask =
        function (features)
        {
            var result = 0;
            if (features !== undefined)
            {
                if (!Array.isArray(features))
                {
                    features = [features];
                }
                features.forEach(
                    function (feature)
                    {
                        feature += '';
                        var mask = featureMaskMap[feature];
                        if (mask == null)
                        {
                            throw new ReferenceError('Unknown feature ' + JSON.stringify(feature));
                        }
                        result |= mask;
                    }
                );
            }
            return result;
        };
    
    incompatibleFeatureMasks = [];
    
    // Assign a bit mask to each checkable feature
    
    var features = Object.keys(FEATURE_INFOS);
    var autoIncludes = [];
    features.forEach(completeFeature);
    FEATURE_INFOS.AUTO =
    {
        description: 'All features available in the current engine.',
        includes: autoIncludes.sort(),
        excludes: [],
        name: 'AUTO',
        available: true
    };
    featureMaskMap.AUTO = availableFeatureMask;

})();