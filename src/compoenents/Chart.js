import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const TimeBasedChart = ({ data, chartType, timeFrame }) => {
  const ChartComponent = chartType === "line" ? LineChart : BarChart;
  const DataComponent = chartType === "line" ? Line : Bar;

  const formatXAxisTick = (value) => {
    if (timeFrame === "month" && typeof value === "number") {
      return monthNames[value - 1] || value;
    }
    return value;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ChartComponent data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" tickFormatter={formatXAxisTick} />
        <YAxis />
        <Tooltip labelFormatter={(label) => formatXAxisTick(label)} />
        <Legend />
        <DataComponent
          type="monotone"
          dataKey="total"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </ChartComponent>
    </ResponsiveContainer>
  );
};

export const CategoryPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="total"
          nameKey="category"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const AnnualChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const MonthlyChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    month: monthNames[item.month - 1],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
