"use client";

import React from 'react';

export function DataTableHafalan({ data }) {
  const headers = ["Bulan", "Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];

  const processedData = data.reduce((acc, item) => {
    let entry = acc.find(entry => entry.bulan === item.bulan);

    if (!entry) {
      entry = {
        bulan: item.bulan,
        Minggu1: '',
        Minggu2: '',
        Minggu3: '',
        Minggu4: ''
      };
      acc.push(entry);
    }

    switch (item.minggu) {
      case '1':
        entry.Minggu1 = item.hafalan;
        break;
      case '2':
        entry.Minggu2 = item.hafalan;
        break;
      case '3':
        entry.Minggu3 = item.hafalan;
        break;
      case '4':
        entry.Minggu4 = item.hafalan;
        break;
      default:
        break;
    }

    return acc;
  }, []);

  const formatValue = (value) => {
    return value === null || value === 0 ? "-" : value;
  };

  return (
    <div className='w-full rounded-md border m-2'>
      <table className='w-full'>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-2 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processedData.length > 0 ? (
            processedData.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border text-center">{item.bulan}</td>
                <td className="p-2 border text-center">{formatValue(item.Minggu1)}</td>
                <td className="p-2 border text-center">{formatValue(item.Minggu2)}</td>
                <td className="p-2 border text-center">{formatValue(item.Minggu3)}</td>
                <td className="p-2 border text-center">{formatValue(item.Minggu4)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="p-2 border text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
