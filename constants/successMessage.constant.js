import { deepFreeze } from "../utils/deepFreeze.js";

export const SuccessMessages = deepFreeze({
  SIGNUP_SUCCESS: "회원가입에 성공했습니다.",
  LOGIN_SUCCESS: "로그인에 성공했습니다.",
  LOGOUT_SUCCESS: "로그아웃 되었습니다.",

  // 게시물
  CONTENT_SUCCESS: "게시물이 작성되었습니다.",
  READ_SUCCESS: "게시물 전체 조회에 성공했습니다.",
  READDET_SUCCESS: "게시물 상세 조회에 성공했습니다.",
  UPDATE_SUCCESS: "게시물이 수정되었습니다.",
  DELETE_SUCCESS: "게시물이 삭제되었습니다.",
  TOKEN_REFRESH_SUCCESS: "토큰 갱신에 성공하였습니다.",

  // 회원조회
  PROFILE_LODING_SUCCESS: "프로필을 성공적으로 확인하였습니다.",
  PROFILE_MODIFY_SUCCESS: "프로필이 수정되었습니다.",

  // 댓글
  COMMENT_SUCCESS: "댓글이 작성되었습니다.",
  COMMENT_READ_SUCCESS: "댓글 전체 조회에 성공했습니다.",
  COMMENT_UPT_SUCCESS: "댓글이 수정되었습니다.",
  COMMENT_DEL_SUCCESS: "댓글이 삭제되었습니다."
});
