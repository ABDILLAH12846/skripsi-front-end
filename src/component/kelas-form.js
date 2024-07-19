"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
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
import { customAlphabet } from 'nanoid';
import { css } from '@/utils/stitches.config'
import ButtonSessionForm from './button-session-form'
import { DataTableDemo } from './table'
import SiswaSelect from './siswa-select'
import GuruSelect from './guru-select'
import { Select } from 'antd'

const formSchema = z.object({
    nomorKelas: z.string().min(1, { message: "Tingkat Kelas harus di isi" }),
    namaKelas: z.string().min(1, { message: "Nama Kelas harus diisi" }),
    waliKelas: z.string().min(1, { message: "Wali Kelas harus diisi" }),
    tahunAjaran: z.string().min(1, { message: "Tahun Ajaran harus diisi" }),
})

export default function KelasForm({ data, dataSiswa }) {
    const { toast } = useToast()
    console.log("data kelas", data)
    const nanoid = customAlphabet('0123456789', 4);

    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }

    const [disable, setDisable] = React.useState(true)

    // const daftarSiswa = [
    //     {
    //         nis: "111",
    //         nama: "Abdi",
    //         kelas: "XII"
    //     },
    //     {
    //         nis: "112",
    //         nama: "Zikri",
    //         kelas: "XII"
    //     },
    //     {
    //         nis: "113",
    //         nama: "Husni",
    //         kelas: "XII"
    //     },
    //     {
    //         nis: "114",
    //         nama: "Akbar",
    //         kelas: "XII"
    //     },
    // ]
    const defaultValues = React.useMemo(() => {
        if (data) {
            return {
                idKelas: data.id_kelas,
                nomorKelas: data?.no_kelas.toString(),
                namaKelas: data?.nama_kelas,
                waliKelas: data?.wali_kelas,
                tahunAjaran: data?.tahun_ajaran,
                daftarSiswa: data?.daftar_siswa,
            }
        }
        return {
            idKelas: nanoid(),
            nomorKelas: "",
            namaKelas: "",
            waliKelas: "",
            tahunAjaran: "",
            daftarSiswa: [],
        }
    }, [data])
    const [chaval, setChaval] = React.useState(defaultValues?.daftarSiswa)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    const formValue = form.getValues()

    const body = (data) => (
        {
            nisn: data?.nisn,
            nama_kelas: data?.namaKelas,
            nip: data?.waliKelas,
            no_kelas: data?.nomorKelas,
            tahun_ajaran: data?.tahunAjaran,
        }
    )
    const datas = defaultValues.daftarSiswa.map((val) => {
        const finde = chaval.find((cal) => val.nisn === cal.nisn)
        if (finde) {
            return { nisn: val.nisn, kelas: true }
        } else {
            return { nisn: val.nisn, kelas: false }
        }
    });

    const bodyDaftarSiswa = () => (
        {
            id_kelas: defaultValues?.idKelas,
            nisn_list: chaval.length < defaultValues.daftarSiswa.length ? datas : chaval.map((val) => ({ nisn: val.nisn, kelas: true })),
        }
    )

    const addKelas = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/kelas", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...body(data), id_kelas: nanoid() })
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                setDisable(false)
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
        } finally {

            // router.back()
        }
    }
    const editKelas = async (dataKelas) => {
        try {
            const result = await fetch(`http://localhost:8000/kelas/${data.id_kelas}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body(dataKelas))
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                setDisable(false)
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
        } finally {

            // router.back()
        }
    }
    const addDaftarSiswa = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/siswa", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyDaftarSiswa(data))
            })
            if (result.ok) {
                notification(result.ok, "sukses", result.statusText)
                setDisable(false)
            } else {
                notification(result.ok, "gagal", result.statusText)
            }
        } catch (e) {
        } finally {

            // router.back()
        }
    }

    const kelasOptions = [
        {
            label: "10",
            value: "10",
        },
        {
            label: "11",
            value: "11",
        },
        {
            label: "12",
            value: "12",
        },
    ]

    if (!dataSiswa) {
        return <p>Loading</p>
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={() => { }} className={styles.container()}>
                    {Object.keys(defaultValues).filter((val) => val !== "daftarSiswa" && val !== "idKelas").map((value) => (
                        <div className={styles[value] ? styles[value]() : null} style={{ marginBottom: 20 }}>
                            <FormField
                                control={form.control}
                                name={value}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{`${value[0].toUpperCase()}${value.slice(1)}`}</FormLabel>
                                        <FormControl>
                                            {
                                                value === "waliKelas"
                                                    ?
                                                    <GuruSelect onChange={(val) => field.onChange(val.value.toString())} defaultValue={field.value} />
                                                    : value === "nomorKelas"
                                                        ?
                                                        <Select style={{ width: "100%" }} options={kelasOptions} placeholder="Pilih Kelas" size="large" onChange={(val) => field.onChange(val)} defaultValue={field.value ? field.value : null} />
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
            <ButtonSessionForm onClick={form.handleSubmit(data ? editKelas : addKelas)} />
            <SiswaSelect isDisabled={!disable || data ? false : true} defaultValues={chaval} list={dataSiswa.map((val) => ({ nisn: val.nisn, nama: val.nama, tinggal_kelas: val.tinggal_kelas }))} formValue={formValue} chaval={chaval} setChaval={setChaval} />
            {
                chaval.length > 0
                    ?
                    // <p>{JSON.stringify(chaval)}</p>
                    <div style={{marginTop: 20,}}>
                        <DataTableDemo data={chaval} header={Object.keys(chaval[0])} />
                        <ButtonSessionForm onClick={addDaftarSiswa} />
                    </div>
                    : null
            }
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
    nomorKelas: css({
        width: "calc(10% - 10px)",
    }),
    namaKelas: css({
        width: "calc(30% - 10px)",
    }),
    waliKelas: css({
        width: "calc(40% - 10px)",
    }),
    tahunAjaran: css({
        width: "calc(20% - 10px)",
    }),

}
