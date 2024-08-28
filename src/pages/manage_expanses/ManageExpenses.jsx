import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { message } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import "../../assests/css/manage_expense.css";
import { useDispatch, useSelector } from "react-redux";
import { fieldValidator, usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import _ from "lodash";
import {
  createExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from "../../redux/expenses/expenses.action";
import FilterControls from "../../compoenents/FilterControls";
import ExpenseList from "../../compoenents/manage_expense/ExpenseList";
import Pagination from "../../compoenents/Pagination";
import AddButton from "../../compoenents/AddButton";
import { getUserDetails } from "../../storage/user";
import { getCategory } from "../../redux/category/category.action";
import ExpenseCreateModal from "../../compoenents/modals/manage_expense/ExpenseCreateModal";
import useForm from "../../hooks/useForm";
import dayjs from "dayjs";
import ConfirmationPopup from "../../compoenents/ConfirmationPopup";

const SortByFilterDropdown = [
  { name: "Latest", value: "created_at" },
  { name: "Amount", value: "amount" },
];

const SortOrderFilterDropdown = [
  { name: "Asc", value: "asc" },
  { name: "Desc", value: "desc" },
];

let initialState = {
  amount: "",
  date: null,
  category_id: null,
  description: "",
};

let validationRules = {
  amount: (value) =>
    fieldValidator("amount", value, "onlynumber", 20, 1).errorMsg,

  description: (value) =>
    value
      ? fieldValidator("description", value, "alphabetics", 255, 3).errorMsg
      : null,
};

const ManageExpenses = () => {
  const dispatch = useDispatch();
  const userData = getUserDetails();
  const [loader, setLoader] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalRecords, setTotalRecords] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpenseId, SetSelectedExpenseId] = useState(null);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const { values, errors, handleChange, handleSubmit, reset, setValues } =
    useForm(initialState, validationRules);

  const fetchAllCategories = async () => {
    setLoader(true);
    dispatch(
      getCategory({
        user_id: userData?.id,
      })
    );
  };
  const fetchAllExpenses = async ({ sort_by, order, skip }) => {
    setLoader(true);
    dispatch(getExpense({ sort_by, order, skip, user_id: userData?.id }));
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllExpenses({ sort_by: sortBy, order: sortOrder, skip });
    // eslint-disable-next-line
  }, []);

  const handleSelectChange = (value, field) => {
    if (field === "sort_by") {
      setSortBy(value);
    } else {
      setSortOrder(value);
    }
    fetchAllExpenses({
      sort_by: field === "sort_by" ? value : sortBy,
      order: field === "sort_order" ? value : sortOrder,
      skip,
    });
  };

  const handlePageChange = (page) => {
    setPage(page);
    setSkip((page - 1) * 10); // Assuming 10 items per page
    fetchAllExpenses({
      sort_by: sortBy,
      order: sortOrder,
      skip: (page - 1) * 10,
    });
  };

  const getExpenseData = useSelector((state) => state.expense.getExpenseData);
  const prevgetExpenseData = usePrevious({ getExpenseData });

  useEffect(() => {
    if (
      prevgetExpenseData &&
      prevgetExpenseData.getExpenseData !== getExpenseData
    ) {
      if (
        getExpenseData &&
        _.has(getExpenseData, "data") &&
        getExpenseData.success === true
      ) {
        message.success(getExpenseData.message);
        setExpenseList(getExpenseData?.data?.expenses);
        setPage(getExpenseData?.data?.current_page);
        setSkip(getExpenseData?.data?.skip);
        setSortBy(getExpenseData?.data?.sort_by);
        setSortOrder(getExpenseData?.data?.sort_order);
        setTotalRecords(getExpenseData?.data?.total);
        setLoader(false);
      }
      if (getExpenseData && getExpenseData.success === false) {
        setLoader(false);
        message.error(getExpenseData.message);
      }
    }
  }, [getExpenseData, prevgetExpenseData]);

  const getCategoryData = useSelector(
    (state) => state.category.getCategoryData
  );
  const prevgetCategoryData = usePrevious({ getCategoryData });

  useEffect(() => {
    if (
      prevgetCategoryData &&
      prevgetCategoryData.getCategoryData !== getCategoryData
    ) {
      if (
        getCategoryData &&
        _.has(getCategoryData, "data") &&
        getCategoryData.success === true
      ) {
        message.success(getCategoryData.message);
        setCategoryList(getCategoryData?.data?.categories);
        setLoader(false);
      }
      if (getCategoryData && getCategoryData.success === false) {
        setLoader(false);
        message.error(getCategoryData.message);
      }
    }
  }, [getCategoryData, prevgetCategoryData]);

  const handleAddExpense = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const onSubmit = (formData) => {
    setLoader(true);
    const data = {
      user_id: userData?.id,
      category_id: parseInt(formData.category_id),
      description: formData.description.trim() || null,
      amount: parseFloat(formData.amount),
      date: dayjs(formData.date).format("YYYY-MM-DD"),
    };
    dispatch(createExpense(data));
  };

  const createExpenseData = useSelector(
    (state) => state.expense.createExpenseData
  );
  const prevcreateExpenseData = usePrevious({ createExpenseData });

  useEffect(() => {
    if (
      prevcreateExpenseData &&
      prevcreateExpenseData.createExpenseData !== createExpenseData
    ) {
      if (
        createExpenseData &&
        _.has(createExpenseData, "data") &&
        createExpenseData.success === true
      ) {
        message.success(createExpenseData.message);
        fetchAllExpenses({ sort_by: sortBy, order: sortOrder, skip });
        setShowModal(false);
      }
      if (createExpenseData && createExpenseData.success === false) {
        setLoader(false);
        message.error(createExpenseData.message);
        setShowModal(false);
      }
    } // eslint-disable-next-line
  }, [createExpenseData, prevcreateExpenseData]);

  const handleEditExpense = (expense) => {
    const initialState = {
      category_id: parseInt(expense.category?.id),
      description: expense.description.trim() || null,
      amount: parseFloat(expense.amount),
      date: new Date(expense.date),
    };
    setValues(initialState);
    SetSelectedExpenseId(expense?.id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    reset();
  };

  const onUpdateSubmit = (formData) => {
    setLoader(true);
    const data = {
      user_id: userData?.id,
      expense_id: selectedExpenseId,
      category_id: parseInt(formData.category_id),
      description: formData.description.trim() || null,
      amount: parseFloat(formData.amount),
      date: dayjs(formData.date).format("YYYY-MM-DD"),
    };
    setShowEditModal(false);

    dispatch(updateExpense(data));
  };

  const updateExpenseData = useSelector(
    (state) => state.expense.updateExpenseData
  );
  const prevupdateExpenseData = usePrevious({ updateExpenseData });

  useEffect(() => {
    if (
      prevupdateExpenseData &&
      prevupdateExpenseData.updateExpenseData !== updateExpenseData
    ) {
      if (
        updateExpenseData &&
        _.has(updateExpenseData, "data") &&
        updateExpenseData.success === true
      ) {
        message.success(updateExpenseData.message);
        fetchAllExpenses({ sort_by: sortBy, order: sortOrder, skip });
        setShowModal(false);
      }
      if (updateExpenseData && updateExpenseData.success === false) {
        setLoader(false);
        message.error(updateExpenseData.message);
        setShowModal(false);
      }
    } // eslint-disable-next-line
  }, [updateExpenseData, prevupdateExpenseData]);

  const handleDeleteExpense = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteConfirmVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirmVisible(false);
    setExpenseToDelete(null);
  };

  const handleDeleteConfirm = () => {
    setLoader(true);

    setIsDeleteConfirmVisible(false);

    dispatch(
      deleteExpense({
        expense_id: expenseToDelete.id,
      })
    );
  };

  const deleteExpenseData = useSelector(
    (state) => state.expense.deleteExpenseData
  );
  const prevdeleteExpenseData = usePrevious({ deleteExpenseData });

  useEffect(() => {
    if (
      prevdeleteExpenseData &&
      prevdeleteExpenseData.deleteExpenseData !== deleteExpenseData
    ) {
      if (
        deleteExpenseData &&
        _.has(deleteExpenseData, "data") &&
        deleteExpenseData.success === true
      ) {
        message.success(deleteExpenseData.message);
        fetchAllExpenses({ sort_by: sortBy, order: sortOrder, skip });
        setShowModal(false);
      }
      if (deleteExpenseData && deleteExpenseData.success === false) {
        setLoader(false);
        message.error(deleteExpenseData.message);
        setShowModal(false);
      }
    } // eslint-disable-next-line
  }, [deleteExpenseData, prevdeleteExpenseData]);

  return (
    <>
      <Container fluid className="manage-expense">
        <Row className="mb-4">
          <Col>
            <h2>
              <DollarOutlined /> Manage Expenses
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
            <AddButton onClick={handleAddExpense} title="Add Expense" />
          </Col>
        </Row>

        <Row>
          <Col>
            <ExpenseList
              expenseList={expenseList}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
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
      <ExpenseCreateModal
        modal_title="Add Expense"
        modalOpen={showModal}
        handleClose={handleCloseModal}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit(onSubmit)}
        categoryList={categoryList}
        setValues={setValues}
      />
      <ExpenseCreateModal
        modal_title="Edit Expense"
        modalOpen={showEditModal}
        handleClose={handleCloseEditModal}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit(onUpdateSubmit)}
        categoryList={categoryList}
        setValues={setValues}
      />

      <ConfirmationPopup
        isVisible={isDeleteConfirmVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Confirm Delete"
        content={`Are you sure you want to delete the expense ?`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {loader && <Loader />}
    </>
  );
};

export default ManageExpenses;
