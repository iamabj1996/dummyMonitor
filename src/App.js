import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { abi, address } from './Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Rectangle,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { Button, Col, Form, Row } from 'react-bootstrap';

const data = [
	{
		name: 'Space',
		scNo: 2,
		csNo: 3,
		brNo: 10,
	},
	{
		name: 'Calibration',
		scNo: 4,
		csNo: 8,
		brNo: 10,
	},
	{
		name: 'Capital Planning',
		scNo: 4,
		csNo: 8,
		brNo: 10,
	},
];

const App = () => {
	const [dataForBar, setDataForBar] = useState([]);
	const [searchValue, setSearchValue] = useState();
	const [noRecordsFound, setNoRecordsFound] = useState(false);
	const loadNuvoChain = async () => {
		const newData = [];

		const web3Provider = new Web3(
			new Web3.providers.HttpProvider(
				'https://a8e2-2405-201-37-7894-ac7f-a7dd-4c20-7a30.ngrok-free.app'
			)
		);

		const tokenContract = new web3Provider.eth.Contract(abi, address);
		const spaceTrx = await tokenContract.methods
			.getComparedResultForReleaseComNameAppName('Thailand', 'Adani', 'Space')
			.call({ from: '0xb507d99973a645357c8352DBff23963CA4E4A5d3' });
		console.log('spaceTrx', spaceTrx);
		newData.push({
			name: 'Space',
			scNo: spaceTrx[3].length,
			csNo: spaceTrx[4].length,
			brNo: spaceTrx[5].length,
		});

		const caliberationTrx = await tokenContract.methods
			.getComparedResultForReleaseComNameAppName(
				'Thailand',
				'Adani',
				'Calibration'
			)
			.call({ from: '0xb507d99973a645357c8352DBff23963CA4E4A5d3' });

		newData.push({
			name: 'Calibration',
			scNo: caliberationTrx[3].length,
			csNo: caliberationTrx[4].length,
			brNo: caliberationTrx[5].length,
		});

		console.log('newData', newData);

		const capitalPlanningTrx = await tokenContract.methods
			.getComparedResultForReleaseComNameAppName(
				'Thailand',
				'Adani',
				'Capital Planning'
			)
			.call({ from: '0xb507d99973a645357c8352DBff23963CA4E4A5d3' });
		console.log(' capitalPlanning', capitalPlanningTrx);
		newData.push({
			name: 'Capital Planning',
			scNo: caliberationTrx[3].length,
			csNo: caliberationTrx[4].length,
			brNo: caliberationTrx[5].length,
		});

		const realEstatePlanningTrx = await tokenContract.methods
			.getComparedResultForReleaseComNameAppName(
				'Thailand',
				'Adani',
				'Real Estate Asset Management'
			)
			.call({ from: '0xb507d99973a645357c8352DBff23963CA4E4A5d3' });
		console.log(' capitalPlanning', realEstatePlanningTrx);
		newData.push({
			name: 'Real Estate Manage ',
			scNo: realEstatePlanningTrx[3].length,
			csNo: realEstatePlanningTrx[4].length,
			brNo: realEstatePlanningTrx[5].length,
		});
		setDataForBar(newData);
	};

	useEffect(() => {
		loadNuvoChain();
		setSearchValue('Walmart');
	}, []);

	console.log('dataForBar', dataForBar);

	const handleSubmit = () => {
		console.log('this ran', searchValue);
	};

	useEffect(() => {
		if (searchValue === 'Walmart') {
			setNoRecordsFound(false);
		} else {
			setNoRecordsFound(true);
		}
	}, [searchValue]);

	const handleChange = (e) => {
		console.log('we', e);
		setSearchValue(e.target.value);
	};

	return (
		<>
			<Navbar expand='lg' className='bg-primary '>
				<Container>
					<Navbar.Brand href='#home' className='text-secondary'>
						NuvoloChain
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav' style={{ marginLeft: '60%' }}>
						<Nav>
							<Nav.Link href='#home' className='text-secondary'>
								COMPANY REPORTS
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Container className='mt-5 mb-5'>
				<Row>
					<Col></Col>
					<Col sm={4}>
						<Form className='d-flex'>
							<Form.Control
								type='search'
								placeholder='Search'
								className='me-2'
								aria-label='Search'
								value={searchValue}
								onChange={handleChange}
							/>
							<Button onClick={handleSubmit}>Search</Button>
						</Form>
					</Col>
					<Col></Col>
				</Row>
			</Container>
			<Row>
				<Col></Col>
				<Col>
					{noRecordsFound && (
						<div style={{ textAlign: 'center' }}>
							There is no data for this company
						</div>
					)}
					{!noRecordsFound && (
						<BarChart
							width={700}
							height={300}
							data={dataForBar}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar
								name='No SI changes'
								dataKey='scNo'
								fill='#8884d8'
								activeBar={<Rectangle fill='pink' stroke='blue' />}
							/>
							<Bar
								name='No CS changes'
								dataKey='csNo'
								fill='#82ca9d'
								activeBar={<Rectangle fill='gold' stroke='purple' />}
							/>
							<Bar
								name='No BR changes'
								dataKey='brNo'
								fill='#82ca5f'
								activeBar={<Rectangle fill='blue' stroke='purple' />}
							/>
						</BarChart>
					)}
				</Col>
				<Col></Col>
			</Row>
		</>
	);
};

export default App;
