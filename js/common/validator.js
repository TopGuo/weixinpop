//表单提交验证
function submit() {
    $('form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度必须在6到18位之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能包含大写、小写、数字和下划线'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                    emailAddress: {
                        message: '邮箱地址格式有误'
                    }
                }
            }
        },
        submitHandler: function () {
            alert("submit");
        }
    });
}
/*
描述：数据格式有效性验证
作者：刘川
日期：2014.1.26

常见的33种表达式已经做成了库，调用时可以直接写关键字：
例如：
<input type="text" name="id" check="empty" warning="不能为空">
关键字              说明
empty               //非空
password;           //不少于6位的密码
phone               //电话号码
select              //必须选择；用于select和radio
check_1             //必须选中至少1项；用于checkbox
check_2             //必须选中至少2项；用于checkbox
check_3             //必须选中至少3项；用于checkbox
empty_20            //非空，且不少于20个字
email               //email
http_url            //url地址，必须用http开头的url地址http://www.sina.com.cn/
qq                  //QQ号
postcode            //邮政编码
id                  //身份证，18位或15位
ip                  //ip地址
user_name           //匹配帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
chinese             //必须是中文
file_img            //匹配上传图片类型：验证jpeg,jpg,gif。
file_doc            //匹配上传文档类型：验证doc,txt,pdf,xls
z_integer           //正整数
no_integer      　　//非正整数（负整数 + 0）
f_integer       　　//负整数
integer       　　　//整数
zero_integer    　　//非负整数（正整数 + 0）
zero_float          //非负浮点数（正浮点数 + 0）
z_float             //正浮点数
float           　　//浮点数  
no_float            //非正浮点数（负浮点数 + 0）  
f_float             //负浮点数 
26zm                //由26个英文字母组成的字符串
big_26zm            //由26个英文字母的大写组成的字符串
small_26zm          //由26个英文字母的小写组成的字符串
number_zm           //由数字和26个英文字母组成的字符串
number_zm_line      //由数字、26个英文字母或者下划线组成的字符串 
*/

function CheckForm(oForm) {
    var els = oForm.elements;
    var count = els.length;
    var ret = true;
    for (var i = 0; i < count; i++) {
        if (!CheckEls(els[i])) {
            if (ret) {
                els[i].focus();
                ret = false;
            }
        }
    }
    return ret;
}
function CheckEls(oEls) {
    var ret = true;
    if (oEls.getAttribute("check")) {
        var sReg = oEls.getAttribute("check");
        switch (sReg) {
            case "empty": sReg = "^\\S";
                break;
            case "password_": sReg = "^\\S{6,}";
                break;
            case "phone": sReg = "^\\d+$";
                break;
            case "phone1": sReg = "^\\d{11,12}$";
                break;
            case "select": sReg = "^0$";
                break;
            case "check_1": sReg = "^0{1,}$";
                break;
            case "check_2": sReg = "^0{2,}$";
                break;
            case "check_3": sReg = "^0{3,}$";
                break;
            case "empty_20": sReg = "^[\\s|\\S]{20,}$";
                break;
            case "email": sReg = "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
                break;
            case "http_url": sReg = "^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$";
                break;
            case "qq": sReg = "^[1-9][0-9]{4,4}[0-9]*$";
                break;
            case "postcode": sReg = "[0-9]\\d{5}(?!\\d)";
                break;
            case "id": sReg = "^\\d{15}$|^\\d{18}$|^\\d{17}x$|^\\d{14}x$";
                break;
            case "ip": sReg = "\\d+\\.\\d+\\.\\d+\\.\\d+";
                break;
            case "user_name": sReg = "^[a-zA-Z][a-zA-Z0-9_]{4,15}$";
                break;
            case "chinese": sReg = "[\\u4e00-\\u9fa5]";
                break;
            case "file_img": sReg = "(.*)(\\.jpg|\\.gif|\\.jpeg|\\.png|\\.bmp)$";
                break;
            case "file_doc": sReg = "(.*)(\\.txt|\\.doc|\\.pdf|\\.xls)$";
                break;
            case "z_integer": sReg = "^[0-9]*[1-9][0-9]*$";
                break;
            case "no_integer": sReg = "^((-\\d+)|(0+))$";
                break;
            case "f_integer":
                sReg = "^-[0-9]*[1-9][0-9]*$";
                break;
            case "integer": sReg = "^-?\\d+$";
                break;
            case "zero_integer": sReg = "^\\d+$";
                break;
            case "zero_float": sReg = "^\\d+(\\.\\d+)?$";
                break;
            case "z_float": sReg = "^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$";
                break;
            case "float": sReg = "^(-?\\d+)(\\.\\d+)?$";
                break;
            case "no_float": sReg = "^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$";
                break;
            case "f_float": sReg = "^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$";
                break;
            case "26zm":
                sReg = "^[A-Za-z]+$";
                break;
            case "big_26zm":
                sReg = "^[A-Z]+$";
                break;
            case "small_26zm":
                sReg = "^[a-z]+$";
                break;
            case "number_zm":
                sReg = "^[A-Za-z0-9]+$";
                break;
            case "number_zm_line":
                sReg = "^\\w+$";
                break;
            case "mumber_6_15":
                sReg = "^[A-Za-z0-9_]{6,15}$";
                break;
            case "mumber_8_15":
                sReg = "^[A-Za-z0-9_]{8,15}";
                break;
            default:
                break;
        }
        var emement = "err_" + oEls.id;
        if (document.getElementById(emement) != null)
            deleteNode(emement);
        var _txt = document.createElement("<span ></span>");
        _txt.id = "err_" + oEls.id;
        _txt.style.top = oEls.clientTop - oEls.offsetHeight - 3 + "px";
        _txt.style.left = oEls.offsetLeft + oEls.offsetWidth + 2 + "px";
        _txt.onclick = new Function(_txt.id + ".style.display='none';");
        if (!document.getElementById(_txt.id))
            oEls.parentNode.insertBefore(_txt, oEls.nextSibling);
        var sVal = GetValue(oEls);
        var reg = new RegExp(sReg, "i");
        if (!reg.test(sVal)) {
            _txt.className = "js_validator_error_style";
            _txt.title = "点击关闭错误提示！"
            _txt.innerHTML = oEls.getAttribute("warning");
            ret = false;
        }
        else {
            _txt.className = "js_validator_right_style";
            _txt.innerHTML = "&nbsp;";
        }
    }

    return ret;
}

