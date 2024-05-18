import React from "react";
import { Container, Contents, Titles } from "../style/styledComponents";
import styled from "styled-components";

const Policy = () => {
  const SERVICE_NAME = "Text Me!";
  const USER = "kce3615@naver.com";
  return (
    <Container>
      <Titles>
        <h1>단국대학교 총학생회</h1>
        <h2>개인정보 제3자 제공 동의 안내</h2>
      </Titles>
      <Contents>
        <Section>
          {SERVICE_NAME} 서비스의 이용자 식별, 회원관리 및 서비스 제공을
          목적으로 회원번호와 함께 {USER} 님의 개인정보를 제공합니다. 해당
          정보는 동의를 철회하거나 서비스를 탈퇴할 시 즉시 삭제 됩니다. 이용자는
          아래 동의를 거부할 권리가 있으며, 필수 항목에 대한 동의를 거부하면
          서비스 이용이 제한될 수 있습니다. 선택 항목에 대한 동의를 거부하면
          특정 서비스 이용에 제한이 있을 수 있습니다.
        </Section>
        <hr />
        <Section>
          <div>
            <h3>제공받는 자</h3>
            <span>{SERVICE_NAME}</span>
          </div>
        </Section>
        <hr />
        <Section>
          <div>
            <h4>필수 제공 항목</h4>
            <span>닉네임, 학번, 학과, 전공</span>
          </div>
          <div>
            <h4>선택 제공 항목</h4>
            <span>어쩌고</span>
          </div>
          <div>
            <h4>제공 목적</h4>
            <span>
              {SERVICE_NAME} 서비스 내 이용자 식별, 회원관리 및 서비스 제공
            </span>
          </div>
          <div>
            <h4>보유 기간</h4>
            <span>동의 철회 또는 서비스 탈퇴 시 지체없이 파기</span>
          </div>
        </Section>
      </Contents>
    </Container>
  );
};

export default Policy;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  line-height: 24px;

  h3 {
    margin-top: 0;
    margin-bottom: 5px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 3px;
  }
`;
