const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Car = mongoose.model('Car');

router.get('/', (req, res) => {
    res.render("auto/addOrEdit", {
        viewTitle: "Добавить автомобиль"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var auto = new Car();
    auto.brand = req.body.brand;
    auto.model = req.body.model;
    auto.mileage = req.body.mileage;
    auto.year = req.body.year;
    auto.save((err, doc) => {
        if (!err)
            res.redirect('auto/list');
        else {
          

          console.log('Ошибка: ' + err);
        }
    });
}

function updateRecord(req, res) {
    Car.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('auto/list'); }
        else {console.log('Ошибка : ' + err);}
    });
}


router.get('/list', (req, res) => {
    Car.find((err, docs) => {
        if (!err) {
            res.render("auto/list", {
                list: docs
            });
        }
        else {
            console.log('Ошибка :' + err);
        }
    });
});




router.get('/:id', (req, res) => {
    Car.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("auto/addOrEdit", {
                viewTitle: "Обновить Автомобиль",
                auto: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Car.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/auto/list');
        }
        else { console.log('Ошибка :' + err); }
    });
});

module.exports = router;