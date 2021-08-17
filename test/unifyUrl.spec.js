const { assert } = require('chai')
const unifyUrl = require('../src/unifyUrl')
const UnifyUrlError = require('../src/UnifyUrlError')

const {
  ARG_IS_NOT_STRING,
  UNEXPECTED_QUESTION_MARK,
  UNEXPECTED_SHARP,
  UNEXPECTED_EQUAL,
} = UnifyUrlError.REASON_

describe('unifyUrl(url)', () => {

  it('Should throw an error if the url is not string', () => {
    assert.throws(() => unifyUrl(13))
    try {
      unifyUrl(true)
    } catch (error) {
      assert.instanceOf(error, UnifyUrlError)
      assert.strictEqual(error.message, ARG_IS_NOT_STRING)
    }
  })

  it('Should throw an error if the url contains more than one characters "?".', () => {
    const urlList = [
      'http://some?.dom/pa/th?',
      'http://some.dom/pa/th?pa?am?pam',
    ]
    
    urlList.forEach((url) => {
      assert.throws(() => unifyUrl(url))
      
      try {
        unifyUrl(url)
      } catch (error) {
        assert.instanceOf(error, UnifyUrlError)
        assert.strictEqual(error.message, UNEXPECTED_QUESTION_MARK + url)
      }
    })
  })

  it('Should throw an error if the url contains more than one characters "#" in the search part of them.', () => {
    const urlList = [
      'http://some.dom/pa/th?pa#am#pam',
    ]
    
    urlList.forEach((url) => {
      assert.throws(() => unifyUrl(url))
      
      try {
        unifyUrl(url)
      } catch (error) {
        assert.instanceOf(error, UnifyUrlError)
        assert.strictEqual(error.message, UNEXPECTED_SHARP + url)
      }
    })
  })
  
  it('Should throw an error if any param contains more than one character "="', () => {
    const url = 'http://some?p=p=c&pf=y'
    const message = UNEXPECTED_EQUAL + url
    assert.throws(() => unifyUrl(url), UnifyUrlError, message)
  })

  // TODO: Replace this check with error of incorrect count of the "=" caharacters in any param.
  it('Should not throw an error if any query param is not uri encoded.', () => {
    const urlList = [
      'http://some.dom/pa/th?pa=\√&ra',
      'http://some.dom/pa/thpa?amпр=pam',
      'http://some.dom/pa/thpa?am/=pam',
    ]
        
    urlList.forEach((url) => {
      assert.doesNotThrow(() => unifyUrl(url))
    })
  })

  it('Should not change the url part before query.', () => {
    const beforeQuery = 'ftp://some.dom/p/a/th'
    const hash = 'hash'
    
    const urlList = [
      beforeQuery,
      beforeQuery + '#' + hash,
      beforeQuery + '?' + '#' + hash,
      beforeQuery + '?query' + '#' + hash,
    ]

    urlList.forEach((url) => {
      let newBeforeQuery;
      
      newBeforeQuery = unifyUrl(url).split('?')[0]
      newBeforeQuery = newBeforeQuery.split('#')[0]

      assert.strictEqual(newBeforeQuery, beforeQuery)
    })
  })

  it('Should not change an url hash.', () => {
    const beforeQuery = 'ftp://some.dom/p/a/th'
    const hash = 'hash'
    
    const urlList = [
      beforeQuery + '#' + hash,
      beforeQuery + '?' + '#' + hash,
      beforeQuery + '?query' + '#' + hash,
    ]
    
    urlList.forEach((url) => {
      const newHash = unifyUrl(url).split('#')[1]
    
      assert.strictEqual(newHash, hash)
    })
  })
 
  it('Should remove empty query params.', () => {

    const urlList = [
      ['http://some?p1=&p2&p3=v3', 'http://some?p3=v3'],
      ['http://some?p1=&p2', 'http://some'],
    ]
    
    urlList.forEach(([origin, target]) => {
      assert.strictEqual(target, unifyUrl(origin))
    })
  })

  it('Should sort query params.', () => {
    const origin = 'http://some?a=a&k=k&c=c'
    const target = 'http://some?a=a&c=c&k=k'
    
    assert.strictEqual(unifyUrl(origin), target)
  })
})