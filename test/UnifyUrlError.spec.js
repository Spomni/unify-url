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
    it('Should return an instance of UnifyUrlError')
    it('Should return an instance of Error')
  })
  
  describe('#message', () => {
    it('Should be equal to the constructor param "message" if the "url" option is not passed.')
    it('Should append the "url" option value to the message if it is passed.')
  })
})
