import { SOURCE_TYPE_LABEL } from '../../mocks/recipeSavedListMock'

import './SourceBadge.css'

const SourceBadge = ({ sourceType }) => {
  const label = SOURCE_TYPE_LABEL[sourceType]

  if (!label) {
    return null
  }

  return <span className='source-badge'>{label}</span>
}

export default SourceBadge
