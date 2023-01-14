import { Type } from "class-transformer";
import type { Database } from "src/schema"

export type UserEntity = Database["public"]["Tables"]["user_profiles"]["Row"];
/* 
export interface UserModel {
    id: string
    userName: string
    roleId: number // TODO replace with RoleModel
    avatar: string
    discord: string
    boardgamegeek: string
    dateCreated: string
    dateModified: string
    isDeleted: boolean
}
 */
export class UserModel implements UserModel {
    id: string = ''
    userName: string = ''
    @Type(() => Number)
    roleId: number = 3 // TODO replace with RoleModel
    avatar: string = ''
    discord: string = ''
    boardgamegeek: string = ''
    dateCreated: string = ''
    dateModified: string = ''
    isDeleted: boolean = false
}