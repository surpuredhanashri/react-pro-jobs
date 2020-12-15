import React, { useState, createContext } from 'react'
import Pages from '../Pagination/Pages'
import "./Home.css"
import { Job } from "./Job"

// Context which tells the clicked job to expand
export const ExpandContext = createContext()

// Context which export he function so that when the pageNumber is clciked it sets the pageNumber state 
// to that specific value
export const PageNumberContext = createContext()

// Context which exports the active pageNumber
export const PageContext = createContext()

export default function Home(props) {

    // state which stores the id of job clicked by user for more details 
    const [detailsId, setdetailsId] = useState("")

    // state which stores active page number
    const [pageNumber, setpageNumber] = useState(1)

    // filteredJobs contains the job array
    let filteredJobs = props.jobs

    // if user enters either job description or location or checks box the filteration is activated
    if (props.filter.description || props.filter.location || props.filter.fullTime) {

        // if user enters decsription then below filteration takes place
        if (props.filter.description)
            filteredJobs = filteredJobs.filter(job => {
                if (job.title.toLowerCase().search(props.filter.description.toLowerCase()) !== -1)
                    return true
                return false
            }).map(job => job)

        // if user enters location then below filteration takes place
        if (props.filter.location)
            filteredJobs = filteredJobs.filter(job => {
                if (job.location.toLowerCase().search(props.filter.location.toLowerCase()) !== -1)
                    return true
                return false
            }).map(job => job)

        // if user checksBox then below filteration takes place
        if (props.filter.fullTime)
            filteredJobs = filteredJobs.filter(job => {
                if (job.type.toLowerCase() === "full time")
                    return true
                return false
            }).map(job => job)
    }

    // when user click view details button then the clicked job id is saved in state to show more details abt it
    const expand = (id) => {
        setdetailsId(prevState => {
            if (prevState === id)
                return " "
            return id
        })
    }

    // when user changes page Number that page is stored to render hat specific job
    const changePageNumber = (number) => {
        setpageNumber(parseInt(number))
    }

    // based on page number slices the filtered jobs array.
    const lastJob = pageNumber * 10
    const startJob = lastJob - 10

    return (
        <>
            <PageNumberContext.Provider value={changePageNumber}>
                <PageContext.Provider value={pageNumber}>
                    <Pages length={Math.ceil(filteredJobs.length / 10)} />
                </PageContext.Provider>
            </PageNumberContext.Provider>
            <ExpandContext.Provider value={expand}>
                <div className="jobs-container">
                    {filteredJobs.slice(startJob, lastJob).map(job => <Job key={job.id} {...job} detailsId={detailsId} />)}
                </div>
            </ExpandContext.Provider>
        </>
    )

}
