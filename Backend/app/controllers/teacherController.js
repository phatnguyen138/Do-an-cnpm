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
            });
            const student = await newStudent.save();
            const subjectList = await Subject.find({});
            let count = 0;
            for (element of subjectList){
                let firstTerm = new Grade({
                    studentID: student.id,
                    subjectID: element.id,
                    term: true
                })
                let firstTermUpdate = await firstTerm.save();
                let firstId = firstTermUpdate.id;
                let secondTerm = new Grade({
                    studentID: student.id,
                    subjectID: element.id,
                    term: true
                })
                let secondTermUpdate = await secondTerm.save();
                let secondId = secondTermUpdate.id;
                await Student.findOneAndUpdate({ _id: student.id}, {$push: {grade: [firstId, secondId]}});
            }
            console.log(count);
            return res.status(200).json(student);
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
            const classId = new mongoose.Types.ObjectId(classFind._id);
            for await (const element of idList) {
                await Student.findOneAndUpdate({_id: element},{$set: {classAttend: classId} },{ returnDocument: 'after' });
                await Class.findOneAndUpdate({_id: classId},{$push: {studentList: element}},{ returnDocument: 'after' });
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
            const studentList = chosenClass.studentList;
            let answer = [];
            for (element of studentList){
                let info = {
                    name: element.name,
                    firstTerm: element.firstTerm,
                    secondTerm: element.secondTerm
                }
                await answer.push(info);
            }
            res.status(200).json(answer);
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
        try{
            const term = req.term;
            const subjectChosen = await Subject.findOne({className: req.subjectName});
            const passGrade = subjectChosen.passGrade;
            
            let answer = [];

            const classList = await Class.find({});
            for await (eachClass of classList){
                let classAttend = eachClass.studentList.length;
                let studentList = eachClass.studentList;
                let passNumber = 0;

                for await (eachStudent of studentList){
                    let gradeList = await Student.findOne({_id: eachStudent}).populate("grade");
                    for (eachGrade of gradeList.grade){
                        if (eachGrade.term == term && eachGrade.final >= passGrade){
                            passNumber++;
                        }
                    }
                }

                let passRatio = passNumber/eachClass.maxAttend;
                let classInfo = {
                    className: eachClass.className,
                    attend: classAttend,
                    passNumber: passNumber,
                    ratio: passRatio
                }
                answer.push(classInfo);
            }
            res.status(200).json(answer);
        }catch(err){
            res.status(500).json(err);
        }
        
    },
}

module.exports = teacherController