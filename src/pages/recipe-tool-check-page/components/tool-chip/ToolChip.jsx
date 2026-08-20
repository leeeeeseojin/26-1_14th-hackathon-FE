import './ToolChip.css'

export default function ToolChip({ icon, name }) {
  return (
    <div className='tool-chip'>
      <img src={icon} alt='' className='tool-chip__icon' />
      <p className='tool-chip__name'>{name}</p>
    </div>
  )
}
