import { type } from 'os';
import { Email } from './cell-wrappers';

import { JSX } from 'react';

const userColumns = [
  { name: 'Name', getVal: (obj: { name: string; }) => obj?.name, setVal: (obj: Object, val: string) => Object.assign(obj, { name: val }), wrap: null },
  { name: 'Login', getVal: (obj: { username: string }) => obj.username, setVal: (obj: Object, val: string) => Object.assign(obj, { username: val }), wrap: null },
  { name: 'Email', getVal: (obj: { email: string }) => obj.email, setVal: (obj: Object, val: string) => Object.assign(obj, { email: val }), wrap: Email },
  // { name: 'Address city', getVal: (obj: { address?: { city?: string } }) => obj?.address?.city, setVal: (obj: { address?: any; }, val: string) => Object.assign(obj, ({ address: Object.assign(obj?.address || {}, { city: val }) })), wrap:null },
] as const;

type ColumnsNames = typeof userColumns[number]['name'];
type FormDataType = { [key in ColumnsNames]: string };

export default userColumns;

const defaultUser = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  company: { name: '', catchPhrase: '', bs: '' },
  address: { street: '', suite: '', city: '', zipcode: '' }
};

export function createUserFromFormData(data: FormDataType) {
  const user = Object.assign({}, defaultUser, { id: Math.trunc(1e7 * Math.random()) });
  Object.keys(data).map(key => userColumns.find(({ name }) => key === name)?.setVal(user, data[key as ColumnsNames]));
  console.log('user', user);
  return Object.assign({}, defaultUser, user);
}

export function editUserFromInputData(userForEdit: any, data: FormDataType) {
  const collectedUser = Object.assign({}, userForEdit);
  Object.keys(data).map(key => userColumns.find(({ name }) => key === name)?.setVal(collectedUser, data[key as ColumnsNames]));

  console.log('collectedUser= ', collectedUser);

  delete collectedUser.address
  delete collectedUser.company

  return collectedUser;
}

// export function changeUsers(data: FormDataType, userForEdit: any = defaultUser) {
//   const collectedUser = Object.assign({}, userForEdit);
//   Object.keys(data).map(key => userColumns.find(({ name }) => key === name)?.setVal(collectedUser, data[key as ColumnsNames]));

//   console.log('collectedUser= ', collectedUser);

//   delete collectedUser.address
//   delete collectedUser.company

//   return collectedUser;
// }