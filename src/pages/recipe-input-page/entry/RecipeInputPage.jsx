import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'

import ImageUploader from '../components/ImageUploader'
import RecipeTextInput from '../components/RecipeTextInput'

import SaveSuccessModal from '../../../components/save-sucess-modal/SaveSuccessModal'

import './RecipeInputPage.css'

const RecipeInputPage = () => {
  const [file, setFile] = useState(null)
  const [recipeText, setRecipeText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSave = () => {
    console.log('선택한 파일:', file)
    console.log('입력한 레시피:', recipeText)

    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleViewRecipe = () => {
    setIsModalOpen(false)

    navigate('/recipes')
  }

  return (
    <div className='recipe-input-page'>
      <Header title='레시피 입력' onBack={() => navigate(-1)} />

      <main className='recipe-input-page__main'>
        <section className='recipe-input-page__section'>
          <h2 className='recipe-input-page__title'>이미지로 공유하기</h2>

          <ImageUploader onChange={handleFileChange} />
        </section>

        <div className='recipe-input-page__divider' />

        <section className='recipe-input-page__section'>
          <RecipeTextInput
            value={recipeText}
            onChange={(event) => setRecipeText(event.target.value)}
          />
        </section>
      </main>

      <div className='recipe-input-page__bottom'>
        <CommonButton onClick={handleSave}>저장하기</CommonButton>
      </div>

      <SaveSuccessModal isOpen={isModalOpen} onClose={handleCloseModal} onView={handleViewRecipe} />
    </div>
  )
}

export default RecipeInputPage
