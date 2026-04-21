import AuthCard from '../components/auth/AuthCard'
import AuthInput from '../components/auth/AuthInput'
import AuthSocialButton from '../components/auth/AuthSocialButton'

type LoginPageProps = {
  onGoSignup: () => void
}

export default function LoginPage({ onGoSignup }: LoginPageProps) {
  return (
    <AuthCard>
      <AuthInput id="login-id" label="아이디" placeholder="아이디를 입력해주세요" />
      <AuthInput
        id="login-password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        showEyeIcon
      />
      <div className="auth-options">
        <label className="remember-me">
          <input type="checkbox" />
          <span>자동 로그인</span>
        </label>
        <a href="/">비밀번호를 잊으셨나요?</a>
      </div>
      <button type="button" className="btn btn-primary btn-login">
        로그인하기
      </button>
      <AuthSocialButton text="구글로 로그인하기" />
      <button type="button" className="auth-footer auth-footer-link" onClick={onGoSignup}>
        미로가 처음이신가요? <span className="auth-footer-emphasis">회원가입</span>
      </button>
    </AuthCard>
  )
}
