import { ReactElement } from 'react'

export interface IconProps {
	className?: string
}

export type Icon = (props: IconProps) => ReactElement

export const SearchIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M22 22L20 20'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const EditIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M14.91 4.15002C15.58 6.54002 17.45 8.41002 19.85 9.09002'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const LoginIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M8.90002 8.36175C9.21002 4.76175 11.06 3.29175 15.11 3.29175H15.24C19.71 3.29175 21.5 5.08175 21.5 9.55175V16.0717C21.5 20.5417 19.71 22.3317 15.24 22.3317H15.11C11.09 22.3317 9.24002 20.8817 8.91002 17.3417'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M2 12.8018H14.88'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M12.65 9.45166L16 12.8017L12.65 16.1517'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const NotificationIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M12 6.44V9.77'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
		/>
		<path
			d='M12.02 2C8.34 2 5.36 4.98 5.36 8.66V10.76C5.36 11.44 5.08 12.46 4.73 13.04L3.46 15.16C2.68 16.47 3.22 17.93 4.66 18.41C9.44 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
		/>
		<path
			d='M15.33 18.82C15.33 20.65 13.83 22.15 12 22.15C11.09 22.15 10.25 21.77 9.65 21.17C9.05 20.57 8.67 19.73 8.67 18.82'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
		/>
	</svg>
)

export const MenuIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M3 7H21'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
		/>
		<path
			d='M3 12H21'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
		/>
		<path
			d='M3 17H21'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
		/>
	</svg>
)

export const CloseIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M5.00098 5L19 18.9991'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M5.00009 18.9991L18.9991 5'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const HomeIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M12 18V15'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const DocumentIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M22 10H18C15 10 14 9 14 6V2L22 10Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M7 13H13'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M7 17H11'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const GridIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M22 8.27V4.23C22 2.64 21.36 2 19.77 2H15.73C14.14 2 13.5 2.64 13.5 4.23V8.27C13.5 9.86 14.14 10.5 15.73 10.5H19.77C21.36 10.5 22 9.86 22 8.27Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M15 15.5H21'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
		/>
		<path
			d='M15 19.5H21'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
		/>
	</svg>
)

export const LogoutIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M8.90002 8.36175C9.21002 4.76175 11.06 3.29175 15.11 3.29175H15.24C19.71 3.29175 21.5 5.08175 21.5 9.55175V16.0717C21.5 20.5417 19.71 22.3317 15.24 22.3317H15.11C11.09 22.3317 9.24002 20.8817 8.91002 17.3417'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M15 12.8018H3.62'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M5.85 9.45166L2.5 12.8017L5.85 16.1517'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const TickIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
			fill='currentColor'
		/>
		<path
			d='M10.5799 15.58C10.3799 15.58 10.1899 15.5 10.0499 15.36L7.21994 12.53C6.92994 12.24 6.92994 11.76 7.21994 11.47C7.50994 11.18 7.98994 11.18 8.27994 11.47L10.5799 13.77L15.7199 8.62998C16.0099 8.33998 16.4899 8.33998 16.7799 8.62998C17.0699 8.91998 17.0699 9.39998 16.7799 9.68998L11.1099 15.36C10.9699 15.5 10.7799 15.58 10.5799 15.58Z'
			fill='white'
		/>
	</svg>
)

export const HeartSolidIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M16.44 3.09998C14.63 3.09998 13.01 3.97998 12 5.32998C10.99 3.97998 9.37 3.09998 7.56 3.09998C4.49 3.09998 2 5.59998 2 8.68998C2 9.87998 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.87998 22 8.68998C22 5.59998 19.51 3.09998 16.44 3.09998Z'
			fill='currentColor'
		/>
	</svg>
)

