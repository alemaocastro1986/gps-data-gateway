import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export class DefaultColumns {
  public static getIDColumn(name: string): TableColumnOptions[] {
    const columns: TableColumnOptions[] = [];
    columns.push({
      name: name,
      type: 'varchar',
      isPrimary: true,
      isNullable: false,
      isGenerated: true,
      generationStrategy: 'uuid',
    });

    return columns;
  }

  public static getDateAt({
    name,
    defaultValue = 'GETDATE()',
    type = 'timestamp',
  }): TableColumnOptions {
    return {
      name,
      isNullable: false,
      default: `'${defaultValue}'`,
      type,
    };
  }
}
