"use client"

import { DataTableDemo } from '@/component/table';
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { GlobalContext } from '@/app/layout';
import Blank from '@/component/blank';

export default function page({ params }) {
  const { user } = React.useContext(GlobalContext)
  if (!user) {
    return <div>Loading...</div>;
  }
  const { nip: id } = user.user;
  const [data, setData] = React.useState(null);
  const router = useRouter();
  const path = usePathname();

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "nisn")
    router.push(`${path}/edit?nisn=${obj[keyVal]}&bulan=${1}`)
  }

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/hafalan/kelas/${id}?bulan=${1}`);
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);
  console.log({dataHafalan : data})

 function transformData(data) {
  return data.reduce((acc, siswa) => {
    siswa.hafalan.forEach(hafalan => {
      const mingguData = hafalan.minggu.reduce((mingguAcc, minggu) => {
        mingguAcc[`minggu${minggu.minggu}`] = minggu.hafalan || '';
        return mingguAcc;
      }, {});

      acc.push({
        nisn: siswa.nisn,
        nama: siswa.nama_siswa,
        bulan: hafalan.bulan,
        ...mingguData
      });
    });

    return acc;
  }, []);
}

  const header = ["nisn","nama","minggu1","minggu2","minggu3","minggu4"]
  return (
    <div>
      {
        data && data.length > 0
          ?
          <div>
            <DataTableDemo data={transformData(data)} header={header} routing={onClick}/>
          </div>
          :
          <Blank />
      }
    </div>
  )
}
