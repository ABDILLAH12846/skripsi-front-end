"use client"

import { MenuSelect } from '@/component/select'
import { TableSemesterDemo } from '@/component/semester-table'
import { css } from '@/utils/stitches.config'
import React from 'react'

export default function Nilai() {

  const data = [
    {
      value: "X",
      title: "Kelas X"
    },
    {
      value: "XI",
      title: "Kelas XI"
    },
    {
      value: "XII",
      title: "Kelas XII"
    },
  ]

  const dataSemester = [
    {
      value: "ganjil",
      title: "Semester Ganjil"
    },
    {
      value: "genap",
      title: "Semester Genap"
    },
  ]

  const dataBaru = [
    {
        id: "m5gr84i9",
        angka: 316,
        keterangan: "success",
        mataPelajaran: "ken99@yahoo.com ahahahah ahahahah ahahahah ahahahah hahahah ahahahah",
    },
    {
        id: "3u1reuv4",
        angka: 242,
        keterangan: "success",
        mataPelajaran: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        angka: 837,
        keterangan: "processing",
        mataPelajaran: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        angka: 874,
        keterangan: "success lalaala hddygtghabdhba bahjs bhjn a hajdnkscgyjvhbn m tgbhjnkhgcvhbj tfyghvbjhgc tfyghjgvbj rfgv 6rtfygvh trfgvhb",
        mataPelajaran: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        angka: 721,
        keterangan: "failed",
        mataPelajaran: "carmella@hotmail.com",
    },
]

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Nilai</div>
      </div>
      <div className={styles.filterBox()}>
        <MenuSelect data={data} label={"Pilih Kelas"}/>
        <MenuSelect data={dataSemester} label={"Pilih Semester"}/>
      </div>
      <div>
        <TableSemesterDemo data={dataBaru} title={"Semester Ganjil"}/>
      </div>
    </div>
  )
}

const styles = {
  header: css({
    width: "100%",
    // backgroundColor: "AliceBlue",
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
filterBox: css({
  display: "flex",
  gap: 20,
})
}
