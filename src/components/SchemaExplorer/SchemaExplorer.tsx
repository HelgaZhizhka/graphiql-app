import { useAppSelector } from '@/hooks';

const SchemaExplorer: React.FC = () => {
  const transformedSchema = useAppSelector((state) => state.schema.transformedSchema);

  console.log(transformedSchema);

  return (
    <div>
      <h2>Schema Explorer</h2>
    </div>
  );
};

export default SchemaExplorer;
