function stringify(obj) {
    var arr = [], itm;
    for (itm in obj) {
        arr.push(itm + "=" + escape(obj[itm]));
    }
    return arr.join("&");
}

function download(obj) {
    var xhr = Ti.Network.createHTTPClient();
    var strMode = (obj.method || 'GET');
    xhr.setTimeout(obj.timeout || 10 * 1000);
    xhr.onload = function (e) {
        var strType = (obj.type.toLowerCase() || 'json');
        switch (xhr.status) {
        case 200:
            response = this.responseText;
            switch (strType) {
            case 'json':
                json = JSON.parse(response);
                if (obj.success) {
                    obj.success(json);
                }
                break;
            case 'html':
                if (obj.success) {
                    obj.success(response);
                }
                break;
            };
            break;
        case 304:
            if (obj.success) {
                obj.success([]);
            }
            break;
        case 404:
            if (obj.error) {
                obj.error({
                    responseText: 'Page Not Found',
                    status: xhr.status
                });
            }
            break;
        }
    };
    if (obj.error) {
        xhr.onerror = function (e) {
            obj.error(e);
        };
    }
    if (obj.progress) {
        xhr.onsendstream = function (e) {
            if (typeof(obj.progress) !== 'undefined') {
                obj.progress({
                    value: parseFloat((e.progress * 100), 10)
                });
            }
        };
    }
    if (obj.state) {
        xhr.onreadystatechange = function (e) {
            var state = this.readyState;
            var states = [
                'Unsent',
                'Opened',
                'Headers',
                'Loading',
                'Done'
            ];
            obj.state({
                state: state,
                caption: states[state]
            });
        };
    }
 
    if (strMode === 'POST') {
        xhr.open(strMode, obj.url);
        xhr.send(obj.param);
    } else {
        xhr.open(strMode, obj.url + '?' + stringify(obj.param));
        xhr.send();
    }
}
exports.download = download;