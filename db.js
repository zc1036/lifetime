
db = new Dexie('lifetime_records');

db.version(1).stores({
    friends: '++id,*tags'
});

function logTime(tags, minutes) {
    return db.friends.add({
        tags: tags,
        minutes: minutes
    });
}
