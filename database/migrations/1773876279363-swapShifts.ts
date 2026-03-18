import { MigrationInterface, QueryRunner } from "typeorm";

export class SwapShifts1773876279363 implements MigrationInterface {
    name = 'SwapShifts1773876279363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shifts" ("id" SERIAL NOT NULL, "employeeId" integer NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "isSwapped" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_84d692e367e4d6cdf045828768c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_737991e10350d9626f592894ce" UNIQUE ("userId"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "swap_requests" ("id" SERIAL NOT NULL, "proposingEmployeeId" integer NOT NULL, "proposingShiftId" integer NOT NULL, "targetEmployeeId" integer NOT NULL, "targetShiftId" integer NOT NULL, "status" "public"."swap_requests_status_enum" NOT NULL DEFAULT 'PENDING_RECIPIENT', "managerId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a3a8b292e0e8df37acbc47e648" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD CONSTRAINT "FK_ac74b69d4e1307cf392660ace63" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_737991e10350d9626f592894cef" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_requests" ADD CONSTRAINT "FK_aa00aba94a57547db41e7b8f3ad" FOREIGN KEY ("proposingEmployeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_requests" ADD CONSTRAINT "FK_3c7231e56b669dd87e89df0cc8b" FOREIGN KEY ("proposingShiftId") REFERENCES "shifts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_requests" ADD CONSTRAINT "FK_9c7dbd05bb4b3e1fc4380739bc4" FOREIGN KEY ("targetEmployeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_requests" ADD CONSTRAINT "FK_355df690d5f4bde3a9686b49662" FOREIGN KEY ("targetShiftId") REFERENCES "shifts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swap_requests" ADD CONSTRAINT "FK_8bf79bbdce6abb082b7ba741de1" FOREIGN KEY ("managerId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "swap_requests" DROP CONSTRAINT "FK_8bf79bbdce6abb082b7ba741de1"`);
        await queryRunner.query(`ALTER TABLE "swap_requests" DROP CONSTRAINT "FK_355df690d5f4bde3a9686b49662"`);
        await queryRunner.query(`ALTER TABLE "swap_requests" DROP CONSTRAINT "FK_9c7dbd05bb4b3e1fc4380739bc4"`);
        await queryRunner.query(`ALTER TABLE "swap_requests" DROP CONSTRAINT "FK_3c7231e56b669dd87e89df0cc8b"`);
        await queryRunner.query(`ALTER TABLE "swap_requests" DROP CONSTRAINT "FK_aa00aba94a57547db41e7b8f3ad"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_737991e10350d9626f592894cef"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP CONSTRAINT "FK_ac74b69d4e1307cf392660ace63"`);
        await queryRunner.query(`DROP TABLE "swap_requests"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "shifts"`);
    }

}
