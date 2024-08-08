"use client"

import { DataTableDemo } from '@/component/table';
import { Button } from '@/components/ui/button'
import { css } from '@/utils/stitches.config';
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export default function page() {
    const router = useRouter();
    const path = usePathname();
    const header = React.useMemo(() => {
        return ["No", "Kurikulum"]
    }, [])
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:8000/kurikulum');
            const data = await res.json();
            setData(data);
        }

        fetchData();
    }, []);

    const onClick = (obj) => {
        const keyVal = Object.keys(obj).find((item) => item === "id_kurikulum")
        router.push(`/admin/kurikulum/edit?idKurikulum=${obj[keyVal]}`)
      }

    return (
        <div>
            <div className={styles.header()}>
                <div className={styles.title()}>Daftar Kurikulum SMA IT AL IZZAH</div>
                <Button assChild className={styles.btn()} onClick={() => router.push(`${path}/add`)}>Tambah</Button>
            </div>
            {
                data
                    ?
                    <DataTableDemo data={data.map((val, idx) => ({ ...val, No: idx + 1 , Kurikulum: val.nama_kurikulum}))} header={header} routing={onClick}/>
                    :
                    <p>Loading</p>
            }
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