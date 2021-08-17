const UnifyUrlError = require('./UnifyUrlError')

const {
  ARG_IS_NOT_STRING,
  UNEXPECTED_QUESTION_MARK,
  UNEXPECTED_SHARP,
  UNEXPECTED_EQUAL,
} = UnifyUrlError.REASON_

/**
 * Remove query params without values from the passed url and sort others.
 *
 * @param {string} url
 *
 * @returns {string}
 *
 * @throws {UnifyUrlError}
 */
function unifyUrl(url) {

  if (typeof url !== 'string') {
    throw new UnifyUrlError(ARG_IS_NOT_STRING)
  }

  const [tillPath, search, questMarkError] = url.split('?')

  if (questMarkError !== undefined) {
    throw new UnifyUrlError(UNEXPECTED_QUESTION_MARK, url)
  }

  if (search === undefined) return url
  
  const [query, hash, sharpError] = search.split('#')
  
  if (sharpError !== undefined) {
    throw new UnifyUrlError(UNEXPECTED_SHARP, url)
  }

  const unifiedQuery = query.split('&')
    .filter((param) => {
      const [key, value, error] = param.split('=')
      if (error !== undefined) throw new UnifyUrlError(UNEXPECTED_EQUAL, url)
      if (!value || value === '') return false
      return true
    })
    .sort()
    .join('&')

  let result = tillPath
  if (unifiedQuery) result += '?' + unifiedQuery
  if (hash) result += '#' + hash
    
  return result
}

module.exports = unifyUrl
