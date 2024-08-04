"use cient"

import React from 'react'
import { MenuSelect } from './select';
import { Select } from 'antd';

export default function MapelSelect({ onChange, value }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/matapelajaran');
            const data = await res.json();
            setData((data.map((val) => ({ value: val.id_matapelajaran, label: val.nama }))));
        }
        fetchData();
    }, []);
    return (
        <div>
            {
                data
                    ?
                    <Select placeholder="Pilih Mata Pelajaran" value={value} style={{width: "100%"}} labelInValue options={data} onChange={onChange} size="large"/>
                    :
                    null
            }
        </div>
    )
}
