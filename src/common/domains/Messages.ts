export const MESSAGE = {
  COMMON: {
    INVALID_ACCESS: "잘못된 접근입니다.",
    REQUEST_FAIL: "요청에 실패하였습니다.",
  },
  FORM: {
    INPUT_REQUIRED_EMAIL: "이메일을 입력해주세요.",
    INPUT_REQUIRED_PASSWORD: "비밀번호를 입력해주세요.",
    INPUT_REQUIRED_NAME: "이름을 입력해주세요.",
    INPUT_REQUIRED_SEARCH_VALUE: "검색어를 입력해주세요.",
    LENGTH_TOO_SHORT_PASSWORD: "비밀번호는 최소 %s자 이상이어야 합니다.",
    FILE_MAX_SIZE_EXCEED_MB: "최대 %sMB까지 업로드 가능합니다.",
    LENGTH_TOO_SHORT_NAME: "이름은 최소 %s자 이상이어야 합니다.",
    LENGTH_TOO_SHORT_SEARCH_VALUE: "검색어는 최소 %s자 이상이어야 합니다.",
  },
  AUTH: {
    CONFIRM_PASSWORD_NOT_MATCHED: "확인 비밀번호가 일치하지 않습니다.",
    RETRY_LOGIN: "다시 로그인해주세요.",
  },
  USER: {
    INPUT_REQUIRED_START_DAY: "시작일을 입력해주세요.",
  },
  TRANSACTION: {
    INPUT_REQUIRED_PRICE: "금액을 입력해주세요.",
    INPUT_REQUIRED_TITLE: "내역을 입력해주세요.",
  },
  getMessage: (messageTemplate: string, ...args: (string | number)[]) => {
    return messageTemplate.replace(/%s/g, () => {
      const arg = args.shift()
      return arg !== undefined ? String(arg) : "%s"
    })
  },
}
