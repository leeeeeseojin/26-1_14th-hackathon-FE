import './InlineTag.css'

export default function InlineTag({ label, variant = 'neutral' }) {
  return <span className={`inline-tag inline-tag--${variant}`}># {label}</span>
}
