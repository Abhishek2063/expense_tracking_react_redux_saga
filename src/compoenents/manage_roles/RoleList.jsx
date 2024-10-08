import React from "react";
import { Table, Button } from "react-bootstrap";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const RoleList = ({ roleList, onEdit, onDelete }) => (
  <div className="table-responsive">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {roleList && roleList.length > 0 ? (
          roleList.map((role, index) => (
            <tr key={role.id}>
              <td>{index + 1}</td>
              <td>{role?.name}</td>
              <td>{role?.description}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button onClick={() => onEdit(role)}>
                    <EditFilled />
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(role)}>
                    <DeleteFilled />
                  </Button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No Role List
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
);

export default RoleList;
