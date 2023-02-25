import { Type } from "class-transformer"
import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class TimestampedEntity extends BaseEntity {
    @Type(() => Date)
    @CreateDateColumn({ type: "timestamptz" })
    dateCreated: Date
    
    @Type(() => Date)
    @UpdateDateColumn({ type: "timestamptz" })
    dateModified: Date
}