Handlebars.registerHelper('list', function (context, options) {

    var ret = "",
        listLength = 3,
        u = 0;

    for (var i = 0, j = context.length; i < j; i++) {

        if (i % listLength === 0) {
            u = 0;
            ret += '<ul>';
        }

        ret += options.fn(context[i]);

        if (u === listLength - 1) { // Zero indexed
            ret += '</ul>';
        }

        u++;
    }

    return ret;
});

Handlebars.registerHelper("counter", function (index) {
    return index + 1;
});

Handlebars.registerHelper('formatCurrency', function (value) {
    return value.toFixed(2);
});