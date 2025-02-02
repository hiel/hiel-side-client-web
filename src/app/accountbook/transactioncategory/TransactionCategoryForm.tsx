import {
  TransactionCategoryDeactivateRequest,
  TransactionCategoryGetAllResponseDetail,
  TransactionCategoryUpdateRequest,
} from "@/accountbook/apis/transactioncategory/TransactionCategoryApiDomains"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TransactionCategoryApi } from "@/accountbook/apis/transactioncategory/TransactionCategoryApi"
import { Button } from "@/components/ui/button"
import { MESSAGE } from "@/common/domains/Messages"
import InputBox from "@/common/components/InputBox"
import { Box } from "@chakra-ui/react"

export default function TransactionCategoryForm(
  { category, queryClient }: { category: TransactionCategoryGetAllResponseDetail, queryClient: QueryClient }
) {
  const [isFocus, setIsFocus] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const {control, handleSubmit, reset} = useForm<TransactionCategoryUpdateRequest>({
    mode: "onChange",
    defaultValues: {...category},
  })

  const validate = (data: TransactionCategoryUpdateRequest): boolean => {
    let isValid = true
    if (!data.name) {
      isValid = false
      alert(MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_NAME))
    }
    return isValid
  }
  const onUpdateSubmit = (data: TransactionCategoryUpdateRequest) => {
    if (!validate(data)) { return }
    updateMutation.mutate(data)
  }
  const updateMutation = useMutation({
    mutationFn: (data: TransactionCategoryUpdateRequest) => TransactionCategoryApi.update(data),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      setIsButtonClicked(false)
      setIsFocus(false)
      queryClient.invalidateQueries({ queryKey: [TransactionCategoryApi.QUERY_KEYS.GET_ALL] }).then()
    },
  })

  const onDeleteSubmit = (data: TransactionCategoryDeactivateRequest) => {
    deleteMutation.mutate(data)
  }
  const deleteMutation = useMutation({
    mutationFn: (data: TransactionCategoryDeactivateRequest) => TransactionCategoryApi.deactivate(data),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      setIsButtonClicked(false)
      setIsFocus(false)
      queryClient.invalidateQueries({ queryKey: [TransactionCategoryApi.QUERY_KEYS.GET_ALL] }).then()
    },
  })

  return (
    <form
      onFocus={() => setIsFocus(true)}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node) && !isButtonClicked) {
          setIsFocus(false)
          reset(category)
        }
      }}
      style={{flex: 1}}
    >
      <InputBox name="name" type="text" control={control} label={"이름"} styles={{textAlign: "center"}} />
      {isFocus && (<>
        <Box onMouseDown={() => setIsButtonClicked(true)} style={{display: "flex", gap: "10px", marginTop: "8px"}}>
          <Button
            onClick={handleSubmit(f => onUpdateSubmit(f))}
            style={{flex: 1}}
          >저장</Button>
          <Button
            onClick={handleSubmit(f => onDeleteSubmit(f))}
            style={{flex: 1, backgroundColor: "#C54C4C"}}
          >삭제</Button>
        </Box>
      </>)}
    </form>
  )
}
