import { useMemo, useState } from 'react';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';

const initialTask = [
	{
		id: 10001,
		createdAt: new Date('October 13, 2022 2:11:00'),
		complete: false,
		title: 'This is Task A',
		description: 'This is Task Description',
		comments: [
			{
				content: 'This is comment A',
				createdAt: new Date(),
			},
		],
	},
	{
		id: 125534,
		createdAt: new Date('December 11, 2022 11:13:00'),
		complete: true,
		title: 'This is Task B',
		description: 'This is Task Description BN',
		comments: [
			{
				content: 'This is comment B',
				createdAt: new Date(),
			},
		],
	},
	{
		id: 442213,
		createdAt: new Date('December 8, 2022 7:52:00'),
		complete: true,
		title: 'This is Task C',
		description: 'This is Task Description C',
		comments: [
			{
				content: 'This is comment C',
				createdAt: new Date(),
			},
		],
	},
];

function App() {
	const [task, setTask] = useState(initialTask);
	const [currentTaskID, setCurrentTaskID] = useState();

	const currentTask = useMemo(() => {
		return task.find((o) => o.id === currentTaskID);
	}, [currentTaskID, task]);

	const createTask = (e) => {
		setTask((prevState) => {
			let newTask = JSON.parse(JSON.stringify(prevState));
			newTask.push({
				id: Math.floor(Math.random() * 10000) + 1000,
				createdAt: new Date(),
				complete: false,
				title: e.title,
				description: e.description,
				comments: [],
			});

			return newTask;
		});
	};

	const updateDescription = (newDesc) => {
		const currIndex = task.findIndex((o) => o.id === currentTaskID);

		setTask((prevState) => {
			let newTask = JSON.parse(JSON.stringify(prevState));
			let updateTask = newTask[currIndex];
			updateTask.description = newDesc;

			return newTask;
		});
	};

	const addComment = (comment) => {
		const currIndex = task.findIndex((o) => o.id === currentTaskID);
		const currTask = currentTask;

		currTask.comments.push({
			content: comment,
			createdAt: new Date(),
		});

		setTask((prevState) => {
			let newTask = JSON.parse(JSON.stringify(prevState));
			newTask[currIndex] = currTask;

			return newTask;
		});
	};

	const deleteComment = (task) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`hapus task: ${task.title} ?`) === true) {
			setTask((prevState) => {
				let newTask = JSON.parse(JSON.stringify(prevState));

				newTask = newTask.filter(function (val) {
					return val.id !== task.id;
				});

				return newTask;
			});
		}
	};

	const setTaskStatus = (id, state) => {
		setTask((prevState) => {
			let newTask = JSON.parse(JSON.stringify(prevState));

			newTask.forEach((task) => {
				if (task.id === id) task.complete = state;
			});

			return newTask;
		});
	};

	const setAllTaskStatus = (state) => {
		setTask((prevState) => {
			let newTask = JSON.parse(JSON.stringify(prevState));

			newTask.forEach((task) => {
				task.complete = state;
			});

			return newTask;
		});
	};

	return (
		<div className="w-screen h-screen bg-white flex">
			<section className="flex-1 h-full">
				<TaskList
					tasks={task}
					{...{
						setCurrentTaskID,
						createTask,
						deleteComment,
						setTaskStatus,
						setAllTaskStatus,
					}}
				/>
			</section>
			<section className="flex-1 h-full border-l border-slate-300">
				<TaskDetail task={currentTask} {...{ addComment, updateDescription }} />
			</section>
		</div>
	);
}

export default App;
