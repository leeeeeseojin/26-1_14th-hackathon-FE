import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../../components/header/Header'
import CommonButton from '../../../components/common-button/CommonButton'
import StageProgress from '../components/stage-progress/StageProgress'
import CurrentStepCard from '../components/current-step-card/CurrentStepCard'
import NextStepPreview from '../components/next-step-preview/NextStepPreview'
import CompletionModal from '../components/completion-modal/CompletionModal'

import { getCookingSteps } from '../../../apis/recipe'

import './RecipeCookingModePage.css'

export default function RecipeCookingModePage({ onBack }) {
  const { recipeId } = useParams()

  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchSteps = async () => {
      try {
        setIsLoading(true)
        const data = await getCookingSteps(recipeId)
        if (isMounted) setRecipe(data)
      } catch (err) {
        if (isMounted) setError(err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchSteps()
    return () => {
      isMounted = false
    }
  }, [recipeId])

  if (isLoading) return <p className='recipe-cooking-mode-page__status'>불러오는 중...</p>
  if (error || !recipe)
    return <p className='recipe-cooking-mode-page__status'>조리 단계를 불러오지 못했어요.</p>

  const { title, steps } = recipe

  const stageSteps = steps.map((step) => ({ id: step.stepOrder, name: `${step.stepOrder}단계` }))

  const currentStep = steps[currentIndex]
  const nextStep = steps[currentIndex + 1]
  const isLastStep = currentIndex === steps.length - 1

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
      <Header title='모디와 조리 중' subtitle={title} titleSize={18} onBack={onBack} />

      <div className='recipe-cooking-mode-page__content'>
        <StageProgress steps={stageSteps} currentIndex={currentIndex} remainingMinutes={null} />

        <CurrentStepCard
          stepNumber={currentStep.stepOrder}
          stepName={`${currentStep.stepOrder}단계`}
          title={`${currentStep.stepOrder}단계`}
          description={currentStep.description}
        />

        {nextStep && (
          <NextStepPreview
            className='recipe-cooking-mode-page__next-preview-gap'
            stepNumber={nextStep.stepOrder}
            title={`${nextStep.stepOrder}단계`}
            description={nextStep.description}
          />
        )}
      </div>

      <div className='recipe-cooking-mode-page__bottom'>
        <button
          type='button'
          className='recipe-cooking-mode-page__prev-button'
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          이전
        </button>
        <CommonButton
          weight='regular'
          className='recipe-cooking-mode-page__next-button'
          onClick={handleNext}
        >
          {isLastStep ? '조리 완료' : '다음 단계로 →'}
        </CommonButton>
      </div>

      {isCompleteModalOpen && <CompletionModal onClose={() => setIsCompleteModalOpen(false)} />}
    </main>
  )
}
