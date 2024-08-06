"use client"

import ButtonSessionForm from '@/component/button-session-form'
import { css } from '@/utils/stitches.config'
import { InputNumber } from 'antd'
import React from 'react'
import { useRouter } from 'next/navigation'
import { customAlphabet } from 'nanoid';
import { useToast } from "@/components/ui/use-toast"

export default function page() {
    const { toast } = useToast() 
    const router = useRouter();
    const nanoid = customAlphabet('0123456789', 4);
    const [tahunAwal, setTahunAwal] = React.useState(2023)
    const [tahunAkhir, setTahunAkhir] = React.useState(tahunAwal + 1)

    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }

    const onChange = (val) => {
        setTahunAwal(val)
        setTahunAkhir(val + 1)
    }

    const onSubmit = async () => {
        try {
            const result = await fetch("http://localhost:8000/tahun-ajaran", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id_tahunajaran: nanoid(), tahun_awal: tahunAwal})
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
            <div className={styles.input()}>
                <div className={styles.inputBox()} style={{display: "flex", flexDirection: "column"}}>
                    <span>Tahun Awal</span>
                    <InputNumber style={{width: "100%"}} size='large' title='Tahun Awal' min={2023} value={tahunAwal} onChange={onChange} />
                </div>
                <div className={styles.inputBox()} style={{display: "flex", flexDirection: "column"}}>
                    <span>Tahun Akhir</span>
                    <InputNumber style={{width: "100%"}} size='large' min={2023} value={tahunAkhir} onChange={(val) => setTahunAwal(val)} disabled />
                </div>
            </div>
            <div className={styles.buttonBox()}>
                <ButtonSessionForm onClick={onSubmit}/>
            </div>
        </div>
    )
}
const styles = {
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
