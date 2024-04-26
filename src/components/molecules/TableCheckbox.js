import React, { useState } from "react";
import { CheckboxIcon } from "../atoms/Icon";

function TableRow({ name, email, role, joinedAt }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <tr className={isChecked ? "bg-blue-50" : ""}>
      <td className="pl-6 w-8">
        <input
          id="checkbox"
          type="checkbox"
          class="hidden peer"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label
          for="checkbox"
          class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
        >
          <CheckboxIcon />
        </label>
      </td>
      <td className="px-6 py-4 text-sm">{name}</td>
      <td className="px-6 py-4 text-sm">{email}</td>
      <td className="px-6 py-4 text-sm">{role}</td>
      <td className="px-6 py-4 text-sm">{joinedAt}</td>
    </tr>
  );
}

export const TableCheckbox = () => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const handleCheckboxAllChange = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white font-[sans-serif]">
        <thead className="bg-slate-800 whitespace-nowrap">
          <tr>
            <th class="pl-6 w-8">
              <input
                id="checkbox"
                type="checkbox"
                class="hidden peer"
                checked={isCheckedAll}
                onChange={handleCheckboxAllChange}
              />
              <label
                for="checkbox"
                class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
              >
                <CheckboxIcon />
              </label>
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
              Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
              Joined At
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">
              Actions
            </th>
          </tr>
        </thead>
          <tbody className="whitespace-nowrap">
            <TableRow
              key={1}
              name="John Doe"
              email="john@example.com"
              role="Admin"
              joinedAt="2022-05-15"
            />
            <TableRow
              key={2}
              name="Jane Doe"
              email="jane@example.com"
              role="User"
              joinedAt="2022-05-16"
            />
        </tbody>
      </table>
    </div>
  );
};
