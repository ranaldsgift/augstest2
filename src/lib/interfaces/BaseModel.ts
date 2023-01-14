import { Type } from "class-transformer";

export interface IEntityModel {
    id?: number | string
}

export abstract class BaseModel implements IEntityModel {
    @Type(() => Number)
    id?: number | string

    public static getType(): string {
        return (this as any).name;
    }
}