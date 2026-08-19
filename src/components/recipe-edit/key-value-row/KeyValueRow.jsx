import './KeyValueRow.css'

export default function KeyValueRow({
  label,
  value,
  oldValue,
  newValue,
  changeType = 'improved',
  badge,
  variant = 'ingredient',
  isLast = false,
}) {
  const isDiff = oldValue !== undefined && newValue !== undefined

  return (
    <div
      className={`key-value-row key-value-row--${variant} ${isLast ? 'key-value-row--last' : ''}`}
    >
      <span className='key-value-row__label'>
        {label}
        {badge && <span className='key-value-row__badge'>{badge}</span>}
      </span>
      {isDiff ? (
        <span className='key-value-row__value'>
          <span className='key-value-row__old-value'>{oldValue}</span>
          {' → '}
          <span className={`key-value-row__new-value key-value-row__new-value--${changeType}`}>
            {newValue}
          </span>
        </span>
      ) : (
        <span className='key-value-row__value'>{value}</span>
      )}
    </div>
  )
}
