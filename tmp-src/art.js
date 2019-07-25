(function ()
{
    'use strict';

    var _Object = Object;

    var art =
    window.art =
    function (target)
    {
        var node;
        if (target instanceof Node)
            node = target;
        else if (typeof target === 'function')
            node = target.call(art);
        else
            node = document.createElement(target);
        var argCount = arguments.length;
        for (var index = 0; ++index < argCount;)
        {
            var arg = arguments[index];
            if (arg instanceof Node)
                node.appendChild(arg);
            else if (arg != null)
            {
                var type = typeof arg;
                if (type === 'object')
                    deepAssign(node, arg);
                else if (type === 'function')
                    arg.call(art, node);
                else
                    node.appendChild(document.createTextNode(arg));
            }
        }
        return node;
    };

    function deepAssign(target, source)
    {
        _Object.keys(source).forEach
        (
            function (name)
            {
                var descriptor = _Object.getOwnPropertyDescriptor(source, name);
                if ('value' in descriptor)
                {
                    var value = descriptor.value;
                    if (name in target && typeof value === 'object')
                        deepAssign(target[name], value);
                    else
                        target[name] = value;
                }
                else
                    _Object.defineProperty(target, name, descriptor);
            }
        );
    }

    art.off =
    function (type, listener, useCapture)
    {
        var processEventListener =
        createProcessEventListener(type, listener, useCapture, 'removeEventListener');
        return processEventListener;
    };

    art.on =
    function (type, listener, useCapture)
    {
        var processEventListener =
        createProcessEventListener(type, listener, useCapture, 'addEventListener');
        return processEventListener;
    };

    function createProcessEventListener(type, listener, useCapture, methodName)
    {
        function processEventListener(target)
        {
            function callback(thisType)
            {
                target[methodName](thisType, listener, useCapture);
            }

            if (Array.isArray(type))
                type.forEach(callback);
            else
                callback(type);
        }

        return processEventListener;
    }

    art.css =
    function (selectors, ruleObj)
    {
        var ruleStr = formatRule(selectors, ruleObj);
        addRule(ruleStr);
    };

    function addRule(ruleStr)
    {
        if (!styleSheet)
        {
            var style = art('STYLE');
            art(document.head, style);
            styleSheet = style.sheet;
        }
        styleSheet.insertRule(ruleStr, styleSheet.cssRules.length);
    }

    function createRuleDefs(ruleObj, callback)
    {
        var ruleDefs =
        _Object.keys(ruleObj).map
        (
            function (ruleName)
            {
                var ruleValue = ruleObj[ruleName];
                var ruleDef = callback(ruleName, ruleValue);
                return ruleDef;
            }
        );
        return ruleDefs;
    }

    function formatRule(selectors, ruleObj)
    {
        var ruleDefs =
        createRuleDefs
        (
            ruleObj,
            function (ruleName, ruleValue)
            {
                var ruleDef = ruleName + ':' + ruleValue;
                return ruleDef;
            }
        );
        var ruleStr = selectors + '{' + ruleDefs.join(';') + '}';
        return ruleStr;
    }

    var styleSheet;
}
)();