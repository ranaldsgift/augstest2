import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class TimestampedEntity extends BaseEntity {
    @CreateDateColumn({ type: "timestamptz" })
    dateCreated: Date
    
    @UpdateDateColumn({ type: "timestamptz" })
    dateModified: Date
}