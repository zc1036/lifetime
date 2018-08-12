
'use strict';

var db = new Dexie('lifetime_records');

db.version(1).stores({
    friends: '++id,acttype,*tags'
});

function logTime(acttype, tags, minutes, datetime) {
    return db.friends.add({
        acttype: acttype,
        tags: tags,
        minutes: minutes,
        datetime: datetime
    });
}
