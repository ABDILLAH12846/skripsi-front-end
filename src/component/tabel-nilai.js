"use client";

import React from 'react';

export function DataTableNilai({ data }) {
  const headers = ["Mata Pelajaran", "UTS", "UAS", "UHA", "TH"];

  const processedData = data.reduce((acc, item) => {
    let entry = acc.find(entry => entry.matapelajaran === item.nama_matapelajaran);

    if (!entry) {
      entry = {
        matapelajaran: item.nama_matapelajaran,
        UTS: '',
        UAS: '',
        UHA: '',
        TH: ''
      };
      acc.push(entry);
    }

    switch (item.tipe) {
      case 'UTS':
        entry.UTS = item.nilai;
        break;
      case 'UAS':
        entry.UAS = item.nilai;
        break;
      case 'UHA':
        entry.UHA = item.nilai;
        break;
      case 'TH':
        entry.TH = item.nilai;
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
                <td className="p-2 border">{item.matapelajaran}</td>
                <td className="p-2 border text-center">{formatValue(item.UTS)}</td>
                <td className="p-2 border text-center">{formatValue(item.UAS)}</td>
                <td className="p-2 border text-center">{formatValue(item.UHA)}</td>
                <td className="p-2 border text-center">{formatValue(item.TH)}</td>
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
