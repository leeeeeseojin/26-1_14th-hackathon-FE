import Header from '../../../components/header/Header'
import StageProgress from '../components/stage-progress/StageProgress'
import CurrentStepCard from '../components/current-step-card/CurrentStepCard'
import ActionChecklist from '../components/action-checklist/ActionChecklist'

import { DUMMY_RECIPE_NAME, DUMMY_COOKING_STEPS } from '../apis/dummyRecipeCookingMode'

import './RecipeCookingModePage.css'

function getRemainingMinutes(steps, currentIndex) {
  return steps.slice(currentIndex).reduce((sum, step) => sum + step.durationMinutes, 0)
}

export default function RecipeCookingModePage({ onBack }) {
  // TODO: Sub 133에서 useState로 전환, 이전/다음 버튼과 연결 예정
  const currentIndex = 1

  const currentStep = DUMMY_COOKING_STEPS[currentIndex]
  const remainingMinutes = getRemainingMinutes(DUMMY_COOKING_STEPS, currentIndex)

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

        {/* Sub 128: TIP, 다음 단계 미리보기 및 하단 버튼 영역 */}
      </div>
    </main>
  )
}
