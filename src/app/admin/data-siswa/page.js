"use client"

import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import { Select } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function DataSiswa() {
  const router = useRouter();
  const path = usePathname();
  const header = React.useMemo(() => {
    return ["Nama", "NISN", "E-Mail","Kelas","Tahun Ajaran", "No Telepon Orang Tua", "Nama Orang Tua"]
  }, [])

  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("aktif");

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/siswa?status=${status}`);
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, [status]);

  const statusOptions = [
    {
      label: "Aktif",
      value: "aktif",
    },
    {
      label: "Non Aktif",
      value: "non aktif",
    },
  ]

  console.log({ data })

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "NISN")
    router.push(`/admin/data-siswa/${obj[keyVal]}`)
  }
  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Daftar Siswa SMA IT AL IZZAH</div>
        <Button assChild className={styles.btn()} onClick={() => router.push(`${path}/add`)}>Tambah</Button>
      </div>
      <div>
        <Select options={statusOptions} defaultValue={status} onChange={(val) => setStatus(val)}/>
        {
          data
            ?
            <DataTableDemo data={data.map((val, idx) => ({ Nama: val.nama, NISN: val.nisn, "E-Mail": val.email, Kelas: val.kelas, "Tahun Ajaran": val.tahun_ajaran, "No Telepon Orang Tua": val.no_telepon_orangtua, "Nama Orang Tua": val.nama_orangtua }))} routing={onClick} header={header} />
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
    marginBottom: 20,
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
