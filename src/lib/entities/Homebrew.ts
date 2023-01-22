import { AugsLicensesEnum } from "$lib/enums/Enums";
import { Entity, Column, PrimaryGeneratedColumn, TableInheritance, OneToMany } from "typeorm"
import { AuthoredEntity } from "./AuthoredEntity";
import { UserHomebrewFavorite } from "./UserHomebrewFavorite";

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

    @OneToMany(() => UserHomebrewFavorite, (save) => save.homebrew)
    public userFavorites: UserHomebrewFavorite[]

    @Column("varchar")
    public type: string
}