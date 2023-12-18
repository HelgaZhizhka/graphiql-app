import {
  IntrospectionQuery,
  IntrospectionObjectType,
  IntrospectionField,
  IntrospectionInputValue,
  IntrospectionInputTypeRef,
  IntrospectionOutputTypeRef,
} from 'graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Writable } from '@/utils/types';

interface SchemaState {
  schema: Writable<IntrospectionQuery>;
  transformedSchema: TransformedSchema;
  isLoading: boolean;
  error: string | null;
}

interface TransformedArg {
  name: string;
  description: string | null;
  type: string;
}

interface TransformedField {
  name: string;
  description: string | null;
  type: string;
  args?: TransformedArg[];
}

interface TransformedType {
  name: string;
  description: string | null;
  fields: TransformedField[];
}

type TransformedSchema = TransformedType[];

const unwrapTypeName = (type: IntrospectionOutputTypeRef): string => {
  while (type.kind === 'LIST' || type.kind === 'NON_NULL') {
    if ('ofType' in type && type.ofType) {
      type = type.ofType;
    } else {
      break;
    }
  }
  if ('name' in type) {
    return type.name;
  }
  return '';
};

const unwrapInputTypeName = (type: IntrospectionInputTypeRef): string => {
  while (type.kind === 'LIST' || type.kind === 'NON_NULL') {
    if ('ofType' in type && type.ofType) {
      type = type.ofType;
    } else {
      break;
    }
  }
  if ('name' in type) {
    return type.name;
  }
  return '';
};

const transformSchema = (schema: IntrospectionQuery): TransformedSchema => {
  const types = schema.__schema.types
    .filter(
      (type): type is IntrospectionObjectType =>
        type.kind === 'OBJECT' && !type.name.startsWith('__')
    )
    .map(transformType);

  return types;
};

const transformType = (type: IntrospectionObjectType): TransformedType => {
  const fields = type.fields ? type.fields.map(transformField) : [];
  return {
    name: type.name,
    description: type.description || null,
    fields: fields,
  };
};

const transformField = (field: IntrospectionField): TransformedField => {
  const typeName = unwrapTypeName(field.type);
  const args = field.args ? field.args.map(transformArg) : [];

  return {
    name: field.name,
    description: field.description || null,
    type: typeName,
    args: args,
  };
};

const transformArg = (arg: IntrospectionInputValue): TransformedArg => {
  const typeName = unwrapInputTypeName(arg.type);

  return {
    name: arg.name,
    description: arg.description || null,
    type: typeName,
  };
};

const initialState: SchemaState = {
  schema: {} as Writable<IntrospectionQuery>,
  transformedSchema: [],
  isLoading: false,
  error: null,
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setSchema: (state, action: PayloadAction<Writable<IntrospectionQuery>>) => {
      state.schema = action.payload;
      state.transformedSchema = transformSchema(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setSchema, setLoading, setError } = schemaSlice.actions;
export default schemaSlice.reducer;
