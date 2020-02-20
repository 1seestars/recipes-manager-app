import React from 'react'
import { HeadButtons } from './HeadButtons'
import RecipeList from './RecipeList'

class MainPage extends React.Component {
    render() {
        return(
            <div className="wrapper">
                <div><HeadButtons /></div>
                <div><RecipeList /></div>
            </div>
        )
    }
}

export default MainPage