import React from 'react'
import HeadButtons from './HeadButtons'
import RecipeList from './RecipeList'
import ModalWindow from './ModalWindow'
import { connect } from 'react-redux'
import { getRecipes } from '../../store/recipesList/actions'

class MainPage extends React.Component {
    componentDidMount() {
        this.props.getRecipes()
    }

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

const mapDispatchToProps = {
    getRecipes
}

export default connect(null, mapDispatchToProps)(MainPage)