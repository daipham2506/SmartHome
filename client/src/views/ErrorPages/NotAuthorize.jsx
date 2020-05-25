import React from 'react'
import { Result, Button } from 'antd';

const NotAuthorize = (props) => {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={()=>{ props.history.push("/dashboard")}}>Back Dashboard</Button>}
      />
    </div>
  )
}

export default NotAuthorize
