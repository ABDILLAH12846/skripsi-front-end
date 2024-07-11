"use client"

import DataSiswaForm from '@/component/data-siswa-form'
import React from 'react'

export default function Edit({params}) {
  const { idEdit } = params;
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/siswa/${idEdit}`);
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);
  return (
    <div>
        {
            data 
            ?
            <DataSiswaForm data={data} action={"edit"} />
            :
            <p>Loading</p>
        }
    </div>
  )
}
