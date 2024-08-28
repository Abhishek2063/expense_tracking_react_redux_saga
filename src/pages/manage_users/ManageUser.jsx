import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../assests/css/manage_user.css";
import { useDispatch, useSelector } from "react-redux";
import { fieldValidator, usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import _ from "lodash";
import Pagination from "../../compoenents/Pagination";
import useForm from "../../hooks/useForm";
import ConfirmationPopup from "../../compoenents/ConfirmationPopup";
import { registration } from "../../redux/signup/signup.action";
import {
  deleteUser,
  getAllUser,
  updateUser,
} from "../../redux/user/user.action";
import FilterControls from "../../compoenents/FilterControls";
import AddButton from "../../compoenents/AddButton";
import UserListTable from "../../compoenents/manage_user/UserListTable";
import UserModal from "../../compoenents/modals/manage_user/UserModal";
import { getRole } from "../../redux/role/role.action";
import UpdateUserModal from "../../compoenents/modals/manage_user/UpdateUserModal";

const SortByFilterDropdown = [
  { name: "Latest", value: "created_at" },
  { name: "First Name", value: "first_name" },
  { name: "Last Name", value: "last_name" },
  { name: "Email", value: "email" },
  { name: "Role", value: "role" },
];

const SortOrderFilterDropdown = [
  { name: "Asc", value: "asc" },
  { name: "Desc", value: "desc" },
];

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const validationRules = {
  first_name: (value) =>
    fieldValidator("first_name", value, "alphabetics", 20, 3).errorMsg,
  last_name: (value) =>
    value
      ? fieldValidator("last_name", value, "alphabetics", 20, 3).errorMsg
      : null,
  email: (value) => fieldValidator("email", value, "email", null, 3).errorMsg,
  password: (value) =>
    fieldValidator("password", value, "password", 20, 8).errorMsg,
  confirm_password: (value, values) =>
    fieldValidator(
      "confirm_password",
      value,
      "password",
      20,
      8,
      values.password
    ).errorMsg,
};

const ManageUser = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [userList, setUserList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalRecords, setTotalRecords] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, SetSelectedUserId] = useState(null);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [userToDelete, setuserToDelete] = useState(null);
  const { values, errors, handleChange, handleSubmit, reset, setValues } =
    useForm(initialState, validationRules);

  const fetchAllUser = async ({ sort_by, order, skip }) => {
    setLoader(true);
    dispatch(getAllUser({ sort_by, order, skip }));
  };

  const fetchAllRoles = async () => {
    setLoader(true);
    dispatch(getRole());
  };

  useEffect(() => {
    fetchAllUser({ sort_by: sortBy, order: sortOrder, skip });
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
      }
      if (getRoleData && getRoleData.success === false) {
        setLoader(false);
        message.error(getRoleData.message);
      }
    }
  }, [getRoleData, prevgetRoleData]);

  const getAllUserData = useSelector((state) => state.user.getAllUserData);
  const prevgetAllUserData = usePrevious({ getAllUserData });

  useEffect(() => {
    if (
      prevgetAllUserData &&
      prevgetAllUserData.getAllUserData !== getAllUserData
    ) {
      if (
        getAllUserData &&
        _.has(getAllUserData, "data") &&
        getAllUserData.success === true
      ) {
        setLoader(false);
        message.success(getAllUserData.message);
        setUserList(getAllUserData?.data?.users);
        setPage(getAllUserData?.data?.current_page);
        setSkip(getAllUserData?.data?.skip);
        setSortBy(getAllUserData?.data?.sort_by);
        setSortOrder(getAllUserData?.data?.sort_order);
        setTotalRecords(getAllUserData?.data?.total);
      }
      if (getAllUserData && getAllUserData.success === false) {
        setLoader(false);
        message.error(getAllUserData.message);
      }
    }
  }, [getAllUserData, prevgetAllUserData]);

  const handleSelectChange = (value, field) => {
    if (field === "sort_by") {
      setSortBy(value);
    } else {
      setSortOrder(value);
    }
    fetchAllUser({
      sort_by: field === "sort_by" ? value : sortBy,
      order: field === "sort_order" ? value : sortOrder,
      skip,
    });
  };

  const handlePageChange = (page) => {
    setPage(page);
    setSkip((page - 1) * 10); // Assuming 10 items per page
    fetchAllUser({ sort_by: sortBy, order: sortOrder, skip: (page - 1) * 10 });
  };

  const handleAddUser = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const onSubmit = (formData) => {
    setLoader(true);

    const data = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
    };
    dispatch(registration(data));
  };
  const registrationData = useSelector((state) => state.signup.registerData);
  const prevregistrationData = usePrevious({ registrationData });
  useEffect(() => {
    if (
      prevregistrationData &&
      prevregistrationData.registrationData !== registrationData
    ) {
      if (
        registrationData &&
        _.has(registrationData, "data") &&
        registrationData.success === true
      ) {
        message.success(registrationData.message);
        fetchAllUser({ sort_by: sortBy, order: sortOrder, skip });
        setShowModal(false);
      }
      if (registrationData && registrationData.success === false) {
        setLoader(false);

        message.error(registrationData.message);
      }
    } // eslint-disable-next-line
  }, [registrationData, prevregistrationData]);

  const handleEditUser = (user) => {
    const initialState = {
      first_name: user?.first_name,
      last_name: user?.last_name,
    };
    setValues(initialState);
    SetSelectedUserId(user?.id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    reset();
  };

  const onUpdateSubmit = (formData) => {
    setLoader(true);
    const data = {
      first_name: formData?.first_name.trim().toLowerCase(),
      last_name: formData?.last_name.trim(),
      user_id: selectedUserId,
    };
    setShowEditModal(false);

    dispatch(updateUser(data));
  };

  const handleRoleChange = (value, user) => {
    setLoader(true);
    const data = {
      role_id: value,
      user_id: user?.id,
    };

    dispatch(updateUser(data));
  };

  const updateUserData = useSelector((state) => state.user.updateUserData);
  const prevupdateUserData = usePrevious({
    updateUserData,
  });

  useEffect(() => {
    if (
      prevupdateUserData &&
      prevupdateUserData.updateUserData !== updateUserData
    ) {
      if (
        updateUserData &&
        _.has(updateUserData, "data") &&
        updateUserData.success === true
      ) {
        message.success(updateUserData.message);
        fetchAllUser({ sort_by: sortBy, order: sortOrder, skip });
        setShowEditModal(false);
        setLoader(false);
      }
      if (updateUserData && updateUserData.success === false) {
        setLoader(false);
        message.error(updateUserData.message);
      }
    } // eslint-disable-next-line
  }, [updateUserData, prevupdateUserData]);

  const handleDeleteUser = (user) => {
    setuserToDelete(user);
    setIsDeleteConfirmVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirmVisible(false);
    fetchAllUser(null);
  };

  const handleDeleteConfirm = () => {
    setLoader(true);

    setIsDeleteConfirmVisible(false);

    dispatch(
      deleteUser({
        user_id: userToDelete.id,
      })
    );
  };

  const deleteUserData = useSelector((state) => state.user.deleteUserData);
  const prevdeleteUserData = usePrevious({
    deleteUserData,
  });

  useEffect(() => {
    if (
      prevdeleteUserData &&
      prevdeleteUserData.deleteUserData !== deleteUserData
    ) {
      if (
        deleteUserData &&
        _.has(deleteUserData, "data") &&
        deleteUserData.success === true
      ) {
        message.success(deleteUserData.message);
        setLoader(false);
        fetchAllUser({ sort_by: sortBy, order: sortOrder, skip });
        setuserToDelete(null);
      }
      if (deleteUserData && deleteUserData.success === false) {
        setLoader(false);
        message.error(deleteUserData.message);
      }
    } // eslint-disable-next-line
  }, [deleteUserData, prevdeleteUserData]);

  return (
    <>
      <Container fluid className="manage-user">
        <Row className="mb-4">
          <Col>
            <h2>
              <UserOutlined /> Manage Users
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
            <AddButton onClick={handleAddUser} title="Add User" />
          </Col>
        </Row>

        <Row>
          <Col>
            <UserListTable
              userList={userList}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              roleList={roleList}
              handleRoleChange={handleRoleChange}
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
      <UserModal
        modal_title="Add User"
        modalOpen={showModal}
        handleClose={handleCloseModal}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit(onSubmit)}
      />
      <UpdateUserModal
        modal_title="Edit User"
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
        content={`Are you sure you want to delete the user "${
          userToDelete?.first_name + " " + userToDelete?.last_name
        }"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {loader && <Loader />}
    </>
  );
};

export default ManageUser;
