import React from "react"

const Sum = ({ coursePart }) => {
   return (
      <div style={{ fontWeight: 'bold' }}>
         Total of {coursePart.reduce((sum, part) =>
            sum + part.exercises,
            0
         )} exercises
      </div>
   )
}

export default Sum