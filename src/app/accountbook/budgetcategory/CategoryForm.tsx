import {
  BudgetCategoryDeleteRequest,
  BudgetCategoryGetAllResponseDetail,
  BudgetCategoryUpdateRequest,
} from "@/accountbook/apis/budgetcategory/BudgetCategoryApiDomains"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { BudgetCategoryApi } from "@/accountbook/apis/budgetcategory/BudgetCategoryApi"
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"

interface UpdateDeleteForm {
  id: string,
  name: string,
}
function toUpdateRequest(form: UpdateDeleteForm): BudgetCategoryUpdateRequest {
  return { ...form, id: Number(form.id) }
}
function toDeleteRequest(form: UpdateDeleteForm): BudgetCategoryDeleteRequest {
  return { id: Number(form.id) }
}

export default function CategoryForm(
  { category, queryClient }: { category: BudgetCategoryGetAllResponseDetail, queryClient: QueryClient }
) {
  const [ isFocus, setIsFocus ] = useState(false)
  const [ isButtonClicked, setIsButtonClicked ] = useState(false)
  const { register, handleSubmit } = useForm<UpdateDeleteForm>({
    mode: "onChange",
    defaultValues: { id: String(category.id), name: category.name },
  })

  const onUpdateSubmit = (data: UpdateDeleteForm) => {
    updateMutation.mutate(data)
  }
  const updateMutation = useMutation({
    mutationFn: (data: UpdateDeleteForm) => BudgetCategoryApi.update(toUpdateRequest(data)),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      setIsButtonClicked(false)
      setIsFocus(false)
      queryClient.invalidateQueries({ queryKey: [BudgetCategoryApi.QUERY_KEYS.GET_ALL] }).then()
    },
  })

  const onDeleteSubmit = (data: UpdateDeleteForm) => {
    deleteMutation.mutate(data)
  }
  const deleteMutation = useMutation({
    mutationFn: (data: UpdateDeleteForm) => BudgetCategoryApi.delete(toDeleteRequest(data)),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      setIsButtonClicked(false)
      setIsFocus(false)
      queryClient.invalidateQueries({ queryKey: [BudgetCategoryApi.QUERY_KEYS.GET_ALL] }).then()
    },
  })

  return (
    <form style={{ flex: 1 }}>
      <Input
        type="text"
        onFocus={ () => setIsFocus(true) }
        { ...register("name", {
          onBlur: () => {
            if (!isButtonClicked) {
              setIsFocus(false)
            }
          },
        })}
        style={{ textAlign: "center" }}
        autoComplete="off"
      />
      { isFocus && <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <Button
          onMouseDown={ () => setIsButtonClicked(true) }
          onClick={ handleSubmit(f => onUpdateSubmit(f)) }
          style={{ flex: 1 }}
        >저장</Button>
        <Button
          onMouseDown={ () => setIsButtonClicked(true) }
          onClick={ handleSubmit(f => onDeleteSubmit(f)) }
          style={{ flex: 1, backgroundColor: "#C54C4C" }}
        >삭제</Button>
      </div> }
    </form>
  )
}
