var express = require('express');
var router = express.Router();
//import our model
var student = require('../models/student');

/**
 * Route for root path
 */
router.get('/', function(req,res){
    student.fetchStudents(function(err,students){
        if(err) throw err;
        res.render('student', {students:students})
    });
});

/**
 * Route for delete student
 */
router.get('/:id', function(req,res){
    //res.send('Hello from express');
    student.deleteStudent(req.params.id, function(err){
        if(err) throw err;
        student.fetchStudents(function(err,students){
            if(err) throw err;
            res.render('student', {students:students})
        });
    })
    
});

/**
 * Route for adding student
 */
router.post('/', function(req, res){
    var name = req.body.name;
    var course  = req.body.course;
    // Field validation
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('course','Course is required').notEmpty();
    var errors = req.validationErrors();
    if(errors) {
        student.fetchStudents(function(err,students){
            if(err) throw err;
            res.render('student', {students:students, errors: errors})
        });
    }
    else {
        // Setting property for new student
        var newStudent = new student({
            name: name,
            course: course
        });
        //Saving new student details into db
        student.createStudent(newStudent, function(err,data){
            if(err) throw err;
            console.log('Record added successfully'); 

            student.fetchStudents(function(err,students){
                if(err) throw err;
                res.render('student', {students:students})
            });
        })
    }
}) 
module.exports = router;