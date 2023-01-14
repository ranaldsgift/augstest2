import { Type } from "class-transformer";
import { JoinColumn, ManyToOne } from "typeorm"
import { TimestampedEntity } from "./TimestampedEntity";
import { User } from "./User";


export abstract class AuthoredEntity extends TimestampedEntity {
    @Type(() => User)
    @ManyToOne(type => User, { nullable: false, eager: true })
    @JoinColumn()
    user: User
}
