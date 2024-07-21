"use client";

import React, { useState, useEffect } from 'react';
import { DataTableRapor } from '@/component/raport';
import { MenuSelect } from '@/component/select';
import { GlobalContext } from '@/app/layout';
import { DataTableDemo } from '@/component/table';

const formatValue = (value) => {
    return value === null || value === 0 ? "-" : value;
};

export default function RaportSiswa() {
    const { user } = React.useContext(GlobalContext);

    if (!user) {
        return <div>Loading...</div>;
    }

    const { nisn } = user.user;

    const [data, setData] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("ganjil");
    const [semesterLabel] = useState("Semester Ganjil");
    const [selectedKelas, setSelectedKelas] = useState("10");
    const [kelasLabel] = useState("Kelas X");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dataSemester = [
        { value: "ganjil", title: "Semester Ganjil" },
        { value: "genap", title: "Semester Genap" },
    ];

    const dataKelas = [
        { value: "10", title: "Kelas X" },
        { value: "11", title: "Kelas XI" },
        { value: "12", title: "Kelas XII" },
    ];

    const handleSemesterChange = (selectedOption) => {
        setSelectedSemester(selectedOption);
    };

    const handleKelasChange = (selectedOption) => {
        setSelectedKelas(selectedOption);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:8000/raport/${nisn}?semester=${selectedSemester}&no_kelas=${selectedKelas}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                if (data.message === 'No available data') {
                    setError('No available data');
                } else {
                    setData(data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nisn, selectedSemester, selectedKelas]);

    const headers = ["Mata Pelajaran", "Nilai Akhir", "Capaian Kompetensi"];

    const processedData = data.length > 0 ? data.reduce((acc, item) => {
        const existingEntry = acc.find(entry => entry["Mata Pelajaran"] === item.nama_matapelajaran);

        if (existingEntry) {
            existingEntry["Nilai Akhir"] = formatValue(item.UAS);
            existingEntry["Capaian Kompetensi"] = formatValue(item.capaian_kompetensi);
        } else {
            acc.push({
                "Mata Pelajaran": item.nama_matapelajaran,
                "Nilai Akhir": formatValue(item.UAS),
                "Capaian Kompetensi": formatValue(item.capaian_kompetensi),
            });
        }

        return acc;
    }, []) : [];

    return (
        <div>
            <div className="flex gap-5 mb-4">
                <MenuSelect
                    label={kelasLabel}
                    data={dataKelas}
                    onChange={handleKelasChange}
                />
                <MenuSelect
                    label={semesterLabel}
                    data={dataSemester}
                    onChange={handleSemesterChange}
                />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <DataTableRapor data={data} />
                    <DataTableDemo data={processedData} header={headers} />
                    {data.length > 0 && (
                        <div className='flex gap-5 mt-4'>
                            <table className='border'>
                                <tbody>
                                    <tr>
                                        <th className='p-2 border'>Hadir</th>
                                        <td className='p-2 border text-center'>{formatValue(data[0].hadir)}</td>
                                    </tr>
                                    <tr>
                                        <th className='p-2 border'>Sakit</th>
                                        <td className='p-2 border text-center'>{formatValue(data[0].sakit)}</td>
                                    </tr>
                                    <tr>
                                        <th className='p-2 border'>Tanpa Keterangan</th>
                                        <td className='p-2 border text-center'>{formatValue(data[0].absen)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
