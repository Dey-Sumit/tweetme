
//contextAPI
const colors = {
    blue: '#03619C',
    red: '#9C0312',
    yellow: '#8c8f03',

}
export const colorContext = React.createContext([])

const ColorContextProvider = (props) => {

    const [color, setColor] = useState('yellow')

    return (
        <colorContext.Provider value={[color, setColor]}>
            {props.children}
        </colorContext.Provider>
    )
}

const Home = (props) => {

    const [color, setColor] = useContext(colorContext)
    console.log("home", color);

    return (
        <div className='col-8 p-4 ml-4' style={{ backgroundColor: color }}>{color}
            <Link to='/littleHome'><button className="btn btn-outline-info float-right" onClick={() => { setColor('blue') }}>change</button>
            </Link>
        </div>
    )
}
const LastHome = () => {
    const [color, setColor] = useContext(colorContext)
    return (
        <div className='col-8 p-3 mt-2 ml-4 border' style={{ backgroundColor: color }} > I am last child
            <button className='btn btn-outline-danger float-right' onClick={() => { setColor('red') }}>change</button>
        </div>
    )

}
const LittleHome = (props) => {
    const [color, setColor] = useContext(colorContext)
    console.log("littlehome", color);
    return (
        <>
            <div className='col-8 p-3 mt-2 ml-4' style={{ backgroundColor: color }}> I am child
        </div>
            <LastHome />
        </>
    )

}
