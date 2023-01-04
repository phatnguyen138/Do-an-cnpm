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
                list.push(element.name)
            }
            res.status(200).json(list);
        } catch(err){
            res.status(500).json(err);
        }
    },
}

module.exports = getData