export const SmsICon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M17 2.80176H7C4.24 2.80176 2 5.03176 2 7.78176V13.7618V14.7618C2 17.5118 4.24 19.7418 7 19.7418H8.5C8.77 19.7418 9.13 19.9218 9.3 20.1418L10.8 22.1318C11.46 23.0118 12.54 23.0118 13.2 22.1318L14.7 20.1418C14.89 19.8918 15.19 19.7418 15.5 19.7418H17C19.76 19.7418 22 17.5118 22 14.7618V7.78176C22 5.03176 19.76 2.80176 17 2.80176ZM13 14.5518H7C6.59 14.5518 6.25 14.2118 6.25 13.8018C6.25 13.3918 6.59 13.0518 7 13.0518H13C13.41 13.0518 13.75 13.3918 13.75 13.8018C13.75 14.2118 13.41 14.5518 13 14.5518ZM17 9.55176H7C6.59 9.55176 6.25 9.21176 6.25 8.80176C6.25 8.39176 6.59 8.05176 7 8.05176H17C17.41 8.05176 17.75 8.39176 17.75 8.80176C17.75 9.21176 17.41 9.55176 17 9.55176Z'
			fill='currentColor'
		/>
	</svg>
)

export const CupIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M11.25 18.25H9C7.9 18.25 7 19.15 7 20.25V20.5H6C5.59 20.5 5.25 20.84 5.25 21.25C5.25 21.66 5.59 22 6 22H18C18.41 22 18.75 21.66 18.75 21.25C18.75 20.84 18.41 20.5 18 20.5H17V20.25C17 19.15 16.1 18.25 15 18.25H12.75V15.96C12.5 15.99 12.25 16 12 16C11.75 16 11.5 15.99 11.25 15.96V18.25Z'
			fill='currentColor'
		/>
		<path
			d='M18.48 11.64C19.14 11.39 19.72 10.98 20.18 10.52C21.11 9.49 21.72 8.26 21.72 6.82C21.72 5.38 20.59 4.25 19.15 4.25H18.59C17.94 2.92 16.58 2 15 2H9C7.42 2 6.06 2.92 5.41 4.25H4.85C3.41 4.25 2.28 5.38 2.28 6.82C2.28 8.26 2.89 9.49 3.82 10.52C4.28 10.98 4.86 11.39 5.52 11.64C6.56 14.2 9.06 16 12 16C14.94 16 17.44 14.2 18.48 11.64ZM14.84 8.45L14.22 9.21C14.12 9.32 14.05 9.54 14.06 9.69L14.12 10.67C14.16 11.27 13.73 11.58 13.17 11.36L12.26 11C12.12 10.95 11.88 10.95 11.74 11L10.83 11.36C10.27 11.58 9.84 11.27 9.88 10.67L9.94 9.69C9.95 9.54 9.88 9.32 9.78 9.21L9.16 8.45C8.77 7.99 8.94 7.48 9.52 7.33L10.47 7.09C10.62 7.05 10.8 6.91 10.88 6.78L11.41 5.96C11.74 5.45 12.26 5.45 12.59 5.96L13.12 6.78C13.2 6.91 13.38 7.05 13.53 7.09L14.48 7.33C15.06 7.48 15.23 7.99 14.84 8.45Z'
			fill='currentColor'
		/>
	</svg>
)

export const EmailIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M17 21.3018H7C4 21.3018 2 19.8018 2 16.3018V9.30176C2 5.80176 4 4.30176 7 4.30176H17C20 4.30176 22 5.80176 22 9.30176V16.3018C22 19.8018 20 21.3018 17 21.3018Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M17 9.80176L13.87 12.3018C12.84 13.1218 11.15 13.1218 10.12 12.3018L7 9.80176'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const GoogleIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		className={className}
	>
		<g transform='matrix(1, 0, 0, 1, 27.009001, -39.238998)'>
			<path
				fill='#4285F4'
				d='M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z'
			></path>
			<path
				fill='#34A853'
				d='M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z'
			></path>
			<path
				fill='#FBBC05'
				d='M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z'
			></path>
			<path
				fill='#EA4335'
				d='M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z'
			></path>
		</g>
	</svg>
)

