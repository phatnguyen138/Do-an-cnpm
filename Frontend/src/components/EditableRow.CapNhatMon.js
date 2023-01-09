import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input className="name"
          type="text"
          required="required"
          placeholder="Tên"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input  className="mark"
          type="number"
          required="required"
          placeholder="điểm 15'"
          name="fifteen"
          value={editFormData.fifteen}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input  className="mark"
          type="number"
          required="required"
          placeholder="điểm 1 tiết"
          name="midterm"
          value={editFormData.midterm}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input  className="mark"
          type="number"
          required="required"
          placeholder="điểm cuối kì"
          name="lastterm"
          value={editFormData.lastterm}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="width">
        <button type="submit">Lưu</button>
        <button type="button" onClick={handleCancelClick}>
          Huỷ
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
