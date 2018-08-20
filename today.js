
'use strict';

Vue.use(Vuetify);

let VueMain = new Vue({
    el: '#app',

    methods: {
        dateToDisplayString: dateToDisplayString
    },

    data() {
        return {
            items: [],
            todaysDate: (new Date()).toLocaleDateString('en-US',
                                                        { 'day': 'numeric',
                                                          'month': 'numeric' })
        }
    },
});

alert('getting items in the last ' + (( getCurrentTimeUTC() - ((Math.floor((getCurrentTimeUTC() - (new Date()).getTimezoneOffset() * 60) / 60 / 60 / 24) * 60 * 60 * 24) + (new Date()).getTimezoneOffset() * 60)) / 60 / 60).toString() + ' hours')

getLogsSince((Math.floor((getCurrentTimeUTC() - (new Date()).getTimezoneOffset() * 60) / 60 / 60 / 24) * 60 * 60 * 24) + (new Date()).getTimezoneOffset() * 60).then(function(args) {
    let [ items, totals ] = args;

    items.sort(function(a, b) { return b.datetime - a.datetime; });

    VueMain.items = items;

    var opts = {
        width: '100%',
        height: '100%',
        startAngle: 20
    };

    var data = {
        labels: totals.map(function(item) {
            return item[0];
        }),

        series: totals.map(function(item) {
            return item[1] / 60;
        })
    };

    new Chartist.Pie('.ct-chart', data, opts);
});
