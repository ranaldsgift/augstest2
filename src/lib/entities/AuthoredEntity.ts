import { Type } from "class-transformer";
import { Column, JoinColumn, ManyToOne } from "typeorm"
import { TimestampedEntity } from "./TimestampedEntity";
import { User } from "./User";


export abstract class AuthoredEntity extends TimestampedEntity {
    @Type(() => User)
    @ManyToOne(type => User, { nullable: false, eager: true })
    @JoinColumn()
    user: User

    @Column("boolean", { default: false })
    public isDeleted: boolean;
}
