/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
`;
export const getScannedCode = /* GraphQL */ `
  query GetScannedCode($id: ID!) {
    getScannedCode(id: $id) {
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
export const listScannedCodes = /* GraphQL */ `
  query ListScannedCodes(
    $filter: TableScannedCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScannedCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        data
        type
        category
        name
        description
        dateStr
      }
      nextToken
    }
  }
`;
