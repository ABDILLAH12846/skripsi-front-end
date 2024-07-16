"use client";

import React, { useState, useEffect } from 'react';
import { GlobalContext } from '@/app/layout';
import { css } from '@/utils/stitches.config';
import { MenuSelect } from '@/component/select';
import { DataTableNilai } from '@/component/tabel-nilai';

export default function NilaiSiswa() {
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
        const res = await fetch(`http://localhost:8000/nilai/${nisn}?no_kelas=${selectedKelas}&semester=${selectedSemester}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nisn, selectedKelas, selectedSemester]);

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Nilai Siswa</div>
      </div>
      <div className={styles.filterBox()}>
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
      <div className='m-4'>
        <div>{semesterLabel}</div>
        {loading ? <div>Loading...</div> : <DataTableNilai className={styles.tableContainer()} data={data} />}
      </div>
    </div>
  );
}

const styles = {
  header: css({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  }),
  title: css({
    width: "50%",
    borderBottom: "2px solid #FDD100",
    padding: "10px 0",
    fontWeight: "bold"
  }),
  tableContainer: css({
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  }),
  filterBox: css({
    display: "flex",
    gap: 20,
  })
};
