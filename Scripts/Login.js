
jQuery(document).ready(function () {
});


function isEmptyElement(id, message) {
    var ctl = document.getElementById(id);
    var blnEmpty = false;

    if (ctl == null) {
        var mesage = 'El control ' + id + ' no existe';
        MsgAlert(4, mesage);
        return true;
    }
    switch (ctl.type) {
        case 'text':
        case 'password':
        case 'textarea':
        case 'hidden':
        case 'select-one':
            if (ctl.value == '') {
                blnEmpty = true;
                break;
            }
            else {
                if (ctl.classList.contains("inputnumeric-element")) {
                    var dec = parseFloat(ctl.value);
                    if (dec == null) {
                        blnEmpty = true;
                        break;
                    }
                    else {
                        if (dec == 0) {
                            blnEmpty = true;
                            break;
                        }
                        else {
                            blnEmpty = false;
                            break;
                        }
                    }
                    break;
                }
                else {
                    blnEmpty = false;
                }
            }
            break;
    }

    if (blnEmpty && message != '') {
        MsgAlert(3, message);
        ctl.focus();
    }
    return blnEmpty;
};


function MsgAlert(key, message) {
    switch (key) {
        case 1:
            $.notify({
                icon: 'glyphicon glyphicon-ok-sign',
                title: ' ',
                message: message
            }, { type: 'success', z_index: 2000 });
            break;
        case 2:
            $.notify({
                icon: 'glyphicon glyphicon-question-sign',
                title: ' ',
                message: message
            }, { type: 'info', z_index: 2000 });
            break;
        case 3:
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                title: ' ',
                message: message
            }, { type: 'warning', z_index: 2000 });
            break;
        case 4:
            $.notify({
                icon: 'glyphicon glyphicon-remove-sign',
                title: ' ',
                message: message
            }, { type: 'danger', z_index: 2000 });
            break;
    }
    return false;

}

$.fn.addItems = function (data) {
    return this.each(function () {
        var list = this;
        $.each(data, function (index, itemData) {
            debugger;
            var option = new Option(itemData.Text, itemData.Value);
            list.add(option);
        });

    });
};