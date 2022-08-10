const getAllStates = require("./1");

const data = [
  {
    address: [
      {
        state: "California",
      },
    ],
  },
  {
    address: [
      {
        state: "Minnesota",
      },
    ],
  },
  {
    address: [
      {
        state: "New Hampshire",
      },
    ],
  },
];

const expected = ["California", "Minnesota", "New Hampshire"];

describe(`question 1. getAllStates`, () => {
  test(`is a promise`,  async () => {
    const result = await getAllStates(data);
    expected(result instanceof Promise).toBeTruthy();
  });

  test(`returns states`, async () => {
    const result = await getAllStates(data);
    expected(result).toStrictEqual(expected);
  });

  test(`check for duplicates`, async () => {
    const result = await getAllStates([...data, ...data]);
    expected(result).toStrictEqual(expected);
  });
});
