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
    return ["no", "mata_pelajaran",]
  }, [])
  const headerRoster = React.useMemo(() => {
    return ["no", "mata_pelajaran", "kelas" , "guru",]
  }, [])
  const [data, setData] = React.useState(null);
  const [dataRoster, setDataRoster] = React.useState(null);
  

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:8000/matapelajaran');
      const data = await res.json();
      setData(data);
    }
    async function fetchDataRoster() {
      const res = await fetch('http://localhost:8000/roster');
      const data = await res.json();
      setDataRoster(data);
    }

    fetchData();
    fetchDataRoster()
  }, []);
  console.log({data})

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "id_roster")
    router.push(`/admin/mata-pelajaran/edit-roster?idRoster=${obj[keyVal]}`)
  }
  const onClickMapel = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "id_matapelajaran")
    router.push(`/admin/mata-pelajaran/edit?idMapel=${obj[keyVal]}`)
  }
  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Daftar Mata Pelajaran SMA IT AL IZZAH</div>
        <Button assChild className={styles.btn()} onClick={() => router.push(`${path}/add`)}>Tambah</Button>
      </div>
      <div>
        {
          data
            ?
            <DataTableDemo data={data.map((val, idx) => ({no: idx+1, mata_pelajaran: val.nama, id_matapelajaran: val.id_matapelajaran}))} routing={onClickMapel} header={header} />
            :
            null
          }
      </div>
      <Button onClick={() => router.push("/admin/mata-pelajaran/add-roster")}>Kelola Guru Mata Pelajaran</Button>
      <div style={{marginTop: 20}}>
      {
        dataRoster
        ?
        <DataTableDemo data={dataRoster.map((val, idx) => ({no: idx+1, ...val, kelas: `${val.no_kelas} ${val.nama_kelas}` }))} routing={onClick} header={headerRoster} />
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
