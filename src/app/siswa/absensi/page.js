"use client"

import { GlobalContext } from '@/app/layout'
import { MenuSelect } from '@/component/select'
import { css } from '@/utils/stitches.config'
import React from 'react'

export default function Absensi({ params }) {
  const { user } = React.useContext(GlobalContext);
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const year = new Date().getFullYear();
  const { nisn } = user.user;
  const [data, setData] = React.useState({});
  console.log({ data })
  
  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/siswa/absensi/${nisn}`);
        const data = await res.json();
        console.log({cobal : data})
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [nisn]);

  const dataKelas = [
    { value: "X", title: "Kelas X" },
    { value: "XI", title: "Kelas XI" },
    { value: "XII", title: "Kelas XII" },
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDays = (month, year, absences = []) => {
    const days = [];
    const daysInMonth = getDaysInMonth(month, year);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dateStr = date.toISOString().split('T')[0];
      let status;
      if (date.getDay() === 0) { 
        console.log({nol: date.getDay()})
        status = "sunday";
      } else {
        console.log({bukannol: date.getDay(), absences})
        const absence = absences.find(a => a.tanggal === dateStr);
        status = absence ? absence.status : "hadir";
      }
      days.push({ day, date: dateStr, status });
    }
    return days;
  };

  const dataAbsensi = [
    { nama: "Juli", days: generateDays(7, year, data) },
    { nama: "Agustus", days: generateDays(8, year, data) },
    { nama: "September", days: generateDays(9, year, data) },
    { nama: "Oktober", days: generateDays(10, year, data) },
    { nama: "November", days: generateDays(11, year, data) },
    { nama: "Desember", days: generateDays(12, year, data) },
    { nama: "Januari", days: generateDays(1, year, data) },
    { nama: "Februari", days: generateDays(2, year, data) },
    { nama: "Maret", days: generateDays(3, year, data) },
    { nama: "April", days: generateDays(4, year, data) },
    { nama: "May", days: generateDays(5, year, data) },
    { nama: "Juni", days: generateDays(6, year, data) },
  ];

  const onChange = (val) => {
    console.log({ val })
  }

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Absensi</div>
      </div>
      <MenuSelect data={dataKelas} label={"Pilih kelas"} onChange={onChange} />
      <div className={styles.content()}>
        {
          dataAbsensi.map((item, monthIndex) => (
            <div key={monthIndex} className={styles.listContent()}>
              <div className={styles.listMonth()}>{item?.nama}</div>
              <div className={styles.absensiTable()}>
                <div className={styles.absensiStatusList()}>
                  {item.days.map((day, dayIndex) => (
                    <div key={dayIndex} className={styles.absensiStatus({ status: day.status })}>
                      {day.day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
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
  content: css({
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  }),
  absensiTable: css({
    display: "flex",
    flexDirection: "column",
  }),
  dayHeader: css({
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: "bold",
    border: "1px solid #ccc",
    backgroundColor: "#f0f0f0",
  }),
  absensiStatusList: css({
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  absensiStatus: css({
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "$backgroundColor",
    variants: {
      status: {
        hadir: { backgroundColor: "#489858" }, // Green for present
        absen: { backgroundColor: "red" }, // Red for absent
        sakit: { backgroundColor: "yellow" }, // Yellow for sick
        sunday: { backgroundColor: "grey" } // Grey for Sunday
      }
    }
  }),
  listContent: css({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  }),
  listMonth: css({
    display: "flex",
    alignItems: "center",
    width: 100,
    fontWeight: "bold",
    marginBottom: 10,
  })
}
