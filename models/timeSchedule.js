const mongoose = require('mongoose');

var timeScheduleSchema = new mongoose.Schema({
    TimeSlot:{type:Date},
    FirstName:{type:String},
    Lastname:{type:String},
    PhoneNumber:{type:Number}
});



timeScheduleSchema.pre('save', function (next) {
    next();
});
const timeschedule = module.exports = mongoose.model('timeschedule', timeScheduleSchema);
