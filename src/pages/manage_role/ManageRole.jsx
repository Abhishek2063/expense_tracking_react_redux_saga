import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { message } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import "../../assests/css/manage_role.css";
import { useDispatch, useSelector } from "react-redux";
import { fieldValidator, usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import _ from "lodash";
import {
  createRole,
  deleteRole,
  getRole,
  updateRole,
} from "../../redux/role/role.action";
import FilterControls from "../../compoenents/FilterControls";
import AddButton from "../../compoenents/AddButton";
import RoleList from "../../compoenents/manage_roles/RoleList";
import Pagination from "../../compoenents/Pagination";
import RoleCreateModal from "../../compoenents/modals/manage_role/RoleCreateModal";
import useForm from "../../hooks/useForm";
import ConfirmationPopup from "../../compoenents/ConfirmationPopup";

const SortByFilterDropdown = [
  { name: "Latest", value: "created_at" },
  { name: "Name", value: "name" },
];

const SortOrderFilterDropdown = [
  { name: "Asc", value: "asc" },
  { name: "Desc", value: "desc" },
];

let initialState = {
  name: "",
  description: "",
};

let validationRules = {
  name: (value) => fieldValidator("name", value, "alphabetics", 20, 3).errorMsg,

  description: (value) =>
    value
      ? fieldValidator("description", value, "alphabetics", 255, 3).errorMsg
      : null,
};

const ManageRole = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalRecords, setTotalRecords] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoleId, SetSelectedRoleId] = useState(null);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const { values, errors, handleChange, handleSubmit, reset, setValues } =
    useForm(initialState, validationRules);

  const fetchAllRoles = async ({ sort_by, order, skip }) => {
    setLoader(true);
    dispatch(getRole({ sort_by, order, skip }));
  };

  useEffect(() => {
    fetchAllRoles({ sort_by: sortBy, order: sortOrder, skip });
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
        setPage(getRoleData?.data?.current_page);
        setSkip(getRoleData?.data?.skip);
        setSortBy(getRoleData?.data?.sort_by);
        setSortOrder(getRoleData?.data?.sort_order);
        setTotalRecords(getRoleData?.data?.total);
        setLoader(false);
      }
      if (getRoleData && getRoleData.success === false) {
        setLoader(false);
        message.error(getRoleData.message);
      }
    }
  }, [getRoleData, prevgetRoleData]);

  const handleSelectChange = (value, field) => {
    if (field === "sort_by") {
      setSortBy(value);
    } else {
      setSortOrder(value);
    }
    fetchAllRoles({
      sort_by: field === "sort_by" ? value : sortBy,
      order: field === "sort_order" ? value : sortOrder,
      skip,
    });
  };

  const handlePageChange = (page) => {
    setPage(page);
    setSkip((page - 1) * 10); // Assuming 10 items per page
    fetchAllRoles({ sort_by: sortBy, order: sortOrder, skip: (page - 1) * 10 });
  };

  const handleAddRole = () => {
    setShowModal(true);
  };

  const onSubmit = (formData) => {
    setLoader(true);
    const data = {
      name: formData.name.trim().toLowerCase(),
      description: formData.description.trim() || null,
    };
    dispatch(createRole(data));
  };

  const createRoleData = useSelector((state) => state.role.createRoleData);
  const prevcreateRoleData = usePrevious({ createRoleData });

  useEffect(() => {
    if (
      prevcreateRoleData &&
      prevcreateRoleData.createRoleData !== createRoleData
    ) {
      if (
        createRoleData &&
        _.has(createRoleData, "data") &&
        createRoleData.success === true
      ) {
        message.success(createRoleData.message);
        fetchAllRoles({ sort_by: sortBy, order: sortOrder, skip });
        setShowModal(false);
      }
      if (createRoleData && createRoleData.success === false) {
        setLoader(false);
        message.error(createRoleData.message);
        setShowModal(false);
      }
    } // eslint-disable-next-line
  }, [createRoleData, prevcreateRoleData]);

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const handleEditRole = (role) => {
    const initialState = {
      name: role?.name,
      description: role?.description,
    };
    setValues(initialState);
    SetSelectedRoleId(role?.id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    reset();
  };

  const onUpdateSubmit = (formData) => {
    setLoader(true);
    const data = {
      name: formData.name.trim().toLowerCase(),
      description: formData.description.trim(),
      role_id: selectedRoleId,
    };
    setShowEditModal(false);

    dispatch(updateRole(data));
  };

  const updateRoleData = useSelector((state) => state.role.updateRoleData);
  const prevupdateRoleData = usePrevious({
    updateRoleData,
  });

  useEffect(() => {
    if (
      prevupdateRoleData &&
      prevupdateRoleData.updateRoleData !== updateRoleData
    ) {
      if (
        updateRoleData &&
        _.has(updateRoleData, "data") &&
        updateRoleData.success === true
      ) {
        message.success(updateRoleData.message);
        fetchAllRoles({ sort_by: sortBy, order: sortOrder, skip });
        setShowEditModal(false);
      }
      if (updateRoleData && updateRoleData.success === false) {
        setLoader(false);
        message.error(updateRoleData.message);
      }
    } // eslint-disable-next-line
  }, [updateRoleData, prevupdateRoleData]);

  const handleDeleteRole = (role) => {
    setRoleToDelete(role);
    setIsDeleteConfirmVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirmVisible(false);
    setRoleToDelete(null);
  };

  const handleDeleteConfirm = () => {
    setLoader(true);

    setIsDeleteConfirmVisible(false);

    dispatch(
      deleteRole({
        role_id: roleToDelete.id,
      })
    );
  };

  const deleteRoleData = useSelector((state) => state.role.deleteRoleData);
  const prevdeleteRoleData = usePrevious({
    deleteRoleData,
  });

  useEffect(() => {
    if (
      prevdeleteRoleData &&
      prevdeleteRoleData.deleteRoleData !== deleteRoleData
    ) {
      if (
        deleteRoleData &&
        _.has(deleteRoleData, "data") &&
        deleteRoleData.success === true
      ) {
        message.success(deleteRoleData.message);
        setLoader(false);
        fetchAllRoles({ sort_by: sortBy, order: sortOrder, skip });
        setRoleToDelete(null);
      }
      if (deleteRoleData && deleteRoleData.success === false) {
        setLoader(false);
        message.error(deleteRoleData.message);
      }
    } // eslint-disable-next-line
  }, [deleteRoleData, prevdeleteRoleData]);

  return (
    <>
      <Container fluid className="manage-role">
        <Row className="mb-4">
          <Col>
            <h2>
              <AppstoreOutlined /> Manage Roles
            </h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <FilterControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortByChange={(value) => handleSelectChange(value, "sort_by")}
              onSortOrderChange={(value) =>
                handleSelectChange(value, "sort_order")
              }
              sortByOptions={SortByFilterDropdown}
              sortOrderOptions={SortOrderFilterDropdown}
            />
          </Col>
          <Col md={6} className="text-md-end">
            <AddButton onClick={handleAddRole} title="Add Role"/>
          </Col>
        </Row>

        <Row>
          <Col>
            <RoleList
              roleList={roleList}
              onEdit={handleEditRole}
              onDelete={handleDeleteRole}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Pagination
              current={page}
              total={totalRecords}
              pageSize={10}
              onChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>
      <RoleCreateModal
        modal_title="Add Role"
        modalOpen={showModal}
        handleClose={handleCloseModal}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit(onSubmit)}
      />
      <RoleCreateModal
        modal_title="Edit Role"
        modalOpen={showEditModal}
        handleClose={handleCloseEditModal}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit(onUpdateSubmit)}
      />

      <ConfirmationPopup
        isVisible={isDeleteConfirmVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Confirm Delete"
        content={`Are you sure you want to delete the role "${roleToDelete?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      {loader && <Loader />}
    </>
  );
};

export default ManageRole;
