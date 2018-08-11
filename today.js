
Vue.use(Vuetify)

Vue.component('log-button', {
    template: `<v-dialog v-model="showLogNewAction" width="500">
                 <v-btn fab absolute small right slot="activator" id="addBtn" color="info" @click="toggleShowLogBox"><v-icon>add</v-icon></v-btn>
                 <v-card>
                   <v-card-title class="headline grey lighten-2" primary-title>
                     Make an entry
                   </v-card-title>
  
                   <v-card-text>
                     <v-form v-model="formIsValid">
                       <v-text-field v-model="tags" :rules="[tagsAreValid]" solo label="Tags"></v-text-field>
                       <v-combobox v-model="duration_h" :rules="[hrsIsValid]" :items="durations_h" label="Hours"></v-combobox>
                       <v-combobox v-model="duration_m" :rules="[minsIsValid]" :items="durations_m" label="Minutes"></v-combobox>
                     </v-form>
                   </v-card-text>
  
                   <v-divider></v-divider>
  
                   <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="error" @click="showLogNewAction = false">Cancel</v-btn>
                     <v-btn color="info" :disabled="!formIsValid" @click="confirmLog">Confirm</v-btn>
                   </v-card-actions>
                 </v-card>
               </v-dialog>`,

    data() {
        return {
            showLogNewAction: false,
            duration: null,
            formIsValid: false,
            tags: '',
            duration_h: '0',
            duration_m: '15',
            durations_m: [ '15', '30', '45' ],
            durations_h: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]
        };
    },

    methods: {
        tagsAreValid(str) {
            return str.trim().length > 0 ? true : 'Enter one or more space-separated tags';
        },

        hrsIsValid(str) {
            if (str && str.length > 0 && isNaN(str)) {
                return 'Enter a number';
            }

            return ((this.duration_h || 0) + (this.duration_m || 0) > 0) ? true : 'Enter some time';
        },

        minsIsValid(str) {
            if (str && str.length > 0 && isNaN(str)) {
                return 'Enter a number';
            }

            return ((this.duration_h || 0) + (this.duration_m || 0) > 0) ? true : 'Enter some time';
        },

        toggleShowLogBox() {
            this.showLogNewAction = !this.showLogNewAction;
        },

        cancelLog() {
            this.toggleShowLogBox();
            
        },

        confirmLog() {
            if (this.duration === null || this.duration <= 0) {
                alert('don\'t forget to enter a duration');
                return;
            }

            logTime(this.tags
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
