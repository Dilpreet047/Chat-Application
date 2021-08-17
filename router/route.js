const bcrypt = require('bcryptjs');
const { response } = require('express');
const express = require('express');
const router = express.Router();
const model = require('../models/schema')

router.post('/login', (req, res) => {
    model.find({username : req.body.username})
        .then(data => {
            if(data.length === 0){
                res.json({msg: 1001});
            }
            else{
                bcrypt.compare(req.body.password, data[0].password)//find returns array of objects 
                    .then((result) => {
                    if(result){
                        res.json({msg: 200})//success
                    }
                    else{
                        res.json({msg: 1001})
                    }
                });
            }
        })
        .catch(err => {
            res.json({msg: 1002});
        }) 
});

router.post('/', (req, res) =>{

    model.find({username : req.body.username})
        .then(data => {
            if(data.length === 0){
                const new_entry = new model({
                    username: req.body.username,
                    password: req.body.password
                })
            
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(new_entry.password, salt, (err, hash) => {
                        if(err) throw err;
                        new_entry.password = hash
                        console.log(new_entry);
                        new_entry.save()
                            .then(data => {
                                res.json({msg: 200});
                                })
                            .catch(err => {
                                res.json({msg: 1001})
                                })
                    });
                });
            }
            else{
                res.json({msg: 1001});
            }
        })
    
})

module.exports = router;