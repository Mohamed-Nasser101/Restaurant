import {Link} from "react-router-dom";

const App = () => {
  return (
    // <div className={'bg-light'} style={{height:'100%'}}>
    //   <div style={{height: '100%'}} className={'d-flex justify-content-center align-items-center'}>
    //   
    //   </div>
    // </div>
    <div className=" bg-secondary d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
      <div className="">
        <h1>
          Continue as: <Link className={'mx-2'} to="/admin">Admin</Link>
          | <Link className={'ml-2'} to="/booking">Anonymous</Link>
        </h1>
      </div>
    </div>
  )
}

export default App
