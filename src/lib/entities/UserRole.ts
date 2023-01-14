import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class UserRole extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    name: string
    
    @Column("varchar")
    color: string
}