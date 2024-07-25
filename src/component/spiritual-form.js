"use client"

import React from 'react'
import { customAlphabet } from 'nanoid';
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import SikapSelect from './sikap-select';
import { Textarea } from '@/components/ui/textarea';
import ButtonSessionForm from './button-session-form';
import { useToast } from "@/components/ui/use-toast"
import { css } from '@/utils/stitches.config';

export default function SpiritualForm({ data, no_kelas, semester, nisn }) {
    console.log({ data })
    const nanoid = customAlphabet('0123456789', 4);
    const { toast } = useToast()
    const notification = (status, title, description) => {
        toast({
            variant: status ? "outline" : "destructive",
            title,
            description,
        })
    }
    const defaultValues = React.useMemo(() => {
        if (data?.data?.id_spiritual) {
            console.log(data)
            return {
                id_spiritual: data.data.id_spiritual,
                sholat_fardhu: data.data.sholat_fardhu,
                sholat_dhuha: data.data.sholat_dhuha,
                sholat_tahajud: data.data.sholat_tahajud,
                sunnah_rawatib: data.data.sunnah_rawatib,
                tilawah_quran: data.data.tilawah_quran,
                shaum_sunnah: data.data.shaum_sunnah,
                shodaqoh: data.data.shodaqoh,
                nilai_konklusi: data.data.nilai_konklusi,
                deskripsi: data.data.deskripsi,
                no_kelas: data.data.no_kelas,
                semester: data.data.semester,
            }
        } else {
            console.log("enggak")
            return {
                id_spiritual: nanoid(),
                sholat_fardhu: "B",
                sholat_dhuha: "B",
                sholat_tahajud: "B",
                sunnah_rawatib: "B",
                tilawah_quran: "B",
                shaum_sunnah: "B",
                shodaqoh: "B",
                nilai_konklusi: "B",
                deskripsi: "",
                no_kelas: no_kelas,
                semester: semester,
            }
        }
    }, [data])

    const form = useForm({ defaultValues })

    const addSpiritual = async (data) => {
        try {
            const result = await fetch("http://localhost:8000/spiritual", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, nisn })
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
    const editSpiritual = async (data) => {
        try {
            const result = await fetch(`http://localhost:8000/spiritual/${data?.id_spiritual}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
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

    React.useEffect(() => {
        form.reset(defaultValues)
    }, [defaultValues])

    console.log({ defaultValues })
    return (
        <div>
            <Form {...form}>
                <form onSubmit={() => { }}>
                    <div className={styles.container()}>
                        {Object.keys(defaultValues).filter((val) => val !== "id_spiritual" && val !== "no_kelas" && val !== "semester").map((val) => (
                            <FormField
                                control={form.control}
                                name={val}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{val.replace(/_/g, ' ')}</FormLabel>
                                        <FormControl>
                                            {
                                                val === "deskripsi"
                                                    ?
                                                    <Textarea {...field} value={field.value} onChange={(val) => field.onChange(val)} />
                                                    :
                                                    <div style={{ width: 220 }}>
                                                        <SikapSelect value={field.value} onChange={(val) => field.onChange(val)} />
                                                    </div>
                                            }
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </form>
            </Form>
            <ButtonSessionForm onClick={form.handleSubmit(data?.data?.id_spiritual ? editSpiritual : addSpiritual)} />
        </div>
    )
}
const styles = {
    container: css({
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    })
}
