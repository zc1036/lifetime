
'use strict';

Vue.use(Vuetify);

let VueMain = new Vue({
    el: '#app',

    data() {
        return {
            items: []
        }
    },
});

getLogsSince(getCurrentTimeUTC() - 60 * 60 * 24 * 1).toArray(function(items) {
    items.sort(function(a, b) { return b.minutes - a.minutes; });

    VueMain.items = items;

    var opts = {
        width: '100%',
        height: '100%',
        startAngle: 20
    };

    var data = {
        labels: items.map(function(item) {
            return item.acttype;
        }),

        series: items.map(function(item) {
            return item.minutes / 60;
        })
    };

    new Chartist.Pie('.ct-chart', data, opts);
});
