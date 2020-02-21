import React from 'react'
import { getRecipes } from '../../store/recipesList/actions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

class Versions extends React.Component {
    componentDidMount() {
        this.props.getRecipes()
    }

    renderList = () => {
        const { recipes, isLoading, networkError } = this.props
        if (isLoading) {
            return (
                <div style={{ width: '100%', padding: '150px 0', textAlign: 'center' }}>
                    <CircularProgress color='primary' />
                </div>
            ) 
        } else if (!networkError) {
            return (
                <div>
                    {recipes.map(recipe => (
                        <div>{recipe.name}</div>
                    ))}
                </div>
            )
        } else {
          console.log('oshibka')
            return (
                <div className='badConnectAlert'>
                    <span style={{ fontWeight: '700', margin: '0 20px 0 40px' }}>✖</span><span style={{ fontWeight: '700' }}>{networkError}</span>
                </div>
            )
        }
    }

    render() {
        return this.renderList()
    }
}

const mapStateToProps = ({ recipeList: { recipes, isLoading, networkError } }) => (
    {
        recipes,
        isLoading,
        networkError
    }
) 
  
const mapDispatchToProps = {
    getRecipes
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Versions)