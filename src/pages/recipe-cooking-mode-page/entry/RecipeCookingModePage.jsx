import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import StageProgress from '../components/stage-progress/StageProgress'
import CurrentStepCard from '../components/current-step-card/CurrentStepCard'
import ActionChecklist from '../components/action-checklist/ActionChecklist'
import TipCard from '../components/tip-card/TipCard'
import NextStepPreview from '../components/next-step-preview/NextStepPreview'
import CompletionModal from '../components/completion-modal/CompletionModal'

import tipIllustration from '../../../assets/cooking-flow/tip-illustration.svg'
import tipLabel from '../../../assets/cooking-flow/tip-label.svg'

import getApiErrorMessage from '../../../apis/getApiErrorMessage'
import { getRecipeCookingSteps } from '../apis/RecipeCookingModeApi'

import './RecipeCookingModePage.css'

function getRemainingMinutes(steps, currentIndex) {
  return steps.slice(currentIndex).reduce((sum, step) => sum + (step.durationMinutes ?? 0), 0)
}

export default function RecipeCookingModePage({ onBack }) {
  const [searchParams] = useSearchParams()
  const recipeId = searchParams.get('recipeId')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
  const [recipeTitle, setRecipeTitle] = useState('')
  const [steps, setSteps] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchSteps = async () => {
      if (!recipeId) {
        setSteps([])
        setErrorMessage('레시피 정보가 없습니다.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getRecipeCookingSteps(recipeId)
        setRecipeTitle(data.title ?? '')
        setSteps(data.steps ?? [])
        setCurrentIndex(0)
      } catch (error) {
        console.error('조리 단계 조회 실패:', error)
        setSteps([])
        setErrorMessage(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    fetchSteps()
  }, [recipeId])

  const currentStep = steps[currentIndex]
  const nextStep = steps[currentIndex + 1]
  const remainingMinutes = getRemainingMinutes(steps, currentIndex)
  const isLastStep = steps.length > 0 && currentIndex === steps.length - 1

  const handlePrev = () => {
    if (currentIndex === 0) return
    setCurrentIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    if (isLastStep) {
      setIsCompleteModalOpen(true)
      return
    }
    setCurrentIndex((prev) => prev + 1)
  }

  return (
    <main className='recipe-cooking-mode-page'>
      <Header title='모디와 조리 중' subtitle={recipeTitle} titleSize={18} onBack={onBack} />

      <div className='recipe-cooking-mode-page__content'>
        {isLoading ? (
          <p className='recipe-cooking-mode-page__status'>조리 단계를 불러오는 중입니다.</p>
        ) : null}

        {errorMessage ? (
          <p className='recipe-cooking-mode-page__status'>{errorMessage}</p>
        ) : null}

        {currentStep && !isLoading ? (
          <>
            <StageProgress
              steps={steps}
              currentIndex={currentIndex}
              remainingMinutes={remainingMinutes}
            />

            <CurrentStepCard
              stepNumber={currentIndex + 1}
              stepName={currentStep.name}
              title={currentStep.title}
              description={currentStep.description}
            />

            <ActionChecklist actions={currentStep.actions} />

            <TipCard illustration={tipIllustration} label={tipLabel} content={currentStep.tip} />

            {nextStep && (
              <NextStepPreview
                className='recipe-cooking-mode-page__next-preview-gap'
                stepNumber={currentIndex + 2}
                title={nextStep.title}
                description={nextStep.description}
              />
            )}
          </>
        ) : null}
      </div>

      <div className='recipe-cooking-mode-page__bottom'>
        <button
          type='button'
          className='recipe-cooking-mode-page__prev-button'
          onClick={handlePrev}
          disabled={currentIndex === 0 || !currentStep}
        >
          이전
        </button>
        <CommonButton
          weight='regular'
          className='recipe-cooking-mode-page__next-button'
          onClick={handleNext}
          disabled={!currentStep}
        >
          {isLastStep ? '조리 완료' : '다음 단계로 →'}
        </CommonButton>
      </div>

      {isCompleteModalOpen && <CompletionModal onClose={() => setIsCompleteModalOpen(false)} />}
    </main>
  )
}
