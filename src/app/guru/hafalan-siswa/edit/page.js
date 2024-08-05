"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import HafalanInput from '@/component/hafalan-input';
import ButtonSessionForm from '@/component/button-session-form';
import { useRouter, usePathname } from 'next/navigation'

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nisn = searchParams.get("nisn")
    const bulan = searchParams.get("bulan")
    const kelas = searchParams.get("kelas")
    const [data, setData] = React.useState(null);
    const [submit, setSubmit] = React.useState(false)

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/hafalan/siswa/${nisn}?bulan=${bulan}&no_kelas=${kelas}`);
            const data = await res.json();
            setData(data);
        }

        setSubmit(false)

        fetchData();
    }, [bulan, kelas]);

    console.log({ dataHafalan: data})

    const onSubmit = () => {
        setSubmit(true)
        router.back()
    }

    return (
        <div>
            {
                data
                    ?
                    <div>
                        {
                            data.hafalan[0].minggu.map((val) => (
                                <HafalanInput data={{
                                    ...val, label: `minggu ${val.minggu}`,
                                    bulan,
                                    nisn,
                                    no_kelas: kelas,
                                }}  submit={submit}/>
                            ))

                        }
                        <ButtonSessionForm onClick={onSubmit}/>

                        {/* <p>{JSON.stringify(data[0].siswa[0].hafalan[0])}</p> */}

                        {/* <HafalanInput data={data[0].siswa[0].hafalan[0].map((val) => ({
                            ...val,
                            label: `minggu ${val.minggu}`,
                            bulan,
                            nisn,
                        }))} /> */}
                    </div>
                    :
                    null
            }
        </div>
    )
}
