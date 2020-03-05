import React, { useEffect, useState } from 'react'
import { message, Input } from 'antd'
import { getExerciseList } from '../api/exercise'
import ExerciseList from './components/ExerciseList'
import { briefExerciseProps } from '@/types/exercise'
import './styles/ExerciseWrapper.sass'
import { SearchOutlined } from '@ant-design/icons'

const Exercise = () => {
    const [exerciseList, setExerciseList] = useState([] as briefExerciseProps[])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        ;(async () => {
            try {
                let res = await getExerciseList()
                setExerciseList(res.data)
            } catch (err) {
                message.error(err)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <div className="ExerciseWrapper">
            <div className="leftMain">
                {/* 顶部模块 */}
                <div className="top">
                    <div className="searchBar">
                        <Input
                            placeholder="搜索题目"
                            spellCheck={false}
                        ></Input>
                        <SearchOutlined className="searchBtn" />
                    </div>
                </div>
                <ExerciseList
                    loading={loading}
                    exerciseList={exerciseList}
                ></ExerciseList>
            </div>
            {/* 右边 */}
            <div className="rightMain">
                <a
                    title="https://www.artstation.com/artwork/x1oWY"
                    rel="noopener noreferrer"
                    href="https://www.artstation.com/artwork/x1oWY"
                    target="_blank"
                >
                    <div
                        className="pic"
                        style={{
                            backgroundImage: `url(${require('@/img/tara.jpg')})`,
                        }}
                    ></div>
                </a>
            </div>
        </div>
    )
}

export default Exercise
