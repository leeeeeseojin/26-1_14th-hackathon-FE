import './ActionChecklist.css'

export default function ActionChecklist({ actions }) {
  return (
    <div className='action-checklist'>
      {actions.map((action) => (
        <div key={action} className='action-checklist__item'>
          <span className='action-checklist__dot' />
          <p className='action-checklist__text'>{action}</p>
        </div>
      ))}
    </div>
  )
}
