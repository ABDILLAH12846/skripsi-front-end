"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const dataBaru = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
]

export function TableSemesterDemo({ data, routing, title }) {

    const columnHelper = createColumnHelper();

    const columns = React.useMemo(() => {
        const mataPelajaran = Object.keys(data[0]).filter((item) => item === "mataPelajaran")
        return [
            ...Object.keys(data[0]).filter((item) => item === "mataPelajaran").map((item) => (
                {
                    accessorKey: item,
                    header: item,
                    cell: ({ row }) => (
                        <div className="capitalize w-96">{row.getValue(item)}</div>
                    ),
                }
            )),
            columnHelper.group({
                id: "nilai",
                header: () => <div style={{ width: "300px" }}>Nilai</div>,
                columns: Object.keys(data[0]).filter((item) => item !== "mataPelajaran" && item !== "id").map((item) => (
                    {
                        accessorKey: item,
                        header: () => <div style={{ width: item === "angka" ? 100 : 300, backgroundColor: "ActiveBorder" }}>"{item}"</div>,
                        cell: ({ row }) => (
                            <>
                            {console.log({row: row.getValue(item)})}
                                <div style={{ width: item === "angka" ? 100 : 300, backgroundColor: "ActiveBorder", position: "absolute" }}>{row.getValue(item)}</div>
                            </>
                        ),
                    }
                ))
            })
        ]
    })

    console.log({ columns })

    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        defaultColumn: {
            size: 200,
            maxSize: 300,
        }
    })

    return (
        <div className="w-full">
            <div >
                <table style={{ width: "100%" }}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id} style={{ width: 100, backgroundColor: "ThreeDFace" }}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => routing(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} style={{ width: 100, backgroundColor: "ThreeDFace" }}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
