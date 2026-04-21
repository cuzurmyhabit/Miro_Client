import googleLogo from '../../assets/google_logo.svg'

type AuthSocialButtonProps = {
  text: string
}

export default function AuthSocialButton({ text }: AuthSocialButtonProps) {
  return (
    <button type="button" className="btn btn-google">
      <img src={googleLogo} alt="" />
      {text}
    </button>
  )
}
