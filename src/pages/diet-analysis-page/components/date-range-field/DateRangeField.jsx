import chevronDown from '../../../../assets/icon/chevron-down.svg'

import './DateRangeField.css'

const DateRangeField = ({
  startDate,
  endDate,
  disabled,
  onChangeStart,
  onChangeEnd,
}) => {
  return (
    <div className='date-range-field'>
      <p className='date-range-field__label'>날짜 선택</p>

      <div className='date-range-field__row'>
        <label
          className={`date-range-field__control ${
            disabled ? 'date-range-field__control--disabled' : ''
          }`}
        >
          <input
            className='date-range-field__input'
            type='date'
            value={startDate}
            max={endDate}
            disabled={disabled}
            onChange={(event) => onChangeStart(event.target.value)}
            aria-label='시작 날짜'
          />
          <img
            className='date-range-field__icon'
            src={chevronDown}
            alt=''
            width={12}
            height={12}
          />
        </label>

        <span className='date-range-field__separator'>~</span>

        <label
          className={`date-range-field__control ${
            disabled ? 'date-range-field__control--disabled' : ''
          }`}
        >
          <input
            className='date-range-field__input'
            type='date'
            value={endDate}
            min={startDate}
            disabled={disabled}
            onChange={(event) => onChangeEnd(event.target.value)}
            aria-label='종료 날짜'
          />
          <img
            className='date-range-field__icon'
            src={chevronDown}
            alt=''
            width={12}
            height={12}
          />
        </label>
      </div>
    </div>
  )
}

export default DateRangeField
