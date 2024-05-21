import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { REDIRECT_URL, STUDENT_COUCIL_URL } from "../constant/url";
import { danveryApi } from "../util/api";
import styled from "styled-components";
import { Button, Container, Contents, Titles } from "../style/styledComponents";

interface Params {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  responseType: string;
}

function SignIn() {
  const [searchParams] = useSearchParams();

  const [studentId, setStudentId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [params, setParams] = useState<Params>();

  useEffect(() => {
    setParams({
      clientId: searchParams.get("client_id") || "",
      redirectUri: searchParams.get("redirect_uri") || "",
      codeChallenge: searchParams.get("code_challenge") || "",
      codeChallengeMethod: "S256",
      responseType: "code",
    });
  }, []);

  const onStudentIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    studentId &&
      password &&
      danveryApi()
        .post("/oauth/login", {
          studentId,
          password,
          ...params,
        })
        .then((res) => {
          const { redirectUri } = res;

          if (redirectUri) {
            window.location.href = redirectUri;
            return;
          }
        })
        .catch((err) => {
          alert(err.message);
        });
  };

  const getRedirectUrl = (path: string) => {
    return `${STUDENT_COUCIL_URL}${path}?redirectUri=${REDIRECT_URL}/signin`;
  };

  return (
    <Container>
      <Titles>
        <h1>Login</h1>
        <h2>단국대학교 총학생회 로그인</h2>
      </Titles>
      <Contents>
        <Form onSubmit={onLoginSubmit}>
          <Input
            placeholder="Student ID"
            type="text"
            onChange={onStudentIdChange}
            value={studentId}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={onPasswordChange}
            value={password}
          />
          <Links>
            <a href={getRedirectUrl("/signup/terms")}>회원가입</a>
            <span>|</span>
            <a href={getRedirectUrl("/reset/idpw")}>Forgot ID/PW?</a>
          </Links>
          <Button type="submit">로그인</Button>
        </Form>
      </Contents>
    </Container>
  );
}

export default SignIn;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 25px;
  background-color: rgb(237, 237, 237);
  font-size: 18px;
  border: none;
  border-radius: 10px;
  outline: none;

  &::placeholder {
    color: rgb(160, 160, 160);
  }

  &:focus {
    outline: none;
    border-radius: 10px;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  color: black;

  a {
    color: black;
    text-decoration: none;
  }
`;
