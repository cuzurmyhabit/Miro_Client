import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import headerLogo from '../assets/header_logo.svg'
import menteeImage from '../assets/mentee.png'
import mentorImage from '../assets/mentor.png'
import addIcon from '../assets/add_icon.svg'
import noticeIcon from '../assets/notice_icon.svg'
import arrowIcon from '../assets/arrow_icon.svg'
import addButtonIcon from '../assets/add_button_icon.svg'
import ClassCard from '../components/main/ClassCard'
import MentorAvatar from '../components/main/MentorAvatar'
import MenteeClassDetailView, {
  type MenteeClassDetailMeta,
} from '../components/main/MenteeClassDetailView'
import './MainPage.css'

const NAV_TABS = ['홈', '클래스', '과제', '채팅', '랭킹', '마이페이지'] as const

const myClasses: Array<{
  category: string
  title: string
  points: string
  progress: number
  highlighted?: boolean
  status: '예정' | '진행' | '완료'
}> = [
  { category: 'Science', title: '과학 중간고사 대비', points: '2000', progress: 18, highlighted: true, status: '예정' },
  { category: 'Design', title: 'Figma 프로토타입 제작', points: '3000', progress: 45, status: '진행' },
  { category: 'SW', title: 'Html 기초', points: '3000', progress: 72, status: '완료' },
  { category: 'Science', title: '과학 중간고사 대비', points: '2000', progress: 31, status: '진행' },
  { category: 'Design', title: 'Figma 프로토타입 제작', points: '3000', progress: 64, status: '예정' },
  { category: 'SW', title: 'Html 기초', points: '3000', progress: 90, status: '완료' },
]

const recommendedClassesPool = [
  { category: 'Science', title: '과학 중간고사 대비', points: '2000', progress: 22 },
  { category: 'Design', title: 'Figma 프로토타입 제작', points: '3000', progress: 57 },
  { category: 'SW', title: 'Html 기초', points: '3000', progress: 83 },
  { category: 'Science', title: '화학 실험 보고서', points: '2500', progress: 12 },
  { category: 'Design', title: 'UI 컴포넌트 시스템', points: '3200', progress: 38 },
  { category: 'SW', title: 'JavaScript 심화', points: '2800', progress: 65 },
]

const recommendedMentors = [
  { image: mentorImage, name: '지수민', department: '소프트웨어과', grade: '3학년' },
  { image: menteeImage, name: '유성윤', department: '소프트웨어과', grade: '2학년' },
  { image: mentorImage, name: '정지영', department: '디자인과', grade: '3학년' },
  { image: menteeImage, name: '전유림', department: '소프트웨어과', grade: '1학년' },
  { image: mentorImage, name: '민정원', department: '소프트웨어과', grade: '3학년' },
]

