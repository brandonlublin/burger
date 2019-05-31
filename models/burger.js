let orm = require("../config/orm.js");

let burger = {
    all: function(cb) {
        orm.selectAll('burgers', function(res) {
            cb(res);
        });
    },
    insertOne: function(cb) {
        orm.insertOne('burgers', columns, values, cb, function(res) {
            cb(res);
        });
    },
    updateOne: function(cb) {
        orm.updateOne(objColumnVals, condition,cb, function(res) {
            cb(res);
        });
    },
    deleteOne: function(cb) {
        orm.deleteOne('burgers', condition, function(res) {
            cb(res);
        });
    }
};

module.exports = burger;
