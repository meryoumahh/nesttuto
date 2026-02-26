import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({ type: 'varchar', length: 30 ,unique: true })
  username: string;
  @Column({type: 'varchar'})
  password: string;
}