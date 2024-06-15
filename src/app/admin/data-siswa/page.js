"use client"

import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function DataSiswa() {
  const router = useRouter();
  const path = usePathname();
  const header = React.useMemo(() => {
    return ["nama", "nis", "email","kelas","tahun ajaran", "no telepon orangtua", "nama orangtua"]
  }, [])

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:8000/siswa');
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "nis")
    console.log({ keyVal, baru: obj[keyVal] })
    router.push(`/admin/data-siswa/${obj[keyVal]}`)
  }
  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Daftar Siswa SMA IT AL IZZAH</div>
        <Button assChild className={styles.btn()} onClick={() => router.push(`${path}/add`)}>Tambah</Button>
      </div>
      <div>
        {
          data
            ?
            <DataTableDemo data={data} routing={onClick} header={header} />
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
