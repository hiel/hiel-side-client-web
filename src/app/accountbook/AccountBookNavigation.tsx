"use client"

import Link from "next/link"
import styled from "styled-components"

export default function AccountBookNavigation() {
  const NavItem = styled.li`
    display: flex;
    flex: 1;
    color: aliceblue;
  `
  const NavItemLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: 600;
  `

  return (
    <nav
      style={{
        position: "sticky",
        bottom: 0,
        height: "50px",
        borderRadius: "10px 10px 0 0",
        background: "#265A61",
      }}
    >
      <ul
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <NavItem>
          <NavItemLink href={"/accountbook"}>
            HOME
          </NavItemLink>
        </NavItem>
        <NavItem>
          <NavItemLink href={"/accountbook"}>
            추가
          </NavItemLink>
        </NavItem>
        <NavItem>
          <NavItemLink href={"/accountbook/transactions"}>
            내역
          </NavItemLink>
        </NavItem>
      </ul>
    </nav>
  )
}
