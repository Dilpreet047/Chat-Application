const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const model = require('../models/schema')

router.post('/login', (req, res) => {
    model.find({username : req.body.username})
        .then(data => {
            if(data.length === 0){
                console.log('nahi mila');
            }
            else{
                console.log(data);
            }
        })
        .catch(err => {
            console.log('kuch toh hua hai')
        }) 
});

router.post('/', (req, res) =>{

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
                    console.log('Chala gaya');
                    })
                .catch(err => {
                    console.log('Nahi gaya');
                    })
        });
    });
    
})

module.exports = router;