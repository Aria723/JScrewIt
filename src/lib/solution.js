/* global assignNoEnum, object_create, object_defineProperty */

var LEVEL_NUMERIC   = -1;
var LEVEL_OBJECT    = 0;
var LEVEL_STRING    = 1;
var LEVEL_UNDEFINED = -2;

var Solution;

(function ()
{
    function setHasOuterPlus(solution, hasOuterPlus)
    {
        object_defineProperty(solution, 'hasOuterPlus', { value: hasOuterPlus });
    }

    var solutionProtoSource =
    {
        get appendLength()
        {
            var extraLength = this.hasOuterPlus ? 3 : 1;
            var appendLength = this.length + extraLength;
            return appendLength;
        },
        set appendLength(appendLength)
        {
            object_defineProperty(this, 'appendLength', { enumerable: true, value: appendLength });
        },
        charAt: function (index)
        {
            return this.replacement[index];
        },
        // Determine whether the specified solution contains a plus sign out of brackets not
        // preceded by an exclamation mark or by another plus sign.
        get hasOuterPlus()
        {
            var str = this.replacement;
            for (;;)
            {
                var newStr = str.replace(/\([^()]*\)|\[[^[\]]*]/g, '.');
                if (newStr.length === str.length)
                    break;
                str = newStr;
            }
            var hasOuterPlus = /(^|[^!+])\+/.test(str);
            setHasOuterPlus(this, hasOuterPlus);
            return hasOuterPlus;
        },
        get length()
        {
            return this.replacement.length;
        },
        toString: function ()
        {
            return this.replacement;
        }
    };

    Solution =
    function (replacement, level, hasOuterPlus)
    {
        this.replacement    = replacement;
        this.level          = level;
        if (hasOuterPlus !== undefined)
            setHasOuterPlus(this, hasOuterPlus);
    };
    assignNoEnum(Solution.prototype, solutionProtoSource);
}
)();
