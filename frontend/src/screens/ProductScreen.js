import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match }) => {
	const [qty, setQty] = useState(0)

	const dispatch = useDispatch()

	const productDetail = useSelector((state) => state.productDetail)
	const { error, loading, product } = productDetail

	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])

	return (
		<>
			<Link to='/' className='btn btn-light my-3'>
				Go back
			</Link>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image fluid src={product.image} alt={product.name} />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								Price: ${product.price}
							</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0
												? 'In Stock'
												: 'Out Of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty:</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) =>
														setQty(e.target.value)
													}
												>
													{[
														...Array(
															product.countInStock
														).keys(),
													].map((x) => (
														<option
															value={x + 1}
															key={x + 1}
														>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										className='btn-block'
										disabled={product.countInStock === 0}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
