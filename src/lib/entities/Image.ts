import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Image extends BaseEntity {
    constructor() {
        super();
        this.scale = 100;
        this.positionLeft = 0;
        this.positionTop = 0;
    }

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