import { ReactElement } from 'react'

export interface LayoutProps {
	children: ReactElement
}

export { default as EmptyLayout } from './emptyLayout'
export { default as HeaderOnlyLayout } from './headerOnlyLayout'
export { default as MainLayout } from './mainLayout'
export { default as NoFooterLayout } from './noFooterLayout'

