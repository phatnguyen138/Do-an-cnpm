const mongoose = require('mongoose');
const Student = require('../models/Student');
const Class = require('../models/ClassInfo');
const Grade = require('../models/Grades');
const Subject = require('../models/Subject');
const { json } = require('express');

const teacherController = {
    gradeUpdate: async() => {
        const gradeFind = await Grade.find({});
        for (eachGrade of gradeFind){
            let finalGrade = eachGrade.fifteen*0.2 + eachGrade*0.3 + eachGrade*0.5;
            await Grade.findOneAndUpdate({_id: eachGrade.id},{$set: {final: finalGrade}},{returnDocument: "after"});
        }
    },
    signStudent: async(req,res)=>{
        console.log("Đang tiếp nhận")
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
            return res.status(200).json(student);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    classListAssign: async(req,res)=>{
        const array = [];
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
                let firstTerm = await Grade.find({studentID: element.id, term: true});
                const count =  await Subject.countDocuments({});
                let firstGrade =0;
                for (eachGrade of firstTerm){
                    firstGrade = firstGrade + (eachGrade.final)/count;
                }
                let secondTerm = await Grade.find({studentID: element.id, term: false});
                let secondGrade =0;
                for (eachGrade of secondTerm){
                    secondGrade = secondGrade + eachGrade.final/count;
                }
                let info = {
                    name: element.name,
                    firstTerm: firstGrade,
                    secondTerm: secondGrade
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
            const term = req.body.term;
            const subjectName = await Subject.findOne({name: req.body.subjectName});
            const subjectID = subjectName.id;
            
            const changeList = req.body.changeList;
            

            for (each of changeList){
                let changeData = {
                    fifteen: each.fifteen,
                    midterm: each.midterm,
                    lastterm: each.lastterm
                }
                var data =  await Grade.findOneAndUpdate({studentID: each.studentID, term: term, subjectID: subjectID},{$set: changeData},{returnDocument: "after"});
                teacherController.gradeUpdate();
            }
            res.status(200).json(data);
        }catch(err){
            res.status(500).json(err);
        }
    },
    subjectSummary: async(req,res) => {
        try{
            const term = req.body.term;
            const subjectChosen = await Subject.findOne({className: req.body.subjectName});
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