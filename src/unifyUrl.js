const UnifyUrlError = require('./UnifyUrlError')

const encodedUriComponentRegExp = new RegExp('^[a-z0-9\-_.!~*\'()]*$', 'i')

function isEncodedUriComponent(value) {
  return encodedUriComponentRegExp.test(value)
}

const {
  ARG_IS_NOT_STRING,
  UNEXPECTED_QUESTION_MARK,
  UNEXPECTED_SHARP,
  UNEXPECTED_EQUAL,
} = UnifyUrlError.REASON_

function unifyUrl(url) {

  if (typeof url !== 'string') {
    throw new UnifyUrlError(ARG_IS_NOT_STRING)
  }
  
  if (!url.match(/(\?)/g)) return url
  
  if (url.match(/(\?)/g).length > 1) {
    throw new UnifyUrlError(UNEXPECTED_QUESTION_MARK, url)
  }

  const [tillPath, search] = url.split('?')
  
  const sharps = search.match(/#/g)
  
  if (sharps && sharps.length > 1) {
    throw new UnifyUrlError(UNEXPECTED_SHARP, url)
  }
  
  const [query, hash] = sharps ? search.split('#') : [search, '']

  const unifiedQuery = query.split('&')
    .map((param) => {
      const chunks = param.split('=')
      
      if (chunks.length > 2) {
        throw new UnifyUrlError(UNEXPECTED_EQUAL, url)
      }
      
      if (chunks.length > 1) return chunks
      return [...chunks, '']
    })
    .filter(([key, value]) => value !== '')
    .map(([key, value]) => [key, value].join('='))
    .sort()
    .join('&')

  let result = tillPath
  if (unifiedQuery !== '') result += '?' + unifiedQuery
  if (hash !== '') result += '#' + hash
    
  return result
}

module.exports = unifyUrl
