"use client"

import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export default function DataGuru() {
  const router = useRouter();
  const path = usePathname();
  const header = React.useMemo(() => {
    return ["NISN", "Nama", "Angkatan",]
  }, [])

  const [data, setData] = React.useState(null);
  const dataBaru = data ? data.map((val) => ({
    ...val,
    angkatan: val.tahun_ajaran,
  })) : []

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:8000/alumni');
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "NISN")
    router.push(`/admin/data-siswa/${obj[keyVal]}`)
  }

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Daftar Guru SMA IT AL IZZAH</div>
      </div>
      <div>
        {
          data
          ?
          <DataTableDemo data={dataBaru.map((val, idx) => ({  NISN: val.nisn, Nama: val.nama, Angkatan: val.angkatan }))} header={header} routing={onClick}/>
          :
          null
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
  })
}
