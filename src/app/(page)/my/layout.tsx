import { ProfileLayout } from '@/layouts/ProfileLayout'

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
	return <ProfileLayout>{children}</ProfileLayout>
}
