import './App.css';
import { useState, useEffect } from 'react';

function ListContainer() {
	let [today, setDate] = useState(new Date());
	let pastdate = today;

	useEffect(() => {
		let timer = setInterval(() => {
			let currdate = new Date();
			if (
				pastdate.getDate() != currdate.getDate() ||
				pastdate.getMonth() != currdate.getMonth() ||
				pastdate.getFullYear() != currdate.getFullYear()
			) {
				items = [];
				setlist(items);
				localStorage.setItem('todolistitems', JSON.stringify(items));
				setDate(currdate);
				pastdate = today;
			}
		}, 6969);

		return function cleanup() {
			clearInterval(timer);
		};
	});

	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	let items = [];
	let browseritems = JSON.parse(localStorage.getItem('todolistitems'));
	if (browseritems) items = browseritems;

	let [todolist, setlist] = useState(items);

	const itemdone = (i) => {
		items = [...todolist];
		items[i].completed = !items[i].completed;
		setlist(items);
		localStorage.setItem('todolistitems', JSON.stringify(items));
	};

	const removeItem = (i) => {
		items = [...todolist];
		items.splice(i, 1);
		setlist(items);
		localStorage.setItem('todolistitems', JSON.stringify(items));
	};

	return (
		<div className="ListContainer">
			<div className="list-date">
				<div className="list-dateonly">
					<div className="list-date-value">{today.getDate()}</div>
					<div className="list-nondateonly">
						<div className="list-date-month">{months[today.getMonth()]}</div>
						<div className="list-date-year">{today.getFullYear()}</div>
					</div>
				</div>
				<div className="list-day">{days[today.getDay()]}</div>
			</div>

			<div className="list-item-container">
				<div className="list-items">
					{todolist.map((item, i) => (
						<div
							className={
								item.completed ? 'list-item list-name-done' : 'list-item'
							}
							key={item.id}
						>
							<span
								title="Click to remove this item"
								className="list-item-name"
								onClick={() => removeItem(i)}
							>
								{item.name}
							</span>
							<span
								className={
									item.completed
										? 'list-item-status list-item-done'
										: 'list-item-status list-item-undone'
								}
								onClick={() => {
									itemdone(i);
								}}
							></span>
						</div>
					))}
				</div>
			</div>

			<div
				className="additembtn"
				onClick={() => {
					let name = prompt('Enter list item name');

					if (name.trim().length === 0) return;

					items = [
						...todolist,
						{ id: Date.now(), name: name, completed: false },
					];
					setlist(items);
					localStorage.setItem('todolistitems', JSON.stringify(items));
				}}
			>
				Add
			</div>
		</div>
	);
}

export default ListContainer;
