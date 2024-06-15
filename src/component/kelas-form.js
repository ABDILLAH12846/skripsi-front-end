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
import ButtonSessionForm from './button-session-form'
import { DataTableDemo } from './table'

const formSchema = z.object({
    nip: z.string().min(8, {
        message: "NIP harus memiliki 8 karakter"
    }),
    nuptk: z.string().min(8, {
        message: "NIP harus memiliki 8 karakter"
    }),
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
    jenjang: z.string(),
    jurusan: z.string(),
    statusKepegawaian: z.string(),
})

export default function KelasForm({ id }) {
    const defaultValues = React.useMemo(() => {
        if (id) {
            return {
                tingkatKelas: "abcdefghi",
                namaKelas: "abcdefghi",
                waliKelas: "abcdefghi",
                daftarSiswa: [
                    {
                        nis: "111",
                        nama: "Abdi",
                        kelas: "XII"
                    },
                    {
                        nis: "112",
                        nama: "Zikri",
                        kelas: "XII"
                    },
                    {
                        nis: "113",
                        nama: "Husni",
                        kelas: "XII"
                    },
                    {
                        nis: "114",
                        nama: "Akbar",
                        kelas: "XII"
                    },
                ],
            }
        }
        return {
            tingkatKelas: "",
            namaKelas: "",
            waliKelas: "",
            daftarSiswa: [],
        }
    }, [id])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.container()}>
                    {Object.keys(defaultValues).map((value) => ( value === "daftarSiswa" ? null :
                        <div className={styles[value] ? styles[value]() : null} style={{ marginBottom: 20 }}>
                            <FormField
                                control={form.control}
                                name={value}
                                render={({ field }) => (
                                    <FormItem>
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
            {
                defaultValues?.daftarSiswa.length > 0
                ? 
                <DataTableDemo data={defaultValues?.daftarSiswa} />
                : null
            }
            <ButtonSessionForm />
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
    tingkatKelas: css({
        width: "calc(10% - 10px)",
    }),
    namaKelas: css({
        width: "calc(40% - 10px)",
    }),
    waliKelas: css({
        width: "calc(50% - 10px)",
    }),
    
}
