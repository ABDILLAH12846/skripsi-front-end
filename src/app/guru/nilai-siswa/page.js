"use client"

import NilaiKelasSelect from '@/component/nilai-kelas-select';
import NilaiMapelSelect from '@/component/nilai-mapel-select';
import { DataTableDemo } from '@/component/table';
import { useRouter, usePathname } from 'next/navigation'
import { Select } from 'antd'
import React from 'react'
import { GlobalContext } from '@/app/layout';
import Blank from '@/component/blank';

export default function page({ params }) {
  const { user } = React.useContext(GlobalContext)
  if (!user) {
    return <div>Loading...</div>;
  }
  const { nip: id } = user.user;
  const router = useRouter();
  const path = usePathname();
  const [data, setData] = React.useState(null);
  const [dataMapel, setDataMapel] = React.useState(null)
  const [idMapel, setIdMapel] = React.useState(null)
  const [dataNilai, setDataNilai] = React.useState(null)
  const [semester, setSemester] = React.useState("ganjil");

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/filter-nilai/${id}`);
      const data = await res.json();
      setData(data);
    }
    async function fetchDataNilai() {
      if (idMapel) {
        const res = await fetch(`http://localhost:8000/nilai/matapelajaran/${idMapel}?semester=${semester}`);
        const data = await res.json();
        setDataNilai(data)
      }
    }

    fetchData();
    fetchDataNilai();
  }, [idMapel,semester, id]);

  const transformerData = (data) => {
    return {
      nisn: data.nisn,
      nama: data.nama_siswa,
      uts: data.nilai_seluruh.find(item => item.tipe === "UTS").nilai === 0 ? "-" : data.nilai_seluruh.find(item => item.tipe === "UTS").nilai,
      uas: data.nilai_seluruh.find(item => item.tipe === "UAS").nilai === 0 ? "-" : data.nilai_seluruh.find(item => item.tipe === "UAS").nilai,
      uha: data.nilai_seluruh.find(item => item.tipe === "UHA").nilai === 0 ? "-" : data.nilai_seluruh.find(item => item.tipe === "UHA").nilai,
      th: data.nilai_seluruh.find(item => item.tipe === "TH").nilai === 0 ? "-" : data.nilai_seluruh.find(item => item.tipe === "TH").nilai
    }
  }

  const header = React.useMemo(() => {
    return ["nama", "nisn", "uts", "uas", "uha","th"]
  }, [])

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "nisn")
    router.push(`${path}/edit?nisn=${obj[keyVal]}&idMapel=${idMapel}&semester=${semester}`)
  }

  const semesterOptions = [
    {
      label: "Ganjil",
      value: "ganjil",
    },
    {
      label: "Genap",
      value: "genap",
    }
  ]

  console.log({ data })
  
  return (
    <div>
      <div>
        {
          data && data.length > 0
            ?
            <div>
              <NilaiKelasSelect data={data[0].daftarmatapelajaran.map((val) => ({ value: val.kelas, label: `${val.no_kelas} ${val.nama_kelas}`, yare: val }))} onChange={(val) => setDataMapel(data[0].daftarmatapelajaran.find((mapel) => mapel.kelas === val.value))} />
              <Select defaultValue={{value: "ganjil", label: "Ganjil"}} placeholder="Semester" style={{ width: "100%" }} size="large" options={semesterOptions} onChange={(val) => setSemester(val)} />
              {
                dataMapel
                  ?
                  <NilaiMapelSelect data={dataMapel.matapelajaran.map((val) => ({ value: val.id, label: val.nama }))} onChange={(val) => setIdMapel(val.value)}/>
                  :
                  null
              }


            </div>
            // <p>{JSON.stringify(data.daftarmatapelajaran)}</p>
            :
            <Blank />
        }
      </div>
      <div>
        {
          dataNilai
          ?
          // <p>{JSON.stringify(dataNilai.map((val) => ({nama: val.nama_siswa, nisn: val.nisn, ...val.nilai_seluruh})))}</p>
          <DataTableDemo data={dataNilai.map((val) => transformerData(val))} header={header} routing={onClick} />
          :
          null
        }
      </div>
    </div>
  )
}
