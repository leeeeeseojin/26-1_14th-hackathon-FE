import './ToolChip.css'

export default function ToolChip({ name }) {
  return (
    <div className='tool-chip'>
      <p className='tool-chip__name'>{name}</p>
    </div>
  )
}
