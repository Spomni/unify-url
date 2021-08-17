const { assert } = require('chai')
const unifyUrl = require('../src/unifyUrl')
const UnifyUrlError = require('../src/UnifyUrlError')

const {
  ARG_IS_NOT_STRING,
  UNEXPECTED_QUESTION_MARK,
  UNEXPECTED_SHARP,
  UNENCODED_PARAM,
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

  it('Should throw an error if any query param is not uri encoded.', () => {
    const urlList = [
      'http://some.dom/pa/th?pa=\√&ra',
      'http://some.dom/pa/thpa?amпр=pam',
      'http://some.dom/pa/thpa?am/=pam',
    ]
        
    urlList.forEach((url) => {
      assert.throws(() => unifyUrl(url))
      try {
        unifyUrl(url)
      } catch (error) {
        assert.instanceOf(error, UnifyUrlError)
        assert.strictEqual(error.message, UNENCODED_PARAM + url)
      }
    })
  })

  it('Should not change the url part before query.')
  it('Should not change an url hash.')
 
  it('Should remove empty query params.')
  it('Should sort query params.')
})