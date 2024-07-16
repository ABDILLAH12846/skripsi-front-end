"use client";

import { GlobalContext } from '@/app/layout';
import { AbsensiTable } from '@/component/absensi';
import { MenuSelect } from '@/component/select';
import { css } from '@/utils/stitches.config';
import React, { useState, useEffect } from 'react';


export default function Absensi({ params }) {
  const { user } = React.useContext(GlobalContext);
  if (!user) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();
  const { nisn } = user.user;
  const [data, setData] = useState([]);
  const [tahunAjaran, setTahunAjaran] = useState('');
  const [selectedKelas, setSelectedKelas] = useState("10");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/siswa/absensi/${nisn}?no_kelas=${selectedKelas}`);
        const fetchedData = await res.json();
        
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setTahunAjaran(fetchedData[0].tahun_ajaran.slice(0, 4));
          setData(fetchedData);
        } else {
          setTahunAjaran('');
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [nisn, selectedKelas]);

  const dataKelas = [
    { value: "10", title: "Kelas X" },
    { value: "11", title: "Kelas XI" },
    { value: "12", title: "Kelas XII" },
  ];

  const handleKelasChange = (selectedOption) => {
    setSelectedKelas(selectedOption);
  };

  // Update the label based on selectedKelas
  const kelasLabel = dataKelas.find(kelas => kelas.value === selectedKelas)?.title || "Pilih Kelas";

  // Check if there's no data or no valid tahunAjaran
  const noData = data.length === 0 || !tahunAjaran;

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Absensi</div>
      </div>
      <MenuSelect
        label={kelasLabel}
        data={dataKelas}
        onChange={handleKelasChange}
        value={selectedKelas} // Ensure the selected value is shown
      />
      <AbsensiTable data={data} currentDate={currentDate} />
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
};
