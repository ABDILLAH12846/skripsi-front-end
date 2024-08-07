"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { GlobalContext } from '@/app/layout';
import { css } from '@/utils/stitches.config';
import { MenuSelect } from '@/component/select';
import { DataTableNilai } from '@/component/tabel-nilai';

export default function NilaiSiswa() {
  const { user } = React.useContext(GlobalContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { nisn, no_kelas } = user.user; // Assuming no_kelas is the maximum class the user can select

  const [data, setData] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("ganjil");
  const [selectedKelas, setSelectedKelas] = useState("10");
  const [loading, setLoading] = useState(true);

  const dataSemester = [
    { value: "ganjil", title: "Semester Ganjil" },
    { value: "genap", title: "Semester Genap" },
  ];

  const determineKelasOptions = (userKelas) => {
    const options = [];
    for (let i = 10; i <= userKelas; i++) {
      options.push({ title: `Kelas ${i}`, value: i.toString() });
    }
    return options;
  }

  const dataKelas = determineKelasOptions(no_kelas);

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
          label={dataKelas.find(kelas => kelas.value === selectedKelas)?.title || "Pilih Kelas"}
          data={dataKelas}
          onChange={handleKelasChange}
        />
        <MenuSelect
          label={dataSemester.find(semester => semester.value === selectedSemester)?.title || "Pilih Semester"}
          data={dataSemester}
          onChange={handleSemesterChange}
        />
      </div>
      <div className='m-4'>
        <div>{dataSemester.find(semester => semester.value === selectedSemester)?.title}</div>
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
