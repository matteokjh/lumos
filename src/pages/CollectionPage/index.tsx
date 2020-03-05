import React, { useState, useEffect } from 'react'
import Nav from './CollectionNav'
import Navigate from './CollectionNavigate'
import "@/pages/styles/CollectionPage.sass"

const CollectionPage = (props: any) => {

    const [key, setKey] = useState('article')

    useEffect(() => {
        setKey(props.match.params.type)
    }, [props.match.params.type])


    return <div className="CollectionPage">
        <Nav type={key}></Nav>
        <Navigate></Navigate>
    </div>
}

export default CollectionPage