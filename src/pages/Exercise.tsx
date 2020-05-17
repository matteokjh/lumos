import React, { useEffect, useState, useContext, useRef } from 'react'
import { message, Input } from 'antd'
import { getExerciseList } from '../api/exercise'
import ExerciseList from './components/ExerciseList'
import { briefExerciseProps } from '@/types/exercise'
import './styles/ExerciseWrapper.sass'
// import { SearchOutlined } from '@ant-design/icons'
import { store } from '@/store'
import { debounce } from '@/utils/methods'

const Exercise = () => {
    const [originList, setOriginList] = useState([] as briefExerciseProps[])
    const [exerciseList, setExerciseList] = useState([] as briefExerciseProps[])
    const [loading, setLoading] = useState(false)
    const { userInfo } = useContext(store).state
    const inputRef = useRef(null as any)

    // methods
    const handleInput = () => {
        const value = inputRef.current.state.value
        if(!value) {
            setExerciseList(originList)
        } else {
            setExerciseList(originList.filter(e => e.title.match(value)))
        }
    }

    useEffect(() => {
        setLoading(true)
        ;(async () => {
            try {
                let res = await getExerciseList({username: userInfo.username})
                setExerciseList(res.data)
                setOriginList(res.data)
            } catch (err) {
                message.error(err)
            }
            setLoading(false)
        })()
    }, [userInfo])

    return (
        <div className="ExerciseWrapper">
            <div className="leftMain">
                {/* 顶部模块 */}
                <div className="top">
                    <div className="searchBar">
                        <Input
                            ref={inputRef}
                            placeholder="搜索题目"
                            spellCheck={false}
                            onChange={debounce(handleInput, 500)}
                            allowClear
                        ></Input>
                        {/* <SearchOutlined className="searchBtn" /> */}
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
