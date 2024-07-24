import { Features } from '@/components/Features'
import { Actions } from '@/components/Actions'
import { Company } from '@/components/Company'

import { Banner } from '@/components/Banner'
import { BANNERS } from '@/components/Banner/banners.data'

import styles from './Home.module.scss'

export const Home = () => {
	return (
		<div className={styles.container}>
			<Features />
			<div className={styles.banners}>
				{BANNERS.map((item, index) => (
					<Banner
						key={index}
						{...item}
					/>
				))}
			</div>
			<Actions />
			<Company />
		</div>
	)
}
