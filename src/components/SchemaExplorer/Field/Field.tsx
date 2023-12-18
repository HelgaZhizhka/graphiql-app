import { IntrospectionField } from 'graphql';

type Props = {
  field: IntrospectionField;
};

const Field: React.FC<Props> = ({ field }) => {
  let typeName: string = '';
  if ('name' in field) {
    typeName = field.name;
  }

  return (
    <div>
      <h4>{field.name}</h4>
      <p>{field.description}</p>
      <p>Type: {typeName}</p>
      {field.args.length > 0 && (
        <div>
          <h5>Arguments:</h5>
          {field.args.map((arg, index) => {
            let argTypeName: string = '';
            if ('name' in arg) {
              argTypeName = arg.name;
            }
            return (
              <p key={index}>
                {arg.name} ({argTypeName})
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Field;