export const FacebookIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		viewBox='0 0 14222 14222'
	>
		<circle cx='7111' cy='7112' r='7111' fill='#1977f3'></circle>
		<path
			d='M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z'
			fill='#fff'
		></path>
	</svg>
)

export const GithubIcon = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		viewBox='0 0 120.78 117.79'
	>
		<path d='M60.39,0C27.04,0,0,27.04,0,60.39c0,26.68,17.3,49.32,41.3,57.3,3.02,.56,4.13-1.31,4.13-2.91,0-1.44-.06-6.2-.08-11.24-16.8,3.65-20.34-7.12-20.34-7.12-2.75-6.98-6.7-8.84-6.7-8.84-5.48-3.75,.41-3.67,.41-3.67,6.06,.43,9.26,6.22,9.26,6.22,5.39,9.23,14.13,6.56,17.57,5.02,.54-3.9,2.11-6.57,3.83-8.08-13.41-1.53-27.51-6.71-27.51-29.84,0-6.59,2.36-11.98,6.22-16.21-.63-1.52-2.69-7.66,.58-15.98,0,0,5.07-1.62,16.61,6.19,4.82-1.34,9.98-2.01,15.12-2.03,5.13,.02,10.3,.69,15.13,2.03,11.53-7.81,16.59-6.19,16.59-6.19,3.29,8.32,1.22,14.46,.59,15.98,3.87,4.23,6.21,9.62,6.21,16.21,0,23.19-14.13,28.3-27.57,29.8,2.17,1.87,4.1,5.55,4.1,11.18,0,8.08-.07,14.58-.07,16.57,0,1.61,1.09,3.49,4.15,2.9,23.98-7.99,41.26-30.62,41.26-57.29C120.78,27.04,93.74,0,60.39,0Z'></path>
		<path d='M22.87,86.7c-.13,.3-.61,.39-1.04,.18-.44-.2-.68-.61-.54-.91,.13-.31,.6-.39,1.04-.19,.44,.2,.69,.61,.54,.91h0Z'></path>
		<path d='M25.32,89.43c-.29,.27-.85,.14-1.23-.28-.4-.42-.47-.98-.18-1.25,.3-.27,.84-.14,1.24,.28,.4,.43,.47,.98,.17,1.25h0Z'></path>
		<path d='M27.7,92.91c-.37,.26-.98,.02-1.35-.52-.37-.54-.37-1.18,0-1.44,.37-.26,.97-.03,1.35,.51,.37,.55,.37,1.19,0,1.45h0Z'></path>
		<path d='M30.96,96.27c-.33,.37-1.04,.27-1.55-.23-.53-.49-.67-1.18-.34-1.54,.34-.37,1.04-.26,1.56,.23,.52,.49,.68,1.18,.33,1.54h0Z'></path>
		<path d='M35.46,98.22c-.15,.47-.83,.69-1.51,.49-.68-.21-1.13-.76-.99-1.24,.14-.48,.82-.7,1.51-.49,.68,.21,1.13,.76,.99,1.24h0Z'></path>
		<path d='M40.4,98.58c.02,.5-.56,.91-1.28,.92-.72,.02-1.31-.39-1.31-.88,0-.5,.57-.91,1.29-.92,.72-.01,1.31,.39,1.31,.88h0Z'></path>
		<path d='M45,97.8c.09,.49-.41,.98-1.13,1.12-.7,.13-1.35-.17-1.44-.65-.09-.5,.42-1,1.12-1.13,.71-.12,1.35,.17,1.44,.66h0Z'></path>
	</svg>
)

