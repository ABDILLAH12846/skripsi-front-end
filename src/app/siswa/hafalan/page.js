"use client";

import { GlobalContext } from '@/app/layout';
import { css } from '@/utils/stitches.config';
import React, { useState, useEffect, useMemo } from 'react';
import { MenuSelect } from '@/component/select';
import { DataTableHafalan } from '@/component/tabel-hafalan';

export default function HafalanSiswa() {
  const { user } = React.useContext(GlobalContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { nisn } = user.user;

  const [selectedKelas, setSelectedKelas] = useState("10");
  const [kelasLabel, setKelasLabel] = useState("Kelas X");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dataKelas = [
    { value: "10", title: "Kelas X" },
    { value: "11", title: "Kelas XI" },
    { value: "12", title: "Kelas XII" },
  ];

  const transformData = (hafalanData) => {
    return hafalanData.map(entry => {
      return {
        bulan: entry.bulan,
        minggu1: entry.minggu[0].hafalan,
        minggu2: entry.minggu[1].hafalan,
        minggu3: entry.minggu[2].hafalan,
        minggu4: entry.minggu[3].hafalan,
      };
    });
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/hafalan/siswa/${nisn}?no_kelas=${selectedKelas}&bulan=${1}`);
        const result = await res.json();
        setData(transformData(result.hafalan));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [nisn, selectedKelas]);

  const handleKelasChange = (selectedOption) => {
    setSelectedKelas(selectedOption);
  };

  const header = useMemo(() => [
    "bulan",
    "minggu1",
    "minggu2",
    "minggu3",
    "minggu4"
  ], []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Hafalan Siswa</div>
      </div>
      <div className={styles.filterBox}>
        <MenuSelect data={dataKelas} label={kelasLabel} onChange={handleKelasChange} />
      </div>
      <div className={styles.tableContainer()}>
        {
          data ? <DataTableHafalan data={data} header={header} /> : null
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
