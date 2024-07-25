"use client"

import { GlobalContext } from '@/app/layout';
import { DataTableRapor } from '@/component/raport'
import { useRouter, usePathname } from 'next/navigation'
import { DataTableDemo } from '@/component/table';
import { Select } from 'antd';
import React from 'react'

export default function page() {
  const { user } = React.useContext(GlobalContext)
  const router = useRouter();
  const path = usePathname();
  if (!user) {
    return <div>Loading...</div>;
  }
  const { nip, no_kelas } = user.user;
  const [data, setData] = React.useState(null);
  const [semester, setSemester] = React.useState("ganjil");
  const [kelas, setKelas] = React.useState(10)
  const [sikap, setSikap] = React.useState("spiritual")
  const header = React.useMemo(() => {
    return ["no", "nisn", "nama", "nilai_konklusi"]
  }, [])

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/spiritual/${nip}?semester=${semester}&no_kelas=${kelas}`);
      const data = await res.json();
      setData(data);
    }

    async function fetchDataSosial() {
      const res = await fetch(`http://localhost:8000/sosial/${nip}?semester=${semester}&no_kelas=${kelas}`);
      const data = await res.json();
      setData(data);
    }
    if (sikap === "spiritual") {
      fetchData();
    } else {
      fetchDataSosial()
    }
  }, [nip, sikap]);

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "nisn")
    if (sikap === "spiritual") {
    router.push(`${path}/edit?nisn=${obj[keyVal]}&semester=${semester}&kelas=${kelas}`)
    } else {
      router.push(`${path}/editsosial?nisn=${obj[keyVal]}&semester=${semester}&kelas=${kelas}`)
    }
  }

  console.log({dataRapor: data})

  const semesterOptions = [
    {
      label: "Ganjil",
      value: "ganjil",
    },
    {
      label: "Genap",
      value: "genap",
    },
  ]
  const determineKelasOptions = (userKelas) => {
    const options = [];
    for (let i = 10; i <= userKelas; i++) {
      options.push({ label: i.toString(), value: i });
    }
    return options;
  }

  const kelasOptions = determineKelasOptions(no_kelas);

  const sikapOption = [
    {
      label: "Sikap Sosial",
      value: "sosial",
    },
    {
      label: "Sikap Spiritual",
      value: "spiritual",
    },
  ]

  return (
    <div>
      <Select style={{marginBottom: 20,}} options={semesterOptions} defaultValue={semester} onChange={(val) => setSemester(val)} size='large'/>
      <Select style={{marginBottom: 20,}} options={kelasOptions} defaultValue={kelas} onChange={(val) => setKelas(val)} size='large'/>
      <Select style={{marginBottom: 20,}} options={sikapOption} defaultValue={sikap} onChange={(val) => setSikap(val)} size='large'/>
      {
        data
        ?
        <DataTableDemo routing={onClick} header={header} data={data.map((val,idx) => ({...val, no : idx + 1}))} />
        :
        null
      }
        {/* <DataTableRapor /> */}
    </div>
  )
}
