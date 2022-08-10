const getEmailDomains = require("./5");

const data = [
  { email: "Maximo_Blick@gmail.com" },
  { email: "Tamia88@hotmail.com" },
  { email: "Fritz_Bailey@yahoo.com" },
];

const expected = ["gmail.com", "hotmail.com", "yahoo.com"];

describe(`question 5. getEmailDomains`, () => {
  test(`is a promise`, () => {
    const result = getEmailDomains(data);
    expect(result instanceof Promise).toBeTruthy();
  });

  test(`returns domains`, async () => {
    const result = await getEmailDomains(data);
    expect(result).toStrictEqual(expected);
  });

  test(`check for duplicates`, async () => {
    const result = await getEmailDomains([...data, ...data]);
    expect(result).toStrictEqual(expected);
  });
});
