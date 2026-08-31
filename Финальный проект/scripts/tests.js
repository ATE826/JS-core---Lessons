import { filterUsers } from "./users.js";

export const applyTest = () => {
  const assert = chai.assert;

  describe("filterUsers", () => {
    it("Ervin in users with id = 2", () => {
      assert.isArray(filterUsers("Ervin"), "result is not array");
      assert.lengthOf(filterUsers("Ervin"), 1, "array lenth is not equal 1");
      assert.equal(filterUsers("Ervin")[0].id, 2, "user's ID is not equal 1");
    });
    it("2 users with Clementin", () => {
      assert.lengthOf(
        filterUsers("Clementin"),
        2,
        "array lenth is not equal 2",
      );
    });
    it("Find patricia", () => {
      assert.lengthOf(filterUsers("patricia"), 1, "array lenth is not equal 1");
    });
  });

  mocha.run();
};
