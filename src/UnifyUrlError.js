/**
 * Object with constants to explain why UnifyUrlError is thrown.
 *
 * @type {object}
 *
 * @property {string} ARG_IS_NOT_STRING
 * @property {string} UNEXPECTED_QUESTION_MARK
 * @property {string} UNEXPECTED_SHARP
 * @property {string} UNEXPECTED_EQUAL
 */
const REASON_ = {
  ARG_IS_NOT_STRING: 'The argument "url" must be a string.',
  UNEXPECTED_QUESTION_MARK: 'Unexpected character "?" in the url ',
  UNEXPECTED_SHARP: 'Unexpected character "#" in the url ',
  UNEXPECTED_EQUAL: 'Unexpected character "=" in the url ',
}

class UnifyUrlError extends Error {

  /**
   * Create an error of the unifyUrl() function.
   *
   * @param {string} reason
   * @param {string} [url]
   *
   * @returns {UnifyUrlError}
   */
  constructor(reason, url = null) {
    super(reason)
    if (url) this.message += url
  }
}

UnifyUrlError.REASON_ = REASON_

module.exports = UnifyUrlError
