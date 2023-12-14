import { useAppSelector } from '@/hooks';

const SchemaExplorer: React.FC = () => {
  const schema = useAppSelector((state) => state.schema.schema);

  console.log(schema);

  return <div>coming soon</div>;
};

export default SchemaExplorer;
