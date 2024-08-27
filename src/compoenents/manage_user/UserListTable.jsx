import React from "react";
import { Table, Button } from "react-bootstrap";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Select } from "antd";

const { Option } = Select;
const UserListTable = ({
  userList,
  onEdit,
  onDelete,
  roleList,
  handleRoleChange,
}) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.length > 0 ? (
            userList.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user?.first_name + " " + user?.last_name}</td>
                <td>{user?.email}</td>
                <td>{user?.role?.name}</td>
                <td>
                  <Select
                    defaultValue={user?.role?.id}
                    style={{ width: "100%" }}
                    onSelect={(value) => handleRoleChange(value, user)}
                  >
                    {roleList.length > 0 ? (
                      roleList.map((data) => (
                        <Option value={data?.id} key={data?.id}>
                          {data?.name}
                        </Option>
                      ))
                    ) : (
                      <Option value={user?.role?.id}>{user?.role?.name}</Option>
                    )}
                  </Select>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button onClick={() => onEdit(user)}>
                      <EditFilled />
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(user)}>
                      <DeleteFilled />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No user List
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserListTable;
