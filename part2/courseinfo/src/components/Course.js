import React from 'react'
import Header from './Header'
import Content from './Content'
import Sum from './Sum'

const Course = ({ course }) => {
   return (
      <div>
         <Header courseTitle={course.name} />
         <ul>
            <Content coursePart={course.parts} />
            <Sum coursePart={course.parts} />
         </ul>
      </div>
   )
}

export default Course