import React, { useEffect, useState } from "react";
import { CheckboxIcon } from "../atoms/Icon";

export const TableCheckbox = ({
  labelData,
  renderItems,
  rowData,
  setRowData,
}) => {
  const [allRowsChecked, setAllRowsChecked] = useState(false);

  const handleCheckboxAllChange = () => {
    const newIsCheckedAll = !allRowsChecked;
    setAllRowsChecked(newIsCheckedAll);

    // Cập nhật trạng thái của tất cả các hàng
    setRowData(
      rowData.map((item) => ({
        ...item,
        isChecked: newIsCheckedAll,
      }))
    );
  };

  useEffect(() => {
    // Kiểm tra xem tất cả các hàng có được chọn không
    const allRowsChecked = rowData.every((item) => item.isChecked);
    setAllRowsChecked(allRowsChecked);
  }, [rowData]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white font-[sans-serif]">
        <thead className="bg-slate-800 whitespace-nowrap">
          <tr>
            <th className="pl-6 w-8">
              <input
                id="checkbox"
                type="checkbox"
                className="hidden peer"
                checked={allRowsChecked}
                onChange={handleCheckboxAllChange}
              />
              <label
                htmlFor="checkbox"
                className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
              >
                <CheckboxIcon />
              </label>
            </th>
            {labelData.map((item, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-sm font-semibold text-white"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">{renderItems}</tbody>
      </table>
    </div>
  );
};
