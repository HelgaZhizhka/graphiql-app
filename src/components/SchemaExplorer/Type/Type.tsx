import { useState } from 'react';
import { IntrospectionType } from 'graphql';

import { Field } from '../Field';

type Props = {
  type: IntrospectionType;
};

const Type: React.FC<Props> = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h3 onClick={handleClick}>{type.name}</h3>
      {isOpen && (
        <div>
          <p>{type.description}</p>
          {'fields' in type &&
            type.fields.map((field, index: number) => <Field key={index} field={field} />)}
        </div>
      )}
    </div>
  );
};

export default Type;
