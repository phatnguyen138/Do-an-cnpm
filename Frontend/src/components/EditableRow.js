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
          name="nameClass"
          value={editFormData.nameClass}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Sỉ số"
          name="attend"
          value={editFormData.attend}
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
