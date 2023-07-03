import swr from 'swr';

import userColumns, { createUserFromFormData, editUserFromInputData } from '../lib/userColumns';

import ItemTR from './ItemTR';
import Spinner from './Spinner';
//import css from './Main.module.sass';
import { useRef, useState } from 'react';

import transmitData from '../includes/transmitData'
import { replaceObjectById } from '../includes/replaceObjectById'

const fetcher = url => fetch(url).then(r => r.json());
const useSWR = swr?.default || swr; 

export default function Main() {
  const
    [inputsVal, setInputsVal] = useState(Array(userColumns.length).fill('')),
    [userInputsVal, setUserInputsVal] = useState(Array(userColumns.length).fill('')),
    [editableUser, setEditableUser] = useState(null),

    formRef = useRef(null),
    { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

  console.log('editableUser=', editableUser);

  if (error) return <div className='error'>ошибка загрузки</div>;
  if (isLoading) return <Spinner />;
  if (Array.isArray(data)) return <>
    <form ref={formRef} method="post" action="/api/adduser" onSubmit={evt => '111' !== inputsVal[0] && evt.preventDefault()}>
      <table className={css.main}>
        <thead>
          <tr>
            {userColumns.map(el => <th key={el.name}>{el.name}</th>)}
            <th>Delete</th>
            <th>Edit</th>
          </tr>

        </thead>
        <tbody>

          {data?.map(user =>
            <tr key={user.id} title={'user.id=' + user.id}>

              <ItemTR
                obj={user}
                columnList={userColumns}
                editableUser={editableUser}
                userInputsVal={userInputsVal}
                setUserInputsVal={setUserInputsVal}
              />

              <td>
                <button onClick={async () => {
                  const response = await fetch('/api/user/' + user.id, {
                    method: 'DELETE'
                  });
                  console.log('response', response);
                }}>
                  x</button>
              </td>
              <td>
                {editableUser === user.id
                  ? <button type="submit" onClick={
                    async () => {
                      try {
                        const inputData = {
                          Name: userInputsVal[0],
                          Login: userInputsVal[1],
                          Email: userInputsVal[2]
                          // 'Address city': userInputsVal[3]
                        }
                        console.log('inputData', inputData);

                        setUserInputsVal(Array(userColumns.length).fill(''));
                        setEditableUser(null);

                        const jsonDataForEdit = JSON.stringify({ user, inputData });
                        console.log(jsonDataForEdit);

                        const newUser = editUserFromInputData(user, inputData);
                        console.log('newUser in Main=', newUser);

                        replaceObjectById(data, newUser);
                        await transmitData(jsonDataForEdit, 'edituser');

                        // await mutate(transmitData(jsonDataForEdit, 'edituser'), {
                        //   optimisticData: replaceObjectById(data, newUser),
                        //   rollbackOnError: true,
                        //   populateCache: true,
                        //   revalidate: false
                        // });

                      } catch (error) {
                        null;
                      } finally {
                        null;
                      }
                    }
                  }>Отправить</button>

                  : <button onClick={() => {
                    setEditableUser(user.id);
                    setUserInputsVal(userColumns.map(column => column.getVal(user)))
                  }}>Редактировать</button>
                }
              </td>
            </tr>)}
        </tbody>
        <tfoot>
          <tr>
            {userColumns.map((el, i) => <td key={el.name}>
              <input
                type="search"
                name={el.name}
                placeholder={`Введите ${el.name}`}
                value={inputsVal[i]}
                onInput={evt => setInputsVal(inputsVal.with(i, evt.target.value))} />
            </td>)}
            <td>
              <button type="submit" onClick={async () => {
                async function addUser(formData) {
                  try {
                    const response = await fetch('/api/adduser', {
                      method: 'POST',
                      body: formData
                    });
                    console.log('adduser response', response);
                    if (!response.ok) throw new Error('не ок');
                    const json = await response.json();
                    console.log('json', json);
                    return [...data, json];
                  } catch (error) {
                    null;

                  }
                }
                try {
                  setInputsVal([...inputsVal.fill('')]);
                  const formData = new URLSearchParams(new FormData(formRef.current));
                  // console.log('formData', formData);
                  // console.log('formData.keys()', formData.keys());
                  // console.log('[...formData.keys()]', [...formData.keys()]);

                  const userData = Object.fromEntries([...formData.keys()].map(key => [key, formData.get(key)]));
                  console.log('userData', userData);
                  const newUser = createUserFromFormData(userData);
                  console.log('newUser', newUser);

                  await mutate(addUser(formData), {
                    optimisticData: [...data, newUser],
                    rollbackOnError: true,
                    populateCache: true,
                    revalidate: false
                  });


                } catch (error) {
                  null;
                } finally {
                  null;
                }
              }
              }>
                Отправить
              </button>
            </td>
          </tr>
        </tfoot>
      </table>

    </form>
  </>;
}