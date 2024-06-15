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

const uuid = uuidv4();

const formSchema = z.object({
    kelas: z.string(),
    mataPelajaran: z.string(),
    guruPengampu: z.string(),
})

export default function MataPelajaranForm({ data, action }) {
    const nanoid = customAlphabet('0123456789', 4);
    const router = useRouter()
    const defaultValues = React.useMemo(() => {
        if (data) {
            return {
                idMatapelajaran: data?.id_matapelajaran,
                kelas: data?.namaKelas?.value.toString(),
                mataPelajaran: data?.matapelajaran,
                guruPengampu: data?.guru_pengampu?.value.toString(),
            }
        }
        return {
            idMatapelajaran: nanoid(),
            kelas: "",
            mataPelajaran: "",
            guruPengampu: "",
        }
    }, [data])

    console.log({defaultValues, data})
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const body = (data) => (
        {
            id_kelas: data?.kelas,
            nama: data?.mataPelajaran,
            nip: data?.guruPengampu,
            id_matapelajaran: defaultValues?.idMatapelajaran,
        }
    )

    const add = async (data) => {
        try {
            console.log({ data, body })
            const result = await fetch("http://localhost:8000/mata-pelajaran", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body(data))
            })
            console.log(result)
        } catch (e) {
            console.log(e)
        } finally {
            router.back()
        }
    }

    const edit = async (data) => {
        try {
            await fetch(`http://localhost:8000/mata-pelajaran/${defaultValues.idMatapelajaran}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body(data))
            })
        } catch (e) {
            console.log(e)
        } router.back()
    }

    

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.container()}>
                    {Object.keys(defaultValues).filter(val => val !== "idMatapelajaran").map((value) => (
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
                                                    <KelasSelect onChange={(val) => field.onChange(val.value.toString())} />
                                                    :
                                                    value === "guruPengampu"
                                                        ?
                                                        <GuruSelect onChange={(val) => field.onChange(val.value.toString())} defaultValue={data?.guru_pengampu}/>
                                                        :
                                                        <Input type={value === "tanggalLahir" ? "date" : value === "email" ? "email" : "text"} placeholder="shadcn" {...field} value={field.value} />
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
            <ButtonSessionForm onClick={form.handleSubmit((data) => action === "add" ? add(data) : edit(data))}  />
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
}
