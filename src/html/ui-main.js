/* eslint-env browser */
/*
global
JScrewIt,
alert,
art,
compMenu,
controls,
createButton,
createEngineSelectionBox,
createRoll,
formatValue,
formatValueType,
inputArea,
outputArea,
showModalBox,
stats,
*/

(function ()
{
    function createWorker()
    {
        if (typeof Worker !== 'undefined')
        {
            try
            {
                worker = new Worker('html/worker.js');
            }
            catch (error)
            { }
        }
    }

    function encode()
    {
        var output;
        var options = getOptions();
        try
        {
            output = JScrewIt.encode(inputArea.value, options);
        }
        catch (error)
        {
            resetOutput();
            updateError(error + '');
            return;
        }
        updateOutput(output);
    }

    function encodeAsync()
    {
        var options = getOptions();
        var data = { input: inputArea.value, options: options };
        if (waitingForWorker)
            queuedData = data;
        else
        {
            worker.postMessage(data);
            resetOutput();
            setWaitingForWorker(true);
        }
        inputArea.onkeyup = null;
    }

    function getOptions()
    {
        var options = { features: currentFeatureObj.canonicalNames };
        return options;
    }

    function handleCompInput()
    {
        var selectedIndex = compMenu.selectedIndex;
        var compatibility = compMenu.options[selectedIndex].value;
        // If the option "Custom…" is not selected, the feature object can be determined directly
        // from the selected option; otherwise, it must be retrieved from the engineSelectionBox.
        var featureObj =
            compatibility ? Feature[compatibility] : engineSelectionBox.featureObj;
        if (outOfSync || !Feature.areEqual(featureObj, currentFeatureObj))
        {
            currentFeatureObj = featureObj;
            this();
        }
        if (selectedIndex !== compMenu.previousIndex)
        {
            compMenu.previousIndex = selectedIndex;
            roll.rollTo(+!compatibility);
        }
    }

    function handleInputAreaKeyUp(evt)
    {
        if (evt.keyCode !== 9) // Tab
            encodeAsync();
    }

    function handleReaderLoadEnd()
    {
        loadFileButton.disabled = false;
        var result = this.result;
        if (result != null)
            inputArea.value = result;
        inputArea.oninput();
        inputArea.disabled = false;
    }

    function handleRun()
    {
        var content;
        var value;
        try
        {
            value = (0, eval)(outputArea.value);
        }
        catch (error)
        {
            content = art('P', String(error));
        }
        if (value !== undefined)
        {
            var text = formatValue(value);
            var valueType = formatValueType(value);
            if (text)
            {
                var intro =
                valueType ? 'Evaluation result is ' + valueType + ':' : 'Evaluation result is';
                content =
                art
                (
                    'DIV',
                    art('P', intro),
                    art
                    (
                        'P',
                        { style: { overflowX: 'auto' } },
                        art
                        (
                            'DIV',
                            {
                                style:
                                { display: 'inline-block', textAlign: 'left', whiteSpace: 'pre' },
                            },
                            text
                        )
                    )
                );
            }
            else
                content = art('DIV', art('P', 'Evaluation result is ' + valueType + '.'));
        }
        if (content != null)
        {
            var runThisButton = this;
            showModalBox
            (
                content,
                function ()
                {
                    runThisButton.focus();
                }
            );
        }
    }

    function handleWorkerMessage(evt)
    {
        if (queuedData)
        {
            worker.postMessage(queuedData);
            queuedData = null;
        }
        else
        {
            var data = evt.data;
            var error = data.error;
            if (error)
                updateError(data.error);
            else
                updateOutput(data.output);
            setWaitingForWorker(false);
        }
    }

    function init()
    {
        document.querySelector('body>*>div').style.display = 'block';
        inputArea.value = inputArea.defaultValue;
        outputArea.oninput = updateStats;
        art
        (
            stats.parentNode,
            art
            (
                createButton('Run this'),
                { style: { bottom: '0', fontSize: '10pt', position: 'absolute', right: '0' } },
                art.on('click', handleRun)
            )
        );
        (function ()
        {
            var COMPACT = Feature.COMPACT;
            if (Feature.AUTO.includes(COMPACT))
                currentFeatureObj = COMPACT;
            else
                currentFeatureObj = Feature.BROWSER;
            compMenu.value = currentFeatureObj.name;
            compMenu.previousIndex = compMenu.selectedIndex;
        }
        )();
        var changeHandler;
        if (worker)
        {
            changeHandler = encodeAsync;
            worker.onmessage = handleWorkerMessage;
            encodeAsync();
        }
        else
        {
            var encodeButton = art(createButton('Encode'), art.on('click', encode));
            art(controls, encodeButton);
            changeHandler = noEncode;
            outputArea.value = '';
        }
        if (typeof File !== 'undefined')
        {
            var loadFileInput =
            art
            (
                'INPUT',
                { accept: '.js', style: { display: 'none' }, type: 'file' },
                art.on('change', loadFile)
            );
            // In older Android Browser version, HTMLElement objects don't have a "click" property;
            // HTMLInputElement objects do.
            var openLoadFileDialog = HTMLInputElement.prototype.click.bind(loadFileInput);
            loadFileButton =
            art(createButton('Load file…'), art.on('click', openLoadFileDialog));
            art(controls, loadFileButton, loadFileInput);
        }
        inputArea.oninput = changeHandler;
        var compHandler = handleCompInput.bind(changeHandler);
        compMenu.onchange = compHandler;
        // Firefox does not always trigger a change event when an option is selected using the
        // keyboard; we must handle keydown events asynchronously, too.
        compMenu.onkeydown = setTimeout.bind(null, compHandler);
        engineSelectionBox = art(createEngineSelectionBox(), art.on('input', compHandler));
        roll = createRoll();
        art
        (
            roll.container,
            art
            (
                'DIV',
                { className: 'frame' },
                art('SPAN', 'Custom Compatibility Selection'),
                engineSelectionBox
            )
        );
        art(controls.parentNode, roll);
        if (inputArea.createTextRange)
        {
            var range = inputArea.createTextRange();
            range.move('textedit', 1);
            range.select();
        }
        else
            inputArea.setSelectionRange(0x7fffffff, 0x7fffffff);
        inputArea.focus();
    }

    function loadFile()
    {
        var file = this.files[0];
        if (file)
        {
            inputArea.disabled = true;
            inputArea.value = '';
            loadFileButton.disabled = true;
            var reader = new FileReader();
            reader.addEventListener('loadend', handleReaderLoadEnd);
            reader.readAsText(file);
        }
    }

    function noEncode()
    {
        if (outputSet)
            updateStats(true);
    }

    function resetOutput()
    {
        outputSet = false;
        outputArea.value = '';
        stats.textContent = '…';
    }

    function setWaitingForWorker(value)
    {
        waitingForWorker = value;
        outputArea.disabled = value;
    }

    function updateError(error)
    {
        showModalBox(art('P', String(error)));
    }

    function updateOutput(output)
    {
        outputArea.value = output;
        updateStats();
    }

    function updateStats(newOutOfSync)
    {
        var length = outputArea.value.length;
        var html = length === 1 ? '1 char' : length + ' chars';
        outOfSync = !!newOutOfSync;
        if (newOutOfSync)
        {
            if (worker)
                inputArea.onkeyup = handleInputAreaKeyUp;
            html += ' – <i>out of sync</i>';
        }
        outputSet = true;
        stats.innerHTML = html;
    }

    var Feature = JScrewIt.Feature;

    var currentFeatureObj;
    var engineSelectionBox;
    var loadFileButton;
    var outOfSync;
    var outputSet;
    var queuedData;
    var roll;
    var waitingForWorker;
    var worker;

    document.addEventListener('DOMContentLoaded', init);
    createWorker();
}
)();
