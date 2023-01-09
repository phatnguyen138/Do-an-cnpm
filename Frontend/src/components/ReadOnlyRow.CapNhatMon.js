import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      {/* <td>{contact.id}</td> */}
      <td>{contact.name}</td>
      <td>{contact.fifteen}</td>
      <td>{contact.midterm}</td>
      <td>{contact.lastterm}</td>
      {/* <td>{contact.email}</td> */}
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Sửa
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Xoá
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
