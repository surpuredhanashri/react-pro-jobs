/* eslint-disable eqeqeq */
import React, { useContext } from 'react'
import "./Pages.css"
import { PageNumberContext, PageContext } from "../Home/Home"

export default function Pages(props) {

    // creates pagination based on (total length of array of jobs/10) such that each page contains 10 jobs
    let elementArray = []
    for (let i = 1; i <= props.length; i++) {
        elementArray.push(<DivElement key={i} value={i} />)
    }
    return (
        <div className="pages">
            {elementArray}
        </div>
    )
}

function DivElement(props) {

    const change = useContext(PageNumberContext)
    const number = useContext(PageContext)

    return (
        <div id={props.value === number ? "active" : ""} onClick={() => change(props.value)}>
            {props.value}
        </div>
    )
}
