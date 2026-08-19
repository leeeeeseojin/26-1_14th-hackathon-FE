import './NoticeBanner.css'

const LEVEL_TEXT = {
  low: '낮은 수준의 혈당 영향',
  medium: '중간 수준의 혈당 영향',
  high: '높은 수준의 혈당 영향',
}

// 레벨 기본값 중간 수준으로 임시 설정
// 추후 api 연동 시 레벨 값 받아와서 동적으로 표시하도록 변경 필요
export default function NoticeBanner({ level = 'medium' }) {
  return (
    <div className='notice-banner'>
      <div className='notice-banner__icon'>!</div>
      <p className='notice-banner__text'>
        이 레시피는 <strong>{LEVEL_TEXT[level]}</strong>이 예상됩니다. 개인 상태에 따라 다를 수
        있으며, 정확한 판단은 의료진과 상담하시기 바랍니다.
      </p>
    </div>
  )
}