export const UserEditIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M12 12.8018C14.7614 12.8018 17 10.5632 17 7.80176C17 5.04033 14.7614 2.80176 12 2.80176C9.23858 2.80176 7 5.04033 7 7.80176C7 10.5632 9.23858 12.8018 12 12.8018Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M19.21 16.5418L15.67 20.0818C15.53 20.2218 15.4 20.4818 15.37 20.6718L15.18 22.0218C15.11 22.5118 15.45 22.8518 15.94 22.7818L17.29 22.5918C17.48 22.5618 17.75 22.4318 17.88 22.2918L21.42 18.7518C22.03 18.1418 22.32 17.4318 21.42 16.5318C20.53 15.6418 19.82 15.9318 19.21 16.5418Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M18.7 17.0518C19 18.1318 19.84 18.9717 20.92 19.2717'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M3.40997 22.8018C3.40997 18.9318 7.26 15.8018 12 15.8018C13.04 15.8018 14.04 15.9518 14.97 16.2318'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const SecurityIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			d='M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63999 20.59 3.09 16.01 3.09 11.12V6.73003C3.09 5.91003 3.71001 4.98004 4.48001 4.67004L10.05 2.39007C11.3 1.88007 12.71 1.88007 13.96 2.39007L19.53 4.67004C20.29 4.98004 20.92 5.91003 20.92 6.73003L20.91 11.12Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M12 12.5V15.5'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const TickBulkIcon = ({ className }: IconProps) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
	>
		<path
			opacity='0.2'
			d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
			fill='currentColor'
		/>
		<path
			d='M10.5799 15.58C10.3799 15.58 10.1899 15.5 10.0499 15.36L7.21994 12.53C6.92994 12.24 6.92994 11.76 7.21994 11.47C7.50994 11.18 7.98994 11.18 8.27994 11.47L10.5799 13.77L15.7199 8.62998C16.0099 8.33998 16.4899 8.33998 16.7799 8.62998C17.0699 8.91998 17.0699 9.39998 16.7799 9.68998L11.1099 15.36C10.9699 15.5 10.7799 15.58 10.5799 15.58Z'
			fill='currentColor'
		/>
	</svg>
)

export const CloseBulkIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			opacity='0.3'
			d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
			fill='currentColor'
		/>
		<path
			d='M13.06 12L15.36 9.69998C15.65 9.40998 15.65 8.92999 15.36 8.63999C15.07 8.34999 14.59 8.34999 14.3 8.63999L12 10.94L9.7 8.63999C9.41 8.34999 8.93 8.34999 8.64 8.63999C8.35 8.92999 8.35 9.40998 8.64 9.69998L10.94 12L8.64 14.3C8.35 14.59 8.35 15.07 8.64 15.36C8.79 15.51 8.98 15.58 9.17 15.58C9.36 15.58 9.55 15.51 9.7 15.36L12 13.06L14.3 15.36C14.45 15.51 14.64 15.58 14.83 15.58C15.02 15.58 15.21 15.51 15.36 15.36C15.65 15.07 15.65 14.59 15.36 14.3L13.06 12Z'
			fill='currentColor'
		/>
	</svg>
)

export const ArrowDownIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M19.92 9.75177L13.4 16.2718C12.63 17.0418 11.37 17.0418 10.6 16.2718L4.07996 9.75177'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const GalleryIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			opacity='0.3'
			d='M22 7.81V13.9L20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L2.67 18.95L2.56 19.03C2.19 18.23 2 17.28 2 16.19V7.81C2 4.17 4.17 2 7.81 2H16.19C19.83 2 22 4.17 22 7.81Z'
			fill='currentColor'
		/>
		<path
			d='M9 10.38C10.3144 10.38 11.38 9.31443 11.38 8C11.38 6.68556 10.3144 5.62 9 5.62C7.68556 5.62 6.62 6.68556 6.62 8C6.62 9.31443 7.68556 10.38 9 10.38Z'
			fill='currentColor'
		/>
		<path
			d='M22 13.9001V16.1901C22 19.8301 19.83 22.0001 16.19 22.0001H7.81C5.26 22.0001 3.42 20.9301 2.56 19.0301L2.67 18.9501L7.59 15.6501C8.39 15.1101 9.52 15.1701 10.23 15.7901L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001Z'
			fill='currentColor'
		/>
	</svg>
)

