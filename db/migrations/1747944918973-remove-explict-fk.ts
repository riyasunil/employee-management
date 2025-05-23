import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveExplictFk1747944918973 implements MigrationInterface {
    name = 'RemoveExplictFk1747944918973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "manager_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" integer`);
        await queryRunner.query(`ALTER TABLE "department" ADD "manager_id" integer`);
    }

}
