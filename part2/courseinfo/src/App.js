import Course from './components/Course'

const App = ({ courses }) => {

  return (courses.map(courseObj => <Course key={courseObj.id} course={courseObj} />))
}

export default App