export const ArrowUpIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M19.92 15.8518L13.4 9.33177C12.63 8.56177 11.37 8.56177 10.6 9.33177L4.07996 15.8518'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const AddIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M6 12H18'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M12 18V6'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const MoreIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z'
			stroke='currentColor'
			strokeWidth='1.5'
		/>
		<path
			d='M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z'
			stroke='currentColor'
			strokeWidth='1.5'
		/>
		<path
			d='M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z'
			stroke='currentColor'
			strokeWidth='1.5'
		/>
	</svg>
)

export const FacebookIcon2 = ({ className }: IconProps) => (
	<svg
		stroke='currentColor'
		fill='currentColor'
		strokeWidth='0'
		viewBox='0 0 16 16'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z'></path>
	</svg>
)

export const TwitterIcon = ({ className }: IconProps) => (
	<svg
		stroke='currentColor'
		fill='currentColor'
		strokeWidth='0'
		viewBox='0 0 16 16'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z'></path>
	</svg>
)

export const GithubIcon2 = ({ className }: IconProps) => (
	<svg
		stroke='currentColor'
		fill='currentColor'
		strokeWidth='0'
		viewBox='0 0 16 16'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z'></path>
	</svg>
)

export const HeartIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const MessageIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M8.5 11.3018H15.5'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M7 19.2317H11L15.45 22.1917C16.11 22.6317 17 22.1617 17 21.3617V19.2317C20 19.2317 22 17.2317 22 14.2317V8.23169C22 5.23169 20 3.23169 17 3.23169H7C4 3.23169 2 5.23169 2 8.23169V14.2317C2 17.2317 4 19.2317 7 19.2317Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const ArchiveIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M9.25 9.04999C11.03 9.69999 12.97 9.69999 14.75 9.04999'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const ArchiveSolidIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2ZM15.01 9.75C14.04 10.1 13.02 10.28 12 10.28C10.98 10.28 9.96001 10.1 8.99001 9.75C8.60001 9.61 8.40001 9.18 8.54001 8.79C8.69001 8.4 9.12001 8.2 9.51001 8.34C11.12 8.92 12.89 8.92 14.5 8.34C14.89 8.2 15.32 8.4 15.46 8.79C15.6 9.18 15.4 9.61 15.01 9.75Z'
			fill='currentColor'
		/>
	</svg>
)

export const CameraIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M18 6C17.39 6 16.83 5.65 16.55 5.11L15.83 3.66C15.37 2.75 14.17 2 13.15 2H10.86C9.83002 2 8.63001 2.75 8.17001 3.66L7.45001 5.11C7.17001 5.65 6.61001 6 6.00002 6C3.83001 6 2.11001 7.83 2.25001 9.99L2.77001 18.25C2.89001 20.31 4.00002 22 6.76002 22H17.24C20 22 21.1 20.31 21.23 18.25L21.75 9.99C21.89 7.83 20.17 6 18 6ZM10.5 7.25H13.5C13.91 7.25 14.25 7.59 14.25 8C14.25 8.41 13.91 8.75 13.5 8.75H10.5C10.09 8.75 9.75001 8.41 9.75001 8C9.75001 7.59 10.09 7.25 10.5 7.25ZM12 18.12C10.14 18.12 8.62001 16.61 8.62001 14.74C8.62001 12.87 10.13 11.36 12 11.36C13.87 11.36 15.38 12.87 15.38 14.74C15.38 16.61 13.86 18.12 12 18.12Z'
			fill='currentColor'
		/>
	</svg>
)

