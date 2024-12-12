"use client"

import Link from "next/link"

export default function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/accountbook"}>
            ACCOUNT BOOK
          </Link>
        </li>
      </ul>
    </div>
  )
}
