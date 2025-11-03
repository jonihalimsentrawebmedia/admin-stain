
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSearchParams } from "react-router-dom";

import type { ReactNode } from "react";
import SetLimitList from "./SetLimitList";
import Search from "./Search";
import TablePaginate from "./TablePagination";
interface Props {
  data: any;
  columns: any;
  className?: string;
  thClassName?: string;
  tdClassName?: string;
  isShowFilter?: boolean;
  isShowPagination?: boolean;
  tdFooterClassName?: string;
  isShowFooterTable?: boolean;
  addFilter?: ReactNode;
  addRowColumn?: ReactNode;
  classNameSearch?: string;
  placeHolderSearch?:string
}
const TableCustom = (props: Props) => {
  const {
    className,
    columns,
    data,
    tdClassName = "border",
    thClassName = "",
    isShowFilter = true,
    isShowPagination = true,
    tdFooterClassName,
    isShowFooterTable,
    addFilter,
    addRowColumn,
    classNameSearch = "rounded-lg",placeHolderSearch="Cari..."
  } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [, setSearchParams] = useSearchParams();
  const handleSearch = (query: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("search", query);
      newParams.set("page", "1"); // Reset ke halaman 1 saat search
      return newParams;
    });
  };

  return (
    <div className="flex flex-col w-full gap-4 ">
      {isShowFilter && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center  justify-between">
          <div
            className={`flex w-full items-center gap-4 ${
              addFilter ? "" : "justify-between"
            }`}
          >
            {addFilter}
            <Search
              onSearch={handleSearch}
              innerClassName={classNameSearch}
              className="rounded-lg w-full"
              position="start"
              placeholder={placeHolderSearch}
              
            />
          </div>
        </div>
      )}

      <Table className={`${className}  `}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  colSpan={header.colSpan}
                  key={header.id}
                  className={` border bg-[#F5FFFA] text-primary ${thClassName}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className={tdClassName + " text-[#3E3E3E]"}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {addRowColumn && addRowColumn}
        </TableBody>
        {isShowFooterTable && (
          <TableFooter>
            {table.getFooterGroups().map((footerGroup) => (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`border font-semibold ${tdFooterClassName}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableFooter>
        )}
      </Table>
      {isShowPagination && (
        <div className="flex gap-4 items-center justify-between">
          <div>
            <SetLimitList />
          </div>
          <TablePaginate length={10} />
        </div>
      )}
    </div>
  );
};

export default TableCustom;
