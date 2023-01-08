import { Header } from "antd/es/layout/layout";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";

export default function Table(props,data){
    const columns = useMemo(() => [
        {
            Header: "Họ tên",
            accessor: "name"
        },
        {
            Header: "Điểm 15 phút",
            accessor: "fifteen"
        },
        {
            Header: "Điểm giữa kì",
            accessor: "midterm"
        },
        {
            Header: "Điểm cuối kỳ",
            accessor: "lastterm"
        },
    ])

    const tableIn = useTable({columns,data});

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableIn;

    return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
}