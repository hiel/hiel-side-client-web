import ReactModal from "react-modal"
import { AuthUtility } from "@/common/utilities/AuthUtility"
import styled from "styled-components"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  padding: 5px;
  font-size: 14px;
`

export default function UserModal({isOpen, onClose, isStartDayModalOpenState}
  : {isOpen: boolean, onClose: () => void, isStartDayModalOpenState: [boolean, Dispatch<SetStateAction<boolean>>]}
) {
  const router = useRouter()
  const [isStartDayModalOpen, setIsStartDayModalOpen] = isStartDayModalOpenState

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={{
        content: {
          inset: "50px 30px 0 auto",
          width: "fit-content",
          height: "fit-content",
          padding: 0,
          position: "absolute",
        },
        overlay: {
          backgroundColor: "transparent",
        },
      }}
    >
      <ul>
        <ListItem onClick={() => {
          setIsStartDayModalOpen(!isStartDayModalOpen)
          onClose()
        }}>시작일 변경</ListItem>
        <ListItem onClick={() => router.push("/accountbook/user/changePassword")}>비밀번호 변경</ListItem>
        <ListItem onClick={() => {
          if (!confirm("로그아웃 하시겠습니까?")) { return }
          AuthUtility.logout()
          router.push("/accountbook/auth")
        }}>로그아웃</ListItem>
      </ul>
    </ReactModal>
  )
}
