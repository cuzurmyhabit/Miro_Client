import menteeImage from '../../assets/mentee.png'
import mentorImage from '../../assets/mentor.png'
import writeIcon from '../../assets/write_icon.svg'
import homeworkIcon from '../../assets/homework_icon.svg'
import materialIcon from '../../assets/material_icon.svg'
import announceIcon from '../../assets/announce_icon.svg'
import chatIcon from '../../assets/chat_icon.svg'
import './MenteeClassDetailView.css'

export type MenteeClassDetailMeta = {
  title: string
  status: '예정' | '진행' | '완료'
}

type FeedKind = 'homework' | 'material' | 'notice'

type FeedItem = {
  id: string
  kind: FeedKind
  title: string
  date: string
  commentCount?: number
  commentLabel?: string
  author?: string
  body?: string
}

const MOCK_FEED: FeedItem[] = [
  {
    id: '1',
    kind: 'homework',
    title: '첫 번째 과제: 리액트 설치하기',
    date: '2025. 02. 15',
    commentCount: 1,
  },
  {
    id: '2',
    kind: 'homework',
    title: '두 번째 과제: 컴포넌트 만들기',
    date: '2025. 02. 18',
  },
  {
    id: '3',
    kind: 'material',
    title: '1주차 강의 자료 (PDF)',
    date: '2025. 02. 10',
    commentCount: 0,
  },
  {
    id: '4',
    kind: 'notice',
    title: '긴급 공지사항입니다!!!!!!!!',
    date: '2025. 02. 15',
    author: '멘토 야호콩콩',
    body: '긴급 공지사항입니다!!!!!!!! 송지아죽어!',
    commentLabel: '클래스 댓글 작성',
  },
]

type MenteeClassDetailViewProps = {
  classMeta: MenteeClassDetailMeta
  onBack: () => void
}

function statusLabel(status: MenteeClassDetailMeta['status']) {
  if (status === '진행') return '진행 중인 클래스'
  if (status === '완료') return '완료된 클래스'
  return '예정된 클래스'
}

function FeedIcon({ kind }: { kind: FeedKind }) {
  const src = kind === 'homework' ? homeworkIcon : kind === 'material' ? materialIcon : announceIcon
  const alt = kind === 'homework' ? '과제' : kind === 'material' ? '자료' : '공지'
  return (
    <div className="mentee-feed-icon-circle">
      <img src={src} alt="" className="mentee-feed-icon-img" />
    </div>
  )
}

export default function MenteeClassDetailView({ classMeta, onBack }: MenteeClassDetailViewProps) {
  const statusClass =
    classMeta.status === '완료'
      ? 'mentee-class-status mentee-class-status--done'
      : classMeta.status === '진행'
        ? 'mentee-class-status mentee-class-status--ongoing'
        : 'mentee-class-status mentee-class-status--scheduled'

  return (
    <>
      <section className="mentee-class-detail-banner">
        <div className="mentee-class-detail-banner-inner">
          <button type="button" className="mentee-class-detail-back" onClick={onBack}>
            ← 목록
          </button>
          <div className="mentee-class-detail-banner-main">
            <img src={menteeImage} alt="" className="mentee-class-detail-illust" />
            <h1 className="mentee-class-detail-title">{classMeta.title}</h1>
          </div>
        </div>
        <div className="mentee-class-detail-status-wrap">
          <p className={statusClass}>
            <span className="mentee-class-status-dot" aria-hidden />
            {statusLabel(classMeta.status)}
          </p>
        </div>
      </section>

      <main className="main-content mentee-class-detail-main">
        <div className="mentee-class-detail-layout">
          <aside className="mentee-class-detail-sidebar">
            <button type="button" className="mentee-write-post-btn">
              <img src={writeIcon} alt="" width={24} height={24} />
              게시물 작성하기
            </button>

            <section className="mentee-side-card mentee-class-code-card">
              <h2 className="mentee-side-card-title">클래스 코드</h2>
              <p className="mentee-class-code-value">YaHoKonGKonG</p>
            </section>

            <section className="mentee-side-card mentee-deadline-card">
              <h2 className="mentee-side-card-title">곧 마감되는 과제</h2>
              <p className="mentee-deadline-empty">기한이 곧 돌아오는 과제가 없습니다.</p>
              <button type="button" className="mentee-deadline-more">
                모두 보기
              </button>
            </section>

            <button type="button" className="mentee-market-wire-btn">
              마켓 가기
            </button>
          </aside>

          <section className="mentee-feed-panel" aria-label="과제·자료·공지">
            <ul className="mentee-feed-list">
              {MOCK_FEED.map((item) => (
                <li key={item.id}>
                  <article className="mentee-feed-card">
                    <FeedIcon kind={item.kind} />
                    <div className="mentee-feed-body">
                      <h3 className="mentee-feed-card-title">{item.title}</h3>
                      <div className="mentee-feed-after-title">
                        {item.kind === 'notice' && item.author ? (
                          <p className="mentee-feed-author">
                            <span className="mentee-feed-author-avatar">
                              <img src={mentorImage} alt="" />
                            </span>
                            {item.author}
                          </p>
                        ) : null}
                        <p className="mentee-feed-date">{item.date}</p>
                        {item.body ? <p className="mentee-feed-body-text">{item.body}</p> : null}
                        {item.commentCount !== undefined && item.commentCount > 0 ? (
                          <div className="mentee-feed-comment-row">
                            <img src={chatIcon} alt="" width={24} height={24} />
                            <span>클래스 댓글 {item.commentCount}개</span>
                          </div>
                        ) : null}
                        {item.commentLabel ? (
                          <div className="mentee-feed-comment-row mentee-feed-comment-row--action">
                            <img src={chatIcon} alt="" width={24} height={24} />
                            <span>{item.commentLabel}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <button type="button" className="mentee-feed-menu" aria-label="더보기 메뉴">
                      ⋮
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}
