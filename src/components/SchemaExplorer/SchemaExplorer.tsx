import { useAppSelector } from '@/hooks';

import styles from './SchemaExplorer.module.scss';

const SchemaExplorer: React.FC = () => {
  const printSchema = useAppSelector((state) => state.schema.printSchema);
  const parseSchemaString = () => {
    return printSchema
      .split(/[\n,]+/)
      .filter((line) => {
        const trimmedLine = line.trim();
        return (
          !trimmedLine.startsWith('schema') &&
          !trimmedLine.startsWith('query: Root') &&
          trimmedLine !== '}'
        );
      })
      .map((line, index) => {
        const cleanedLine = line.replace(/"""/g, '');

        if (
          cleanedLine.startsWith('type Query') ||
          cleanedLine.startsWith('type Mutation') ||
          cleanedLine.startsWith('type Subscription')
        ) {
          return (
            <div key={index} style={{ fontWeight: 'bold', fontSize: 'larger' }}>
              {cleanedLine}
            </div>
          );
        } else if (cleanedLine.startsWith('type ')) {
          return (
            <div key={index} style={{ fontWeight: 'bold' }}>
              {cleanedLine}
            </div>
          );
        } else if (cleanedLine.includes(':')) {
          return (
            <div key={index} style={{ marginLeft: '1rem' }}>
              {cleanedLine}
            </div>
          );
        } else {
          return (
            <pre className={styles.pre} key={index}>
              {cleanedLine}
            </pre>
          );
        }
      });
  };

  return <div className={styles.root}>{parseSchemaString()}</div>;
};

export default SchemaExplorer;
