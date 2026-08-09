export const toSelectOptions = (items = [], labelKey = "name") => {
  return items.map((item) => ({
    value: item.id,
    label: item[labelKey],
  }));
};
