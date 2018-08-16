
'use strict';

Vue.use(Vuetify);

getLogsSince(getCurrentTimeUTC() - 60 * 60 * 24 * 4).toArray(function(res) {

    let VueMain = new Vue({
        el: '#app',

        data() {
            return {
                items: res
            }
        },
        /*
          created(){
          alert("'created' lifecycle hook executed");
          },
        */
    });
})
