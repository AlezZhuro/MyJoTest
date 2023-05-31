import {AddCardType, CardDTO, CardType} from './models';

const getFilteredTasks = (
  tasks: CardDTO[],
  filterType: CardType = CardType.TASKS,
) => {
  if (!tasks.length) {
    return [];
  }

  return tasks.filter(t => t.type === filterType);
};

const addCard = (obj: AddCardType) => {
  console.log({obj});
};
export {getFilteredTasks, addCard};