export default function MainPage() {
  const CLASS_STATUS_TABS = ['예정', '진행', '완료'] as const
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeNav, setActiveNav] = useState(0)
  const [headerRole, setHeaderRole] = useState<'mentor' | 'mentee'>('mentor')
  const [profileRole, setProfileRole] = useState<'mentor' | 'mentee'>('mentee')
  const [activeClassStatus, setActiveClassStatus] =
    useState<(typeof CLASS_STATUS_TABS)[number]>('진행')
  const navRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [underline, setUnderline] = useState({ left: 0, width: 0 })
  const [showAllRecommended, setShowAllRecommended] = useState(false)
  const [menteeSelectedClass, setMenteeSelectedClass] = useState<MenteeClassDetailMeta | null>(null)

  const recommendedVisible = showAllRecommended
    ? recommendedClassesPool
    : recommendedClassesPool.slice(0, 3)
  const menteeClasses = myClasses.filter((item) => item.status === activeClassStatus)
  const isMenteeMode = headerRole === 'mentee'

  useEffect(() => {
    if (!isMenteeMode) setMenteeSelectedClass(null)
  }, [isMenteeMode])

  useLayoutEffect(() => {
    const updateUnderline = () => {
      const nav = navRef.current
      const tab = tabRefs.current[activeNav]
      if (!nav || !tab) return
      const n = nav.getBoundingClientRect()
      const t = tab.getBoundingClientRect()
      setUnderline({ left: t.left - n.left, width: t.width })
    }
    updateUnderline()
    window.addEventListener('resize', updateUnderline)
    return () => window.removeEventListener('resize', updateUnderline)
  }, [activeNav])

  return (
    <div className="main-page">
      <header className="top-nav">
        <div className="top-nav-left">
          <img src={headerLogo} alt="miro" />
          <nav className="main-nav" ref={navRef}>
            <span
              className="main-nav-underline"
              style={{
                transform: `translateX(${underline.left}px)`,
                width: underline.width,
              }}
            />
            {NAV_TABS.map((label, i) => (
              <button
                key={label}
                type="button"
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                className={`main-nav-tab${activeNav === i ? ' active' : ''}${
                  i === NAV_TABS.length - 1 ? ' main-nav-tab--last' : ''
                }`}
                onClick={() => setActiveNav(i)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="top-nav-toggle-host">
          <div className={`role-switch${headerRole === 'mentee' ? ' is-mentee' : ''}`}>
            <span className="role-switch-glider" aria-hidden />
            <button
              type="button"
              className={`role-switch-btn${headerRole === 'mentor' ? ' is-active' : ''}`}
              onClick={() => setHeaderRole('mentor')}
            >
              멘토
            </button>
            <button
              type="button"
              className={`role-switch-btn${headerRole === 'mentee' ? ' is-active' : ''}`}
              onClick={() => setHeaderRole('mentee')}
            >
              멘티
            </button>
          </div>
        </div>
        <div className="top-nav-right">
          <button type="button" className="icon-btn" aria-label="추가">
            <img src={addIcon} alt="" width={50} height={50} />
          </button>
          <button type="button" className="icon-btn" aria-label="알림">
            <img src={noticeIcon} alt="" width={50} height={50} />
          </button>
          <div className="profile-wrap">
            <button
              type="button"
              className="profile-trigger"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-expanded={isProfileOpen}
              aria-label="프로필 열기"
            >
              <img className="profile-thumb" src={mentorImage} alt="프로필" />
            </button>
            {isProfileOpen ? (
              <aside className="mini-profile">
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setIsProfileOpen(false)}
                >
                  ×
                </button>
                <div className="mini-profile-body">
                  <img src={mentorImage} alt="프로필" className="mini-profile-avatar" />
                  <div className="mini-profile-text">
                    <h3>지용잉</h3>
                    <p className="mini-profile-class">3학년 5반 15번</p>
                    <p className="email">d2416@e-mirim.hs.kr</p>
                  </div>
                </div>
                <div className="mini-profile-role">
                  <button
                    type="button"
                    className={profileRole === 'mentor' ? 'active' : ''}
                    onClick={() => setProfileRole('mentor')}
                  >
                    멘토
                  </button>
                  <button
                    type="button"
                    className={profileRole === 'mentee' ? 'active' : ''}
                    onClick={() => setProfileRole('mentee')}
                  >
                    멘티
                  </button>
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </header>

      {menteeSelectedClass ? (
        <MenteeClassDetailView
          classMeta={menteeSelectedClass}
          onBack={() => setMenteeSelectedClass(null)}
        />
      ) : (
        <>
          <section className="hero-section">
            <div className="hero-title">
              <img src={menteeImage} alt="" />
              <h1>
                {isMenteeMode ? '새로운 배움이 기다리고 있어요 :)' : '오늘은 어떤 성장을 이뤄볼까요?'}
              </h1>
            </div>
          </section>

          <main className="main-content">
            {isMenteeMode ? (
              <section className="content-section mentee-class-section">
                <h2>내 클래스</h2>
                <div className="mentee-status-tabs">
                  {CLASS_STATUS_TABS.map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={activeClassStatus === status ? 'active' : ''}
                      onClick={() => setActiveClassStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <div className="class-grid">
                  {menteeClasses.map((item, idx) => (
                    <ClassCard
                      key={`${item.title}-${idx}-${item.status}`}
                      category={item.category}
                      title={item.title}
                      points={item.points}
                      progress={item.progress}
                      highlighted={item.highlighted}
                      onActivate={() =>
                        setMenteeSelectedClass({ title: item.title, status: item.status })
                      }
                    />
                  ))}
                  <article className="class-card join-class-card">
                    <button type="button" className="join-class-btn">
                      <img src={addButtonIcon} alt="" width={60} height={60} />
                      <span>클래스 참여하기</span>
                    </button>
                  </article>
                </div>
              </section>
            ) : (
              <>
                <section className="content-section">
                  <h2>내 클래스</h2>
                  <div className="class-grid">
                    {myClasses.map((item, idx) => (
                      <ClassCard
                        key={`${item.title}-${idx}`}
                        category={item.category}
                        title={item.title}
                        points={item.points}
                        progress={item.progress}
                        highlighted={item.highlighted}
                      />
                    ))}
                  </div>
                </section>

                <section className="content-section">
                  <h2>추천 클래스</h2>
                  <div className="class-grid">
                    {recommendedVisible.map((item, idx) => (
                      <ClassCard key={`${item.title}-${idx}`} {...item} />
                    ))}
                  </div>
                  {!showAllRecommended ? (
                    <button
                      type="button"
                      className="more-btn"
                      onClick={() => setShowAllRecommended(true)}
                    >
                      <span>더 보기</span>
                      <img src={arrowIcon} alt="" className="more-btn-icon" width={24} height={24} />
                    </button>
                  ) : null}
                </section>

                <section className="content-section mentor-section">
                  <h2>추천 멘토</h2>
                  <div className="mentor-list">
                    {recommendedMentors.map((mentor, idx) => (
                      <MentorAvatar
                        key={`${mentor.name}-${idx}`}
                        image={mentor.image}
                        name={mentor.name}
                        department={mentor.department}
                        grade={mentor.grade}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>
        </>
      )}
    </div>
  )
}
