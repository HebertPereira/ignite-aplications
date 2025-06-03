import { Either, left, right } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right("success");
  } else {
    return left("error");
  }
}

describe("Either Error Handler", async () => {
  it("should be able to return a success result", async () => {
    const result = doSomething(true);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toEqual(false);
  });
  it("should be able to return a error result", async () => {
    const result = doSomething(false);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toEqual(false);
  });
});
