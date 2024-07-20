"use client"

import { DataTableDemo } from '@/component/table';
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { GlobalContext } from '@/app/layout';
import Blank from '@/component/blank';
import { Button, Select } from 'antd';
import htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';
import { css } from '@/utils/stitches.config';

export default function page({ params }) {
  const { user } = React.useContext(GlobalContext)
  if (!user) {
    return <div>Loading...</div>;
  }
  console.log({ user: user })
  const { nip: id, no_kelas } = user.user;
  const [data, setData] = React.useState(null);
  const [bulan, setBulan] = React.useState(1);
  const [kelas, setKelas] = React.useState(10)
  const router = useRouter();
  const path = usePathname();

  const onClick = (obj) => {
    const keyVal = Object.keys(obj).find((item) => item === "nisn")
    router.push(`${path}/edit?nisn=${obj[keyVal]}&bulan=${bulan}&kelas=${kelas}`)
  }

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/hafalan/kelas/${id}?bulan=${bulan}&no_kelas=${kelas}`);
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, [bulan, kelas]);
  console.log({ dataHafalan: data })

  function transformData(data) {
    return data.reduce((acc, siswa) => {
      siswa.hafalan.forEach(hafalan => {
        const mingguData = hafalan.minggu.reduce((mingguAcc, minggu) => {
          mingguAcc[`minggu${minggu.minggu}`] = minggu.hafalan || '';
          return mingguAcc;
        }, {});

        acc.push({
          nisn: siswa.nisn,
          nama: siswa.nama_siswa,
          bulan: hafalan.bulan,
          ...mingguData
        });
      });

      return acc;
    }, []);
  }

  const header = ["nisn", "nama", "minggu1", "minggu2", "minggu3", "minggu4"]

  const bulanList = [
    { label: "Januari", value: 1 },
    { label: "Februari", value: 2 },
    { label: "Maret", value: 3 },
    { label: "April", value: 4 },
    { label: "Mei", value: 5 },
    { label: "Juni", value: 6 },
    { label: "Juli", value: 7 },
    { label: "Agustus", value: 8 },
    { label: "September", value: 9 },
    { label: "Oktober", value: 10 },
    { label: "November", value: 11 },
    { label: "Desember", value: 12 }
  ];

  const determineKelasOptions = (userKelas) => {
    const options = [];
    for (let i = 10; i <= userKelas; i++) {
      options.push({ label: i.toString(), value: i });
    }
    return options;
  }

  const kelasOptions = determineKelasOptions(no_kelas);

  // console.log({ datani: transformData(data ? data : null) })

  const handleExport = () => {
    fetch('http://localhost:8000/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transformData(data).map((val) => ({ kelas, ...val, bulan })))
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hafalan siswa kelas ${kelas} bulan ${bulan}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => console.error('Error exporting data:', error));
  };

  const ref1 = React.useRef();

  const handleExportPdf = () => {
    console.log({ ref1 })
    html2pdf().from(ref1.current).set({
      margin: [20, 20, 20, 20], // top, right, bottom, left margins
    }).save(`hafalan siswa kelas ${kelas} bulan ${bulan}.pdf`);
  };


  return (
    <div>
      <div style={{ marginBottom: 20, }}>
        <Select size='large' style={{ width: 200 }} options={bulanList} defaultValue={bulan} onChange={(val) => setBulan(val)} />
      </div>
      <div style={{ marginBottom: 20, }}>
        <Select size='large' style={{ width: 200 }} options={kelasOptions} defaultValue={kelas} onChange={(val) => setKelas(val)} />
      </div>
      {
        data && data.length > 0
          ?
          <>
            <div ref={ref1}>
              <DataTableDemo data={transformData(data)} header={header} routing={onClick} />
            </div>
            <div className={styles.buttonWrapper()}>
              <Button type='primary' onClick={handleExport}>Export Excel</Button>
              <Button type='primary' onClick={handleExportPdf}>Export PDf</Button>
            </div>
          </>
          :
          <Blank />
      }
    </div>
  )
}
 const styles = {
  buttonWrapper : css({
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: 20,
    padding: 20,
  })
 }
