
'use strict';

function getCurrentTimeUTC() {
    return Math.round((new Date()).getTime() / 1000);
}

function timezoneOffsetSeconds() {
    return (new Date()).getTimezoneOffset() * 60;
}
