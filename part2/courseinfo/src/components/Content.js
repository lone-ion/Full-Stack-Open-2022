import React from "react"
import Part from "./Part"

const Content = ({ coursePart }) => {
   return (
      <div>
         {coursePart.map(item =>
            <li key={item.id}>
               <Part partName={item.name} partExercises={item.exercises} />
            </li>
         )}
      </div>
   )
}

export default Content