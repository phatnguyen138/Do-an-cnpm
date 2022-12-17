const { json } = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Class = require('../models/ClassInfo');
const Grade = require('../models/Grades');

const middleController = {
    verifyTeacher: (req,res,next) => {
        const token = req.headers.token;
        if(token){
            const accesToken = token.split(' ')[1];
            const decode = jwt.verify(accesToken,process.env.SECRET_KEY);
            res.status(decode)
            next()
        }else{
            res.status(401).json('Not sign in')
        }
    },
    availableStudents: async(req,res) => {
        try{
            req;
            let idList = [];
            chosenStudent = await Student.find({classAttend: null});
            chosenStudent.forEach(async(element) => {
                idList.push(element);
            });
            res.status(200).json(idList)
        }catch(err){
            res.status(500).json(err)
        }
    },
    getClassList: async(req,res) => {
        try {
            req;
            const results = await Class.find({});
            let classList = []
            results.forEach((element) => {
                classList.push(element.className)
            })
            res.status(200).json(classList);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getSubjectList: async(req,res) => {
        try{
            req;
            let subjectList = [];
            const subjects = await Grade.find({});
            subjects.forEach((element) => {
                subjectList.push(element.name)
            })
            res.status(200).json(classList);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getForGradeUpdate: async(req,res) => {
        try{
            req;
            let subjectList = [];
            let classList = [];
            const subjects = await Grade.find({});
            const classes = await Class.find({});
            subjects.forEach((element) => {
                subjectList.push(element.name)
            })
            classes.forEach((element) => {
                classList.push(element.className)
            })
            res.status(200).json({
                subjectList: subjectList,
                classList: classList
            });
        }catch(err){
            res.status(500).json(err);
        }
    },
    getStudentAndClass: async() => {
        try {
            req;
            const results = await Class.find({});
            let classList = []
            results.forEach((element) => {
                classList.push(element.className)
            })
            res.status(200).json(classList);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = middleController;