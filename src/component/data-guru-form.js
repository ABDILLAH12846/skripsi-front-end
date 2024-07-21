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
import Upload from './upload'

const formSchema = z.object({
    nip: z.string().min(1, { message: "NIP harus diisi" }).regex(/^\d+$/, { message: "NIP harus berupa angka" }),
    nuptk: z.string().min(1, { message: "NUPTK harus diisi" }).regex(/^\d+$/, { message: "NUPTK harus berupa angka" }),
    nama: z.string().min(1, { message: "Nama harus diisi" }),
    email: z.string().email({ message: "Email tidak valid" }),
    jenisKelamin: z.string().min(1, { message: "Jenis Kelamin harus diisi" }),
    tanggalLahir: z.string().transform((str) => new Date(str)),
    tempatLahir: z.string().min(1, { message: "Tempat Lahir harus diisi" }),
    alamat: z.string().min(8, { message: "Alamat harus 8 huruf" }),
    noTelepon: z.string().regex(/^\d+$/, { message: "Nomor Telepon harus berupa angka" }),
    jabatan: z.string().min(1, { message: "Jabatan harus diisi" }),
    jenjang: z.string().min(1, { message: "Jenjang harus diisi" }),
    jurusan: z.string().min(1, { message: "Jurusan harus diisi" }),
    password: z.string().min(8, { message: "Password harus minimal 8 karakter" })
        .regex(/[A-Z]/, { message: "Password harus mengandung huruf besar" })
        .regex(/[a-z]/, { message: "Password harus mengandung huruf kecil" })
        .regex(/[0-9]/, { message: "Password harus mengandung angka" }),
    NIK: z.string().length(16, { message: "NIK harus 16 karakter" }).regex(/^\d+$/, { message: "NIK harus berupa angka" }),
    TanggalMulaiTugas: z.string().transform((str) => new Date(str)),
    NoKartuKeluarga: z.string().regex(/^\d+$/, { message: "No Kartu Keluarga harus berupa angka" }),
})

export default function DataGuruForm({ data, action }) {
    const router = useRouter()
    const [valid, setValid] = React.useState(data && data?.valid ? data?.valid : "valid")
    const [status, setStatus] = React.useState(data && data.status ? data.status : "aktif")
    const [kepegawaian, setKepegawaian] = React.useState(data && data.status_kepegawaian ? data.status_kepegawaian : "guru tetap yayasan")
    const [url, setUrl] = React.useState(data?.url ? data?.url : null)
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
                NIK: data?.NIK,
                TanggalMulaiTugas: data?.tanggal_mulai_tugas ? new Date(data?.tanggal_mulai_tugas).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                status: data?.status,
                valid: data?.valid,
                NoKartuKeluarga: data?.No_KK,
                password: data?.password,
                url: data?.url,
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
            statusKepegawaian: kepegawaian,
            NIK: "",
            TanggalMulaiTugas: new Date().toISOString().split('T')[0],
            status: status,
            valid: valid,
            NoKartuKeluarga: "",
            password: "",
            url: ""
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
            status_kepegawaian: kepegawaian,
            NIK: data.NIK,
            tanggal_mulai_tugas: new Date(data.TanggalMulaiTugas).toISOString().split('T')[0],
            status: status,
            valid: valid,
            password: data?.password,
            No_KK: data?.NoKartuKeluarga,
            url: url,
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

    const statusOptions = [
        {
            label: "Aktif",
            value: "aktif",
        },
        {
            label: "Non Aktif",
            value: "non aktif"
        },
    ]

    const validOptions = [
        {
            label: "Valid",
            value: "valid",
        },
        {
            label: "Tidak Valid",
            value: "tidak valid"
        },

    ]
    const kepegawaianOptions = [
        {
            label: "Guru Tetap Yayasan",
            value: "guru tetap yayasan",
        },
        {
            label: "Guru Tidak Tetap",
            value: "guru tidak tetap"
        },
        {
            label: "Pegawai Tetap Yayasan",
            value: "pegawai tetap yayasan"
        },
    ]


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
                                                            <Select placeholder="Jabatan" style={{ width: "100%" }} size='large' options={jabatanOptions} onChange={(val) => field.onChange(val)} defaultValue={field.value ? field.value : null} />
                                                        </div>
                                                        :
                                                        value === "status"
                                                            ?
                                                            <div>
                                                                <Select placeholder="Status" style={{ width: "100%" }} size='large' options={statusOptions} onChange={(val) => setStatus(val)} defaultValue={status} />
                                                            </div>
                                                            :
                                                            value === "valid"
                                                                ?
                                                                <div>
                                                                    <Select placeholder="Valid" style={{ width: "100%" }} size='large' options={validOptions} onChange={(val) => setValid(val)} defaultValue={valid} />
                                                                </div>
                                                                :
                                                                value === "statusKepegawaian"
                                                                    ?
                                                                    <div>
                                                                        <Select placeholder="Status Kepegawaian" style={{ width: "100%" }} size='large' options={kepegawaianOptions} onChange={(val) => setKepegawaian(val)} defaultValue={kepegawaian} />
                                                                    </div>
                                                                    :
                                                                    value === "url"
                                                                        ?
                                                                        <Upload url={url} setUrl={setUrl} />
                                                                        :
                                                                        <Input type={value === "tanggalLahir" || value === "TanggalMulaiTugas" ? "date" : value === "email" ? "email" : "text"} placeholder={`masukkan ${value} anda di dini`} {...field} value={field.value} />
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
        width: "calc(20% - 5px)",
    }),
    jabatan: css({
        width: "calc(30% - 5px)",
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
    NIK: css({
        width: "calc(25% - 10px)",
    }),
    status: css({
        width: "calc(25% - 10px)",
    }),
    TanggalMulaiTugas: css({
        width: "calc(25% - 10px)",
    }),
    valid: css({
        width: "calc(25% - 10px)",
    }),
    password: css({
        width: "calc(50% - 10px)",
    }),
    NoKartuKeluarga: css({
        width: "calc(50% - 10px)",
    }),
}
