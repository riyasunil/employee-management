import {Column, Entity, OneToOne} from 'typeorm'
import Abstract from './abstract.entity';
import Employee from './employee.entity';

@Entity() class Address extends Abstract{
    @Column() line1: string;
    @Column() pincode: string;

    @OneToOne(() => Employee, (employee) => employee.address)
    employee : Employee
}

export default Address