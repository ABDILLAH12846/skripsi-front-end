"use client";

import { GlobalContext } from "@/app/layout";
import GuruProfile from "@/component/guru-profile";
import SiswaProfile from "@/component/siswa-profile";
import { DataTableDemo } from "@/component/table";
import { Button } from "@/components/ui/button";
import { css } from "@/utils/stitches.config";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

export default function Profile({ params }) {
  const { user } = React.useContext(GlobalContext);

  // Periksa apakah user ada sebelum mengakses propertinya
  if (!user) {
    return <div>Loading...</div>;
  }

  const { nip } = user.user; // Ubah ini sesuai dengan struktur user yang benar

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/guru/${nip}`);
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, [nip]);

  console.log({ data })

  return (
    <div>
      <div className={styles.header()}>
        <div className={styles.title()}>Profil</div>
      </div>
      {data ? <GuruProfile data={Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'password' && key !== 'valid' && key !== 'sertifikasi'))} /> : null}
    </div>
  );
}

const styles = {
  header: css({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  }),
  title: css({
    width: "50%",
    borderBottom: "2px solid #FDD100",
    padding: "10px 0",
    fontWeight: "bold"
  }),
  btn: css({
    backgroundColor: "ActiveText"
  }),
  content: css({
    display: "flex",
    gap: 30,
  }),
  leftProfile: css({
    border: "1.5px solid #124A4B",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 20,
    gap: 20,
    width: "20%"
  }),
  leftProfileContent: css({
    display: "flex",
    flexDirection: "column",
    gap: 10,
  }),
  listValue: css({
    display: "flex",
    flexDirection: "column"
  }),
  righContent: css({
    display: "flex",
    flexDirection: "column",
    gap: 10,
  })
};
