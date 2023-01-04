import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Tên lớp"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Sỉ số"
          name="mark"
          value={editFormData.mark}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Lưu</button>
        <button type="button" onClick={handleCancelClick}>
          Huỷ
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
