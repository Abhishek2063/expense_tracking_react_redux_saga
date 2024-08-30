import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { Select, Switch, message } from "antd";
import { PlusOutlined, AppstoreOutlined, EditFilled } from "@ant-design/icons";
import "../../assests/css/manage_module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "../../redux/role/role.action";
import { fieldValidator, usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import _ from "lodash";
import { getUserDetails } from "../../storage/user";
import {
  createModule,
  getAllModuleRoute,
  updateModule,
  updateModulePermission,
} from "../../redux/module/module.action";
import ModuleCreateModal from "../../compoenents/modals/manage_modules/ModuleCreateModal";
import useForm from "../../hooks/useForm";

const { Option } = Select;
let initialState = {
  name: "",
  link_name: "",
  description: "",
};

let validationRules = {
  name: (value) => fieldValidator("name", value, "alphabetics", 20, 3).errorMsg,
  link_name: (value) =>
    fieldValidator("link_name", value, "string", 20, 3).errorMsg,
  description: (value) =>
    value
      ? fieldValidator("description", value, "alphabetics", 255, 3).errorMsg
      : null,
};

const ManageModules = () => {
  const dispatch = useDispatch();
  const userData = getUserDetails();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [loader, setLoader] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [modleListData, setModuleListData] = useState([]);
  const { values, errors, handleChange, handleSubmit, reset, setValues } =
    useForm(initialState, validationRules);
  const [selectedRoleID, setSelectedRoleId] = useState(null);
  const [selectedModuleID, setSelectedModuleId] = useState(null);

  const handleAddModule = () => {
    setShowModal(true);
  };

  const fetchAllRoles = async () => {
    setLoader(true);
    dispatch(getRole());
  };

  const fetchAllModules = async (role_id) => {
    setSelectedRoleId(role_id);
    setLoader(true);
    dispatch(
      getAllModuleRoute({
        role_id: role_id,
      })
    );
  };

  useEffect(() => {
    fetchAllRoles();
    if (userData) {
      fetchAllModules(userData?.role?.id);
    }
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

  const getAllModuleRouteData = useSelector(
    (state) => state.module.getAllModuleRouteData
  );
  const prevgetAllModuleRouteData = usePrevious({ getAllModuleRouteData });

  useEffect(() => {
    if (
      prevgetAllModuleRouteData &&
      prevgetAllModuleRouteData.getAllModuleRouteData !== getAllModuleRouteData
    ) {
      if (
        getAllModuleRouteData &&
        _.has(getAllModuleRouteData, "data") &&
        getAllModuleRouteData.success === true
      ) {
        message.success(getAllModuleRouteData.message);
        // Filter the modules based on permission
        const modulesWithPermission =
          getAllModuleRouteData?.data?.modules.filter(
            (module) => module.has_permission
          );
        setModuleListData(modulesWithPermission);
        setLoader(false);
      }
      if (getAllModuleRouteData && getAllModuleRouteData.success === false) {
        setLoader(false);
        message.error(getAllModuleRouteData.message);
      }
    } // eslint-disable-next-line
  }, [getAllModuleRouteData, prevgetAllModuleRouteData]);

  const onSubmit = (formData) => {
    setLoader(true);
    const data = {
      name: formData.name.trim().toLowerCase(),
      link_name: formData.link_name.trim(),
      description: formData.description.trim() || null,
    };
    dispatch(createModule(data));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const createModuleData = useSelector(
    (state) => state.module.createModuleData
  );
  const prevcreateModuleData = usePrevious({ createModuleData });

  useEffect(() => {
    if (
      prevcreateModuleData &&
      prevcreateModuleData.createModuleData !== createModuleData
    ) {
      if (
        createModuleData &&
        _.has(createModuleData, "data") &&
        createModuleData.success === true
      ) {
        message.success(createModuleData.message);
        fetchAllModules(selectedRoleID);
      }
      if (createModuleData && createModuleData.success === false) {
        setLoader(false);
        message.error(createModuleData.message);
      }
    } // eslint-disable-next-line
  }, [createModuleData, prevcreateModuleData]);

  const handleSelectChange = (value) => {
    fetchAllModules(value);
  };

  const handleChangePermission = (value, module_id) => {
    dispatch(
      updateModulePermission({
        role_id: parseInt(selectedRoleID),
        module_id: parseInt(module_id),
        permission: value,
      })
    );
  };

  const updateModulePermissionData = useSelector(
    (state) => state.module.updateModulePermissionData
  );
  const prevupdateModulePermissionData = usePrevious({
    updateModulePermissionData,
  });

  useEffect(() => {
    if (
      prevupdateModulePermissionData &&
      prevupdateModulePermissionData.updateModulePermissionData !==
        updateModulePermissionData
    ) {
      if (
        updateModulePermissionData &&
        _.has(updateModulePermissionData, "data") &&
        updateModulePermissionData.success === true
      ) {
        message.success(updateModulePermissionData.message);
        fetchAllModules(selectedRoleID);
      }
      if (
        updateModulePermissionData &&
        updateModulePermissionData.success === false
      ) {
        setLoader(false);
        message.error(updateModulePermissionData.message);
      }
    } // eslint-disable-next-line
  }, [updateModulePermissionData, prevupdateModulePermissionData]);

  const handleEditModal = (selectedModuleData) => {
    const initialState = {
      name: selectedModuleData?.name,
      link_name: selectedModuleData?.link_name,
      description: selectedModuleData?.description,
    };
    setValues(initialState);
    setSelectedModuleId(selectedModuleData?.id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedModuleId(null);
    reset();
  };
  const onUpdateSubmit = (formData) => {
    setLoader(true);
    const data = {
      name: formData.name.trim().toLowerCase(),
      link_name: formData.link_name.trim(),
      description: formData.description.trim() || null,
      module_id: selectedModuleID,
    };
    setShowEditModal(false);

    dispatch(updateModule(data));
  };

  const updateModuleData = useSelector(
    (state) => state.module.updateModuleData
  );
  const prevupdateModuleData = usePrevious({
    updateModuleData,
  });

  useEffect(() => {
    if (
      prevupdateModuleData &&
      prevupdateModuleData.updateModuleData !== updateModuleData
    ) {
      if (
        updateModuleData &&
        _.has(updateModuleData, "data") &&
        updateModuleData.success === true
      ) {
        message.success(updateModuleData.message);
        fetchAllModules(selectedRoleID);
      }
      if (updateModuleData && updateModuleData.success === false) {
        setLoader(false);
        message.error(updateModuleData.message);
      }
    } // eslint-disable-next-line
  }, [updateModuleData, prevupdateModuleData]);

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
            <Select
              defaultValue={userData?.role?.id}
              style={{ width: "100%" }}
              onSelect={handleSelectChange}
            >
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
                    <th>Permission</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {modleListData && modleListData.length > 0 ? (
                    modleListData.map((module, index) => (
                      <tr key={module.id}>
                        <td>{index + 1}</td>
                        <td>{module?.name}</td>
                        <td>{module?.link_name}</td>
                        <td>
                          <Switch
                            checked={module?.has_permission}
                            onChange={(value) =>
                              handleChangePermission(value, module.id)
                            }
                          />
                        </td>
                        <td>
                          <Button onClick={() => handleEditModal(module)}>
                            <EditFilled />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center">No Module List</tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        <ModuleCreateModal
          modal_title="Add Module"
          modalOpen={showModal}
          handleClose={handleCloseModal}
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit(onSubmit)}
        />
        <ModuleCreateModal
          modal_title="Edit Module"
          modalOpen={showEditModal}
          handleClose={handleCloseEditModal}
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit(onUpdateSubmit)}
        />
      </Container>
      {loader && <Loader />}
    </>
  );
};

export default ManageModules;
