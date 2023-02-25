import { DataHelper } from "$lib/helpers/DataHelper";
import { Exclude, Type } from "class-transformer";
import { AfterUpdate, BeforeUpdate, Column, JoinColumn, ManyToOne } from "typeorm"
import { TimestampedEntity } from "./TimestampedEntity";
import { User } from "./User";


export abstract class AuthoredEntity extends TimestampedEntity {
    @Type(() => User)
    @ManyToOne(type => User, { nullable: false, eager: true })
    @JoinColumn()
    user: User

    @Column("boolean", { default: false })
    public isDeleted: boolean;

    @Exclude()
    public serializedSavedEntity: string;

    public isDirty() {
        return this.serializedSavedEntity !== DataHelper.serialize(this);
    }
}
