"use client"

import { Select } from 'antd'
import React from 'react'

export default function SelectTahunAjaran({onChange, value}) {
    const [ta, setTa] = React.useState(null);

    console.log(value)

    const taOptions = ta ? ta.map((val) => ({label: `${val.tahun_awal}/${val.tahun_akhir}`, value: val.id_tahunajaran})) : []

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/tahun-ajaran');
            const data = await res.json();
            setTa(data);
        }
        fetchData();
    }, []);
    console.log({ ta })
  return (
    <div>
        {
            ta
            ?

            <Select defaultValue={value ? value : null} style={{width: "100%"}} size='large' options={taOptions} onChange={onChange} value={value}/>
            :
            null
        }
    </div>
  )
}
