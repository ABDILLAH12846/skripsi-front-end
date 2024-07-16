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
            try {
                const res = await fetch(`http://localhost:8000/raport/${nisn}?semester=${selectedSemester}&no_kelas=${selectedKelas}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nisn, selectedSemester, selectedKelas]);

    const headers = ["Mata Pelajaran", "Nilai Akhir", "Capaian Kompetensi"];

    const processedData = data.reduce((acc, item) => {
        let entry = acc.find(entry => entry.matapelajaran === item.nama_matapelajaran);
    
        if (!entry) {
            entry = {
                "Mata Pelajaran": item.nama_matapelajaran,
                "Nilai Akhir": formatValue(item.UAS),
                "Capaian Kompetensi": formatValue(item.capaian_kompetensi),
            };
            acc.push(entry);
        }
    
        return acc;
    }, []);

    return (
        <div>
            <div className="flex gap-5 p-4">
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
            {loading ? <div>Loading...</div> : <DataTableRapor data={data} />}
            {loading ? <div>Loading...</div> : <DataTableDemo  data={processedData} header={headers} routing={(row) => console.log(row)} />}
        </div>
    );
}
