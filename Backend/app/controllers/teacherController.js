const mongoose = require('mongoose');
const Student = require('../models/Student');
const Class = require('../models/ClassInfo');
const Grade = require('../models/Grades');
const Subject = require('../models/Subject');
const { json } = require('express');

const teacherController = {
    signStudent: async(req,res)=>{
        try{
            const newStudent = new Student({
                name: req.body.name,
                gender: req.body.gender,
                birthDay: req.body.birthDay,
                address: req.body.address,
                email: req.body.email
            })
            const student = await newStudent.save()
            res.status(200).json(student);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    classListAssign: async(req,res)=>{
        try{
            const idList = req.body.idList;
            const className = req.body.className;
            const classFind = await Class.findOne({className: className});
            const classId = classFind._id;
            await Class.findOneAndUpdate({id: classId}, {studentList: []},{ returnDocument: 'after' });
            for await (const element of idList) {
                await Student.findOneAndUpdate({id: element},{ classAttend: classId },{ returnDocument: 'after' });
                await Class.findOneAndUpdate({id: classId},{$push: {studentList: element}},{ returnDocument: 'after' });
            }
            res.status(200).json('Update success');
        }catch(err){
            return res.status(500).json(err);
        }
    },
    studentSearch: async(req,res) => {
        try{
            const chosenClass = await Class.findOne({className: req.body.className })
                                        .populate("studentList");
            if(!chosenClass){
                return res.status(404).json(chosenClass);
            };
            const subjectCount = await Subject.countDocuments({});
            const studentList = chosenClass.studentList;
            let idList = [];
            for await (const element of studentList){
                idList.push(element._id);
            }
            const gradeList = Student.find({id: {"$in" : ["idList"]}}).populate("grade");
            (await gradeList).forEach((element)=>{
                var first = 0;
                var second = 0;
                // for await (const mark of element.grade){
                //     if(mark.term == true){
                //         await;
                //     }
                // }

            })
            res.status(200).json(studentList);
        }catch(err){
            res.status(500).json(err);
        }
    },
    gradeUpdate: async(req,res) => {
        try{    
            const className = req.body.className;
            const classId = Class.findOne({className: className});
            const term = req.body.term;
            const subjectName = req.subject.subjectName;
            const subjectID = Sub
            studentList = Student.find({classAttend: classId});
            gradeList = [];
            grades = await Grade.find({
                subjectID: sub

            })
        }catch(err){
            res.status(500).json(err);
        }
    },
    subjectSummary: async(req,res) => {
        subject = req.subjectName,
        term = req.term
    },
}

module.exports = teacherController