import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

import MainLayout from '../layout/mainLayout';

const TaskList = ({
	tasks,
	setCurrentTaskID,
	createTask,
	deleteComment,
	setTaskStatus,
	setAllTaskStatus,
}) => {
	return (
		<>
			<MainLayout
				header={<Header {...{ createTask }} />}
				footer={
					<div className="bg-white flex items-center gap-2 py-4 px-3 cursor-pointer">
						<input
							type="checkbox"
							onChange={(e) => setAllTaskStatus(e.target.checked)}
						/>
						Mark all as complete
					</div>
				}
				headerClassName="px-2"
				className="bg-slate-100 p-4 flex flex-col gap-4"
				footerClassName="!p-1"
			>
				{tasks.map((task, index) => {
					return (
						<div
							key={index}
							className="group justify-between relative bg-white flex items-center py-3 px-4 gap-2 cursor-pointer active:bg-blue-300"
							onClick={() => {
								setCurrentTaskID(task.id);
							}}
						>
							<input
								type="checkbox"
								checked={task.complete}
								onChange={(e) => setTaskStatus(task.id, e.target.checked)}
							/>
							<p className="flex-grow">{task.title}</p>

							<div
								className="bg-red-500 p-2 group-hover:visible flex items-center invisible hover:bg-red-700"
								onClick={() => {
									deleteComment(task);
								}}
							>
								<TrashIcon className="w-4 h-4 fill-white" />
							</div>
						</div>
					);
				})}
			</MainLayout>
		</>
	);
};

const Header = ({ createTask }) => {
	let [modalOpen, setModalOpen] = useState(false);

	const closeModal = () => {
		setModalOpen(false);
	};

	const openModal = () => {
		setModalOpen(true);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		createTask({
			title: e.target[0].value,
			description: e.target[1].value,
		});

		e.target.reset();
		closeModal();
	};

	return (
		<>
			<div className="flex justify-between items-center w-full">
				<p>Task</p>
				<div
					className="bg-green-400 p-1 cursor-pointer hover:bg-green-500"
					onClick={openModal}
				>
					<PlusIcon className="w-5 h-5 fill-white" />
				</div>
			</div>

			<Transition appear show={modalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Payment successful
									</Dialog.Title>
									<form
										className="flex flex-col w-full gap-4 my-4"
										onSubmit={onSubmit}
									>
										<label className="flex flex-col font-semibold gap-2">
											Title
											<input
												type="text"
												className="bg-slate-100 placeholder-shown:px-2 border-b border-slate-300 py-2 px-2 font-normal"
											/>
										</label>
										<label className="flex flex-col font-semibold gap-2">
											Description
											<textarea className="bg-slate-100 placeholder-shown:px-2 border-b border-slate-300 py-2 px-2 font-normal" />
										</label>

										<div className="flex flex-end w-full gap-2 mt-4">
											<button
												className="rounded-lg px-4 py-2 bg-purple-500 text-white font-semibold"
												type="submit"
											>
												Submit
											</button>
											<button
												type="button"
												className="rounded-lg px-4 py-2 text-slate-900 font-semibold"
												onClick={closeModal}
											>
												Cancel
											</button>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default TaskList;
