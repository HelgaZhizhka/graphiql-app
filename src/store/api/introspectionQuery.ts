export const introspectionQuery =
  'query IntrospectionQuery {\n  __schema {\n    queryType {\n      name\n    }\n    mutationType {\n      name\n    }\n    subscriptionType {\n      name\n    }\n    types {\n      ...FullType\n    }\n    directives {\n      name\n      description\n      locations\n      args {\n        ...InputValue\n      }\n    }\n  }\n}\n\nfragment FullType on __Type {\n  kind\n  name\n  description\n  fields(includeDeprecated: true) {\n    name\n    description\n    args {\n      ...InputValue\n    }\n    type {\n      ...TypeRef\n    }\n    isDeprecated\n    deprecationReason\n  }\n  inputFields {\n    ...InputValue\n  }\n  interfaces {\n    ...TypeRef\n  }\n  enumValues(includeDeprecated: true) {\n    name\n    description\n    isDeprecated\n    deprecationReason\n  }\n  possibleTypes {\n    ...TypeRef\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type {\n    ...TypeRef\n  }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n';

// `query IntrospectionQuery {
//       __schema {
//         queryType { name }
//         mutationType { name }
//         subscriptionType { name }
//         types {
//           ...FullType
//         }
//         directives {
//           name
//           description
//           locations
//           args {
//             ...InputValue
//           }
//         }
//       }
//     }
//     fragment FullType on __Type {
//       kind
//       name
//       description
//       fields(includeDeprecated: true) {
//         name
//         description
//         args {
//           ...InputValue
//         }
//         type {
//           ...TypeRef
//         }
//         isDeprecated
//         deprecationReason
//       }
//       inputFields {
//         ...InputValue

// `query IntrospectionQuery {
//       __schema {
//         queryType { name }
//         mutationType { name }
//         subscriptionType { name }
//         types {
//           ...FullType
//         }
//         directives {
//           name
//           description
//           locations
//           args {
//             ...InputValue
//           }
//         }
//       }
//     }
//     fragment FullType on __Type {
//       kind
//       name
//       description
//       fields(includeDeprecated: true) {
//         name
//         description
//         args {
//           ...InputValue
//         }
//         type {
//           ...TypeRef
//         }
//         isDeprecated
//         deprecationReason
//       }
//       inputFields {
//         ...InputValue

// `query IntrospectionQuery {
//       __schema {
//         queryType { name }
//         mutationType { name }
//         subscriptionType { name }
//         types {
//           ...FullType
//         }
//         directives {
//           name
//           description
//           locations
//           args {
//             ...InputValue
//           }
//         }
//       }
//     }
//     fragment FullType on __Type {
//       kind
//       name
//       description
//       fields(includeDeprecated: true) {
//         name
//         description
//         args {
//           ...InputValue
//         }
//         type {
//           ...TypeRef
//         }
//         isDeprecated
//         deprecationReason
//       }
//       inputFields {
//         ...InputValue
//       }
//       interfaces {
//         ...TypeRef
//       }
//       enumValues(includeDeprecated: true) {
//         name
//         description
//         isDeprecated
//         deprecationReason
//       }
//       possibleTypes {
//         ...TypeRef
//       }
//     }
//     fragment InputValue on __InputValue {
//       name
//       description
//       type { ...TypeRef }
//       defaultValue
//     }
//     fragment TypeRef on __Type {
//       kind
//       name
//       ofType {
//         kind
//         name
//         ofType {
//           kind
//           name
//           ofType {
//             kind
//             name
//           }
//         }
//       }
//     }
//     `;
