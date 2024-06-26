"use client";

import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"
import { customAlphabet } from 'nanoid';
import ButtonSessionForm from '@/component/button-session-form';

export default function KelolaAbsensi({ params }) {
  const nanoid = customAlphabet('0123456789', 4);
  const { toast } = useToast();
  const notification = (status, title, description) => {
    toast({
        variant: status ? "outline" : "destructive",
        title,
        description,
    })
}
  const { id } = params;
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [initialList, setInitialList] = useState([]);
  const [attendanceArray, setAttendanceArray] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const res = await fetch(`http://localhost:8000/absensi/${id}/${date}`);
      if (!res.ok) {
        console.error(`Failed to fetch data for ${date}: ${res.statusText}`);
        return;
      }

      const data = await res.json();

      const formattedData = data.map(item => ({
        id_absensi: item.id_absensi,
        nisn: item.nisn,
        absensi: {
          hadir: item.status === 'hadir' ? 1 : 0,
          absen: item.status === 'absen' ? 1 : 0,
          sakit: item.status === 'sakit' ? 1 : 0,
        },
      }));

      setInitialList(formattedData);

      const initialAttendanceArray = data.map(item => ({
        id_absensi: item.id_absensi,
        nisn: item.nisn,
        nama: item.nama,
        tanggal: date,
        status: item.status
      }));

      setAttendanceArray(initialAttendanceArray);
    }

    fetchData();
  }, [date, id]);

  const updateAttendanceArray = (id_absensi, nisn, value) => {
    setAttendanceArray(prevArray => {
      const existingIndex = prevArray.findIndex(item => item.nisn === nisn);
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

  const addAbsensi = async (data) => {
    try {
        const result = await fetch("http://localhost:8000/absensi", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({attendanceData: data.map((val) => ({...val, id_absensi: nanoid()}))})
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
            body: JSON.stringify({attendanceData: data})
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
  console.log({findIdNull})
  console.log(findIdNull.length < attendanceArray.length && findIdNull > 0)
  if (findIdNull.length < attendanceArray.length && findIdNull.length > 0) {
    console.log("edit dan tambah")
    addAbsensi(attendanceArray.filter((val) => val.id_absensi === null))
    editAbsensi(attendanceArray.filter((val) => val.id_absensi !== null))
  } else if (findIdNull === attendanceArray.length) {
    console.log("tambah")
    addAbsensi(attendanceArray)
  } else {
    console.log("edit")
    editAbsensi(attendanceArray)
  }
}

  return (
    <div>
      <Input 
        type="date" 
        value={date} 
        onChange={(val) => setDate(val.target.value)} 
      />
      <h1>Kelola Absensi</h1>
      {initialList.length === 0 ? (
        <p>Data absensi untuk tanggal {date} belum tersedia.</p>
      ) : (
        initialList.map(val => (
          <div key={val.nisn}>
            <h2>NISN {val.nisn}</h2>
            <RadioGroup
              onValueChange={(val) => {
                const { id_absensi, nisn, value } = JSON.parse(val);
                updateAttendanceArray(id_absensi, nisn, value);
              }}
            >
              {Object.keys(val.absensi).map(item => (
                <div className="flex items-center space-x-2" key={item}>
                  <RadioGroupItem
                    value={JSON.stringify({ id_absensi: val.id_absensi, nisn: val.nisn, value: item })}
                    id={`${val.id_absensi || 'new'}-${val.nisn}-${item}`}  // Use 'new' if id_absensi is null
                    name={`attendance-${val.nisn}`}
                    checked={attendanceArray.find(att => att.nisn === val.nisn)?.status === item}
                  />
                  <Label htmlFor={`${val.id_absensi || 'new'}-${val.nisn}-${item}`}>{item}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))
      )}
      <div>
        <h2>Attendance Data:</h2>
        <pre>{JSON.stringify(attendanceArray, null, 2)}</pre>
      </div>
      <ButtonSessionForm onClick={onClick} />
    </div>
  );
}
