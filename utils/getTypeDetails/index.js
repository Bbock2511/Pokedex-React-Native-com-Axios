import axios from 'axios';

const getTypeDetails = async (typeUrl) => {
    try {
        const response = await axios.get(typeUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default getTypeDetails;