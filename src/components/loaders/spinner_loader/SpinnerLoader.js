import React from 'react'
import BarLoader from "react-spinners/BarLoader"





const SpinnerLoader = () => {
    return (
        <div
            style={{
                width: "100%",
                minHeight: "85vh",
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center"
            }}
        >

            <BarLoader color="#0B7C62" />
        </div>
    )
}


export default SpinnerLoader