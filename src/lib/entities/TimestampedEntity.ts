import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class TimestampedEntity extends BaseEntity {
    @CreateDateColumn({ type: "timestamptz" })
    dateCreated: Date
    
    @UpdateDateColumn({ type: "timestamptz" })
    dateModified: Date
    
    @Column({ type: "bool", default: false })
    isDeleted: boolean
}