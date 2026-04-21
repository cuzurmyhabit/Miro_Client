import eyeIcon from '../../assets/eye_icon.svg'

type AuthInputProps = {
  id: string
  label: string
  placeholder: string
  type?: 'text' | 'password'
  hideLabel?: boolean
  showEyeIcon?: boolean
}

export default function AuthInput({
  id,
  label,
  placeholder,
  type = 'text',
  hideLabel = false,
  showEyeIcon = false,
}: AuthInputProps) {
  return (
    <div className="auth-field">
      <label className={hideLabel ? 'hidden-label' : ''} htmlFor={id}>
        {label}
      </label>
      {showEyeIcon ? (
        <div className="input-with-icon">
          <input id={id} type={type} placeholder={placeholder} />
          <button type="button" className="eye-icon" aria-label="비밀번호 보기">
            <img src={eyeIcon} alt="" />
          </button>
        </div>
      ) : (
        <input id={id} type={type} placeholder={placeholder} />
      )}
    </div>
  )
}
