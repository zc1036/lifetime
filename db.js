
'use strict';

var db = new Dexie('lifetime_records');

db.version(1).stores({
    friends: '++id,datetime,acttype,*tags'
});

function logTime(acttype, tags, minutes, datetime) {
    return db.friends.add({
        acttype: acttype,
        tags: tags,
        minutes: minutes,
        datetime: datetime
    });
}

function getLogsSince(datetime) {
    return db.friends.where('datetime').above(datetime);
}
