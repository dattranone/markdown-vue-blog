export function getBlog(id, list) {
  return list.find(item => item.id === id);
}
