"use client"

import DataGuruForm from '@/component/data-guru-form'
import React from 'react'

export default function Edit({params}) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/guru/${params.idEdit}`);
      const data = await res.json();
      console.log({data})
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      {
        data 
        ?
        <DataGuruForm data={data} action={"edit"}/>
        :
        null
      }
    </div>
  )
}
