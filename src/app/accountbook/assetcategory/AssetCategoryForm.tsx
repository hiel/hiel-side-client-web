import {
  AssetCategoryDeactivateRequest,
  AssetCategoryGetAllResponseDetail,
  AssetCategoryUpdateRequest,
} from "@/accountbook/apis/assetcategory/AssetCategoryApiDomains"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AssetCategoryApi } from "@/accountbook/apis/assetcategory/AssetCategoryApi"
import { Button } from "@/components/ui/button"
import { MESSAGE } from "@/common/domains/Messages"
import InputBox from "@/common/components/InputBox"
import { Box } from "@chakra-ui/react"

function toFormData(data: AssetCategoryGetAllResponseDetail) {
  return { ...data, budgetPrice: data.budgetPrice === null ? undefined : data.budgetPrice }
}

export default function AssetCategoryForm(
  { category, queryClient }: { category: AssetCategoryGetAllResponseDetail, queryClient: QueryClient }
) {
  const [ isFocus, setIsFocus ] = useState(false)
  const [ isButtonClicked, setIsButtonClicked ] = useState(false)
  const { control, handleSubmit, reset } = useForm<AssetCategoryUpdateRequest>({
    mode: "onChange",
    defaultValues: toFormData(category),
  })

  const validate = (data: AssetCategoryUpdateRequest): boolean => {
    let isValid = true
    if (!data.name) {
      isValid = false
      alert(MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_NAME))
    }
    return isValid
  }
  const onUpdateSubmit = (data: AssetCategoryUpdateRequest) => {
    if (!validate(data)) { return }
    updateMutation.mutate(data)
  }
  const updateMutation = useMutation({
    mutationFn: (data: AssetCategoryUpdateRequest) => AssetCategoryApi.update(data),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      setIsButtonClicked(false)
      setIsFocus(false)
      queryClient.invalidateQueries({ queryKey: [AssetCategoryApi.QUERY_KEYS.GET_ALL] }).then()
    },
  })

  const onDeleteSubmit = (data: AssetCategoryDeactivateRequest) => {
    deleteMutation.mutate(data)
  }
  const deleteMutation = useMutation({
    mutationFn: (data: AssetCategoryDeactivateRequest) => AssetCategoryApi.deactivate(data),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      setIsButtonClicked(false)
      setIsFocus(false)
      queryClient.invalidateQueries({ queryKey: [AssetCategoryApi.QUERY_KEYS.GET_ALL] }).then()
    },
  })

  return (
    <form
      onFocus={() => setIsFocus(true)}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node) && !isButtonClicked) {
          setIsFocus(false)
          reset(toFormData(category))
        }
      }}
      style={{flex: 1}}
    >
      <InputBox name="name" type="text" control={control} label={"이름"} styles={{textAlign: "center"}} />
      {isFocus && (<>
        <Box style={{display: "flex", alignItems: "center", marginTop: "8px"}}>
          <span style={{width: "20%", minWidth: "40px", textAlign: "center", fontSize: "14px"}}>예산</span>
          <InputBox name={"budgetPrice"} control={control} type={"text"} label={"선택 입력"} styles={{flex: 1, textAlign: "center"}} />
        </Box>
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
