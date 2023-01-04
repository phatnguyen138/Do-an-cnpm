import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow.Subject";
import EditableRow from "./EditableRow.Subject";
import Sidebar from "./Sidebar";
import Admin from "../services/admin.service";


const subjectData = JSON.parse(localStorage.getItem("subject"));
const App = () => {
    Admin.getSubject();
    const [contacts, setContacts] = useState(subjectData);
    const [addFormData, setAddFormData] = useState({
        name: "",
        mark: "",
    });

    const [editFormData, setEditFormData] = useState({
        name: "",
        mark: "",
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
        Admin.SubjectAdd(addFormData.name, addFormData.mark);

        const newContact = {
            name: addFormData.name,
            mark: addFormData.mark,
        };

        Admin.getSubject();

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        Admin.SubjectUpdate(
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
        Admin.SubjectDelete(contactId);
        const index = contacts.findIndex((contact) => contact.id === contactId);
        // console.log("vị trí:", contactId);
        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
        <div className="app-container">
            <Sidebar />
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên môn học</th>
                            <th>Điểm chuẩn đạt môn</th>
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
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        contact={contact}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>

            <h2>Thêm môn học mới</h2>
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
            </form>
        </div>
    );
};

export default App;
