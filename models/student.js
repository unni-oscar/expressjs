/**
 * For using mangoose db
 */
var mongoose = require('mongoose');


/**
 * connect to db
 */
mongoose.connect('mongodb://localhost/simplestudentapp');

/**
 * Creates a db connection
 */
var db = mongoose.Connection;

// creates schema for our data
var StudentSchema = mongoose.Schema({
    name:{
        type: String,
    },
    course: {
        type: String,
    }
});


/**
 * Exporting to schema as we need in route file
 */
var student = module.exports = mongoose.model('student', StudentSchema);

// Function for inserting record to database
/**
 * Function to add a new student
 * @param {*} newStudent 
 * @param {*} callback 
 */
module.exports.createStudent = function(newStudent, callback){
    newStudent.save(callback);

}

/**
 * Function to fetch all the students
 * @param {*} callback 
 */
module.exports.fetchStudents = function(callback){
    student.find({}, callback);
}

/**
 * Function to delete Student
 * @param {*} id 
 * @param {*} callback 
 */
module.exports.deleteStudent = function(id, callback){
    student.findByIdAndRemove({_id: id}, callback);
}