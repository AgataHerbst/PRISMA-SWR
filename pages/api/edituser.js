import { updateUser } from '../../db/db_wrap';
import { editUserFromInputData } from '../../lib/userColumns';

export default async function handler(req, res) {
    console.log('>> ', req.method, ' запрос на', req.url);


    const { user, inputData } = JSON.parse(req.body);


    try {
        const editedUser = await updateUser(editUserFromInputData(user, inputData));

        res.status(200).json(editedUser);
    } catch (error) {
        console.log(__filename, error);
        res.status(500).send({ error });
    }
}