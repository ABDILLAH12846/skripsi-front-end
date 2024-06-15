"use client"

import { MenuSelect } from '@/component/select'
import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export default function Absensi() {
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

  const dataAbsensi = [
    {
      nama: "Januari",
      jumlah: "31"
    },
    {
      nama: "Februari",
      jumlah: "28"
    },
    {
      nama: "Maret",
      jumlah: "31"
    },
    {
      nama: "April",
      jumlah: "30"
    },
    {
      nama: "Mei",
      jumlah: "31"
    },
    {
      nama: "Juni",
      jumlah: "30"
    },
    {
      nama: "Juli",
      jumlah: "31"
    },
    {
      nama: "Agustus",
      jumlah: "31"
    },
    {
      nama: "September",
      jumlah: "30"
    },
    {
      nama: "Oktober",
      jumlah: "31"
    },
    {
      nama: "November",
      jumlah: "30"
    },
    {
      nama: "Desember",
      jumlah: "31"
    },
  ]

  const onChange = (val) => {
    console.log({ val })
  }

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Absensi</div>
      </div>
      <MenuSelect data={data} label={"Pilih kelas"} onChange={onChange} />
      <div className={styles.content()}>
          {
            dataAbsensi.map((item) => (
              <div className={styles.listContent()}>
                <div className={styles.listMonth()}>{item?.nama}</div>
                <div className={styles.absensiStatusList()}>
                  {
                    Array.from({ length: item.jumlah }, (val) => (
                      <div className={styles.absensiStatus()}></div>
                    ))
                  }
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
  btn: css({
    backgroundColor: "ActiveText"
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  }),
  absensiStatusList: css({
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  }),
  absensiStatus: css({
    width: 20,
    height: 20,
    backgroundColor: "#489858"
  }),
  listContent: css({
    display: "flex",
    flexWrap: "wrap",
  }),
  listMonth: css({
    display: "flex",
    alignItems: "center",
    width: 100,
    // backgroundColor: "Aquamarine",
  })
}
