import { images } from "../../theme";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableLocale } from "antd/es/table/interface";
import React from "react";

interface tableProps {
  data: any[];
  columns: ColumnsType<any>;
  onRowClick?: (record: any) => void;
  tablelocale? : TableLocale | undefined;
}

const CustomTable = ({ data, columns, onRowClick ,tablelocale}: tableProps) => {
  return (
    <Table
      size="large"
      scroll={{ x: "max-content" }}
      columns={columns}
      dataSource={data}
      rowKey={(record) => record?.id || record?.transactionID}
      locale={tablelocale ? tablelocale :undefined}
      className="!h-full"
      // pagination={false}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (onRowClick) {
              onRowClick(record);
            }
          },
        };
      }}
    />
  );
};

export default CustomTable;
