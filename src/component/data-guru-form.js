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
import { useRouter } from 'next/navigation'
import { css } from '@/utils/stitches.config'
import ButtonSessionForm from './button-session-form'
import { Select } from 'antd'

const formSchema = z.object({
    nip: z.string(),
    nuptk: z.string(),
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
    jabatan: z.string(),
    jenjang: z.string(),
    jurusan: z.string(),
    statusKepegawaian: z.string(),
    password: z.string(),
})

export default function DataGuruForm({ data, action }) {
    const router = useRouter()
    const defaultValues = React.useMemo(() => {
        if (data) {
            return {
                nip: data?.nip.toString(),
                nuptk: data?.nuptk.toString(),
                nama: data?.nama,
                email: data?.email,
                jenisKelamin: data?.jenis_kelamin,
                tanggalLahir: new Date(data?.tanggal_lahir).toISOString().split('T')[0],
                tempatLahir: data?.tempat_lahir,
                alamat: data?.alamat,
                noTelepon: data?.no_telepon,
                jabatan: data?.jabatan,
                jenjang: data?.jenjang,
                jurusan: data?.jurusan,
                statusKepegawaian: data?.status_kepegawaian,
                password: data?.password,
            }
        }
        return {
            nip: "",
            nuptk: "",
            nama: "",
            email: "",
            jenisKelamin: "",
            tanggalLahir: new Date().toISOString().split('T')[0],
            tempatLahir: "",
            alamat: "",
            noTelepon: "",
            jabatan: "",
            jenjang: "",
            jurusan: "",
            statusKepegawaian: "",
            password: "",
        }
    }, [data])
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const body = (data) => (
        {
            nip: data?.nip,
            nuptk: data?.nuptk,
            nama: data?.nama,
            email: data?.email,
            jenis_kelamin: data?.jenisKelamin,
            tanggal_lahir: new Date(data?.tanggalLahir).toISOString().split('T')[0],
            tempat_lahir: data?.tempatLahir,
            alamat: data?.alamat,
            no_telepon: data?.noTelepon,
            jabatan: data?.jabatan,
            jenjang: data?.jenjang,
            jurusan: data?.jurusan,
            status_kepegawaian: data?.statusKepegawaian,
            password: data?.password,
        }
    )

    const add = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/guru", {
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
            await fetch(`http://localhost:8000/guru/${data?.nip}`, {
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

    const genderOptions = [
        {
            label: "Perempuan",
            value: "perempuan",
        },
        {
            label: "Laki-laki",
            value: "laki-laki",
        },
    ];
    const jabatanOptions = [
        {
            label: "Guru Mata Pelajaran",
            value: "guru mata pelajaran",
        },
        {
            label: "Guru Wali Kelas",
            value: "guru wali kelas",
        },
    ];


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.container()}>
                    {Object.keys(defaultValues).map((value) => (
                        <div className={styles[value] ? styles[value]() : null} style={{ marginBottom: 20 }}>
                            <FormField
                                control={form.control}
                                name={value}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{`${value[0].toUpperCase()}${value.slice(1)}`}</FormLabel>
                                        <FormControl>
                                            {
                                                value === "jenisKelamin"
                                                    ?
                                                    <div>
                                                        <Select placeholder="Jenis Kelamin" style={{ width: "100%" }} size="large" options={genderOptions} onChange={(val) => field.onChange(val)} defaultValue={field.value ? field.value : null} />
                                                    </div>
                                                    : value === "jabatan"
                                                        ?
                                                        <div>
                                                            <Select placeholder="Jabatan" style={{ width: "100%" }} size='large' options={jabatanOptions} onChange={(val) => field.onChange(val)} defaultValue={field.value ? field.value : null}/>
                                                        </div>
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
    nip: css({
        width: "calc(50% - 10px)",
    }),
    nuptk: css({
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
        width: "calc(15% - 5px)",
    }),
    jabatan: css({
        width: "calc(35% - 5px)",
    }),
    jenjang: css({
        width: "calc(10% - 10px)",
    }),
    jurusan: css({
        width: "calc(45% - 10px)",
    }),
    statusKepegawaian: css({
        width: "calc(45% - 10px)",
    }),
}
