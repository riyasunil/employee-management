import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployee1747816211580 implements MigrationInterface {
    name = 'CreateEmployee1747816211580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
