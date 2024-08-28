import React from "react";
import { Table, Button } from "react-bootstrap";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { format } from "date-fns";

const ExpenseList = ({ expenseList, onEdit, onDelete }) => (
  <div className="table-responsive">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Amount(in Rs.)</th>
          <th>Category</th>
          <th>Description</th>
          <th>Date</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {expenseList && expenseList.length > 0 ? (
          expenseList.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>{expense?.amount}</td>
              <td>{expense?.category?.name}</td>
              <td>{expense?.description}</td>
              <td>{format(expense?.date, "yyyy-MM-dd")}</td>

              <td>
                <div className="d-flex gap-2">
                  <Button onClick={() => onEdit(expense)}>
                    <EditFilled />
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(expense)}>
                    <DeleteFilled />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No expense List
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
);

export default ExpenseList;
