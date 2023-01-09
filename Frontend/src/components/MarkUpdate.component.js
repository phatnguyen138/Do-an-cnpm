import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow.CapNhatMon";
import EditableRow from "./EditableRow.CapNhatMon";
import Sidebar from "./TeacherSidebar";
import Teacher from "../services/teacher.service";

const App = () => {
    // Admin.
    Teacher.getSubject();
    const getSubject = JSON.parse(localStorage.getItem("subject"))[0].name;
    const classData = JSON.parse(localStorage.getItem("class"));
    const subjectData = JSON.parse(localStorage.getItem("subject"));
    const Mark = JSON.parse(localStorage.getItem("Mark"));
    Teacher.CapNhatDiem("B789", true, getSubject);
    const [contacts, setContacts] = useState(Mark);
    const [nameClass, setClass] = useState();
    const [subject, setSubject] = useState();
    const [hocKi, sethocKi] = useState();
    const [addFormData, setAddFormData] = useState({
        name: "",
        fifteen: "",
        midterm: "",
        lastterm: "",
    });

    const [editFormData, setEditFormData] = useState({
        name: "",
        fifteen: "",
        midterm: "",
        lastterm: "",
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        //send data
        Teacher.SubjectAdd(addFormData.name, addFormData.mark);

        const newContact = {
            name: addFormData.name,
            mark: addFormData.mark,
        };

        Teacher.getSubject();

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };
    const TraCuu = (event) => {
        event.preventDefault();
        //send data
        console.log("lop:", nameClass);
        console.log("mon:", subject);
        console.log("hoc ki:", hocKi);
        Teacher.CapNhatDiem(nameClass, hocKi, subject);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        Teacher.SubjectUpdate(
            editContactId,
            editFormData.name,
            editFormData.mark,
        );
        const editedContact = {
            id: editContactId,
            name: editFormData.name,
            mark: editFormData.mark,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex(
            (contact) => contact.id === editContactId,
        );

        newContacts[index] = editedContact;
        const temp = editedContact;
        console.log("Edit data", temp);
        setContacts(newContacts);
        setEditContactId(null);
    };

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);
        const formValues = {
            name: contact.name,
            mark: contact.mark,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];
        Teacher.SubjectDelete(contactId);
        const index = contacts.findIndex((contact) => contact.id === contactId);
        // console.log("vị trí:", contactId);
        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
        <div>
            <header className="jumbotron">
                <h3>Cập nhật điểm số</h3>
            </header>

            <div className="gridTiepNhanHs">
                <h4 className="slightleft">Chọn lớp:</h4>
                <select
                    id="nameClass"
                    value={nameClass}
                    onChange={(e) => setClass(e.target.value)}
                >
                    {classData.map((name) => (
                        <option temp="a" value={name.nameClass}>
                            {name.nameClass}
                        </option>
                    ))}
                    {/* <option value="Apple">Apple</option>
                    <option value="Pear">Pear</option>
                    <option value="Pineapple">Pineapple</option> */}
                </select>
                <h4 className="slightleft">Chọn môn:</h4>
                <select
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    {subjectData.map((name) => (
                        <option temp="a" value={name.name}>
                            {name.name}
                        </option>
                    ))}
                    {/* <option value="Apple">Apple</option>
                    <option value="Pear">Pear</option>
                    <option value="Pineapple">Pineapple</option> */}
                </select>
                <h4 className="slightleft">Chọn học kì:</h4>
                <select
                    id="hocKi"
                    value={nameClass}
                    onChange={(e) => sethocKi(e.target.value)}
                >
                    <option value={true}>I</option>
                    <option value={false}>II</option>

                    {/* <option value="Apple">Apple</option>
                    <option value="Pear">Pear</option>
                    <option value="Pineapple">Pineapple</option> */}
                </select>
                <button
                    onClick={TraCuu}
                    className="btn btn-primary btn-block withedit marginleft"
                >
                    Tra cứu
                </button>
            </div>

            <div className="gridNav">
                <div>
                    <Sidebar />
                </div>

                <div className="margin-top">
                    <form onSubmit={handleEditFormSubmit}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Họ và tên</th>
                                    <th>Điểm 15'</th>
                                    <th>Điểm 1 tiết</th>
                                    <th>Điểm cuối HK</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <Fragment>
                                        {editContactId === contact.id ? (
                                            <EditableRow
                                                editFormData={editFormData}
                                                handleEditFormChange={
                                                    handleEditFormChange
                                                }
                                                handleCancelClick={
                                                    handleCancelClick
                                                }
                                            />
                                        ) : (
                                            <ReadOnlyRow
                                                contact={contact}
                                                handleEditClick={
                                                    handleEditClick
                                                }
                                                handleDeleteClick={
                                                    handleDeleteClick
                                                }
                                            />
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </form>

                    {/* <h2>Thêm môn học mới</h2>
                    <form onSubmit={handleAddFormSubmit}>
                        <input
                            type="text"
                            name="name"
                            required="required"
                            placeholder="Tên môn học"
                            onChange={handleAddFormChange}
                        />
                        <input
                            type="number"
                            name="mark"
                            required="required"
                            placeholder="Điêm chuẩn đạt môn"
                            onChange={handleAddFormChange}
                        />
                        <button type="submit">Thêm</button>
                    </form> */}
                </div>
            </div>
        </div>
    );
};

export default App;
