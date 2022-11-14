import React from 'react'
import {DatePicker} from 'antd'

export default function playerPage() {
  var currentDate = new Date();

  return (
    <div>
    <DatePicker defaultValue={currentDate} />
    </div>
  )
}
