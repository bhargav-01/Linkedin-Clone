import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login/LoginComponent'
import SignUp from './Login/SignupComponent'
import LocationDetails from './Login/LocationComponent'
import JobDetails from './Login/JobDetailsComponent'
import StudyDetails from './Login/StudentComponent'
import Profile from './Profile/ProfileComponent'
import PostWithID from './PostWithID';
import Home from './HomeComponent';
import Header from './HeaderComponent';
function Main(props) {
    // const Home= () => {
    //     <Home posts={props.posts}/>
    // }
    
    return (
            <div>
                <Header/>
                <div style={{"padding-top": "80px"}}>
                    <Switch>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/ldetails' component={LocationDetails}/>
                        <Route path='/jdetails' component={JobDetails}/>
                        <Route path='/profile/:id' component={Profile}/>
                        <Route exact path='/profile' component={Profile}/>
                        <Route path='/sdetails' component={StudyDetails}/>
                        <Route path='/post' component={PostWithID}/>
                        <Route path='/home' component={Home}/>
                        <Redirect to="/signup" />
                    </Switch>
                </div>
               
            </div>
    )
}

export default Main
