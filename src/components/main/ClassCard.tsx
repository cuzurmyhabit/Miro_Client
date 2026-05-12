import './ClassCard.css'

type ClassCardProps = {
  category: string
  title: string
  points: string
  progress: number
  highlighted?: boolean
  /** 멘티 등에서 카드 클릭 시 상세로 이동 */
  onActivate?: () => void
}

export default function ClassCard({
  category,
  title,
  points,
  progress,
  highlighted = false,
  onActivate,
}: ClassCardProps) {
  const interactive = Boolean(onActivate)

  return (
    <article
      className={`class-card ${highlighted ? 'is-highlighted' : ''}${interactive ? ' is-interactive' : ''}`}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (!onActivate) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onActivate()
        }
      }}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
    >
      <p className="class-category">
        <span>{category}</span>
      </p>
      <h3 className="class-title">{title}</h3>
      <p className="class-points">멘토: {points} 김미림</p>
      <div className="class-progress-box">
        <p className="class-progress-label">{progress}% 완료</p>
        <div className="class-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </article>
  )
}
