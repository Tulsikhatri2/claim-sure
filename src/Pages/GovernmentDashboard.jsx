import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPolicyListData, governmentRequestList } from '../Redux/Slice/dataSlice'

const GovernmentDashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(governmentRequestList())
  }, [])
  return (
    <div>GovernmentDashboard</div>
  )
}

export default GovernmentDashboard