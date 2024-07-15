import { Features } from '@/components/Features'
import { Brands } from '@/components/Brands'
import { Actions } from '@/components/Actions'
import { Company } from '@/components/Company'

import styles from './Home.module.scss'

export const Home = () => {
	return (
		<div className={styles.container}>
			<Features />
			<Actions />
			<Company />
		</div>
	)
}
