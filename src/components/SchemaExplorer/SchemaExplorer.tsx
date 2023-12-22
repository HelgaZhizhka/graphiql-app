import { useAppSelector } from '@/hooks';

import styles from './SchemaExplorer.module.scss';

const formatSchemaString = (schemaString: string) => {
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

type Props = {
  isLoading: boolean;
};

const SchemaExplorer: React.FC<Props> = ({ isLoading }) => {
  const printSchema = useAppSelector((state) => state.schema.printSchema);

  if (isLoading) {
    return <div>Schema coming soon...</div>;
  }

  const formateSchemaString = formatSchemaString(printSchema);

  return <div className={styles.root}>{formateSchemaString}</div>;
};

export default SchemaExplorer;
