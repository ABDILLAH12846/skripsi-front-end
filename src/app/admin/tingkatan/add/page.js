"use client"

import ButtonSessionForm from '@/component/button-session-form'
import { css } from '@/utils/stitches.config'
import { InputNumber } from 'antd'
import React from 'react'
import { useRouter } from 'next/navigation'
import { customAlphabet } from 'nanoid';
import { useToast } from "@/components/ui/use-toast"
import KurikulumSelect from '@/component/kurikulum-select'

export default function page() {
    const { toast } = useToast()
    const router = useRouter();
    const nanoid = customAlphabet('0123456789', 4);
    const [tingkatan, setTingkatan] = React.useState(10)
    const [kurikulum, setKurikulum] = React.useState(null)

    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }

    const onSubmit = async () => {
        try {
            const result = await fetch("http://localhost:8000/tingkatan", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_tingkatan: nanoid(), nomor: tingkatan, id_kurikulum: kurikulum })
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
                <div className={styles.inputBox()} style={{ display: "flex", flexDirection: "column" }}>
                    <span>Tingkatan</span>
                    <InputNumber style={{ width: "100%" }} size='large' title='Tingkatan' min={1} max={12} value={tingkatan} onChange={(val) => setTingkatan(val)} />
                </div>
                <div className={styles.inputBox()} style={{ display: "flex", flexDirection: "column" }}>
                    <span>kurikulum</span>
                    <KurikulumSelect value={kurikulum} onChange={(val) => setKurikulum(val.value)}/>
                </div>
            </div>
            <div className={styles.buttonBox()}>
                <ButtonSessionForm onClick={onSubmit} />
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
