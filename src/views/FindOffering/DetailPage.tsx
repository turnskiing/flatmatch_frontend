import React, { FC, ReactElement, useState } from "react"
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap"

interface Props {
	title?: string
	description?: string
	show_now?: boolean
}

const DetailPage: FC<Props> = ({ title, description, show_now }): ReactElement => {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	if (show_now === true) {
		handleShow()
	}
	return (

		<>
			<Button variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default DetailPage
