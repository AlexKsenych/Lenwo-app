import axios from 'axios'

const getData = async () => {
    const res = await axios('data.json')
    return await res.data
}

export default getData
