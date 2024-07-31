"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input';
import Nilai from '@/app/siswa/nilai/page';
import NilaiInput from '@/component/nilai-input';

export default function page() {
  const searchParams = useSearchParams();
  const nisn = searchParams.get("nisn")
  const idMapel = searchParams.get("idMapel")
  const semester = searchParams.get("semester")
  // const {nisn} = params
  const [dataNilai, setDataNilai] = React.useState(null)
  React.useEffect(() => {
    async function fetchDataNilai() {
      if (idMapel) {
        const res = await fetch(`http://localhost:8000/nilai/matapelajaran/${idMapel}/${nisn}/${semester}`);
        const data = await res.json();
        setDataNilai(data)
      }
    }

    fetchDataNilai();
  }, [idMapel]);

  console.log({ dataNilai });


  return (
    <div>
      {
        dataNilai
        ?
        dataNilai[0].nilai_seluruh.map((val) => (
          <NilaiInput data={{...val, tahun_ajaran : dataNilai[0].id_tahunajaran, semester, nisn, idMapel, no_kelas : dataNilai[0].no_kelas}} />
        ))
        :
        null
      }
    </div>
  )
}
