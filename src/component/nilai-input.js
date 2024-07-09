"use client"

import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { customAlphabet } from 'nanoid';
import ButtonSessionForm from './button-session-form';

export default function NilaiInput({data}) {
    const nanoid = customAlphabet('0123456789', 4);
    const [value,setValue] = React.useState(data)

    console.log({data})

    const body = () => {
        return  {
            id_nilai: nanoid(),
            nisn: data.nisn,
            id_matapelajaran: data.idMapel,
            tipe: data.tipe,
            nilai: Number(value.nilai),
            semester: data.semester,
            tahun_ajaran: data.tahun_ajaran,

        }
    }

    const add = async () => {
      try {
          const result = await fetch("http://localhost:8000/nilai", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_nilai: nanoid(),
                nisn: data.nisn,
                id_matapelajaran: data.idMapel,
                tipe: data.tipe,
                nilai: value.nilai,
                semester: data.semester,
                tahun_ajaran: data.tahun_ajaran,
    
            })
          })
      } catch (e) {
      } 
  }

  const edit = async () => {
      try {
          await fetch(`http://localhost:8000/nilai/${data?.id_nilai}`, {
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nisn: data.nisn,
                id_matapelajaran: data.idMapel,
                tipe: data.tipe,
                nilai: value.nilai,
                tahun_ajaran: data.tahun_ajaran,
                semester: data.semester,
    
            })
          })
      } catch (e) {
      } 
  }

  return (
    <div>
        <Label>{data?.tipe}</Label>
        <Input type="number" value={value.nilai} onChange={(val) => setValue({...value,nilai: val.target.value})} />
        <ButtonSessionForm onClick={() => data?.id_nilai ? edit() : add()} />
    </div>
  )
}
