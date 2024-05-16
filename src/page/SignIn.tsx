import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { REDIRECT_URL, STUDENT_COUCIL_URL } from "../constant/url";
import { danveryApi } from "../util/api";

interface Params {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  codeChallengeMethod: string;
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
          if (res.type === "opaqueredirect") {
            window.location.href = res.url;
            return;
          }

          throw new Error("로그인 페이지 이동에 실패했습니다.");
        })
        .catch((err) => {
          alert(err.message);
        });
  };

  const getRedirectUrl = (path: string) => {
    return `${STUDENT_COUCIL_URL}${path}?redirectUri=${REDIRECT_URL}/signin`;
  };

  return (
    <div>
      <h1>단국대학교 총학생회</h1>
      <form onSubmit={onLoginSubmit}>
        <input placeholder="학번" onChange={onStudentIdChange} />
        <input placeholder="비밀번호" onChange={onPasswordChange} />
        <button type="submit">로그인</button>
      </form>
      <a href={getRedirectUrl("/signup/terms")}>회원가입</a>
      <a href={getRedirectUrl("/reset/idpw")}>Forgot ID/PW?</a>
    </div>
  );
}

export default SignIn;
