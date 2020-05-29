/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
    }
  }
`;
export const createScannedCode = /* GraphQL */ `
  mutation CreateScannedCode($input: CreateScannedCodeInput!) {
    createScannedCode(input: $input) {
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
export const updateScannedCode = /* GraphQL */ `
  mutation UpdateScannedCode($input: UpdateScannedCodeInput!) {
    updateScannedCode(input: $input) {
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
export const deleteScannedCode = /* GraphQL */ `
  mutation DeleteScannedCode($input: DeleteScannedCodeInput!) {
    deleteScannedCode(input: $input) {
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
