import { MigrationInterface, QueryRunner } from "typeorm";

export class Dev1721486217376 implements MigrationInterface {
    name = 'Dev1721486217376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "post" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createDate" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                "text" text NOT NULL,
                CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7b9b8aea3499c0f0be71cc9c9e" ON "post" ("createDate")
        `);
        await queryRunner.query(`
            CREATE TABLE "post_3month" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createDate" TIMESTAMP NOT NULL DEFAULT now(),
                "update_date" TIMESTAMP NOT NULL DEFAULT now(),
                "text" text NOT NULL,
                CONSTRAINT "CHK_c182dcf56eed274d8234e944c5" CHECK (
                    "createDate" >= CURRENT_TIMESTAMP - INTERVAL '21 days'
                ),
                CONSTRAINT "PK_c16f6fa03bd6051da95c0f8887e" PRIMARY KEY ("id")
            )  INHERITS "post"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_84684fd5f6ccb189d995f00f22" ON "post_3month" ("createDate")
        `);
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
        await queryRunner.query(`
            DROP INDEX "public"."IDX_84684fd5f6ccb189d995f00f22"
        `);
        await queryRunner.query(`
            DROP TABLE "post_3month"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_7b9b8aea3499c0f0be71cc9c9e"
        `);
        await queryRunner.query(`
            DROP TABLE "post"
        `);
    }

}
