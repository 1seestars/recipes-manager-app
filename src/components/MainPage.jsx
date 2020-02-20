import React from 'react'
import { HeadButtons } from './HeadButtons'
import RecipeList from './RecipeList'
import SimpleModal from './ModalWindow'

class MainPage extends React.Component {
    render() {
        return(
            <div className="wrapper">
                <div><HeadButtons /></div>
                <div><RecipeList /></div>
                <div><SimpleModal /></div>
            </div>
        )
    }
}

export default MainPage