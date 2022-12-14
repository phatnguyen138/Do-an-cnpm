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
        // console.log("v??? tr??:", contactId);
        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
        <div>
            <header className="jumbotron">
                    <h3>C???p nh???t quy ?????nh m??n h???c</h3>
                </header>
        <div className="gridNav">
            <div>
                <Sidebar />
            </div>
            
            <div>
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>T??n m??n h???c</th>
                                <th>??i???m chu???n ?????t m??n</th>
                                <th>H??nh ?????ng</th>
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

                <h2>Th??m m??n h???c m???i</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input
                        type="text"
                        name="name"
                        required="required"
                        placeholder="T??n m??n h???c"
                        onChange={handleAddFormChange}
                    />
                    <input
                        type="number"
                        name="mark"
                        required="required"
                        placeholder="??i??m chu???n ?????t m??n"
                        onChange={handleAddFormChange}
                    />
                    <button type="submit">Th??m</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default App;
