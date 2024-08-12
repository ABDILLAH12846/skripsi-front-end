"use client"

import { GlobalContext } from '@/app/layout'
import SiswaProfile from '@/component/siswa-profile'
import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import { Select } from 'antd'

export default function AbsensiSiswa() {
  const { user } = React.useContext(GlobalContext)
  if (!user) {
    return <div>Loading...</div>;
  }
  const router = useRouter();
  const path = usePathname();
  const { nip } = user.user;
  const [data, setData] = React.useState([]);
  const [semester, setSemester] = React.useState("ganjil");
  const [tahunOptions, setTahunOptions] = React.useState(null);
  const [tahun, setTahun] = React.useState(null);

  const header = React.useMemo(() => {
    return ["Nama", "NISN", "Absensi"]
  }, [])


  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/absensi/${nip}?semester=${semester}&id_tahunajaran=${tahun}`);
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, [nip, semester, tahun]);

  React.useEffect((val) => {
    async function fetchData() {
      const res = await fetch('http://localhost:8000/tahun-ajaran');
      const data = await res.json();
      setTahunOptions(data);
      setTahun(data[0].id_tahunajaran)
    }

    fetchData();
  }, [])

  const semesterOptions = [
    {
      label: "Ganjil",
      value: "ganjil"
    },
    {
      label: "Genap",
      value: "genap"
    }
  ]

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Absensi Siswa</div>
        <Button assChild className={styles.btn()} onClick={() => router.push(`${path}/add?semester=${semester}&tahun=${tahun}`)}>Kelola Absensi</Button>
      </div>
      <Select options={semesterOptions} onChange={(val) => setSemester(val)} value={semester} />
      {
        tahunOptions
          ?
          <Select options={tahunOptions.map((val) => ({ label: `${val.tahun_awal}/${val.tahun_akhir}`, value: val.id_tahunajaran }))} value={tahun} onChange={(val) => setTahun(val)} />
          :
          null
      }
      {
        data
          ?
          <DataTableDemo data={data.map((val) => ({ ...val, Nama: val.nama, NISN: val.nisn, Absensi: `sakit : ${val.absensi.sakit} | hadir : ${val.absensi.hadir} | absen : ${val.absensi.absen}` }))} header={header} />
          // <p>{JSON.stringify(data)}</p>
          :
          null
      }
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
    gap: 30,
  }),
  leftProfile: css({
    border: "1.5px solid #124A4B",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 20,
    gap: 20,
    width: "20%"
  }),
  leftProfileContent: css({
    display: "flex",
    flexDirection: "column",
    gap: 10,
  }),
  listValue: css({
    display: "flex",
    flexDirection: "column"
  }),
  righContent: css({
    display: "flex",
    flexDirection: "column",
    gap: 10,
  })
}
