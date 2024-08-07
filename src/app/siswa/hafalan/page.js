"use client";

import { GlobalContext } from '@/app/layout';
import { css } from '@/utils/stitches.config';
import React, { useState, useEffect } from 'react';
import { MenuSelect } from '@/component/select';
import { DataTableHafalan } from '@/component/tabel-hafalan';

export default function HafalanSiswa() {
  const { user } = React.useContext(GlobalContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { nisn, no_kelas } = user.user; // Assuming no_kelas is the maximum class the user can select

  const [selectedKelas, setSelectedKelas] = useState("10");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/siswa/hafalan/${nisn}?no_kelas=${selectedKelas}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nisn, selectedKelas]);

  const determineKelasOptions = (userKelas) => {
    const options = [];
    for (let i = 10; i <= userKelas; i++) {
      options.push({ title: `Kelas ${i}`, value: i.toString() });
    }
    return options;
  }

  const kelasOptions = determineKelasOptions(no_kelas);

  const handleKelasChange = (selectedOption) => {
    setSelectedKelas(selectedOption);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Hafalan Siswa</div>
      </div>
      <div className={styles.filterBox}>
        <MenuSelect 
          data={kelasOptions} 
          label={kelasOptions.find(kelas => kelas.value === selectedKelas)?.title || "Pilih Kelas"} 
          onChange={handleKelasChange} 
          value={selectedKelas} // Ensure the selected value is shown
        />
      </div>
      <div className={styles.tableContainer()}>
        {
          data ? <DataTableHafalan data={data}/> : null
        }
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
    marginBottom: "20px",
  }),
  title: css({
    width: "50%",
    borderBottom: "2px solid #FDD100",
    padding: "10px 0",
    fontWeight: "bold",
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
