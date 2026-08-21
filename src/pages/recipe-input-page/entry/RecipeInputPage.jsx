import { useState } from 'react'
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'

import ImageUploader from '../components/ImageUploader'
import RecipeTextInput from '../components/RecipeTextInput'

import SaveSuccessModal from '../../../components/save-sucess-modal/SaveSuccessModal'

import {
  importRecipeText,
  importRecipeYoutube,
} from '../../../apis/recipe'

import './RecipeInputPage.css'

const RecipeInputPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const getInitialRecipeUrl = () => {
    const sharedUrl = searchParams.get('url')
    const sharedText = searchParams.get('text')

    if (sharedUrl) {
      return sharedUrl
    }

    if (sharedText) {
      const urlMatch = sharedText.match(
        /https?:\/\/[^\s]+/
      )

      return urlMatch?.[0] || ''
    }

    return ''
  }

  const [file, setFile] = useState(null)

  const [recipeText, setRecipeText] =
    useState('')

  const [recipeUrl, setRecipeUrl] =
    useState(getInitialRecipeUrl)

  const [isModalOpen, setIsModalOpen] =
    useState(false)

  const [isSaving, setIsSaving] =
    useState(false)


  const handleFileChange = (event) => {
    const selectedFile =
      event.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const isYoutubeUrl = (url) => {
    try {
      const parsedUrl = new URL(url)

      const hostname = parsedUrl.hostname
        .replace('www.', '')
        .toLowerCase()

      return (
        hostname === 'youtube.com' ||
        hostname === 'm.youtube.com' ||
        hostname === 'youtu.be'
      )
    } catch {
      return false
    }
  }


  const handleSave = async () => {
    if (isSaving) {
      return
    }

    const trimmedText =
      recipeText.trim()

    const trimmedUrl =
      recipeUrl.trim()


    if (
      !file &&
      !trimmedText &&
      !trimmedUrl
    ) {
      alert('레시피를 입력해주세요.')
      return
    }


    if (
      file &&
      !trimmedText &&
      !trimmedUrl
    ) {
      alert(
        '현재는 텍스트 또는 YouTube 링크로 등록해주세요.'
      )
      return
    }


    if (
      !trimmedText &&
      trimmedUrl &&
      !isYoutubeUrl(trimmedUrl)
    ) {
      alert(
        '현재는 YouTube 링크만 지원합니다.'
      )
      return
    }

    try {
      setIsSaving(true)

      let data = null


      if (trimmedText) {
        data = await importRecipeText(
          trimmedText
        )
      }

   
      else if (trimmedUrl) {
        data = await importRecipeYoutube(
          trimmedUrl
        )
      }

      console.log(
        '레시피 저장 성공:',
        data
      )

   
      if (data?.recipeId) {
        sessionStorage.setItem(
          'savedRecipeId',
          String(data.recipeId)
        )
      }

      setIsModalOpen(true)
    } catch (error) {
      console.error(
        '레시피 저장 실패:',
        error
      )

      const status = error.status
      const message = error.message

      if (status === 400) {
        alert(
          message ||
            '입력한 내용을 확인해주세요.'
        )
        return
      }

  
      if (status === 401) {
        alert(
          '로그인이 필요합니다. 다시 로그인해주세요.'
        )

        localStorage.removeItem(
          'accessToken'
        )

        navigate('/login', {
          replace: true,
        })

        return
      }


      if (status === 422) {
        alert(
          message ||
            '레시피를 분석할 수 없습니다.'
        )
        return
      }

   
      if (status === 502) {
        alert(
          '레시피 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        )
        return
      }

      alert(
        message ||
          '레시피 저장에 실패했습니다.'
      )
    } finally {
      setIsSaving(false)
    }
  }

 
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

 
  const handleViewRecipe = () => {
    setIsModalOpen(false)

    navigate('/recipe')
  }

  return (
    <div className='recipe-input-page'>
      <Header
        title='레시피 입력'
        onBack={() => navigate(-1)}
      />

      <main className='recipe-input-page__main'>
        <section className='recipe-input-page__section'>
          <h2 className='recipe-input-page__title'>
            이미지로 공유하기
          </h2>

          <ImageUploader
            onChange={handleFileChange}
          />
        </section>

        <div className='recipe-input-page__divider' />

        <section className='recipe-input-page__section'>
          <RecipeTextInput
            value={recipeText}
            onChange={(event) =>
              setRecipeText(
                event.target.value
              )
            }
          />
        </section>

        <section className='recipe-input-page__link-section'>
          <RecipeTextInput
            title='링크 입력하기'
            description='링크를 통해 레시피를 공유해주세요'
            placeholder='입력하기'
            value={recipeUrl}
            onChange={(event) =>
              setRecipeUrl(
                event.target.value
              )
            }
          />
        </section>
      </main>

      <div className='recipe-input-page__bottom'>
        <CommonButton
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving
            ? '저장 중...'
            : '저장하기'}
        </CommonButton>
      </div>

      <SaveSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onView={handleViewRecipe}
      />
    </div>
  )
}

export default RecipeInputPage