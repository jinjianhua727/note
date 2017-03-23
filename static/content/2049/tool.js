var Tool = (function () {
    /**
     * 发送ajax请求和服务器交互
     * @param {object} mySetting 配置ajax的配置
     */
    var ajax = function (mySetting) {
        var setting = {
            url: window.location.pathname, //默认ajax请求地址
            async: true, //true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false
            type: 'GET', //请求的方式
            data: {}, //发给服务器的数据
            dataType: 'json',
            success: function (text) { }, //请求成功执行方法
            error: function () { } //请求失败执行方法
        };


        var aData = []; //存储数据
        var sData = ''; //拼接数据
        //属性覆盖
        for (var attr in mySetting) {
            setting[attr] = mySetting[attr];
        }
        for (var attr in setting.data) {
            aData.push(attr + '=' + filter(setting.data[attr]));
        }
        sData = aData.join('&');
        setting.type = setting.type.toUpperCase();

        var xhr = new XMLHttpRequest();
        try {
            if (setting.type == 'GET') { //get方式请求
                sData = setting.url + '?' + sData;
                xhr.open(setting.type, sData + '&' + new Date().getTime(), setting.async);
                xhr.send();
            } else { //post方式请求
                xhr.open(setting.type, setting.url, setting.async);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(sData);
            }
        } catch (e) {
            return httpEnd();
        }

        if (setting.async) {
            xhr.addEventListener('readystatechange', httpEnd, false);
        } else {
            httpEnd();
        }

        function httpEnd() {
            if (xhr.readyState == 4) {
                var head = xhr.getAllResponseHeaders();
                var response = xhr.responseText;
                //将服务器返回的数据，转换成json

                if (/application\/json/.test(head) || setting.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                    response = JSON.parse(response);
                }

                if (xhr.status == 200) {
                    setting.success(response, setting, xhr);
                } else {
                    setting.error(setting, xhr);
                }
            }
        }
        xhr.end = function () {
            xhr.removeEventListener('readystatechange', httpEnd, false);
        }

        function filter(str) { //特殊字符转义
            str += ''; //隐式转换
            str = str.replace(/%/g, '%25');
            str = str.replace(/\+/g, '%2B');
            str = str.replace(/ /g, '%20');
            str = str.replace(/\//g, '%2F');
            str = str.replace(/\?/g, '%3F');
            str = str.replace(/&/g, '%26');
            str = str.replace(/\=/g, '%3D');
            str = str.replace(/#/g, '%23');
            return str;
        }
        return xhr;
    };
    /**
     * 封装ajax post请求
     * @param {string} pathname 服务器请求地址
     * @param {object} data     发送给服务器的数据
     * @param {function} success  请求成功执行方法
     * @param {function} error    请求失败执行方法
     */
    var post = function (pathname, data, success, error) {
        var setting = {
            url: pathname, //默认ajax请求地址
            type: 'POST', //请求的方式
            data: data, //发给服务器的数据
            success: success || function () { }, //请求成功执行方法
            error: error || function () { } //请求失败执行方法
        };
        return ajax(setting);
    };
    /**
     * 封装ajax get请求
     * @param {string} pathname 服务器请求地址
     * @param {object} data     发送给服务器的数据
     * @param {function} success  请求成功执行方法
     * @param {function} error    请求失败执行方法
     */
    var get = function (pathname, data, success, error) {
        var setting = {
            url: pathname, //默认ajax请求地址
            type: 'GET', //请求的方式
            data: data, //发给服务器的数据
            success: success || function () { }, //请求成功执行方法
            error: error || function () { } //请求失败执行方法
        };
        return ajax(setting);
    };
    var serialize = function (form){
        var len=form.elements.length;//表单字段长度;表单字段包括<input><select><button>等
        var field=null;//用来存储每一条表单字段
        var parts=[];//保存字符串将要创建的各个部分
        var opLen,//select中option的个数
            opValue;//select中option的值
        //遍历每一个表单字段
        for(var i=0;i<len;i++){
            field=form.elements[i];
            /*检测每一个表单字段的类型，做出不同的处理：
            *1.最麻烦的就是select：它可能是单选框也可能是多选框，这里的代码适合于这两种框。在找到一个选中的项之后，需要确
            *定使用什么值。如果不存在value特性或者虽然存在但是值为空字符串，都要使用选项的文本来代替。为查这个属性，在DOM兼
            *容的浏览器中使用hasAttribute()方法，在IE中需要使用特性的specified属性。
            *2.表单中如果包括<fieldset>
            *元素，则该元素会出现在表单集合中但是没有type属性。因此，如果type属性未定义，则不必对其进行序列化；同样，对于
            *各种按钮以及文件输入字段都是如此。
            *3.对于单选按钮和复选框，要检查其checked属性是否被设置为false,如果是则退出switch语句，如果checked属性为true
            *则继续进行default内容，即将当前的名称和值进行编码，然后添加到parts数组中。函数的最后一步就是使用join格式化整
            *个字符串，也就是用和好来分隔每一个表单字段
            */
            switch(field.type){
                case"select-one":
                case"select-multiple":
                                if(field.name.length){
                                    for(var j=0,opLen=filed.options.length;j<opLen;j++){
                                        option=field.options[j];
                                        if(option.selected){
                                            opValue='';
                                            if(option.hasAttribute){
                                                opValue=(option.hasAttribute('value')?option.value:option.text);
                                            }else{
                                                opValue=(option.hasAttribute['value'].specified?option.value:option.text);//IE下
                                            }
                                            parts.push(encodeURIComponent(field.name)+'='+encodeURIComponent(opValue));
                                        }

                                    }
                                }
                                break;
                case undefined:
                case"file":
                case"submit":
                case"reset":
                case"button":
                                break;
                case"radio":
                case"checkbox":
                    if(!field.checked){
                        break;
                    }
                default:
                    if(field.name.length){
                        parts.push(encodeURIComponent(field.name)+'='+encodeURIComponent(opValue));

                    }
                                break;
            }
        }
        return parts.join("&");
    }
    return {
        ajax : ajax,
        post : post,
        get : get,
        serialize : serialize
    }
})()