function CheckEqual(id1, id2) {
    var oEls = document.getElementById(id2);
    var emement = "err_" + oEls.id;
    if (document.getElementById(emement) != null)
        deleteNode(emement);
    var _txt = document.createElement("<span ></span>");
    _txt.id = "err_" + oEls.id;
    _txt.style.top = oEls.clientTop - oEls.offsetHeight - 3 + "px";
    _txt.style.left = oEls.offsetLeft + oEls.offsetWidth + 2 + "px";
    _txt.onclick = new Function(_txt.id + ".style.display='none';");
    if (!document.getElementById(_txt.id))
        oEls.parentNode.insertBefore(_txt, oEls.nextSibling);


    if (document.getElementById(id1).value != document.getElementById(id2).value) {
        _txt.className = "js_validator_error_style";
        _txt.title = "点击关闭错误提示！"
        _txt.innerHTML = oEls.getAttribute("warning");
        ret = false;
    }
    else {
        _txt.className = "js_validator_right_style";
        _txt.innerHTML = "&nbsp;";
    }
}
function ShowMsg(oEls, msg) {
    var _txt = document.createElement("<span ></span>");
    _txt.id = "err_" + oEls.id;
    _txt.style.top = oEls.clientTop - oEls.offsetHeight - 3 + "px";
    _txt.style.left = oEls.offsetLeft + oEls.offsetWidth + 2 + "px";
    _txt.onclick = new Function(_txt.id + ".style.display='none';");

    var emement = "err_" + oEls.id;
    if (document.getElementById(emement) != null) {
        deleteNode(emement);
    }

    if (!document.getElementById(_txt.id)) {
        oEls.parentNode.insertBefore(_txt, oEls.nextSibling);
    }
    _txt.className = "js_validator_load_style";
    _txt.title = "点击关闭错误提示！"
    _txt.innerHTML = msg;

}

function GetValue(el) {
    var sType = el.type;
    switch (sType) {
        case "text":
        case "hidden":
        case "password":
        case "file":
        case "textarea": return el.value;
        case "checkbox":
        case "radio": return GetValueChoose(el);
        case "select":
        case "select-one":
        case "select-multiple": return GetValueSel(el);
    }
    function GetValueChoose(el) {
        var sValue = "";
        var tmpels = document.getElementsByName(el.name);
        for (var i = 0; i < tmpels.length; i++) {
            if (tmpels[i].checked) {
                sValue += "0";
            }
        }
        return sValue;
    }
    function GetValueSel(el) {
        var sValue = "";
        for (var i = 0; i < el.options.length; i++) {
            if (el.options[i].selected && el.options[i].value != "") {
                sValue += "0";
            }
        }
        return sValue;
    }
}
function GoBack(el) {
    var sType = el.type;
    switch (sType) {
        case "text":
        case "hidden":
        case "password":
        case "file":
        case "textarea": el.focus(); var rng = el.createTextRange(); rng.collapse(false); rng.select();
        case "checkbox":
        case "radio": var els = document.getElementsByName(el.name); els[0].focus();
        case "select-one":
        case "select-multiple": el.focus();
    }
}

function deleteNode(nodeid) {
    var node = document.getElementById(nodeid);
    if (node.parentNode) {
        var parent = node.parentNode;
        parent.removeChild(node);
    }
    else {
        var headElement = document.documentElement.getElementsByTagName("head")[0];
        var bodyElement = headElement.nextSibling;
        while (bodyElement.nodeName.toLowerCase() != "body") {
            bodyElement = bodyElement.nextSibling;
        }

        if (bodyElement.hasChildNodes()) {
            var currentNode = document.getElementById(Nodes);
            bodyElement.removeChild(currentNode);
        }
    }
}