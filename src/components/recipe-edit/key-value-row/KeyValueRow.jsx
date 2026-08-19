import './KeyValueRow.css'

export default function KeyValueRow({ label, value, variant = 'ingredient', isLast = false }) {
  return (
    <div
      className={`key-value-row key-value-row--${variant} ${isLast ? 'key-value-row--last' : ''}`}
    >
      <span className='key-value-row__label'>{label}</span>
      <span className='key-value-row__value'>{value}</span>
    </div>
  )
}
