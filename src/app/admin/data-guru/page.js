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
    return ["Nama", "NIP", "E-Mail", "Jabatan", "Mata Pelajaran"]
  }, [])

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:8000/guru');
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "NIP")
    router.push(`/admin/data-guru/${obj[keyVal]}`)
  }
  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Daftar Guru SMA IT AL IZZAH</div>
        <Button assChild className={styles.btn()} onClick={() => router.push(`${path}/add`)}>Tambah</Button>
      </div>
      <div>
        {
          data
            ?
            <DataTableDemo data={data.map((val, idx) => ({ Nama: val.nama, NIP: val.nip, "E-Mail": val.email, Jabatan: val.jabatan, "Mata Pelajaran": val.matapelajaran }))} routing={onClick} header={header} />
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
