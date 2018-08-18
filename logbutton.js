
'use strict';

Vue.component('log-button', {
    template: `<v-dialog v-model="showLogNewAction" width="500">
                 <v-btn fab small slot="activator" id="addBtn" color="info" @click="toggleShowLogBox"><v-icon>add</v-icon></v-btn>
                 <v-card>
                   <v-card-text>
                     <v-form ref="logForm" v-model="formIsValid">
                       <v-text-field v-model="acttype" :rules="[actIsValid]" required solo label="Activity Type"></v-text-field>
                       <v-select v-model="duration_h" solo :rules="[hrsIsValid]" :items="durations_h" label="Hours"></v-select>
                       <v-select v-model="duration_m" solo :rules="[minsIsValid]" :items="durations_m" label="Minutes"></v-select>
                       <v-text-field v-model="tags" solo label="Tags"></v-text-field>
                     </v-form>
                   </v-card-text>
  
                   <v-divider v-if="!enterSomeTimeError"></v-divider>
  
                   <div>
                     <v-alert :value="enterSomeTimeError" type="error">Enter some time</v-alert>
                   </div>
                   <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="error" @click="cancelLog" flat>Cancel</v-btn>
                     <v-btn color="info" :disabled="!formIsValid" @click="confirmLog">Log it!</v-btn>
                   </v-card-actions>
                 </v-card>
               </v-dialog>`,

    data() {
        return {
            showLogNewAction: false,
            duration: null,
            formIsValid: false,
            enterSomeTimeError: false,
            tags: '',
            acttype: '',
            duration_h: 'Hours',
            duration_m: 'Minutes',
            durations_m: [ '0', '15', '30', '45' ],
            durations_h: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]
        };
    },

    methods: {
        actIsValid(str) {
            return str && str.trim().length > 0 ? true : 'Enter an activity type';
        },

        hrsIsValid(str) {
            if (!str || str.trim().length === 0) return 'Hours are required';

            if (str && str.length > 0 && isNaN(str)) {
                return 'Enter a number';
            }

            return true;
        },

        minsIsValid(str) {
            if (!str || str.trim().length === 0) return 'Minutes are required';

            if (isNaN(str)) {
                return 'Enter a number';
            }

            return true;
        },

        toggleShowLogBox() {
            this.showLogNewAction = !this.showLogNewAction;
        },

        cancelLog() {
            this.$refs.logForm.reset();
            this.toggleShowLogBox();
        },

        confirmLog() {
            if (this.duration_h * 60 + this.duration_m <= 0) {
                this.enterSomeTimeError = true;
                return;
            }

            if (this.$refs.logForm.validate()) {
                logTime(this.acttype.trim().toLowerCase(),
                        _.uniq(this.tags
                               .split(' ')
                               .map(val => val.trim().toLowerCase())
                               .filter(val => val.length)),
                        parseInt(this.duration_h) * 60 + parseInt(this.duration_m),
                        getCurrentTimeUTC())
                    .then(function (a) {
                        console.log(a)
                        console.log('yes')
                    });

                this.$refs.logForm.reset();
                this.toggleShowLogBox();
            }
        },

        timePicked(evt) {
            if (evt.data.h === '12') evt.data.h = 0;
            this.duration = parseInt(evt.data.h || '0') * 60 + parseInt(evt.data.m || '0');
        }
    }
});
