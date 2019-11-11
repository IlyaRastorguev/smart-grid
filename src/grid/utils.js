function sortByAlphabet(list) {
  return list
    .map(item => {
      return item.toUpperCase();
    })
    .sort();
}

export default {
  sortByAlphabet
};
