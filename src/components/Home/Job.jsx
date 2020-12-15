import React, { useContext } from "react"
import { ExpandContext } from "./Home"

export function Job(props) {

    // Converts UTC into Local Date
    const date = new Date(props.created_at)

    // Context to store id of clicked job for more details
    const expand = useContext(ExpandContext)

    return (
        <div className="job">
            <h2>{props.title}</h2>
            <p>{date.getDate()} / {date.getMonth()} / {date.getFullYear()}</p>
            <p>{props.type}</p>
            <a href={removeTags(props.how_to_apply)}>Apply Here</a>
            <div className="view-details" onClick={() => expand(props.id)}>
                {props.detailsId === props.id ? "Hide Details" : "View Details"}
            </div>
            <img src={props.company_logo} alt={props.title} />

            {props.detailsId === props.id && <div dangerouslySetInnerHTML={{ __html: props.description }} className="description" />}
        </div>
    )
}

function removeTags(str) {
    if (str) {
        const link = str.match(/href=.*?>/)
        if (link) {
            return link[0].match(/".*?"/)[0].slice(1, link[0].match(/".*?"/)[0].length - 1)
        }
    }
}
