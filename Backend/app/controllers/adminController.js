const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Student = require("../models/Student");
const Class = require("../models/ClassInfo");
const Grade = require("../models/Grades");
const Subject = require("../models/Subject");
const Rule = require("../models/Rules");

const adminController = {
    getAge: async (req, res) => {
        try {
            req;
            const getAge = await Rule.findOne({});
            let ageRule = {
                minAge: getAge.minAge,
                maxAge: getAge.maxAge,
            };
            res.status(200).json(ageRule);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    ageUpdate: async (req, res) => {
        console.log("Age update");
        try {
            const minAge = req.body.minAge;
            const maxAge = req.body.maxAge;
            console.log("Min age: ", minAge);
            console.log("Max age: ", maxAge);
            await Rule.findOneAndUpdate(
                {},
                { minAge: minAge, maxAge: maxAge },
                { returnDocument: "after" },
            );
            res.status(200).json("Age update success");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    classUpdate: async (req, res) => {
        console.log("Cập nhật lớp thành công!");

        try {
            await Class.findOneAndUpdate(
                { _id: req.body.id },
                {
                    className: req.body.nameClass,
                    maxAttend: req.body.maxAttend,
                },
                { returnDocument: "after" },
            );

            // console.log("Max age: ", maxAge);
            res.status(200).json("Class update success");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    classDelete: async (req, res) => {
        console.log("Xoá lớp thành công!");
        try {
            await Class.findOneAndDelete(
                { _id: req.body.id },
                { returnDocument: "after" },
            );
            res.status(200).json("Class deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    classAdd: async (req, res) => {
        const name = req.body.nameClass;
        const atten = req.body.attend;
        console.log("Name: ", name);
        console.log("Attend: ", atten);
        try {
            const newClass = new Class({
                className: req.body.nameClass,
                maxAttend: req.body.attend,
            });
            await newClass.save();
            res.status(200).json("Class added");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    subjectUpdate: async (req, res) => {
        try {
            await Subject.findOneAndUpdate(
                { _id: req.body.id },
                {
                    name: req.body.newName,
                    passGrade: req.body.mark,
                },
                { returnDocument: "after" },
            );
            console.log("Sửa môn thành công!");
            res.status(200).json("Subject update success");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    subjectDelete: async (req, res) => {
        
        try {
            await Subject.findOneAndDelete(
                { _id: req.body.id },
                { returnDocument: "after" },
            );
            console.log("Xoá môn thành công!");
            res.status(200).json("Subject deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    subjectAdd: async (req, res) => {
        try {
            const newSubject = new Subject({
                name: req.body.name,
                passGrade: req.body.mark,
            });
            const subject = await newSubject.save();
            const studentList = Student.find({});
            for await (element of studentList){
                var newGrade = new Grade({
                    studentID: element.id,
                    subjectID: subject.id
                })
                await newGrade.save();
            }
            console.log("Thêm môn thành công!");
            return res.status(200).json("Subject added");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                role: req.body.role,
            });

            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = adminController;
