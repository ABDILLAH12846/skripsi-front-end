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
  const { nip } = user.user;
  const [data, setData] = React.useState(null);
  const [semester, setSemester] = React.useState("ganjil");
  const header = React.useMemo(() => {
    return ["no", "nisn", "nis", "nama"]
  }, [])

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/filterraport/${nip}`);
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, [nip]);

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "nisn")
    router.push(`${path}/edit?nisn=${obj[keyVal]}&semester=${semester}`)
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

  return (
    <div>
      <Select style={{marginBottom: 20,}} options={semesterOptions} defaultValue={semester} onChange={(val) => setSemester(val)} size='large'/>
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
