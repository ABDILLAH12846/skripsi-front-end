"use client"

import { LoginForm } from "@/component/login-form";
import { css } from "@/utils/stitches.config";
import Poster from "../../public/coba.jpeg"
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container()}>
      <div className={styles.kiri()}>
        <Image style={{objectFit: "contain"}} alt="poster" src={Poster} layout="responsive" width={100} height={100} />
      </div>
      <div className={styles.kanan()}>
        <LoginForm />
      </div>
    </div>
  );
}

const styles = {
  container: css({
    // backgroundColor: "Aquamarine",
    width: "100%",
    height: "100vh",
    position: "absolute",
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "space-between",
  }),
  kiri: css({
    width: "50%",
    backgroundColor: "#03626F",
    height: "100vh",
    overflow: "hidden"
  }),
  kanan: css({
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  })
}
