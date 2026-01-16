const {create , Findall, loginUser } = require('../Controller/hpcontroller');
const express = require('express');
const router = express.Router();
 

router.post('/post',create);

router.get('/get',Findall);

router.post('/login',loginUser);
 
module.exports = router;
