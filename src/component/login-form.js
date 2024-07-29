"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { GlobalContext } from "@/app/layout";
import { Icon } from "lucide-react";

// Perbarui skema validasi untuk memasukkan validasi password
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string()
    .min(8, { message: "Password harus memiliki minimal 8 karakter" })
    .regex(/[A-Z]/, { message: "Password harus mengandung setidaknya satu huruf besar" })
    .regex(/[a-z]/, { message: "Password harus mengandung setidaknya satu huruf kecil" })
    .regex(/[0-9]/, { message: "Password harus mengandung setidaknya satu angka" }),
});

export function LoginForm() {
    const { user, setUser } = React.useContext(GlobalContext);
    const [passwordVisible, setObscure] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: ''
        },
    });
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            if (data.username === "admin" && data.password === "Admin#1234") {
                const userTemp = { role: "admin" };
                setUser(userTemp);
                Cookies.set("user", JSON.stringify(userTemp), { expires: 1 });
                router.push("/admin/data-guru");
            } else {
                const res = await fetch("http://localhost:8000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: data.username,
                        password: data.password,
                    }),
                });
                const userTemp = await res.json();

                if (res.ok && userTemp) {
                    setUser(userTemp);
                    Cookies.set("user", JSON.stringify(userTemp), { expires: 1 });
                    if (userTemp.role === "guru") {
                        router.push("/guru/profil");
                    } else {
                        router.push("/siswa/profil");
                    }
                } else {
                    setUser(null);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const obscure = () => {
        setObscure(!passwordVisible);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID Pengguna</FormLabel>
                            <FormControl>
                                <Input placeholder="0123456" {...field} />
                            </FormControl>
                            <FormDescription>
                                masukkan NISN/NIP anda
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sandi</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input 
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder="masukkan kata sandi" 
                                        {...field} 
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 py-1 text-sm leading-tight"
                                        onClick={obscure}
                                    >
                                        {passwordVisible ? "~" : "👁"}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
