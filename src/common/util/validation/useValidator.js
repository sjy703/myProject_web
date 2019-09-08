import { useState } from 'react';

const useValidator = (
  [error, setError],
  [submittable, setSubmittable],
  validateList,
  { pattern, length },
  regexErrMessage = '',
) => {
  const validator = input => {
    const value = input;
    let isError = false;
    if (validateList.includes('require')) {
      if (!value || value === '') {
        setError('필수 입력 조건 입니다.');
        setSubmittable(false);
        isError = true;
      } else {
        setError(null);
        setSubmittable(true);
      }
    }
    if (!isError && validateList.includes('length')) {
      if (value.length < length) {
        setError(`입력은 ${length}자 이상이여야 합니다.`);
        setSubmittable(false);
        isError = true;
      } else {
        setError(null);
        setSubmittable(true);
      }
    }
    if (!isError && validateList.includes('regex')) {
      if (!pattern.test(value)) {
        if (regexErrMessage === '') {
          setError('양식에 맞지 않습니다.');
        } else {
          setError(regexErrMessage);
        }
        setSubmittable(false);
        isError = true;
      } else {
        setError(null);
        setSubmittable(true);
      }
    }
  };
  return validator;
};
export { useValidator };
