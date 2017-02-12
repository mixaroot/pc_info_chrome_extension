(function () {

    var info = {
        getProcessorInfo: function (func) {
            chrome.system.cpu.getInfo(func);
        },
        getMemoryInfo: function (func) {
            chrome.system.memory.getInfo(func);
        },
        getDisplayInfo: function (func) {
            chrome.system.display.getInfo(func);
        }
    };

    var translate = {
        get: function (token) {
            return chrome.i18n.getMessage(token)
        }
    };

    var html = {
        addButtons: function () {
            this.createElement('memory', translate.get('langMemory'), 'buttons', 'button');
            this.createElement('processor', translate.get('langProcessor'), 'buttons', 'button');
            this.createElement('display', translate.get('langDisplay'), 'buttons', 'button');
        },
        addHandlers: function () {
            document.getElementById("memory").onclick = function () {
                info.getMemoryInfo(function (data) {
                    html.clearTagById('information');
                    if (data.hasOwnProperty('capacity')) {
                        html.createElement('capacity', 'capacity' + ' : ' + data['capacity'], 'information', 'div', 'tooltip');
                        html.createElement('capacityToolTip', translate.get('langCapacityDescription'), 'capacity', 'div', 'tooltiptext');
                    }
                    if (data.hasOwnProperty('availableCapacity')) {
                        html.createElement('availableCapacity', 'availableCapacity' + ' : ' + data['availableCapacity'], 'information', 'div', 'tooltip');
                        html.createElement('availableCapacityToolTip', translate.get('langAvailableCapacityDescription'), 'availableCapacity', 'div', 'tooltiptext');
                    }
                });
            };
            document.getElementById("processor").onclick = function () {
                info.getProcessorInfo(function (data) {
                    html.clearTagById('information');
                    if (data.hasOwnProperty('archName')) {
                        html.createElement('archName', 'archName' + ' : ' + data['archName'], 'information', 'div', 'tooltip');
                        html.createElement('archNameToolTip', translate.get('langArchName'), 'archName', 'div', 'tooltiptext');
                    }
                    if (data.hasOwnProperty('features') && Array.isArray(data.features)) {
                        html.createElement('features', 'features' + ' : ' + data.features.join(', '), 'information', 'div', 'tooltip');
                        html.createElement('featuresToolTip', translate.get('langFeatures'), 'features', 'div', 'tooltiptext');
                    }
                    if (data.hasOwnProperty('modelName')) {
                        html.createElement('modelName', 'modelName' + ' : ' + data['modelName'], 'information', 'div', 'tooltip');
                        html.createElement('modelNameToolTip', translate.get('langModelName'), 'modelName', 'div', 'tooltiptext');
                    }
                    if (data.hasOwnProperty('numOfProcessors')) {
                        html.createElement('numOfProcessors', 'numOfProcessors' + ' : ' + data['numOfProcessors'], 'information', 'div', 'tooltip');
                        html.createElement('numOfProcessorsToolTip', translate.get('langNumberProcessors'), 'numOfProcessors', 'div', 'tooltiptext');
                    }
                    if (data.hasOwnProperty('processors') && Array.isArray(data.processors)) {
                        html.createElement('processors', 'processors' + ' : ', 'information', 'div', 'tooltip');
                        html.createElement('processorsToolTip', translate.get('langProcessors'), 'processors', 'div', 'tooltiptext');
                        for (var i = 0; i < data.processors.length; i++) {
                            if (data.processors[i].hasOwnProperty('usage')) {
                                if (data.processors[i].usage.hasOwnProperty('idle') &&
                                    data.processors[i].usage.hasOwnProperty('kernel') &&
                                    data.processors[i].usage.hasOwnProperty('total') &&
                                    data.processors[i].usage.hasOwnProperty('user')) {
                                    html.createElement('processors' + i, i + ' : ', 'information', 'div', 'marginLeft');

                                    html.createElement('idle' + i, 'idle' + ' : ' + data.processors[i].usage.idle, 'information', 'div', 'tooltip marginLeft2');
                                    html.createElement('idleToolTip' + i, translate.get('langProcessorsIdle'), 'idle' + i, 'div', 'tooltiptext');

                                    html.createElement('kernel' + i, 'kernel' + ' : ' + data.processors[i].usage.kernel, 'information', 'div', 'tooltip marginLeft2');
                                    html.createElement('kernelToolTip' + i, translate.get('langProcessorsKernel'), 'kernel' + i, 'div', 'tooltiptext');

                                    html.createElement('total' + i, 'total' + ' : ' + data.processors[i].usage.total, 'information', 'div', 'tooltip marginLeft2');
                                    html.createElement('totalToolTip' + i, translate.get('langProcessorsTotal'), 'total' + i, 'div', 'tooltiptext');

                                    html.createElement('user' + i, 'user' + ' : ' + data.processors[i].usage.user, 'information', 'div', 'tooltip marginLeft2');
                                    html.createElement('userToolTip' + i, translate.get('langProcessorsUser'), 'user' + i, 'div', 'tooltiptext');
                                }
                            }
                        }
                    }
                });
            };
            document.getElementById("display").onclick = function () {
                info.getDisplayInfo(function (data) {
                    html.clearTagById('information');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].hasOwnProperty('name')) {
                            html.createElement('nameDisplay', 'name' + ' : ' + data[i]['name'], 'information', 'div', 'tooltip');
                            html.createElement('nameDisplayToolTip', translate.get('langDisplayName'), 'nameDisplay', 'div', 'tooltiptext');
                        }
                    }
                });
            };
        },
        clearTagById: function (id) {
            document.getElementById(id).innerHTML = "";
        },
        createElement: function (id, value, appendId, type, addClass) {
            if (!type) {
                type = 'div';
            }
            var el = document.createElement(type);
            el.setAttribute("id", id);
            var text = document.createTextNode(value);
            el.appendChild(text);
            if (addClass) {
                el.setAttribute("class", addClass);
            }
            document.getElementById(appendId).appendChild(el);
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        html.addButtons();
        html.addHandlers();
    });

})();