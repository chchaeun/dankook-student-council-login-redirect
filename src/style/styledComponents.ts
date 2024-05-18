import styled from "styled-components";

const Layout = styled.div`
  height: calc(var(--vh, 1vh) * 100);

  @media ${({ theme }) => theme.device.large} {
    width: 480px;
    margin: 0 auto;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 10rem;
  background: black;
  color: white;
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 20px;
  margin-bottom: 50px;

  gap: 10px;

  h1 {
    margin: 0;
  }

  h2 {
    margin: 0;
    font-size: 20px;
  }
`;

const Contents = styled.div`
  height: 100%;
  padding-top: 80px;
  padding-inline: 20px;
  margin-inline: -1px;

  background: white;
  border-radius: 1.5rem 1.5rem 0 0;
  color: black;

  hr {
    background: lightgray;
    height: 1px;
    border: 0;
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
  background-color: ${(p) => (p.disabled ? "lightgray" : "black")};
  color: white;
  border: none;
  border-radius: 15px;
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};

  &:focus {
    outline: none;
    border-radius: 15px;
  }
`;

export { Layout, Container, Titles, Contents, Button };
