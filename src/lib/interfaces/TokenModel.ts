import { HomebrewCategoriesEnum } from "$lib/enums/Enums";
import type { Database } from "src/schema";
import { HomebrewModel } from "./HomebrewModel";

export type TokenEntity = Database["public"]["Tables"]["tokens"]["Row"];

export class TokenModel extends HomebrewModel {
    constructor(userId: string) {
        super(userId, HomebrewCategoriesEnum.Tokens);
    }

    image?: string
    grid_size_x?: number
    grid_size_y?: number
}