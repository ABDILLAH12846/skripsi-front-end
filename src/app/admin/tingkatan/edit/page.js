"use client"

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ButtonSessionForm from '@/component/button-session-form'
import { css } from '@/utils/stitches.config'
import { InputNumber } from 'antd'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import KurikulumSelect from '@/component/kurikulum-select'

export default function page() {
    const { toast } = useToast()
    const router = useRouter();
    const searchParams = useSearchParams();
    const idTingkatan = searchParams.get("idTingkatan")
    const [data, setData] = React.useState(null);
    const [tingkatan, setTingkatan] = React.useState(10)
    const [kurikulum, setKurikulum] = React.useState(null)
    console.log({data}, tingkatan)
    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }
    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/tingkatan/${idTingkatan}`);
            const data = await res.json();
            setData(data);
            setTingkatan(data?.nomor)
            setKurikulum(data?.id_kurikulum)
        }

        fetchData();
    }, [idTingkatan])

    const handleDelete = async () => {
        try {

            const resp = await fetch(`http://localhost:8000/tingkatan/${idTingkatan}`, {
                method: 'DELETE'
            })
        } finally {
            router.back()
        }
    }

    const onSubmit = async () => {
        try {
            const result = await fetch(`http://localhost:8000/tingkatan/${idTingkatan}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nomor: tingkatan, id_kurikulum: kurikulum})
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
            {
                data
                    ?
                    <>
                        <div className={styles.header()}>
                            <div className={styles.title()}>Daftar Mata Pelajaran SMA IT AL IZZAH</div>
                            <Button assChild variant="destructive" className={styles.btn()} onClick={handleDelete}>Hapus</Button>
                        </div>
                        <div>
                            <div className={styles.input()}>
                                <div className={styles.inputBox()} style={{ display: "flex", flexDirection: "column" }}>
                                    <span>Tingkatan</span>
                                    <InputNumber style={{ width: "100%" }} size='large' title='Tingkatan' min={1} max={12} value={tingkatan} onChange={(val) => setTingkatan(val)} />
                                </div>
                                <div className={styles.inputBox()} style={{ display: "flex", flexDirection: "column" }}>
                                    <span>Kurikulum</span>
                                    <KurikulumSelect value={kurikulum} onChange={(val) => setKurikulum(val.value)} />
                                </div>
                            </div>
                            <div className={styles.buttonBox()}>
                                <ButtonSessionForm onClick={onSubmit} />
                            </div>
                        </div>
                    </>
                    :
                    null
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
    }),
    input: css({
        width: "100%",
        display: "flex",
        gap: 20,
    }),
    inputBox: css({
        width: "100%",
        // backgroundColor: "Aquamarine",
    }),
    buttonBox: css({
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 20,
    })
}