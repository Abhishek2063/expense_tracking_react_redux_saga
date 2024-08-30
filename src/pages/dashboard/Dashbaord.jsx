import React, { useEffect, useState } from "react";
import Loader from "../../compoenents/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../storage/user";
import {
  getAnnualChart,
  getCategoryWiseChart,
  getMonthlyChart,
  getTimeBasedChart,
} from "../../redux/expenses/expenses.action";
import { usePrevious } from "../../utils/custom_validation";
import _ from "lodash";
import { Col, Row, Select, message } from "antd";
import { Container } from "react-bootstrap";
import { DashboardOutlined } from "@ant-design/icons";
import "../../assests/css/dashboard.css";
import {
  AnnualChart,
  CategoryPieChart,
  MonthlyChart,
  TimeBasedChart,
} from "../../compoenents/Chart";

const { Option } = Select;

const Dashbaord = () => {
  const dispatch = useDispatch();
  const userData = getUserDetails();
  const [loader, setLoader] = useState(false);
  const [getCategoryWiseChartDataState, setGetCategoryWiseChartDataState] =
    useState([]);
  const [getTimeBasedChartDataState, setGetTimeBasedChartDataState] = useState(
    []
  );
  const [getAnnualChartDataState, setGetAnnualChartDataState] = useState([]);
  const [getMonthlyChartDataState, setGetMonthlyChartDataState] = useState([]);
  const [timeChartType, setTimeChartType] = useState("line");
  const [timeFrame, setTimeFrame] = useState("date");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchGetCategoryWiseChart = async () => {
    setLoader(true);
    dispatch(getCategoryWiseChart({ user_id: userData?.id }));
  };

  const fetchGetTimeBasedChart = async () => {
    setLoader(true);
    dispatch(
      getTimeBasedChart({ user_id: userData?.id, timeframe: timeFrame })
    );
  };

  const fetchGetAnnualChart = async () => {
    setLoader(true);
    dispatch(getAnnualChart({ user_id: userData?.id }));
  };

  const fetchGetMonthlyChart = async () => {
    setLoader(true);
    dispatch(getMonthlyChart({ user_id: userData?.id, year: selectedYear }));
  };

  useEffect(() => {
    fetchGetCategoryWiseChart();
    fetchGetTimeBasedChart();
    fetchGetAnnualChart();
    fetchGetMonthlyChart();

    // eslint-disable-next-line
  }, []);

  const getCategoryWiseChartData = useSelector(
    (state) => state.expense.getCategoryWiseChartData
  );
  const prevgetCategoryWiseChartData = usePrevious({
    getCategoryWiseChartData,
  });

  useEffect(() => {
    if (
      prevgetCategoryWiseChartData &&
      prevgetCategoryWiseChartData.getCategoryWiseChartData !==
        getCategoryWiseChartData
    ) {
      if (
        getCategoryWiseChartData &&
        _.has(getCategoryWiseChartData, "data") &&
        getCategoryWiseChartData.success === true
      ) {
        message.success(getCategoryWiseChartData.message);
        setGetCategoryWiseChartDataState(getCategoryWiseChartData?.data);
        setLoader(false);
      }
      if (
        getCategoryWiseChartData &&
        getCategoryWiseChartData.success === false
      ) {
        setLoader(false);
        message.error(getCategoryWiseChartData.message);
      }
    }
  }, [getCategoryWiseChartData, prevgetCategoryWiseChartData]);

  const getTimeBasedChartData = useSelector(
    (state) => state.expense.getTimeBasedChartData
  );
  const prevgetTimeBasedChartData = usePrevious({ getTimeBasedChartData });

  useEffect(() => {
    if (
      prevgetTimeBasedChartData &&
      prevgetTimeBasedChartData.getTimeBasedChartData !== getTimeBasedChartData
    ) {
      if (
        getTimeBasedChartData &&
        _.has(getTimeBasedChartData, "data") &&
        getTimeBasedChartData.success === true
      ) {
        message.success(getTimeBasedChartData.message);
        setGetTimeBasedChartDataState(getTimeBasedChartData?.data);
        setLoader(false);
      }
      if (getTimeBasedChartData && getTimeBasedChartData.success === false) {
        setLoader(false);
        message.error(getTimeBasedChartData.message);
      }
    }
  }, [getTimeBasedChartData, prevgetTimeBasedChartData]);

  const getAnnualChartData = useSelector(
    (state) => state.expense.getAnnualChartData
  );
  const prevgetAnnualChartData = usePrevious({ getAnnualChartData });
  useEffect(() => {
    if (
      prevgetAnnualChartData &&
      prevgetAnnualChartData.getAnnualChartData !== getAnnualChartData
    ) {
      if (
        getAnnualChartData &&
        _.has(getAnnualChartData, "data") &&
        getAnnualChartData.success === true
      ) {
        setGetAnnualChartDataState(getAnnualChartData?.data);
        message.success(getAnnualChartData.message);
        setLoader(false);
      }
      if (getAnnualChartData && getAnnualChartData.success === false) {
        setLoader(false);

        message.error(getAnnualChartData.message);
      }
    }
  }, [getAnnualChartData, prevgetAnnualChartData]);

  const getMonthlyChartData = useSelector(
    (state) => state.expense.getMonthlyChartData
  );
  const prevgetMonthlyChartData = usePrevious({ getMonthlyChartData });

  useEffect(() => {
    if (
      prevgetMonthlyChartData &&
      prevgetMonthlyChartData.getMonthlyChartData !== getMonthlyChartData
    ) {
      if (
        getMonthlyChartData &&
        _.has(getMonthlyChartData, "data") &&
        getMonthlyChartData.success === true
      ) {
        message.success(getMonthlyChartData.message);
        setGetMonthlyChartDataState(getMonthlyChartData?.data);
        setLoader(false);
      }
      if (getMonthlyChartData && getMonthlyChartData.success === false) {
        setLoader(false);
        message.error(getMonthlyChartData.message);
      }
    }
  }, [getMonthlyChartData, prevgetMonthlyChartData]);

  const handleTimeChartTypeChange = (value) => {
    setTimeChartType(value);
  };

  const handleTimeFrameChange = (value) => {
    setTimeFrame(value);
    dispatch(getTimeBasedChart({ user_id: userData?.id, time_frame: value }));
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    dispatch(getMonthlyChart({ user_id: userData?.id, year: value }));
  };

  return (
    <>
      <Container fluid className="manage-dashboard">
        <Row className="mb-4">
          <Col>
            <h2>
              <DashboardOutlined />
              Dashboard
            </h2>
          </Col>
        </Row>

        <div className="chart-container">
          <h2>Time-Based Expenses</h2>
          <div className="chart-controls">
            <Select
              value={timeChartType}
              onChange={handleTimeChartTypeChange}
              style={{ width: 120, marginRight: 16 }}
            >
              <Option value="line">Line Chart</Option>
              <Option value="bar">Bar Chart</Option>
            </Select>
            <Select
              value={timeFrame}
              onChange={handleTimeFrameChange}
              style={{ width: 120 }}
            >
              <Option value="date">Daily</Option>
              <Option value="month">Monthly</Option>
              <Option value="year">Yearly</Option>
            </Select>
          </div>
          <TimeBasedChart
            data={getTimeBasedChartDataState}
            chartType={timeChartType}
            timeFrame={timeFrame}
          />
        </div>

        <div className="chart-container">
          <h2>Category-Wise Expenses</h2>
          <CategoryPieChart data={getCategoryWiseChartDataState} />
        </div>

        <div className="chart-container">
          <h2>Annual Expenses</h2>
          <AnnualChart data={getAnnualChartDataState} />
        </div>

        <div className="chart-container">
          <h2>Monthly Expenses</h2>
          <div className="chart-controls">
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              style={{ width: 120 }}
            >
              {getAnnualChartDataState.map((item) => (
                <Option key={item.year} value={item.year}>
                  {item.year}
                </Option>
              ))}
            </Select>
          </div>
          <MonthlyChart data={getMonthlyChartDataState} />
        </div>
      </Container>
      {loader && <Loader />}
    </>
  );
};

export default Dashbaord;
