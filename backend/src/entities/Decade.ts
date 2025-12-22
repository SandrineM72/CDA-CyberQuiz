import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    // CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    // UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({type : "text", nullable : false})
    name: string;

@OneToMany(
    () => Decade,
(decade): decade.quiz,
)
decades: Decade[];
}
