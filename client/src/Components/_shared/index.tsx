import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form``;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 4px;
  }
`;
