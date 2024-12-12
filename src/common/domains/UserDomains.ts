export const USER_PASSWORD_MINIMUM_LENGTH = 8
export const USERNAME_MINIMUM_LENGTH = 2
export const USER_PROFILE_IMAGE_MAX_FILE_SIZE_MB = 5

export enum UserType {
  MASTER = "MASTER",
  ADMIN = "ADMIN",
  USER = "USER",
}

export const UserTypeExternal: Record<"MASTER" | "ADMIN" | "USER", { type: UserType, name: string, containTypes: UserType[] }> = {
  MASTER: { type: UserType.MASTER, name: "운영자", containTypes: Object.values(UserType) },
  ADMIN: { type: UserType.ADMIN, name: "관리자", containTypes: [UserType.ADMIN, UserType.USER] },
  USER: { type: UserType.USER, name: "사용자", containTypes: [UserType.USER] },
}
