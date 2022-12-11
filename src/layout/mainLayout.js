import clsx from 'clsx';

const Layout = ({
	header,
	footer,
	children,
	className,
	headerClassName,
	footerClassName,
}) => {
	return (
		<div className="h-full w-full flex flex-col justify-between">
			<div
				className={clsx(
					'h-10 bg-slate-100 flex items-center border-y border-slate-300',
					headerClassName
				)}
			>
				{header}
			</div>
			<div
				className={clsx(
					'flex-grow bg-white max-h-full overflow-y-auto',
					className
				)}
			>
				{children}
			</div>
			<div
				className={clsx(
					'bg-slate-100 border-y border-slate-300',
					footerClassName
				)}
			>
				{footer}
			</div>
		</div>
	);
};

export default Layout;
