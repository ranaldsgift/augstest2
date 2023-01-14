import { BaseEntity, BeforeInsert, BeforeUpdate, Column } from "typeorm"

export abstract class TimestampedEntity extends BaseEntity {
    @BeforeInsert()
    handleInsert() {
        const currentDate = new Date();
        this.dateCreated = currentDate;
        this.dateModified = currentDate;
    }

    @BeforeUpdate()
    handleUpdate() {
        this.dateModified = new Date();
    }

    @Column({ type: "timestamptz", default: new Date().toISOString() })
    dateCreated: Date
    
    @Column({ type: "timestamptz", default: new Date().toISOString() })
    dateModified: Date
    
    @Column({ type: "bool", default: false })
    isDeleted: boolean
}