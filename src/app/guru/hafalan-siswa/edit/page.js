"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import HafalanInput from '@/component/hafalan-input';

export default function page() {
    const searchParams = useSearchParams();
    const nisn = searchParams.get("nisn")
    const bulan = searchParams.get("bulan")
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/hafalan/siswa/${nisn}?bulan=${bulan}`);
            const data = await res.json();
            setData(data);
        }

        fetchData();
    }, []);

    console.log({ dataHafalan: data})

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
                                    no_kelas: data.hafalan[0].no_kelas,
                                }} />
                            ))

                        }

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
