import styled, { css } from 'styled-components';

export const Title = styled.h3`
  font-weight: 500;
`;

export const List = styled.ul`
  list-style-type: none;

  margin: 0 auto;
  padding: 0;
`;

export const Item = styled.li`
  max-width: 20rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  text-align: center;
  transition: all 0.35s ease 0s;
  cursor: pointer;

  ${(props) =>
    props.completed &&
    css`
      text-decoration: line-through;
      color: #ccc;
    `};

  &:hover {
    transform: scale(1.25);
  }
`;

export const Button = styled.button`
  width: 20%;
  padding: 5px 10px;
  margin: 1rem 0.5rem;
  border-radius: 5px;
  background-color: #f0f8ff;
  cursor: pointer;
  outline: none;
  border-color: #d1d5d9;

  &:hover {
    background-color: #a9a9a9;
  }
`;
