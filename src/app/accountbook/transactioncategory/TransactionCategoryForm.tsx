import { TransactionCategoryGetAllResponseDetail } from "@/accountbook/apis/transactioncategory/TransactionCategoryApiDomains"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TransactionCategoryApi } from "@/accountbook/apis/transactioncategory/TransactionCategoryApi"
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { MESSAGE } from "@/common/domains/Messages"

interface UpdateDeleteForm {
  id: number,
  name: string,
}

export default function TransactionCategoryForm(
  { category, queryClient }: { category: TransactionCategoryGetAllResponseDetail, queryClient: QueryClient }
) {
  const [isFocus, setIsFocus] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const {register, handleSubmit, reset} = useForm<UpdateDeleteForm>({
    mode: "onChange",
    defaultValues: {...category},
  })

  const validate = (data: UpdateDeleteForm): boolean => {
    let isValid = true
    if (!data.name) {
      isValid = false
      alert(MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_NAME))
    }
    return isValid
  }
  const onUpdateSubmit = (data: UpdateDeleteForm) => {
    if (!validate(data)) { return }
    updateMutation.mutate(data)
  }
  const updateMutation = useMutation({
    mutationFn: (data: UpdateDeleteForm) => TransactionCategoryApi.update(data),
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

  const onDeleteSubmit = (data: UpdateDeleteForm) => {
    deleteMutation.mutate(data)
  }
  const deleteMutation = useMutation({
    mutationFn: (data: UpdateDeleteForm) => TransactionCategoryApi.delete(data),
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
      <Input
        type="text"
        {...register("name")}
        style={{textAlign: "center"}}
        autoComplete="off"
      />
      {isFocus && (<>
        <div onMouseDown={() => setIsButtonClicked(true)} style={{display: "flex", gap: "10px", marginTop: "8px"}}>
          <Button
            onClick={handleSubmit(f => onUpdateSubmit(f))}
            style={{flex: 1}}
          >저장</Button>
          <Button
            onClick={handleSubmit(f => onDeleteSubmit(f))}
            style={{flex: 1, backgroundColor: "#C54C4C"}}
          >삭제</Button>
        </div>
      </>)}
    </form>
  )
}
