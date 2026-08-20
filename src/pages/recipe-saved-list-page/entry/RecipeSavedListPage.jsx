import Header from '../../../components/header/Header'

export default function RecipeSavedListPage({ onBack }) {
  return (
    <main>
      <Header title='레시피 저장 리스트' onBack={onBack} />
      <p style={{ padding: '20px' }}>레시피 저장 리스트 페이지 (6.1)</p>
    </main>
  )
}
