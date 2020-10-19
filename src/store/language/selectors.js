export const selectAllLangs = (state) => state.language.allLangs;
// export const selectLangOptions = (state) => {
//   state.language.map((l) => {
//     return { value: `${l.lang}`, label: `${l.lang}` };
//   });
// };

export const selectUsersWithLang = (state) => state.language.usersWithLang;
