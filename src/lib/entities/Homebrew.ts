import { AugsLicensesEnum } from "$lib/enums/Enums";
import { Entity, Column, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import { AuthoredEntity } from "./AuthoredEntity";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Homebrew extends AuthoredEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar")
    name: string
    
    @Column("text", { nullable: true })
    description: string
    
    @Column("varchar", { nullable: true })
    originalImage: string
    
    @Column({
        type: "enum",
        enum: AugsLicensesEnum,
        default: AugsLicensesEnum.Homebrew
    })
    augsLicense: AugsLicensesEnum
}