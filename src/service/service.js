import axios from 'axios'

const data = axios('data.json').then((res) => res)

export default data
