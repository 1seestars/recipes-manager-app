import React from 'react'
import HeadButtons from './HeadButtons'
import RecipeList from './RecipeList'
import ModalWindow from './ModalWindow'
import { connect } from 'react-redux'
import { getRecipes, addRecipe, editRecipe } from '../../store/recipeList/actions'
import { callModalWindow } from '../../store/modalWindow/actions'

class MainPage extends React.Component {
    state = {
        currentEditId: ''
    }

    componentDidMount() {
        this.props.getRecipes()
    }

    onSubmit = values => {
        const route = `recipe/${this.state.currentEditId}`
        this.props.modalWindowType === 'add' ? this.props.addRecipe(values) : this.props.editRecipe(route, values)
        this.props.callModalWindow('')
    }

    changeCurrentId = id => {
        this.setState({ currentEditId: id })
    }

    render() {
        return(
            <div className="wrapper">
                <div><HeadButtons /></div>
                <div><RecipeList changeId={this.changeCurrentId} /></div>
                <div><ModalWindow onSubmit={this.onSubmit} /></div>
            </div>
        )
    }
}

const mapStateToProps = ({ modalWindow: { modalWindowType } }) => (
    {
        modalWindowType
    }
) 

const mapDispatchToProps = {
    getRecipes,
    addRecipe,
    editRecipe,
    callModalWindow
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)