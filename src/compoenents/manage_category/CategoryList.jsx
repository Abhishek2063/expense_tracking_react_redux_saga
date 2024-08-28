import React from "react";
import { Table, Button } from "react-bootstrap";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const CategoryList = ({ categoryList, onEdit, onDelete }) => {
  return (
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
          {categoryList && categoryList.length > 0 ? (
            categoryList.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category?.name}</td>
                <td>{category?.description}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button onClick={() => onEdit(category)}>
                      <EditFilled />
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(category)}>
                      <DeleteFilled />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No category List
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryList;
