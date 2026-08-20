const getApiErrorMessage = (error) => {
  const data = error?.response?.data

  if (typeof data?.message === 'string' && data.message.trim()) {
    return data.message
  }

  if (typeof data?.ERROR === 'string' && data.ERROR.trim()) {
    return data.ERROR
  }

  return '요청을 처리하지 못했습니다.'
}

export default getApiErrorMessage
