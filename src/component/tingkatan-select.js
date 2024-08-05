"use cient"

import React from 'react'
import { MenuSelect } from './select';
import { Select } from 'antd';

export default function TingkatanSelect({ onChange, value }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/tingkatan');
            const data = await res.json();
            setData((data.map((val) => ({ value: val.id_tingkatan, label: val.nomor }))));
        }
        fetchData();
    }, []);
    return (
        <div>
            {
                data
                    ?
                    <Select placeholder="Pilih Tingkatan" value={value} style={{width: "100%"}} labelInValue options={data} onChange={onChange} size="large"/>
                    :
                    null
            }
        </div>
    )
}
