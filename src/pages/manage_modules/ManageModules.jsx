import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { Select, Switch, Modal, message } from "antd";
import { PlusOutlined, AppstoreOutlined } from "@ant-design/icons";
import "../../assests/css/manage_module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "../../redux/role/role.action";
import { usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import _ from "lodash";
import { getUserDetails } from '../../storage/user';

const { Option } = Select;

const ManageModules = () => {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const dispatch = useDispatch();
  const userData = getUserDetails()
  const modules = [
    {
      id: 1,
      name: "Dashboard",
      link: "/dashboard",
      icon: "DashboardOutlined",
      permission: true,
    },
    {
      id: 2,
      name: "Users",
      link: "/users",
      icon: "UserOutlined",
      permission: false,
    },
    // Add more modules as needed
  ];

  const handleAddModule = () => {
    setShowModal(true);
  };

  const fetchAllRoles = async () => {
    setLoader(true);
    dispatch(getRole());
  };

  useEffect(() => {
    fetchAllRoles();
    // eslint-disable-next-line
  }, []);

  const getRoleData = useSelector((state) => state.role.getRoleData);
  const prevgetRoleData = usePrevious({ getRoleData });

  useEffect(() => {
    if (prevgetRoleData && prevgetRoleData.getRoleData !== getRoleData) {
      if (
        getRoleData &&
        _.has(getRoleData, "data") &&
        getRoleData.success === true
      ) {
        message.success(getRoleData.message);
        setRoleList(getRoleData?.data?.roles);
        setLoader(false);
      }
      if (getRoleData && getRoleData.success === false) {
        setLoader(false);
        message.error(getRoleData.message);
      }
    } // eslint-disable-next-line
  }, [getRoleData, prevgetRoleData]);

  return (
    <>
      <Container fluid className="manage-modules">
        <Row className="mb-4">
          <Col>
            <h2>
              <AppstoreOutlined /> Manage Modules
            </h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
          <Select defaultValue={userData?.role?.id} style={{ width: "100%" }}>
              {roleList.length > 0 ? (
                roleList.map((data) => (
                  <Option value={data?.id} key={data?.id}>
                    {data?.name}
                  </Option>
                ))
              ) : (
                <Option value={userData?.role?.id}>
                  {userData?.role?.name}
                </Option>
              )}
            </Select>
          </Col>
          <Col md={6} className="text-md-end">
            <Button variant="primary" onClick={handleAddModule}>
              <PlusOutlined /> Add Module
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Icon Name</th>
                    <th>Permission</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module, index) => (
                    <tr key={module.id}>
                      <td>{index + 1}</td>
                      <td>{module.name}</td>
                      <td>{module.link}</td>
                      <td>{module.icon}</td>
                      <td>
                        <Switch checked={module.permission} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        {/* Common Modal */}
        <Modal
          title="Add Module"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setShowModal(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => setShowModal(false)}
            >
              Submit
            </Button>,
          ]}
        >
          {/* Add your form fields here */}
          <p>Module form fields go here</p>
        </Modal>
      </Container>
      {loader && <Loader />}
    </>
  );
};

export default ManageModules;
