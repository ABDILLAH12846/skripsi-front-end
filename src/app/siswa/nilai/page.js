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
  const [semesterLabel, setSemesterLabel] = useState("Semester Ganjil");
  const [loading, setLoading] = useState(true);

  const dataSemester = [
    { value: "ganjil", title: "Semester Ganjil" },
    { value: "genap", title: "Semester Genap" },
  ];

  const handleSemesterChange = (selectedOption) => {
    setSelectedSemester(selectedOption);
    const selectedLabel = dataSemester.find(item => item.value === selectedOption)?.title;
    setSemesterLabel(selectedLabel || "Semester Ganjil");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/nilai/${nisn}?semester=${selectedSemester}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setData(data);
    };

    fetchData();
  }, [nisn, selectedSemester]);

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Hafalan Siswa</div>
      </div>
      <div className={styles.filterBox()}>
        <MenuSelect
          label={semesterLabel}
          data={dataSemester}
          onChange={handleSemesterChange}
        />
      </div>
      <div className='m-4'>
        <div>{semesterLabel}</div>
        {data ?<DataTableNilai className={styles.tableContainer()} data={data} />: null}
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
