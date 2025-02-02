import ReactModal from "react-modal"
import { Input, Text } from "@chakra-ui/react"
import { GetUserResponse, UpdateTransactionStartDayRequest } from "@/accountbook/apis/user/UserApiDomains"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { MESSAGE } from "@/common/domains/Messages"
import { UserApi } from "@/accountbook/apis/user/UserApi"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { HomeApi } from "@/accountbook/apis/home/HomeApi"

export default function TransactionStartDayFormModal({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
  const queryClient = useQueryClient()
  const {register, handleSubmit, reset} = useForm<UpdateTransactionStartDayRequest>({mode: "onChange"})

  const {data: user}: {data: GetUserResponse | undefined} = useQuery({
    queryKey: [UserApi.QUERY_KEYS.GET_USER],
    queryFn: () => UserApi.getUser(),
    select: data => data.validateAndGetData(),
  })
  useEffect(() => {
    reset({...user})
  }, [user])

  const validate = (data: UpdateTransactionStartDayRequest): boolean => {
    let isValid = true
    if (!data.transactionStartDay) {
      isValid = false
      alert(MESSAGE.getMessage(MESSAGE.USER.INPUT_REQUIRED_START_DAY))
    }
    return isValid
  }
  const onUpdateSubmit = (data: UpdateTransactionStartDayRequest) => {
    if (!validate(data)) { return }
    updateMutation.mutate(data)
  }
  const updateMutation = useMutation({
    mutationFn: (data: UpdateTransactionStartDayRequest) => UserApi.updateTransactionStartDay(data),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      queryClient.invalidateQueries({queryKey: [UserApi.QUERY_KEYS.GET_USER]}).then()
      queryClient.invalidateQueries({queryKey: [HomeApi.QUERY_KEYS.GET_HOME]}).then()
      onClose()
    },
  })

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        reset({...user})
        onClose()
      }}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={{
        content: {
          width: "fit-content",
          height: "fit-content",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <Text style={{textAlign: "center", marginBottom: "20px"}}>시작일 변경</Text>
      <form>
        <Input
          type="number"
          {...register("transactionStartDay")}
          autoComplete="off"
          style={{width: "100%", textAlign: "center", marginBottom: "10px"}}
        />
        <Button onClick={handleSubmit(f => onUpdateSubmit(f))} style={{width: "100%"}}>수정</Button>
      </form>
    </ReactModal>
  )
}
