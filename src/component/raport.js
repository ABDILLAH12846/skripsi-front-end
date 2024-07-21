"use client";

import React from 'react';

export function DataTableRapor({ data }) {
  const totalUTS = data.reduce((acc, val) => acc + (val.UTS || 0), 0);

  return (
    <div className="w-full">
      <div className="rounded-md border mt-2 mb-2">
        <table className="w-full">
          <thead>
            <tr>
              <th rowSpan={3} className="p-2 border">matapelajaran</th>
              <th colSpan={8} className="p-2 border">penilaian</th>
              <th colSpan={3} rowSpan={2} className="p-2 border">PTS</th>
            </tr>
            <tr>
              <th colSpan={4} className="p-2 border">sumatif</th>
              <th colSpan={4} className="p-2 border">formatif</th>
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
              <th className="p-2 border">nilai</th>
              <th className="p-2 border">predikat</th>
              <th className="p-2 border">keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => (
              <tr key={index}>
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
            ))}
            <tr><td className="p-2 border text-center" colSpan={12}>Total Nilai</td></tr>
            <tr><td className="p-2 border text-center" colSpan={12}>{totalUTS}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
