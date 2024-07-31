import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { css } from "@/utils/stitches.config"
import Link from "next/link"
import { usePathname } from "next/navigation"


import React from 'react'

export default function Menu({ listLink }) {
  const pathName = usePathname()
  return (
    <div className={styles.container()}>
      <h1 style={{marginBottom: 30, fontSize: 24, fontWeight: "bold", color: "white"}}>SMA IT AL IZZAH</h1>
      <div>

      <NavigationMenu>
        <NavigationMenuList>
          <div className={styles.list()}>
            {
              listLink.map((item) => (
                <div className={pathName === item.link || pathName.startsWith(item.link) ? styles.linkActive() : styles.link()}>

                <NavigationMenuItem>
                  <Link href={item.link}>{item.title}</Link>
                </NavigationMenuItem>
                </div>
              ))
            }
          </div>

        </NavigationMenuList>
      </NavigationMenu>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    width: 250,
    backgroundColor: "#124A4B",
    height: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    overflowY: "scroll"
  }),
  list: css({
    width: 200,
    display: "flex",
    flexDirection: "column",
    gap: 30,
    // backgroundColor: "White",
    // color: "White"
  }),
  link: css({
    color: "White",
    padding: 10,
  }),
  linkActive: css({
    backgroundColor: "#FDD100",
    // width: "200",
    padding: 10,
    borderRadius: "0 12px 12px 0",
    color: "#124A4B"
  })
}
