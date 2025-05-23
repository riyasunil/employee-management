import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDeptManagerFkName1747945021725 implements MigrationInterface {
    name = 'ChangeDeptManagerFkName1747945021725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_2147eb9946aa96094b7f78b1954"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`);
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "managerId" TO "manager_id"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "departmentId" TO "department_id"`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_4ca0fbc25538965a90575dc4a81" FOREIGN KEY ("manager_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_4ca0fbc25538965a90575dc4a81"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "department_id" TO "departmentId"`);
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "manager_id" TO "managerId"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_2147eb9946aa96094b7f78b1954" FOREIGN KEY ("managerId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
