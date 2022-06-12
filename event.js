(function (window, undefined) {
    // code: 追踪编码 name: 事件名称
    function track(code, name) {
        console.log(document.cookie)
        let _fbp = getCookie("_fbp")
        let _fbc = getCookie("_fbc")
        let _userAgent = navigator.userAgent.toLowerCase();
        console.log(_fbp)
        console.log(_fbc)
        console.log(_userAgent)

        if (_fbc === undefined) {
            return
        }
        let data = {
            code: code,
            event_name: name,
            fbp: _fbp,
            fbc: _fbc,
            user_agent: _userAgent,
        }
        $.ajax("https://wz.adsup.cc/track", {
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            success: function (result) {
                console.log(result);
            },
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });

    }

    window.track = track;

    function getCookie(name) {
        return document.cookie.match(`[;\s+]?${name}=([^;]*)`)?.pop()
    }

    //options参数：maxAge、path、secret、expires
    //客户端设置domain是无效的，因为只能是当前域
    function setCookie(key, value, options) {
        let cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + '; ';
        for (let k in options) {
            // 首字母大写，驼峰转下换线
            let newkey = k.replace(/^\S/, function ($1) {
                return $1.toUpperCase();
            }).replace(/\B[A-Z]/g, function ($1) {
                return '-' + $1
            })
            if (newkey === 'Secure') {
                cookie += 'Secure; '
            } else {
                cookie += newkey + '=' + options[k] + '; '
            }
        }
        document.cookie = cookie
    }

    function getFbclidByUrl() {
        let search = new URLSearchParams(window.location.search);
        let params = Object.fromEntries(search.entries());
        return params.fbclid
    }

    // window.ajax = ajax;
    window.onload = function () {
        // console.log(document.cookie)
        let _fbc = getCookie("_fbc")
        if (_fbc === undefined) {
            let fbclid = getFbclidByUrl()
            if (fbclid) {
                setCookie("_fbc", fbclid)
            }
        }
    }
})(window);
