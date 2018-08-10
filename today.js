
Vue.component('log-button', {
    template: `<div>
                   <button class="logit-button" @click="toggleShowLogBox">Log it!</button>
                   <div v-if="showLogNewAction" class="log-box">
                       <div class="log-box-boxtitle">Type</div>
                       <input id="log-box-type" type="text"></input>
                       <div class="log-box-boxtitle">Duration</div>
                       <vue-timepicker @change="timePicked"></vue-timepicker>
                       <button @click="confirmLog">Confirm</button>
                   </div>
               </div>`,

    data() {
        return {
            showLogNewAction: false,
            duration: null
        };
    },

    methods: {
        toggleShowLogBox() {
            this.showLogNewAction = !this.showLogNewAction;
        },

        confirmLog() {
            if (this.duration === null || this.duration <= 0) {
                alert('don\'t forget to enter a duration');
                return;
            }

            logTime(document.querySelectorAll('#log-box-type')[0].value
                    .split(' ')
                    .map((val) => val.trim())
                    .filter((val) => val.length),
                    this.duration)
                .then(function () {
                    console.log('yes')
                });
        },

        timePicked(evt) {
            if (evt.data.h === '12') evt.data.h = 0;
            this.duration = parseInt(evt.data.h || '0') * 60 + parseInt(evt.data.m || '0');
        }
    }
});

let VueMain = new Vue({
    el: '#app',
    /*
      created(){
      alert("'created' lifecycle hook executed");
      },
    */
});
