import * as yup from 'yup'
import 'yup-phone-lite'

export const phoneSchema = yup.object().shape({
	phone: yup
		.string()
		.phone('RU', 'Только российские номера11')
		.required('Это обязательное поле')
})
