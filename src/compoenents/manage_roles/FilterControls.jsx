import React from "react";
import { Select } from "antd";

const { Option } = Select;

const FilterControls = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
  sortByOptions,
  sortOrderOptions,
}) => (
  <div className="d-flex gap-3">
    <Select
      defaultValue={sortBy}
      style={{ width: "100%" }}
      onSelect={(value) => onSortByChange(value)}
    >
      {sortByOptions.map((data) => (
        <Option value={data?.value} key={data?.value}>
          {data?.name}
        </Option>
      ))}
    </Select>
    <Select
      defaultValue={sortOrder}
      style={{ width: "100%" }}
      onSelect={(value) => onSortOrderChange(value)}
    >
      {sortOrderOptions.map((data) => (
        <Option value={data?.value} key={data?.value}>
          {data?.name}
        </Option>
      ))}
    </Select>
  </div>
);

export default FilterControls;
