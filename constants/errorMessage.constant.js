import { deepFreeze } from "../utils/deepFreeze.js";

export const ErrorMessages = deepFreeze({
  MISSING_EMAIL: "이메일을 입력해주세요.",
  MISSING_PASSWORD: "비밀번호 혹은 비밀번호 재확인을 입력해주세요.",
  MISSING_NAME: "이름을 입력해주세요.",
  ALREADY_REGISTERED: "이미 가입 된 이메일입니다.",
  PASSWORD_MISMATCH: "비밀번호와 비밀번호 재확인이 일치하지 않습니다.",
  SHORT_PASSWORD: "비밀번호를 6자리 이상 입력해주세요.",
  INVALID_EMAIL: "이메일 형식이 올바르지 않습니다.",
  INVALID_DATA: "데이터 형식이 올바르지 않습니다.",
  INVALID_STATUS: "상태 값이 잘못되었습니다.",
  USER_NOT_FOUND: "해당 이메일을 가진 사용자를 찾을 수 없습니다.",
  INVALID_LOGIN_INFO: "이메일 혹은 비밀번호가 일치하지 않습니다.",
  UNVERIFIED_EMAIL: "이메일 인증이 필요합니다.",
  SERVER_ERROR: "서버 내부 오류가 발생하였습니다.",
  MISSING_TOKEN: "헤더에 유효한 토큰이 없습니다.",
  INVALID_USER: "유효한 사용자가 아닙니다.",
  INVALID_TOKEN: "유효하지 않은 토큰입니다.",
  TOKEN_EXPIRED: "토큰의 유효기간이 지났습니다.",
  TOKEN_VERIFICATION_FAILED: "토큰 검증에 실패하였습니다.",
  //게시물
  MISSING_TITLE: "게시물 제목을 입력해주세요.",
  MISSING_CONTENT: "게시물 내용을 입력해주세요.",
  MISSING_USERID: "사용자ID 조회에 실패하였습니다.",
  MISSINGDET_CONTENT: "게시물 상세조회에 실패하였습니다.",
  UNAUTHORIZED_CONTENT: "게시물을 수정할 권한이 없습니다.",

  // 회원정보 수정
  PRORILE_NOT_MODIFY: "수정된 내용이 없습니다.",

  // 댓글
  MISSING_CONTENTID: "게시물 조회에 실패하였습니다.",
  UNAUTHORIZED_COMMENT: "댓글을 수정할 권한이 없습니다.",
  INVALID_USERID_POST: "댓글의 게시물 또는 사용자ID 조회에 실패하였습니다."
});
