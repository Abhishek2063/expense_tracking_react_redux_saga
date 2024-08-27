import React from 'react';
import { Pagination as AntPagination } from 'antd';

const Pagination = ({ current, total, pageSize, onChange }) => (
  <AntPagination
    current={current}
    total={total}
    pageSize={pageSize}
    onChange={onChange}
    showSizeChanger={false}
    showQuickJumper
  />
);

export default Pagination;