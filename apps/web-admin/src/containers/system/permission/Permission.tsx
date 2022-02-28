import { PageHeader, Table } from 'antd';
import { columns, data } from './config';

const rowSelection = {
  // onChange: (selectedRowKeys, selectedRows) => {
  //   console.log(
  //     `selectedRowKeys: ${selectedRowKeys}`,
  //     'selectedRows: ',
  //     selectedRows,
  //   );
  // },
  // onSelect: (record, selected, selectedRows) => {
  //   console.log(record, selected, selectedRows);
  // },
  // onSelectAll: (selected, selectedRows, changeRows) => {
  //   console.log(selected, selectedRows, changeRows);
  // },
};

export default function Permission() {
  return (
    <PageHeader title="menu.system">
      <Table
        pagination={false}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
      />
    </PageHeader>
  );
}
