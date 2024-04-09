import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "./api";

interface Params {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  scope: string;
  responseType: string;
}

function SignIn() {
  const [searchParams] = useSearchParams();

  const [studentId, setStudentId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [params, setParams] = useState<Params>();

  useEffect(() => {
    setParams({
      clientId: searchParams.get("clientId") || "",
      redirectUri: searchParams.get("redirectUri") || "",
      codeChallenge: searchParams.get("codeChallenge") || "",
      codeChallengeMethod: searchParams.get("codeChallengeMethod") || "",
      scope: searchParams.get("scope") || "",
      responseType: searchParams.get("responseType") || "",
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
      api().post("/oauth/login", {
        studentId,
        password,
        ...params,
      });
  };

  return (
    <div>
      <h1>단국대학교 총학생회</h1>
      <form onSubmit={onLoginSubmit}>
        <input placeholder="학번" onChange={onStudentIdChange} />
        <input placeholder="비밀번호" onChange={onPasswordChange} />
        <button type="submit">로그인</button>
      </form>
      <a>회원가입</a>
      <a>비밀번호 찾기</a>
    </div>
  );
}

export default SignIn;
