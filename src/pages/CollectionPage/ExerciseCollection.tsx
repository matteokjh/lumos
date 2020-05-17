import React, { useEffect, useState } from 'react';
import ExerciseList from '@/pages/components/ExerciseList';
import '@/pages/styles/ExerciseCollection.sass';
import { briefExerciseProps } from '@/types/exercise';
import { message } from 'antd';
import { getStarList } from '@/api/exercise'

// 题目收藏
const ExerciseCollection = () => {
    const [loading, setLoading] = useState(false);
    const [dataList, setList] = useState([] as briefExerciseProps[]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await getStarList();
                if (res.code === 200) {
                    setList(res.data)
                } else {
                    message.error(res.msg);
                }
            } catch (err) {
                message.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="ExerciseCollection">
            <ExerciseList
                loading={loading}
                exerciseList={dataList || []}
            ></ExerciseList>
        </div>
    );
};

export default ExerciseCollection;