export const HomeSolidIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M20.83 8.01002L14.28 2.77002C13 1.75002 11 1.74002 9.73002 2.76002L3.18002 8.01002C2.24002 8.76002 1.67002 10.26 1.87002 11.44L3.13002 18.98C3.42002 20.67 4.99002 22 6.70002 22H17.3C18.99 22 20.59 20.64 20.88 18.97L22.14 11.43C22.32 10.26 21.75 8.76002 20.83 8.01002ZM12.75 18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18Z'
			fill='currentColor'
		/>
	</svg>
)

export const GridSolidIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M21 16.25H15C14.59 16.25 14.25 15.91 14.25 15.5C14.25 15.09 14.59 14.75 15 14.75H21C21.41 14.75 21.75 15.09 21.75 15.5C21.75 15.91 21.41 16.25 21 16.25Z'
			fill='currentColor'
		/>
		<path
			d='M21 20.25H15C14.59 20.25 14.25 19.91 14.25 19.5C14.25 19.09 14.59 18.75 15 18.75H21C21.41 18.75 21.75 19.09 21.75 19.5C21.75 19.91 21.41 20.25 21 20.25Z'
			fill='currentColor'
		/>
		<path
			d='M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z'
			fill='currentColor'
		/>
		<path
			d='M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z'
			fill='currentColor'
		/>
		<path
			d='M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z'
			fill='currentColor'
		/>
	</svg>
)

export const SearchSolidIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
			fill='currentColor'
		/>
		<path
			d='M21.3 22C21.12 22 20.94 21.93 20.81 21.8L18.95 19.94C18.68 19.67 18.68 19.23 18.95 18.95C19.22 18.68 19.66 18.68 19.94 18.95L21.8 20.81C22.07 21.08 22.07 21.52 21.8 21.8C21.66 21.93 21.48 22 21.3 22Z'
			fill='currentColor'
		/>
	</svg>
)

export const DocumentSolidIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M15.8001 2.20999C15.3901 1.79999 14.6801 2.07999 14.6801 2.64999V6.13999C14.6801 7.59999 15.9201 8.80999 17.4301 8.80999C18.3801 8.81999 19.7001 8.81999 20.8301 8.81999C21.4001 8.81999 21.7001 8.14999 21.3001 7.74999C19.8601 6.29999 17.2801 3.68999 15.8001 2.20999Z'
			fill='currentColor'
		/>
		<path
			d='M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19ZM11.5 17.75H7.5C7.09 17.75 6.75 17.41 6.75 17C6.75 16.59 7.09 16.25 7.5 16.25H11.5C11.91 16.25 12.25 16.59 12.25 17C12.25 17.41 11.91 17.75 11.5 17.75ZM13.5 13.75H7.5C7.09 13.75 6.75 13.41 6.75 13C6.75 12.59 7.09 12.25 7.5 12.25H13.5C13.91 12.25 14.25 12.59 14.25 13C14.25 13.41 13.91 13.75 13.5 13.75Z'
			fill='currentColor'
		/>
	</svg>
)

export const GlobalIcon = ({ className }: IconProps) => (
	<svg
		stroke='currentColor'
		fill='currentColor'
		strokeWidth='0'
		viewBox='0 0 496 512'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z'></path>
	</svg>
)

