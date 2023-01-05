import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow.Class";
import EditableRow from "./EditableRow.Class";
import Sidebar from "./Sidebar";
import Admin from "../services/admin.service";

const classData = JSON.parse(localStorage.getItem("class"));
const App = () => {
    Admin.getClass();
    const [contacts, setContacts] = useState(classData);
    const [addFormData, setAddFormData] = useState({
        nameClass: "",
        attend: "",
    });

    const [editFormData, setEditFormData] = useState({
        nameClass: "",
        attend: "",
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
        Admin.classAdd(addFormData.nameClass, addFormData.attend);
        const newContact = {
            nameClass: addFormData.nameClass,
            attend: addFormData.attend,
        };

        Admin.getClass();

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        Admin.classUpdate(
            editContactId,
            editFormData.nameClass,
            editFormData.attend,
        );
        const editedContact = {
            id: editContactId,
            nameClass: editFormData.nameClass,
            attend: editFormData.attend,
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
            nameClass: contact.nameClass,
            attend: contact.attend,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];
        Admin.classDelete(contactId);
        const index = contacts.findIndex((contact) => contact.id === contactId);
        // console.log("vị trí:", contactId);
        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
        <div className="gridNav">
            <div>
                <Sidebar />
            </div>
            <div>
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên lớp học</th>
                                <th>Sỉ số</th>
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
                                            handleEditClick={handleEditClick}
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

                <h2>Thêm lớp học</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input
                        type="text"
                        name="nameClass"
                        required="required"
                        placeholder="Tên lớp"
                        onChange={handleAddFormChange}
                    />
                    <input
                        type="number"
                        name="attend"
                        required="required"
                        placeholder="Sỉ số lớp tối đa"
                        onChange={handleAddFormChange}
                    />
                    <button type="submit">Thêm</button>
                </form>
            </div>
        </div>
    );
};

export default App;
