import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar")
    url: string

    @Column("smallint", { nullable: true })
    scale: number

    @Column("smallint", { nullable: true })
    positionLeft: number
    
    @Column("smallint", { nullable: true })
    positionTop: number
}