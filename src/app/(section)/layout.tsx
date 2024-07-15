import { PageLayout } from '@/layouts/PageLayout'

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
	return <PageLayout>{children}</PageLayout>
}
