const Header = (props) => {
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.part[0].name} exercise = {props.part[0].exercise} />
      <Part part = {props.part[1].name} exercise = {props.part[1].exercise} />
      <Part part = {props.part[2].name} exercise = {props.part[2].exercise} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.part[0].exercise + props.part[1].exercise + props.part[2].exercise}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name : 'Fundamental of React',
        exercise : 10
      },
      {
        name : 'Using props to pass data',
        exercise : 7
      },
      {
        name : 'State of component',
        exercise : 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name} />
      <Content part = {course.parts} />
      <Total part = {course.parts} />
    </div>
  )
}

export default App;
