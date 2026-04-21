import AuthCard from '../components/auth/AuthCard'
import AuthInput from '../components/auth/AuthInput'
import AuthSelect from '../components/auth/AuthSelect'
import AuthSocialButton from '../components/auth/AuthSocialButton'

type SignupPageProps = {
  onGoLogin: () => void
}

export default function SignupPage({ onGoLogin }: SignupPageProps) {
  const gradeOptions = Array.from({ length: 3 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}학년`,
  }))

  const classOptions = Array.from({ length: 6 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}반`,
  }))

  const numberOptions = Array.from({ length: 18 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}번`,
  }))

  return (
    <AuthCard>
      <div className="auth-field-group auth-field-group-row">
        <AuthSelect
          id="grade"
          label="학년"
          placeholder="학년"
          options={gradeOptions}
        />
        <AuthSelect
          id="class"
          label="반"
          placeholder="반"
          options={classOptions}
          hideLabel
        />
        <AuthSelect
          id="number"
          label="번호"
          placeholder="번호"
          options={numberOptions}
          hideLabel
        />
      </div>
      <AuthInput id="signup-id" label="아이디" placeholder="아이디를 입력해주세요" />
      <AuthInput
        id="signup-password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        showEyeIcon
      />
      <button type="button" className="btn btn-primary">
        회원가입하기
      </button>
      <AuthSocialButton text="구글로 회원가입하기" />
      <button type="button" className="auth-footer auth-footer-link" onClick={onGoLogin}>
        이미 회원이신가요? 로그인
      </button>
    </AuthCard>
  )
}
