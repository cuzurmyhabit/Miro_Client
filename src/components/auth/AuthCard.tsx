import type { ReactNode } from 'react'
import headerLogo from '../../assets/header_logo.svg'

type AuthCardProps = {
  children: ReactNode
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <section className="auth-card">
      <img className="auth-logo" src={headerLogo} alt="Miro" />
      {children}
    </section>
  )
}
