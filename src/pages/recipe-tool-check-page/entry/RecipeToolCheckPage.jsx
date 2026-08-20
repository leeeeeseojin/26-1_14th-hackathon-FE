import Header from '../../../components/header/Header'

export default function RecipeToolCheckPage({ onBack }) {
  return (
    <main>
      <Header title='레시피 재료 및 도구' onBack={onBack} />
      <p style={{ padding: '20px' }}>레시피 재료 및 도구</p>
    </main>
  )
}
