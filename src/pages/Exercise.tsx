
import React, { useEffect, useState } from 'react'
import { Layout, message } from 'antd'
import { getExerciseList } from '../api/exercise'

const Exercise = (props: any) => {
    // 题目的筛选
    // const filterName = props.match.params.filter
    // const [pageNum, setPageNum] = useState(localStorage[`${filterName}_pageNum`] || 1)
    // const [pageSize, setPageSize] = useState(localStorage[`${filterName}_pageSize`] || 50)
    
    useEffect(() => {
        // (async () => {
        //     try {
        //         let res = await getExerciseList(filterName, pageNum, pageSize)
        //         console.log(res)
        //     } catch(err) {
        //         message.error(err)
        //     }
        // })()
    }, [])

    return (
        <Layout>
            题库
        </Layout>
    )
}

export default Exercise