export const ArrowLeftIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M15 20.7218L8.48003 14.2018C7.71003 13.4318 7.71003 12.1718 8.48003 11.4018L15 4.88177'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const ArrowRightIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M8.90997 20.7218L15.43 14.2018C16.2 13.4318 16.2 12.1718 15.43 11.4018L8.90997 4.88177'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const SmsOutlineIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M8.5 19.8018H8C4 19.8018 2 18.8018 2 13.8018V8.80176C2 4.80176 4 2.80176 8 2.80176H16C20 2.80176 22 4.80176 22 8.80176V13.8018C22 17.8018 20 19.8018 16 19.8018H15.5C15.19 19.8018 14.89 19.9518 14.7 20.2018L13.2 22.2018C12.54 23.0818 11.46 23.0818 10.8 22.2018L9.3 20.2018C9.14 19.9818 8.77 19.8018 8.5 19.8018Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M15.9965 11.8018H16.0054'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M11.9955 11.8018H12.0045'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M7.99451 11.8018H8.00349'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const RefreshIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M22 12.8018C22 18.3218 17.52 22.8018 12 22.8018C6.48 22.8018 3.11 17.2418 3.11 17.2418M3.11 17.2418H7.63M3.11 17.2418V22.2418M2 12.8018C2 7.28176 6.44 2.80176 12 2.80176C18.67 2.80176 22 8.36176 22 8.36176M22 8.36176V3.36176M22 8.36176H17.56'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const GalleryBoldIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M2.57999 19.01L2.55999 19.03C2.28999 18.44 2.11999 17.77 2.04999 17.03C2.11999 17.76 2.30999 18.42 2.57999 19.01Z'
			fill='currentColor'
		/>
		<path
			d='M9 10.38C10.3144 10.38 11.38 9.31443 11.38 8C11.38 6.68556 10.3144 5.62 9 5.62C7.68556 5.62 6.62 6.68556 6.62 8C6.62 9.31443 7.68556 10.38 9 10.38Z'
			fill='currentColor'
		/>
		<path
			d='M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z'
			fill='currentColor'
		/>
	</svg>
)

export const VideoIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M21.15 6.17C20.74 5.95 19.88 5.72 18.71 6.54L17.24 7.58C17.13 4.47 15.78 3.25 12.5 3.25H6.5C3.08 3.25 1.75 4.58 1.75 8V16C1.75 18.3 3 20.75 6.5 20.75H12.5C15.78 20.75 17.13 19.53 17.24 16.42L18.71 17.46C19.33 17.9 19.87 18.04 20.3 18.04C20.67 18.04 20.96 17.93 21.15 17.83C21.56 17.62 22.25 17.05 22.25 15.62V8.38C22.25 6.95 21.56 6.38 21.15 6.17ZM11 11.38C9.97 11.38 9.12 10.54 9.12 9.5C9.12 8.46 9.97 7.62 11 7.62C12.03 7.62 12.88 8.46 12.88 9.5C12.88 10.54 12.03 11.38 11 11.38Z'
			fill='currentColor'
		/>
	</svg>
)

