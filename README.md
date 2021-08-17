# @spomni/unify-url

## Abstract

The function to unify query part of the url string.

This function removes query parameters with no values and sorts the rest of them.

## Install

```sh
npm i @spomni/unify-url
```

## Usage

```javascript
const unifyUrl = require('@spomni/unify-url')

const unsortedUrl = 'http://some.dom/pa/th?p2=v2&p1=v1#hash'
const withoutValuesUrl = 'http://some.dom/pa/th?p1=v1&p3=&p4&p2=v2#hash'

const unifiedUnsorted = unifyUrl(unsortedUrl)
const unifiedWithoutValue = unifyUrl(withoutValuesUrl)

console.log(unifiedUnsorted) // => http://some.dom/pa/th?p1=v1&p2=v2#hash
console.log(unifiedUnsorted === unifiedWithoutValue) // => true
```

## Exceptions

The unifyUrl(url) function throws an instance of UnifyUrlError on the next cases:
  - the "url" argument is not string;
  - an url contains more than one "?" characters;
  - an url contains more than one "#" characters rightly from the "?";
  - any query param contains more than one "=" characters;