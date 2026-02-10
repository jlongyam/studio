export default function (t_input) {
	const s_type = Object.prototype.toString.call(t_input)
	return s_type.split(' ')[1].replace(']','')
}