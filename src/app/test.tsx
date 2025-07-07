import React from 'react'; // 큰따옴표 위반

const count = 0; // var 사용 금지

function Example() {
  console.log('테스트'); // 콘솔 금지

  const msg = 'Hello ' + 'World'; // 템플릿 리터럴 권장

  return <div>{msg}</div>;
}

export default Example;
