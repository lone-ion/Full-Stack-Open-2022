const Header = ({ courseTitle }) => {
  return (
    <div>
      <h1>{courseTitle}</h1>
    </div>
  )
}

const Part = ({ partName, partExercises }) => {
  return (
    <div>
      {partName} {partExercises}
    </div>
  )
}

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

const Course = ({ course }) => {
  return (
    <div>
      <Header courseTitle={course.name} />
      <ul>
        <Content coursePart={course.parts} />
      </ul>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return <Course course={course} />
}

export default App
