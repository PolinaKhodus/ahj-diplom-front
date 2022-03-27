/* eslint-disable linebreak-style */
export function updFileMngr(stat, mngrPanel) {
  for (const key of Object.keys(stat)) {
    const rowEl = mngrPanel.querySelector(`.${key}_row`);
    rowEl.lastElementChild.textContent = stat[key];
  }
}

export function updOnAction(action, mngrPanel, task) {
  const rowEl = mngrPanel.querySelector(`.${task.type}_row`);
  const counter = rowEl.lastElementChild;

  if (action === 'deleteTask') {
    --counter.textContent;
    if (task.type === 'message' && task.content.includes('>http')) {
      mngrPanel.querySelector('.links_row')
        .lastElementChild.textContent--;
    }
    return;
  }

  if (action === 'addTask') {
    ++counter.textContent;
    if (task.type === 'message' && task.content.includes('>http')) {
      mngrPanel.querySelector('.links_row')
        .lastElementChild.textContent++;
    }
  }
}
