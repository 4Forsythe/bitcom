import { ProfileSidebar } from '@/app/(page)/my/Profile/Sidebar'

import styles from './ProfileLayout.module.scss'

export function ProfileLayout({ children }: React.PropsWithChildren<unknown>) {
	return (
		<div className={styles.container}>
			<div className={styles.aside}>
				<ProfileSidebar />
			</div>
			<div className={styles.main}>{children}</div>
		</div>
	)
}
