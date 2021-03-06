import React from 'react'
import { Route, Switch } from 'react-router-dom'
import BaseInfo from './BaseInfo'
import SolutionList from './SolutionList'
import '@/styles/DetailNavigate.sass'
import My404Component from '../base/My404Component'

const DetailNavigate = () => {
    return (
        <div className="DetailNavigate">
            <Switch>
                <Route
                    exact
                    path="/exercise/detail/:id"
                    component={BaseInfo}
                ></Route>
                <Route
                    exact
                    path="/exercise/detail/:id/solution"
                    component={SolutionList}
                ></Route>
                <Route component={My404Component}></Route>
            </Switch>
        </div>
    )
}

export default DetailNavigate
