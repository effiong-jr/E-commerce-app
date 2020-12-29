import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Footer from './components/Footer'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route exact path='/' component={HomeScreen} />
					<Route path='/product/:id' component={ProductScreen} />
				</Container>
			</main>

			<Footer />
		</Router>
	)
}

export default App
