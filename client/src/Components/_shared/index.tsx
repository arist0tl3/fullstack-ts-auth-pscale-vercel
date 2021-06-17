import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const UnstyledLink = styled(Link)`
  text-decoration: none;
`;

export const Container = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > * {
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 4px;
  }
`;
