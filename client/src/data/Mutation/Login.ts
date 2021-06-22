import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($input: LoginInput!){
    login(input: $input){
      id
      email
      token
    }
  }
`;

export default LOGIN;