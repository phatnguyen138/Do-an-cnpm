const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('../models/User');
const Student = require('../models/Student');
const Class = require('../models/ClassInfo');
const Grade = require('../models/Grades');
const Subject = require('../models/Subject');
const Rule = require('../models/Rules');

const getData = {
    getAge: async(req,res) => {
        try{
            req;
            const getAge = await Rule.findOne({});
            let ageRule = {
                "min": getAge.minAge,
                "max": getAge.maxAge
            }
            res.status(200).json(ageRule);
        } catch(err){
            res.status(500).json(err);
        }
    },
    getClass: async(req,res) => {
        try{
            req;
            const getAge = await Class.find({});
            list = [];
            for await (const element of getAge){
                temp = {
                    "id": element.id,
                    "nameClass": element.className, 
                    "attend": element.maxAttend
                }
                list.push(temp)
            }
            res.status(200).json(list);
        } catch(err){
            res.status(500).json(err);
        }
    },
    getSubject: async(req,res) => {
        try{
            req;
            const subjects = await Subject.find({});
            list = [];
            for await (const element of subjects){
                temp1 = {
                    "id": element.id,
                    "name" : element.name,
                    "mark": element.passGrade
                }
                list.push(temp1)
            }
            res.status(200).json(list);
        } catch(err){
            res.status(500).json(err);
        }
    },
    availableStudent: async(req,res) => {
        try{
            req;
            const studentList = await Student.find({ classAttend: null});
            var reqList = new Array();
            for await (element of studentList){
                await reqList.push(element);
            }
            res.status(200).json(reqList);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getGradeSummary: async(req,res) => {
        try{
            const classChosen = await Class.findOne({ className: req.body.className}).populate('studentList');
            const studentList = classChosen.studentList;
            const subjectChosen = await Subject.findOne({ name: req.body.subjectName});
            const subjectID = subjectChosen.id;
            let resList = [];

            for (eachStudent of studentList){
                let gradeInfo = await Grade.findOne({ studentID: eachStudent.id, term: req.body.term, subjectID: subjectID});

                let studentInfo = {
                    id: eachStudent.id,
                    name: eachStudent.name,
                    fifteen: gradeInfo.fifteen,
                    midterm: gradeInfo.midterm,
                    lastterm: gradeInfo.lastterm
                }

                resList.push(studentInfo);
            }

            res.status(200).json(resList);
        }catch(err){
            res.status(500).json(err);
        }
    },
    termSummary: async(req,res) => {
        try{
            const classChosen = await Class.findOne({ className: req.body.className}).populate('studentList');
            const classList = classChosen.studentList;
            const subjectList = await Subject.find({});

            var answerList = []
            for (eachStudent of classList){
                var gradeList = [];
                for (eachSubject of subjectList){
                    let eachGrade = await Grade.findOne({ term: req.body.term, studentID: eachStudent.id, subjectID:eachSubject.id });
                    if (eachGrade){
                        let subjectName = eachSubject.name;
                        let info = {
                            [subjectName]: eachGrade.final
                        }
                        gradeList.push(info);
                    }
                }
    
                var total = 0;
                if (req.body.term){
                    total = eachStudent.firstTerm;
                }else{
                    total = eachStudent.secondTerm;
                }

                let studentInfo = {
                    name: eachStudent.name,
                    gradeList: gradeList,
                    total: total
                }
                answerList.push(studentInfo);
            }
            res.status(200).json(answerList);
        }
        catch(err){
            res.status(500).json(err);
        }

    }
}

module.exports = getData