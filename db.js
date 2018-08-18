
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
    return new Promise(function(resolve, reject) {
        db.friends
            .where('datetime')
            .above(datetime)
            .toArray(function (arr) {
                let set = { };

                arr.forEach(item => set[item.acttype] = item.minutes + (set[item.acttype] ? set[item.acttype] : 0));

                resolve([ arr, Object.entries(set) ]);
            });
    });
}
