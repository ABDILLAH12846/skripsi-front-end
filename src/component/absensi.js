"use client";

import React from 'react';
import { css } from '@/utils/stitches.config';

export function AbsensiTable({ data, currentDate }) {
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
        status = "sunday";
      } else {
        const absence = absences.find(a => a.tanggal === dateStr);
        status = absence ? absence.status : "hadir";
      }
      const isFutureDate = date > currentDate;
      days.push({ day, date: dateStr, status, isFutureDate });
    }
    return days;
  };

  const year = data.length > 0 ? parseInt(data[0].tahun_ajaran.slice(0, 4), 10) : null;

  const dataAbsensi = year ? [
    { nama: "Juli", days: generateDays(7, year, data) },
    { nama: "Agustus", days: generateDays(8, year, data) },
    { nama: "September", days: generateDays(9, year, data) },
    { nama: "Oktober", days: generateDays(10, year, data) },
    { nama: "November", days: generateDays(11, year, data) },
    { nama: "Desember", days: generateDays(12, year, data) },
    { nama: "Januari", days: generateDays(1, year + 1, data) },
    { nama: "Februari", days: generateDays(2, year + 1, data) },
    { nama: "Maret", days: generateDays(3, year + 1, data) },
    { nama: "April", days: generateDays(4, year + 1, data) },
    { nama: "Mei", days: generateDays(5, year + 1, data) },
    { nama: "Juni", days: generateDays(6, year + 1, data) },
  ] : [];

  return (
    <div className={styles.content()}>
      {dataAbsensi.length === 0 ? (
        <div>No Data</div>
      ) : (
        dataAbsensi.map((item, monthIndex) => (
          <div key={monthIndex} className={styles.listContent()}>
            <div className={styles.listMonth()}>{item?.nama}</div>
            <div className={styles.absensiTable()}>
              <div className={styles.absensiStatusList()}>
                {item.days.map((day, dayIndex) => (
                  <div key={dayIndex} className={styles.absensiStatus({ status: day.status, isFutureDate: day.isFutureDate })}>
                    {day.day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
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
        sunday: { backgroundColor: "grey" }, // Grey for Sunday
      },
      isFutureDate: {
        true: { backgroundColor: "transparent" }, // Transparent for future dates
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
  }),
};