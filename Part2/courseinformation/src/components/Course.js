const Header = ({ name }) => {
    return (
        <div>
            <h2>{name}</h2>
        </div>
    )
}

const Part = ({ name, exercise }) => {
    return (
        <div>
            <p>{name} {exercise}</p>
        </div>
    )
}

const Content = ({ part }) => {
    return (
        <div>
            {part.map(element => (
                <Part key={element.id} name={element.name} exercise={element.exercises} />
            ))}
        </div>
    )
}

const Total = ({ course }) => {
    const total = course.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <b>
                <p>total of {total} exercises</p>
            </b>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content part={course.parts} />
            <Total course={course.parts} />
        </div>
    )
}

export default Course;