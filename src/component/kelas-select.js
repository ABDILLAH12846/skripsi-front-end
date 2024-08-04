"use cient"

import React from 'react'
import { MenuSelect } from './select';
import { Select } from 'antd';

export default function KelasSelect({ onChange, value }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/kelas');
            const data = await res.json();
            console.log({ kelas: data})
            setData((data.map((val) => ({ value: `${val.id_kelas} ${val.id_tahunajaran}`, label: `${val.no_kelas} ${val.nama_kelas}` }))));
        }
        fetchData();
    }, []);
    return (
        <div>
            {
                data
                    ?
                    <Select value={value ? value : null} placeholder="Pilih Kelas" style={{width: "100%"}} labelInValue label="Pilih Kelas" options={data} onChange={onChange} size="large"/>
                    :
                    null
            }
        </div>
    )
}
