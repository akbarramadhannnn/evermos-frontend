export const ReplaceToSlug = (text) => {
  const replaceSlash = text.replace(/\s\/\s/g, " ");
  const result = replaceSlash.replace(/ /g, "-").toLowerCase();
  return result;
};
