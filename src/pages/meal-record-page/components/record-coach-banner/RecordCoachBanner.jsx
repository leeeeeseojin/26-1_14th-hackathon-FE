import modiIcon from '../../../../assets/icon/modi.svg'

import './RecordCoachBanner.css'

const RecordCoachBanner = ({ title, subtitle }) => {
  return (
    <section className='record-coach-banner'>
      <img
        className='record-coach-banner__mascot'
        src={modiIcon}
        alt=''
        width={51}
        height={54}
      />

      <div className='record-coach-banner__speech'>
        <p className='record-coach-banner__title'>{title}</p>
        <p className='record-coach-banner__subtitle'>{subtitle}</p>
      </div>
    </section>
  )
}

export default RecordCoachBanner
