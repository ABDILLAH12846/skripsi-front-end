"use client"

import { css } from '@/utils/stitches.config'
import React from 'react'
import { Button, Checkbox } from 'antd'

export default function KenaikanKelasTable({ data }) {
    const [chaval, setChaval] = React.useState(data.daftar_siswa)
    console.log({chaval})
    const onChange = (act, val) => {
        act ? setChaval([...chaval, val]) : setChaval(chaval.filter((el) => el.nisn !== val.nisn))
    }

    const [tingkatan, setTingkatan] = React.useState(null)

    React.useEffect(() => {
        async function fetchData() {
          const res = await fetch(`http://localhost:8000/tingkatan`);
          const data = await res.json();
          setTingkatan(data);
        }

        fetchData();
      }, []);

    const datas = data.daftar_siswa.map((val) => {
        const finde = chaval.find((cal) => val.nisn === cal.nisn)
        if (finde) {
            return { nisn: val.nisn, kelas: true }
        } else {
            return { nisn: val.nisn, kelas: false }
        }
    });
    const datasLulus = data.daftar_siswa.map((val) => ({ nisn: val.nisn, kelas: false }));

    const under12 = chaval.length < data.daftar_siswa.length ? datas : chaval.map((val) => ({ nisn: val.nisn, kelas: true }))
    const above12 = chaval.length < data.daftar_siswa.length ? datasLulus : chaval.map((val) => ({ nisn: val.nisn, kelas: false }))

    const bodyDaftarSiswa = () => (
        {
            id_kelas: data?.id_kelas,
            nisn_list: Number(data?.no_kelas) >= 12 ? above12 : under12,
        }
    )

    function ubahTahunAjaran(tahunAjaran) {
        // Pecah string tahun ajaran berdasarkan "/"
        const tahun = tahunAjaran.split('/');
        
        // Konversi string tahun ke integer dan tambah 1 pada masing-masing tahun
        const tahunPertama = parseInt(tahun[0]) + 1;
        const tahunKedua = parseInt(tahun[1]) + 1;
        
        // Gabungkan kembali tahun-tahun tersebut menjadi string dengan format yang diinginkan
        return `${tahunPertama}/${tahunKedua}`;
    }

    function ubahTingkatan(no_kelas) {
        if (Number(no_kelas) === 12) {
            const newTingkatan = tingkatan.find((val) => val.nomor === 10)
            return newTingkatan
        } else {
            const newTingkatan = tingkatan.find((val) => val.nomor === (Number(no_kelas) + 1))
            return newTingkatan
        }

    }

    const body = () => (
        {
            tingkatan: ubahTingkatan(data?.no_kelas),
        }
    )

    const addDaftarSiswa = async () => {
        try {
            console.log("halllooooo")
            const result = await fetch("http://localhost:8000/siswa", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyDaftarSiswa())
            })
            if (result.ok) {
                console.log(result)
            } else {
                console.log(result)
            }
        } catch (e) {
            console.log({e})
        } finally {

            // router.back()
        }
    }

    const addDaftarSiswaTamat = async () => {
        try {
            console.log("halllooooo")
            const result = await fetch("http://localhost:8000/siswa-akhir", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyDaftarSiswa())
            })
            if (result.ok) {
                console.log(result)
            } else {
                console.log(result)
            }
        } catch (e) {
            console.log({e})
        } finally {

            // router.back()
        }
    }

    const editKelas = async () => {
        try {
            console.log("hallo")
            const result = await fetch(`http://localhost:8000/kelas/${data.id_kelas}/tingkatan`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body())
            })
            if (result.ok) {
                console.log({result})
            } else {
                console.log({result})
            }
        } catch (e) {
            console.log({e})
        } finally {

            // router.back()
        }
    }

    const addAlumni = async () => {
        try {
            console.log("hallo")
            const result = await fetch(`http://localhost:8000/alumni`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    alumniData: chaval.map((val) => ({
                        nisn: val.nisn,
                        nama: val.nama,
                        tahun_ajaran: data.tahun_ajaran
                    }))
                })
            })
            if (result.ok) {
                console.log({result})
            } else {
                console.log({result})
            }
        } catch (e) {
            console.log({e})
        } finally {

            // router.back()
        }
    }

    const editKelasAndAddDaftarSiswa = async () => {
        await editKelas();
        if (data?.no_kelas == 12) {
            await addAlumni()
            await addDaftarSiswaTamat()
        } else {
            await addDaftarSiswa();
        }
      };
    


    return (
        <div className={styles.container()}>
            <div className={styles.header()}>
                <div className={styles.nisn()}>nisn</div>
                <div className={styles.nama()}>nama</div>
                <div className={styles.nisn()}>status</div>
                <div className={styles.nisn()}></div>
            </div>
            <div style={{ width: "100%", marginBottom: 20, }}>
                {
                    data.daftar_siswa.map((val) => (
                        <div className={styles.listBody()} style={{backgroundColor: val.status.toLowerCase() === "lulus" ? "#4ade80" : "#fee2e2"}}>
                            <div className={styles.nisn()}>{val.nisn}</div>
                            <div className={styles.nama()}>{val.nama}</div>
                            <div className={styles.nisn()}>{val.status}</div>
                            <div className={styles.nisn()}>
                                <Checkbox defaultChecked={chaval.find((el) => el.nisn === val.nisn)} onChange={(e) => onChange(e.target.checked, val)}/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Button onClick={editKelasAndAddDaftarSiswa}>Naik Kelas</Button>
        </div>
    )
}

const styles = {
    container: css({
        width: "100%",
        marginTop: 30,
        // border: "black 1px solid ",
    }),
    header: css({
        width: "100%",
        display: "flex",
        borderBottom: "black 1px solid ",
        backgroundColor: "$gray500",
        padding: 10,
    }),
    listBody: css({
        width: "100%",
        display: "flex",
        padding: 10,
    }),
    nisn: css({
        flex: 1,
        textAlign: "center"
    }),
    nama: css({
        flex: 3,
        textAlign: "center"
    }),
    nilai: css({
        flex: 1,
        textAlign: "center"
    }),
    status: css({
        flex: 1,
        textAlign: "center"
    }),
}
