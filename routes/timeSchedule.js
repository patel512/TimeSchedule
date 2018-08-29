var mongoose = require("mongoose");
var timeschedule = require("../models/timeSchedule");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/BookSlot", (req, res) => {
    var timeslot = Date.now();
    var firstName = req.body.firstname;
    var lastname = req.body.lastname;
    var  phonenumber = req.body.phonenumber
    if(!timeslot || !firstName | !lastname |!phonenumber){
        return res.status(422).json({ success: false, msg:'data missing' });
    }
    timeschedule.findOne({TimeSlot:timeslot},function(err,existsschedule){
        if(err){
            return res.status(422).json({ success: false, msg:err });
        }
        if(existsschedule){
            // console.log('exist',existsschedule)
            existsschedule.FirstName = firstName;
            existsschedule.Lastname = lastname;
            existsschedule.PhoneNumber = phonenumber;
            existsschedule.save((err,data) =>{
                if(err){
                    return res.status(422).json({ success: false, msg:err });
                }
                else{
                    return res.status(200).json({ success: true, msg:data });
                }
            })
        }else{
            let newSchedule = new timeschedule({
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
                    console.log('good exist',data);
                    return res.status(200).json({ success: true, msg:data });
                }
            })
        }
    });
});

router.get("/getslot/:timeslot",(req,res) =>{
    let timeslot = req.params.timeslot;
    if(!timeslot){
        return res.status(422).json({ success: false, msg:'time slot not provided' });
    }
    timeschedule.findOne({TimeSlot:timeslot}, function(err,result){
        if(err){
            return res.status(422).json({ success: false, msg:err });
        }
        return res.status(200).json({ success: true, msg:result });

    })
})


module.exports = router;
