"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from 'uuid';
import { customAlphabet } from 'nanoid';
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { css } from '@/utils/stitches.config'
import { useRouter } from 'next/navigation'
import ButtonSessionForm from './button-session-form'
import KelasSelect from './kelas-select'
import GuruSelect from './guru-select'
import MapelSelect from './mapel-select'
import NewKelasSelect from './new-kelas-select'
import TingkatanSelect from './tingkatan-select'

const uuid = uuidv4();

const formSchema = z.object({
    kelas: z.string(),
    mataPelajaran: z.number(),
    guruPengampu: z.number(),
})

export default function MataPelajaranForm({ data, action }) {
    console.log({ data })
    const nanoid = customAlphabet('0123456789', 4);
    const router = useRouter()
    const [tingkatan, setTingkatan] = React.useState(null)
    const defaultValues = React.useMemo(() => {
        if (data) {
            return {
                id_roster: data?.id_roster,
                kelas: `${data.id_kelas} ${data.id_tahunajaran}`,
                mataPelajaran: data?.id_matapelajaran,
                guruPengampu: data?.nip,
            }
        }
        return {
            id_roster: nanoid(),
            kelas: "",
            mataPelajaran: "",
            guruPengampu: "",
        }
    }, [data])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const body = (data) => (
        {
            id_kelas: data?.kelas.split(" ")[0],
            id_matapelajaran: data?.mataPelajaran,
            nip: data?.guruPengampu,
            id_roster: defaultValues?.id_roster,
        }
    )

    const add = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/roster", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body(data))
            })
        } catch (e) {
        } finally {
            router.back()
        }
    }

    const edit = async (data) => {
        try {
            await fetch(`http://localhost:8000/roster/${defaultValues.id_roster}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body(data))
            })
        } catch (e) {
        } router.back()
    }



    const onSubmit = (data) => {
    }
    console.log(form.watch())
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.container()}>
                    {
                        data
                            ?
                            <div className={styles.tingkatan()}>
                                <span>Tingkatan</span>
                                <TingkatanSelect value={tingkatan} onChange={(val) => setTingkatan(val.value)} />
                            </div>
                            :
                            null
                    }
                    {Object.keys(defaultValues).filter(val => val !== "id_roster").map((value) => (
                        <div className={styles[value] ? styles[value]() : null} style={{ marginBottom: 20 }}>
                            <FormField
                                control={form.control}
                                name={value}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{`${value[0].toUpperCase()}${value.slice(1)}`}</FormLabel>
                                        <FormControl>
                                            {
                                                value === "kelas"
                                                    ?
                                                    <NewKelasSelect id_tingkatan={tingkatan} onChange={(val) => field.onChange(val.value)} value={field.value} />
                                                    :
                                                    value === "guruPengampu"
                                                        ?
                                                        <GuruSelect onChange={(val) => field.onChange(val)} value={field.value} />
                                                        :
                                                        <MapelSelect onChange={(val) => field.onChange(val.value)} value={field.value} />

                                            }
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </form>
            </Form>
            <ButtonSessionForm onClick={form.handleSubmit((data) => action === "add" ? add(data) : edit(data))} />
        </div>
    )
}
const styles = {
    container: css({
        // width: "100%",
        display: "flex",
        flexWrap: "wrap",
        // gap: 20,
        // backgroundColor: "ActiveText",
        justifyContent: "space-between"
    }),
    kelas: css({
        width: "calc(21% - 5px)",
        // backgroundColor: "#000"
    }),
    mataPelajaran: css({
        width: "calc(39% - 5px)",
    }),
    guruPengampu: css({
        width: "calc(40% - 10px)",
    }),
    tingkatan: css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
    })
}
