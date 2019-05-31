let express = require('express');
let burger = require('../models/burger.js');

let router = express.Router();

router.get('/', function (req, res) {
    burger.all(function (data) {
        let handleObject = {
            burgers: data
        };
        console.log(handleObject);
        res.render('index', handleObject);
    });
});

router.post('/api/burgers', function (req, res) {
    burger.insert(
        ['burger_name', 'devoured'],
        [req.body.burger_name, req.body.devoured], function (res) {
            res.json({ id: result.insertId });
        });
});

router.put('/api/burgers/:id', function(req,res) {
    let condition = 'id = ' + req.params.id;
    console.log('condition' , condition);
    burger.update({ devoured: req.body.devoured }, condition, function(res) {
        if (res.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
});

// router.deleteOne(condition, function(req, res){
//     let condition = 'id = ' + req.params.id;
//     console.log('condition' , condition);

//     burger.deleteOne(condition, function(res) {
//         if ((res.changedRows === 0)) {
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });


module.exports = router;
