import { DataHelper } from "$lib/helpers/DataHelper";
import { Exclude } from "class-transformer";
import { AfterLoad, BaseEntity as TypeORMBaseEntity, Column, JoinColumn, ManyToOne } from "typeorm"


export abstract class BaseEntity extends TypeORMBaseEntity {
    @AfterLoad()
    public setInitialInstance() {
        this.initialInstanceSerialized = DataHelper.serialize(this);
    }

    @Column("boolean")
    public isDeleted: boolean;

    @Exclude()
    private initialInstanceSerialized: string;

    public isDirty(): boolean {
        return this.initialInstanceSerialized !== DataHelper.serialize(this);
    }

    public revertToInitialInstance() {
        // undo user changes by resetting object to initial state
    }
}
