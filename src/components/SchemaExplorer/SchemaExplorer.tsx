import { useAppSelector } from '@/hooks';

import { useLocale } from '@/contexts/Locale/LocaleProvider';
import styles from './SchemaExplorer.module.scss';

export const formatSchemaString = (schemaString: string) => {
  const lines = schemaString.split(/\n/);
  return lines.map((line, index) => {
    if (line.includes('"""')) {
      const description = line.replace(/"""/g, '').trim();

      const isTypeDefinition = description.startsWith('type ');

      if (isTypeDefinition) {
        return (
          <div key={index} style={{ fontWeight: '700' }}>
            {description}
          </div>
        );
      } else {
        return (
          <div key={index} style={{ fontStyle: 'italic' }}>
            {description}
          </div>
        );
      }
    } else {
      return (
        <pre className={styles.pre} key={index}>
          {line}
        </pre>
      );
    }
  });
};

const SchemaExplorer: React.FC = () => {
  const { state } = useLocale();
  const { strings } = state;
  const printSchema = useAppSelector((state) => state.schema.printSchema);

  if (!printSchema) {
    return <div>{strings.comingSoon}...</div>;
  }

  const formateSchemaString = formatSchemaString(printSchema);

  return <div className={styles.root}>{formateSchemaString}</div>;
};

export default SchemaExplorer;
