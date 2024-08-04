"use cient"

import React from 'react'
import { MenuSelect } from './select';
import { Select } from 'antd';

export default function KurikulumSelect({ onChange, value }) {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/kurikulum');
            const data = await res.json();
            setData((data.map((val) => ({ value: val.id_kurikulum, label: val.nama_kurikulum }))));
        }
        fetchData();
    }, []);
    return (
        <div>
            {
                data
                    ?
                    <Select placeholder="Pilih Kurikulum" value={value} style={{width: "100%"}} labelInValue options={data} onChange={onChange} size="large"/>
                    :
                    null
            }
        </div>
    )
}
