import React from 'react'
import HeadButtons from './HeadButtons'
import RecipeList from './RecipeList'
import ModalWindow from './ModalWindow'

class MainPage extends React.Component {
    render() {
        return(
            <div className="wrapper">
                <div><HeadButtons /></div>
                <div><RecipeList /></div>
                <div><ModalWindow /></div>
            </div>
        )
    }
}

export default MainPage