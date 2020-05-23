import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AlterFieldProviderToProviderId1588700054218
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameColumn('appointments', 'provider', 'provider_id');

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentForeignKey',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentForeignKey');
    await queryRunner.renameColumn('appointments', 'provider_id', 'provider');
  }
}
