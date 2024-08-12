"use client";

import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"
import { customAlphabet } from 'nanoid';
import ButtonSessionForm from '@/component/button-session-form';
import { GlobalContext } from '@/app/layout';
import { css } from '@/utils/stitches.config';
import { useSearchParams } from 'next/navigation'

export default function KelolaAbsensi({ params }) {
  const searchParams = useSearchParams();
  const tahun = searchParams.get("tahun")
  const semester = searchParams.get("semester")
  const { user } = React.useContext(GlobalContext)
  const nanoid = customAlphabet('0123456789', 4);
  const { toast } = useToast();
  console.log({tahun, semester})
  const notification = (status, title, description) => {
    toast({
      variant: status ? "outline" : "destructive",
      title,
      description,
    })
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  const { nip: id } = user.user;
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [initialList, setInitialList] = useState([]);
  const [attendanceArray, setAttendanceArray] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const res = await fetch(`http://localhost:8000/absensi/${id}/${date}?semester=${semester}&id_tahunajaran=${tahun}`);
      if (!res.ok) {
        console.error(`Failed to fetch data for ${date}: ${res.statusText}`);
        return;
      }

      const data = await res.json();

      console.log({ data });

      const formattedData = data.map(item => ({
        id_absensi: item.id_absensi,
        nisn: item.nisn,
        absensi: {
          hadir: item.status === 'hadir' ? 1 : 0,
          absen: item.status === 'absen' ? 1 : 0,
          sakit: item.status === 'sakit' ? 1 : 0,
        },
        no_kelas: item.no_kelas,
        nama: item.nama,
        id_semester: item.id_semester,
      }));

      setInitialList(formattedData);

      const initialAttendanceArray = data.map(item => ({
        id_absensi: item.id_absensi,
        nisn: item.nisn,
        nama: item.nama,
        tanggal: date,
        status: item.status,
        id_semester: item.id_semester,
      }));

      setAttendanceArray(initialAttendanceArray);
    }

    fetchData();
  }, [date, id]);

  const updateAttendanceArray = (id_absensi, id_semester, value) => {
    setAttendanceArray(prevArray => {
      const existingIndex = prevArray.findIndex(item => item.id_semester === id_semester);
      if (existingIndex >= 0) {
        const newArray = [...prevArray];
        newArray[existingIndex].status = value;
        newArray[existingIndex].id_absensi = id_absensi;  // Update id_absensi if necessary
        return newArray;
      } else {
        return [...prevArray, { id_absensi, nisn, status: value, tanggal: date }];
      }
    });
  };

  console.log({ initialList })

  const addAbsensi = async (data) => {
    const bodyPost = data.map((val) => ({ ...val, id_absensi: nanoid(), no_kelas: initialList[0].no_kelas }))
    console.log({ bodyPost })
    try {
      const result = await fetch("http://localhost:8000/absensi", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attendanceData: bodyPost })
      })
      console.log(result)
      if (result.ok) {
        notification(result.ok, "sukses menambahkan", result.statusText)
        setDisable(false)
      } else {
        notification(result.ok, "gagal", result.statusText)
      }
    } catch (e) {
      console.log(e)
    } finally {

      // router.back()
    }
  }

  const editAbsensi = async (data) => {
    try {
      const result = await fetch("http://localhost:8000/absensi", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attendanceData: data })
      })
      console.log(result)
      if (result.ok) {
        notification(result.ok, "sukses mengedit", result.statusText)
        setDisable(false)
      } else {
        notification(result.ok, "gagal", result.statusText)
      }
    } catch (e) {
      console.log(e)
    } finally {

      // router.back()
    }
  }

  const onClick = () => {
    const findIdNull = attendanceArray.filter((val) => val.id_absensi === null)
    console.log({ findIdNull })
    console.log(findIdNull.length < attendanceArray.length && findIdNull > 0)
    if (findIdNull.length < attendanceArray.length && findIdNull.length > 0) {
      console.log("edit dan tambah")
      addAbsensi(attendanceArray.filter((val) => val.id_absensi === null))
      editAbsensi(attendanceArray.filter((val) => val.id_absensi !== null))
    } else if (findIdNull.length === attendanceArray.length) {
      console.log("tambah")
      addAbsensi(attendanceArray)
    } else {
      console.log("edit")
      editAbsensi(attendanceArray)
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <Input
        type="date"
        value={date}
        onChange={(val) => setDate(val.target.value)}
        max={today}
      />
      {initialList.length === 0 ? (
        <p>Data absensi untuk tanggal {date} belum tersedia.</p>
      ) : (
        <div className={styles.container()}>
          <div className={styles.listItem()}>
            <div className={styles.label()}>
              <div className={styles.nisn()}>NISN</div>
              <div>Nama</div>
            </div>
            <div className={styles.radioButtonList()}>
              <div className={styles.radioItem()}>Hadir</div>
              <div className={styles.radioItem()}>Absen</div>
              <div className={styles.radioItem()}>Sakit</div>
            </div>
          </div>
          {initialList.map(val => (
            <div key={val.nisn} className={styles.listItem()} style={{ borderBottom: "1px solid $gray500" }}>
              <div className={styles.label()}>
                <div className={styles.nisn()}>{val.nisn}</div>
                <div>{val.nama}</div>
              </div>
              <RadioGroup
                onValueChange={(val) => {
                  const { id_absensi, id_semester, value } = JSON.parse(val);
                  updateAttendanceArray(id_absensi, id_semester, value);
                }}
              >
                <div className={styles.radioButtonList()}>


                  {Object.keys(val.absensi).map(item => (
                    <div key={item} className={styles.radioItem()}>
                      <RadioGroupItem
                        value={JSON.stringify({ id_absensi: val.id_absensi, nisn: val.nisn, value: item, id_semester: val.id_semester })}
                        id={`${val.id_absensi || 'new'}-${val.nisn}-${item}`}  // Use 'new' if id_absensi is null
                        name={`attendance-${val.nisn}`}
                        checked={attendanceArray.find(att => att.id_semester === val.id_semester)?.status === item}
                      />
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )
          )
          }</div>

      )}
      <ButtonSessionForm onClick={onClick} />
    </div>
  );
}

const styles = {
  listItem: css({
    display: "flex",
    width: "100%",
    // backgroundColor: "AliceBlue",
    justifyContent: "space-between",
    padding: 5,
  }),
  radioButtonList: css({
    display: "flex",
    width: 300,
    // backgroundColor: "$gray500",
    justifyContent: "space-between",

  }),
  radioItem: css({
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  label: css({
    display: "flex",
    alignItems: "center",
  }),
  nisn: css({
    width: 100,
  }),
  container: css({
    marginTop: 20,
    marginBottom: 20,
  })
}
