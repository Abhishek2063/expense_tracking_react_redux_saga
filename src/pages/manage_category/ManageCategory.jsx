import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { message } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import "../../assests/css/manage_category.css";
import { useDispatch, useSelector } from "react-redux";
import { fieldValidator, usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import _ from "lodash";
import Pagination from "../../compoenents/Pagination";
import useForm from "../../hooks/useForm";
import ConfirmationPopup from "../../compoenents/ConfirmationPopup";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../redux/category/category.action";
import AddButton from "../../compoenents/AddButton";
import CategoryList from "../../compoenents/manage_category/CategoryList";
import FilterControls from "../../compoenents/FilterControls";
import { getUserDetails } from "../../storage/user";
import Inputtext from "../../compoenents/Inputtext";
import CategoryCreateModal from "../../compoenents/modals/manage_category/CategoryCreateModal";

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

const ManageCategory = () => {
  const dispatch = useDispatch();
  const userData = getUserDetails();
  const [loader, setLoader] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filterSearch, setFilterSearch] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalRecords, setTotalRecords] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategoryId, SetSelectedCategoryId] = useState(null);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { values, errors, handleChange, handleSubmit, reset, setValues } =
    useForm(initialState, validationRules);

  const fetchAllCategories = async ({
    sort_by,
    order,
    skip,
    filter_search,
  }) => {
    setLoader(true);
    dispatch(
      getCategory({
        sort_by,
        order,
        skip,
        limit,
        filter_search,
        user_id: userData?.id,
      })
    );
  };

  useEffect(() => {
    fetchAllCategories({
      sort_by: sortBy,
      order: sortOrder,
      skip: skip,
      filter_search: filterSearch,
    });
    // eslint-disable-next-line
  }, []);

  const handleSelectChange = (value, field) => {
    if (field === "sort_by") {
      setSortBy(value);
    } else {
      setSortOrder(value);
    }
    fetchAllCategories({
      sort_by: field === "sort_by" ? value : sortBy,
      order: field === "sort_order" ? value : sortOrder,
      skip: skip,
      filter_search: filterSearch,
    });
  };

  const handlePageChange = (page) => {
    setPage(page);
    setSkip((page - 1) * 10); // Assuming 10 items per page
    fetchAllCategories({
      sort_by: sortBy,
      order: sortOrder,
      skip: (page - 1) * 10,
      filter_search: filterSearch,
    });
  };

  const handleSearchValue = (e) => {
    setFilterSearch(e.target.value);
    fetchAllCategories({
      sort_by: sortBy,
      order: sortOrder,
      skip: skip,
      filter_search: e.target.value,
    });
  };

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
        setPage(getCategoryData?.data?.current_page);
        setSkip(getCategoryData?.data?.skip);
        setSortBy(getCategoryData?.data?.sort_by);
        setSortOrder(getCategoryData?.data?.sort_order);
        setTotalRecords(getCategoryData?.data?.total);
        setLoader(false);
        setLimit(getCategoryData?.data?.limit);
        setFilterSearch(getCategoryData?.data?.filter_search);
      }
      if (getCategoryData && getCategoryData.success === false) {
        setLoader(false);
        message.error(getCategoryData.message);
      }
    }
  }, [getCategoryData, prevgetCategoryData]);

  const handleAddCategory = () => {
    setShowModal(true);
  };

  const onSubmit = (formData) => {
    setLoader(true);
    const data = {
      name: formData.name.trim().toLowerCase(),
      description: formData.description.trim() || null,
      user_id: userData?.id,
    };
    dispatch(createCategory(data));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  const createCategoryData = useSelector(
    (state) => state.category.createCategoryData
  );
  const prevcreateCategoryData = usePrevious({ createCategoryData });

  useEffect(() => {
    if (
      prevcreateCategoryData &&
      prevcreateCategoryData.createCategoryData !== createCategoryData
    ) {
      if (
        createCategoryData &&
        _.has(createCategoryData, "data") &&
        createCategoryData.success === true
      ) {
        message.success(createCategoryData.message);
        fetchAllCategories({
          sort_by: sortBy,
          order: sortOrder,
          skip: skip,
          filter_search: filterSearch,
        });
        setShowModal(false);
      }
      if (createCategoryData && createCategoryData.success === false) {
        setLoader(false);
        message.error(createCategoryData.message);
        setShowModal(false);
      }
    } // eslint-disable-next-line
  }, [createCategoryData, prevcreateCategoryData]);

  const handleEditCategory = (category) => {
    const initialState = {
      name: category?.name,
      description: category?.description,
    };
    setValues(initialState);
    SetSelectedCategoryId(category?.id);
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
      category_id: selectedCategoryId,
      user_id: userData?.id,
    };
    setShowEditModal(false);

    dispatch(updateCategory(data));
  };

  const updateCategoryData = useSelector(
    (state) => state.category.updateCategoryData
  );
  const prevupdateCategoryData = usePrevious({
    updateCategoryData,
  });

  useEffect(() => {
    if (
      prevupdateCategoryData &&
      prevupdateCategoryData.updateCategoryData !== updateCategoryData
    ) {
      if (
        updateCategoryData &&
        _.has(updateCategoryData, "data") &&
        updateCategoryData.success === true
      ) {
        message.success(updateCategoryData.message);
        fetchAllCategories({
          sort_by: sortBy,
          order: sortOrder,
          skip: skip,
          filter_search: filterSearch,
        });
        setShowEditModal(false);
      }
      if (updateCategoryData && updateCategoryData.success === false) {
        setLoader(false);
        message.error(updateCategoryData.message);
      }
    } // eslint-disable-next-line
  }, [updateCategoryData, prevupdateCategoryData]);

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirmVisible(false);
    setCategoryToDelete(null);
  };

  const handleDeleteConfirm = () => {
    setLoader(true);

    setIsDeleteConfirmVisible(false);

    dispatch(
      deleteCategory({
        category_id: categoryToDelete.id,
        user_id: userData?.id,
      })
    );
  };

  const deleteCategoryData = useSelector(
    (state) => state.category.deleteCategoryData
  );
  const prevdeleteCategoryData = usePrevious({
    deleteCategoryData,
  });

  useEffect(() => {
    if (
      prevdeleteCategoryData &&
      prevdeleteCategoryData.deleteCategoryData !== deleteCategoryData
    ) {
      if (
        deleteCategoryData &&
        _.has(deleteCategoryData, "data") &&
        deleteCategoryData.success === true
      ) {
        message.success(deleteCategoryData.message);
        fetchAllCategories({
          sort_by: sortBy,
          order: sortOrder,
          skip: skip,
          filter_search: filterSearch,
        });
        setShowEditModal(false);
      }
      if (deleteCategoryData && deleteCategoryData.success === false) {
        setLoader(false);
        message.error(deleteCategoryData.message);
      }
    } // eslint-disable-next-line
  }, [deleteCategoryData, prevdeleteCategoryData]);

  return (
    <>
      <Container fluid className="manage-category">
        <Row className="mb-4">
          <Col>
            <h2>
              <AppstoreOutlined /> Manage Categories
            </h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <div className="d-flex gap-3">
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
              <Inputtext
                placeholder="Enter search category."
                name="name"
                value={filterSearch}
                label={null}
                handleOnChange={handleSearchValue}
              />
            </div>
          </Col>
          <Col md={6} className="text-md-end">
            <AddButton onClick={handleAddCategory} title="Add Category" />
          </Col>
        </Row>

        <Row>
          <Col>
            <CategoryList
              categoryList={categoryList}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
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
      <CategoryCreateModal
        modal_title="Add Category"
        modalOpen={showModal}
        handleClose={handleCloseModal}
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit(onSubmit)}
      />

      <CategoryCreateModal
        modal_title="Edit Category"
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
        content={`Are you sure you want to delete the catgeory "${categoryToDelete?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {loader && <Loader />}
    </>
  );
};

export default ManageCategory;
