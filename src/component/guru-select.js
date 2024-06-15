"use cient"

import React from 'react'
import { MenuSelect } from './select';
import { Select } from 'antd';

export default function GuruSelect({ onChange, defaultValue }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/guru');
            const data = await res.json();
            setData((data.map((val) => ({ value: val.nip, label: val.nama }))));
        }
        fetchData();
    }, []);
    return (
        <div>
            {
                data
                    ?
                    <Select placeholder="Pilih Guru" defaultValue={defaultValue ? defaultValue : data[0]} style={{width: "100%"}} labelInValue options={data} onChange={onChange} size="large"/>
                    :
                    null
            }
        </div>
    )
}
