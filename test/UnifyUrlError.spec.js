const { assert } = require('chai')
const UnifyUrlError = require('../src/UnifyUrlError')
const { REASON_ } = UnifyUrlError

describe('UnifyUrlError', () => {

  describe('.REASON_', () => {

    it('Should be an object with string properties', () => {
      assert.isObject(REASON_)
      Object.values(REASON_).forEach((value) => assert.isString(value))
    })

    it('Should has property ARG_IS_NOT_STRING', () => {
      assert(REASON_.hasOwnProperty('ARG_IS_NOT_STRING'))
    })

    it('Should has property UNEXPECTED_QUESTION_MARK', () => {
      assert(REASON_.hasOwnProperty('UNEXPECTED_QUESTION_MARK'))
    })

    it('Should has property UNEXPECTED_SHARP', () => {
      assert(REASON_.hasOwnProperty('UNEXPECTED_SHARP'))
    })

    it('Should has property UNENCODED_PARAM', () => {
      assert(REASON_.hasOwnProperty('UNENCODED_PARAM'))    
    })
  })

  describe('constructor()', () => {

    it('Should return an instance of UnifyUrlError', () => {
      const error = new UnifyUrlError()
      assert.instanceOf(error, UnifyUrlError)
    })

    it('Should return an instance of Error', () => {
      const error = new UnifyUrlError()
      assert.instanceOf(error, Error)
    })
  })

  describe('#message', () => {
  
    it('Should be empty string if the constructor param "reason" is not passed.', () => {
      const error = new UnifyUrlError()
      assert(error.message === '')
    })
    
    it('Should be equal to the constructor param "reason" if the "url" option is not passed.', () => {
      const string = 'some string '
      const error = new UnifyUrlError(string)
      assert(error.message === string)
    })

    it('Should append the "url" option value to the message if it is passed.', () => {
      const string = 'some string '
      const url = 'some/url'
      const error = new UnifyUrlError(string, url)
      assert(error.message === string + url)
    })
  })
})
