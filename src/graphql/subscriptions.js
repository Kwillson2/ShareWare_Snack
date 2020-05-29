/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
    }
  }
`;
export const onCreateScannedCode = /* GraphQL */ `
  subscription OnCreateScannedCode(
    $id: ID
    $code: String
    $data: String
    $type: Int
    $category: String
  ) {
    onCreateScannedCode(
      id: $id
      code: $code
      data: $data
      type: $type
      category: $category
    ) {
      id
      code
      data
      type
      category
      name
      description
      dateStr
    }
  }
`;
export const onUpdateScannedCode = /* GraphQL */ `
  subscription OnUpdateScannedCode(
    $id: ID
    $code: String
    $data: String
    $type: Int
    $category: String
  ) {
    onUpdateScannedCode(
      id: $id
      code: $code
      data: $data
      type: $type
      category: $category
    ) {
      id
      code
      data
      type
      category
      name
      description
      dateStr
    }
  }
`;
export const onDeleteScannedCode = /* GraphQL */ `
  subscription OnDeleteScannedCode(
    $id: ID
    $code: String
    $data: String
    $type: Int
    $category: String
  ) {
    onDeleteScannedCode(
      id: $id
      code: $code
      data: $data
      type: $type
      category: $category
    ) {
      id
      code
      data
      type
      category
      name
      description
      dateStr
    }
  }
`;
