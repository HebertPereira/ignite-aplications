import { NextApiRequest, NextApiResponse } from "next"

const getUser = (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Hebert' },
        { id: 2, name: 'Diego' },
        { id: 3, name: 'Vania' },
    ];

    return response.json(users);
};

export default getUser;
