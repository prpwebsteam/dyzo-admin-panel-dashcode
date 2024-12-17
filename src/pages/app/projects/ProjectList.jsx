import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import GlobalFilter from "@/pages/table/react-tables/GlobalFilter";

const ProjectList = ({ companies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = { day: '2-digit', month: 'short', year: '2-digit' };

  const COLUMNS = [
    {
      Header: "Company Name",
      accessor: "company_name", // Map to company_name
      Cell: (row) => {
        return (
          <div className="flex space-x-3 items-center text-left rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]">
                {row?.cell?.value.charAt(0)}
              </div>
            </div>
            <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
              {row?.cell?.value.length > 20
                ? row?.cell?.value.substring(0, 20) + "..."
                : row?.cell?.value}
            </div>
          </div>
        );
      },
    },
    {
      Header: "Admin",
      accessor: "isSuperAdmin_employee[0].name"
    },
    {
      Header: "Contact",
      accessor: "isSuperAdmin_employee[0].email", // Map to created_at

    },
    {
      Header: "Created At",
      accessor: "created_at", // Map to created_at
      Cell: (row) => {
        return <span>{new Date(row?.cell?.value).toLocaleDateString('en-IN', options).split(" ").join(",")}</span>;
      },
    },
    {
      Header: "Total Employees",
      accessor: "total_employees", // Map to total_employees
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    // {
    //   Header: "Active Employees",
    //   accessor: "active_employees", // Map to active_employees
    //   Cell: (row) => {
    //     return <span>{row?.cell?.value}</span>;
    //   },
    // },
    // {
    //   Header: "Inactive Employees",
    //   accessor: "inactive_employees", // Map to inactive_employees
    //   Cell: (row) => {
    //     return <span>{row?.cell?.value}</span>;
    //   },
    // },
    {
      Header: "Status",
      accessor: "isActive", // Map to isActive
      Cell: (row) => {
        return (
          <span className={`inline-block px-3 py-1 rounded-full ${row?.cell?.value ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {row?.cell?.value ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      Header: "Action",
      accessor: "action", // Placeholder for action column
      Cell: (row) => {
        return (
          <div>

            <div className=" flex  dark:divide-slate-800">
              {actions.map((item, i) => (
                <div
                  key={i}
                  onClick={() =>
                    item.doit(row?.row?.original)
                  }
                >
                  <div className={`w-full  border-opacity-10 px-2 py-2 text-sm`}>
                    <span className="text-base cursor-pointer">
                      <Icon icon={item.icon} />
                    </span>

                  </div>
                </div>
              ))}
            </div>

          </div>
        );
      },
    },
  ];

  const actions = [
    {
      name: "view",
      icon: "heroicons-outline:eye",
      doit: (item) =>
        navigate(`/companies/companydetail/${item._id}`)
      ,
    },
    {
      name: "edit",
      icon: "heroicons:pencil-square",
      doit: (item) => dispatch(updateProject(item)),
    },
    // {
    //   name: "delete",
    //   icon: "heroicons-outline:trash",
    //   doit: (item) => dispatch(removeProject(item._id)),
    // },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => companies, [companies]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Company List</h4>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className="bg-slate-100 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className="table-th"
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} onClick={() =>navigate(`/companies/companydetail/${row.cells[0].row.original._id}`)} className="even:bg-slate-100 dark:even:bg-slate-700 cursor-pointer">
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="table-td">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="flex space-x-2 rtl:space-x-reverse items-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Go</span>
              <span>
                <input
                  type="number"
                  className="form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page <span>{pageIndex + 1} of {pageOptions.length}</span>
            </span>
          </div>
          <ul className="flex items-center space-x-3 rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {/* {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  className={`${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600 dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:text-slate-400 text-slate-900 font-normal "
                  } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))} */}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default ProjectList;
