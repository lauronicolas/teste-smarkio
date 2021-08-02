import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createComments1627656389790 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "comments",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "comment",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "ceated_at",
                    type: "datetime",
                    default: new Date()
                },
                {
                    name: "updated_at",
                    type: "datetime",
                    default: new Date()
                },
            ]
        }), true)
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments');
    }

}