export const LikeIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M7.47998 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.35003 19.58 9.35003H15.58C14.98 9.35003 14.48 8.85003 14.58 8.15003L15.08 4.95003C15.28 4.05003 14.68 3.05003 13.78 2.75003C12.98 2.45003 11.98 2.85003 11.58 3.45003L7.47998 9.55003'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeMiterlimit='10'
		/>
		<path
			d='M2.38 18.35V8.55002C2.38 7.15002 2.98 6.65002 4.38 6.65002H5.38C6.78 6.65002 7.38 7.15002 7.38 8.55002V18.35C7.38 19.75 6.78 20.25 5.38 20.25H4.38C2.98 20.25 2.38 19.75 2.38 18.35Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const SendIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M9.51 4.23001L18.07 8.51001C21.91 10.43 21.91 13.57 18.07 15.49L9.51 19.77C3.75 22.65 1.4 20.29 4.28 14.54L5.15 12.81C5.37 12.37 5.37 11.64 5.15 11.2L4.28 9.46001C1.4 3.71001 3.76 1.35001 9.51 4.23001Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M5.44 12H10.84'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const CameraOutlineIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M6.76002 22H17.24C20 22 21.1 20.31 21.23 18.25L21.75 9.99C21.89 7.83 20.17 6 18 6C17.39 6 16.83 5.65 16.55 5.11L15.83 3.66C15.37 2.75 14.17 2 13.15 2H10.86C9.83001 2 8.63001 2.75 8.17001 3.66L7.45001 5.11C7.17001 5.65 6.61002 6 6.00002 6C3.83001 6 2.11001 7.83 2.25001 9.99L2.77001 18.25C2.89001 20.31 4.00002 22 6.76002 22Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M10.5 8H13.5'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M12 18C13.79 18 15.25 16.54 15.25 14.75C15.25 12.96 13.79 11.5 12 11.5C10.21 11.5 8.75 12.96 8.75 14.75C8.75 16.54 10.21 18 12 18Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const MessagesSolidIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M22 13.6618C22 15.9518 20.82 17.9818 19 19.2618L17.66 22.2118C17.35 22.8818 16.45 23.0118 15.98 22.4418L14.5 20.6618C12.64 20.6618 10.93 20.0318 9.63 18.9818L10.23 18.2718C14.85 17.9218 18.5 14.2618 18.5 9.80178C18.5 9.04178 18.39 8.29178 18.19 7.57178C20.46 8.77178 22 11.0518 22 13.6618Z'
			fill='currentColor'
		/>
		<path
			d='M16.3 6.87176C15.13 4.47176 12.52 2.80176 9.5 2.80176C5.36 2.80176 2 5.93176 2 9.80176C2 12.0918 3.18 14.1218 5 15.4018L6.34 18.3518C6.65 19.0218 7.55 19.1418 8.02 18.5818L8.57 17.9218L9.5 16.8018C13.64 16.8018 17 13.6718 17 9.80176C17 8.75176 16.75 7.76176 16.3 6.87176ZM12 10.5518H7C6.59 10.5518 6.25 10.2118 6.25 9.80176C6.25 9.39176 6.59 9.05176 7 9.05176H12C12.41 9.05176 12.75 9.39176 12.75 9.80176C12.75 10.2118 12.41 10.5518 12 10.5518Z'
			fill='currentColor'
		/>
	</svg>
)

export const MessagesIcon = ({ className }: IconProps) => (
	<svg
		className={className}
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M17 9.80176C17 13.6718 13.64 16.8018 9.5 16.8018L8.57001 17.9218L8.02 18.5818C7.55 19.1418 6.65 19.0217 6.34 18.3517L5 15.4017C3.18 14.1217 2 12.0918 2 9.80176C2 5.93176 5.36 2.80176 9.5 2.80176C12.52 2.80176 15.13 4.47177 16.3 6.87177C16.75 7.76177 17 8.75176 17 9.80176Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M22 13.6617C22 15.9517 20.82 17.9818 19 19.2618L17.66 22.2117C17.35 22.8817 16.45 23.0118 15.98 22.4418L14.5 20.6617C12.08 20.6617 9.92001 19.5918 8.57001 17.9218L9.5 16.8018C13.64 16.8018 17 13.6718 17 9.80176C17 8.75176 16.75 7.76177 16.3 6.87177C19.57 7.62177 22 10.3817 22 13.6617Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M7 9.80176H12'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
)

export const ReturnIcon = ({ className }: IconProps) => (
	<svg
		stroke='currentColor'
		fill='currentColor'
		strokeWidth='0'
		viewBox='0 0 512 512'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='32'
			d='M400 352l64-64-64-64'
		></path>
		<path
			fill='none'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='32'
			d='M448 288H154c-58.76 0-106-49.33-106-108v-20'
		></path>
	</svg>
)

export const EyeIcon = ({ className }: IconProps) => (
	<svg
		stroke='currentColor'
		fill='currentColor'
		strokeWidth='0'
		viewBox='0 0 1024 1024'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M396 512a112 112 0 1 0 224 0 112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z'></path>
	</svg>
)

export const LoaderIcon = ({ className }: IconProps) => (
	<svg
		stroke='currentColor'
		fill='none'
		strokeWidth='2'
		viewBox='0 0 24 24'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
		<path d='M12 3a9 9 0 1 0 9 9'></path>
	</svg>
)
