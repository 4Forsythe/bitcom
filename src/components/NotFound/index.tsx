import { Button } from '@/components/ui/Button'

import { ROUTE } from '@/config/routes.config'

import styles from './NotFound.module.scss'

export const NotFound = () => {
	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<h1 className={styles.title}>Страница не найдена</h1>
				<div className={styles.action}>
					<Button
						href={ROUTE.HOME}
						variant='outlined'
					>
						Вернуться на главную
					</Button>
				</div>
			</div>
		</div>
	)
}
