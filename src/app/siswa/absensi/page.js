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
  const { nisn, no_kelas } = user.user;
  const [data, setData] = useState([]);
  const [year, setYear] = useState('');
  const [selectedKelas, setSelectedKelas] = useState("10");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/siswa/absensi/${nisn}?no_kelas=${selectedKelas}`);
        const fetchedData = await res.json();

        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setYear(fetchedData[0].year);
          setData(fetchedData);
        } else {
          setYear('');
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

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

  const kelasLabel = kelasOptions.find(kelas => kelas.value === selectedKelas)?.title || "Pilih Kelas";

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Absensi</div>
      </div>
      <div className='flex justify-between'>
        <MenuSelect
          label={kelasLabel}
          data={kelasOptions}
          onChange={handleKelasChange}
          value={selectedKelas}
        />
        <div className={styles.paletteContainer()}>
          <div className={styles.paletteBox({ status: 'hadir' })}>Hadir</div>
          <div className={styles.paletteBox({ status: 'absen' })}>Absen</div>
          <div className={styles.paletteBox({ status: 'sakit' })}>Sakit</div>
        </div>
      </div>
      <AbsensiTable data={data} currentDate={year} />
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
  paletteContainer: css({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }),
  paletteBox: css({
    width: "50px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "5px",
    color: "#fff",
    variants: {
      status: {
        hadir: { backgroundColor: "#489858" }, // Green for hadir
        absen: { backgroundColor: "red" }, // Red for absen
        sakit: { backgroundColor: "yellow", color: "#000" }, // Yellow for sakit
      },
    },
  }),
};
