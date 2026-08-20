import { useState } from 'react'

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

import { DUMMY_RECIPE_NAME, DUMMY_COOKING_STEPS } from '../apis/dummyRecipeCookingMode'

import './RecipeCookingModePage.css'

function getRemainingMinutes(steps, currentIndex) {
  return steps.slice(currentIndex).reduce((sum, step) => sum + step.durationMinutes, 0)
}

export default function RecipeCookingModePage({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)

  const currentStep = DUMMY_COOKING_STEPS[currentIndex]
  const nextStep = DUMMY_COOKING_STEPS[currentIndex + 1]
  const remainingMinutes = getRemainingMinutes(DUMMY_COOKING_STEPS, currentIndex)
  const isLastStep = currentIndex === DUMMY_COOKING_STEPS.length - 1

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
      <Header title='모디와 조리 중' subtitle={DUMMY_RECIPE_NAME} titleSize={18} onBack={onBack} />

      <div className='recipe-cooking-mode-page__content'>
        <StageProgress
          steps={DUMMY_COOKING_STEPS}
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
