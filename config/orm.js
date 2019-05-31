const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    let arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}
//function to convert values into sql syntax
function objToSql(ob) {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations 
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}
const orm = {
    selectAll: function(table, cb) {
        let query = 'SELECT * FROM ' + table + ';';
        console.log(query);
        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        })
    },
    //insert a burger into the database
    insertOne: function(table, columns, values, cb) {
        let query = "INSERT INTO " + table;
        //concatenating values of converted values into strings, for querying database
        query += " (";
        query += columns.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(values.length);
        query += ") ";

        console.log(query);

        connection.query(query, values, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    updateOne: function(table, objColumnVals, condition, cb) {
        let query = "UPDATE " + table;

        query += " SET ";
        query += objToSql(objColumnVals);
        query += " WHERE ";
        query += whereClause;

        console.log(query);
        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    deleteOne: function(table, condition, cb) {
        let query = 'DELETE FROM ' + table + ' WHERE ' + condition;
        console.log(query);
        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    }
};

module.exports = orm;