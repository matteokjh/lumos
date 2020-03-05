import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ArticleCollection from './ArticleCollection'
import ExerciseCollection from './ExerciseCollection'

const CollectionNavigate = () => {
    return (
        <div className="main">
            <Switch>
                <Route
                    exact
                    path="/collection/article"
                    component={ArticleCollection}
                ></Route>
                <Route
                    exact
                    path="/collection/exercise"
                    component={ExerciseCollection}
                ></Route>
            </Switch>
        </div>
    )
}

export default CollectionNavigate
