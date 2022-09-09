import axios from 'axios'

const Data = axios('data.json').then((res) => res.data)

export default Data
