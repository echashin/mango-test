import { MigrationInterface, QueryRunner } from "typeorm";

export class Dev1709720208199 implements MigrationInterface {
    name = 'Dev1709720208199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createDate" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                "firstName" character varying(32) NOT NULL,
                "lastName" character varying(32) NOT NULL,
                "login" character varying(32) NOT NULL,
                "email" character varying(300) NOT NULL,
                "phone" character varying(100) NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
