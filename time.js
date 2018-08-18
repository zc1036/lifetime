
'use strict';

function getCurrentTimeUTC() {
    return Math.round((new Date()).getTime() / 1000);
}

function timezoneOffsetSeconds() {
    return (new Date()).getTimezoneOffset() * 60;
}

function dateToDisplayString(date) {
    let datediff = Math.abs(date - new Date());

    if (datediff < 1000 * 60 * 60 * 24) {
        return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
    } else if (datediff < 1000 * 60 * 60 * 24 * 3) {
        return date.toLocaleDateString('en-US', { 'weekday': 'long' }) + ' ' + date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
    } else {
        return date.toLocaleDateString('en-US', { 'month': 'numeric', 'day': 'numeric' }) + ' ' + date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
    }
    
}
