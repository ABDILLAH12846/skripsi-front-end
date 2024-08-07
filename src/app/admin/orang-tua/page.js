"use client"

import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export default function OrangTua() {
  const router = useRouter();
  const path = usePathname();
  const header = React.useMemo(() => {
    return ["Nama","alamat", "no_telepon",]
  }, [])
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:8000/orangtua');
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "id_orangtua")
    const status = Object.keys(obj).find((item) => item === "status")
    console.log({obj})
    router.push(`/admin/orang-tua/edit?idOrtu=${obj[keyVal]}&status=${obj[status]}`)
  }
  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Daftar Kelas SMA IT AL IZZAH</div>
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
