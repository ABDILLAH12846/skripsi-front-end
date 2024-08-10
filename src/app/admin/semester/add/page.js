"use client"

import React from 'react'
import { DataTableDemo } from '@/component/table'
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config'
import { useRouter, usePathname } from 'next/navigation'
import { Select } from 'antd'

export default function page() {
    const header = React.useMemo(() => {
        return ["Nama", "alamat", "no_telepon",]
    }, [])
    const [data, setData] = React.useState(null);
    const [semester, setSemester] = React.useState("ganjil");
    const [tahunOptions, setTahunOptions] = React.useState(null);
    const [tahun, setTahun] = React.useState(null);
    React.useEffect((val) => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/semester');
            const data = await res.json();
            setData(data);
        }

        fetchData();
    }, [])

    React.useEffect((val) => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/tahun-ajaran');
            const data = await res.json();
            setTahunOptions(data);
            setTahun(data[0].id_tahunajaran)
        }

        fetchData();
    }, [])

    const semesterOptions = [
        {
            label: "Ganjil",
            value: "ganjil"
        },
        {
            label: "Genap",
            value: "genap"
        }
    ]

    const onSubmit = async () => {
        try {
            const result = await fetch("http://localhost:8000/generate-semester", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id_tahunajaran: tahun, semester})
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                router.back()
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div>
            <div className={styles.header()}>
                <div className={styles.title()}>Generate Semester SMA IT AL IZZAH</div>
            </div>
            <div>
                <Select options={semesterOptions} onChange={(val) => setSemester(val)} value={semester} />
                {
                    tahunOptions
                        ?
                        <Select options={tahunOptions.map((val) => ({ label: `${val.tahun_awal}/${val.tahun_akhir}`, value: val.id_tahunajaran }))} value={tahun} onChange={(val) => setTahun(val)} />
                        :
                        null
                }
                <Button assChild className={styles.btn()} onClick={onSubmit}>Generate</Button>
                {
                    data
                        ?
                        <DataTableDemo data={data} header={header} />
                        :
                        null
                }
            </div>
        </div>
    )
}

const styles = {
    header: css({
        width: "100%",
        // backgroundColor: "AliceBlue",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    }),
    title: css({
        width: "50%",
        borderBottom: "2px solid #FDD100",
        padding: "10px 0",
        fontWeight: "bold"
    }),
    btn: css({
        backgroundColor: "ActiveText"
    })
}
