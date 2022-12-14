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
        // console.log("v??? tr??:", contactId);
        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
        <div>
            <header className="jumbotron">
                    <h3>C???p nh???t quy ?????nh l???p</h3>
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
                                <th>T??n l???p h???c</th>
                                <th>S??? s???</th>
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

                <h2>Th??m l???p h???c</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <input
                        type="text"
                        name="nameClass"
                        required="required"
                        placeholder="T??n l???p"
                        onChange={handleAddFormChange}
                    />
                    <input
                        type="number"
                        name="attend"
                        required="required"
                        placeholder="S??? s??? l???p t???i ??a"
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
