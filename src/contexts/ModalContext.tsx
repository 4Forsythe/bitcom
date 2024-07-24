'use client'

import React, { type PropsWithChildren } from 'react'

import { Modal } from '@/components/ui/Modal'

interface IModalContext {
	isOpen: boolean
	onOpen: (context: React.ReactNode) => void
	onClose: () => void
}

export const ModalContext = React.createContext<IModalContext>({
	isOpen: false,
	onOpen: () => {},
	onClose: () => {}
})

interface ModalProviderProps {
	children: React.ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [context, setContext] = React.useState<React.ReactNode>(null)

	const onOpen = (component: React.ReactNode) => {
		setContext(component)
		setIsOpen(true)
	}

	const onClose = () => {
		setContext(null)
		setIsOpen(false)
	}

	return (
		<ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
			{isOpen && <Modal>{context}</Modal>}
			{children}
		</ModalContext.Provider>
	)
}
