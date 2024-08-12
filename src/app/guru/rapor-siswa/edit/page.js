"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DataTableDemo } from '@/component/table';
import ButtonSessionForm from '@/component/button-session-form';
import { DataTableRapor } from '@/component/raport';
import html2pdf from 'html2pdf.js';
import { PDFDocument } from 'pdf-lib';
import { Button } from 'antd';


const formatValue = (value) => {
    return value === null || value === 0 ? "-" : value;
};

export default function Page() {
    const searchParams = useSearchParams();
    const nisn = searchParams.get("nisn");
    const semester = searchParams.get("semester");
    const kelas = searchParams.get("kelas");

    const [nilaiData, setNilai] = useState([]);
    const [absensiData, setAbsensi] = useState([]);
    const [hafalanData, setHafalan] = useState({});
    const [catatanGuru, setCatatanGuru] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [nilaiRes, absensiRes, hafalanRes] = await Promise.all([
                    fetch(`http://localhost:8000/raport/${nisn}?semester=${semester}&no_kelas=${kelas}`),
                    fetch(`http://localhost:8000/rapor/${nisn}?semester=${semester}&no_kelas=${kelas}`),
                    fetch(`http://localhost:8000/rapor-hafalan/${nisn}?semester=${semester}&no_kelas=${kelas}`)
                ]);
                if (!nilaiRes.ok || !absensiRes.ok || !hafalanRes.ok) {
                    throw new Error(`Failed to fetch data`);
                }
                const [nilaiData, absensiData, hafalanData] = await Promise.all([nilaiRes.json(), absensiRes.json(), hafalanRes.json()]);
                if (nilaiData.message === 'No available nilai data') {
                    setError('No available nilai data');
                } else {
                    setNilai(nilaiData);
                }
                if (absensiData.message === 'No available absensi data') {
                    setError('No available absensi data');
                } else {
                    setAbsensi(absensiData);
                }
                if (hafalanData.message === 'No available hafalan data') {
                    setError('No available hafalan data');
                } else {
                    setHafalan(hafalanData);
                    setCatatanGuru(hafalanData.catatan_guru || "");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [nisn, semester, kelas]);

    const catatanEdit = async () => {
        try {
          const response = await fetch(`http://localhost:8000/rapor/${nisn}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              catatan_guru: catatanGuru,
              no_kelas: kelas,
              semester: semester
            })
          });
      
          if (!response.ok) {
            const data = await response.json();
            throw new Error(`Failed to save data: ${data.message}`);
          }
      
          alert('Data saved successfully');
        } catch (error) {
          alert(`Error: ${error.message}`);
          console.error('Error:', error);
        }
      };
      

    const headersUAS = ["Mata Pelajaran", "Nilai Akhir", "Capaian Kompetensi"];
    const headersSpiritual = ["Aspek", "Sholat Fardhu", "Solat Dhuha", "Sholat Tahajud", "Sunnah Tawatib", "Tilawah Quran", "Shaum Sunnah", "Shodaqoh", "Nilai Konklusi"];
    const headersSosial = ["Aspek", "Sabar", "Jujur", "Amanah", "Tawakkal", "Empati", "Disiplin", "Kerjasama", "Nilai Konklusi"];

    const processedDataUAS = Array.isArray(nilaiData.studentData) ? nilaiData.studentData.reduce((acc, item) => {
        const existingEntry = acc.find(entry => entry["Mata Pelajaran"] === item.nama_matapelajaran);

        if (existingEntry) {
            existingEntry["Nilai Akhir"] = formatValue(item.UAS);
            existingEntry["Capaian Kompetensi"] = formatValue(item.capaian_kompetensi);
        } else {
            acc.push({
                "Mata Pelajaran": item.nama_matapelajaran,
                "Nilai Akhir": formatValue(item.UAS),
                "Capaian Kompetensi": formatValue(item.capaian_kompetensi),
            });
        }

        return acc;
    }, []) : [];

    const processedDataSpiritual = Array.isArray(absensiData) ? absensiData.map(item => {
        return {
            "Aspek": "Predikat",
            "Sholat Fardhu": item.sholat_fardhu,
            "Solat Dhuha": item.sholat_dhuha,
            "Sholat Tahajud": item.sholat_tahajud,
            "Sunnah Tawatib": item.sunnah_rawatib,
            "Tilawah Quran": item.tilawah_quran,
            "Shaum Sunnah": item.shaum_sunnah,
            "Shodaqoh": item.shodaqoh,
            "Nilai Konklusi": item.nilai_spiritual,
            "Deskripsi": item.deskripsi_spiritual
        };
    }, []) : [];

    const processedDataSosial = Array.isArray(absensiData) ? absensiData.map(item => {
        return {
            "Aspek": "Predikat",
            "Sabar": item.sabar,
            "Jujur": item.jujur,
            "Amanah": item.amanah,
            "Tawakkal": item.tawakkal,
            "Empati": item.empati,
            "Disiplin": item.disiplin,
            "Kerjasama": item.kerjasama,
            "Nilai Konklusi": item.nilai_sosial,
            "Deskripsi": item.deskripsi_sosial
        };
    }, []) : [];

    const ref1 = React.useRef();
    const ref2 = React.useRef();
      
    const handleExportPdf = async () => {
        const opt = {
          margin: [20, 20, 20, 20], // top, right, bottom, left margins
          jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
        };
      
        // Helper function to get PDF as ArrayBuffer
        const getPdfArrayBuffer = async (ref) => {
          return new Promise((resolve, reject) => {
            html2pdf().from(ref.current).set(opt).outputPdf('arraybuffer').then(resolve).catch(reject);
          });
        };
      
        try {
          // Create a new PDF document
          const pdfDoc = await PDFDocument.create();
      
          // Get PDF ArrayBuffers for each ref
          const ref1ArrayBuffer = await getPdfArrayBuffer(ref1);
          const ref2ArrayBuffer = await getPdfArrayBuffer(ref2);
      
          // Load PDF pages from ArrayBuffers
          const ref1PdfDoc = await PDFDocument.load(ref1ArrayBuffer);
          const ref2PdfDoc = await PDFDocument.load(ref2ArrayBuffer);
      
          // Copy pages from ref1 PDF
          const [ref1Page] = await pdfDoc.copyPages(ref1PdfDoc, [0]);
          pdfDoc.addPage(ref1Page);
      
          // Copy pages from ref2 PDF
          const [ref2Page] = await pdfDoc.copyPages(ref2PdfDoc, [0]);
          pdfDoc.addPage(ref2Page);
      
          // Serialize the PDF document to bytes
          const pdfBytes = await pdfDoc.save();
      
          // Create a Blob and trigger the download
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'combined_document.pdf';
          a.click();
          URL.revokeObjectURL(url);
      
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
      };

    return (
        <div>
            <Button onClick={handleExportPdf}>Export PDF</Button>
            {nilaiData.classData ? (
            <div className='flex justify-between'>
                <div className="mb-4">
                <p><strong>NISN: </strong> {nilaiData.classData.nisn || "-"}</p>
                <p><strong>Name: </strong> {nilaiData.classData.nama}</p>
                <p><strong>Sekolah: </strong> SMA SWASTA ISLAM TERPADU AL IZZAH</p>
                <p><strong>Alamat: </strong> JL. K.H AHMAD DAHLAN, DESA ARAS</p>
                </div>
                <div className="mb-4">
                <p><strong>Kelas: </strong> {kelas} {nilaiData.classData.nama_kelas}</p>
                <p><strong>Semester: </strong> {semester} </p>
                <p><strong>Tahun Ajaran: </strong> {nilaiData.classData.tahun_awal}/{nilaiData.classData.tahun_akhir}</p>
                </div>
            </div>
            ) : null}
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <DataTableRapor data={nilaiData.studentData}/>
                    <div ref={ref2}>

                    <DataTableDemo data={processedDataUAS} header={headersUAS} />
                    </div>
                    <div className='flex gap-5 mt-4' ref={ref1}>
                        {Array.isArray(absensiData) && absensiData.length === 0 ? (
                            <div>No Data</div>
                        ) : (
                            Array.isArray(absensiData) && absensiData.map((item, index) => (
                                <table key={index} className='border'>
                                    <tbody>
                                        <tr>
                                            <th className='p-2 border'>Hadir</th>
                                            <td className='p-2 border text-center'>{formatValue(item.hadir)}</td>
                                        </tr>
                                        <tr>
                                            <th className='p-2 border'>Sakit</th>
                                            <td className='p-2 border text-center'>{formatValue(item.sakit)}</td>
                                        </tr>
                                        <tr>
                                            <th className='p-2 border'>Tanpa Keterangan</th>
                                            <td className='p-2 border text-center'>{formatValue(item.absen)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))
                        )}
                        <div>
                            <DataTableDemo data={processedDataSpiritual} header={headersSpiritual} />
                            {processedDataSpiritual.map((item, index) => (
                                <div key={index} className='mb-5 border'>
                                    <strong>Deskripsi :</strong> {item.Deskripsi}
                                </div>
                            ))}
                            <DataTableDemo data={processedDataSosial} header={headersSosial} />
                            {processedDataSosial.map((item, index) => (
                                <div key={index} className='mb-5 border'>
                                    <strong>Deskripsi :</strong> {item.Deskripsi}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div >
                        {hafalanData.length < 1 ? (
                            <div>No Data</div>
                        ) : (
                            <>
                                <table className='w-full border-collapse mt-2'>
                                    <thead>
                                        <tr>
                                            <th className='p-2 border text-center'>Batas Hafalan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='p-2 border text-center'>{hafalanData.hafalan}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='mt-4 mb-2 p-4 border w-full'>
                                    <textarea
                                        className='w-full'
                                        value={catatanGuru}
                                        onChange={(e) => setCatatanGuru(e.target.value)}
                                        rows={3}
                                    />
                                </div>
                                <ButtonSessionForm onClick={catatanEdit}/>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}