import Header from '../../../components/header/Header'

export default function RecipeCookingModePage({ onBack }) {
  return (
    <main>
      <Header title='모디와 조리 중' onBack={onBack} />
      <p style={{ padding: '20px' }}>조리 단계 페이지</p>
    </main>
  )
}
