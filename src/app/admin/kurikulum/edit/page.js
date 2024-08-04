"use client"

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ButtonSessionForm from '@/component/button-session-form'
import { css } from '@/utils/stitches.config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"

export default function page() {
    const { toast } = useToast()
    const router = useRouter();
    const searchParams = useSearchParams();
    const idKurikulum = searchParams.get("idKurikulum")
    const [data, setData] = React.useState(null);
    const [kurikulum, setKurikulum] = React.useState(10)
    console.log({data}, kurikulum)
    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }
    React.useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:8000/kurikulum/${idKurikulum}`);
            const data = await res.json();
            setData(data);
            setKurikulum(data?.nama_kurikulum)
        }

        fetchData();
    }, [idKurikulum])

    const handleDelete = async () => {
        try {

            const resp = await fetch(`http://localhost:8000/kurikulum/${idKurikulum}`, {
                method: 'DELETE'
            })
        } finally {
            router.back()
        }
    }

    const onSubmit = async () => {
        try {
            const result = await fetch(`http://localhost:8000/kurikulum/${idKurikulum}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nama_kurikulum: kurikulum})
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
                            <div className={styles.title()}>Daftar Kurikulum SMA IT AL IZZAH</div>
                            <Button assChild variant="destructive" className={styles.btn()} onClick={handleDelete}>Hapus</Button>
                        </div>
                        <div>
                            <div className={styles.input()}>
                                <div className={styles.inputBox()} style={{ display: "flex", flexDirection: "column" }}>
                                    <span>Kurikulum</span>
                                    <Input style={{ width: "100%" }} size='large' value={kurikulum} onChange={(val) => setKurikulum(val.target.value)} />
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