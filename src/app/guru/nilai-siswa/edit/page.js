"use client"

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input';
import Nilai from '@/app/siswa/nilai/page';
import NilaiInput from '@/component/nilai-input';
import ButtonSessionForm from '@/component/button-session-form';

export default function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const nisn = searchParams.get("nisn")
  const idMapel = searchParams.get("idMapel")
  const semester = searchParams.get("semester")

  const [submit, setSubmit] = React.useState(false);
  // const {nisn} = params
  const [dataNilai, setDataNilai] = React.useState(null)
  const onSubmit = () => {
    setSubmit(true)
    router.back()
  }
  React.useEffect(() => {
    async function fetchDataNilai() {
      if (idMapel) {
        const res = await fetch(`http://localhost:8000/nilai/matapelajaran/${idMapel}/${nisn}/${semester}`);
        const data = await res.json();
        setDataNilai(data)
      }
    }
    setSubmit(false)

    fetchDataNilai();
  }, [idMapel]);

  console.log({ dataNilai });


  return (
    <div>
      {
        dataNilai
        ?
        dataNilai[0].nilai_seluruh.map((val) => (
          <NilaiInput submit={submit} data={{...val, tahun_ajaran : dataNilai[0].id_tahunajaran, semester, nisn, idMapel, no_kelas : dataNilai[0].no_kelas}} />
        ))
        :
        null
      }
      <ButtonSessionForm onClick={onSubmit}/>
    </div>
  )
}
