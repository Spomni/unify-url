describe('UnifyUrlError', () => {

  describe('.REASON_', () => {
    it('Should be an object with string properties')
    it('Should has property ARG_IS_NOT_STRING')
    it('Should has property UNEXPECTED_QUESTION_MARK')
    it('Should has property UNEXPECTED_SHARP')
    it('Should has property UNENCODED_PARAM')
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
