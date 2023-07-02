import columnList from '../lib/userColumns';

type columnListArr = typeof columnList;

export default function ItemTR({
  obj, columnList, editableUser, userInputsVal, setUserInputsVal
}: {
  obj: any,
  columnList: columnListArr,
  editableUser: number,
  userInputsVal: any,
  setUserInputsVal: any
}) {

  return <>
    {columnList.map((column, i) => <td key={column.name}>
      {(editableUser === obj.id)
        ? <input
          type="search"
          name={obj.name}
          placeholder={`Введите ${column.name}`}
          value={userInputsVal[i]}
          // onInput={evt => setUserInputsVal(userInputsVal.with(i, evt.target.value))}
          onInput={(evt: React.ChangeEvent<HTMLInputElement>) => setUserInputsVal(userInputsVal.with(i, evt.target.value))}
        />
        : column?.wrap ? <column.wrap value={column.getVal(obj)} /> : column.getVal(obj)
      }
    </td>)}
  </>;
}