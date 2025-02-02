"use client"

import Link from "next/link"
import styled from "styled-components"

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

export default function AccountBookNavigation() {
  return (<>
    <nav style={{position: "fixed", bottom: 0, width: "100%", height: "50px", background: "#000000"}}>
      <ul style={{display: "flex", width: "100%", height: "100%"}}>
        <NavItem>
          <NavItemLink href={"/accountbook"}>홈</NavItemLink>
        </NavItem>
        <NavItem>
          <NavItemLink href={"/accountbook/transaction/register"}>등록</NavItemLink>
        </NavItem>
        <NavItem>
          <NavItemLink href={"/accountbook/transaction"}>내역</NavItemLink>
        </NavItem>
      </ul>
    </nav>
  </>)
}
