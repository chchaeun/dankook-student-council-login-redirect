import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Container, Contents, Titles } from "../style/styledComponents";
import CheckFilled from "../style/icon/CheckFilled";
import CheckOutlined from "../style/icon/CheckOutlined";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import privacyInformation from "../constant/privacyInformation";
import { danveryApi } from "../util/api";

const Terms = () => {
  const [searchParams] = useSearchParams();
  const [urlParams] = useState({
    clientId: searchParams.get("client_id"),
    redirectUri: searchParams.get("redirect_uri"),
    responseType: searchParams.get("response_type"),
    codeChallenge: searchParams.get("code_challenge"),
    codeChallengeMethod: searchParams.get("code_challenge_method"),
    scope: searchParams.get("scope"),
    studentId: searchParams.get("student_id"),
    applicationName: searchParams.get("application_name"),
  });

  const OPTIONAL: string[] = [];

  const [totalAgree, setTotalAgree] = useState(false);
  const [requiredAgree, setRequiredAgree] = useState(false);
  const [optionalAgrees, setOptionalAgrees] = useState(
    OPTIONAL.length > 0
      ? OPTIONAL.map((o) => ({ checked: false, value: o }))
      : []
  );

  useEffect(() => {
    if (!requiredAgree || optionalAgrees.find((o) => !o.checked)) {
      setTotalAgree(false);
    } else {
      setTotalAgree(true);
    }
  }, [requiredAgree, optionalAgrees]);

  const totalAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = e;
    setTotalAgree(checked);
    setRequiredAgree(checked);
    setOptionalAgrees((p) => p.map((o) => ({ ...o, checked })));
  };

  const requiredAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = e;

    setRequiredAgree(checked);

    if (checked && !optionalAgrees.find((o) => !o.checked)) {
      setTotalAgree(true);
    } else {
      setTotalAgree(false);
    }
  };

  const optionalAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked, value },
    } = e;

    setOptionalAgrees((prev) => {
      const newOptionalAgrees = prev.map((element) =>
        element.value === value ? { ...element, checked } : element
      );

      if (requiredAgree && !newOptionalAgrees.find((o) => !o.checked)) {
        setTotalAgree(true);
      } else {
        setTotalAgree(false);
      }

      return newOptionalAgrees;
    });
  };

  const agreeClick = () => {
    const {
      studentId,
      clientId,
      redirectUri,
      codeChallenge,
      codeChallengeMethod,
      scope,
      responseType,
    } = urlParams;

    danveryApi()
      .post("/oauth/terms", {
        studentId,
        clientId,
        redirectUri,
        codeChallenge,
        codeChallengeMethod,
        scope,
        responseType,
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

  return (
    <Container>
      <Titles>
        <h1>Terms and Conditions</h1>
        <h2>단국대학교 총학생회 로그인</h2>
      </Titles>
      <Contents>
        <Section>
          <TotalAgreeLabel>
            <input
              type="checkbox"
              checked={totalAgree}
              onChange={totalAgreeChange}
              tabIndex={1}
            />
            {totalAgree ? (
              <CheckFilled size={22} aria-hidden />
            ) : (
              <CheckOutlined size={22} aria-hidden />
            )}
            <span>전체 동의하기</span>
          </TotalAgreeLabel>
          <p>
            전체동의는 선택목적에 대한 동의를 포함하고 있으며, 선택목적에 대한
            동의를 거부해도 서비스 이용이 가능합니다.
          </p>
        </Section>
        <hr />
        <Section>
          {urlParams.applicationName} 서비스 제공을 위해 회원번호와 함께
          개인정보가 제공됩니다. 개인정보 제공항목은 동의 항목에서 확인하실 수
          있습니다. 개인정보 제3자 제공 동의 안내는 아래의 '자세히'를 통해
          확인하실 수 있습니다. 해당 정보는 동의 철회 혹은 서비스 탈퇴 시
          지체없이 파기됩니다.
        </Section>
        <hr />
        <Section>
          <RowBetween>
            <AgreeLabel>
              {requiredAgree ? (
                <CheckFilled size={18} aria-hidden />
              ) : (
                <CheckOutlined size={18} aria-hidden />
              )}
              <input
                type="checkbox"
                checked={requiredAgree}
                onChange={requiredAgreeChange}
                tabIndex={1}
              />
              [필수] 단국대 총학생회 개인정보 제3자 제공 동의
              <br />
            </AgreeLabel>
            <a
              href={`/privacy?student_id=${urlParams.studentId}&application_name=${urlParams.applicationName}`}
              target="_blank"
            >
              자세히
            </a>
          </RowBetween>
          <RequiredPrivacy>
            {urlParams.scope
              ?.split(" ")
              .map((info) => privacyInformation.get(info) || "")
              .join(", ")
              .slice(0, -2)}
          </RequiredPrivacy>
          {OPTIONAL.length > 0 && (
            <OptionalAgreeContainer>
              <RowBetween>
                [선택] 단국대 총학생회 개인정보 제3자 제공 동의
                <a
                  href={`/privacy?student_id=${urlParams.studentId}&application_name=${urlParams.applicationName}`}
                >
                  자세히
                </a>
              </RowBetween>
              {optionalAgrees?.map((oa) => (
                <AgreeLabel>
                  <input
                    type="checkbox"
                    value={oa.value}
                    checked={oa.checked}
                    onChange={optionalAgreeChange}
                    tabIndex={1}
                  />
                  {oa.checked ? (
                    <CheckFilled size={18} aria-hidden />
                  ) : (
                    <CheckOutlined size={18} aria-hidden />
                  )}
                  {oa.value}
                </AgreeLabel>
              ))}
            </OptionalAgreeContainer>
          )}
        </Section>
        <Button type="button" disabled={!requiredAgree} onClick={agreeClick}>
          동의하고 계속하기
        </Button>
      </Contents>
    </Container>
  );
};

export default Terms;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-inline: 10px;
  padding-block: 20px;
  font-size: 14px;

  p {
    margin: 0;
  }
`;

const TotalAgreeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;

  input {
    position: absolute;
    margin: 0px;
    padding-inline: 12px;
    padding-block: 13px;
  }

  input:focus:not(:focus-visible) {
    outline: 0;
  }
`;

const AgreeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;

  input {
    position: absolute;
    margin: 0px;
    padding-inline: 10px;
    padding-block: 11px;
  }
  input:focus:not(:focus-visible) {
    outline: 0;
  }
`;

const OptionalAgreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left: 26px;
`;

const RowBetween = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  a {
    text-decoration: underline;
    color: gray;
    cursor: pointer;
  }
`;

const RequiredPrivacy = styled.div`
  margin-left: 27px;
  color: gray;
`;
