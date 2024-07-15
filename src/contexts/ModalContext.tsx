'use client'

import React, { type PropsWithChildren } from 'react'

interface IModalContext {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const ModalContext = React.createContext<IModalContext>({
	isOpen: false,
	onOpen: () => {},
	onClose: () => {}
})

export const ModalProvider = ({ children }: PropsWithChildren<unknown>) => {
	const [isOpen, setIsOpen] = React.useState(false)

	const onOpen = () => {
		setIsOpen(true)
	}

	const onClose = () => {
		setIsOpen(false)
	}

	return (
		<ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
			{children}
		</ModalContext.Provider>
	)
}
