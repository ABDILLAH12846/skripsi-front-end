"use client"

import ButtonSessionForm from '@/component/button-session-form'
import { css } from '@/utils/stitches.config'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useRouter } from 'next/navigation'
import { customAlphabet } from 'nanoid';
import { useToast } from "@/components/ui/use-toast"

export default function page() {
    const { toast } = useToast()
    const router = useRouter();
    const nanoid = customAlphabet('0123456789', 4);
    const [kurikulum, setKurikulum] = React.useState("")

    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }

    const onSubmit = async () => {
        try {
            const result = await fetch("http://localhost:8000/kurikulum", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id_kurikulum: nanoid(), nama_kurikulum: kurikulum})
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
                    <span>Kurikulum</span>
                    <Input style={{ width: "100%" }} placeholder='Kurikulum' size='large' value={kurikulum} onChange={(val) => setKurikulum(val.target.value)} />
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
