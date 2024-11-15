import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    numberRoom: string;

    @Column()
    capacity: number;

    @Column({default: true, nullable: false})
    available: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
