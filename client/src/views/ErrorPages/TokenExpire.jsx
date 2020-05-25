import React from 'react'
import { Result } from 'antd';
import { useEffect } from 'react';

const TokenExpire = (props) => {

  useEffect(() => {
    setTimeout(()=>{
      props.history.push('/user/login-page')
    }, 5000)
  }, []);

  return (
    <div>
      <Result
        status="404"
        title="401"
        subTitle="Sorry, Your login session has expired. Will be redirect to login page."
      />
    </div>
  )
}

export default TokenExpire
