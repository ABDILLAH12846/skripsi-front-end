"use client"

import KelasSelect from '@/component/kelas-select';
import KenaikanKelasTable from '@/component/kenaikan-kelas-table';
import { css } from '@/utils/stitches.config';
import React from 'react'

export default function KenaikanKelas() {
  const [data, setData] = React.useState(null);
  const [kelas, setKelas] = React.useState(null)

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/kelasanyar/${kelas.value}`);
      const data = await res.json();
      setData(data);
    }
    if ( kelas ) {
      fetchData();
    }
  }, [kelas]);

  console.log({data, kelas})

  return (
    <div>
      <KelasSelect onChange={(val) => setKelas(val)}/>
        {
          data
          ?
          <KenaikanKelasTable data={data} />
          :
          null
        }
    </div>
  )
}

const styles = {
  customTable : css({
    width: "100%",
    backgroundColor: "Aquamarine",
  })
}
