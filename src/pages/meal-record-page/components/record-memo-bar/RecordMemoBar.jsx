import './RecordMemoBar.css'

const RecordMemoBar = ({ recordRate, changeFromLastWeek }) => {
  const changeLabel =
    changeFromLastWeek >= 0
      ? `지난주보다 ${changeFromLastWeek}% 높아요`
      : `지난주보다 ${Math.abs(changeFromLastWeek)}% 낮아요`

  return (
    <div className='record-memo-bar'>
      <p className='record-memo-bar__title'>모디의 기록 메모</p>
      <p className='record-memo-bar__value'>
        {recordRate}% · {changeLabel}
      </p>
    </div>
  )
}

export default RecordMemoBar
