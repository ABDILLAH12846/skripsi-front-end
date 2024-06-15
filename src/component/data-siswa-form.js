"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
    nis: z.string(),
    nisn: z.string(),
    nama: z.string().min(8, {
        message: "NIP harus memiliki 8 karakter"
    }),
    email: z.string(),
    jenisKelamin: z.string(),
    tanggalLahir: z.string().transform((str) => new Date(str)),
    tempatLahir: z.string(),
    alamat: z.string().min(8, {
        message: "Alamat harus 8 huruf"
    }),
    noTelepon: z.string(),
})

export default function DataSiswaForm({ data, action }) {
    const router = useRouter()
    const defaultValues = React.useMemo(() => {
        if (data) {
            return {
                nisn: data?.nisn.toString(),
                nama: data?.nama,
                nis: data?.nis.toString(),
                email: data?.email,
                jenisKelamin: data?.jenis_kelamin,
                tanggalLahir: new Date(data?.tanggal_lahir).toISOString().split('T')[0],
                tempatLahir: data?.tempat_lahir,
                alamat: data?.alamat,
                noTelepon: data?.no_telepon,
            }
        }
        return {
            nisn: "",
            nama: "",
            nis: "",
            email: "",
            jenisKelamin: "",
            tanggalLahir: new Date().toISOString().split('T')[0],
            tempatLahir: "",
            alamat: "",
            noTelepon: "",
        }
    }, [data])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const body = (data) => (
        {
            nisn: data?.nisn,
            nis: data?.nis,
            nama: data?.nama,
            email: data?.email,
            jenis_kelamin: data?.jenisKelamin,
            tanggal_lahir: new Date(data?.tanggalLahir).toISOString().split('T')[0],
            tempat_lahir: data?.tempatLahir,
            alamat: data?.alamat,
            no_telepon: data?.noTelepon,
        }
    )
    
    const edit = async (data) => {
        try {
            await fetch(`http://localhost:8000/siswa/${data?.nisn}`, {
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

    const add = async (data) => {
        try {
            console.log({ data, body })
            const result = await fetch("http://localhost:8000/siswa", {
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

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log(data))} className={styles.container()}>
                    {Object.keys(defaultValues).map((value) => (
                        <div className={styles[value] ? styles[value]() : null} style={{ marginBottom: 20 }}>
                            <FormField
                                control={form.control}
                                name={value}
                                render={({ field }) => (
                                    <FormItem>
                                        {/* {console.log(typeof(field?.value), field.value)} */}
                                        <FormLabel>{`${value[0].toUpperCase()}${value.slice(1)}`}</FormLabel>
                                        <FormControl>
                                            <Input type={value === "tanggalLahir" ? "date" : value === "email" ? "email" : "text"} placeholder="shadcn" {...field} value={field.value} />
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
    nisn: css({
        width: "calc(50% - 10px)",
    }),
    nis: css({
        width: "calc(50% - 10px)",
    }),
    nama: css({
        width: "calc(50% - 10px)",
    }),
    email: css({
        width: "calc(50% - 10px)",
    }),
    jenisKelamin: css({
        width: "calc(20% - 10px)",
    }),
    tanggalLahir: css({
        width: "calc(30% - 20px)",
    }),
    tempatLahir: css({
        width: "calc(50% - 10px)",
    }),
    alamat: css({
        width: "calc(50% - 10px)",
    }),
    noTelepon: css({
        width: "calc(50% - 10px)",
    }),
    namaOrangTua: css({
        width: "calc(50% - 10px)",
    }),
    noTeleponOrangTua: css({
        width: "calc(50% - 10px)",
    }),
    buttonSession: css({
        width: "100%",
        display: "flex",
        // backgroundColor: "ActiveText",
        justifyContent: "flex-end",
        gap: "20px",
    })
}
