import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { message } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import "../../assests/css/manage_module.css";
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from "../../utils/custom_validation";
import Loader from "../../compoenents/Loader";
import _ from "lodash";
import { getRole } from "../../redux/role/role.action";
import FilterControls from "../../compoenents/manage_roles/FilterControls";
import AddRoleButton from "../../compoenents/manage_roles/AddRoleButton";
import RoleList from "../../compoenents/manage_roles/RoleList";
import Pagination from "../../compoenents/Pagination";

const SortByFilterDropdown = [
  { name: "Latest", value: "created_at" },
  { name: "Name", value: "name" },
];

const SortOrderFilterDropdown = [
  { name: "Asc", value: "asc" },
  { name: "Desc", value: "desc" },
];

const ManageRole = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [totalRecords, setTotalRecords] = useState(0);

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
    // Implement add role functionality
  };

  const handleEditRole = (role) => {
    // Implement edit role functionality
  };

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
            <AddRoleButton onClick={handleAddRole} />
          </Col>
        </Row>

        <Row>
          <Col>
            <RoleList roleList={roleList} onEdit={handleEditRole} />
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
      {loader && <Loader />}
    </>
  );
};

export default ManageRole;
