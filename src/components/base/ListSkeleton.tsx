import React from 'react'
import { Skeleton } from 'antd'
import '@/styles/ListSkeleton.sass'


const ListSkeleton = () => {
    return <Skeleton className="ske" active paragraph={{ rows: 30 }}></Skeleton>
}

export default ListSkeleton