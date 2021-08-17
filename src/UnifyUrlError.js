const REASON_ = {
  ARG_IS_NOT_STRING: 'The argument "url" must be a string.',
  UNEXPECTED_QUESTION_MARK: 'Unexpected character "?" in the url ',
  UNEXPECTED_SHARP: 'Unexpected character "#" in the url ',
  UNENCODED_PARAM: 'Some query param is not uri encoded in the url ',
}

class UnifyUrlError extends Error {
  constructor(reason, url = null) {
    super(reason)
    if (url) this.message += url
  }
}

UnifyUrlError.REASON_ = REASON_

module.exports = UnifyUrlError