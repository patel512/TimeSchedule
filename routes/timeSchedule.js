var mongoose = require("mongoose");
var timesch = require("../models/timeSchedule");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/BookSlot", (req, res) => {
    var timeslot = req.body.timeslot;
    var firstName = req.body.firstname;
    var lastname = req.body.lastname;
    var  phonenumber = req.body.phonenumber
    if(!timeslot || !firstName | !lastname |!phonenumber){
        return res.status(422).json({ success: false, msg:'data missing' });
    }
    timesch.find({TimeSlot:timeslot},function(err,existsschedule){
        if(err){
            return res.status(422).json({ success: false, msg:err });
        }
        if(existsschedule){
            return res.status(200).json({ success: true, msg:existsschedule });

        }
        let newSchedule = new timesch({
            TimeSlot:timeslot,
            FirstName:firstName,
            Lastname:lastname,
            PhoneNumber:phonenumber
        });
        newSchedule.save((err,data) =>{
            if(err){
                return res.status(422).json({ success: false, msg:err });
            }
            if(data){
                return res.status(200).json({ success: true, msg:data });
            }
        })
    })


})


module.exports = router;
