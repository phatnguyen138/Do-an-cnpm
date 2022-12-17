const Student = require('../models/Student');
const Class = require('../models/ClassInfo');
const Grade = require('../models/Grades');
const Subject = require('../models/Subject');

const gradeMiddleware = {
    find: async(req,res) => {
        try{    
            const className = req.body.className;
            const classId = Class.findOne({className: className});
            const students = classId.studentList;
            let idList = []
            students.forEach(element => {
                idList.push(element._id);
            });
            const term = req.body.term;
            const subjectName = req.subject.subjectName;
            const subjectID = Subject.findOne({name: subjectName});
            gradeList = [];
            grades = Grade.find({
                term: term,
                subjectID: subjectID,
                studentID: {'$in': ['idList']},
            });
        }catch(err){
            res.status(500).json(err);
        }
    }   
}

module.exports = gradeMiddleware;