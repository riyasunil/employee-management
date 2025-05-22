import {  CreateDateColumn,  UpdateDateColumn,DeleteDateColumn, PrimaryGeneratedColumn} from 'typeorm'

class Abstract{
    @PrimaryGeneratedColumn() id :number;
    @CreateDateColumn() createdAt: Date;
    @UpdateDateColumn() updatedAt: Date;
    @DeleteDateColumn() deletedAt: Date //soft remove -> want to keep the record, but has to be shown as delete
}

export default Abstract