import { ClockIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useEffect, useState, useRef } from 'react';
import moment from 'moment';

import MainLayout from '../layout/mainLayout';

const TaskDetail = ({ task, addComment, updateDescription }) => {
	const commentFormRef = useRef();
	const [description, setDescription] = useState();

	useEffect(() => {
		setDescription(task?.description);
	}, [task]);

	const onSubmitComment = (e) => {
		e.preventDefault();
		addComment(e.target[0].value);
		e.target.reset();
	};

	const onSubmitDescription = (e) => {
		updateDescription(e.target.value);
	};

	return !task ? null : (
		<MainLayout
			header={<Header {...{ task }} />}
			footer={<Footer {...{ task, onSubmitComment, commentFormRef }} />}
			className="flex flex-col"
			headerClassName="px-2"
			footerClassName="!p-4"
		>
			<form className="w-full" onSubmit={onSubmitDescription}>
				<textarea
					className="w-full bg-slate-50 p-4 border-b border-slate-300"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					onBlur={onSubmitDescription}
				/>
			</form>
			<div className="p-4 flex flex-col gap-4">
				{task?.comments.map((comment, index) => {
					return (
						<div className="flex flex-col text-sm" key={index}>
							<p>{comment.content}</p>
							<p className="text-xs text-slate-500 flex gap-1 mt-1 items-center">
								<ClockIcon className="w-4 h-4" />
								<span>
									{moment
										.utc(task?.createdAt)
										.local()
										.format('DD MMMM YYYY hh:mm A')}
								</span>
							</p>
						</div>
					);
				})}
			</div>
		</MainLayout>
	);
};

const Header = ({ task }) => {
	return (
		<p>
			Created:{' '}
			{moment.utc(task?.createdAt).local().format('DD MMM YYYY hh:mm A')}
		</p>
	);
};

const Footer = ({ task, onSubmitComment, commentFormRef }) => {
	return !task ? null : (
		<form className="flex" onSubmit={onSubmitComment} ref={commentFormRef}>
			<input
				type="text"
				placeholder="type a comment"
				className="placeholder-shown:px-2 flex-grow"
			/>
			<button
				className="bg-green-400 flex items-center justify-center p-2 hover:bg-green-500 cursor-pointer"
				type="submit"
			>
				<PencilIcon className="w-4 h-4 fill-white" />
			</button>
		</form>
	);
};

export default TaskDetail;
