"use client";

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

export function DataTableRapor({data}) {
  console.log({ii : data})

  return (
    <div className="w-full">
      <div className="rounded-md border m-2">
        <table className="w-full">
          <thead>
            <tr>
              <th rowSpan={3} className="p-2 border">
                matapelajaran
              </th>
              <th colSpan={8} className="p-2 border">
                penilaian
              </th>
              <th colSpan={3} rowSpan={2} className="p-2 border">
                PTS
              </th>
            </tr>
            <tr>
              <th colSpan={4} className="p-2 border">
                sumatif
              </th>
              <th colSpan={4} className="p-2 border">
                formatif
              </th>
            </tr>
            <tr>
              <th className="p-2 border">1</th>
              <th className="p-2 border">2</th>
              <th className="p-2 border">3</th>
              <th className="p-2 border">4</th>
              <th className="p-2 border">1</th>
              <th className="p-2 border">2</th>
              <th className="p-2 border">3</th>
              <th className="p-2 border">4</th>
              <th className="p-2 border">
                nilai
              </th>
              <th className="p-2 border">
                predikat
              </th>
              <th className="p-2 border">
                keteragan
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-2 border-b">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )} */}
            {
              data.map((val) => (
                <tr>
              <td className="p-2 border">{val.nama_matapelajaran}</td>
              <td className="p-2 border">{val.UHA}</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">{val.TH}</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">-</td>
              <td className="p-2 border">{val.UTS}</td>
              <td className="p-2 border">{val.predikat}</td>
              <td className="p-2 border">{val.keterangan}</td>
            </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}